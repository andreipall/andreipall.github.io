---
layout: post
title:  "Symfony 8 Attributes - Guide with Examples"
date:   2026-10-16 06:46:56
categories: PHP
description: Symfony 8 Attributes - Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Symfony 8 uses PHP attributes (`#[...]`) for routing, controllers, dependency injection, security, validation, event handling, and more. Some attributes below come from optional Symfony packages, Doctrine, or Twig rather than Symfony's core.
---
Symfony 8 uses PHP attributes (`#[...]`) for routing, controllers, dependency injection, security, validation, event handling, and more. Some attributes below come from optional Symfony packages, Doctrine, or Twig rather than Symfony's core.

## 1. Overview

| Category | Common attributes |
|---|---|
| Routing | `Route` |
| Controller input | `MapRequestPayload`, `MapQueryString`, `MapQueryParameter`, `MapUploadedFile` |
| Security | `IsGranted`, `CurrentUser` |
| Dependency injection | `Autowire`, `AutowireIterator`, `AutowireLocator`, `AsAlias`, `AsDecorator`, `When`, `AutoconfigureTag` |
| Validation | `NotBlank`, `NotNull`, `Email`, `Length`, `Range`, `Choice`, `Regex`, `Valid`, `Callback` |
| Doctrine ORM | `Entity`, `Table`, `Column`, `Id`, `GeneratedValue`, `ManyToOne`, `OneToMany`, `JoinColumn` |
| Events | `AsEventListener` |
| Console | `AsCommand`, `AsArgument`, `AsOption` |
| Messenger | `AsMessageHandler` |
| Serializer | `Groups`, `SerializedName`, `Ignore`, `MaxDepth`, `Context` |
| Twig | `AsTwigFilter`, `AsTwigFunction`, `AsTwigTest` |
| Scheduler | `AsCronTask`, `AsPeriodicTask` |

## 2. Routing: `#[Route]`

```php
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/products', name: 'api_products_')]
final class ProductController
{
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return new JsonResponse(['products' => []]);
    }

    #[Route('/{id}', name: 'show', requirements: ['id' => '\\d+'], methods: ['GET'], format: 'json')]
    public function show(int $id): JsonResponse
    {
        return new JsonResponse(['id' => $id]);
    }
}
```

`Route` maps a URL to a controller method. `name` identifies the route, `methods` restricts HTTP methods, `requirements` restricts route parameters, and `format` sets the request format.

## 3. Request mapping

### `#[MapRequestPayload]`

