---
layout: post
title:  "ModelAttribute in Spring MVC"
date:   2026-09-14 03:46:56
categories: Java
description: ModelAttribute in Spring MVC
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: In Spring MVC, ModelAttribute is mainly used to bind HTTP request parameters to a Java object (a model/DTO) and/or add an object to the MVC model.
---
In **Spring MVC**, `@ModelAttribute` is mainly used to **bind HTTP request parameters to a Java object** (a model/DTO) and/or **add an object to the MVC model**.

Think of it as:

> **Request parameters → Java object → Controller**

## 1. Binding form data to a Java object

Suppose you have a form:

``` html
<form action="/register" method="post">
    <input name="name">
    <input name="email">
    <input name="age">
    <button type="submit">Register</button>
</form>
```

And a Java class:

``` java
public class User {
    private String name;
    private String email;
    private int age;

    // getters and setters
}
```

Your controller can use:

``` java
@PostMapping("/register")
public String register(@ModelAttribute User user) {
    System.out.println(user.getName());
    System.out.println(user.getEmail());
    System.out.println(user.getAge());

    return "success";
}
```

Spring automatically:

1.  Creates a `User` object.
2.  Reads request parameters (`name`, `email`, `age`).
3.  Matches them to the object's properties.
4.  Calls the setters.
5.  Passes the populated object to your method.

So if the request is:

``` text
POST /register
name=John&email=john@example.com&age=25
```

Spring effectively creates:

``` java
User user = new User();
user.setName("John");
user.setEmail("john@example.com");
user.setAge(25);
```

## 2. `@ModelAttribute` with GET request parameters

It isn't limited to HTML forms.

For example:

``` text
/products?name=laptop&category=electronics
```

You could write:

``` java
@GetMapping("/products")
public String products(@ModelAttribute ProductFilter filter) {
    // filter.name = "laptop"
    // filter.category = "electronics"

    return "products";
}
```

This is useful when you have **multiple related request parameters**.

Instead of:

``` java
@GetMapping("/products")
public String products(
        @RequestParam String name,
        @RequestParam String category,
        @RequestParam int page) {
    ...
}
```

you can group them:

``` java
public String products(@ModelAttribute ProductFilter filter)
```

## 3. Adding an object to the Model

`@ModelAttribute` can also be used on a **method**:

``` java
@ModelAttribute
public User createUser() {
    return new User();
}
```

This makes the returned object available in the MVC model for controller
methods/views.

For example:

``` java
@Controller
public class UserController {

    @ModelAttribute
    public User user() {
        return new User();
    }

    @GetMapping("/register")
    public String showForm() {
        return "register";
    }
}
```

The `User` object is automatically placed into the model, so a view can
use it.

You can also explicitly name the attribute:

``` java
@ModelAttribute("user")
public User user() {
    return new User();
}
```

## 4. `@ModelAttribute` vs `@RequestBody`

This is one of the most important distinctions.

### `@ModelAttribute`

``` java
@PostMapping("/users")
public String create(@ModelAttribute User user) {
    ...
}
```

Typically binds **form/query parameters**:

``` text
name=John&age=25
```

### `@RequestBody`

``` java
@PostMapping("/users")
public String create(@RequestBody User user) {
    ...
}
```

Typically binds a **request body**, such as JSON:

``` json
{
  "name": "John",
  "age": 25
}
```

So, as a simple rule:
{% highlight java %}
-----------------------------------------------------------------------
Annotation                          Usually used for
----------------------------------- -----------------------------------
`@RequestParam`                     One/small number of request
                                      parameters

`@ModelAttribute`                   Binding multiple form/query
                                      parameters to an object

`@RequestBody`                      Binding JSON/XML request body to an
                                      object

`@PathVariable`                     Values embedded in the URL path
-----------------------------------------------------------------------
{% endhighlight %}
## A useful mental model

``` text
HTML Form
   ↓
name=John
email=john@example.com
age=25
   ↓
@ModelAttribute User
   ↓
User {
    name = "John",
    email = "john@example.com",
    age = 25
}
```

## In short

Use `@ModelAttribute` when you want Spring MVC to **populate a Java
object from request parameters**, especially for traditional form
submissions, or when you want to **put an object into the MVC model for
a view**.
