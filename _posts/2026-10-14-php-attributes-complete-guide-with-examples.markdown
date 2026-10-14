---
layout: post
title:  "PHP Attributes - Complete Guide with Examples"
date:   2026-10-14 06:46:56
categories: PHP
description: PHP Attributes - Complete Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: PHP attributes, introduced in PHP 8.0, let developers attach structured metadata to classes, methods, properties, functions, parameters, and constants. They are conceptually similar to Java annotations and are widely used by Symfony and Doctrine.
---
PHP attributes, introduced in **PHP 8.0**, let developers attach structured metadata to classes, methods, properties, functions, parameters, and constants. They are conceptually similar to Java annotations and are widely used by Symfony and Doctrine.

Attributes describe metadata; they **do not execute behavior automatically**. A framework or application reads and interprets them, usually using Reflection.

## 1. What are PHP attributes?

```php
#[Example]
class MyClass {}
```

Attributes can accept arguments:

```php
#[Route('/users', methods: ['GET'])]
public function getUsers(): array { return []; }
```

The example assumes a `Route` attribute supported by a framework or defined by your application.

### PHP attributes vs Java annotations

| Java | PHP |
|---|---|
| `@Override` | `#[Override]` |
| `@Deprecated` | `#[Deprecated]` |
| `@GetMapping("/users")` | `#[Route('/users', methods: ['GET'])]` |
| `@Entity` | `#[ORM\Entity]` |
| Java Reflection API | PHP Reflection API |
| `@interface` | `#[Attribute] class` |

## 2. Creating a custom attribute

### Define the attribute

```php
<?php

#[Attribute]
class Description
{
    public function __construct(public string $text) {}
}
```

### Apply it

```php
#[Description('Represents a user')]
class User
{
    #[Description("The user's email address")]
    public string $email;
}
```

### Read it using Reflection

```php
$reflection = new ReflectionClass(User::class);
$attributes = $reflection->getAttributes(Description::class);

foreach ($attributes as $attribute) {
    $instance = $attribute->newInstance();
    echo $instance->text;
}
```

Output:

```text
Represents a user
```

| Reflection method | Purpose |
|---|---|
| `getAttributes()` | Gets attributes attached to a declaration |
| `getName()` | Returns an attribute's class name |
| `getArguments()` | Returns its arguments without instantiating it |
| `newInstance()` | Instantiates the attribute class |

## 3. Restricting where attributes can be used

```php
#[Attribute(Attribute::TARGET_METHOD)]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}
```

```php
class UserController
{
    #[Route('/users', 'GET')]
    public function index(): string { return 'List of users'; }

    #[Route('/users', 'POST')]
    public function create(): string { return 'Create a user'; }
}
```

| Constant | Target |
|---|---|
| `Attribute::TARGET_CLASS` | Classes, interfaces, traits and enums |
| `Attribute::TARGET_METHOD` | Methods |
| `Attribute::TARGET_PROPERTY` | Properties |
| `Attribute::TARGET_FUNCTION` | Functions |
| `Attribute::TARGET_PARAMETER` | Parameters |
| `Attribute::TARGET_CLASS_CONSTANT` | Class constants and enum cases |
| `Attribute::TARGET_ALL` | All supported targets |

Combine targets using bitwise OR:

```php
#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Permission
{
    public function __construct(public string $name) {}
}
```

An invalid target generally produces an error when Reflection instantiates the attribute, rather than when PHP first loads the declaration.

## 4. Attributes with multiple arguments

```php
#[Attribute(Attribute::TARGET_PROPERTY)]
class Validate
{
    public function __construct(
        public bool $required = false,
        public int $minLength = 0,
        public int $maxLength = 255
    ) {}
}
```

```php
class User
{
    #[Validate(required: true, minLength: 3, maxLength: 50)]
    public string $username;

    #[Validate(required: true, maxLength: 100)]
    public string $email;
}
```

Read the values:

```php
$reflection = new ReflectionProperty(User::class, 'username');
$attributes = $reflection->getAttributes(Validate::class);
$validation = $attributes[0]->newInstance();

echo $validation->required;   // 1
echo $validation->minLength;  // 3
echo $validation->maxLength;  // 50
```

## 5. Practical example: Building a simple routing system

