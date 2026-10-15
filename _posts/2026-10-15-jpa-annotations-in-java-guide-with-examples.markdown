---
layout: post
title:  "JPA Annotations in Java - Guide with Examples"
date:   2026-10-15 03:46:56
categories: Java
description: JPA Annotations in Java - Guide with Examples
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: JPA (Jakarta Persistence API) maps Java objects to relational database tables. Modern applications use `jakarta.persistence.*`; older applications use `javax.persistence.*`. Hibernate and EclipseLink are JPA implementations.
---
JPA (Jakarta Persistence API) maps Java objects to relational database tables. Modern applications use `jakarta.persistence.*`; older applications use `javax.persistence.*`. Hibernate and EclipseLink are JPA implementations.

## 1. Entity and column mapping

| Annotation | Purpose |
|---|---|
| `@Entity` | Marks a class as a persistent entity. |
| `@Table` | Configures its database table. |
| `@Id` | Identifies the primary key. |
| `@GeneratedValue` | Configures generated primary keys. |
| `@Column` | Configures a mapped column. |
| `@Basic` | Configures a basic persistent attribute. |
| `@Transient` | Excludes a field from persistence. |
| `@Enumerated` | Maps an enum. |
| `@Lob` | Maps large text or binary data. |
| `@Temporal` | Maps legacy `Date` or `Calendar` types. |
| `@Access` | Selects field or property access. |

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false)
    private String email;

    @Transient
    private String temporaryToken;

    // Public/protected no-argument constructor, getters, setters
}
```

`@Transient` prevents persistence of `temporaryToken`. `@Column(nullable = false)` specifies a non-null column in generated schema, but does not replace application validation.

### ID generation strategies

| Strategy | Meaning |
|---|---|
| `AUTO` | Provider chooses. |
| `IDENTITY` | Database identity / auto-increment. |
| `SEQUENCE` | Database sequence. |
| `TABLE` | ID generator table. |
| `UUID` | UUID generation (Jakarta Persistence 3.1+). |

```java
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
@SequenceGenerator(name = "user_seq", sequenceName = "users_sequence", allocationSize = 1)
private Long id;
```

### Enum and LOB examples

```java
public enum UserStatus { ACTIVE, INACTIVE, BLOCKED }

@Enumerated(EnumType.STRING)
private UserStatus status;

@Lob
private String description;

@Lob
private byte[] document;
```

Prefer `EnumType.STRING` over `ORDINAL` to avoid changing stored meanings when enum constants are reordered.

## 2. Entity relationships

| Annotation | Relationship | Example |
|---|---|---|
| `@OneToOne` | One-to-one | User → Profile |
| `@OneToMany` | One-to-many | Department → Employees |
| `@ManyToOne` | Many-to-one | Employees → Department |
| `@ManyToMany` | Many-to-many | Students ↔ Courses |
| `@JoinColumn` | Defines foreign key column | `department_id` |
| `@JoinTable` | Defines join table | `student_courses` |

### One-to-one

```java
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile profile;
}

@Entity
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
```

`Profile` owns the relationship through `@JoinColumn`; `mappedBy` identifies the inverse side.

### One-to-many / many-to-one

```java
@Entity
public class Department {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "department")
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}
```

The `employees` table has a `department_id` foreign key. Keep both sides synchronized in Java when changing bidirectional relationships.

### Many-to-many

```java
@Entity
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(name = "student_courses",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id"))
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
```

If the join table needs fields such as enrollment date, model it as its own entity instead.

## 3. Fetching and cascading

| Relationship | Default fetch |
|---|---|
| `@OneToOne` | `EAGER` |
| `@ManyToOne` | `EAGER` |
| `@OneToMany` | `LAZY` |
| `@ManyToMany` | `LAZY` |

`FetchType.LAZY` delays loading (a provider hint); `EAGER` requires eager fetching, but not necessarily via a SQL join.

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id")
private Department department;
```

| Cascade | Operation propagated |
|---|---|
| `PERSIST` | Persist |
| `MERGE` | Merge |
| `REMOVE` | Remove |
| `REFRESH` | Refresh |
| `DETACH` | Detach |
| `ALL` | All of the above |

```java
@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
private List<OrderItem> items = new ArrayList<>();
```

`orphanRemoval` deletes an owned child when removed from the managed relationship. Avoid cascading deletes into shared entities.

## 4. Lifecycle callbacks

| Annotation | When |
|---|---|
| `@PrePersist` | Before insert |
| `@PostPersist` | After persistence insert |
| `@PreUpdate` | Before update |
| `@PostUpdate` | After update |
| `@PreRemove` | Before delete |
| `@PostRemove` | After delete |
| `@PostLoad` | After load |
| `@EntityListeners` | Registers listener classes |

```java
@Entity
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void beforeInsert() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void beforeUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

Bulk JPQL and direct SQL updates bypass entity callbacks.

```java
public class AuditListener {
    @PrePersist
    public void beforeSave(Object entity) {
        System.out.println("Saving entity");
    }
}

@Entity
@EntityListeners(AuditListener.class)
public class AuditedProduct {
    @Id
    private Long id;
}
```

## 5. Embedded and inherited mappings

| Annotation | Purpose |
|---|---|
| `@Embeddable` | Reusable value object mapping |
| `@Embedded` | Includes value object fields |
| `@AttributeOverride` | Changes a column mapping |
| `@AttributeOverrides` | Groups overrides |
| `@MappedSuperclass` | Inherited mappings without an entity table |

```java
@Embeddable
public class Address {
    private String street;
    private String city;
    private String postalCode;
}

@Entity
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverride(name = "city", column = @Column(name = "billing_city"))
    private Address billingAddress;
}
```

```java
@MappedSuperclass
public abstract class BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createdAt;
}

