---
layout: post
title:  "How to Completely Test a Spring Boot CRUD REST API Using JUnit and Mockito"
date:   2026-10-26 04:46:56
categories: Java
description: How to Completely Test a Spring Boot CRUD REST API Using JUnit and Mockito
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: To completely test a CRUD REST API developed with Spring Boot, Spring MVC, Spring Data JPA, JUnit 5, and Mockito, I recommend combining unit tests, MVC slice tests, JPA repository tests, and full integration tests.
---
To **completely test a CRUD REST API developed with Spring Boot, Spring MVC, Spring Data JPA, JUnit 5, and Mockito**, I recommend combining **unit tests, MVC slice tests, JPA repository tests, and full integration tests**.

Mockito alone is not sufficient because it mocks dependencies rather than testing real HTTP processing, database queries, transactions, and persistence.

I'll demonstrate a complete testing strategy using a `Product` CRUD API.

## 1. Recommended testing architecture

```text
REST Controller
  @WebMvcTest + MockMvc + Mockito
        |
        v
Service Layer
  JUnit 5 + Mockito
        |
        v
JPA Repository
  @DataJpaTest + H2 / Testcontainers

End-to-end API integration:
  @SpringBootTest + MockMvc + Real Database
```

| Test type | Main tools | Purpose |
|---|---|---|
| Unit tests | JUnit + Mockito | Business logic |
| Controller tests | MockMvc + Mockito | HTTP endpoints, JSON, validation |
| Repository tests | DataJpaTest | SQL/JPA queries and persistence |
| Integration tests | SpringBootTest | Entire application workflow |
| Security tests | Spring Security Test | Authentication and authorization |

## 2. Maven dependencies

For Spring Boot 3.x, add the following dependencies to `pom.xml`. The examples below use the Jakarta API and JUnit Jupiter.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```

`spring-boot-starter-test` includes JUnit Jupiter, Mockito, Spring Test, AssertJ, and MockMvc support.

For realistic database testing, you can replace H2 with Testcontainers using the same database engine as production.

## 3. Example CRUD application

We'll use this project structure:

```text
src/
├── main/java/com/example/demo/
│   ├── controller/
│   │   └── ProductController.java
│   ├── service/
│   │   └── ProductService.java
│   ├── repository/
│   │   └── ProductRepository.java
│   ├── entity/
│   │   └── Product.java
│   └── exception/
│       └── ProductNotFoundException.java
└── test/java/com/example/demo/
    ├── controller/
    │   └── ProductControllerTest.java
    ├── service/
    │   └── ProductServiceTest.java
    ├── repository/
    │   └── ProductRepositoryTest.java
    └── integration/
        └── ProductIntegrationTest.java
```

### Entity

```java
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    @Positive
    private BigDecimal price;

    // Getters and setters
}
```

### Repository

```java
public interface ProductRepository
        extends JpaRepository<Product, Long> {
}
```

### Service

```java
@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                new ProductNotFoundException(id));
    }

    public Product create(Product product) {
        return repository.save(product);
    }

    public Product update(Long id, Product input) {
        Product product = findById(id);

        product.setName(input.getName());
        product.setPrice(input.getPrice());

        return repository.save(product);
    }

    public void delete(Long id) {
        Product product = findById(id);
        repository.delete(product);
    }
}
```

Assume `ProductNotFoundException` is a runtime exception annotated with `@ResponseStatus(HttpStatus.NOT_FOUND)`, so missing products return HTTP 404.

### Controller

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public List<Product> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Product findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Product> create(
            @Valid @RequestBody Product product) {

        Product saved = service.create(product);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(saved);
    }

    @PutMapping("/{id}")
    public Product update(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {

        return service.update(id, product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
```

## 4. Unit testing the service with Mockito

Service tests should not load the Spring application context or connect to a database.

Use `@ExtendWith(MockitoExtension.class)` to initialize mocks.

