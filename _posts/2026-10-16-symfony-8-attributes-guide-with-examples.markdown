---
layout: post
title:  "Symfony 8 Attributes - Guide with Examples"
date:   2026-10-16 06:46:56
categories: PHP
description: Symfony 8 Attributes - Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Symfony 8 uses PHP attributes extensively to configure controllers, routing, dependency injection, validation, security, Doctrine ORM entities, event listeners, and more.
---
Symfony 8 uses **PHP attributes** extensively to configure controllers, routing, dependency injection, validation, security, Doctrine ORM entities, event listeners, and more.

Attributes allow you to configure application behavior directly in PHP classes, methods, properties, and parameters, without needing separate YAML or XML configuration files.

For example:

```php
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController
{
    #[Route('/api/users', name: 'api_users', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Users retrieved successfully'
        ]);
    }
}
```

The `#[Route]` attribute tells Symfony that the `index()` method handles `GET /api/users` requests.

## 1. Main categories of Symfony 8 attributes

Symfony attributes come from different components and packages. Not all are installed by default.

| Category | Important attributes |
|---|---|
| Routing | `Route` |
| Controllers | `MapRequestPayload`, `MapQueryString`, `MapQueryParameter`, `MapUploadedFile`, `CurrentUser`, `IsGranted`, `Cache` |
| Dependency injection | `Autowire`, `AutowireIterator`, `AutowireLocator`, `TaggedIterator` (legacy), `AsAlias`, `AsDecorator`, `When`, `AutoconfigureTag` |
| Security | `IsGranted`, `CurrentUser`, `IsCsrfTokenValid` |
| Validation | `NotBlank`, `NotNull`, `Length`, `Email`, `Choice`, `Range`, `Regex`, `Valid`, `Callback` |
| Doctrine ORM | `Entity`, `Table`, `Column`, `Id`, `GeneratedValue`, `ManyToOne`, `OneToMany`, `ManyToMany`, `JoinColumn` |
| Events | `AsEventListener`, `AsEventSubscriber` |
| Console commands | `AsCommand`, `AsArgument`, `AsOption` |
| Messenger | `AsMessageHandler` |
| Serializer | `Groups`, `SerializedName`, `Ignore`, `MaxDepth`, `Context` |
| Twig | `AsTwigFilter`, `AsTwigFunction`, `AsTwigTest` |
| Scheduling | `AsCronTask`, `AsPeriodicTask` |
| HTTP client | `Autowire` with scoped client services |
| Testing | `TestWith`, `DataProvider` (PHPUnit attributes, not Symfony attributes) |

A useful distinction: **Symfony attributes, Doctrine attributes, and PHP attributes are not the same thing.** Symfony integrates them, but they belong to different libraries.

## 2. Routing attributes

Import:

```php
use Symfony\Component\Routing\Attribute\Route;
```

The `Route` attribute maps URLs to controller methods.

### 2.1 Basic routing

```php
#[Route('/api/users', methods: ['GET'])]
public function list(): JsonResponse
{
    return $this->json(['users' => []]);
}
```

### 2.2 Route parameters and requirements

```php
#[Route(
    '/api/users/{id}',
    name: 'api_user_show',
    requirements: ['id' => '\d+'],
    methods: ['GET'],
    format: 'json'
)]
public function show(int $id): JsonResponse
{
    return $this->json(['id' => $id]);
}
```

Here:

- `requirements` restricts `id` to digits.
- `methods` permits only GET requests.
- `format` identifies the request as JSON.
- `name` provides an identifier for URL generation.

### 2.3 Grouping routes

```php
#[Route('/api/products', name: 'api_products_')]
class ProductController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->json([]);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        return $this->json(['id' => $id]);
    }
}
```

The routes become `/api/products` and `/api/products/{id}`, with names `api_products_list` and `api_products_show`.

## 3. Controller request-mapping attributes

These are particularly useful when developing REST APIs.

Import:

```php
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpKernel\Attribute\MapUploadedFile;
```

### 3.1 `#[MapRequestPayload]`

Automatically converts JSON or supported request-body data into a PHP DTO and validates it.

Create `src/Dto/CreateUserDto.php`:

```php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class CreateUserDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 3, max: 100)]
        public string $name,

        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,

        #[Assert\PositiveOrZero]
        public int $age
    ) {}
}
```

Use it in a controller:

```php
#[Route('/api/users', methods: ['POST'], format: 'json')]
public function create(
    #[MapRequestPayload] CreateUserDto $dto
): JsonResponse {
    return $this->json([
        'name' => $dto->name,
        'email' => $dto->email,
        'age' => $dto->age
    ], 201);
}
```

Request:

```http
POST /api/users
Content-Type: application/json

{
    "name": "John",
    "email": "john@example.com",
    "age": 30
}
```

Symfony automatically deserializes the JSON, constructs the DTO and validates its constraints. Validation failures normally return HTTP `422 Unprocessable Entity`.

### 3.2 `#[MapQueryParameter]`

Maps an individual query-string parameter to a typed controller argument.

```php
#[Route('/api/users', methods: ['GET'])]
public function list(
    #[MapQueryParameter] int $page = 1,
    #[MapQueryParameter] int $limit = 20,
    #[MapQueryParameter] ?string $search = null
): JsonResponse {
    return $this->json([
        'page' => $page,
        'limit' => $limit,
        'search' => $search
    ]);
}
```

Request:

```http
GET /api/users?page=2&limit=10&search=john
```

You can also validate the type using PHP filters:

```php
#[MapQueryParameter(filter: FILTER_VALIDATE_INT)]
int $page = 1
```

### 3.3 `#[MapQueryString]`

Maps multiple query parameters into a DTO.

```php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class SearchDto
{
    public function __construct(
        public ?string $query = null,

        #[Assert\Range(min: 1, max: 100)]
        public int $limit = 20
    ) {}
}
```

Controller:

```php
#[Route('/api/search', methods: ['GET'])]
public function search(
    #[MapQueryString] SearchDto $filters = new SearchDto()
): JsonResponse {
    return $this->json([
        'query' => $filters->query,
        'limit' => $filters->limit
    ]);
}
```

Example URL:

`/api/search?query=symfony&limit=25`

### 3.4 `#[MapUploadedFile]`

Maps uploaded files to `UploadedFile` arguments.

```php
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

#[Route('/api/upload', methods: ['POST'])]
public function upload(
    #[MapUploadedFile(
        constraints: [
            new Assert\File(maxSize: '5M')
        ]
    )]
    UploadedFile $file
): JsonResponse {
    return $this->json([
        'filename' => $file->getClientOriginalName()
    ]);
}
```

The multipart form field must be named `file`.

In a real application, generate a safe filename and store the file outside publicly writable executable paths.

## 4. Security attributes

Import:

```php
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
```

### 4.1 `#[IsGranted]`

Restricts access based on roles or permissions.

```php
#[Route('/api/admin/users', methods: ['GET'])]
#[IsGranted('ROLE_ADMIN')]
public function adminUsers(): JsonResponse
{
    return $this->json(['message' => 'Admin access granted']);
}
```

You can apply the attribute to an entire controller class:

```php
#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractController
{
    // Every action requires ROLE_ADMIN.
}
```

You can also check permissions on a specific object:

```php
#[Route('/api/posts/{id}', methods: ['DELETE'])]
#[IsGranted('POST_DELETE', subject: 'post')]
public function delete(Post $post): JsonResponse
{
    // Requires a configured voter for POST_DELETE.
    return $this->json(['success' => true]);
}
```

For this example, your application must implement a security voter that supports the `POST_DELETE` permission.

### 4.2 `#[CurrentUser]`

Injects the currently authenticated user.

```php
use App\Entity\User;

#[Route('/api/me', methods: ['GET'])]
public function me(
    #[CurrentUser] ?User $user
): JsonResponse {
    if ($user === null) {
        return $this->json(['error' => 'Unauthorized'], 401);
    }

    return $this->json([
        'id' => $user->getId(),
        'email' => $user->getEmail()
    ]);
}
```

For a REST API, `#[IsGranted('IS_AUTHENTICATED_FULLY')]` is often useful alongside user injection, depending on your authentication setup.

## 5. Dependency injection attributes

Symfony can automatically inject services into constructors. Attributes give you more control over what is injected.