@Entity
public class Product extends BaseEntity {
    private String name;
}
```

## 6. Inheritance

| Annotation | Purpose |
|---|---|
| `@Inheritance` | Chooses inheritance strategy |
| `@DiscriminatorColumn` | Subtype discriminator column |
| `@DiscriminatorValue` | Subtype discriminator value |
| `@PrimaryKeyJoinColumn` | PK-based join, often for `JOINED` |

Strategies: `SINGLE_TABLE` (default), `JOINED`, `TABLE_PER_CLASS`.

```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "vehicle_type")
public abstract class Vehicle {
    @Id @GeneratedValue
    private Long id;
    private String manufacturer;
}

@Entity
@DiscriminatorValue("CAR")
public class Car extends Vehicle {
    private int numberOfDoors;
}

@Entity
@DiscriminatorValue("MOTORCYCLE")
public class Motorcycle extends Vehicle {
    private int engineCapacity;
}
```

With `SINGLE_TABLE`, all subclasses share one table, usually with a discriminator column.

## 7. Named queries and entity graphs

| Annotation | Purpose |
|---|---|
| `@NamedQuery` | Reusable JPQL query |
| `@NamedQueries` | Multiple named JPQL queries |
| `@NamedNativeQuery` | Reusable native SQL |
| `@SqlResultSetMapping` | SQL result mapping |
| `@NamedEntityGraph` | Reusable fetch graph |
| `@NamedAttributeNode` | Attribute included in a graph |

```java
@Entity
@NamedQuery(name = "User.findByEmail",
    query = "SELECT u FROM User u WHERE u.email = :email")
public class User {
    @Id private Long id;
    private String email;
}

User user = entityManager
    .createNamedQuery("User.findByEmail", User.class)
    .setParameter("email", "test@example.com")
    .getSingleResult();
```

The final statement is usage code outside the entity class. JPQL refers to entity and Java property names.

```java
@NamedNativeQuery(
    name = "User.findActiveUsers",
    query = "SELECT * FROM users WHERE active = 1",
    resultClass = User.class)
```

```java
@Entity
@NamedEntityGraph(name = "Department.withEmployees",
    attributeNodes = @NamedAttributeNode("employees"))
public class Department {
    @Id private Long id;
    @OneToMany(mappedBy = "department")
    private List<Employee> employees;
}
```

## 8. Optimistic locking

`@Version` detects conflicting concurrent updates.

```java
@Entity
public class BankAccount {
    @Id private Long id;
    private BigDecimal balance;

    @Version
    private Long version;
}
```

An update may resemble:

```sql
UPDATE bank_account
SET balance = 1500, version = 2
WHERE id = 1 AND version = 1;
```

If the version no longer matches, the provider reports an optimistic locking conflict.

## 9. Composite primary keys

| Annotation | Purpose |
|---|---|
| `@EmbeddedId` | Composite ID in an embeddable |
| `@IdClass` | Composite ID defined in a separate ID class |
| `@MapsId` | Maps a relationship to an ID field |

```java
@Embeddable
public class OrderItemId implements Serializable {
    private Long orderId;
    private Long productId;

