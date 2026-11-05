---
layout: post
title:  "Symfony 8 CRUD REST API with Services, PHPUnit and Mocks"
date:   2026-11-05 08:46:56
categories: PHP
description: Symfony 8 CRUD REST API with Services, PHPUnit and Mocks
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: We'll build a REST API using Symfony 8, Doctrine ORM, MySQL, PHPUnit, and a Service layer.
---
We'll build a REST API using **Symfony 8, Doctrine ORM, MySQL, PHPUnit, and a Service layer**.

Unlike the previous example, the controller will only handle HTTP requests and responses. All CRUD operations and business logic will be implemented in a dedicated `ProductService`.

We'll also use PHPUnit mocks to test the controller and service independently, without requiring a database connection.

## 1. API endpoints

| Method | Endpoint | Action | Success status |
|---|---|---|---|
| GET | `/api/products` | List all products | `200 OK` |
| GET | `/api/products/{id}` | Get a product | `200 OK` |
| POST | `/api/products` | Create a product | `201 Created` |
| PUT | `/api/products/{id}` | Update a product | `200 OK` |
| DELETE | `/api/products/{id}` | Delete a product | `204 No Content` |

## 2. Application architecture

```text
ProductController
    HTTP routing, JSON requests, responses and status codes
         |
         v
ProductService
    Validation, business logic and CRUD operations
         |
         v
ProductRepository + EntityManager
    Doctrine queries and persistence
         |
         v
MySQL
```

The project structure will be:

```text
product-api/
├── config/
│   └── routes.yaml
├── src/
│   ├── Controller/
│   │   └── Api/
│   │       └── ProductController.php
│   ├── Entity/
│   │   └── Product.php
│   ├── Exception/
│   │   ├── ProductNotFoundException.php
│   │   └── ProductValidationException.php
│   ├── Repository/
│   │   └── ProductRepository.php
│   └── Service/
│       └── ProductService.php
├── tests/
│   ├── Unit/
│   │   ├── Controller/
│   │   │   └── ProductControllerTest.php
│   │   └── Service/
│   │       └── ProductServiceTest.php
│   └── Functional/
│       └── ProductApiTest.php
├── .env
└── phpunit.dist.xml
```

## 3. Install Symfony and dependencies

Create a Symfony 8 project:

```bash
symfony new product-api --version="8.0"
cd product-api
```

Install Doctrine, Validator and testing dependencies:

```bash
composer require symfony/framework-bundle
composer require symfony/orm-pack
composer require symfony/validator
composer require --dev symfony/test-pack
composer require --dev symfony/maker-bundle
```

Configure the database in `.env.local`:

```dotenv
APP_ENV=dev
APP_DEBUG=1

DATABASE_URL="mysql://root:password@127.0.0.1:3306/product_api?serverVersion=8.0.36&charset=utf8mb4"
```

Replace the credentials and server version with your actual MySQL configuration.

## 4. Create the Product entity

**src/Entity/Product.php**

```php
<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'product')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name = '';

    #[ORM\Column]
    private float $price = 0.0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }
}
```

For financial applications, use a decimal representation rather than `float` to avoid floating-point precision problems.

## 5. Create the repository

**src/Repository/ProductRepository.php**

```php
<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }
}
```

Doctrine provides `find()`, `findAll()`, and other standard repository methods.

## 6. Create custom exceptions

We will use exceptions to communicate business errors from the service to the controller.

**src/Exception/ProductNotFoundException.php**

```php
<?php

namespace App\Exception;

class ProductNotFoundException extends \RuntimeException
{
    public function __construct(int $id)
    {
        parent::__construct("Product with ID {$id} not found");
    }
}
```

**src/Exception/ProductValidationException.php**

```php
<?php

namespace App\Exception;

class ProductValidationException extends \InvalidArgumentException
{
}
```

The service throws these exceptions, and the controller converts them into HTTP responses.

This keeps HTTP-specific behavior out of the service.

## 7. Create the ProductService

This is the main difference from the previous implementation.

The service is responsible for:

- Retrieving products from the repository.
- Creating and updating products.
- Validating product data.
- Persisting and deleting products.
- Throwing exceptions when a product doesn't exist.

It does not know anything about HTTP requests, JSON responses, or HTTP status codes.

**src/Service/ProductService.php**

