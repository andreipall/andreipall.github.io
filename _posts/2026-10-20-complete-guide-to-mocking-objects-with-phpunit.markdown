---
layout: post
title:  "Complete Guide to Mocking Objects with PHPUnit"
date:   2026-10-20 06:46:56
categories: PHP
description: Complete Guide to Mocking Objects with PHPUnit
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Mocking is one of the most important techniques in PHP unit testing. It allows you to test a class without executing its real dependencies, such as database connections, HTTP requests, external APIs, email services, or other classes.
---
Mocking is one of the most important techniques in PHP unit testing. It allows you to test a class **without executing its real dependencies**, such as database connections, HTTP requests, external APIs, email services, or other classes.

This guide covers PHPUnit mocking from beginner to advanced level, with practical examples using modern PHP (8.2+) and PHPUnit 11/12-style APIs.

We'll cover the following:

1. What mocks are and when to use them
2. Installing and configuring PHPUnit
3. `createMock()` and `createStub()`
4. Configuring return values
5. Verifying method calls and arguments
6. Mocking exceptions
7. Mocking interfaces, abstract classes, and concrete classes
8. Mocking database dependencies (MySQLi and PDO)
9. Mocking HTTP clients and APIs
10. Mocking multiple calls and callbacks
11. Partial mocks using `getMockBuilder()`
12. Mocking static methods, final classes, and constructors
13. Data providers and dependency injection
14. Common mistakes and best practices
15. A complete real-world example

## 1. What is mocking?

Suppose you have a PHP class that retrieves information from a database:

```php
class UserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function getUsername(int $id): string
    {
        $user = $this->repository->findById($id);

        return $user['username'];
    }
}
```

Normally, `UserRepository` connects to a real database.

But when testing `UserService`, we want to test only the business logic, not the database itself.

With PHPUnit, we can replace the repository with a mock object:

```php
$repository = $this->createMock(UserRepository::class);
```

We can configure the mock to return predefined data:

```php
$repository->method('findById')
    ->willReturn([
        'id' => 1,
        'username' => 'andrei'
    ]);
```

When the service calls `$repository->findById(1)`, PHPUnit returns the predefined array instead of querying a database.

### Mock vs Stub vs Fake vs Spy

| Type | Purpose |
|---|---|
| Stub | Returns predefined values |
| Mock | Verifies method calls and arguments |
| Fake | Provides a simplified working implementation, such as an in-memory repository |
| Spy | Records calls so they can be inspected later |

PHPUnit primarily provides mocks and stubs. Its mock objects can also record and verify interactions.

**General rule:** Use a stub when you only need to control return values. Use a mock when you need to verify that a dependency was called correctly.

## 2. Installing PHPUnit

Install PHPUnit using Composer:

```bash
composer require --dev phpunit/phpunit
```

Check the installed version:

```bash
vendor/bin/phpunit --version
```

A typical project structure:

```text
my-project/
├── composer.json
├── phpunit.xml
├── src/
│   ├── UserRepository.php
│   └── UserService.php
├── tests/
│   └── UserServiceTest.php
└── vendor/
```

Example `composer.json`:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "require-dev": {
        "phpunit/phpunit": "^12.0"
    }
}
```

Regenerate the autoloader:

```bash
composer dump-autoload
```

Example `phpunit.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit
    bootstrap="vendor/autoload.php"
    colors="true"
>
    <testsuites>
        <testsuite name="Unit Tests">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

Run all tests:

```bash
vendor/bin/phpunit
```

Run a specific test:

```bash
vendor/bin/phpunit tests/UserServiceTest.php
```

## 3. Basic mocking with `createMock()`

First, define a dependency.

**`src/UserRepository.php`**

```php
<?php

namespace App;

class UserRepository
{
    public function findById(int $id): ?array
    {
        // Real database query
        return null;
    }
}
```

**`src/UserService.php`**

```php
<?php

namespace App;

class UserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function getUsername(int $id): ?string
    {
        $user = $this->repository->findById($id);

        return $user['username'] ?? null;
    }
}
```

Now create the test.

**`tests/UserServiceTest.php`**