### 5.1 `#[Autowire]`

Import:

```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;
```

Example:

```php
namespace App\Service;

use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class FileStorageService
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/var/uploads')]
        private readonly string $uploadDirectory
    ) {}

    public function getUploadDirectory(): string
    {
        return $this->uploadDirectory;
    }
}
```

You can also inject environment variables:

```php
public function __construct(
    #[Autowire(env: 'APP_API_KEY')]
    private readonly string $apiKey
) {}
```

Or a particular service:

```php
public function __construct(
    #[Autowire(service: 'monolog.logger.request')]
    private readonly LoggerInterface $logger
) {}
```

### 5.2 `#[AutowireIterator]`

Injects an iterable collection of tagged services.

```php
use Symfony\Component\DependencyInjection\Attribute\AutowireIterator;

final class ProcessorManager
{
    public function __construct(
        #[AutowireIterator('app.processor')]
        private readonly iterable $processors
    ) {}
}
```

Register processors using:

```php
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;

#[AutoconfigureTag('app.processor')]
final class ImageProcessor
{
}
```

The manager receives services tagged `app.processor`.

### 5.3 `#[AsAlias]`

Registers a class as the implementation of an interface.

```php
use Symfony\Component\DependencyInjection\Attribute\AsAlias;

#[AsAlias(id: PaymentGatewayInterface::class)]
final class StripePaymentGateway implements PaymentGatewayInterface
{
    public function charge(): void
    {
        // Implementation
    }
}
```

Symfony can then inject `StripePaymentGateway` whenever `PaymentGatewayInterface` is requested.

### 5.4 `#[When]`

Registers a service only in a specified environment.

```php
use Symfony\Component\DependencyInjection\Attribute\When;

#[When(env: 'dev')]
final class DebugEmailService
{
}
```

This service is registered only in the `dev` environment, assuming normal service discovery.

### 5.5 `#[AsDecorator]`

Decorates an existing service.

```php
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;

#[AsDecorator(decorates: PaymentService::class)]
final class LoggingPaymentService
{
    public function __construct(
        private readonly PaymentService $inner
    ) {}

    public function pay(): void
    {
        // Log the payment operation.
        $this->inner->pay();
    }
}
```

In a real implementation, both classes must have compatible methods or implement a shared interface.

## 6. Validation attributes

Symfony's Validator component provides many attributes to validate DTOs, entities, and other objects.

Import:

```php
use Symfony\Component\Validator\Constraints as Assert;
```

| Attribute | Purpose | Example |
|---|---|---|
| `NotBlank` | Rejects blank values | `#[Assert\NotBlank]` |
| `NotNull` | Rejects null | `#[Assert\NotNull]` |
| `Email` | Validates email format | `#[Assert\Email]` |
| `Length` | Checks string length | `#[Assert\Length(min: 3, max: 100)]` |
| `Range` | Checks a numeric range | `#[Assert\Range(min: 1, max: 100)]` |
| `Positive` | Requires a positive number | `#[Assert\Positive]` |
| `PositiveOrZero` | Requires zero or greater | `#[Assert\PositiveOrZero]` |
| `Choice` | Restricts permitted values | `#[Assert\Choice(['active', 'inactive'])]` |
| `Regex` | Validates a regular expression | `#[Assert\Regex('/^[a-z]+$/')]` |
| `Count` | Validates array size | `#[Assert\Count(min: 1)]` |
| `Unique` | Ensures array elements are unique | `#[Assert\Unique]` |
| `Type` | Validates a PHP type | `#[Assert\Type('integer')]` |
| `Url` | Validates URL format | `#[Assert\Url]` |
| `Date` | Validates a date string | `#[Assert\Date]` |
| `DateTime` | Validates a datetime string | `#[Assert\DateTime]` |
| `Valid` | Recursively validates nested objects | `#[Assert\Valid]` |
| `Callback` | Performs custom validation | `#[Assert\Callback]` |

Example combining several attributes:

```php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class RegisterUserDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 3, max: 50)]
        public string $username,

        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,

        #[Assert\NotBlank]
        #[Assert\Length(min: 12)]
        public string $password,

        #[Assert\Choice(['user', 'editor'])]
        public string $role = 'user'
    ) {}
}
```

