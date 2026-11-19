---
layout: post
title:  "Complete Guide to JPQL Query Types in JPA"
date:   2026-11-19 04:46:56
categories: Java
description: Complete Guide to JPQL Query Types in JPA
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: JPQL (Java Persistence Query Language) is an object-oriented query language used by JPA implementations such as Hibernate to query database entities.
---
**JPQL (Java Persistence Query Language)** is an object-oriented query language used by JPA implementations such as Hibernate to query database entities.

Unlike SQL, JPQL operates on **Java entity classes and their properties**, rather than database tables and columns.

This guide covers JPQL query types, joins, filtering, aggregation, subqueries, projections, updates, deletes, pagination, and advanced Hibernate features, with examples suitable for Spring Boot, Jakarta Persistence, and Hibernate.

## **1. Example entity model**

We'll use four entities throughout the examples.

Conceptual relationships: Department–Employee (one-to-many), Employee–Task (one-to-many), and Employee–Project (many-to-many). Dashed relationships indicate the Employee–Project association.

### **Department entity**

```

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "department")
    private List<Employee> employees;
}

```

### **Employee entity**

```

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double salary;

    private Integer age;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToMany(mappedBy = "employee")
    private List<Task> tasks;

    @ManyToMany
    @JoinTable(
        name = "employee_project",
        joinColumns = @JoinColumn(name = "employee_id"),
        inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> projects;
}

```

### **Project and Task entities**

```

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "projects")
    private List<Employee> employees;
}

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}

```

All examples assume an injected `EntityManager`:

```
@PersistenceContext
private EntityManager em;
```

For brevity, entity getters, setters, and imports are omitted.

## **2. SELECT queries**

SELECT retrieves entities, individual properties, or calculated values.

### **2.1 Select all entities**

```
List<Employee> employees = em.createQuery(
    "SELECT e FROM Employee e",
    Employee.class
).getResultList();
```

Equivalent SQL:

```
SELECT * FROM employee;
```

### **2.2 Select one entity**

```
Employee employee = em.createQuery(
    "SELECT e FROM Employee e WHERE e.id = :id",
    Employee.class
)
.setParameter("id", 10L)
.getSingleResult();
```

`getSingleResult()` throws `NoResultException` if no result exists and `NonUniqueResultException` if multiple results exist.

### **2.3 Select specific fields**

```
List<Object[]> results = em.createQuery(
    "SELECT e.name, e.salary FROM Employee e",
    Object[].class
).getResultList();

for (Object[] row : results) {
    String name = (String) row[0];
    Double salary = (Double) row[1];
}
```

### **2.4 SELECT DISTINCT**

Removes duplicate results.

```
List<Department> departments = em.createQuery(
    """
    SELECT DISTINCT d
    FROM Department d
    JOIN d.employees e
    WHERE e.salary > 5000
    """,
    Department.class
).getResultList();
```

### **2.5 SELECT with entity aliases**

```
SELECT employee
FROM Employee employee
WHERE employee.age > 30
```

Aliases such as `e`, `d`, and `employee` refer to entities or joined objects.

## **3. WHERE queries and filtering**

### **3.1 Comparison operators**

JPQL supports:

| Operator | Meaning               |
| -------- | --------------------- |
| `=`      | Equal                 |
| `<>`     | Not equal             |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |

Example:

```
SELECT e
FROM Employee e
WHERE e.salary >= 5000
```

### **3.2 AND, OR, NOT**

```
SELECT e
FROM Employee e
WHERE e.salary > 5000
  AND (e.age < 30 OR e.age > 50)
```

### **3.3 BETWEEN**

```
SELECT e
FROM Employee e
WHERE e.salary BETWEEN 3000 AND 7000
```

`BETWEEN` includes both boundaries.

### **3.4 IN**

```
List<Employee> employees = em.createQuery(
    "SELECT e FROM Employee e WHERE e.id IN :ids",
    Employee.class
)
.setParameter("ids", List.of(1L, 2L, 3L))
.getResultList();
```

