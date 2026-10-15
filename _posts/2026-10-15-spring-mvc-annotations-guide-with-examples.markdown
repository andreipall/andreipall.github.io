---
layout: post
title:  "Spring MVC Annotations - Guide with Examples"
date:   2026-10-15 04:46:56
categories: Java
description: Spring MVC Annotations - Guide with Examples
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Spring MVC is a Java framework for web applications and REST APIs. Its annotations handle routing, request data, validation, responses, and errors. Some commonly used annotations come from the broader Spring ecosystem or Jakarta Validation rather than Spring MVC itself.
---
Spring MVC is a Java framework for web applications and REST APIs. Its annotations handle routing, request data, validation, responses, and errors. Some commonly used annotations come from the broader Spring ecosystem or Jakarta Validation rather than Spring MVC itself.

## 1. Controller and mapping annotations

| Annotation | Purpose |
|---|---|
| `@Controller` | Defines an MVC controller, usually returning view names. |
| `@RestController` | Combines `@Controller` and `@ResponseBody`; usually returns JSON. |
| `@RequestMapping` | Maps requests by path, method, headers, content type, etc. |
| `@GetMapping` | Handles GET requests. |
| `@PostMapping` | Handles POST requests. |
| `@PutMapping` | Handles PUT requests. |
| `@PatchMapping` | Handles PATCH requests. |
| `@DeleteMapping` | Handles DELETE requests. |

### Traditional MVC controller

```java
@Controller
public class HomeController {
    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("message", "Welcome!");
        return "home"; // e.g. a Thymeleaf home.html template
    }
}
```

### REST controller

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping
    public List<String> list() {
        return List.of("John", "Mary", "David");
    }

    @GetMapping("/{id}")
    public String get(@PathVariable Long id) {
        return "User ID: " + id;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return user;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        // Delete the user in the service layer.
    }
}
```

## 2. Request binding annotations

| Annotation | Purpose |
|---|---|
| `@PathVariable` | Reads a URL path variable. |
| `@RequestParam` | Reads a query string or form parameter. |
| `@RequestBody` | Deserializes the HTTP body into an object. |
| `@RequestHeader` | Reads a request header. |
| `@CookieValue` | Reads a cookie. |
| `@RequestPart` | Reads a multipart request part, including files. |
| `@ModelAttribute` | Binds request parameters to an object or adds data to the model. |
| `@RequestAttribute` | Reads a request attribute set by earlier server-side processing. |
| `@SessionAttribute` | Reads an existing session attribute. |
| `@MatrixVariable` | Reads matrix parameters in a path, when configured. |

### Path and query parameters

```java
@GetMapping("/users/{id}")
public String getUser(@PathVariable("id") Long userId) {
    return "User: " + userId;
}

@GetMapping("/search")
public String search(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(required = false) String category) {
    return "Keyword: " + keyword + ", Page: " + page;
}
```

Example requests: `GET /users/15` and `GET /search?keyword=java&page=2`.

### JSON request body

```java
@PostMapping("/users")
public User createUser(@RequestBody User user) {
    return user;
}
```

Example body:

```json
{"name": "John", "email": "john@example.com"}
```

Spring typically uses Jackson to deserialize JSON.

### Headers and cookies

```java
@GetMapping("/headers")
public String headers(@RequestHeader("User-Agent") String agent) {
    return agent;
}

@GetMapping("/session")
public String session(
        @CookieValue(value = "sessionId", required = false) String id) {
    return id != null ? id : "No session cookie";
}
```

### Multipart upload

```java
@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public String upload(@RequestPart("file") MultipartFile file,
                     @RequestPart("metadata") DocumentMetadata metadata) {
    return file.getOriginalFilename();
}
```

## 3. Response annotations

| Annotation | Purpose |
|---|---|
| `@ResponseBody` | Writes a method result to the response body. |
| `@ResponseStatus` | Sets a fixed response status. |
| `@ModelAttribute` (method) | Exposes data in the MVC model. |

```java
@Controller
public class StatusController {
    @GetMapping("/api/status")
    @ResponseBody
    public Map<String, String> status() {
        return Map.of("status", "OK");
    }
}
```

```java
@PostMapping("/users")
@ResponseStatus(HttpStatus.CREATED)
public User create(@RequestBody User user) {
    return userService.save(user);
}
```

For dynamic statuses and headers, use `ResponseEntity<T>` (a class, not an annotation):

```java
@GetMapping("/users/{id}")
public ResponseEntity<User> find(@PathVariable Long id) {
    return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}
```

## 4. Validation annotations

`@Valid` is from Jakarta Validation; `@Validated` is from Spring. Constraints such as `@NotBlank` are from Jakarta Validation.

| Annotation | Purpose |
|---|---|
| `@Valid` | Triggers validation of an object. |
| `@Validated` | Triggers Spring validation, optionally with groups. |
| `@NotNull` | Value must not be null. |
| `@NotBlank` | String must contain non-whitespace characters. |
| `@NotEmpty` | String, array, map, or collection must not be empty. |
| `@Size` | Limits string length or collection size. |
| `@Min`, `@Max` | Set numeric limits. |
| `@Email` | Checks email format. |
| `@Pattern` | Checks a regular expression. |
| `@Positive` | Requires a positive number. |
| `@Past`, `@Future` | Validate temporal values. |

```java
import jakarta.validation.constraints.*;

