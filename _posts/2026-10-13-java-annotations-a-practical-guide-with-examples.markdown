---
layout: post
title:  "Java Annotations - A Practical Guide with Examples"
date:   2026-10-13 03:46:56
categories: Java
description: Java Annotations - A Practical Guide with Examples
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Java annotations add metadata (additional information) to Java code. They are widely used in Spring Boot, Jakarta EE, Hibernate, and JUnit.
---
Java annotations add **metadata (additional information)** to Java code. They are widely used in Spring Boot, Jakarta EE, Hibernate, and JUnit.

Annotations can be applied to classes, methods, fields, constructors, parameters, and other Java elements.

## 1. What is a Java annotation?

An annotation starts with the `@` symbol:

```java
@Override
public String toString() {
    return "Hello World";
}
```

`@Override` tells the compiler that the method is intended to override a method from a superclass or interface. If it does not, the compiler reports an error.

### Why use annotations?

- **Compiler instructions:** Detect errors and provide warnings.
- **Configuration:** Configure classes and methods without XML.
- **Dependency injection:** Automatically provide objects to classes.
- **Validation:** Define rules for fields and parameters.
- **Database mapping:** Map Java classes to database tables.
- **REST APIs:** Define HTTP endpoints.
- **Testing:** Identify test methods.

**Annotations do not automatically execute code.** They provide metadata interpreted by a compiler, framework, or your own code.

## 2. Built-in Java annotations

### Example 1: `@Override`

```java
class Animal {
    public void makeSound() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

The compiler verifies that `makeSound()` overrides a method from the parent class.

### Example 2: `@Deprecated`

```java
public class UserService {
    @Deprecated
    public void getUserOld() {
        System.out.println("Old method");
    }

    public void getUser() {
        System.out.println("New method");
    }
}
```

Using `getUserOld()` may produce a compiler or IDE warning. You can specify additional information:

```java
@Deprecated(since = "2.0", forRemoval = true)
public void getUserOld() {
    // ...
}
```

### Example 3: `@SuppressWarnings`

```java
@SuppressWarnings("unchecked")
public void processData() {
    // Code that produces an unchecked warning
}
```

Use carefully: it can hide useful warnings.

## 3. Creating custom annotations

Define an annotation with `@interface`:

```java
public @interface Author {
    String name();
    String date();
}
```

Apply it to a class:

```java
@Author(name = "John Smith", date = "2026-10-13")
public class UserService {
    public void getUsers() {
        System.out.println("Getting users...");
    }
}
```

Here, `@Author` is the annotation; `name` and `date` are annotation elements, and the strings are their values. Nothing processes this metadata yet.

### Default values

```java
public @interface Author {
    String name();
    String date() default "unknown";
    int version() default 1;
}
```

Usage:

```java
@Author(name = "John Smith")
public class UserService {
}
```

The `date` and `version` elements use their defaults.

## 4. Controlling annotation behavior

Java provides meta-annotations that configure other annotations.

### `@Target` — Where an annotation can be used

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
public @interface LogExecution {
}
```

Usage:

```java
public class UserService {
    @LogExecution
    public void getUsers() {
        System.out.println("Getting users...");
    }
}
```

Common target values:

| Target | Description |
|---|---|
| `TYPE` | Classes, interfaces, enums |
| `METHOD` | Methods |
| `FIELD` | Fields |
| `PARAMETER` | Method parameters |
| `CONSTRUCTOR` | Constructors |
| `LOCAL_VARIABLE` | Local variables |
| `ANNOTATION_TYPE` | Other annotations |
| `TYPE_USE` | Uses of types |

Multiple targets are supported:

```java
@Target({ElementType.TYPE, ElementType.METHOD})
public @interface MyAnnotation {
}
```

### `@Retention` — How long the annotation is available

```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecution {
}
```

| Policy | Description |
|---|---|
| `SOURCE` | Available in source code, discarded by the compiler |
| `CLASS` | Stored in the `.class` file but not normally available via runtime reflection |
| `RUNTIME` | Available at runtime through reflection |

If you want to read annotations using reflection, you generally need `RetentionPolicy.RUNTIME`.

## 5. Processing annotations using Java Reflection

Suppose you want to mark methods that should be logged.

### Step 1: Define the annotation

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogExecution {
}
```

### Step 2: Apply the annotation

```java
public class UserService {
    @LogExecution
    public void createUser() {
        System.out.println("User created");
    }