### **3.5 LIKE**

```
SELECT e
FROM Employee e
WHERE e.name LIKE 'John%'
```

Common wildcards:

- `%` — zero or more characters
- `_` — exactly one character

Case-insensitive search:

```
SELECT e
FROM Employee e
WHERE LOWER(e.name) LIKE LOWER(:name)
```

### **3.6 IS NULL / IS NOT NULL**

```
SELECT e
FROM Employee e
WHERE e.department IS NULL
```

### **3.7 IS EMPTY / IS NOT EMPTY**

Used for collection relationships.

```
SELECT d
FROM Department d
WHERE d.employees IS EMPTY
```

Returns departments with no employees.

# **4. JPQL JOIN types**

Joins are especially important because JPQL uses **entity relationships**, rather than requiring explicit foreign-key comparisons.

## **4.1 INNER JOIN**

Returns only records where the relationship has matching objects.

```
SELECT e
FROM Employee e
INNER JOIN e.department d
WHERE d.name = 'IT'
```

Equivalent SQL:

```
SELECT e.*
FROM employee e
INNER JOIN department d
    ON e.department_id = d.id
WHERE d.name = 'IT';
```

`JOIN` and `INNER JOIN` are equivalent.

```
SELECT e
FROM Employee e
JOIN e.department d
```

**Behavior:** Employees without a department are excluded.

## **4.2 LEFT JOIN / LEFT OUTER JOIN**

Returns all employees, including those without a department.

```
SELECT e
FROM Employee e
LEFT JOIN e.department d
```

Equivalent SQL:

```
SELECT e.*
FROM employee e
LEFT JOIN department d
    ON e.department_id = d.id;
```

Employees without departments are included.

### **Find employees without departments**

```
SELECT e
FROM Employee e
LEFT JOIN e.department d
WHERE d.id IS NULL
```

For this particular relationship, the simpler query is:

```
SELECT e
FROM Employee e
WHERE e.department IS NULL
```

## **4.3 RIGHT JOIN / RIGHT OUTER JOIN**

Returns all departments, even if they have no employees.

```
SELECT d
FROM Employee e
RIGHT JOIN e.department d
```

However, RIGHT JOIN support is provider- and version-dependent, and Hibernate has broader support than some other implementations.

**Recommended portable alternative:**

```
SELECT d
FROM Department d
LEFT JOIN d.employees e
```

This expresses the same outer-join direction using a LEFT JOIN.

## **4.4 FULL OUTER JOIN**

A FULL JOIN returns all records from both sides, including unmatched records.

**Important:** FULL OUTER JOIN is not part of standard portable JPQL. Hibernate HQL supports full outer joins, depending on the dialect and database.

Hibernate HQL example:

```
SELECT e, d
FROM Employee e
FULL JOIN e.department d
```

For portable JPQL, use alternative queries or native SQL.

## **4.5 JOIN FETCH**

One of the most useful JPQL features.

A fetch join loads associated entities as part of the query.

Without fetch join:

```
SELECT e
FROM Employee e
```

Accessing `e.getDepartment()` may trigger additional SQL queries when the association is lazy.

With fetch join:

```
SELECT e
FROM Employee e
JOIN FETCH e.department
```

Hibernate retrieves employees and their departments together.

### **LEFT JOIN FETCH**

```
SELECT e
FROM Employee e
LEFT JOIN FETCH e.department
```

Includes employees without departments.

### **Fetch collections**

```
SELECT DISTINCT d
FROM Department d
LEFT JOIN FETCH d.employees
```

Retrieves departments and their employees.

**Important considerations:**

- Fetch joins help avoid the N+1 query problem.
- Collection fetch joins can multiply SQL rows.
- Avoid paginating queries that fetch-join collections.
- Fetch joins should not be used to filter the fetched collection with `ON`.
- Standard JPQL fetch joins do not declare an alias for the fetched association.

## **4.6 Multiple JOINs**