Deserializes a request body into a DTO and validates it.

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
        public int $age,
    ) {}
}
```

```php
use App\Dto\CreateUserDto;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api/users', methods: ['POST'], format: 'json')]
public function create(#[MapRequestPayload] CreateUserDto $dto): JsonResponse
{
    return $this->json(['name' => $dto->name, 'email' => $dto->email], 201);
}
```

Example JSON request:

```json
{"name":"John","email":"john@example.com","age":30}
```

Validation failures normally produce HTTP 422.

### `#[MapQueryParameter]`

Maps individual query parameters to typed arguments:

```php
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;

#[Route('/api/users', methods: ['GET'])]
public function list(
    #[MapQueryParameter] int $page = 1,
    #[MapQueryParameter] int $limit = 20,
    #[MapQueryParameter] ?string $search = null,
): JsonResponse {
    return $this->json(compact('page', 'limit', 'search'));
}
```

Request: `GET /api/users?page=2&limit=10&search=john`.

### `#[MapQueryString]`

Maps a collection of query parameters into a DTO:

```php
use Symfony\Component\Validator\Constraints as Assert;

final readonly class SearchDto
{
    public function __construct(
        public ?string $query = null,
        #[Assert\Range(min: 1, max: 100)]
        public int $limit = 20,
    ) {}
}
```

```php
use Symfony\Component\HttpKernel\Attribute\MapQueryString;

#[Route('/api/search', methods: ['GET'])]
public function search(#[MapQueryString] SearchDto $filters = new SearchDto()): JsonResponse
{
    return $this->json(['query' => $filters->query, 'limit' => $filters->limit]);
}
```

### `#[MapUploadedFile]`

Maps a multipart file upload and validates it:

```php
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Attribute\MapUploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

#[Route('/api/upload', methods: ['POST'])]
public function upload(
    #[MapUploadedFile(constraints: [new Assert\File(maxSize: '5M')])]
    UploadedFile $file,
): JsonResponse {
    return $this->json(['filename' => $file->getClientOriginalName()]);
}
```

The multipart field is named `file`. Never trust client-provided filenames when storing uploads.

## 4. Security

### `#[IsGranted]`

Restricts access by role or permission:

```php
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/admin/users', methods: ['GET'])]
#[IsGranted('ROLE_ADMIN')]
public function adminUsers(): JsonResponse
{
    return $this->json(['message' => 'Admin access granted']);
}
```

Object-specific authorization can use a voter:

```php
#[Route('/api/posts/{id}', methods: ['DELETE'])]
#[IsGranted('POST_DELETE', subject: 'post')]
public function delete(Post $post): JsonResponse
{
    return $this->json(['success' => true]);
}
```

The second example requires a voter that handles `POST_DELETE`.

### `#[CurrentUser]`

Injects the authenticated user:

```php
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/me', methods: ['GET'])]
public function me(#[CurrentUser] ?User $user): JsonResponse
{
    if ($user === null) {
        return $this->json(['error' => 'Unauthorized'], 401);
    }
    return $this->json(['id' => $user->getId(), 'email' => $user->getEmail()]);
}
```

## 5. Dependency injection

### `#[Autowire]`

Injects parameters, environment variables, or named services:

```php
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class FileStorageService
{
    public function __construct(
        #[Autowire('%kernel.project_dir%/var/uploads')]
        private readonly string $uploadDirectory,
        #[Autowire(env: 'APP_API_KEY')]
        private readonly string $apiKey,
    ) {}
}
```

A named service can be injected with `#[Autowire(service: 'monolog.logger.request')]`.

### `#[AutowireIterator]` and `#[AutoconfigureTag]`

Inject all services with a particular tag:

```php
use Symfony\Component\DependencyInjection\Attribute\AutoconfigureTag;
use Symfony\Component\DependencyInjection\Attribute\AutowireIterator;

#[AutoconfigureTag('app.processor')]
final class ImageProcessor {}

final class ProcessorManager
{
    public function __construct(
        #[AutowireIterator('app.processor')]
        private readonly iterable $processors,
    ) {}
}
```

### `#[AsAlias]`

Registers a class as an interface implementation:

```php
use Symfony\Component\DependencyInjection\Attribute\AsAlias;

#[AsAlias(id: PaymentGatewayInterface::class)]
final class StripePaymentGateway implements PaymentGatewayInterface
{
    public function charge(): void {}
}
```

### `#[When]`

Registers a service only in a particular environment:

```php
use Symfony\Component\DependencyInjection\Attribute\When;

#[When(env: 'dev')]
final class DebugEmailService {}
```

### `#[AsDecorator]`

Decorates another service:

```php
use Symfony\Component\DependencyInjection\Attribute\AsDecorator;

#[AsDecorator(decorates: PaymentService::class)]
final class LoggingPaymentService
{
    public function __construct(private readonly PaymentService $inner) {}

    public function pay(): void
    {
        // Log the operation.
        $this->inner->pay();
    }
}
```

## 6. Validation constraints

Use `use Symfony\Component\Validator\Constraints as Assert;`.

| Attribute | Meaning | Example |
|---|---|---|
| `NotBlank` | Reject blank input | `#[Assert\NotBlank]` |
| `NotNull` | Reject null | `#[Assert\NotNull]` |
| `Email` | Check email format | `#[Assert\Email]` |
| `Length` | String length limits | `#[Assert\Length(min: 3, max: 100)]` |
| `Range` | Numeric bounds | `#[Assert\Range(min: 1, max: 100)]` |
| `Positive` | Number > 0 | `#[Assert\Positive]` |
| `PositiveOrZero` | Number >= 0 | `#[Assert\PositiveOrZero]` |
| `Choice` | Allowed values | `#[Assert\Choice(['active', 'inactive'])]` |
| `Regex` | Regular expression | `#[Assert\Regex('/^[a-z]+$/')]` |
| `Count` | Array size | `#[Assert\Count(min: 1)]` |
| `Unique` | Unique elements in collection | `#[Assert\Unique]` |
| `Type` | PHP value type | `#[Assert\Type('integer')]` |
| `Url` | URL format | `#[Assert\Url]` |
| `Date` | Date string | `#[Assert\Date]` |
| `DateTime` | Datetime string | `#[Assert\DateTime]` |
| `Valid` | Nested object validation | `#[Assert\Valid]` |
| `Callback` | Custom validation | `#[Assert\Callback]` |

Example DTO:

```php
final readonly class RegisterUserDto
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 3, max: 50)]
        public string $username,
        #[Assert\Email]
        public string $email,
        #[Assert\Length(min: 12)]
        public string $password,
        #[Assert\Choice(['user', 'editor'])]
        public string $role = 'user',
    ) {}
}
```

For database-backed uniqueness, use appropriate database constraints; Doctrine integration also offers `UniqueEntity` validation.

## 7. Doctrine ORM mapping attributes

These are Doctrine attributes (`use Doctrine\ORM\Mapping as ORM;`), not Symfony core attributes.

| Attribute | Meaning |
|---|---|
| `Entity` | Persistent entity |
| `Table` | Database table |
| `Id` | Primary key |
| `GeneratedValue` | Generated ID |
| `Column` | Mapped field |
| `UniqueConstraint`, `Index` | Database constraints/indexes |
| `OneToOne`, `OneToMany`, `ManyToOne`, `ManyToMany` | Associations |
| `JoinColumn`, `JoinTable` | Join configuration |
| `HasLifecycleCallbacks`, `PrePersist`, `PreUpdate`, `PostLoad` | Lifecycle hooks |

```php
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

## 8. Event listeners: `#[AsEventListener]`

```php
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
        // Inspect or log the request.
    }
}
```

Higher priority listeners run earlier.

## 9. Console: `#[AsCommand]`

```php
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:cleanup', description: 'Remove temporary files')]
final class CleanupCommand extends Command
{
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Cleanup completed.');
        return Command::SUCCESS;
    }
}
```

Run `php bin/console app:cleanup`. Related attributes include `AsArgument` and `AsOption`.

## 10. Messenger: `#[AsMessageHandler]`

```php
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

Dispatch with `$messageBus->dispatch(new SendEmailMessage('john@example.com'));`. Async execution requires Messenger transport/routing configuration.

## 11. Serializer

```php
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Serializer\Attribute\SerializedName;
use Symfony\Component\Serializer\Attribute\Ignore;

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

Serialize using `$serializer->serialize($user, 'json', ['groups' => ['user:read']]);`. Other attributes include `MaxDepth`, `Context`, and `SerializedPath`.

## 12. Twig: `#[AsTwigFilter]`

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

Twig: `{{ article.description|short_text }}`. Related attributes: `AsTwigFunction`, `AsTwigTest`.

## 13. Scheduler: `#[AsPeriodicTask]`

```php
use Symfony\Component\Scheduler\Attribute\AsPeriodicTask;

#[AsPeriodicTask(frequency: '1 hour')]
final class CleanupTask
{
    public function __invoke(): void
    {
        // Periodic cleanup.
    }
}
```

`AsCronTask` supports cron-style schedules. A configured Scheduler worker is required.

## 14. Combined REST API example

DTO:

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
        public int $price,
    ) {}
}
```

Controller:

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
    public function list(#[MapQueryParameter] int $page = 1): JsonResponse
    {
        return $this->json(['page' => $page, 'products' => []]);
    }

    #[Route('', name: 'create', methods: ['POST'], format: 'json')]
    #[IsGranted('ROLE_ADMIN')]
    public function create(#[MapRequestPayload] CreateProductDto $dto): JsonResponse
    {
        // Persist the product using an injected application service.
        return $this->json(['name' => $dto->name, 'price' => $dto->price], 201);
    }
}
```