```php
<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use App\UserRepository;
use App\UserService;

class UserServiceTest extends TestCase
{
    public function testGetUsername(): void
    {
        // 1. Create the mock
        $repository = $this->createMock(
            UserRepository::class
        );

        // 2. Configure the mock
        $repository->method('findById')
            ->willReturn([
                'id' => 1,
                'username' => 'andrei'
            ]);

        // 3. Inject the mock
        $service = new UserService($repository);

        // 4. Execute the real method
        $result = $service->getUsername(1);

        // 5. Verify the result
        $this->assertSame('andrei', $result);
    }
}
```

**What happens?**

The `UserService` object is real. The `UserRepository` object is mocked. The `findById()` method does not execute its original implementation.

This is the foundation of PHPUnit mocking.

## 4. `createMock()` vs `createStub()`

Both create test doubles, but they communicate different intentions.

### Using `createStub()`

Use a stub when you only need predefined return values.

```php
public function testGetUsernameWithStub(): void
{
    $repository = $this->createStub(
        UserRepository::class
    );

    $repository->method('findById')
        ->willReturn([
            'id' => 2,
            'username' => 'john'
        ]);

    $service = new UserService($repository);

    $this->assertSame(
        'john',
        $service->getUsername(2)
    );
}
```

### Using `createMock()`

Use a mock when you want to verify interactions.

```php
public function testRepositoryIsCalledOnce(): void
{
    $repository = $this->createMock(
        UserRepository::class
    );

    $repository->expects($this->once())
        ->method('findById')
        ->with(5)
        ->willReturn([
            'id' => 5,
            'username' => 'maria'
        ]);

    $service = new UserService($repository);

    $result = $service->getUsername(5);

    $this->assertSame('maria', $result);
}
```

Here PHPUnit verifies that:

- `findById()` is called exactly once.
- The argument is `5`.
- The service returns `maria`.

If the service calls the repository twice, or passes the wrong argument, the test fails.

## 5. Configuring return values

PHPUnit offers several ways to control the behavior of mocked methods.

For these examples, assume we have this interface:

```php
interface CalculatorInterface
{
    public function add(int $a, int $b): int;

    public function format(string $value): string;

    public function getStatus(): string;
}
```

### 5.1 `willReturn()` — fixed value

```php
$calculator = $this->createStub(
    CalculatorInterface::class
);

$calculator->method('add')
    ->willReturn(100);

$this->assertSame(100, $calculator->add(5, 10));
```

The method always returns `100`, regardless of its arguments.

### 5.2 Different values on consecutive calls

```php
$calculator = $this->createStub(
    CalculatorInterface::class
);

$calculator->method('getStatus')
    ->willReturn('pending', 'processing', 'completed');

$this->assertSame('pending', $calculator->getStatus());
$this->assertSame('processing', $calculator->getStatus());
$this->assertSame('completed', $calculator->getStatus());
```

This is useful for testing retries, polling, and state transitions.

Calling the method more times than the configured values causes an error.

### 5.3 `willReturnMap()` — return values based on arguments

```php
$calculator = $this->createStub(
    CalculatorInterface::class
);

$calculator->method('add')
    ->willReturnMap([
        [1, 2, 3],
        [5, 10, 15],
        [20, 30, 50]
    ]);

$this->assertSame(3, $calculator->add(1, 2));
$this->assertSame(15, $calculator->add(5, 10));
$this->assertSame(50, $calculator->add(20, 30));
```

Each row contains the method arguments followed by the return value.

### 5.4 `willReturnCallback()` — dynamic return values

This is particularly useful when the return value depends on the arguments.

```php
$calculator = $this->createStub(
    CalculatorInterface::class
);

$calculator->method('add')
    ->willReturnCallback(
        function (int $a, int $b): int {
            return $a + $b;
        }
    );

$this->assertSame(15, $calculator->add(5, 10));
$this->assertSame(30, $calculator->add(10, 20));
```

The callback executes instead of the real method.

You can also use arrow functions:

```php
$calculator->method('add')
    ->willReturnCallback(
        fn(int $a, int $b): int => $a + $b
    );
```

### 5.5 `willReturnArgument()` — return an argument

