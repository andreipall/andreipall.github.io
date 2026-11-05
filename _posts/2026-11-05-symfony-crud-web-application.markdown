---
layout: post
title:  "Symfony CRUD Web Application"
date:   2026-11-05 09:46:56
categories: PHP
description: Symfony CRUD Web Application
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: We'll build a complete server-rendered CRUD web application using Symfony 8, Twig, AssetMapper, jQuery, Doctrine ORM, MySQL, PHPUnit, and Mocks.
---
We'll build a complete server-rendered CRUD web application using **Symfony 8, Twig, AssetMapper, jQuery, Doctrine ORM, MySQL, PHPUnit, and Mocks**.

The application manages products with a responsive Bootstrap interface, client-side interactions using jQuery, and a dedicated Service layer for business logic. Unlike a REST API, this application renders HTML pages using Twig.

## 1. Technologies and features

| Component | Technology |
|---|---|
| Backend | Symfony 8, PHP 8.4+ |
| Templates | Twig |
| JavaScript | jQuery |
| Asset management | Symfony AssetMapper / Importmap |
| CSS framework | Bootstrap 5 |
| Database | MySQL with Doctrine ORM |
| Business logic | ProductService |
| Testing | PHPUnit with mocks |
| Security | Symfony CSRF protection |

The application supports listing, creating, editing, and deleting products; AJAX deletion with confirmation; live filtering with jQuery; server-side validation and CSRF; mocked controller and service unit tests; and functional web tests.

## 2. Application architecture

```text
Twig Templates + jQuery
          |
          v
ProductController (HTTP, CSRF, templates, redirects)
          |
          v
ProductService (validation, business logic, CRUD)
          |
          v
ProductRepository + EntityManager (Doctrine ORM)
          |
          v
        MySQL
```

## 3. User interface

The product listing has a search field, an **Add product** button, and a table with ID, Name, Price, Edit, and Delete actions. Creating and editing use HTML forms; deletion uses AJAX. The interactive preview in the original chat used temporary sample data (Laptop $999.99, Mouse $29.99, Keyboard $49.99), while the application below uses Twig, jQuery, and MySQL.

## 4. Project structure

```text
product-app/
├── assets/
│   ├── app.js
│   ├── products.js
│   └── styles/
│       └── app.css
├── config/
│   ├── routes.yaml
│   └── services.yaml
├── src/
│   ├── Controller/
│   │   └── ProductController.php
│   ├── Entity/
│   │   └── Product.php
│   ├── Exception/
│   │   ├── ProductNotFoundException.php
│   │   └── ProductValidationException.php
│   ├── Repository/
│   │   └── ProductRepository.php
│   └── Service/
│       └── ProductService.php
├── templates/
│   ├── base.html.twig
│   └── product/
│       ├── index.html.twig
│       └── form.html.twig
├── tests/
│   ├── Unit/
│   │   ├── Controller/
│   │   │   └── ProductControllerTest.php
│   │   └── Service/
│   │       └── ProductServiceTest.php
│   └── Functional/
│       └── ProductWebTest.php
├── importmap.php
└── phpunit.dist.xml
```

## 5. Install Symfony and dependencies

```bash
symfony new product-app --version="8.0" --webapp
cd product-app
composer require symfony/asset-mapper
composer require symfony/twig-bundle
composer require symfony/orm-pack
composer require symfony/security-csrf
composer require --dev symfony/test-pack
composer require --dev symfony/maker-bundle
php bin/console importmap:require jquery
php bin/console importmap:require bootstrap
```

No Node.js, npm, Webpack, or Encore is required.

Configure `.env.local`:

```dotenv
APP_ENV=dev
APP_DEBUG=1
DATABASE_URL="mysql://root:password@127.0.0.1:3306/product_app?serverVersion=8.0.36&charset=utf8mb4"
```

Use environment variables or Symfony Secrets for production credentials.

