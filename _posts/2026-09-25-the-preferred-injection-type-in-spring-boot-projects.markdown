---
layout: post
title:  "The preferred injection type in Spring Boot projects"
date:   2026-09-25 03:46:56
categories: Java
description: The preferred injection type in Spring Boot projects
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: In Spring MVC, ModelAttribute is mainly used to bind HTTP request parameters to a Java object (a model/DTO) and/or add an object to the MVC model.
---
In Spring Boot, **constructor injection is generally the preferred injection type**.

## 1. Constructor Injection — Recommended

```java
@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
}
```

### Why it’s preferred

- Dependencies are **explicit**.
- Fields can be `final`.
- Makes the class easier to **test**.
- Prevents creating the object without its required dependencies.
- Helps avoid circular dependencies.
- Works well with immutable design.

With a single constructor, Spring automatically uses it, so `@Autowired` is not required.

```java
@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}
```

## 2. Setter Injection

```java
@Service
public class OrderService {

    private OrderRepository repository;

    @Autowired
    public void setRepository(OrderRepository repository) {
        this.repository = repository;
    }
}
```

Setter injection can be useful when a dependency is **optional or genuinely intended to be changed after construction**, but it is generally not the default choice.

## 3. Field Injection — Generally Avoid

```java
@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;
}
```

Field injection is concise, but it has several drawbacks:

- Dependencies aren't obvious from the constructor.
- Harder to instantiate and unit-test without Spring.
- Fields can't naturally be `final`.
- Encourages mutable dependencies.

## Practical Rule

| Type | Typical recommendation |
|---|---|
| **Constructor injection** | ✅ Preferred |
| Setter injection | ⚠️ For optional/changeable dependencies |
| Field injection | ❌ Generally avoid |

## Using Lombok

If you're using Lombok, `@RequiredArgsConstructor` is a common way to reduce constructor boilerplate:

```java
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository repository;
    private final PaymentService paymentService;
}
```

Lombok generates the constructor containing the required `final` dependencies, and Spring uses that constructor for dependency injection.

## Conclusion

For modern Spring Boot projects, use **constructor injection by default**.

Use **setter injection** when a dependency is intentionally optional or needs to be changed after construction, and generally avoid **field injection**.