**Important:** DTO validation does not automatically guarantee database uniqueness. For entity uniqueness, Symfony also provides `#[UniqueEntity]` through the Doctrine bridge.

## 7. Doctrine ORM attributes

These attributes come from Doctrine, not directly from Symfony.

Import:

```php
use Doctrine\ORM\Mapping as ORM;
```

| Attribute | Purpose |
|---|---|
| `Entity` | Declares a Doctrine entity |
| `Table` | Specifies the database table |
| `Id` | Declares the primary key |
| `GeneratedValue` | Configures automatic ID generation |
| `Column` | Maps a property to a database column |
| `UniqueConstraint` | Declares a database uniqueness constraint |
| `Index` | Declares a database index |
| `OneToOne` | Defines a one-to-one relationship |
| `OneToMany` | Defines a one-to-many relationship |
| `ManyToOne` | Defines a many-to-one relationship |
| `ManyToMany` | Defines a many-to-many relationship |
| `JoinColumn` | Configures a relationship's foreign key |
| `JoinTable` | Configures a many-to-many join table |
| `HasLifecycleCallbacks` | Enables entity lifecycle callbacks |
| `PrePersist` | Executes before inserting an entity |
| `PreUpdate` | Executes before updating an entity |
| `PostLoad` | Executes after loading an entity |

Example:

```php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'products')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column]
    #[Assert\PositiveOrZero]
    private int $price;

    #[ORM\ManyToOne(targetEntity: Category::class)]
    #[ORM\JoinColumn(nullable: false)]
    private Category $category;
}
```

The entity combines Doctrine mapping and Symfony validation.

## 8. Event attributes

### `#[AsEventListener]`

Registers a class or method as an event listener without configuring it manually in YAML.

```php
namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class RequestLogger
{
    #[AsEventListener(event: KernelEvents::REQUEST, priority: 10)]
    public function onRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) {
            return;
        }

        // Inspect or log the incoming request.
    }
}
```

The `priority` option controls execution order: higher-priority listeners execute earlier.

This is particularly useful when implementing request processing similar to filters or middleware.

## 9. Console command attributes

### `#[AsCommand]`

Registers a Symfony console command.

```php
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:cleanup',
    description: 'Remove temporary files'
)]
final class CleanupCommand extends Command
{
    protected function execute(
        InputInterface $input,
        OutputInterface $output
    ): int {
        $output->writeln('Cleanup completed.');

        return Command::SUCCESS;
    }
}
```

Run:

```bash
php bin/console app:cleanup
```

Symfony also supports attributes such as `#[AsArgument]` and `#[AsOption]` for configuring command inputs.

## 10. Messenger attributes

### `#[AsMessageHandler]`

Registers a handler for asynchronous or synchronous messages using Symfony Messenger.

```php
namespace App\MessageHandler;

use App\Message\SendEmailMessage;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class SendEmailHandler
{
    public function __invoke(SendEmailMessage $message): void
    {
        // Send the email.
    }
}
```

Dispatch the message:

```php
$messageBus->dispatch(
    new SendEmailMessage('john@example.com')
);
```

Whether it runs asynchronously depends on the Messenger transport and routing configuration.

## 11. Serializer attributes

These control how objects are serialized to JSON and other formats.

```php
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Attribute\SerializedName;
use Symfony\Component\Serializer\Attribute\Ignore;
```

Example:

```php
final class UserResponse
{
    #[Groups(['user:read'])]
    public int $id;

    #[Groups(['user:read'])]
    #[SerializedName('full_name')]
    public string $name;

    #[Ignore]
    public string $passwordHash;
}
```

When serializing with the `user:read` group, the output includes `id` and `full_name` but excludes `passwordHash`.

```php
$json = $serializer->serialize(
    $user,
    'json',
    ['groups' => ['user:read']]
);
```

Other useful serializer attributes include `#[MaxDepth]`, `#[Context]` and `#[SerializedPath]`.

## 12. Twig attributes

Twig extensions can be registered using attributes.

```php
use Twig\Attribute\AsTwigFilter;

final class TextExtension
{
    #[AsTwigFilter('short_text')]
    public function shortText(string $value): string
    {
        return mb_substr($value, 0, 50);
    }
}
```