### Define the Route attribute

```php
#[Attribute(Attribute::TARGET_METHOD)]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}
```

### Create a controller

```php
class UserController
{
    #[Route('/api/users', 'GET')]
    public function index(): array
    {
        return [
            ['id' => 1, 'name' => 'John'],
            ['id' => 2, 'name' => 'Alice']
        ];
    }

    #[Route('/api/users', 'POST')]
    public function create(): array
    {
        return ['message' => 'User created'];
    }
}
```

### Discover routes automatically

```php
$controller = new UserController();
$reflection = new ReflectionClass($controller);
$routes = [];

foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
    $attributes = $method->getAttributes(Route::class);

    foreach ($attributes as $attribute) {
        $route = $attribute->newInstance();
        $routes[] = [
            'path' => $route->path,
            'httpMethod' => $route->method,
            'handler' => [$controller, $method->getName()]
        ];
    }
}
```

### Execute the matching route

```php
$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];

foreach ($routes as $route) {
    if ($route['path'] === $requestPath &&
        $route['httpMethod'] === $requestMethod) {
        header('Content-Type: application/json');
        echo json_encode(call_user_func($route['handler']));
        exit;
    }
}

http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Route not found']);
```

This is a simplified demonstration. Production routing requires robust request handling, input validation, authentication, authorization, and error handling.

## 6. Practical example: Authorization

```php
#[Attribute(Attribute::TARGET_METHOD)]
class RequiresRole
{
    public function __construct(public string $role) {}
}
```

```php
class AdminController
{
    #[RequiresRole('ADMIN')]
    public function deleteUser(): void { echo 'User deleted'; }

    #[RequiresRole('USER')]
    public function profile(): void { echo 'User profile'; }
}
```

```php
function executeMethod(
    object $controller,
    string $methodName,
    array $userRoles
): void {
    $reflection = new ReflectionMethod($controller, $methodName);
    $attributes = $reflection->getAttributes(RequiresRole::class);

    foreach ($attributes as $attribute) {
        $permission = $attribute->newInstance();
        if (!in_array($permission->role, $userRoles, true)) {
            throw new RuntimeException('Access denied');
        }
    }

    $reflection->invoke($controller);
}

$controller = new AdminController();
executeMethod($controller, 'deleteUser', ['ADMIN']);
```

Output:

```text
User deleted
```

**Security note:** This is an illustrative example, not a complete authorization solution. Enforce authorization centrally, obtain roles from a trusted authenticated identity, and establish a default policy for unannotated methods.

## 7. Practical example: Property validation

```php
#[Attribute(Attribute::TARGET_PROPERTY)]
class NotBlank
{
    public function __construct(
        public string $message = 'Field cannot be blank'
    ) {}
}
```

```php
class CreateUserRequest
{
    #[NotBlank('Username is required')]
    public string $username = '';

    #[NotBlank('Email is required')]
    public string $email = '';
}
```

```php
function validate(object $object): array
{
    $errors = [];
    $reflection = new ReflectionClass($object);

    foreach ($reflection->getProperties() as $property) {
        $attributes = $property->getAttributes(NotBlank::class);

        foreach ($attributes as $attribute) {
            $validation = $attribute->newInstance();
            $value = $property->getValue($object);

            if (!is_string($value) || trim($value) === '') {
                $errors[$property->getName()] = $validation->message;
            }
        }
    }

    return $errors;
}

$request = new CreateUserRequest();
$request->username = '';
$request->email = 'john@example.com';
print_r(validate($request));
```

Output:

```text
Array
(
    [username] => Username is required
)
```

## 8. Real-world example: Symfony 8

### Routing

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/users', name: 'api_users', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return $this->json([
            ['id' => 1, 'name' => 'John'],
            ['id' => 2, 'name' => 'Alice']
        ]);
    }
}
```

### Validation

```php
<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class CreateUserDTO
{
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 50)]
    public string $username = '';

    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email = '';
}
```

### Security

```php
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
public function adminDashboard(): JsonResponse
{
    return $this->json(['message' => 'Welcome admin']);
}
```

Symfony integrates these attributes into its routing, validation, and authorization systems.

## 9. Real-world example: Doctrine ORM

```php
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'users')]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 100)]
    private string $name;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private string $email;
}
```

| Attribute | Purpose |
|---|---|
| `#[ORM\Entity]` | Declares an entity |
| `#[ORM\Table]` | Defines the table name |
| `#[ORM\Id]` | Marks the primary key |
| `#[ORM\GeneratedValue]` | Configures generated IDs |
| `#[ORM\Column]` | Maps a property to a column |