## 6. Create the Product entity

**src/Entity/Product.php**

```php
<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'product')]
class Product
&#123;
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name = '';

    #[ORM\Column]
    private float $price = 0.0;

    public function getId(): ?int
    &#123;
        return $this->id;
    &#125;

    public function getName(): string
    &#123;
        return $this->name;
    &#125;

    public function setName(string $name): self
    &#123;
        $this->name = $name;
        return $this;
    &#125;

    public function getPrice(): float
    &#123;
        return $this->price;
    &#125;

    public function setPrice(float $price): self
    &#123;
        $this->price = $price;
        return $this;
    &#125;
&#125;
```

For applications involving real monetary calculations, use decimal or integer minor units instead of `float`.

## 7. Create the repository

**src/Repository/ProductRepository.php**

```php
<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ProductRepository extends ServiceEntityRepository
&#123;
    public function __construct(ManagerRegistry $registry)
    &#123;
        parent::__construct($registry, Product::class);
    &#125;
&#125;
```

## 8. Create the exceptions

**src/Exception/ProductNotFoundException.php**

```php
<?php

namespace App\Exception;

class ProductNotFoundException extends \RuntimeException
&#123;
    public function __construct(int $id)
    &#123;
        parent::__construct("Product with ID &#123;$id&#125; not found");
    &#125;
&#125;
```

**src/Exception/ProductValidationException.php**

```php
<?php

namespace App\Exception;

class ProductValidationException extends \InvalidArgumentException
&#123;
&#125;
```

These exceptions let the service report errors without depending on HTTP classes.

## 9. Create the ProductService

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
&#123;
    public function __construct(
        private ProductRepository $repository,
        private EntityManagerInterface $entityManager
    ) &#123;
    &#125;

    /**
     * @return Product[]
     */
    public function getAll(): array
    &#123;
        return $this->repository->findAll();
    &#125;

    public function getById(int $id): Product
    &#123;
        $product = $this->repository->find($id);

        if ($product === null) &#123;
            throw new ProductNotFoundException($id);
        &#125;

        return $product;
    &#125;

    public function create(array $data): Product
    &#123;
        $this->validate($data);

        $product = new Product();

        $product->setName(trim($data['name']));
        $product->setPrice((float) $data['price']);

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $product;
    &#125;

    public function update(int $id, array $data): Product
    &#123;
        $product = $this->getById($id);

        $this->validate($data);

        $product->setName(trim($data['name']));
        $product->setPrice((float) $data['price']);

        $this->entityManager->flush();

        return $product;
    &#125;

    public function delete(int $id): void
    &#123;
        $product = $this->getById($id);

        $this->entityManager->remove($product);
        $this->entityManager->flush();
    &#125;

    private function validate(array $data): void
    &#123;
        if (
            !isset($data['name']) ||
            !is_string($data['name']) ||
            trim($data['name']) === ''
        ) &#123;
            throw new ProductValidationException(
                'Product name is required'
            );
        &#125;

        if (mb_strlen(trim($data['name'])) > 255) &#123;
            throw new ProductValidationException(
                'Product name must not exceed 255 characters'
            );
        &#125;

        if (
            !isset($data['price']) ||
            !is_numeric($data['price']) ||
            !is_finite((float) $data['price']) ||
            (float) $data['price'] < 0
        ) &#123;
            throw new ProductValidationException(
                'Price must be a non-negative number'
            );
        &#125;
    &#125;
&#125;
```

The service is reusable from a REST API controller, console command, or message handler.

## 10. Create the ProductController

**src/Controller/ProductController.php**

```php
<?php

namespace App\Controller;