```
SELECT DISTINCT e
FROM Employee e
JOIN e.department d
JOIN e.projects p
WHERE d.name = 'IT'
  AND p.name = 'Website'
```

This retrieves employees in the IT department who work on the Website project.

Equivalent SQL conceptually:

```
SELECT DISTINCT e.*
FROM employee e
JOIN department d
    ON e.department_id = d.id
JOIN employee_project ep
    ON ep.employee_id = e.id
JOIN project p
    ON p.id = ep.project_id
WHERE d.name = 'IT'
  AND p.name = 'Website';
```

## **4.7 JOIN with ON**

The `ON` clause adds conditions to the join.

```
SELECT d, e
FROM Department d
LEFT JOIN d.employees e
    ON e.salary > 5000
```

This returns every department, with employees matched only when their salary exceeds 5000.

Compare:

```
SELECT d, e
FROM Department d
LEFT JOIN d.employees e
WHERE e.salary > 5000
```

The second query removes rows where no employee satisfies the condition, effectively losing the unmatched departments.

This distinction is particularly important with outer joins.

## **4.8 Implicit JOIN**

JPQL automatically navigates single-valued relationships.

```
SELECT e
FROM Employee e
WHERE e.department.name = 'IT'
```

This implicitly joins `Employee` with `Department`.

It is similar to:

```
SELECT e
FROM Employee e
JOIN e.department d
WHERE d.name = 'IT'
```

Implicit joins through associations generally have INNER JOIN semantics.

For nullable relationships, use explicit LEFT JOIN when necessary.

## **4.9 Multiple roots / CROSS JOIN**

JPQL supports multiple entities in the `FROM` clause.

```
SELECT e, d
FROM Employee e, Department d
```

This produces a Cartesian product.

If there are 100 employees and 10 departments, the result contains 1,000 combinations.

You can restrict combinations:

```
SELECT e, d
FROM Employee e, Department d
WHERE e.department = d
```

Hibernate HQL also supports explicit `CROSS JOIN`.

## **4.10 JOIN many-to-many relationships**

For `Employee` and `Project`:

```
SELECT DISTINCT e
FROM Employee e
JOIN e.projects p
WHERE p.name = 'Migration'
```

Hibernate automatically handles the intermediate `employee_project` join table.

To retrieve projects assigned to a particular employee:

```
SELECT p
FROM Employee e
JOIN e.projects p
WHERE e.id = :employeeId
```

## **4.11 JOIN unrelated entities**

Standard JPQL association joins require a mapped relationship.

If entities are unrelated, portable JPQL can use multiple roots:

```
SELECT e, d
FROM Employee e, Department d
WHERE e.name = d.name
```

Hibernate HQL also supports explicit entity joins with `ON`:

```
SELECT e, d
FROM Employee e
JOIN Department d ON e.name = d.name
```

This is useful for entities that do not have a mapped association.

### **JOIN comparison**

| Join type             | Includes unmatched rows?          | Standard JPQL              |
| --------------------- | --------------------------------- | -------------------------- |
| INNER JOIN            | No                                | Yes                        |
| LEFT JOIN             | Left side                         | Yes                        |
| RIGHT JOIN            | Right side                        | Version/provider dependent |
| FULL JOIN             | Both sides                        | No                         |
| JOIN FETCH            | Depends on inner/outer join       | Yes                        |
| JOIN ON               | Depends on join type              | Yes                        |
| Implicit JOIN         | No                                | Yes                        |
| Multiple roots        | All combinations before filtering | Yes                        |
| Unrelated entity JOIN | Depends on join type              | Hibernate HQL extension    |

# **5. Aggregate queries**

JPQL supports aggregate functions.

## **5.1 COUNT**

```
SELECT COUNT(e)
FROM Employee e
```

Java:

```
Long count = em.createQuery(
    "SELECT COUNT(e) FROM Employee e",
    Long.class
).getSingleResult();
```

## **5.2 SUM**

```
SELECT SUM(e.salary)
FROM Employee e
```