    public void deleteUser() {
        System.out.println("User deleted");
    }
}
```

### Step 3: Read the annotation using reflection

```java
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        UserService service = new UserService();

        for (Method method : UserService.class.getDeclaredMethods()) {
            if (method.isAnnotationPresent(LogExecution.class)) {
                System.out.println("Executing: " + method.getName());
                method.invoke(service);
            }
        }
    }
}
```

Output:

```text
Executing: createUser
User created
```

How it works:

1. Define `@LogExecution`.
2. Annotate `createUser()`.
3. Inspect methods using `method.isAnnotationPresent(...)`.
4. Log the method name and invoke it.

The annotation itself does not execute anything. Calling `service.createUser()` directly would not automatically trigger logging.

## 6. Real-world example: Spring Boot REST APIs

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return "User ID: " + id;
    }

    @PostMapping
    public String createUser(@RequestBody User user) {
        return "Created: " + user.getName();
    }
}
```

| Annotation | Purpose |
|---|---|
| `@RestController` | Identifies a REST controller |
| `@RequestMapping` | Defines a base URL |
| `@GetMapping` | Handles HTTP GET requests |
| `@PostMapping` | Handles HTTP POST requests |
| `@PathVariable` | Extracts values from URL paths |
| `@RequestBody` | Deserializes the HTTP request body |

Request:

```http
GET /api/users/15
```

Response:

```text
User ID: 15
```

Spring Boot processes annotations to register routes and bind incoming request data.

## 7. Dependency injection with annotations

Service:

```java
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public String getUser() {
        return "John Smith";
    }
}
```

Controller:

```java
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public String getUser() {
        return userService.getUser();
    }
}
```

Spring discovers `UserService`, creates a managed bean, creates the controller, and injects the service through its constructor.

With a single constructor, modern Spring Boot applications do not require `@Autowired`:

```java
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

This is **constructor injection**.

## 8. Validation annotations

```java
import jakarta.validation.constraints.*;

public class User {
    @NotBlank
    private String name;

    @Email
    private String email;

    @Min(18)
    private int age;

    // Getters and setters
}
```

- `@NotBlank`: The string cannot be null, empty, or whitespace only.
- `@Email`: The string must have an email format accepted by the validator.
- `@Min(18)`: The number must be at least 18.

Trigger validation in a Spring controller:

```java
@PostMapping("/users")
public String createUser(@Valid @RequestBody User user) {
    return "User created";
}
```

Spring uses the configured validation provider to check constraints before invoking the controller method. Import `@Valid` from `jakarta.validation.Valid`.

## 9. Hibernate/JPA annotations

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    // Getters and setters
}
```

| Annotation | Purpose |
|---|---|
| `@Entity` | Marks a class as a persistent entity |
| `@Table` | Specifies the database table |
| `@Id` | Identifies the primary key |
| `@GeneratedValue` | Configures primary-key generation |
| `@Column` | Configures column mapping |

Hibernate interprets these annotations to manage persistence.

## 10. Advanced example: Custom security annotation

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequiresRole {
    String value();
}
```

Usage:

```java
public class AdminService {
    @RequiresRole("ADMIN")
    public void deleteAllUsers() {
        System.out.println("All users deleted");
    }
}
```

A security interceptor or framework component could inspect the annotation and check the current user's permissions before execution.

**Important:** This annotation does not enforce security by itself. Enforcement must be implemented and must not be bypassable. In Spring Security, `@PreAuthorize` is generally preferable.

## 11. Annotations vs. interfaces vs. inheritance

| Feature | Main purpose | Example |
|---|---|---|
| Annotation | Attach metadata | `@Transactional` |
| Interface | Define a contract | `UserRepository` |
| Inheritance | Reuse or specialize behavior | `Dog extends Animal` |
| Abstract class | Share implementation and define abstract behavior | `AbstractService` |

```java
@Transactional
public void transferMoney() {
    // Database operations
}
```

The annotation tells a framework to apply transactional behavior; it does not define a new type or change the inheritance hierarchy.

## 12. When should you create custom annotations?

Custom annotations are useful for reusable, declarative behavior, such as:

- Logging method execution.
- Recording audit information.
- Marking methods for background processing.
- Defining custom validation constraints.
- Associating metadata with API endpoints.
- Declaring permissions or access requirements.

If a normal method call or interface suffices, annotations and reflection may add unnecessary complexity.

## Summary

1. **Annotations provide metadata**, not executable behavior by themselves.
2. Built-in annotations such as `@Override` are understood by the compiler.
3. Custom annotations are declared with `@interface`.
4. `@Target` determines where an annotation can be used.
5. `@Retention` determines how long metadata is preserved.
6. Reflection and annotation processors can inspect custom annotations.
7. Frameworks such as Spring Boot and Hibernate interpret annotations to provide routing, dependency injection, validation, and persistence.

For backend Java development, learn **custom annotations, reflection, dependency injection, and Spring AOP** together. Spring AOP can implement behavior such as automatic logging around annotated methods without manually invoking them through reflection.