```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product();
        product.setId(1L);
        product.setName("Laptop");
        product.setPrice(new BigDecimal("999.99"));
    }

    @Test
    void findAll_shouldReturnProducts() {
        when(repository.findAll())
            .thenReturn(List.of(product));

        List<Product> result = service.findAll();

        assertEquals(1, result.size());
        assertEquals("Laptop", result.get(0).getName());

        verify(repository).findAll();
    }

    @Test
    void findById_shouldReturnProduct() {
        when(repository.findById(1L))
            .thenReturn(Optional.of(product));

        Product result = service.findById(1L);

        assertEquals("Laptop", result.getName());
        verify(repository).findById(1L);
    }

    @Test
    void findById_shouldThrowWhenNotFound() {
        when(repository.findById(99L))
            .thenReturn(Optional.empty());

        assertThrows(
            ProductNotFoundException.class,
            () -> service.findById(99L)
        );
    }

    @Test
    void create_shouldSaveProduct() {
        when(repository.save(any(Product.class)))
            .thenReturn(product);

        Product result = service.create(product);

        assertEquals(1L, result.getId());

        verify(repository).save(product);
    }

    @Test
    void update_shouldModifyProduct() {
        Product input = new Product();
        input.setName("Updated Laptop");
        input.setPrice(new BigDecimal("1200.00"));

        when(repository.findById(1L))
            .thenReturn(Optional.of(product));

        when(repository.save(any(Product.class)))
            .thenAnswer(inv -> inv.getArgument(0));

        Product result = service.update(1L, input);

        assertEquals("Updated Laptop", result.getName());
        assertEquals(
            new BigDecimal("1200.00"),
            result.getPrice()
        );

        verify(repository).save(product);
    }

    @Test
    void delete_shouldDeleteProduct() {
        when(repository.findById(1L))
            .thenReturn(Optional.of(product));

        service.delete(1L);

        verify(repository).delete(product);
    }

    @Test
    void delete_shouldThrowWhenNotFound() {
        when(repository.findById(99L))
            .thenReturn(Optional.empty());

        assertThrows(
            ProductNotFoundException.class,
            () -> service.delete(99L)
        );

        verify(repository, never())
            .delete(any(Product.class));
    }
}
```

These tests cover service CRUD operations, missing records, and interactions with the repository.

## 5. Testing the REST controller with MockMvc

Use `@WebMvcTest` to load only the Spring MVC components.

The service is mocked, allowing you to test HTTP behavior without accessing the database.

For Spring Boot 3.4+ use `@MockitoBean`; for older Spring Boot 3 versions use `@MockBean`.

```java
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAll_shouldReturn200() throws Exception {
        Product product = new Product();
        product.setId(1L);
        product.setName("Laptop");
        product.setPrice(new BigDecimal("999.99"));

        when(service.findAll())
            .thenReturn(List.of(product));

        mockMvc.perform(get("/api/products"))
            .andExpect(status().isOk())
            .andExpect(content()
                .contentTypeCompatibleWith(
                    MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].name")
                .value("Laptop"));
    }

    @Test
    void getById_shouldReturn200() throws Exception {
        Product product = new Product();
        product.setId(1L);
        product.setName("Laptop");

        when(service.findById(1L))
            .thenReturn(product);

        mockMvc.perform(get("/api/products/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name")
                .value("Laptop"));
    }

    @Test
    void getById_shouldReturn404() throws Exception {
        when(service.findById(99L))
            .thenThrow(
                new ProductNotFoundException(99L));

        mockMvc.perform(get("/api/products/99"))
            .andExpect(status().isNotFound());
    }

    @Test
    void create_shouldReturn201() throws Exception {
        Product input = new Product();
        input.setName("Laptop");
        input.setPrice(new BigDecimal("999.99"));

        Product saved = new Product();
        saved.setId(1L);
        saved.setName("Laptop");
        saved.setPrice(new BigDecimal("999.99"));

        when(service.create(any(Product.class)))
            .thenReturn(saved);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper
                    .writeValueAsString(input)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void create_shouldReturn400ForInvalidData()
            throws Exception {

        String json = """
            {
                "name": "",
                "price": -10
            }
            """;

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isBadRequest());

        verify(service, never())
            .create(any(Product.class));
    }

    @Test
    void delete_shouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/products/1"))
            .andExpect(status().isNoContent());

        verify(service).delete(1L);
    }
}
```

Add an update controller test as well:

```java
@Test
void update_shouldReturn200() throws Exception {
    Product updated = new Product();
    updated.setId(1L);
    updated.setName("Updated Laptop");
    updated.setPrice(new BigDecimal("1200.00"));

    when(service.update(eq(1L), any(Product.class)))
        .thenReturn(updated);

    mockMvc.perform(put("/api/products/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {
                    "name": "Updated Laptop",
                    "price": 1200.00
                }
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name")
            .value("Updated Laptop"));
}
```

For complete controller coverage, also test malformed JSON, missing required fields, incorrect field types, invalid path IDs, unsupported content types, and missing records during update or delete.

## 6. Testing JPA repositories with @DataJpaTest

Unlike Mockito tests, repository tests must use a real JPA implementation and a test database.

```java
@DataJpaTest
class ProductRepositoryTest {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void save_shouldPersistProduct() {
        Product product = new Product();
        product.setName("Laptop");
        product.setPrice(new BigDecimal("999.99"));

        Product saved = repository.save(product);

        entityManager.flush();
        entityManager.clear();

        Product found = repository.findById(saved.getId())
            .orElseThrow();

        assertEquals("Laptop", found.getName());
    }

    @Test
    void findById_shouldReturnEmptyForMissingProduct() {
        Optional<Product> result =
            repository.findById(Long.MAX_VALUE);

        assertTrue(result.isEmpty());
    }

    @Test
    void delete_shouldRemoveProduct() {
        Product product = new Product();
        product.setName("Laptop");
        product.setPrice(new BigDecimal("999.99"));

        Product saved = repository.saveAndFlush(product);
        Long id = saved.getId();

        repository.delete(saved);
        repository.flush();
        entityManager.clear();

        assertFalse(repository.existsById(id));
    }
}
```