```php
$calculator = $this->createStub(
    CalculatorInterface::class
);

$calculator->method('format')
    ->willReturnArgument(0);

$this->assertSame(
    'hello',
    $calculator->format('hello')
);
```

Argument numbering starts at zero.

### 5.6 `willReturnSelf()` — fluent interfaces

Suppose you have a query builder:

```php
interface QueryBuilderInterface
{
    public function where(string $condition): self;

    public function limit(int $limit): self;
}
```

You can configure methods to return the mocked object itself:

```php
$builder = $this->createStub(
    QueryBuilderInterface::class
);

$builder->method('where')->willReturnSelf();
$builder->method('limit')->willReturnSelf();

$result = $builder
    ->where('active = 1')
    ->limit(10);

$this->assertSame($builder, $result);
```

This is useful when mocking fluent APIs.

## 6. Verifying method calls

One of the main reasons to use `createMock()` is to verify that a method was called correctly.

### 6.1 Verify a method was called once

```php
$repository = $this->createMock(
    UserRepository::class
);

$repository->expects($this->once())
    ->method('findById')
    ->with(1)
    ->willReturn([
        'id' => 1,
        'username' => 'andrei'
    ]);

$service = new UserService($repository);

$service->getUsername(1);
```

### 6.2 Verify a method was called exactly three times

```php
$repository->expects($this->exactly(3))
    ->method('findById')
    ->willReturn(['username' => 'test']);

$service = new UserService($repository);

$service->getUsername(1);
$service->getUsername(2);
$service->getUsername(3);
```

### 6.3 Verify a method was never called

```php
$repository->expects($this->never())
    ->method('findById');

$service = new UserService($repository);

// No repository method should be invoked here.
```

This is useful for verifying that invalid input is rejected before accessing the database.

### Available invocation matchers

| Matcher | Meaning |
|---|---|
| `$this->once()` | Exactly once |
| `$this->exactly(3)` | Exactly three times |
| `$this->never()` | Zero times |
| `$this->atLeastOnce()` | One or more times |
| `$this->atLeast(2)` | Two or more times |
| `$this->atMost(3)` | No more than three times |

Prefer exact expectations where possible. Non-exact matchers can make tests less precise.

## 7. Verifying method arguments

Suppose you have:

```php
interface EmailSenderInterface
{
    public function send(
        string $email,
        string $subject,
        string $body
    ): bool;
}
```

### 7.1 Verify exact arguments

```php
$emailSender = $this->createMock(
    EmailSenderInterface::class
);

$emailSender->expects($this->once())
    ->method('send')
    ->with(
        'test@example.com',
        'Welcome',
        'Hello!'
    )
    ->willReturn(true);

$emailSender->send(
    'test@example.com',
    'Welcome',
    'Hello!'
);
```

In a normal unit test, the final method call should come from the real class under test rather than being invoked directly on the mock. The example above isolates the syntax.

### 7.2 Use argument constraints

```php
$emailSender->expects($this->once())
    ->method('send')
    ->with(
        $this->stringContains('@example.com'),
        $this->equalTo('Welcome'),
        $this->isType('string')
    )
    ->willReturn(true);
```

Useful constraints include:

| Constraint | Example |
|---|---|
| `equalTo()` | `$this->equalTo(10)` |
| `identicalTo()` | `$this->identicalTo($object)` |
| `isType()` | `$this->isType('string')` |
| `isInstanceOf()` | `$this->isInstanceOf(User::class)` |
| `stringContains()` | `$this->stringContains('hello')` |
| `greaterThan()` | `$this->greaterThan(0)` |
| `callback()` | `$this->callback(fn($x) => $x > 5)` |

### 7.3 Verify arguments using callbacks

```php
$emailSender->expects($this->once())
    ->method('send')
    ->with(
        $this->callback(
            fn(string $email): bool =>
                filter_var($email, FILTER_VALIDATE_EMAIL) !== false
        ),
        'Welcome',
        $this->callback(
            fn(string $body): bool =>
                strlen($body) > 5
        )
    )
    ->willReturn(true);
```

This is useful when exact values are unknown but must satisfy certain conditions.

## 8. Mocking exceptions

Sometimes you need to simulate an error.