```php
<?php

namespace App\Service;

use App\Entity\Product;
use App\Exception\ProductNotFoundException;
use App\Exception\ProductValidationException;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;

class ProductService
{
    public function __construct(
        private ProductRepository $repository,
        private EntityManagerInterface $entityManager
    ) {
    }

    /**
     * @return Product[]
     */
    public function getAll(): array
    {
        return $this->repository->findAll();
    }

    public function getById(int $id): Product
    {
        $product = $this->repository->find($id);

        if ($product === null) {
            throw new ProductNotFoundException($id);
        }

        return $product;
    }

    public function create(array $data): Product
    {
        $this->validate($data);

        $product = new Product();

        $product->setName(trim($data['name']));
        $product->setPrice((float) $data['price']);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $product;
    }

    public function update(int $id, array $data): Product
    {
        $product = $this->getById($id);

        $this->validate($data);

        $product->setName(trim($data['name']));
        $product->setPrice((float) $data['price']);

        $this->entityManager->flush();

        return $product;
    }

    public function delete(int $id): void
    {
        $product = $this->getById($id);

        $this->entityManager->remove($product);
        $this->entityManager->flush();
    }

    private function validate(array $data): void
    {
        if (
            !isset($data['name']) ||
            !is_string($data['name']) ||
            trim($data['name']) === ''
        ) {
            throw new ProductValidationException(
                'Name is required'
            );
        }

        if (mb_strlen(trim($data['name'])) > 255) {
            throw new ProductValidationException(
                'Name must not exceed 255 characters'
            );
        }

        if (
            !isset($data['price']) ||
            (!is_int($data['price']) &&
             !is_float($data['price'])) ||
            !is_finite((float) $data['price']) ||
            $data['price'] < 0
        ) {
            throw new ProductValidationException(
                'Price must be a non-negative number'
            );
        }
    }
}
```

### Why this design is better

For example, when creating a product:

```php
$product = $productService->create([
    'name' => 'Laptop',
    'price' => 999.99
]);
```

The service performs validation, creates the entity, and saves it to the database.

The same method can be called from a REST controller, Symfony console command, message handler, or another service without duplicating business logic.

## 8. Create the REST API controller

The controller now has only one dependency: `ProductService`.

It handles HTTP-specific responsibilities:

- Reading JSON request bodies.
- Calling the service.
- Serializing results to JSON.
- Converting business exceptions into HTTP errors.

**src/Controller/Api/ProductController.php**

```php
<?php

namespace App\Controller\Api;

use App\Entity\Product;
use App\Exception\ProductNotFoundException;
use App\Exception\ProductValidationException;
use App\Service\ProductService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/products')]
class ProductController
{
    public function __construct(
        private ProductService $productService
    ) {
    }

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $products = $this->productService->getAll();

        return new JsonResponse(
            array_map(
                fn(Product $product) => $this->serialize($product),
                $products
            )
        );
    }

    #[Route(
        '/{id}',
        requirements: ['id' => '\d+'],
        methods: ['GET']
    )]
    public function show(int $id): JsonResponse
    {
        try {
            $product = $this->productService->getById($id);

            return new JsonResponse(
                $this->serialize($product)
            );
        } catch (ProductNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        }
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = $this->parseJson($request);

        if ($data === null) {
            return $this->error('Invalid JSON object', 400);
        }

        try {
            $product = $this->productService->create($data);

            $response = new JsonResponse(
                $this->serialize($product),
                Response::HTTP_CREATED
            );

            if ($product->getId() !== null) {
                $response->headers->set(
                    'Location',
                    '/api/products/' . $product->getId()
                );
            }

            return $response;
        } catch (ProductValidationException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }

    #[Route(
        '/{id}',
        requirements: ['id' => '\d+'],
        methods: ['PUT']
    )]
    public function update(
        int $id,
        Request $request
    ): JsonResponse {
        $data = $this->parseJson($request);

        if ($data === null) {
            return $this->error('Invalid JSON object', 400);
        }

        try {
            $product = $this->productService->update($id, $data);

            return new JsonResponse(
                $this->serialize($product)
            );
        } catch (ProductNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (ProductValidationException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }

    #[Route(
        '/{id}',
        requirements: ['id' => '\d+'],
        methods: ['DELETE']
    )]
    public function delete(int $id): Response
    {
        try {
            $this->productService->delete($id);

            return new Response(
                '',
                Response::HTTP_NO_CONTENT
            );
        } catch (ProductNotFoundException $e) {
            return $this->error($e->getMessage(), 404);
        }
    }

    private function parseJson(Request $request): ?array
    {
        try {
            $data = json_decode(
                $request->getContent(),
                true,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (\JsonException) {
            return null;
        }

        if (
            !is_array($data) ||
            array_is_list($data)
        ) {
            return null;
        }

        return $data;
    }

    private function serialize(Product $product): array
    {
        return [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
        ];
    }

    private function error(
        string $message,
        int $status
    ): JsonResponse {
        return new JsonResponse(
            ['error' => $message],
            $status
        );
    }
}
```

