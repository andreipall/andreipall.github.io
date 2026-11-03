---
layout: post
title:  "Symfony 8 project structure - best practices and examples"
date:   2026-11-03 07:46:56
categories: PHP
description: Symfony 8 project structure - best practices and examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Symfony 8 provides a flexible project structure. Unlike some frameworks, Symfony doesn't force you to use a specific architecture, so you can organize your application according to its size and complexity.
---
Symfony 8 provides a flexible project structure. Unlike some frameworks, Symfony doesn't force you to use a specific architecture, so you can organize your application according to its size and complexity.

For most applications, I recommend starting with **Symfony's standard directory structure**, then organizing your PHP classes by feature as the application grows.

I'll show you three approaches:

1. **Standard Symfony structure** — best for small and medium applications.
2. **Feature-based structure** — best for medium and large applications.
3. **Clean Architecture / DDD** — best for complex enterprise applications.

## 1. Standard Symfony 8 project structure

A typical Symfony 8 web application looks like this:

```text
my-symfony-project/
├── assets/                 # JavaScript, CSS
├── bin/
│   └── console             # Symfony CLI
├── config/
│   ├── packages/           # Bundle configuration
│   ├── routes.yaml
│   └── services.yaml
├── migrations/             # Doctrine migrations
├── public/
│   └── index.php           # Web entry point
├── src/
│   ├── Command/
│   ├── Controller/
│   ├── Entity/
│   ├── Enum/
│   ├── EventSubscriber/
│   ├── Form/
│   ├── Repository/
│   ├── Security/
│   ├── Service/
│   └── Kernel.php
├── templates/              # Twig templates
├── tests/                  # Automated tests
├── translations/           # Translation files
├── var/                    # Cache and logs
├── vendor/                 # Composer dependencies
├── .env
└── composer.json
```

Some directories are created when their corresponding Symfony packages are installed; others, such as `Service/` and `Enum/`, are conventions you create yourself.

### Responsibilities of the main directories

| Directory | Purpose |
|---|---|
| `Controller/` | Handle HTTP requests and responses |
| `Entity/` | Doctrine entities representing database data |
| `Repository/` | Retrieve and query entities |
| `Service/` | Application and business logic |
| `Form/` | Symfony form definitions |
| `Security/` | Authentication, authorization, voters |
| `EventSubscriber/` | React to framework or application events |
| `Command/` | Console commands |
| `templates/` | Twig HTML templates |
| `config/` | Application configuration |

### Example: User management application

Imagine a Symfony application that manages users.

The relevant files might be:

```text
src/
├── Controller/
│   └── UserController.php
├── Entity/
│   └── User.php
├── Repository/
│   └── UserRepository.php
├── Service/
│   └── UserService.php
└── Form/
    └── UserType.php

templates/
└── user/
    ├── index.html.twig
    ├── show.html.twig
    └── form.html.twig
```

The typical request flow is:

```text
HTTP Request (GET /users)
        ↓
UserController (Handles routing and response)
        ↓
UserService (Coordinates business operations)
        ↓
UserRepository (Queries the database)
        ↓
Doctrine / Database
```

For simple read-only pages, a controller can use a repository directly. You don't need a service for every operation.

## 2. Feature-based structure (recommended for larger projects)

Instead of grouping all controllers together and all repositories together, group classes by their business functionality.

For example, an application managing users, websites, archives, and reports:

```text
src/
├── User/
│   ├── Controller/
│   │   └── UserController.php
│   ├── Entity/
│   │   └── User.php
│   ├── Repository/
│   │   └── UserRepository.php
│   ├── Service/
│   │   └── UserService.php
│   └── Form/
│       └── UserType.php
│
├── Website/
│   ├── Controller/
│   │   └── WebsiteController.php
│   ├── Entity/
│   │   └── Website.php
│   ├── Repository/
│   │   └── WebsiteRepository.php
│   └── Service/
│       └── WebsiteService.php
│
├── Archive/
│   ├── Controller/
│   │   └── ArchiveController.php
│   ├── Entity/
│   │   └── Archive.php
│   ├── Repository/
│   │   └── ArchiveRepository.php
│   └── Service/
│       └── ArchiveService.php
│
├── Report/
│   ├── Controller/
│   │   └── ReportController.php
│   └── Service/
│       └── ReportService.php
│
├── Shared/
│   ├── Exception/
│   └── Service/
│
└── Kernel.php
```

This structure offers several advantages:

- All code related to a feature stays together.
- Adding a feature rarely requires modifying unrelated modules.
- Large teams can work on separate features.
- Tests can follow the same organization.
- Features can be refactored or extracted more easily.