## **5.3 AVG**

```
SELECT AVG(e.salary)
FROM Employee e
```

## **5.4 MIN and MAX**

```
SELECT MIN(e.salary), MAX(e.salary)
FROM Employee e
```

## **5.5 COUNT DISTINCT**

```
SELECT COUNT(DISTINCT e.department)
FROM Employee e
```

Counts distinct non-null departments referenced by employees.

# **6. GROUP BY and HAVING**

## **6.1 GROUP BY**

Calculate average salary per department:

```
SELECT d.name, AVG(e.salary)
FROM Employee e
JOIN e.department d
GROUP BY d.id, d.name
```

Result example:

| Department | Average salary |
| ---------- | -------------- |
| IT         | 6,500          |
| HR         | 4,500          |
| Finance    | 7,200          |

## **6.2 HAVING**

Filter aggregated results.

```
SELECT d.name, COUNT(e)
FROM Department d
JOIN d.employees e
GROUP BY d.id, d.name
HAVING COUNT(e) > 5
```

Returns departments with more than five employees.

## **6.3 GROUP BY with LEFT JOIN**

Include departments with no employees:

```
SELECT d.name, COUNT(e)
FROM Department d
LEFT JOIN d.employees e
GROUP BY d.id, d.name
```

For departments without employees, `COUNT(e)` returns zero.

## **6.4 GROUP BY with multiple aggregates**

```
SELECT d.name,
       COUNT(e),
       AVG(e.salary),
       MIN(e.salary),
       MAX(e.salary)
FROM Department d
LEFT JOIN d.employees e
GROUP BY d.id, d.name
```

# **7. ORDER BY queries**

## **7.1 Ascending**

```
SELECT e
FROM Employee e
ORDER BY e.salary ASC
```

## **7.2 Descending**

```
SELECT e
FROM Employee e
ORDER BY e.salary DESC
```

## **7.3 Multiple ordering fields**

```
SELECT e
FROM Employee e
ORDER BY e.department.name ASC, e.salary DESC
```

Sorts by department name, then salary descending.

# **8. Subqueries**

JPQL supports subqueries in `WHERE` and `HAVING`.

Standard JPQL does not generally allow subqueries in `FROM`.

## **8.1 Scalar subquery**

Find employees earning more than the company average.

```
SELECT e
FROM Employee e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM Employee e2
)
```

## **8.2 IN subquery**

```
SELECT e
FROM Employee e
WHERE e.department.id IN (
    SELECT d.id
    FROM Department d
    WHERE d.name LIKE 'IT%'
)
```

## **8.3 EXISTS subquery**

Find departments containing employees earning more than 5000.

```
SELECT d
FROM Department d
WHERE EXISTS (
    SELECT e
    FROM Employee e
    WHERE e.department = d
      AND e.salary > 5000
)
```

## **8.4 NOT EXISTS**

Find departments without employees.

```
SELECT d
FROM Department d
WHERE NOT EXISTS (
    SELECT e
    FROM Employee e
    WHERE e.department = d
)
```

## **8.5 Correlated subquery**

Find employees earning more than the average salary in their own department.

```
SELECT e
FROM Employee e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM Employee e2
    WHERE e2.department = e.department
)
```

The inner query refers to the outer query's employee.

## **8.6 ALL**

Find employees earning more than every employee in the HR department.

```
SELECT e
FROM Employee e
WHERE e.salary > ALL (
    SELECT e2.salary
    FROM Employee e2
    WHERE e2.department.name = 'HR'
)
```

## **8.7 ANY / SOME**

Find employees earning more than at least one employee in HR.

```
SELECT e
FROM Employee e
WHERE e.salary > ANY (
    SELECT e2.salary
    FROM Employee e2
    WHERE e2.department.name = 'HR'
)
```

`SOME` is a synonym for `ANY`.

# **9. Collection queries**

JPQL has operators specifically designed for entity collections.

## **9.1 MEMBER OF**

Find employees belonging to a given project.