Notice that the controller never accesses `ProductRepository` or `EntityManagerInterface` directly.

## 9. Configure Symfony routing and services

Symfony normally autowires classes under `src/` automatically.

Verify that **config/services.yaml** contains:

```yaml
parameters:

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

The service will automatically receive its repository and entity manager.

Configure attribute routing in **config/routes.yaml**:

```yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute
```

Create the database and tables:

```bash
php bin/console doctrine:database:create

php bin/console make:migration

php bin/console doctrine:migrations:migrate
```

Verify the registered endpoints:

```bash
php bin/console debug:router
```

## 10. PHPUnit tests for ProductService with mocks

We'll first test the business logic independently.

The service depends on two objects:

- `ProductRepository`
- `EntityManagerInterface`

We'll mock both using PHPUnit.

These tests verify the behavior of the service without running SQL queries.

**tests/Unit/Service/ProductServiceTest.php**

```php
<?php

namespace App\Tests\Unit\Service;

use App\Entity\Product;
use App\Exception\ProductNotFoundException;
use App\Exception\ProductValidationException;
use App\Repository\ProductRepository;
use App\Service\ProductService;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;

class ProductServiceTest extends TestCase
{
    private ProductRepository $repository;
    private EntityManagerInterface $entityManager;
    private ProductService $service;

    protected function setUp(): void
    {
        $this->repository = $this->createMock(
            ProductRepository::class
        );

        $this->entityManager = $this->createMock(
            EntityManagerInterface::class
        );

        $this->service = new ProductService(
            $this->repository,
            $this->entityManager
        );
    }

    private function createProduct(): Product
    {
        return (new Product())
            ->setName('Laptop')
            ->setPrice(999.99);
    }

    public function testGetAllProducts(): void
    {
        $products = [
            $this->createProduct(),
            (new Product())
                ->setName('Mouse')
                ->setPrice(29.99)
        ];

        $this->repository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($products);

        $result = $this->service->getAll();

        $this->assertCount(2, $result);
        $this->assertSame($products, $result);
    }

    public function testGetProductById(): void
    {
        $product = $this->createProduct();

        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn($product);

        $result = $this->service->getById(1);

        $this->assertSame($product, $result);
    }

    public function testGetProductByIdNotFound(): void
    {
        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(999)
            ->willReturn(null);

        $this->expectException(
            ProductNotFoundException::class
        );

        $this->service->getById(999);
    }

    public function testCreateProduct(): void
    {
        $data = [
            'name' => 'Keyboard',
            'price' => 49.99
        ];

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->callback(
                fn($product) =>
                    $product instanceof Product &&
                    $product->getName() === 'Keyboard' &&
                    $product->getPrice() === 49.99
            ));

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $product = $this->service->create($data);