use App\Exception\ProductNotFoundException;
use App\Exception\ProductValidationException;
use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/products', name: 'product_')]
class ProductController extends AbstractController
&#123;
    public function __construct(
        private ProductService $productService
    ) &#123;
    &#125;

    #[Route('', name: 'index', methods: ['GET'])]
    public function index(): Response
    &#123;
        return $this->render('product/index.html.twig', [
            'products' => $this->productService->getAll()
        ]);
    &#125;

    #[Route('/new', name: 'new', methods: ['GET', 'POST'])]
    public function new(Request $request): Response
    &#123;
        $data = [
            'name' => '',
            'price' => ''
        ];

        $error = null;

        if ($request->isMethod('POST')) &#123;
            if (!$this->isCsrfTokenValid(
                'product_form',
                (string) $request->request->get('_token', '')
            )) &#123;
                throw $this->createAccessDeniedException(
                    'Invalid CSRF token'
                );
            &#125;

            $data = [
                'name' => $request->request->all()['name'] ?? '',
                'price' => $request->request->all()['price'] ?? ''
            ];

            try &#123;
                $this->productService->create($data);

                $this->addFlash(
                    'success',
                    'Product created successfully'
                );

                return $this->redirectToRoute('product_index');
            &#125; catch (ProductValidationException $e) &#123;
                $error = $e->getMessage();
            &#125;
        &#125;

        return $this->render('product/form.html.twig', [
            'title' => 'Create product',
            'data' => $data,
            'error' => $error,
            'action' => $this->generateUrl('product_new')
        ], new Response(
            status: $error ? 422 : 200
        ));
    &#125;

    #[Route(
        '/&#123;id&#125;/edit',
        name: 'edit',
        requirements: ['id' => '\d+'],
        methods: ['GET', 'POST']
    )]
    public function edit(int $id, Request $request): Response
    &#123;
        try &#123;
            $product = $this->productService->getById($id);
        &#125; catch (ProductNotFoundException) &#123;
            throw $this->createNotFoundException();
        &#125;

        $data = [
            'name' => $product->getName(),
            'price' => $product->getPrice()
        ];

        $error = null;

        if ($request->isMethod('POST')) &#123;
            if (!$this->isCsrfTokenValid(
                'product_form',
                (string) $request->request->get('_token', '')
            )) &#123;
                throw $this->createAccessDeniedException(
                    'Invalid CSRF token'
                );
            &#125;

            $data = [
                'name' => $request->request->all()['name'] ?? '',
                'price' => $request->request->all()['price'] ?? ''
            ];

            try &#123;
                $this->productService->update($id, $data);

                $this->addFlash(
                    'success',
                    'Product updated successfully'
                );

                return $this->redirectToRoute('product_index');
            &#125; catch (ProductValidationException $e) &#123;
                $error = $e->getMessage();
            &#125; catch (ProductNotFoundException) &#123;
                throw $this->createNotFoundException();
            &#125;
        &#125;

        return $this->render('product/form.html.twig', [
            'title' => 'Edit product',
            'data' => $data,
            'error' => $error,
            'action' => $this->generateUrl(
                'product_edit',
                ['id' => $id]
            )
        ], new Response(
            status: $error ? 422 : 200
        ));
    &#125;

    #[Route(
        '/&#123;id&#125;/delete',
        name: 'delete',
        requirements: ['id' => '\d+'],
        methods: ['POST']
    )]
    public function delete(int $id, Request $request): JsonResponse
    &#123;
        $token = (string) $request->request->get('_token', '');

        if (!$this->isCsrfTokenValid(
            'delete_product_' . $id,
            $token
        )) &#123;
            return $this->json([
                'success' => false,
                'message' => 'Invalid CSRF token'
            ], 403);
        &#125;

        try &#123;
            $this->productService->delete($id);

            return $this->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);
        &#125; catch (ProductNotFoundException) &#123;
            return $this->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        &#125;
    &#125;
