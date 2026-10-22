---
layout: post
title:  "Mockito Examples"
date:   2026-10-22 04:46:56
categories: Java
description: Mockito Examples
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Mockito is a Java mocking framework used in unit testing to create fake objects, simulate method responses, and verify interactions between objects.
---
**Mockito** is a Java mocking framework used in unit testing to create fake objects, simulate method responses, and verify interactions between objects.

It is commonly used with **JUnit 5** to test Java classes without connecting to real databases, APIs, Solr servers, or other external services.

Below are practical examples, starting with basic mocking and progressing to more advanced scenarios.

## 1. Add Mockito to your Java project

For a Maven project, add the following dependencies to your `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.13.4</version>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-core</artifactId>
        <version>5.20.0</version>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.mockito</groupId>
        <artifactId>mockito-junit-jupiter</artifactId>
        <version>5.20.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

These are example versions; use compatible versions approved for your project.

## 2. Basic example: Mock an object

Suppose you have this interface:

```java
public interface UserRepository {
    String findUsernameById(int id);
}
```

You can mock it without implementing the interface.

```java
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserRepositoryTest {

    @Test
    void testMockObject() {

        // Create mock
        UserRepository repository = mock(UserRepository.class);

        // Define mock behavior
        when(repository.findUsernameById(1))
            .thenReturn("Andrei");

        // Call mocked method
        String username = repository.findUsernameById(1);

        // Verify result
        assertEquals("Andrei", username);

        // Verify method was called
        verify(repository).findUsernameById(1);
    }
}
```

**Explanation:**

- `mock()` creates a mock object.
- `when()` defines the expected behavior.
- `thenReturn()` specifies the value returned.
- `verify()` checks whether a method was called.
- `assertEquals()` checks the returned result.

The real `UserRepository` implementation is never executed.

## 3. Mock a dependency using @Mock and @InjectMocks

This is one of the most common ways to use Mockito.

Suppose you have a service that depends on a repository.

**UserRepository.java**

```java
public interface UserRepository {
    String findUsernameById(int id);
}
```

**UserService.java**

```java
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public String getUsername(int id) {
        return repository.findUsernameById(id);
    }
}
```

Now test the service without using a real repository.

**UserServiceTest.java**

```java
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserService service;

    @Test
    void testGetUsername() {

        when(repository.findUsernameById(10))
            .thenReturn("Andrei");

        String result = service.getUsername(10);

        assertEquals("Andrei", result);

        verify(repository, times(1))
            .findUsernameById(10);
    }
}
```

**Important annotations:**

| Annotation | Purpose |
|---|---|
| `@Mock` | Creates a mock object |
| `@InjectMocks` | Creates the tested object and injects mocks into it |
| `@Spy` | Creates a partial mock that calls real methods by default |
| `@Captor` | Captures arguments passed to mocked methods |
| `@ExtendWith(MockitoExtension.class)` | Initializes Mockito annotations for JUnit 5 |

`@InjectMocks` supports constructor, setter, and field injection. Constructor injection is generally preferable.

## 4. Mock methods with different arguments

You can configure different responses depending on the input.

```java
UserRepository repository = mock(UserRepository.class);

when(repository.findUsernameById(1))
    .thenReturn("Andrei");

when(repository.findUsernameById(2))
    .thenReturn("John");

when(repository.findUsernameById(3))
    .thenReturn("Maria");

System.out.println(repository.findUsernameById(1));
// Andrei

System.out.println(repository.findUsernameById(2));
// John

System.out.println(repository.findUsernameById(3));
// Maria
```

You can also use argument matchers:

```java
when(repository.findUsernameById(anyInt()))
    .thenReturn("Unknown");
```

Or:

```java
when(repository.findUsernameById(intThat(id -> id > 100)))
    .thenReturn("External user");
```

Other useful matchers include `anyString()`, `eq()`, `isNull()`, and `argThat()`.

## 5. Mock exceptions

Mockito can simulate failures without actually causing external services to fail.

For example:

```java
UserRepository repository = mock(UserRepository.class);

when(repository.findUsernameById(99))
    .thenThrow(new RuntimeException("Database unavailable"));

assertThrows(RuntimeException.class, () -> {
    repository.findUsernameById(99);
});
```

This is useful for testing exception handling, database connection failures, API timeouts, and Solr errors.

## 6. Mock void methods

Suppose you have:

```java
public interface NotificationService {
    void sendEmail(String email, String message);
}
```

Because `sendEmail()` returns `void`, you use `doThrow()` rather than `when().thenThrow()`.

```java
NotificationService notification =
    mock(NotificationService.class);