public record CreateUserRequest(
    @NotBlank @Size(min = 3, max = 100) String name,
    @NotBlank @Email String email,
    @NotNull @Min(18) Integer age
) {}
```

```java
@PostMapping("/users")
public ResponseEntity<CreateUserRequest> create(
        @Valid @RequestBody CreateUserRequest request) {
    return ResponseEntity.status(HttpStatus.CREATED).body(request);
}
```

An invalid request body generally produces HTTP 400. The validation starter (`spring-boot-starter-validation`) is normally needed in Spring Boot applications.

## 5. Exception handling annotations

| Annotation | Purpose |
|---|---|
| `@ExceptionHandler` | Handles selected exception types. |
| `@ControllerAdvice` | Shares controller advice across controllers. |
| `@RestControllerAdvice` | Combines `@ControllerAdvice` with `@ResponseBody`. |
| `@ResponseStatus` on exception classes | Associates an exception with an HTTP status. |

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> badRequest(
            IllegalArgumentException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validation(
            MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest().body(Map.of("error", message));
    }
}
```

## 6. Model, binding, and session annotations

| Annotation | Purpose |
|---|---|
| `@ModelAttribute` | Binds form fields and/or adds model attributes. |
| `@InitBinder` | Configures binding and validation. |
| `@SessionAttributes` | Persists selected MVC model attributes in the session. |
| `@SessionAttribute` | Reads an existing session attribute. |

```java
@Controller
@RequestMapping("/users")
public class RegistrationController {
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("user") UserForm form,
                           BindingResult result) {
        if (result.hasErrors()) {
            return "registration";
        }
        return "redirect:/users/success";
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setAllowedFields("name", "email");
    }
}
```

Keep `BindingResult` immediately after the validated model argument.

```java
@Controller
@SessionAttributes("cart")
public class CartController {
    @ModelAttribute("cart")
    public Cart initializeCart() {
        return new Cart();
    }

    @PostMapping("/cart/complete")
    public String complete(SessionStatus status) {
        status.setComplete();
        return "redirect:/checkout/success";
    }
}
```

## 7. CORS annotation

`@CrossOrigin` configures cross-origin requests at the controller or method level.

```java
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "https://frontend.example.com")
public class ProductController {
    @GetMapping
    public List<Product> list() {
        return productService.findAll();
    }
}
```

For application-wide rules, consider configuring CORS via `WebMvcConfigurer`. CORS is not a substitute for authentication or authorization.

## 8. Other Spring annotations commonly used with MVC

These are **not all Spring MVC annotations**, but they commonly appear in MVC projects.

| Annotation | Purpose |
|---|---|
| `@Component` | Registers a general-purpose component. |
| `@Service` | Marks a service-layer component. |
| `@Repository` | Marks a persistence-layer component. |
| `@Autowired` | Injects a dependency. |
| `@Qualifier` | Chooses a bean when multiple candidates exist. |
| `@Primary` | Makes a bean the preferred candidate. |
| `@Configuration` | Declares configuration. |
| `@Bean` | Defines a Spring-managed bean. |
| `@Value` | Injects a configuration value. |
| `@Profile` | Limits activation to certain profiles. |
| `@Transactional` | Defines a transaction boundary. |

Constructor injection is generally preferred; a single constructor does not need `@Autowired`.

```java
@Service
public class UserService {
    public List<String> findAll() {
        return List.of("John", "Mary");
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<String> findAll() {
        return userService.findAll();
    }
}
```

## 9. Complete miniature REST API example

```java
// UserRequest.java
import jakarta.validation.constraints.*;

public record UserRequest(
    @NotBlank String name,
    @NotBlank @Email String email
) {}
```

```java
// UserResponse.java
public record UserResponse(Long id, String name, String email) {}
```

```java
// UserService.java
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserResponse findById(Long id) {
        return new UserResponse(id, "John", "john@example.com");
    }

    public UserResponse create(UserRequest request) {
        // Example only: persist to a database in a real application.
        return new UserResponse(1L, request.name(), request.email());
    }
}
```

```java
// UserController.java
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/users",
                produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody UserRequest request) {
        UserResponse created = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

This sample omits persistence, authentication, and missing-user handling for brevity.

## 10. Learning order

1. `@RestController`, `@RequestMapping`
2. `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping`
3. `@PathVariable`, `@RequestParam`, `@RequestBody`
4. `@Valid`, `@Validated`, Jakarta constraints
5. `@RestControllerAdvice`, `@ExceptionHandler`
6. `@ResponseStatus`, `@ResponseBody`, `ResponseEntity`
7. `@Service`, `@Repository`, constructor injection
8. `@Transactional`
9. `@CrossOrigin`
10. `@ModelAttribute`, `@InitBinder`

## 11. Simplified Spring MVC request lifecycle

```text
HTTP request
    |
    v
DispatcherServlet (front controller)
    |
    v
Handler mapping + argument binding + validation
    |
    v
@Controller / @RestController
    |
    v
@Service (business logic)
    |
    v
@Repository / database (if needed)
    |
    v
Controller result -> response conversion / view rendering
    |
    v
HTTP response
```

Exceptions may be intercepted by MVC exception resolvers and `@ExceptionHandler` methods.

## References

- [Spring MVC annotated controllers](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html)
- [Spring MVC request mapping](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html)
- [Spring MVC method arguments](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/arguments.html)
- [Spring MVC validation](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-validation.html)
- [Spring MVC exception handling](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-exceptionhandler.html)
