---
layout: post
title:  "JSP (JavaServer Pages) tags"
date:   2026-09-06 03:46:56
categories: Java
description: JSP (JavaServer Pages) tags
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: JSP (JavaServer Pages) tags are special elements used inside a .jsp file to add Java logic, display data, and control how a web page is generated on the server.
---
**JSP (JavaServer Pages)** tags are special elements used inside a `.jsp` file to add Java logic, display data, and control how a web page is generated on the server.

## Main JSP Tags

| JSP Tag | Syntax | What it is used for |
|---|---|---|
| **Directive** | `<%@ ... %>` | Gives instructions to the JSP container |
| **Declaration** | `<%! ... %>` | Declares variables or methods |
| **Scriptlet** | `<% ... %>` | Executes Java code |
| **Expression** | `<%= ... %>` | Displays/evaluates a Java expression |
| **JSP Action** | `<jsp:...>` | Performs actions such as including or forwarding pages |
| **Comment** | `<%-- ... --%>` | Adds comments that aren't sent to the browser |

## 1. Directive Tag — `<%@ %>`

Used to provide **instructions to the JSP container**, such as importing Java classes or configuring the page.

```jsp
<%@ page import="java.util.Date" %>
```

Common directives:

- `page` — configures the JSP page
- `include` — includes another file
- `taglib` — declares a custom/JSTL tag library

**When used:** Usually at the beginning of a JSP page when you need configuration or imports.

---

## 2. Declaration Tag — `<%! %>`

Used to **declare variables and methods** that become members of the generated servlet.

```jsp
<%!
    int count = 0;

    public int add(int a, int b) {
        return a + b;
    }
%>
```

**When used:** When you need to declare a method or field at the JSP class level.

> In modern JSP development, declarations are generally avoided in favor of Java classes/beans.

---

## 3. Scriptlet Tag — `<% %>`

Used to execute **Java statements** on the server.

```jsp
<%
    String name = "John";
    int age = 20;
%>
```

You can also use conditions or loops:

```jsp
<%
    if (age >= 18) {
        out.println("Adult");
    }
%>
```

**When used:** Historically used whenever Java logic was needed inside JSP.

> Scriptlets are **not recommended in modern JSP**. JSTL and Expression Language (EL) are preferred.

---

## 4. Expression Tag — `<%= %>`

Used to **display the result of a Java expression** directly in the HTML response.

```jsp
<%
    String name = "John";
%>

Hello, <%= name %>
```

Output:

```text
Hello, John
```

Another example:

```jsp
<p>2 + 3 = <%= 2 + 3 %></p>
```

Output:

```text
2 + 3 = 5
```

**When used:** When you want to print a value into the generated HTML.

---

## 5. JSP Action Tags — `<jsp:...>`

These perform predefined actions during JSP processing.

For example:

```jsp
<jsp:include page="header.jsp" />
```

This includes another JSP page.

Another common one:

```jsp
<jsp:forward page="login.jsp" />
```

This forwards the request to another JSP page.

**When used:** For operations such as:

- Including another resource
- Forwarding a request
- Working with JavaBeans
- Passing parameters

---

## 6. JSP Comment — `<%-- --%>`

Used for comments that **will not be sent to the browser**.

```jsp
<%-- This is a JSP comment --%>
```

Compare it with an HTML comment:

```html
<!-- This comment can be seen in the HTML source -->
```

JSP comments are removed during JSP processing.

---

## Easy Way to Remember

```text
<%@  %>    → Tell JSP how to configure/process the page
<%!  %>    → Declare variables/methods
<%   %>    → Execute Java code
<%=  %>    → Display a value
<jsp: %>   → Perform a JSP action
<%-- --%>  → JSP comment
```

## Modern JSP Development

In modern JSP applications, you will usually see **EL (Expression Language)** and **JSTL tags** instead of scriptlets.

For example:

```jsp
${user.name}
```

is generally preferred over:

```jsp
<%= user.getName() %>
```

because it keeps Java code out of the presentation layer.