## 10. Repeatable attributes

```php
#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}
```

```php
class ProductController
{
    #[Route('/products', 'GET')]
    #[Route('/api/products', 'GET')]
    public function index(): array { return []; }
}
```

```php
$reflection = new ReflectionMethod(ProductController::class, 'index');
$attributes = $reflection->getAttributes(Route::class);

foreach ($attributes as $attribute) {
    $route = $attribute->newInstance();
    echo $route->path . PHP_EOL;
}
```

Output:

```text
/products
/api/products
```

## 11. Built-in PHP attributes

| Attribute | PHP version | Purpose |
|---|---|---|
| `#[Attribute]` | 8.0 | Defines an attribute class |
| `#[Deprecated]` | 8.4 | Marks a declaration as deprecated |
| `#[Override]` | 8.3 | Verifies a method overrides or implements an inherited declaration |
| `#[SensitiveParameter]` | 8.2 | Hides parameter values in generated stack traces |
| `#[AllowDynamicProperties]` | 8.2 | Allows dynamic properties without deprecation warnings |
| `#[ReturnTypeWillChange]` | 8.1 | Temporarily suppresses return-type compatibility warnings |

### Override

```php
class BaseController
{
    public function index(): void {}
}

class UserController extends BaseController
{
    #[Override]
    public function index(): void { echo 'Users'; }
}
```

### SensitiveParameter

```php
function login(
    string $username,
    #[SensitiveParameter] string $password
): void {
    throw new Exception('Login failed');
}
```

This protects the argument from exposure in PHP-generated stack trace arguments; it does not encrypt the value or prevent arbitrary application logging.

### Deprecated

```php
#[Deprecated(message: 'Use newMethod() instead', since: '2.0')]
function oldMethod(): void {}
```

Starting with PHP 8.4, invoking the function triggers a deprecation warning.

## 12. Attributes vs PHPDoc annotations

Older Doctrine-style PHPDoc annotations:

```php
/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User {}
```

Native attributes:

```php
#[ORM\Entity]
#[ORM\Table(name: 'users')]
class User {}
```

| Feature | PHPDoc annotations | PHP attributes |
|---|---|---|
| Native PHP feature | No | Yes |
| Native Reflection access | No; parsing required | Yes |
| IDE autocomplete | Tool-dependent | Generally supported |
| Constructor type checking | No native enforcement | Yes, when instantiated |
| External annotation parser | Usually | No |

PHPDoc remains useful for documentation, static analysis, and generic types.

## 13. Do attributes affect performance?

Attributes do not execute automatically. Performance considerations arise when applications use Reflection to read them or `newInstance()` to construct attribute objects. Frameworks may cache processed metadata to reduce repeated work.

## 14. When should you use PHP attributes?

Common use cases include:

- **Routing:** Associate methods with HTTP paths and methods.
- **Validation:** Declare DTO or entity constraints.
- **Authorization:** Describe required roles or permissions.
- **ORM mapping:** Associate objects with database tables and columns.
- **Dependency injection:** Configure services and injection.
- **Serialization:** Control JSON or other representations.
- **Event handling:** Mark listener methods.
- **Testing:** Supply test metadata.

Avoid attributes that merely duplicate business logic or obscure execution flow.

## 15. Recommended approach for PHP projects

Keep metadata declarations separate from the logic interpreting them:

```text
Controller / DTO / Entity
        |
        v
Reflection / Metadata Reader
        |
        v
Router / Validator / Security Handler
        |
        v
Application Behavior
```

For Symfony 8, prefer the framework's built-in routing, validation, and security attributes instead of creating custom replacements without a specific need. In CodeIgniter 4, custom attributes can be useful for application-specific metadata, but you must implement the reader and behavior yourself unless a library already supports them.

**Key takeaway:** PHP attributes are structured metadata. The application or framework is responsible for reading and acting on that metadata.