### Example: Feature-based controller

File: `src/Website/Controller/WebsiteController.php`

```php
<?php

namespace App\Website\Controller;

use App\Website\Service\WebsiteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/websites')]
class WebsiteController extends AbstractController
{
    public function __construct(
        private readonly WebsiteService $websiteService
    ) {}

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json(
            $this->websiteService->getAllWebsites()
        );
    }
}
```

File: `src/Website/Service/WebsiteService.php`

```php
<?php

namespace App\Website\Service;

use App\Website\Repository\WebsiteRepository;

class WebsiteService
{
    public function __construct(
        private readonly WebsiteRepository $repository
    ) {}

    public function getAllWebsites(): array
    {
        return array_map(
            static fn ($website) => [
                'id' => $website->getId(),
                'url' => $website->getUrl(),
            ],
            $this->repository->findAll()
        );
    }
}
```

This assumes that `Website` is a Doctrine entity with `getId()` and `getUrl()` methods.

### Important: Configure routing and Doctrine mapping

When using a feature-based structure, Symfony needs to discover controllers and entities in their new locations.

For attribute routing, configure `config/routes.yaml`:

```yaml
controllers:
    resource:
        path: ../src/
        namespace: App
    type: attribute
```

This scans the `src/` directory for attribute-based routes. Avoid simultaneously importing the same controllers through another routing configuration.

For Doctrine, configure entity mapping, for example in `config/packages/doctrine.yaml`:

```yaml
doctrine:
    orm:
        mappings:
            Website:
                type: attribute
                is_bundle: false
                dir: '%kernel.project_dir%/src/Website/Entity'
                prefix: 'App\Website\Entity'
                alias: Website
```

Add mappings for your other feature directories as needed. Keep the rest of your existing Doctrine configuration.

Your default `config/services.yaml` will typically already register classes under `App\`:

```yaml
services:
    _defaults:
        autowire: true
        autoconfigure: true

    App\:
        resource: '../src/'
        exclude:
            - '../src/DependencyInjection/'
            - '../src/Entity/'
            - '../src/Kernel.php'
```

For feature-based projects, review the exclusions so that you don't accidentally register Doctrine entities as services.

## 3. Clean Architecture / Domain-Driven Design

For complex applications, you can separate business rules from infrastructure concerns such as Doctrine, HTTP, and external APIs.

A common organization is:

```text
src/
├── Archive/
│   ├── Domain/
│   │   ├── Entity/
│   │   │   └── Archive.php
│   │   ├── Repository/
│   │   │   └── ArchiveRepositoryInterface.php
│   │   ├── Exception/
│   │   └── ValueObject/
│   │
│   ├── Application/
│   │   ├── Command/
│   │   │   └── CreateArchive.php
│   │   ├── Handler/
│   │   │   └── CreateArchiveHandler.php
│   │   └── DTO/
│   │
│   ├── Infrastructure/
│   │   ├── Persistence/
│   │   │   └── DoctrineArchiveRepository.php
│   │   └── ExternalApi/
│   │
│   └── Presentation/
│       ├── Controller/
│       │   └── ArchiveController.php
│       └── Request/
│
├── Website/
│   ├── Domain/
│   ├── Application/
│   ├── Infrastructure/
│   └── Presentation/
│
└── Kernel.php
```

### Responsibilities of each layer

| Layer | Responsibility | Depends on |
|---|---|---|
| Domain | Business rules and models | No application infrastructure |
| Application | Use cases and workflows | Domain |
| Infrastructure | Database and external integrations | Domain contracts |
| Presentation | HTTP controllers and API responses | Application |

```text
Presentation: ArchiveController
        ↓
Application: CreateArchiveHandler
        ↓
Domain: Archive, ArchiveRepositoryInterface