&#125;
```

The controller never directly calls Doctrine or the repository. For a larger application, use Symfony Form types and Validator DTOs.

## 11. Configure Twig templates

### Base template

**templates/base.html.twig**

```twig
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1">

    <title>
        &#123;% block title %&#125;Product Manager&#123;% endblock %&#125;
    </title>

    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

    &#123;% block stylesheets %&#125;
    &#123;% endblock %&#125;

    &#123;% block javascripts %&#125;
        &#123;&#123; importmap('app') &#125;&#125;
    &#123;% endblock %&#125;
</head>
<body>

<nav class="navbar navbar-dark bg-dark mb-4">
    <div class="container">
        <a class="navbar-brand"
           href="&#123;&#123; path('product_index') &#125;&#125;">
            Product Manager
        </a>
    </div>
</nav>

<main class="container">

    &#123;% for message in app.flashes('success') %&#125;
        <div class="alert alert-success alert-dismissible fade show">
            &#123;&#123; message &#125;&#125;
            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close">
            </button>
        </div>
    &#123;% endfor %&#125;

    &#123;% block body %&#125;
    &#123;% endblock %&#125;

</main>

</body>
</html>
```

Bootstrap CSS is loaded from a CDN; JavaScript and application CSS are managed by AssetMapper.

### Product listing

**templates/product/index.html.twig**

```twig
&#123;% extends 'base.html.twig' %&#125;

&#123;% block title %&#125;Products&#123;% endblock %&#125;

&#123;% block body %&#125;

<div class="d-flex justify-content-between align-items-center mb-4">
    <h1>Products</h1>

    <a href="&#123;&#123; path('product_new') &#125;&#125;"
       class="btn btn-primary">
        Add product
    </a>
</div>

<div id="ajax-message" role="status" aria-live="polite"></div>

<div class="card">
    <div class="card-body">

        <div class="mb-3">
            <label for="search" class="form-label">
                Search products
            </label>

            <input type="search"
                   id="search"
                   class="form-control"
                   placeholder="Search by name...">
        </div>

        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody id="product-table">

                    &#123;% for product in products %&#125;
                        <tr class="product-row"
                            data-name="&#123;&#123; product.name|lower &#125;&#125;">

                            <td>&#123;&#123; product.id &#125;&#125;</td>

                            <td>&#123;&#123; product.name &#125;&#125;</td>

                            <td>
                                &#123;&#123; product.price|number_format(2) &#125;&#125;
                            </td>

                            <td>
                                <a href="&#123;&#123; path('product_edit', &#123;
                                    id: product.id
                                &#125;) &#125;&#125;"
                                   class="btn btn-sm btn-warning">
                                    Edit
                                </a>

                                <button type="button"
                                        class="btn btn-sm btn-danger delete-product"
                                        data-url="&#123;&#123; path('product_delete', &#123;
                                            id: product.id
                                        &#125;) &#125;&#125;"
                                        data-token="&#123;&#123; csrf_token(
                                            'delete_product_' ~ product.id
                                        ) &#125;&#125;">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    &#123;% else %&#125;
                        <tr>
                            <td colspan="4">
                                No products found.
                            </td>
                        </tr>
                    &#123;% endfor %&#125;

                </tbody>
            </table>
        </div>

    </div>
</div>

&#123;% endblock %&#125;
```

Twig automatically escapes dynamic content in this template.

### Product form

**templates/product/form.html.twig**

```twig
&#123;% extends 'base.html.twig' %&#125;

&#123;% block title %&#125;&#123;&#123; title &#125;&#125;&#123;% endblock %&#125;

&#123;% block body %&#125;

<h1 class="mb-4">&#123;&#123; title &#125;&#125;</h1>