`@DataJpaTest` is transactional and normally rolls back changes after each test.

For custom queries, test filtering, sorting, pagination, joins, uniqueness constraints, and database-specific behavior.

**Important:** H2 is convenient, but it is not an exact replacement for MySQL or PostgreSQL. If your production database uses database-specific SQL, Testcontainers is preferable.

## 7. Full integration testing with @SpringBootTest

This is the most important complement to unit testing.

Integration tests verify that all application layers work together:

`HTTP request → Controller → Service → JPA Repository → Database`

```java
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ProductIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProductRepository repository;

    @Test
    void completeCrudWorkflow() throws Exception {

        // CREATE
        String response = mockMvc.perform(
                post("/api/products")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                        {
                            "name": "Laptop",
                            "price": 999.99
                        }
                        """))
            .andExpect(status().isCreated())
            .andReturn()
            .getResponse()
            .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();

        Long id = mapper.readTree(response)
            .get("id").asLong();

        // READ
        mockMvc.perform(get("/api/products/" + id))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name")
                .value("Laptop"));

        // UPDATE
        mockMvc.perform(put("/api/products/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "Updated Laptop",
                        "price": 1200.00
                    }
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name")
                .value("Updated Laptop"));

        // DELETE
        mockMvc.perform(delete("/api/products/" + id))
            .andExpect(status().isNoContent());

        // VERIFY DELETION
        mockMvc.perform(get("/api/products/" + id))
            .andExpect(status().isNotFound());

        assertFalse(repository.existsById(id));
    }
}
```

This verifies a complete CRUD lifecycle.

Because this example uses `MockMvc`, it tests the real Spring MVC dispatching and application components without starting a real HTTP server. For real network-level tests, use `@SpringBootTest(webEnvironment = RANDOM_PORT)` with an HTTP client.

Also, this example uses a shared test transaction. Add separate nontransactional integration tests when you need to verify commit behavior, transaction boundaries, or database constraints at commit time.

## 8. Complete CRUD test checklist

### CREATE — POST

- [ ] Valid request returns 201
- [ ] Created record is persisted
- [ ] Invalid or missing fields return 400
- [ ] Malformed JSON returns 400
- [ ] Duplicate values or unique constraints handled
- [ ] Unexpected server errors handled

### READ — GET

- [ ] Existing record returns 200
- [ ] Missing record returns 404
- [ ] List endpoint returns multiple records
- [ ] Empty list returns 200 and []
- [ ] Sorting and pagination work correctly

### UPDATE — PUT

- [ ] Existing record is updated
- [ ] Updated values persist in database
- [ ] Missing record returns 404
- [ ] Invalid request returns 400
- [ ] Unchanged fields behave as intended

### DELETE — DELETE

- [ ] Existing record returns 204
- [ ] Record is removed from database
- [ ] Missing record follows documented behavior
- [ ] Related records and foreign keys handled

### SECURITY & RELIABILITY

- [ ] Unauthenticated requests rejected where required
- [ ] Forbidden operations return 403
- [ ] Roles and permissions enforced
- [ ] SQL injection and invalid input handled safely
- [ ] Transaction rollback and concurrent updates tested

## 9. Measuring test coverage with JaCoCo

Add JaCoCo to Maven:

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.13</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

Run the tests:

```bash
mvn clean verify
```

Then open:

```text
target/site/jacoco/index.html
```

Aim for meaningful coverage of business logic, failure paths, and API behavior. A high line-coverage percentage alone does not guarantee correct functionality.

## 10. Recommended testing strategy

For a production Spring Boot CRUD REST API, I recommend:

| Layer | Testing approach | Priority |
|---|---|---|
| Service | Mockito + JUnit 5 | Essential |
| Controller | MockMvc + mocked service | Essential |
| Repository | DataJpaTest + database | Essential |
| Integration | SpringBootTest + database | Essential |
| Validation | MockMvc invalid-input tests | Essential |
| Security | Spring Security Test | If security is enabled |
| Database compatibility | Testcontainers | Strongly recommended |
| Coverage | JaCoCo | Recommended |
| Performance | JMeter, Gatling, or k6 | Based on requirements |

**My recommendation:** Use Mockito for service unit tests, MockMvc for controller tests, and Testcontainers with your production database engine for repository and full integration tests.

For a genuinely complete test suite, the next improvements would be **parameterized tests with `@ParameterizedTest`, Testcontainers integration, transactional behavior tests, and security tests with `@WithMockUser`**. This provides much stronger confidence than testing CRUD success cases alone.

One compatibility note: these examples target Spring Boot 3.x with recent Spring testing APIs. For Spring Boot 4, verify the updated MVC test starter, imports, and test annotations for your exact version.