For example, a database repository may throw an exception when a query fails.

```php
interface DatabaseInterface
{
    public function query(string $sql): array;
}
```

```php
class ReportService
{
    public function __construct(
        private DatabaseInterface $database
    ) {}

    public function getReport(): array
    {
        try {
            return $this->database->query(
                'SELECT * FROM reports'
            );
        } catch (\RuntimeException $e) {
            return [];
        }
    }
}
```

Test the failure scenario:

```php
public function testDatabaseFailure(): void
{
    $database = $this->createStub(
        DatabaseInterface::class
    );

    $database->method('query')
        ->willThrowException(
            new \RuntimeException('Connection failed')
        );

    $service = new ReportService($database);

    $this->assertSame([], $service->getReport());
}
```

You can also verify that the tested class propagates an exception:

```php
$this->expectException(\RuntimeException::class);
$this->expectExceptionMessage('Connection failed');

$database->query('SELECT * FROM reports');
```

## 9. Mocking interfaces and abstract classes

### Mocking an interface

Interfaces are usually the best dependencies to mock.

```php
interface LoggerInterface
{
    public function log(string $message): void;
}
```

```php
class ImportService
{
    public function __construct(
        private LoggerInterface $logger
    ) {}

    public function import(): void
    {
        $this->logger->log('Import started');
    }
}
```

Test:

```php
public function testImportLogsMessage(): void
{
    $logger = $this->createMock(
        LoggerInterface::class
    );

    $logger->expects($this->once())
        ->method('log')
        ->with('Import started');

    $service = new ImportService($logger);

    $service->import();
}
```

The test verifies behavior without requiring a real logging system.

### Mocking an abstract class

```php
abstract class FileProcessor
{
    abstract public function read(): string;

    public function process(): string
    {
        return strtoupper($this->read());
    }
}
```

Create a partial mock that replaces only `read()`:

```php
public function testAbstractClass(): void
{
    $processor = $this->createPartialMock(
        FileProcessor::class,
        ['read']
    );

    $processor->method('read')
        ->willReturn('hello');

    $this->assertSame(
        'HELLO',
        $processor->process()
    );
}
```

The `read()` method is mocked, but `process()` executes its original implementation.

## 10. Mocking database operations with MySQLi

This is particularly relevant for PHP applications using procedural MySQLi.

There is an important distinction: **PHPUnit mocks objects, not arbitrary procedural functions.**

For example:

```php
$conn = mysqli_connect(
    'localhost',
    'root',
    'password',
    'database'
);

$result = mysqli_query(
    $conn,
    'SELECT * FROM users'
);
```

You cannot directly replace the global `mysqli_query()` function using PHPUnit's `createMock()`.

The recommended solution is to introduce a small interface around database operations.

### Step 1: Create a database interface

```php
interface DatabaseInterface
{
    public function fetchUser(int $id): ?array;
}
```

### Step 2: Create the real implementation

```php
class MySQLDatabase implements DatabaseInterface
{
    public function __construct(
        private \mysqli $connection
    ) {}

    public function fetchUser(int $id): ?array
    {
        $stmt = mysqli_prepare(
            $this->connection,
            'SELECT id, username FROM users WHERE id = ?'
        );

        mysqli_stmt_bind_param($stmt, 'i', $id);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        $user = mysqli_fetch_assoc($result) ?: null;

        mysqli_stmt_close($stmt);

        return $user;
    }
}
```

The implementation still uses procedural MySQLi functions.

### Step 3: Create the service

```php
class UserManager
{
    public function __construct(
        private DatabaseInterface $database
    ) {}

    public function getUserName(int $id): ?string
    {
        $user = $this->database->fetchUser($id);

        return $user['username'] ?? null;
    }
}
```

### Step 4: Mock the database

```php
public function testGetUserName(): void
{
    $database = $this->createMock(
        DatabaseInterface::class
    );

    $database->expects($this->once())
        ->method('fetchUser')
        ->with(10)
        ->willReturn([
            'id' => 10,
            'username' => 'andrei'
        ]);

    $manager = new UserManager($database);

    $this->assertSame(
        'andrei',
        $manager->getUserName(10)
    );
}
```