<div class="card">
    <div class="card-body">

        &#123;% if error %&#125;
            <div class="alert alert-danger" role="alert">
                &#123;&#123; error &#125;&#125;
            </div>
        &#123;% endif %&#125;

        <form method="post" action="&#123;&#123; action &#125;&#125;">

            <input type="hidden"
                   name="_token"
                   value="&#123;&#123; csrf_token('product_form') &#125;&#125;">

            <div class="mb-3">
                <label for="name" class="form-label">
                    Product name
                </label>

                <input type="text"
                       class="form-control"
                       id="name"
                       name="name"
                       value="&#123;&#123; data.name &#125;&#125;"
                       maxlength="255"
                       required>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label">
                    Price
                </label>

                <input type="number"
                       class="form-control"
                       id="price"
                       name="price"
                       value="&#123;&#123; data.price &#125;&#125;"
                       min="0"
                       step="0.01"
                       required>
            </div>

            <button type="submit" class="btn btn-primary">
                Save
            </button>

            <a href="&#123;&#123; path('product_index') &#125;&#125;"
               class="btn btn-secondary">
                Cancel
            </a>

        </form>

    </div>
</div>

&#123;% endblock %&#125;
```

Both forms use POST and redirect to the listing on success.

## 12. Configure AssetMapper and jQuery

```bash
php bin/console importmap:require jquery
php bin/console importmap:require bootstrap
```

### Main JavaScript entry point

**assets/app.js**

```javascript
import './styles/app.css';

import 'bootstrap';

import './products.js';
```

### jQuery interactions

**assets/products.js**

```javascript
import $ from 'jquery';