// Simulate an exception
doThrow(new RuntimeException("SMTP error"))
    .when(notification)
    .sendEmail(anyString(), anyString());

assertThrows(RuntimeException.class, () -> {
    notification.sendEmail(
        "test@example.com",
        "Hello"
    );
});
```

For normal behavior, void methods on mocks do nothing by default.

You can simply verify them:

```java
NotificationService notification =
    mock(NotificationService.class);

notification.sendEmail("test@example.com", "Hello");

verify(notification).sendEmail(
    "test@example.com",
    "Hello"
);
```

## 7. Verify method calls

Mockito can check whether methods were called and how many times.

```java
UserRepository repository = mock(UserRepository.class);

repository.findUsernameById(1);
repository.findUsernameById(1);
repository.findUsernameById(2);

// Called exactly twice
verify(repository, times(2))
    .findUsernameById(1);

// Called exactly once
verify(repository, times(1))
    .findUsernameById(2);

// Never called
verify(repository, never())
    .findUsernameById(3);

// Called at least once
verify(repository, atLeastOnce())
    .findUsernameById(1);

// Called at most three times
verify(repository, atMost(3))
    .findUsernameById(1);
```

To verify that no methods were called:

```java
verifyNoInteractions(repository);
```

To verify that no additional interactions occurred:

```java
verifyNoMoreInteractions(repository);
```

## 8. Mock consecutive method responses

Sometimes you need the same method to return different values on successive calls.

```java
UserRepository repository = mock(UserRepository.class);

when(repository.findUsernameById(1))
    .thenReturn("First")
    .thenReturn("Second")
    .thenReturn("Third");

System.out.println(repository.findUsernameById(1));
// First

System.out.println(repository.findUsernameById(1));
// Second

System.out.println(repository.findUsernameById(1));
// Third

System.out.println(repository.findUsernameById(1));
// Third
```

This is useful for testing retry logic, polling, and status changes.

## 9. Mock real classes instead of interfaces

Mockito can mock concrete Java classes as well.

Suppose you have:

```java
public class DatabaseConnection {

    public boolean connect() {
        // Real database connection
        return true;
    }

    public String getStatus() {
        return "Connected";
    }
}
```

Test:

```java
@Test
void testDatabaseMock() {

    DatabaseConnection db =
        mock(DatabaseConnection.class);

    when(db.connect()).thenReturn(false);

    when(db.getStatus())
        .thenReturn("Connection failed");

    assertFalse(db.connect());

    assertEquals(
        "Connection failed",
        db.getStatus()
    );
}
```

The real methods are not executed.

## 10. Partial mocking with @Spy

A spy wraps a real object and allows you to override selected methods.

```java
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

@Test
void testSpy() {

    List<String> list = spy(new ArrayList<>());

    // Real method is executed
    list.add("Java");
    list.add("Mockito");

    // Override size()
    doReturn(100).when(list).size();

    System.out.println(list.get(0));
    // Java

    System.out.println(list.size());
    // 100

    verify(list).add("Java");
}
```

**Difference between Mock and Spy:**

| Behavior | Mock | Spy |
|---|---|---|
| Calls real methods by default | No | Yes |
| Can override methods | Yes | Yes |
| Uses real object state | No | Yes |
| Typical purpose | Isolate dependencies | Partial mocking |

With spies, prefer:

```java
doReturn(100).when(list).size();
```

instead of:

```java
when(list.size()).thenReturn(100);
```

because the second form calls the real method during stubbing.

## 11. Capture method arguments using ArgumentCaptor

Suppose you want to verify the actual message passed to a notification service.

```java
import org.mockito.ArgumentCaptor;

@Test
void testArgumentCaptor() {

    NotificationService notification =
        mock(NotificationService.class);

    notification.sendEmail(
        "admin@example.com",
        "Archive completed"
    );

    ArgumentCaptor<String> captor =
        ArgumentCaptor.forClass(String.class);

    verify(notification).sendEmail(
        eq("admin@example.com"),
        captor.capture()
    );

    assertEquals(
        "Archive completed",
        captor.getValue()
    );
}
```

This is especially useful when the tested class generates values internally.

## 12. Practical example: Mock an Apache Solr client

Since Mockito can mock external service clients, here is an example using Apache SolrJ.

Suppose your application uses `SolrClient` to query a Solr server.

**SolrSearchService.java**

```java
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;