        $this->assertInstanceOf(Product::class, $product);
        $this->assertSame('Keyboard', $product->getName());
        $this->assertSame(49.99, $product->getPrice());
    }

    public function testCreateProductTrimsName(): void
    {
        $this->entityManager
            ->expects($this->once())
            ->method('persist');

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $product = $this->service->create([
            'name' => '  Laptop  ',
            'price' => 999.99
        ]);

        $this->assertSame('Laptop', $product->getName());
    }

    public function testCreateProductWithInvalidName(): void
    {
        $this->entityManager
            ->expects($this->never())
            ->method('persist');

        $this->entityManager
            ->expects($this->never())
            ->method('flush');

        $this->expectException(
            ProductValidationException::class
        );

        $this->service->create([
            'name' => '',
            'price' => 100
        ]);
    }

    public function testCreateProductWithNegativePrice(): void
    {
        $this->entityManager
            ->expects($this->never())
            ->method('persist');

        $this->expectException(
            ProductValidationException::class
        );

        $this->service->create([
            'name' => 'Laptop',
            'price' => -100
        ]);
    }

    public function testUpdateProduct(): void
    {
        $product = $this->createProduct();

        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn($product);

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $this->entityManager
            ->expects($this->never())
            ->method('persist');

        $result = $this->service->update(1, [
            'name' => 'Gaming Laptop',
            'price' => 1299.99
        ]);

        $this->assertSame($product, $result);
        $this->assertSame('Gaming Laptop', $result->getName());
        $this->assertSame(1299.99, $result->getPrice());
    }

    public function testUpdateProductNotFound(): void
    {
        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(999)
            ->willReturn(null);

        $this->entityManager
            ->expects($this->never())
            ->method('flush');

        $this->expectException(
            ProductNotFoundException::class
        );

        $this->service->update(999, [
            'name' => 'Laptop',
            'price' => 100
        ]);
    }

    public function testDeleteProduct(): void
    {
        $product = $this->createProduct();

        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn($product);

        $this->entityManager
            ->expects($this->once())
            ->method('remove')
            ->with($this->identicalTo($product));

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $this->service->delete(1);
    }

    public function testDeleteProductNotFound(): void
    {
        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(999)
            ->willReturn(null);

        $this->entityManager
            ->expects($this->never())
            ->method('remove');

        $this->entityManager
            ->expects($this->never())
            ->method('flush');

        $this->expectException(
            ProductNotFoundException::class
        );

        $this->service->delete(999);
    }
}
```

These 11 tests cover the main service operations and important failure cases.

## 11. PHPUnit tests for ProductController with mocks

Next, we'll test the HTTP layer.

This time we mock **ProductService**, not the repository or entity manager.

The controller tests should verify that:

- The correct service method is called.
- The controller passes the correct arguments.
- Successful results are serialized correctly.
- Business exceptions become appropriate HTTP status codes.
- Invalid JSON is rejected before calling the service.

**tests/Unit/Controller/ProductControllerTest.php**

```php
<?php

namespace App\Tests\Unit\Controller;

use App\Controller\Api\ProductController;
use App\Entity\Product;
use App\Exception\ProductNotFoundException;
use App\Exception\ProductValidationException;
use App\Service\ProductService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;

class ProductControllerTest extends TestCase
{
    private ProductService $service;
    private ProductController $controller;

    protected function setUp(): void
    {
        $this->service = $this->createMock(
            ProductService::class
        );

        $this->controller = new ProductController(
            $this->service
        );
    }

    private function createProduct(): Product
    {
        return (new Product())
            ->setName('Laptop')
            ->setPrice(999.99);
    }

    public function testIndexReturnsProducts(): void
    {
        $products = [
            $this->createProduct(),
            (new Product())
                ->setName('Mouse')
                ->setPrice(29.99)
        ];

        $this->service
            ->expects($this->once())
            ->method('getAll')
            ->willReturn($products);

        $response = $this->controller->index();

        $this->assertSame(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);

        $this->assertCount(2, $data);
        $this->assertSame('Laptop', $data[0]['name']);
        $this->assertSame('Mouse', $data[1]['name']);
    }

    public function testShowReturnsProduct(): void
    {
        $this->service
            ->expects($this->once())
            ->method('getById')
            ->with(1)
            ->willReturn($this->createProduct());

        $response = $this->controller->show(1);

        $this->assertSame(200, $response->getStatusCode());

        $data = json_decode($response->getContent(), true);

        $this->assertSame('Laptop', $data['name']);
        $this->assertSame(999.99, $data['price']);
    }

    public function testShowReturns404(): void
    {
        $this->service
            ->expects($this->once())
            ->method('getById')
            ->with(999)
            ->willThrowException(
                new ProductNotFoundException(999)
            );

        $response = $this->controller->show(999);

        $this->assertSame(404, $response->getStatusCode());
    }

    public function testCreateReturns201(): void
    {
        $data = [
            'name' => 'Laptop',
            'price' => 999.99
        ];

        $request = new Request(
            content: json_encode($data)
        );

        $this->service
            ->expects($this->once())
            ->method('create')
            ->with($data)
            ->willReturn($this->createProduct());

        $response = $this->controller->create($request);

        $this->assertSame(201, $response->getStatusCode());

        $result = json_decode($response->getContent(), true);

        $this->assertSame('Laptop', $result['name']);
        $this->assertSame(999.99, $result['price']);
    }