$(function () &#123;

    // Filter products without a server request
    $('#search').on('input', function () &#123;

        const search = $(this).val().toLowerCase().trim();

        $('.product-row').each(function () &#123;

            const name = $(this).attr('data-name');

            $(this).toggle(name.includes(search));

        &#125;);

    &#125;);

    // Delete products through AJAX
    $(document).on('click', '.delete-product', function () &#123;

        const button = $(this);
        const row = button.closest('tr');

        const url = button.attr('data-url');
        const token = button.attr('data-token');

        if (!confirm('Are you sure you want to delete this product?')) &#123;
            return;
        &#125;

        button.prop('disabled', true);

        $.ajax(&#123;
            url: url,
            type: 'POST',

            data: &#123;
                _token: token
            &#125;,

            dataType: 'json',

            success: function (response) &#123;

                if (response.success) &#123;

                    row.remove();

                    showMessage(
                        response.message,
                        'success'
                    );

                &#125; else &#123;

                    showMessage(
                        response.message,
                        'danger'
                    );

                    button.prop('disabled', false);
                &#125;

            &#125;,

            error: function (xhr) &#123;

                const message = xhr.responseJSON?.message
                    ?? 'An error occurred while deleting the product';

                showMessage(message, 'danger');

                button.prop('disabled', false);
            &#125;
        &#125;);

    &#125;);

    function showMessage(message, type) &#123;

        const alert = $('<div>')
            .addClass('alert')
            .addClass('alert-' + type)
            .attr('role', 'alert')
            .text(message);

        $('#ajax-message').empty().append(alert);

    &#125;

&#125;);
```

Using `.text()` rather than `.html()` prevents interpreting untrusted messages as HTML.

### Application CSS

**assets/styles/app.css**

```css
body &#123;
    background-color: #f5f6f8;
&#125;

.card &#123;
    border-radius: 8px;
&#125;

.table td,
.table th &#123;
    vertical-align: middle;
&#125;

#search &#123;
    max-width: 400px;
&#125;

.product-row &#123;
    transition: background-color 0.2s;
&#125;
```

Twig loads the import map using `&#123;&#123; importmap('app') &#125;&#125;`. Compile for production:

```bash
APP_ENV=prod APP_DEBUG=0 php bin/console asset-map:compile
```

No npm or Webpack is required.

## 13. Configure routing and services

**config/routes.yaml**

```yaml
controllers:
    resource:
        path: ../src/Controller/
        namespace: App\Controller
    type: attribute
```

**config/services.yaml**

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

```bash
php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
php bin/console debug:router
```

| Route name | Path |
|---|---|
| `product_index` | `/products` |
| `product_new` | `/products/new` |
| `product_edit` | `/products/&#123;id&#125;/edit` |
| `product_delete` | `/products/&#123;id&#125;/delete` |

## 14. PHPUnit tests for ProductService using mocks

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
&#123;
    private ProductRepository $repository;
    private EntityManagerInterface $entityManager;
    private ProductService $service;

    protected function setUp(): void
    &#123;
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
    &#125;

    private function makeProduct(): Product
    &#123;
        return (new Product())
            ->setName('Laptop')
            ->setPrice(999.99);
    &#125;

    public function testGetAll(): void
    &#123;
        $products = [
            $this->makeProduct()
        ];

        $this->repository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($products);

        $this->assertSame(
            $products,
            $this->service->getAll()
        );
    &#125;

    public function testGetById(): void
    &#123;
        $product = $this->makeProduct();

        $this->repository
            ->expects($this->once())
            ->method('find')
            ->with(1)
            ->willReturn($product);

        $this->assertSame(
            $product,
            $this->service->getById(1)
        );
    &#125;

    public function testGetByIdNotFound(): void
    &#123;
        $this->repository
            ->method('find')
            ->with(999)
            ->willReturn(null);

        $this->expectException(
            ProductNotFoundException::class
        );

        $this->service->getById(999);
    &#125;

    public function testCreate(): void
    &#123;
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

        $product = $this->service->create([
            'name' => 'Keyboard',
            'price' => 49.99
        ]);

        $this->assertSame('Keyboard', $product->getName());
        $this->assertSame(49.99, $product->getPrice());
    &#125;

    public function testCreateTrimsName(): void
    &#123;
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
    &#125;

    public function testCreateInvalidName(): void
    &#123;
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
    &#125;

    public function testCreateNegativePrice(): void
    &#123;
        $this->entityManager
            ->expects($this->never())
            ->method('persist');

        $this->expectException(
            ProductValidationException::class
        );

        $this->service->create([
            'name' => 'Laptop',
            'price' => -10
        ]);
    &#125;

    public function testUpdate(): void
    &#123;
        $product = $this->makeProduct();

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

        $updated = $this->service->update(1, [
            'name' => 'Gaming Laptop',
            'price' => 1299.99
        ]);

        $this->assertSame($product, $updated);
        $this->assertSame(
            'Gaming Laptop',
            $updated->getName()
        );
        $this->assertSame(1299.99, $updated->getPrice());
    &#125;

    public function testUpdateNotFound(): void
    &#123;
        $this->repository
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
    &#125;

    public function testDelete(): void
    &#123;
        $product = $this->makeProduct();

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
    &#125;

    public function testDeleteNotFound(): void
    &#123;
        $this->repository
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
    &#125;
&#125;
```

These 11 tests cover primary CRUD operations and business validation without connecting to MySQL.

## 15. PHPUnit controller tests with mocked ProductService

**tests/Unit/Controller/ProductControllerTest.php**

```php
<?php

namespace App\Tests\Unit\Controller;

use App\Controller\ProductController;
use App\Exception\ProductNotFoundException;
use App\Service\ProductService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class ProductControllerTest extends TestCase
&#123;
    private ProductService $service;
    private CsrfTokenManagerInterface $csrfManager;
    private ProductController $controller;

    protected function setUp(): void
    &#123;
        $this->service = $this->createMock(
            ProductService::class
        );

        $this->csrfManager = $this->createMock(
            CsrfTokenManagerInterface::class
        );

        $container = new Container();

        $container->set(
            'security.csrf.token_manager',
            $this->csrfManager
        );

        $this->controller = new ProductController(
            $this->service
        );

        $this->controller->setContainer($container);
    &#125;

    public function testDeleteSuccess(): void
    &#123;
        $this->csrfManager
            ->expects($this->once())
            ->method('isTokenValid')
            ->with($this->callback(
                fn(CsrfToken $token) =>
                    $token->getId() === 'delete_product_1' &&
                    $token->getValue() === 'valid-token'
            ))
            ->willReturn(true);

        $this->service
            ->expects($this->once())
            ->method('delete')
            ->with(1);

        $request = new Request(
            request: ['_token' => 'valid-token']
        );

        $response = $this->controller->delete(1, $request);

        $this->assertSame(200, $response->getStatusCode());

        $this->assertSame(
            true,
            json_decode($response->getContent(), true)['success']
        );
    &#125;

    public function testDeleteInvalidCsrfToken(): void
    &#123;
        $this->csrfManager
            ->expects($this->once())
            ->method('isTokenValid')
            ->willReturn(false);

        $this->service
            ->expects($this->never())
            ->method('delete');

        $request = new Request(
            request: ['_token' => 'invalid-token']
        );

        $response = $this->controller->delete(1, $request);

        $this->assertSame(403, $response->getStatusCode());
    &#125;

    public function testDeleteNotFound(): void
    &#123;
        $this->csrfManager
            ->method('isTokenValid')
            ->willReturn(true);

        $this->service
            ->expects($this->once())
            ->method('delete')
            ->with(999)
            ->willThrowException(
                new ProductNotFoundException(999)
            );

        $request = new Request(
            request: ['_token' => 'valid-token']
        );

        $response = $this->controller->delete(999, $request);

        $this->assertSame(404, $response->getStatusCode());

        $this->assertSame(
            false,
            json_decode($response->getContent(), true)['success']
        );
    &#125;
&#125;
```

These tests verify delegation to the service, CSRF rejection, and appropriate JSON responses. Form rendering, validation errors, and redirects are more conveniently tested with `WebTestCase`.

## 16. Functional tests using WebTestCase

Configure **.env.test.local**:

```dotenv
DATABASE_URL="mysql://root:password@127.0.0.1:3306/product_app_test?serverVersion=8.0.36&charset=utf8mb4"
```

```bash
APP_ENV=test php bin/console doctrine:database:create
APP_ENV=test php bin/console doctrine:migrations:migrate --no-interaction
```

**tests/Functional/ProductWebTest.php**

```php
<?php

namespace App\Tests\Functional;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ProductWebTest extends WebTestCase
&#123;
    public function testProductIndex(): void
    &#123;
        $client = static::createClient();

        $client->request('GET', '/products');

        $this->assertResponseIsSuccessful();

        $this->assertSelectorTextContains(
            'h1',
            'Products'
        );
    &#125;

    public function testCreateProduct(): void
    &#123;
        $client = static::createClient();

        $crawler = $client->request(
            'GET',
            '/products/new'
        );

        $this->assertResponseIsSuccessful();

        $form = $crawler->selectButton('Save')->form([
            'name' => 'Test Laptop',
            'price' => '999.99'
        ]);

        $client->submit($form);

        $this->assertResponseRedirects('/products');

        $client->followRedirect();

        $this->assertSelectorTextContains(
            'table',
            'Test Laptop'
        );
    &#125;

    public function testCreateProductInvalidData(): void
    &#123;
        $client = static::createClient();

        $crawler = $client->request(
            'GET',
            '/products/new'
        );

        $form = $crawler->selectButton('Save')->form();

        // Bypass browser-side required-field validation.
        $client->request(
            'POST',
            '/products/new',
            [
                '_token' => $form->getValues()['_token'],
                'name' => '',
                'price' => '-10'
            ]
        );

        $this->assertResponseStatusCodeSame(422);

        $this->assertSelectorTextContains(
            '.alert-danger',
            'Product name is required'
        );
    &#125;

    public function testEditProduct(): void
    &#123;
        $client = static::createClient();

        $container = static::getContainer();

        $entityManager = $container->get(
            EntityManagerInterface::class
        );

        $product = (new Product())
            ->setName('Original Product')
            ->setPrice(50);

        $entityManager->persist($product);
        $entityManager->flush();

        $id = $product->getId();

        $crawler = $client->request(
            'GET',
            "/products/$id/edit"
        );

        $form = $crawler->selectButton('Save')->form([
            'name' => 'Updated Product',
            'price' => '75.50'
        ]);

        $client->submit($form);

        $this->assertResponseRedirects('/products');

        $client->followRedirect();

        $this->assertSelectorTextContains(
            'table',
            'Updated Product'
        );
    &#125;

    public function testDeleteProduct(): void
    &#123;
        $client = static::createClient();

        $entityManager = static::getContainer()->get(
            EntityManagerInterface::class
        );

        $product = (new Product())
            ->setName('Product to delete')
            ->setPrice(100);

        $entityManager->persist($product);
        $entityManager->flush();

        $id = $product->getId();

        // Obtain a valid CSRF token from the rendered page.
        $crawler = $client->request('GET', '/products');

        $button = $crawler->filter(
            '.delete-product[data-url="/products/' . $id . '/delete"]'
        );

        $token = $button->attr('data-token');

        $client->request(
            'POST',
            "/products/$id/delete",
            ['_token' => $token]
        );

        $this->assertResponseIsSuccessful();

        $response = json_decode(
            $client->getResponse()->getContent(),
            true
        );

        $this->assertTrue($response['success']);
    &#125;

    public function testDeleteWithoutCsrfToken(): void
    &#123;
        $client = static::createClient();

        $client->request(
            'POST',
            '/products/1/delete'
        );

        $this->assertResponseStatusCodeSame(403);
    &#125;
&#125;
```

These tests exercise forms, redirects, CSRF, and database persistence. Configure database isolation before using this suite in a shared environment. `WebTestCase` does not execute JavaScript; use Symfony Panther or Playwright for browser-level jQuery testing.

## 17. Run the PHPUnit tests

```bash
php bin/phpunit
php bin/phpunit tests/Unit/Service/ProductServiceTest.php
php bin/phpunit tests/Unit/Controller/ProductControllerTest.php
php bin/phpunit tests/Functional/ProductWebTest.php
XDEBUG_MODE=coverage php bin/phpunit --coverage-html coverage/
```

**Test coverage plan:** 11 service tests, 3 controller tests, and 6 functional tests: **20 PHPUnit test methods**. These examples have not been executed against an installed Symfony application in this conversation.

## 18. Start the application

```bash
symfony server:start
```

Open `http://localhost:8000/products` to create, edit, search, and delete products.

## 19. Production considerations

- **Authentication and authorization:** Protect product-management routes using Symfony Security.
- **Symfony Forms and Validator:** Replace manual form handling with form types and constraints.
- **Pagination:** Avoid `findAll()` for very large datasets.
- **Database precision:** Use `DECIMAL` or integer minor units for prices.
- **Testing isolation:** Use a dedicated test database with rollback or reset tooling.
- **Browser tests:** Use Symfony Panther or Playwright for jQuery interactions.
- **CSRF protection:** Validate tokens for every state-changing operation.
- **AssetMapper deployment:** Run `asset-map:compile` and serve the generated assets.

## 20. Final architecture and testing strategy

| Layer | Responsibility | Testing approach |
|---|---|---|
| Twig | HTML rendering and forms | Functional tests |
| jQuery | Search, AJAX, UI behavior | Browser tests |
| ProductController | HTTP, CSRF, redirects, templates | Mock ProductService |
| ProductService | Validation and business operations | Mock repository and entity manager |
| ProductRepository | Database access | Doctrine integration tests |
| Product entity | Product state | Unit tests when necessary |
| Complete application | HTTP-to-database workflow | WebTestCase |

The most important design choice is keeping **ProductService independent of Symfony's HTTP layer**. The controller handles HTTP behavior, Twig renders HTML, jQuery handles client-side interactions, and Doctrine persists data. This separation makes the application easier to maintain, extend, and test.