No real MySQL connection is created.

This pattern works with procedural MySQLi, object-oriented MySQLi, PDO, and other database libraries.

## 11. Mocking PDO

PDO supports prepared statements and can also be mocked.

Consider:

```php
class ProductRepository
{
    public function __construct(
        private \PDO $pdo
    ) {}

    public function find(int $id): array|false
    {
        $stmt = $this->pdo->prepare(
            'SELECT * FROM products WHERE id = :id'
        );

        $stmt->execute(['id' => $id]);

        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
```

Test:

```php
public function testFindProduct(): void
{
    $statement = $this->createMock(
        \PDOStatement::class
    );

    $statement->expects($this->once())
        ->method('execute')
        ->with(['id' => 5])
        ->willReturn(true);

    $statement->method('fetch')
        ->with(\PDO::FETCH_ASSOC)
        ->willReturn([
            'id' => 5,
            'name' => 'Laptop'
        ]);

    $pdo = $this->createMock(\PDO::class);

    $pdo->expects($this->once())
        ->method('prepare')
        ->with(
            'SELECT * FROM products WHERE id = :id'
        )
        ->willReturn($statement);

    $repository = new ProductRepository($pdo);

    $product = $repository->find(5);

    $this->assertSame('Laptop', $product['name']);
}
```

This example mocks two objects:

- `PDO` to simulate statement preparation.
- `PDOStatement` to simulate statement execution and returned rows.

No database is required.

For most business-service tests, mocking a repository interface is simpler than mocking PDO internals. Reserve the latter for testing repository logic.

## 12. Mocking HTTP requests and external APIs

Suppose you have a service that retrieves data from an external API.

First, create an HTTP client interface:

```php
interface HttpClientInterface
{
    public function get(string $url): array;
}
```

Create the service:

```php
class WeatherService
{
    public function __construct(
        private HttpClientInterface $httpClient
    ) {}

    public function getTemperature(string $city): int
    {
        $data = $this->httpClient->get(
            'https://api.example.com/weather?city=' .
            rawurlencode($city)
        );

        return $data['temperature'];
    }
}
```

Test:

```php
public function testGetTemperature(): void
{
    $client = $this->createMock(
        HttpClientInterface::class
    );

    $client->expects($this->once())
        ->method('get')
        ->with(
            'https://api.example.com/weather?city=London'
        )
        ->willReturn([
            'temperature' => 22
        ]);

    $service = new WeatherService($client);

    $this->assertSame(
        22,
        $service->getTemperature('London')
    );
}
```

This approach also works for cURL wrappers, Guzzle adapters, and framework HTTP clients.

## 13. Mocking multiple calls with different arguments

Consider a service that processes multiple user IDs.

```php
class BatchUserService
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function getUsernames(array $ids): array
    {
        $names = [];

        foreach ($ids as $id) {
            $user = $this->repository->findById($id);

            if ($user !== null) {
                $names[] = $user['username'];
            }
        }

        return $names;
    }
}
```

We want to verify that `findById()` is called three times with the correct IDs.

```php
public function testMultipleCalls(): void
{
    $repository = $this->createMock(
        UserRepository::class
    );

    $expectedIds = [1, 2, 3];
    $callIndex = 0;

    $repository->expects($this->exactly(3))
        ->method('findById')
        ->willReturnCallback(
            function (int $id) use (
                $expectedIds,
                &$callIndex
            ): array {
                $this->assertSame(
                    $expectedIds[$callIndex],
                    $id
                );

                $callIndex++;

                return [
                    'id' => $id,
                    'username' => 'user' . $id
                ];
            }
        );

    $service = new BatchUserService($repository);

    $result = $service->getUsernames([1, 2, 3]);

    $this->assertSame(
        ['user1', 'user2', 'user3'],
        $result
    );
}
```

This verifies both the number of calls and their order.

Older tutorials sometimes use `withConsecutive()`. That method was removed in PHPUnit 10, so callbacks are a useful alternative.

## 14. Partial mocks with `getMockBuilder()`

A partial mock replaces only selected methods while allowing the others to execute normally.

Suppose we have:

```php
class PriceCalculator
{
    public function getTaxRate(): float
    {
        // Normally loaded from configuration
        return 0.21;
    }

    public function calculateTotal(float $price): float
    {
        return $price * (1 + $this->getTaxRate());
    }
}
```

We want to test `calculateTotal()` without depending on the actual configured tax rate.

```php
public function testCalculateTotal(): void
{
    $calculator = $this->getMockBuilder(
        PriceCalculator::class
    )
        ->disableOriginalConstructor()
        ->onlyMethods(['getTaxRate'])
        ->getMock();

    $calculator->method('getTaxRate')
        ->willReturn(0.10);

    $this->assertEqualsWithDelta(
        110.0,
        $calculator->calculateTotal(100),
        0.00001
    );
}
```

Here:

- `getTaxRate()` is mocked.
- `calculateTotal()` runs its real code.
- The original constructor is not called.

For simpler cases, use:

```php
$calculator = $this->createPartialMock(
    PriceCalculator::class,
    ['getTaxRate']
);
```

Partial mocks are useful for legacy code, but dependency injection is usually a better long-term design.

## 15. Mocking static methods, final classes, and constructors

### Static methods

PHPUnit cannot directly mock static methods with `createMock()`.

For example:

```php
class Configuration
{
    public static function get(string $key): string
    {
        return 'production';
    }
}
```

Instead, wrap the static call in an injectable object:

```php
interface ConfigProviderInterface
{
    public function get(string $key): string;
}

class ConfigProvider implements ConfigProviderInterface
{
    public function get(string $key): string
    {
        return Configuration::get($key);
    }
}
```

Now you can mock `ConfigProviderInterface`.

### Final classes

PHPUnit's native test-double mechanism cannot mock final classes directly.

For example:

```php
final class ExternalApiClient
{
    public function fetch(): array
    {
        return [];
    }
}
```

Prefer defining an interface and depending on that interface:

```php
interface ApiClientInterface
{
    public function fetch(): array;
}
```

Your final implementation can implement the interface, while tests mock the interface.

### Constructors

By default, `createMock()` does not execute the original constructor.

```php
$repository = $this->createMock(
    UserRepository::class
);
```

If you need a constructor to execute while mocking selected methods:

```php
$mock = $this->getMockBuilder(SomeClass::class)
    ->setConstructorArgs([$dependency])
    ->onlyMethods(['externalCall'])
    ->getMock();
```

This calls the real constructor and mocks `externalCall()`.

Be careful when the constructor opens database connections, accesses the filesystem, or performs network operations.

## 16. Data providers with mocked dependencies

Data providers let you run the same test with different inputs.

```php
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

final class UserServiceTest extends TestCase
{
    public static function userProvider(): array
    {
        return [
            'existing user' => [
                ['username' => 'andrei'],
                'andrei'
            ],
            'missing user' => [
                null,
                null
            ]
        ];
    }

    #[DataProvider('userProvider')]
    public function testGetUsername(
        ?array $user,
        ?string $expected
    ): void {
        $repository = $this->createStub(
            UserRepository::class
        );

        $repository->method('findById')
            ->willReturn($user);

        $service = new UserService($repository);

        $this->assertSame(
            $expected,
            $service->getUsername(1)
        );
    }
}
```

Notice that the data provider returns simple values, not mock objects. The test doubles are created inside the test method.

## 17. Complete real-world example: website archiving service

Here is a more realistic example involving a service that manages website archiving jobs.

The application needs to:

- Look up a website in a repository.
- Start an archiving job.
- Log the operation.
- Handle errors.

We will mock the repository, crawler, and logger.

### Step 1: Define the interfaces

**`src/ArchiveRepositoryInterface.php`**

```php
<?php

namespace App;

interface ArchiveRepositoryInterface
{
    public function findByPrefix(string $prefix): ?array;

    public function updateStatus(
        string $prefix,
        string $status
    ): bool;
}
```

**`src/CrawlerInterface.php`**

```php
<?php

namespace App;

interface CrawlerInterface
{
    public function start(string $url): string;
}
```

**`src/LoggerInterface.php`**

```php
<?php

namespace App;

interface LoggerInterface
{
    public function info(string $message): void;

    public function error(string $message): void;
}
```