    // No-argument constructor, equals(), hashCode()
}

@Entity
public class OrderItem {
    @EmbeddedId
    private OrderItemId id;

    private int quantity;
}
```

## 10. Additional JPA annotations

| Annotation | Purpose |
|---|---|
| `@ElementCollection` | Collection of basic/embeddable values |
| `@CollectionTable` | Table for element collection |
| `@OrderBy` | Orders retrieved collection |
| `@OrderColumn` | Stores list index |
| `@Convert` | Applies attribute converter |
| `@Converter` | Defines attribute converter |
| `@SecondaryTable` / `@SecondaryTables` | Maps one entity to multiple tables |
| `@TableGenerator` | Table-based ID generation |
| `@SequenceGenerator` | Sequence-based ID generation |
| `@PersistenceContext` | Injects `EntityManager` in managed environments |
| `@PersistenceUnit` | Injects `EntityManagerFactory` in managed environments |

```java
@ElementCollection
@CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
@Column(name = "role")
private Set<String> roles = new HashSet<>();
```

```java
@Converter
public class BooleanConverter implements AttributeConverter<Boolean, String> {
    @Override
    public String convertToDatabaseColumn(Boolean value) {
        return value == null ? null : (value ? "Y" : "N");
    }

    @Override
    public Boolean convertToEntityAttribute(String value) {
        return value == null ? null : "Y".equals(value);
    }
}

@Convert(converter = BooleanConverter.class)
private Boolean active;
```

The final two lines show usage inside an entity.

## 11. Hibernate-specific annotations (not standard JPA)

| Annotation | Purpose |
|---|---|
| `@CreationTimestamp` | Creation timestamp |
| `@UpdateTimestamp` | Update timestamp |
| `@Formula` | SQL-calculated read-only property |
| `@SQLRestriction` | Static SQL restriction |
| `@Filter` / `@FilterDef` | Dynamic filters |
| `@JdbcTypeCode` | JDBC type selection |
| `@BatchSize` | Batch fetching |
| `@NaturalId` | Business identifier |
| `@Where` | Legacy restriction annotation; deprecated in newer Hibernate versions |

```java
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@CreationTimestamp
private LocalDateTime createdAt;

@UpdateTimestamp
private LocalDateTime updatedAt;

@Formula("price * quantity")
private BigDecimal totalPrice;
```

These field examples belong inside a Hibernate-managed entity.

## 12. JPA versus Spring Data JPA

| Annotation | Framework | Purpose |
|---|---|---|
| `@Entity`, `@Column` | JPA | Persistence mapping |
| `@Transactional` | Spring or Jakarta Transactions | Transaction boundaries |
| `@Repository` | Spring | Persistence component |
| `@Query` | Spring Data JPA | Repository query |
| `@Modifying` | Spring Data JPA | Modifying query |
| `@Param` | Spring Data | Named parameter binding |
| `@EntityGraph` | Spring Data JPA | Repository fetch graph |
| `@EnableJpaRepositories` | Spring Data JPA | Repository setup |

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
}
```

For this simple query, Spring Data can derive the query from `Optional<User> findByEmail(String email);` without `@Query`.

## 13. Practical combined example

```java
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_product_name", columnList = "name")
})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Version
    private Long version;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // No-argument constructor, getters and setters
}

enum ProductStatus { ACTIVE, INACTIVE, DISCONTINUED }

@Entity
class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}
```

## 14. Suggested learning order

1. **Essentials:** `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`, `@Transient`, `@Enumerated`.
2. **Relationships:** `@OneToOne`, `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@JoinColumn`, `@JoinTable`.
3. **Behavior:** `@Version`, lifecycle callbacks, embedded values, cascading, fetching.
4. **Advanced:** inheritance, composite IDs, named queries, converters, entity graphs.

### Best practices

- Prefer `LAZY` relationships unless eager loading is justified; fetch explicitly when necessary.
- Use `@Version` for entities subject to concurrent updates.
- Prefer `EnumType.STRING` to `ORDINAL`.
- Avoid broad cascading deletes across shared entities.
- Use `BigDecimal` for monetary values.
- Bean Validation annotations such as `@NotNull`, `@NotBlank`, and `@Size` are not JPA annotations.
- Manage production schema changes with Flyway or Liquibase rather than relying on automatic schema generation.
- Prefer standard JPA annotations before introducing provider-specific features.

*Examples are illustrative: imports, constructors, getters, setters, and supporting classes are omitted in some snippets for brevity.*