public class SolrSearchService {

    private final SolrClient solrClient;

    public SolrSearchService(SolrClient solrClient) {
        this.solrClient = solrClient;
    }

    public long getNumberOfResults(String query)
            throws Exception {

        SolrQuery solrQuery = new SolrQuery(query);

        QueryResponse response =
            solrClient.query(solrQuery);

        SolrDocumentList results =
            response.getResults();

        return results.getNumFound();
    }
}
```

Now test it without connecting to a real Solr server.

**SolrSearchServiceTest.java**

```java
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;

@ExtendWith(MockitoExtension.class)
class SolrSearchServiceTest {

    @Mock
    private SolrClient solrClient;

    @Mock
    private QueryResponse queryResponse;

    @InjectMocks
    private SolrSearchService searchService;

    @Test
    void testGetNumberOfResults() throws Exception {

        SolrDocumentList documents =
            new SolrDocumentList();

        documents.setNumFound(150);

        when(solrClient.query(any(SolrQuery.class)))
            .thenReturn(queryResponse);

        when(queryResponse.getResults())
            .thenReturn(documents);

        long count =
            searchService.getNumberOfResults("title:archive");

        assertEquals(150, count);

        verify(solrClient, times(1))
            .query(argThat(query ->
                "title:archive".equals(query.getQuery())
            ));
    }
}
```

In this test:

- No real Solr server is required.
- No HTTP requests are made.
- The mocked Solr response reports 150 matching documents.
- The test verifies that the expected Solr query was submitted.

This approach works with `Http2SolrClient`, database repositories, REST API clients, and other dependencies.

## 13. Mock static methods

Modern Mockito supports mocking static methods.

Suppose you have:

```java
public class Utils {

    public static String getServerName() {
        return "production-server";
    }
}
```

Test:

```java
import org.mockito.MockedStatic;

@Test
void testStaticMock() {

    try (MockedStatic<Utils> mocked =
            mockStatic(Utils.class)) {

        mocked.when(Utils::getServerName)
            .thenReturn("test-server");

        assertEquals(
            "test-server",
            Utils.getServerName()
        );

        mocked.verify(Utils::getServerName);
    }
}
```

The static mock is automatically closed after the `try` block, restoring normal behavior.

## 14. Mock object construction

Mockito can also intercept calls to `new` for supported classes.

```java
import org.mockito.MockedConstruction;

@Test
void testConstructorMock() {

    try (MockedConstruction<DatabaseConnection> mocked =
            mockConstruction(
                DatabaseConnection.class,
                (mock, context) -> {
                    when(mock.connect()).thenReturn(true);
                }
            )) {

        DatabaseConnection db =
            new DatabaseConnection();

        assertTrue(db.connect());

        assertEquals(1, mocked.constructed().size());
    }
}
```

This can help when testing legacy code that creates dependencies internally. For new code, constructor dependency injection is usually a better design.

---

## 15. Mockito quick reference

| Task | Mockito code |
|---|---|
| Create mock | `mock(MyClass.class)` |
| Return value | `when(mock.method()).thenReturn(value)` |
| Throw exception | `when(mock.method()).thenThrow(exception)` |
| Mock void exception | `doThrow(exception).when(mock).method()` |
| Verify call | `verify(mock).method()` |
| Verify twice | `verify(mock, times(2)).method()` |
| Verify never called | `verify(mock, never()).method()` |
| Match any string | `anyString()` |
| Match exact argument | `eq(value)` |
| Capture argument | `ArgumentCaptor.forClass(String.class)` |
| Create spy | `spy(realObject)` |
| Mock static method | `mockStatic(MyClass.class)` |
| Mock constructor | `mockConstruction(MyClass.class)` |
| Reset mock | `reset(mock)` |

## Recommended approach

For most Java projects, I recommend using **JUnit 5 + Mockito with `@Mock`, `@InjectMocks`, and `MockitoExtension`**.

The important principle is to **mock the dependencies, not the class you are testing**. For example, when testing a class that communicates with Apache Solr, create a real instance of your service and mock only its `SolrClient` dependency.

This gives you fast, isolated unit tests that don't require running MySQL, Solr, Docker, or external HTTP services.