Infrastructure: DoctrineArchiveRepository
(implements domain contracts and is injected into the application)
```

The important distinction is that your domain code does not need to know whether data comes from MySQL, Solr, or an external REST API.

This is useful for applications with multiple database servers, indexing services, background processing, or complicated business workflows.

However, it introduces more classes, interfaces, and configuration. It is usually unnecessary for straightforward CRUD applications.

## 4. Practical Symfony 8 REST API structure

For a REST API with Doctrine, authentication, validation, and external services, I would use a feature-based structure with a small shared infrastructure layer.

```text
src/
├── Controller/
│   └── HealthController.php
│
├── Module/
│   ├── User/
│   │   ├── Controller/
│   │   │   └── UserController.php
│   │   ├── DTO/
│   │   │   ├── CreateUserRequest.php
│   │   │   └── UserResponse.php
│   │   ├── Entity/
│   │   │   └── User.php
│   │   ├── Repository/
│   │   │   └── UserRepository.php
│   │   └── Service/
│   │       └── UserService.php
│   │
│   ├── Website/
│   │   ├── Controller/
│   │   ├── DTO/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   └── Service/
│   │
│   ├── Archive/
│   │   ├── Controller/
│   │   ├── DTO/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   └── Service/
│   │
│   └── Search/
│       ├── Controller/
│       ├── DTO/
│       └── Service/
│
├── Infrastructure/
│   ├── Solr/
│   │   └── SolrClient.php
│   ├── Http/
│   │   └── ExternalApiClient.php
│   └── Database/
│       └── ConnectionManager.php
│
├── Security/
│   └── ApiAuthenticator.php
│
├── EventSubscriber/
│   └── ApiExceptionSubscriber.php
│
└── Kernel.php
```

Here, `Module/` is simply a PHP namespace grouping. It is not a Symfony bundle.

A feature such as `Search` can use a Solr client without needing a Doctrine entity or repository.

### Example: Symfony 8 REST API with validation

File: `src/Module/User/DTO/CreateUserRequest.php`

```php
<?php

namespace App\Module\User\DTO;

use Symfony\Component\Validator\Constraints as Assert;

final class CreateUserRequest
{
    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email = '';

    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 100)]
    public string $name = '';
}
```

File: `src/Module/User/Controller/UserController.php`

```php
<?php

namespace App\Module\User\Controller;

use App\Module\User\DTO\CreateUserRequest;
use App\Module\User\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/users')]
final class UserController extends AbstractController
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    #[Route('', methods: ['POST'], format: 'json')]
    public function create(
        #[MapRequestPayload]
        CreateUserRequest $request
    ): JsonResponse {
        $user = $this->userService->create(
            $request->name,
            $request->email
        );

        return $this->json([
            'id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getEmail(),
        ], 201);
    }
}
```

File: `src/Module/User/Service/UserService.php`

```php
<?php

namespace App\Module\User\Service;

use App\Module\User\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

final class UserService
{
    public function __construct(
        private readonly EntityManagerInterface $em
    ) {}

    public function create(
        string $name,
        string $email
    ): User {
        $user = new User();

        $user->setName($name);
        $user->setEmail($email);

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }
}
```

This assumes the `User` entity has the corresponding getters, setters, and Doctrine mapping. A production implementation should also handle duplicate email addresses and any relevant authorization rules.

Symfony's `MapRequestPayload` handles deserialization and validation. With the Validator component installed, invalid data normally produces a 422 response, while malformed JSON produces a 400 response.

## 5. How to choose the right architecture

| Criterion | Standard | Feature-based | Clean / DDD |
|---|---|---|---|
| Small CRUD app | Excellent | Good | Excessive |
| Medium web application | Excellent | Excellent | Sometimes |
| Large REST API | Limited | Excellent | Excellent |
| Multiple integrations | Good | Excellent | Excellent |
| Complex business rules | Moderate | Good | Excellent |
| Simplicity | Highest | High | Lower |
| Long-term modularity | Moderate | High | Highest |

## 6. Symfony 8 best practices

The official Symfony documentation recommends retaining the default directory structure unless there is a good reason to change it. It also recommends dependency injection, autowiring, PHP attributes for routing and Doctrine mapping, and keeping business logic outside controllers.

A few additional practices I recommend:

- Keep controllers thin and focused on HTTP.
- Put business operations in services or application handlers.
- Use repositories for database queries rather than placing queries in controllers.
- Use DTOs for API request and response contracts when useful.
- Use Symfony Validator for input validation.
- Use Symfony Voters for complex authorization rules.
- Organize tests to mirror the application structure.
- Keep shared services genuinely reusable; avoid turning `Shared/` into a dumping ground.
- Avoid creating custom Symfony bundles solely to separate internal modules. Bundles are primarily intended for reusable packages.

## My recommendation

For a Symfony 8 application with **REST APIs, MySQL, Solr, and multiple functional modules**, I would choose **Approach 2: feature-based organization**, with an `Infrastructure/` directory for reusable integrations.

It offers a good balance between maintainability and simplicity without the overhead of full Domain-Driven Design.

Start with `Controller`, `DTO`, `Entity`, `Repository`, and `Service` inside each feature. Introduce `Domain`, `Application`, and `Infrastructure` layers within a feature only when its business logic becomes complex.

Official reference: [Symfony 8 Best Practices](https://symfony.com/doc/8.0/best_practices.html).
