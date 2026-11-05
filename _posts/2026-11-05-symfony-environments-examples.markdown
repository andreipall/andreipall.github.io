---
layout: post
title:  "Symfony environments examples"
date:   2026-11-05 07:46:56
categories: PHP
description: Symfony environments examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: In Symfony 8, environments allow you to run the same application with different configurations depending on whether you're developing, testing, or running in production.
---
In **Symfony 8**, environments allow you to run the same application with different configurations depending on whether you're developing, testing, or running in production.

Symfony supports three standard environments:

| Environment | Purpose | Debug mode |
|---|---|---|
| `dev` | Local development | Enabled |
| `prod` | Production server | Disabled |
| `test` | Automated testing | Usually enabled |

You can also create custom environments such as `staging`, `demo`, or `local`.

## 1. Configure environments using .env files

Symfony uses environment variables to configure your application.

A typical Symfony project has this structure:

```text
my-project/
├── .env
├── .env.local
├── .env.dev
├── .env.dev.local
├── .env.prod
├── .env.prod.local
├── .env.test
├── config/
│   ├── packages/
│   │   ├── dev/
│   │   ├── prod/
│   │   └── test/
│   └── services.yaml
├── src/
└── public/
```

You don't need to create all these files. Symfony loads the ones that exist.

### Example: .env (default configuration)

```dotenv
APP_ENV=dev
APP_DEBUG=1

DATABASE_URL="mysql://root:password@127.0.0.1:3306/myapp"
APP_NAME="My Symfony Application"
```

### Example: .env.dev

```dotenv
APP_NAME="My Application - Development"
API_URL="https://dev-api.example.com"
MAILER_DSN="null://null"
```

### Example: .env.prod

```dotenv
APP_NAME="My Application"
API_URL="https://api.example.com"
MAILER_DSN="smtp://mail.example.com:587"
```

Production credentials should be supplied through server environment variables or Symfony Secrets, rather than committed to Git.

### Example: .env.test

```dotenv
APP_NAME="My Application - Testing"
DATABASE_URL="mysql://root:password@127.0.0.1:3306/myapp_test"
MAILER_DSN="null://null"
```

Symfony selects environment-specific values based on `APP_ENV`.

For example, when `APP_ENV=dev`, Symfony loads `.env` and then `.env.dev`, allowing development settings to override defaults.

The usual precedence, from lower to higher priority, is:

1. `.env`
2. `.env.local` (except in `test`)
3. `.env.<environment>`
4. `.env.<environment>.local`
5. Real environment variables set by the operating system or web server

Real environment variables generally take precedence over values from `.env` files.

## 2. Switch between environments

You can change the environment globally using `.env.local`:

```dotenv
APP_ENV=prod
APP_DEBUG=0
```

Or override the environment for an individual console command.

**Linux / macOS:**

```bash
APP_ENV=dev php bin/console cache:clear
APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear
APP_ENV=test php bin/console cache:clear
```

**Windows PowerShell:**

```powershell
$env:APP_ENV = "prod"
$env:APP_DEBUG = "0"

php bin/console cache:clear
```

You can also use Symfony's `--env` option:

```bash
php bin/console cache:clear --env=prod --no-debug
```

To check the active environment:

```bash
php bin/console about
```

## 3. Use environment variables in Symfony services

Suppose you have different API endpoints for development and production.

Your `.env.dev` contains:

```dotenv
API_URL="https://dev-api.example.com"
```

Your `.env.prod` contains:

```dotenv
API_URL="https://api.example.com"
```

Create a service that receives the appropriate URL automatically.

**config/services.yaml**

```yaml
services:
    App\Service\ApiService:
        arguments:
            $apiUrl: '%env(API_URL)%'
```

**src/Service/ApiService.php**

```php
<?php

namespace App\Service;

class ApiService
{
    public function __construct(
        private string $apiUrl
    ) {
    }

    public function getApiUrl(): string
    {
        return $this->apiUrl;
    }
}
```

Now inject this service into a controller:

```php
<?php

namespace App\Controller;

use App\Service\ApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/info', methods: ['GET'])]
    public function info(ApiService $apiService): JsonResponse
    {
        return $this->json([
            'api_url' => $apiService->getApiUrl()
        ]);
    }
}
```

The response depends on the active environment.

**Development:**

```json
{
    "api_url": "https://dev-api.example.com"
}
```

**Production:**

```json
{
    "api_url": "https://api.example.com"
}
```