### Step 2: Create the service

**`src/ArchiveService.php`**

```php
<?php

namespace App;

class ArchiveService
{
    public function __construct(
        private ArchiveRepositoryInterface $repository,
        private CrawlerInterface $crawler,
        private LoggerInterface $logger
    ) {}

    public function startArchive(string $prefix): bool
    {
        $site = $this->repository->findByPrefix($prefix);

        if ($site === null) {
            $this->logger->error(
                "Website not found: {$prefix}"
            );

            return false;
        }

        try {
            $jobId = $this->crawler->start($site['url']);

            $updated = $this->repository->updateStatus(
                $prefix,
                'running'
            );

            if (!$updated) {
                $this->logger->error(
                    "Could not update archive status: {$prefix}"
                );

                return false;
            }

            $this->logger->info(
                "Archive started: {$jobId}"
            );

            return true;
        } catch (\RuntimeException $e) {
            $this->logger->error($e->getMessage());

            return false;
        }
    }
}
```

### Step 3: Create the complete test class

**`tests/ArchiveServiceTest.php`**

```php
<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use App\ArchiveService;
use App\ArchiveRepositoryInterface;
use App\CrawlerInterface;
use App\LoggerInterface;

final class ArchiveServiceTest extends TestCase
{
    public function testArchiveStartsSuccessfully(): void
    {
        $repository = $this->createMock(
            ArchiveRepositoryInterface::class
        );

        $crawler = $this->createMock(
            CrawlerInterface::class
        );

        $logger = $this->createMock(
            LoggerInterface::class
        );

        $repository->expects($this->once())
            ->method('findByPrefix')
            ->with('amsterdam')
            ->willReturn([
                'prefix' => 'amsterdam',
                'url' => 'https://example.com'
            ]);

        $crawler->expects($this->once())
            ->method('start')
            ->with('https://example.com')
            ->willReturn('job-123');

        $repository->expects($this->once())
            ->method('updateStatus')
            ->with('amsterdam', 'running')
            ->willReturn(true);

        $logger->expects($this->once())
            ->method('info')
            ->with('Archive started: job-123');

        $logger->expects($this->never())
            ->method('error');

        $service = new ArchiveService(
            $repository,
            $crawler,
            $logger
        );

        $this->assertTrue(
            $service->startArchive('amsterdam')
        );
    }

    public function testWebsiteNotFound(): void
    {
        $repository = $this->createMock(
            ArchiveRepositoryInterface::class
        );

        $crawler = $this->createMock(
            CrawlerInterface::class
        );

        $logger = $this->createMock(
            LoggerInterface::class
        );

        $repository->expects($this->once())
            ->method('findByPrefix')
            ->with('unknown')
            ->willReturn(null);

        $crawler->expects($this->never())
            ->method('start');

        $repository->expects($this->never())
            ->method('updateStatus');

        $logger->expects($this->once())
            ->method('error')
            ->with('Website not found: unknown');

        $service = new ArchiveService(
            $repository,
            $crawler,
            $logger
        );

        $this->assertFalse(
            $service->startArchive('unknown')
        );
    }

    public function testCrawlerFailure(): void
    {
        $repository = $this->createMock(
            ArchiveRepositoryInterface::class
        );

        $crawler = $this->createMock(
            CrawlerInterface::class
        );

        $logger = $this->createMock(
            LoggerInterface::class
        );

        $repository->method('findByPrefix')
            ->willReturn([
                'prefix' => 'amsterdam',
                'url' => 'https://example.com'
            ]);

        $crawler->expects($this->once())
            ->method('start')
            ->willThrowException(
                new \RuntimeException(
                    'Crawler unavailable'
                )
            );

        $repository->expects($this->never())
            ->method('updateStatus');

        $logger->expects($this->once())
            ->method('error')
            ->with('Crawler unavailable');

        $service = new ArchiveService(
            $repository,
            $crawler,
            $logger
        );

        $this->assertFalse(
            $service->startArchive('amsterdam')
        );
    }
}
```

### What these tests verify