```
SELECT e
FROM Employee e
WHERE :project MEMBER OF e.projects
```

Java:

```
List<Employee> employees = em.createQuery(
    """
    SELECT e
    FROM Employee e
    WHERE :project MEMBER OF e.projects
    """,
    Employee.class
)
.setParameter("project", project)
.getResultList();
```

The parameter must contain a managed or identifiable `Project` entity instance.

## **9.2 IS EMPTY**

```
SELECT e
FROM Employee e
WHERE e.projects IS EMPTY
```

Returns employees without projects.

## **9.3 SIZE**

```
SELECT e
FROM Employee e
WHERE SIZE(e.projects) > 3
```

Returns employees assigned to more than three projects.

## **9.4 INDEX**

For indexed list mappings, JPQL supports `INDEX()`.

For example, if a collection is mapped with `@OrderColumn`:

```
SELECT t
FROM Employee e
JOIN e.tasks t
WHERE INDEX(t) = 0
```

This requires `tasks` to have an indexed list mapping; the original example entity would need an appropriate `@OrderColumn`.

## **9.5 KEY and VALUE**

For map-valued relationships:

```
SELECT KEY(entry), VALUE(entry)
FROM Department d
JOIN d.employeeMap entry
```

This assumes a mapped `employeeMap` property on `Department`.

# **10. Constructor expressions / DTO projections**

Instead of returning entire entities, JPQL can create DTOs.

Example DTO:

```
package com.example.dto;

public record EmployeeDTO(
    String name,
    Double salary
) {}
```

JPQL:

```
List<EmployeeDTO> employees = em.createQuery(
    """
    SELECT NEW com.example.dto.EmployeeDTO(
        e.name,
        e.salary
    )
    FROM Employee e
    """,
    EmployeeDTO.class
).getResultList();
```

Advantages include reduced data transfer, avoiding unnecessary entity loading, and convenient REST API responses.

### **DTO with JOIN and aggregate**

```
public record DepartmentStatisticsDTO(
    String department,
    Long employeeCount,
    Double averageSalary
) {}
```

```
SELECT NEW com.example.dto.DepartmentStatisticsDTO(
    d.name,
    COUNT(e),
    AVG(e.salary)
)
FROM Department d
LEFT JOIN d.employees e
GROUP BY d.id, d.name
```

# **11. UPDATE queries**

JPQL supports bulk updates.

```
int updated = em.createQuery(
    """
    UPDATE Employee e
    SET e.salary = e.salary * 1.10
    WHERE e.department.name = :department
    """
)
.setParameter("department", "IT")
.executeUpdate();
```

However, **JPQL bulk UPDATE queries do not support JOIN clauses**, and portable JPQL does not allow association navigation in an update's WHERE clause in the same way as SELECT queries.

A portable alternative is:

```
int updated = em.createQuery(
    """
    UPDATE Employee e
    SET e.salary = e.salary * 1.10
    WHERE e.department IN (
        SELECT d
        FROM Department d
        WHERE d.name = :department
    )
    """
)
.setParameter("department", "IT")
.executeUpdate();
```

`executeUpdate()` returns the number of affected entities.

Bulk updates bypass the persistence context's normal entity synchronization and lifecycle callbacks. They should be executed within a transaction, and already-loaded entities may need to be refreshed or the persistence context cleared.

# **12. DELETE queries**

Delete employees with no department:

```
int deleted = em.createQuery(
    """
    DELETE FROM Employee e
    WHERE e.department IS NULL
    """
).executeUpdate();
```

Delete employees in a department:

```
int deleted = em.createQuery(
    """
    DELETE FROM Employee e
    WHERE e.department IN (
        SELECT d
        FROM Department d
        WHERE d.name = :department
    )
    """
)
.setParameter("department", "Temporary")
.executeUpdate();
```

Bulk DELETE does not automatically apply normal entity lifecycle cascades and callbacks.

Like bulk UPDATE, JPQL DELETE does not support JOIN clauses directly.