    public function testCreateReturns422(): void
    {
        $data = [
            'name' => '',
            'price' => -10
        ];

        $this->service
            ->expects($this->once())
            ->method('create')
            ->with($data)
            ->willThrowException(
                new ProductValidationException(
                    'Name is required'
                )
            );

        $request = new Request(
            content: json_encode($data)
        );

        $response = $this->controller->create($request);

        $this->assertSame(422, $response->getStatusCode());

        $this->assertSame(
            ['error' => 'Name is required'],
            json_decode($response->getContent(), true)
        );
    }

    public function testCreateReturns400ForInvalidJson(): void
    {
        $this->service
            ->expects($this->never())
            ->method('create');

        $request = new Request(
            content: '{invalid json'
        );

        $response = $this->controller->create($request);

        $this->assertSame(400, $response->getStatusCode());
    }

    public function testUpdateReturns200(): void
    {
        $data = [
            'name' => 'Gaming Laptop',
            'price' => 1299.99
        ];

        $product = (new Product())
            ->setName('Gaming Laptop')
            ->setPrice(1299.99);

        $this->service
            ->expects($this->once())
            ->method('update')
            ->with(1, $data)
            ->willReturn($product);

        $request = new Request(
            content: json_encode($data)
        );

        $response = $this->controller->update(1, $request);

        $this->assertSame(200, $response->getStatusCode());

        $result = json_decode($response->getContent(), true);

        $this->assertSame(
            'Gaming Laptop',
            $result['name']
        );
    }

    public function testUpdateReturns404(): void
    {
        $data = [
            'name' => 'Laptop',
            'price' => 100
        ];

        $this->service
            ->expects($this->once())
            ->method('update')
            ->with(999, $data)
            ->willThrowException(
                new ProductNotFoundException(999)
            );

        $request = new Request(
            content: json_encode($data)
        );

        $response = $this->controller->update(999, $request);

        $this->assertSame(404, $response->getStatusCode());
    }

    public function testDeleteReturns204(): void
    {
        $this->service
            ->expects($this->once())
            ->method('delete')
            ->with(1);

        $response = $this->controller->delete(1);

        $this->assertSame(204, $response->getStatusCode());
        $this->assertSame('', $response->getContent());
    }

    public function testDeleteReturns404(): void
    {
        $this->service
            ->expects($this->once())
            ->method('delete')
            ->with(999)
            ->willThrowException(
                new ProductNotFoundException(999)
            );

        $response = $this->controller->delete(999);

        $this->assertSame(404, $response->getStatusCode());
    }
}
```

These 10 controller tests do not use MySQL or Doctrine.

### The key difference between the two test suites

The service test mocks persistence:

```php
$this->repository = $this->createMock(
    ProductRepository::class
);

$this->entityManager = $this->createMock(
    EntityManagerInterface::class
);
```

The controller test mocks the entire service:

```php
$this->service = $this->createMock(
    ProductService::class
);
```

This allows the two layers to be tested independently.

## 12. Functional tests using WebTestCase

Unit tests verify each layer independently. Functional tests verify that the layers work together through Symfony's HTTP kernel.

For this example, we'll use a separate test database rather than mocks.

Configure **.env.test.local**:

```dotenv
DATABASE_URL="mysql://root:password@127.0.0.1:3306/product_api_test?serverVersion=8.0.36&charset=utf8mb4"
```

Create the test database and schema:

```bash
APP_ENV=test php bin/console doctrine:database:create
APP_ENV=test php bin/console doctrine:migrations:migrate --no-interaction
```

For this example, the functional test creates its own product and deletes it afterward. In a larger suite, use isolated fixtures and transaction rollback or database-reset tooling.

**tests/Functional/ProductApiTest.php**

```php
<?php

namespace App\Tests\Functional;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProductApiTest extends WebTestCase
{
    public function testGetProducts(): void
    {
        $client = static::createClient();

        $client->request('GET', '/api/products');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame(
            'content-type',
            'application/json'
        );

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertIsArray($data);
    }