Use in Twig:

```twig
{{ article.description|short_text }}
```

Related attributes include `#[AsTwigFunction]` and `#[AsTwigTest]`.

## 13. Scheduling attributes

Symfony Scheduler supports attributes for recurring tasks.

```php
use Symfony\Component\Scheduler\Attribute\AsPeriodicTask;

#[AsPeriodicTask(frequency: '1 hour')]
final class CleanupTask
{
    public function __invoke(): void
    {
        // Perform periodic cleanup.
    }
}
```

There is also `#[AsCronTask]` for cron-expression-based scheduling. These require Scheduler setup and an appropriate worker running.

## 14. Complete REST API example combining attributes

The following shows how several attributes work together in a Symfony 8 REST API.

**src/Dto/CreateProductDto.php**

```php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class CreateProductDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 3, max: 150)]
        public string $name,

        #[Assert\Positive]
        public int $price
    ) {}
}
```

**src/Controller/Api/ProductController.php**

```php
namespace App\Controller\Api;

use App\Dto\CreateProductDto;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/products', name: 'api_products_')]
final class ProductController extends AbstractController
{
    #[Route('', name: 'list', methods: ['GET'], format: 'json')]
    public function list(
        #[MapQueryParameter] int $page = 1
    ): JsonResponse {
        return $this->json([
            'page' => $page,
            'products' => []
        ]);
    }

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    #[IsGranted('ROLE_ADMIN')]
    public function create(
        #[MapRequestPayload] CreateProductDto $dto
    ): JsonResponse {
        // Persist product using an injected service.

        return $this->json([
            'name' => $dto->name,
            'price' => $dto->price
        ], 201);
    }
}
```

This example demonstrates:

- `#[Route]` — URL and HTTP method configuration.
- `#[MapQueryParameter]` — Typed query parameter extraction.
- `#[MapRequestPayload]` — JSON deserialization and validation.
- `#[Assert\NotBlank]` — Required nonblank field validation.
- `#[Assert\Length]` — String length validation.
- `#[Assert\Positive]` — Positive integer validation.
- `#[IsGranted]` — Role-based authorization.

The example returns a creation response but deliberately omits database persistence, which would require a repository or application service.

## 15. How to discover attributes in your Symfony installation

Because the available attributes depend on installed packages and Symfony's minor version, the best reference is the official documentation:

[Symfony 8.0 Attributes Reference](https://symfony.com/doc/8.0/reference/attributes.html)

You can also inspect your installed packages:

```bash
composer show symfony/*
```

For routing:

```bash
php bin/console debug:router
```

For dependency injection:

```bash
php bin/console debug:container
```

For registered event listeners:

```bash
php bin/console debug:event-dispatcher
```

For Messenger handlers:

```bash
php bin/console debug:messenger
```

## 16. Which attributes should you prioritize?

For a Symfony 8 REST API with authentication, request validation and Doctrine, I would prioritize these:

| Priority | Attribute | Reason |
|---|---|---|
| 1 | `Route` | Define API endpoints |
| 2 | `MapRequestPayload` | Deserialize and validate POST/PUT/PATCH bodies |
| 3 | `MapQueryParameter` | Handle individual GET parameters |
| 4 | `MapQueryString` | Validate complex search/filter parameters |
| 5 | `IsGranted` | Secure API endpoints |
| 6 | `CurrentUser` | Access the authenticated user |
| 7 | `Assert\*` | Validate incoming DTOs |
| 8 | `ORM\*` | Configure database entities |
| 9 | `Autowire` | Configure service dependencies |
| 10 | `AsEventListener` | Implement cross-cutting request handling |
| 11 | `Groups` | Control API serialization |
| 12 | `AsMessageHandler` | Process background jobs |

**My recommendation for Symfony 8:** use attributes for routes, request mapping, validation, authorization, Doctrine mapping and service registration. Keep application logic in dedicated services rather than placing it directly inside controllers.

This guide covers the most practically useful attributes, not every attribute exposed by every Symfony component or third-party bundle. The official reference provides the broader inventory, and Symfony 8.1 adds some features that are not available in 8.0.