# **13. Named queries**

Named queries are defined on entity classes.

```
@Entity
@NamedQuery(
    name = "Employee.findByDepartment",
    query = """
        SELECT e
        FROM Employee e
        WHERE e.department.name = :name
        """
)
public class Employee {
    // ...
}
```

Usage:

```
List<Employee> employees = em.createNamedQuery(
    "Employee.findByDepartment",
    Employee.class
)
.setParameter("name", "IT")
.getResultList();
```

Benefits include reusable queries, centralized definitions, and validation at application startup by many JPA providers.

# **14. Parameterized queries**

JPQL supports named and positional parameters.

### **Named parameters**

```
SELECT e
FROM Employee e
WHERE e.name = :name
```

```
query.setParameter("name", "John");
```

### **Positional parameters**

```
SELECT e
FROM Employee e
WHERE e.name = ?1
```

```
query.setParameter(1, "John");
```

**Recommendation:** Prefer named parameters for readability and always bind user-supplied values rather than concatenating them into JPQL strings.

# **15. Pagination**

JPQL does not use SQL's `LIMIT` and `OFFSET` syntax in portable queries.

Instead, use the JPA API.

```
List<Employee> employees = em.createQuery(
    """
    SELECT e
    FROM Employee e
    ORDER BY e.id
    """,
    Employee.class
)
.setFirstResult(20)
.setMaxResults(10)
.getResultList();
```

This retrieves the third page when each page contains 10 records.

Use a deterministic `ORDER BY` for stable pagination.

# **16. CASE expressions**

JPQL supports conditional expressions.

```
SELECT e.name,
       CASE
           WHEN e.salary >= 8000 THEN 'High'
           WHEN e.salary >= 4000 THEN 'Medium'
           ELSE 'Low'
       END
FROM Employee e
```

### **CASE with aggregation**

```
SELECT d.name,
       SUM(
           CASE
               WHEN e.salary > 5000 THEN 1
               ELSE 0
           END
       )
FROM Department d
LEFT JOIN d.employees e
GROUP BY d.id, d.name
```

Counts employees earning more than 5000 per department.

# **17. JPQL functions**

JPQL includes standard string, numeric, date, and null-handling functions.

| Function            | Example                       | Purpose              |
| ------------------- | ----------------------------- | -------------------- |
| `LOWER`             | `LOWER(e.name)`               | Lowercase            |
| `UPPER`             | `UPPER(e.name)`               | Uppercase            |
| `LENGTH`            | `LENGTH(e.name)`              | String length        |
| `CONCAT`            | `CONCAT(e.name, ' Jr')`       | Concatenate          |
| `SUBSTRING`         | `SUBSTRING(e.name, 1, 3)`     | Extract substring    |
| `TRIM`              | `TRIM(e.name)`                | Remove whitespace    |
| `LOCATE`            | `LOCATE('a', e.name)`         | Find substring       |
| `ABS`               | `ABS(e.salary)`               | Absolute value       |
| `MOD`               | `MOD(e.age, 2)`               | Remainder            |
| `SQRT`              | `SQRT(e.salary)`              | Square root          |
| `COALESCE`          | `COALESCE(e.name, 'Unknown')` | First non-null value |
| `NULLIF`            | `NULLIF(e.age, 0)`            | Return null if equal |
| `CURRENT_DATE`      | `CURRENT_DATE`                | Current date         |
| `CURRENT_TIME`      | `CURRENT_TIME`                | Current time         |
| `CURRENT_TIMESTAMP` | `CURRENT_TIMESTAMP`           | Current timestamp    |

Example:

```
SELECT e
FROM Employee e
WHERE LOWER(e.name) LIKE '%john%'
```

### **Database-specific functions**

JPQL also supports invoking database functions through `FUNCTION()`.

```
SELECT FUNCTION('REPLACE', e.name, 'John', 'Jack')
FROM Employee e
```

Support depends on the database and JPA provider.

# **18. TYPE and TREAT for inheritance**