    public function testProductCrudLifecycle(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/api/products',
            server: ['CONTENT_TYPE' => 'application/json'],
            content: json_encode([
                'name' => 'Test Product',
                'price' => 25.50
            ])
        );

        $this->assertResponseStatusCodeSame(201);

        $data = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertSame('Test Product', $data['name']);
        $this->assertSame(25.50, $data['price']);
        $this->assertIsInt($data['id']);

        $id = $data['id'];

        // READ
        $client->request('GET', "/api/products/$id");

        $this->assertResponseIsSuccessful();

        // UPDATE
        $client->request(
            'PUT',
            "/api/products/$id",
            server: ['CONTENT_TYPE' => 'application/json'],
            content: json_encode([
                'name' => 'Updated Product',
                'price' => 35.00
            ])
        );

        $this->assertResponseIsSuccessful();

        $updated = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertSame(
            'Updated Product',
            $updated['name']
        );

        // DELETE
        $client->request('DELETE', "/api/products/$id");

        $this->assertResponseStatusCodeSame(204);

        // VERIFY DELETION
        $client->request('GET', "/api/products/$id");

        $this->assertResponseStatusCodeSame(404);
    }

    public function testCreateWithInvalidData(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/api/products',
            server: ['CONTENT_TYPE' => 'application/json'],
            content: json_encode([
                'name' => '',
                'price' => -10
            ])
        );

        $this->assertResponseStatusCodeSame(422);
    }

    public function testCreateWithInvalidJson(): void
    {
        $client = static::createClient();

        $client->request(
            'POST',
            '/api/products',
            server: ['CONTENT_TYPE' => 'application/json'],
            content: '{invalid json'
        );

        $this->assertResponseStatusCodeSame(400);
    }
}
```

These functional tests verify routing, dependency injection, JSON responses, database persistence, and HTTP status codes.

## 13. Run PHPUnit

Run all tests:

```bash
php bin/phpunit
```

Run only service tests:

```bash
php bin/phpunit tests/Unit/Service/ProductServiceTest.php
```

Run only controller tests:

```bash
php bin/phpunit tests/Unit/Controller/ProductControllerTest.php
```

Run functional tests:

```bash
php bin/phpunit tests/Functional/ProductApiTest.php
```

Run tests with code coverage (requires Xdebug or PCOV):

```bash
XDEBUG_MODE=coverage php bin/phpunit --coverage-html coverage/
```

**Test suite summary:**

| Suite | Test methods |
|---|---:|
| Service unit tests | 11 |
| Controller unit tests | 10 |
| Functional tests | 4 |
| **Total** | **25** |

These are the tests provided in the example, not verified execution results. The code has not been run against an installed Symfony project in this conversation.

## 14. Test the REST API using curl

Start Symfony:

```bash
symfony server:start
```

Create a product:

```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":999.99}'
```

Expected JSON response:

```json
{
    "id": 1,
    "name": "Laptop",
    "price": 999.99
}
```

Get all products:

```bash
curl http://localhost:8000/api/products
```

Get one product:

```bash
curl http://localhost:8000/api/products/1
```

Update a product:

```bash
curl -X PUT http://localhost:8000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Laptop","price":1299.99}'
```

Delete a product:

```bash
curl -X DELETE http://localhost:8000/api/products/1
```

## 15. Summary: responsibilities of each layer

| Component | Responsibility | Unit test dependencies |
|---|---|---|
| `ProductController` | HTTP requests, JSON parsing, status codes | Mock `ProductService` |
| `ProductService` | Business rules, validation, CRUD orchestration | Mock repository and entity manager |
| `ProductRepository` | Database queries | Integration tests with Doctrine |
| `Product` | Entity state and data | Direct unit tests if needed |
| Functional tests | Complete HTTP request lifecycle | Test database |

### Improvements for production

The example is intentionally simple. For a production Symfony 8 API, I recommend extending it with Symfony Validator and request DTOs, pagination for product listings, authentication and authorization, consistent exception handling using an event subscriber, and transaction-safe persistence.

Also, the example's `PUT` endpoint requires a complete representation of the product. If you want partial updates, add a separate `PATCH` endpoint.

**The main architectural benefit:** You can change your API controller, add a console command, or introduce another interface without rewriting the CRUD business logic. You can also test each layer independently using PHPUnit mocks, while functional tests verify that the complete application works together.