| Test | Repository | Crawler | Logger |
|---|---|---|---|
| Successful archive | Finds website, updates status | Starts job | Logs success |
| Website not found | Returns null | Must not start | Logs error |
| Crawler failure | Finds website, does not update status | Throws exception | Logs error |

The tests run without connecting to MySQL, starting Docker containers, launching a crawler, or writing to a log file.

## 18. Common mistakes

### Mistake 1: Mocking the class being tested

Avoid:

```php
$service = $this->createMock(UserService::class);

$service->method('getUsername')
    ->willReturn('andrei');

$this->assertSame(
    'andrei',
    $service->getUsername(1)
);
```

This tests the mock configuration, not the actual `UserService` implementation.

Instead, instantiate the real service and mock its dependencies.

### Mistake 2: Using `with()` on a stub

Avoid:

```php
$repository = $this->createStub(
    UserRepository::class
);

$repository->method('findById')
    ->with(1)
    ->willReturn(['username' => 'andrei']);
```

Modern PHPUnit versions do not verify arguments on stubs, and newer versions deprecate or reject this pattern.

Use `createMock()` when you need argument verification.

### Mistake 3: Returning an incompatible type

Suppose:

```php
public function getCount(): int
```

This is incorrect:

```php
$mock->method('getCount')
    ->willReturn('five');
```

PHPUnit respects PHP return type declarations.

Use:

```php
$mock->method('getCount')
    ->willReturn(5);
```

### Mistake 4: Over-mocking

Avoid mocking every object in your application.

Simple value objects, arrays, and pure calculation classes usually do not need mocks.

Mock dependencies at boundaries such as databases, APIs, queues, filesystem access, and email delivery.

### Mistake 5: Using outdated PHPUnit methods

Some methods found in older tutorials are deprecated or removed.

| Older approach | Modern alternative |
|---|---|
| `withConsecutive()` | `willReturnCallback()` with argument assertions |
| `at()` invocation matcher | Exact counts and callbacks |
| `setMethods()` | `onlyMethods()` |
| `getMockForAbstractClass()` | `createMock()` or `createPartialMock()` |
| `getMockForTrait()` | Test through a concrete class |
| `expects($this->any())` | `createStub()` when call counts do not matter |

Some of these changes are version-dependent. For new projects, favor the current documented APIs.

## 19. PHPUnit mocking cheat sheet

| Technique | Example |
|---|---|
| Create mock | `$mock = $this->createMock(MyInterface::class);` |
| Create stub | `$stub = $this->createStub(MyInterface::class);` |
| Return value | `$mock->method('get')->willReturn(123);` |
| Return consecutive values | `$mock->method('get')->willReturn(1, 2, 3);` |
| Return based on arguments | `$mock->method('get')->willReturnMap([[1, 'one'], [2, 'two']]);` |
| Return callback | `$mock->method('get')->willReturnCallback(fn($x) => $x * 2);` |
| Return first argument | `$mock->method('get')->willReturnArgument(0);` |
| Return self | `$mock->method('set')->willReturnSelf();` |
| Throw exception | `$mock->method('get')->willThrowException(new RuntimeException());` |
| Called once | `$mock->expects($this->once())->method('save');` |
| Called three times | `$mock->expects($this->exactly(3))->method('save');` |
| Never called | `$mock->expects($this->never())->method('delete');` |
| Check argument | `$mock->expects($this->once())->method('save')->with(10);` |
| Partial mock | `$mock = $this->createPartialMock(MyClass::class, ['fetch']);` |

## 20. Recommended testing strategy

For a typical PHP application using MySQL, REST APIs, and service classes, I recommend the following approach:

```text
Controller (real code)
       |
       v
Service (real code)
       |
       +-----------------------+
       |                       |
       v                       v
Repository interface     API client interface
(mock in unit tests)     (mock in unit tests)
```

In production, inject real implementations. In unit tests, inject PHPUnit test doubles.

Use unit tests to verify business rules and interactions. Use integration tests with a dedicated test database to verify SQL queries, MySQLi/PDO behavior, and database schema compatibility.

**The most important principle:** Mock the dependencies of the class you want to test, not the class itself.

For further details, consult the [official PHPUnit test doubles documentation](https://docs.phpunit.de/en/12.5/test-doubles.html).