These are useful when entities use JPA inheritance.

Suppose `Manager` extends `Employee`.

### **TYPE**

```
SELECT e
FROM Employee e
WHERE TYPE(e) = Manager
```

Returns employees whose entity type is `Manager`.

### **TREAT**

Assuming `Manager` has a `bonus` property:

```
SELECT e
FROM Employee e
WHERE TREAT(e AS Manager).bonus > 1000
```

`TREAT` allows access to subclass-specific attributes.

# **19. Advanced Hibernate HQL queries**

Hibernate supports several features beyond standard JPQL.

These are useful but reduce portability.

## **19.1 Common Table Expressions (CTEs)**

Hibernate HQL supports CTEs.

```
WITH HighEarners AS (
    SELECT e.id AS id, e.salary AS salary
    FROM Employee e
    WHERE e.salary > 7000
)
SELECT h.id, h.salary
FROM HighEarners h
```

This is Hibernate HQL, not standard JPQL.

## **19.2 UNION**

Modern Hibernate HQL supports set operations such as `UNION`, `UNION ALL`, `INTERSECT`, and `EXCEPT`.

```
SELECT e.name
FROM Employee e
WHERE e.age < 25

UNION

SELECT e.name
FROM Employee e
WHERE e.salary > 10000
```

Support for set operations in Jakarta Persistence depends on the specification version; they are not available in older JPQL versions.

## **19.3 Window functions**

Hibernate HQL supports SQL-style window functions.

Example: Rank employees by salary within each department.

```
SELECT
    e.name,
    e.salary,
    ROW_NUMBER() OVER (
        PARTITION BY e.department.id
        ORDER BY e.salary DESC
    )
FROM Employee e
```

Other useful window functions include `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, and aggregate functions with `OVER`.

These are Hibernate-specific HQL capabilities rather than portable traditional JPQL.

## **19.4 Native SQL queries**

When JPQL cannot express a database-specific operation, use native SQL.

```
List<Employee> employees = em.createNativeQuery(
    """
    SELECT e.*
    FROM employee e
    JOIN department d
        ON e.department_id = d.id
    WHERE d.name = :name
    """,
    Employee.class
)
.setParameter("name", "IT")
.getResultList();
```

Native SQL supports database-specific constructs but queries tables and columns rather than entity properties.

# **20. Practical JOIN examples**

Here are common real-world scenarios.

### **Find employees and their departments**

```
SELECT e, d
FROM Employee e
JOIN e.department d
```

### **Find departments without employees**

```
SELECT d
FROM Department d
LEFT JOIN d.employees e
WHERE e.id IS NULL
```

### **Find employees without tasks**

```
SELECT e
FROM Employee e
WHERE e.tasks IS EMPTY
```

### **Find employees assigned to multiple projects**

```
SELECT e
FROM Employee e
WHERE SIZE(e.projects) > 1
```

### **Find departments with at least five employees**

```
SELECT d
FROM Department d
JOIN d.employees e
GROUP BY d
HAVING COUNT(e) >= 5
```

### **Find employees who work on a specific project**

```
SELECT DISTINCT e
FROM Employee e
JOIN e.projects p
WHERE p.name = :projectName
```

### **Find employees earning more than their department average**

```
SELECT e
FROM Employee e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM Employee e2
    WHERE e2.department = e.department
)
```

### **Retrieve departments and employees in one query**

```
SELECT DISTINCT d
FROM Department d
LEFT JOIN FETCH d.employees
```

### **Find employees with tasks whose titles contain a word**

```
SELECT DISTINCT e
FROM Employee e
JOIN e.tasks t
WHERE LOWER(t.title) LIKE LOWER(:keyword)
```

### **Find employees in IT with no projects**

```
SELECT e
FROM Employee e
JOIN e.department d
WHERE d.name = 'IT'
  AND e.projects IS EMPTY