This demonstrates routing, request DTO mapping, validation, query parameter injection, and authorization. Database persistence is intentionally omitted.

## 15. Inspect your application

```bash
composer show 'symfony/*'
php bin/console debug:router
php bin/console debug:container
php bin/console debug:event-dispatcher
php bin/console debug:messenger
```

## 16. Recommended learning order for Symfony REST APIs

1. `Route`
2. `MapRequestPayload`
3. `MapQueryParameter` and `MapQueryString`
4. `IsGranted` and `CurrentUser`
5. Validator constraints (`Assert\*`)
6. Doctrine mapping (`ORM\*`)
7. `Autowire` and service registration
8. `AsEventListener`
9. Serializer `Groups`
10. `AsMessageHandler`

Prefer thin controllers, validated DTOs, dedicated application services, and authorization checks at the appropriate boundary.

## Official documentation

- [Symfony 8.0 attribute reference](https://symfony.com/doc/8.0/reference/attributes.html)
- [Symfony routing](https://symfony.com/doc/8.0/routing.html)
- [Symfony controller request mapping](https://symfony.com/doc/8.0/controller.html)
- [Symfony validation](https://symfony.com/doc/8.0/validation.html)
- [Symfony security](https://symfony.com/doc/8.0/security.html)

> Note: The available attributes depend on the exact Symfony version and installed packages. This is a practical overview, not an exhaustive API inventory.
