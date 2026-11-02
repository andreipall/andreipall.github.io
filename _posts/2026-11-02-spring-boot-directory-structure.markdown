---
layout: post
title:  "Spring Boot directory structure"
date:   2026-11-02 04:46:56
categories: Java
description: Spring Boot directory structure
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: To completely test a CRUD REST API developed with Spring Boot, Spring MVC, Spring Data JPA, JUnit 5, and Mockito, I recommend combining unit tests, MVC slice tests, JPA repository tests, and full integration tests.
---
For modern Spring Boot projects (Spring Boot 3.x and 4.x), the recommended approach is to organize your code **by feature (package-by-feature)** rather than exclusively by technical layer (controller, service, repository).

This is particularly useful for medium and large applications, especially REST APIs with multiple entities and business modules.

## 1. Recommended directory structure

Here is an example of a Spring Boot REST API with users, authentication, and products.

```text
my-spring-app/
├── .mvn/
├── src/
│   ├── main/
│   │   ├── java/com/example/myapp/
│   │   │   ├── config/
│   │   │   ├── common/
│   │   │   │   ├── exception/
│   │   │   │   ├── security/
│   │   │   │   └── util/
│   │   │   ├── user/
│   │   │   │   ├── UserController.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── User.java
│   │   │   │   └── dto/
│   │   │   ├── auth/
│   │   │   ├── product/
│   │   │   └── MySpringAppApplication.java
│   │   └── resources/
│   │       ├── db/migration/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.yml
│   └── test/
│       ├── java/com/example/myapp/
│       └── resources/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

This example uses Maven. For Gradle, replace `pom.xml` and the Maven wrapper with `build.gradle` (or `build.gradle.kts`), `settings.gradle` and the Gradle wrapper.

## 2. Package-by-layer vs package-by-feature

There are two common approaches.

### Approach A: Package-by-layer

```text
com.example.myapp/
├── controller/
│   ├── UserController.java
│   └── ProductController.java
├── service/
│   ├── UserService.java
│   └── ProductService.java
├── repository/
│   ├── UserRepository.java
│   └── ProductRepository.java
├── entity/
│   ├── User.java
│   └── Product.java
├── dto/
└── config/
```

**Advantages:** Simple to understand, good for small applications and prototypes.

**Disadvantages:** As the application grows, related classes become scattered across many packages.

### Approach B: Package-by-feature (recommended)

```text
com.example.myapp/
├── user/
│   ├── UserController.java
│   ├── UserService.java
│   ├── UserRepository.java
│   ├── User.java
│   └── dto/
│       ├── UserRequest.java
│       └── UserResponse.java
├── product/
│   ├── ProductController.java
│   ├── ProductService.java
│   ├── ProductRepository.java
│   ├── Product.java
│   └── dto/
│       ├── ProductRequest.java
│       └── ProductResponse.java
├── config/
└── common/
```

**Advantages:** Better modularity, easier maintenance, clearer ownership of features, and easier extraction into separate modules later.

**Disadvantages:** Some conventions and infrastructure code may need to be shared across features.

## 3. Responsibilities of each component

| Component | Responsibility |
|---|---|
| `controller` | Handles HTTP requests and responses |
| `service` | Implements business logic |
| `repository` | Handles database access using JPA or JDBC |
| `entity` | Represents database entities |
| `dto` | Defines request and response objects |
| `config` | Spring configuration classes |
| `exception` | Custom exceptions and exception handlers |
| `security` | Authentication and authorization |
| `mapper` | Converts entities to DTOs and vice versa |
| `util` | Reusable utility functions |

For larger features, you can introduce subpackages such as `user/controller`, `user/service`, and `user/repository`. For smaller features, keeping these classes directly under `user` is often cleaner.

## 4. Where should the main application class be?

Place your main application class in the **root package**, above the other packages.

```java
package com.example.myapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MySpringAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(MySpringAppApplication.class, args);
    }
}
```

This is important because Spring Boot automatically scans the package containing the `@SpringBootApplication` class and its subpackages for Spring components.

## 5. Where should configuration files go?

Spring Boot conventionally loads application configuration from `src/main/resources/`.

For different environments, use profiles:

```text
resources/
├── application.yml
├── application-dev.yml
├── application-test.yml
├── application-prod.yml
└── db/
    └── migration/
        ├── V1__create_users.sql
        └── V2__create_products.sql
```

Example `application.yml`:

```yaml
spring:
  application:
    name: my-spring-app

  profiles:
    active: ${SPRING_PROFILES_ACTIVE:dev}

server:
  port: 8080
```

For production deployments, it is generally better to select the active profile through an environment variable rather than hardcoding it. Keep database passwords and other secrets outside version-controlled configuration.

## 6. My recommendation

For a new Spring Boot REST API using Java, Spring Data JPA, MySQL, and Spring Security, I recommend:

- **Package-by-feature** for business functionality.
- **Controller → Service → Repository** separation within each feature.
- **DTOs** for API requests and responses instead of exposing JPA entities directly.
- **Centralized exception handling** using `@RestControllerAdvice`.
- **Shared security and configuration packages** for cross-cutting functionality.
- **Flyway or Liquibase** for database migrations.
- **Tests mirroring the production package structure** under `src/test/java`.

One important architectural rule: avoid creating a large `common` or `util` package containing unrelated business logic. Code should belong to a feature unless it is genuinely shared.

**Bottom line:** Spring Boot does not mandate one package layout, but for a maintainable application with multiple REST API endpoints and database entities, **package-by-feature with clear internal layers** is an excellent default.