```

# **21. JPQL vs SQL vs Hibernate HQL**

| Feature                     | JPQL                            | Hibernate HQL | Native SQL                          |
| --------------------------- | ------------------------------- | ------------- | ----------------------------------- |
| Entity-based queries        | Yes                             | Yes           | No                                  |
| INNER JOIN                  | Yes                             | Yes           | Yes                                 |
| LEFT JOIN                   | Yes                             | Yes           | Yes                                 |
| RIGHT JOIN                  | Version dependent               | Yes           | DB dependent                        |
| FULL JOIN                   | No                              | Yes           | DB dependent                        |
| JOIN FETCH                  | Yes                             | Yes           | No equivalent entity-loading syntax |
| GROUP BY / HAVING           | Yes                             | Yes           | Yes                                 |
| Subqueries                  | Yes                             | Yes           | Yes                                 |
| UPDATE / DELETE             | Yes                             | Yes           | Yes                                 |
| INSERT                      | No portable traditional JPQL    | Yes           | Yes                                 |
| CTE                         | No portable traditional JPQL    | Yes           | DB dependent                        |
| Window functions            | No portable traditional JPQL    | Yes           | DB dependent                        |
| UNION                       | Specification-version dependent | Yes           | DB dependent                        |
| Database-specific functions | Via `FUNCTION()`                | Yes           | Yes                                 |

The precise feature set depends on the Jakarta Persistence version and Hibernate version.

## **22. JPQL best practices**

1. **Prefer explicit JOINs** for complex queries because they make relationships and join semantics easier to understand.
2. **Use LEFT JOIN** when related entities may be absent and you still need the parent entity.
3. **Use JOIN FETCH selectively** to avoid N+1 queries, especially for `@ManyToOne` relationships.
4. **Avoid fetching multiple large collections simultaneously**, because the result set can grow dramatically.
5. **Use DTO projections** when you only need a few properties rather than entire entities.
6. **Use named parameters** to safely bind user input.
7. **Use EXISTS** for relationship-existence checks when joins would introduce duplicate results.
8. **Use pagination** for large datasets, but avoid paginating collection fetch joins.
9. **Be careful with bulk UPDATE and DELETE**, since they bypass normal persistence-context synchronization.
10. **Use native SQL or Hibernate HQL extensions** only when standard JPQL cannot meet your requirements.

## **23. Quick reference: choosing the right query**

| Requirement                              | Recommended JPQL technique        |
| ---------------------------------------- | --------------------------------- |
| Retrieve all entities                    | `SELECT e FROM Employee e`        |
| Filter entities                          | `WHERE`                           |
| Match related entities                   | `INNER JOIN`                      |
| Include entities without relationships   | `LEFT JOIN`                       |
| Load relationships eagerly for one query | `JOIN FETCH`                      |
| Filter join matches                      | `JOIN ... ON`                     |
| Remove duplicate results                 | `DISTINCT`                        |
| Calculate totals or averages             | `COUNT`, `SUM`, `AVG`             |
| Group and filter aggregates              | `GROUP BY`, `HAVING`              |
| Compare against another query            | Subquery                          |
| Check related records exist              | `EXISTS`                          |
| Check a collection is empty              | `IS EMPTY`                        |
| Check collection membership              | `MEMBER OF`                       |
| Return custom DTOs                       | `SELECT NEW`                      |
| Update many entities                     | `UPDATE`                          |
| Delete many entities                     | `DELETE`                          |
| Sort results                             | `ORDER BY`                        |
| Retrieve a page                          | `setFirstResult`, `setMaxResults` |
| Reuse predefined queries                 | `@NamedQuery`                     |
| Handle conditional values                | `CASE`, `COALESCE`                |
| Use advanced SQL features                | Hibernate HQL or native SQL       |

**For a typical Spring Boot + Hibernate application**, the most important JPQL features to master are `SELECT`, `WHERE`, `INNER JOIN`, `LEFT JOIN`, `JOIN FETCH`, `GROUP BY`, `HAVING`, `EXISTS`, subqueries, and DTO projections. Together, these cover the vast majority of application database queries.