You don't need to modify any PHP code when switching environments.

## 4. Use environment-specific Symfony configuration

Symfony can also load different YAML configurations based on the environment.

For example, configure the Symfony framework differently for development and production.

**config/packages/framework.yaml** (shared)

```yaml
framework:
    secret: '%env(APP_SECRET)%'
    session: true
```

**config/packages/dev/framework.yaml**

```yaml
framework:
    profiler:
        collect: true
```

**config/packages/prod/framework.yaml**

```yaml
framework:
    profiler:
        enabled: false
```

These environment-specific files are loaded in addition to the common configuration. Only define the settings that differ.

Alternatively, Symfony supports the `when@` syntax in the same YAML file:

```yaml
framework:
    secret: '%env(APP_SECRET)%'

when@dev:
    framework:
        profiler:
            collect: true

when@prod:
    framework:
        profiler:
            enabled: false
```

The `when@dev` configuration applies only in development, and `when@prod` applies only in production.

## 5. Detect the current environment inside PHP

Sometimes your application needs to behave differently depending on its environment.

Symfony provides `KernelInterface` to access the active environment.

```php
<?php

namespace App\Controller;

use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class EnvironmentController extends AbstractController
{
    #[Route('/environment', methods: ['GET'])]
    public function index(KernelInterface $kernel): JsonResponse
    {
        $environment = $kernel->getEnvironment();

        return $this->json([
            'environment' => $environment,
            'isDevelopment' => $environment === 'dev',
            'isProduction' => $environment === 'prod',
        ]);
    }
}
```

For `APP_ENV=dev`, the response is:

```json
{
    "environment": "dev",
    "isDevelopment": true,
    "isProduction": false
}
```

You can also inject the environment as a parameter:

```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

public function __construct(
    #[Autowire('%kernel.environment%')]
    private string $environment
) {
}
```

Prefer environment-specific configuration over scattered `if ($environment === 'prod')` checks when possible.

## 6. Create a custom staging environment

Suppose your application has three servers:

| Server | Environment | API |
|---|---|---|
| localhost | `dev` | dev-api.example.com |
| staging.example.com | `staging` | staging-api.example.com |
| example.com | `prod` | api.example.com |

Create a `.env.staging` file:

```dotenv
APP_NAME="My Application - Staging"
API_URL="https://staging-api.example.com"
```

On the staging server, set:

```dotenv
APP_ENV=staging
APP_DEBUG=0
```

You can optionally create staging-specific configuration:

```text
config/
└── packages/
    ├── framework.yaml
    ├── dev/
    ├── prod/
    └── staging/
        └── framework.yaml
```

Symfony automatically recognizes the custom environment name and loads the appropriate configuration.

For example:

```bash
APP_ENV=staging APP_DEBUG=0 php bin/console cache:clear
```

A custom staging environment has its own cache at `var/cache/staging`.

For staging servers that should behave exactly like production, another good approach is to keep `APP_ENV=prod` and change only the server-specific variables such as `DATABASE_URL` and `API_URL`.

## 7. Useful commands for debugging environments

| Command | Description |
|---|---|
| `php bin/console about` | Show active environment and application information |
| `php bin/console debug:dotenv` | Inspect loaded `.env` files and variable precedence |
| `php bin/console debug:container --env-vars` | List environment variables used by the container |
| `php bin/console cache:clear --env=prod` | Clear production cache |
| `php bin/console lint:yaml config/` | Validate YAML configuration |

## Recommended approach for Symfony 8

For a typical Symfony REST API application, I recommend:

- Use `.env` for default non-sensitive settings.
- Use `.env.dev` and `.env.test` for environment-specific defaults.
- Use `.env.local` for local credentials and overrides.
- Use `APP_ENV=prod` and `APP_DEBUG=0` on production servers.
- Configure database connections through `DATABASE_URL`.
- Inject environment variables into services using `%env(VARIABLE_NAME)%`.
- Use `when@dev` and `when@prod` when Symfony service or bundle configuration needs to differ.
- Never expose debug mode or diagnostic environment endpoints publicly in production.

**Official documentation:** [Symfony 8 — Configuration and Environments](https://symfony.com/doc/8.0/configuration.html)

The key distinction is that **`.env` files configure variable values, while `APP_ENV` controls which Symfony configuration is loaded**. Using both gives you a clean way to deploy the same application to development, staging, and production without modifying the PHP source code.
