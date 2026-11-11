---
layout: post
title:  "Complete Guide to Doctrine Query Language (DQL) in Symfony"
date:   2026-11-11 07:46:56
categories: PHP
description: Complete Guide to Doctrine Query Language (DQL) in Symfony
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Doctrine Query Language (DQL) is an object-oriented query language used by Doctrine ORM to retrieve and manipulate data from databases.
---
Doctrine Query Language (DQL) is an object-oriented query language used by Doctrine ORM to retrieve and manipulate data from databases.

DQL looks similar to SQL, but instead of querying database tables and columns directly, it queries PHP entities and their properties.

This guide covers the major types of DQL queries, including SELECT, INSERT alternatives, UPDATE, DELETE, JOIN, WHERE, GROUP BY, HAVING, subqueries, aggregate functions, pagination, and advanced querying techniques.

The examples use Symfony 8, Doctrine ORM, PHP 8 attributes, and MySQL, although most DQL concepts also apply outside Symfony.

## 1. Understanding DQL vs SQL

Consider a database table named `users`:

```
SELECT id, name, email
FROM users
WHERE active = 1;
```

The equivalent DQL query is:

```
$dql = '
    SELECT u
    FROM App\Entity\User u
    WHERE u.active = true
';
```

The main differences are:

| SQL                                  | DQL                               |
| ------------------------------------ | --------------------------------- |
| Queries database tables              | Queries PHP entities              |
| Uses database column names           | Uses entity property names        |
| Returns database rows                | Usually returns entity objects    |
| Uses foreign-key columns for joins   | Uses entity relationships         |
| Database-specific features available | Limited to supported DQL features |

Doctrine translates DQL into SQL appropriate for the configured database platform.

### Example entities

The following examples assume these entities exist:

```
// App\Entity\User
class User
{
    private ?int $id = null;
    private string $name;
    private string $email;
    private bool $active = true;
    private ?int $age = null;
    private \DateTimeImmutable $createdAt;

    // One user has many orders
    private Collection $orders;
}
```

```
// App\Entity\Order
class Order
{
    private ?int $id = null;
    private User $user;
    private float $total;
    private string $status;
    private \DateTimeImmutable $createdAt;

    // One order has many items
    private Collection $items;
}
```

```
// App\Entity\OrderItem
class OrderItem
{
    private ?int $id = null;
    private Order $order;
    private Product $product;
    private int $quantity;
    private float $price;
}
```

```
// App\Entity\Product
class Product
{
    private ?int $id = null;
    private string $name;
    private float $price;
    private int $stock;
    private string $category;
}
```

Assume the associations are mapped correctly with Doctrine attributes such as `#[ORM\ManyToOne]` and `#[ORM\OneToMany]`.

## 2. Executing DQL queries

In Symfony, you typically use `EntityManagerInterface`.

```
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    public function __construct(
        private EntityManagerInterface $em
    ) {
    }
}
```

There are three common ways to construct queries.

### Method A: Using DQL directly

```
$dql = 'SELECT u FROM App\Entity\User u';

$query = $this->em->createQuery($dql);

$users = $query->getResult();
```

### Method B: Using Doctrine QueryBuilder

```
$qb = $this->em->createQueryBuilder();

$users = $qb
    ->select('u')
    ->from(User::class, 'u')
    ->getQuery()
    ->getResult();
```

QueryBuilder builds DQL dynamically. It does not execute SQL directly.

### Method C: Using an Entity Repository

```
$users = $this->em
    ->getRepository(User::class)
    ->createQueryBuilder('u')
    ->getQuery()
    ->getResult();
```

This is particularly useful for queries related to one entity.

### Methods for retrieving results

| Method                    | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `getResult()`             | Returns multiple results, usually entity objects         |
| `getArrayResult()`        | Returns results as arrays                                |
| `getScalarResult()`       | Returns scalar result rows                               |
| `getOneOrNullResult()`    | Returns one result or null; throws if multiple results   |
| `getSingleResult()`       | Requires exactly one result                              |
| `getSingleScalarResult()` | Returns one scalar value                                 |
| `toIterable()`            | Iterates results incrementally                           |
| `execute()`               | Executes a query; used especially for bulk UPDATE/DELETE |

For example:

```
$user = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u WHERE u.id = :id'
)
->setParameter('id', 10)
->getOneOrNullResult();
```

If no matching user exists, `$user` will be `null`.

## 3. SELECT queries

### 3.1 Select all entities

DQL:

```
SELECT u
FROM App\Entity\User u
```

PHP:

```
$users = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u'
)->getResult();
```

QueryBuilder:

```
$users = $this->em->createQueryBuilder()
    ->select('u')
    ->from(User::class, 'u')
    ->getQuery()
    ->getResult();
```

Explanation: Doctrine hydrates each database row into a `User` entity.

### 3.2 Select specific properties

```
$dql = '
    SELECT u.id, u.name, u.email
    FROM App\Entity\User u
';

$users = $this->em->createQuery($dql)
    ->getArrayResult();
```

Example result:

```
[
    [
        'id' => 1,
        'name' => 'John',
        'email' => 'john@example.com'
    ],
    [
        'id' => 2,
        'name' => 'Mary',
        'email' => 'mary@example.com'
    ]
]
```

Explanation: Selecting scalar properties rather than complete entities reduces the data Doctrine needs to hydrate.

### 3.3 Select with aliases

```
SELECT
    u.name AS username,
    u.email AS emailAddress
FROM App\Entity\User u
```

Result:

```
[
    [
        'username' => 'John',
        'emailAddress' => 'john@example.com'
    ]
]
```

### 3.4 Select distinct values

```
SELECT DISTINCT u.name
FROM App\Entity\User u
```

This removes duplicate names from the results.

### 3.5 Select using expressions

```
SELECT
    p.name,
    p.price,
    p.price * 1.20 AS priceWithTax
FROM App\Entity\Product p
```

DQL supports arithmetic expressions and selected functions.

### 3.6 Select directly into a DTO

DQL supports the `NEW` operator for constructing data transfer objects.

```
$dql = '
    SELECT NEW App\Dto\UserSummary(
        u.id,
        u.name,
        u.email
    )
    FROM App\Entity\User u
';

$results = $this->em->createQuery($dql)->getResult();
```

The `UserSummary` class must have a compatible constructor.

This is useful for read-only API responses that do not need full entities.

## 4. WHERE conditions

### 4.1 Equality

```
SELECT u
FROM App\Entity\User u
WHERE u.active = true
```

### 4.2 Inequality

```
SELECT u
FROM App\Entity\User u
WHERE u.age <> 18
```

DQL supports comparison operators:

| Operator | Meaning               |
| -------- | --------------------- |
| `=`      | Equal                 |
| `<>`     | Not equal             |
| `!=`     | Not equal             |
| `>`      | Greater than          |
| `<`      | Less than             |
| `>=`     | Greater than or equal |
| `<=`     | Less than or equal    |

### 4.3 AND conditions

```
SELECT u
FROM App\Entity\User u
WHERE u.active = true
AND u.age >= 18
```

### 4.4 OR conditions

```
SELECT u
FROM App\Entity\User u
WHERE u.name = :name
OR u.email = :email
```

### 4.5 Combining AND and OR

```
SELECT u
FROM App\Entity\User u
WHERE u.active = true
AND (
    u.age >= 18
    OR u.name = :name
)
```

Parentheses are important when combining logical conditions.

### 4.6 Parameter binding

```
$dql = '
    SELECT u
    FROM App\Entity\User u
    WHERE u.email = :email
';

$user = $this->em->createQuery($dql)
    ->setParameter('email', $email)
    ->getOneOrNullResult();
```

Always use parameters for user-provided values instead of concatenating them into DQL.

### 4.7 IN

```
SELECT u
FROM App\Entity\User u
WHERE u.id IN (:ids)
```

PHP:

```
$users = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u WHERE u.id IN (:ids)'
)
->setParameter('ids', [1, 5, 10])
->getResult();
```

### 4.8 NOT IN

```
SELECT u
FROM App\Entity\User u
WHERE u.id NOT IN (:ids)
```

### 4.9 BETWEEN

```
SELECT p
FROM App\Entity\Product p
WHERE p.price BETWEEN :min AND :max
```

```
$products = $this->em->createQuery($dql)
    ->setParameter('min', 100)
    ->setParameter('max', 500)
    ->getResult();
```

`BETWEEN` includes both boundaries.

### 4.10 LIKE

```
SELECT u
FROM App\Entity\User u
WHERE u.name LIKE :name
```

```
$users = $this->em->createQuery($dql)
    ->setParameter('name', '%john%')
    ->getResult();
```

Common wildcard patterns:

| Pattern  | Meaning                                |
| -------- | -------------------------------------- |
| `John%`  | Starts with John                       |
| `%John`  | Ends with John                         |
| `%John%` | Contains John                          |
| `J_hn`   | Matches one character between J and hn |

Case sensitivity depends on the database and its collation.

### 4.11 IS NULL

```
SELECT u
FROM App\Entity\User u
WHERE u.age IS NULL
```

### 4.12 IS NOT NULL

```
SELECT u
FROM App\Entity\User u
WHERE u.age IS NOT NULL
```

### 4.13 NOT

```
SELECT u
FROM App\Entity\User u
WHERE NOT (u.active = true)
```

## 5. ORDER BY

### Ascending order

```
SELECT u
FROM App\Entity\User u
ORDER BY u.name ASC
```

### Descending order

```
SELECT u
FROM App\Entity\User u
ORDER BY u.createdAt DESC
```

### Multiple sorting properties

```
SELECT u
FROM App\Entity\User u
ORDER BY u.active DESC, u.name ASC
```

QueryBuilder:

```
$users = $this->em->createQueryBuilder()
    ->select('u')
    ->from(User::class, 'u')
    ->orderBy('u.active', 'DESC')
    ->addOrderBy('u.name', 'ASC')
    ->getQuery()
    ->getResult();
```

## 6. LIMIT, OFFSET and pagination

Unlike SQL, standard DQL does not support writing `LIMIT` or `OFFSET` directly in the query string.

Instead, use `setMaxResults()` and `setFirstResult()`.

### Limit results

```
$users = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u ORDER BY u.id ASC'
)
->setMaxResults(10)
->getResult();
```

### Offset results

```
$users = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u ORDER BY u.id ASC'
)
->setFirstResult(20)
->setMaxResults(10)
->getResult();
```

This retrieves up to 10 users starting at offset 20.

### Dynamic pagination

```
$page = 3;
$limit = 20;

$offset = ($page - 1) * $limit;

$query = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u ORDER BY u.id ASC'
);

$users = $query
    ->setFirstResult($offset)
    ->setMaxResults($limit)
    ->getResult();
```

For pagination involving collection fetch joins, use Doctrine's `Paginator` rather than relying on a simple limit.

## 7. JOIN queries

DQL joins usually operate on mapped entity associations rather than database foreign-key columns.

Suppose an `Order` entity contains:

```
#[ORM\ManyToOne(targetEntity: User::class)]
private User $user;
```

### 7.1 INNER JOIN

```
SELECT o
FROM App\Entity\Order o
INNER JOIN o.user u
WHERE u.active = true
```

Explanation: Retrieves orders belonging to active users.

Only orders with a matching user satisfying the conditions are returned.

QueryBuilder:

```
$orders = $this->em->createQueryBuilder()
    ->select('o')
    ->from(Order::class, 'o')
    ->innerJoin('o.user', 'u')
    ->where('u.active = :active')
    ->setParameter('active', true)
    ->getQuery()
    ->getResult();
```

### 7.2 LEFT JOIN

```
SELECT u
FROM App\Entity\User u
LEFT JOIN u.orders o
```

Explanation: Retrieves users even when they have no orders.

### 7.3 LEFT JOIN with conditions

```
SELECT u
FROM App\Entity\User u
LEFT JOIN u.orders o WITH o.status = :status
```

The `WITH` condition restricts the joined orders while preserving users with no matching orders.

Compare:

```
SELECT u
FROM App\Entity\User u
LEFT JOIN u.orders o
WHERE o.status = :status
```

This `WHERE` condition filters out users without a matching order.

### 7.4 Multiple JOINs

```
SELECT o
FROM App\Entity\Order o
JOIN o.user u
JOIN o.items i
JOIN i.product p
WHERE p.category = :category
```

Explanation: Retrieves orders containing products from a particular category.

### 7.5 Fetch JOIN

```
SELECT o, u
FROM App\Entity\Order o
JOIN o.user u
```

Selecting the joined entity `u` causes Doctrine to hydrate the associated user together with the order.

This can avoid additional lazy-loading queries.

By contrast:

```
SELECT o
FROM App\Entity\Order o
JOIN o.user u
```

The join is used for querying, but does not necessarily initialize the associated user.

### 7.6 Joining unrelated entities

Doctrine also supports joins using an entity class directly:

```
SELECT u, p
FROM App\Entity\User u
JOIN App\Entity\Product p WITH p.category = :category
```

However, this is not an association join. It can produce many combinations of users and products, so it should be used carefully.

DQL supports `INNER JOIN` and `LEFT JOIN`, but not portable `RIGHT JOIN` or `FULL OUTER JOIN` syntax.

## 8. Aggregate functions

Aggregate functions calculate values across multiple records.

### COUNT

```
SELECT COUNT(u.id)
FROM App\Entity\User u
```

```
$count = $this->em->createQuery(
    'SELECT COUNT(u.id) FROM App\Entity\User u'
)->getSingleScalarResult();
```

### SUM

```
SELECT SUM(o.total)
FROM App\Entity\Order o
```

### AVG

```
SELECT AVG(p.price)
FROM App\Entity\Product p
```

### MIN

```
SELECT MIN(p.price)
FROM App\Entity\Product p
```

### MAX

```
SELECT MAX(p.price)
FROM App\Entity\Product p
```

### COUNT DISTINCT

```
SELECT COUNT(DISTINCT o.user)
FROM App\Entity\Order o
```

This counts distinct users who have placed orders.

Aggregate results may be returned as strings depending on the database type and driver.

## 9. GROUP BY

`GROUP BY` groups records so aggregate calculations can be performed for each group.

### Count orders by status

```
SELECT
    o.status,
    COUNT(o.id) AS totalOrders
FROM App\Entity\Order o
GROUP BY o.status
```

Example result:

```
[
    [
        'status' => 'pending',
        'totalOrders' => 15
    ],
    [
        'status' => 'completed',
        'totalOrders' => 42
    ]
]
```

### Total spending per user

```
SELECT
    u.id,
    u.name,
    SUM(o.total) AS totalSpent
FROM App\Entity\User u
JOIN u.orders o
GROUP BY u.id, u.name
```

### Multiple grouping properties

```
SELECT
    o.status,
    u.active,
    COUNT(o.id) AS total
FROM App\Entity\Order o
JOIN o.user u
GROUP BY o.status, u.active
```

When using MySQL with `ONLY_FULL_GROUP_BY`, every selected nonaggregated expression must be compatible with the grouping rules.

## 10. HAVING

`HAVING` filters groups after aggregation.

### Users with more than five orders

```
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS orderCount
FROM App\Entity\User u
JOIN u.orders o
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
```

### Users spending more than €1,000

```
SELECT
    u.id,
    SUM(o.total) AS totalSpent
FROM App\Entity\User u
JOIN u.orders o
GROUP BY u.id
HAVING SUM(o.total) > :minimum
```

### WHERE vs HAVING

| WHERE                                      | HAVING                       |
| ------------------------------------------ | ---------------------------- |
| Filters individual records                 | Filters aggregated groups    |
| Applied before grouping                    | Applied after grouping       |
| Typically uses regular property conditions | Can use aggregate conditions |

You can combine them:

```
SELECT
    o.status,
    COUNT(o.id) AS total
FROM App\Entity\Order o
WHERE o.total > 100
GROUP BY o.status
HAVING COUNT(o.id) >= 5
```

This first considers orders over 100, then returns only statuses having at least five such orders.

## 11. Subqueries

DQL supports subqueries inside expressions such as `WHERE`, `HAVING`, and `SELECT`.

### 11.1 Subquery using IN

Find users who have placed at least one order.

```
SELECT u
FROM App\Entity\User u
WHERE u.id IN (
    SELECT IDENTITY(o.user)
    FROM App\Entity\Order o
)
```

`IDENTITY(o.user)` retrieves the foreign-key identifier of the associated user.

### 11.2 Subquery using EXISTS

```
SELECT u
FROM App\Entity\User u
WHERE EXISTS (
    SELECT o.id
    FROM App\Entity\Order o
    WHERE o.user = u
)
```

Explanation: This is a correlated subquery. The inner query references `u` from the outer query.

It returns users for whom at least one matching order exists.

### 11.3 NOT EXISTS

Find users who have never placed an order.

```
SELECT u
FROM App\Entity\User u
WHERE NOT EXISTS (
    SELECT o.id
    FROM App\Entity\Order o
    WHERE o.user = u
)
```

### 11.4 Subquery with an aggregate

Find products priced above the average product price.

```
SELECT p
FROM App\Entity\Product p
WHERE p.price > (
    SELECT AVG(p2.price)
    FROM App\Entity\Product p2
)
```

### 11.5 Correlated subquery in SELECT

```
SELECT
    u.id,
    u.name,
    (
        SELECT COUNT(o.id)
        FROM App\Entity\Order o
        WHERE o.user = u
    ) AS orderCount
FROM App\Entity\User u
```

This returns each user's ID, name, and number of orders.

### 11.6 Subquery with QueryBuilder

```
$subQb = $this->em->createQueryBuilder()
    ->select('o.id')
    ->from(Order::class, 'o')
    ->where('o.user = u');

$qb = $this->em->createQueryBuilder();

$users = $qb
    ->select('u')
    ->from(User::class, 'u')
    ->where(
        $qb->expr()->exists($subQb->getDQL())
    )
    ->getQuery()
    ->getResult();
```

DQL does not generally support subqueries as derived tables in `FROM` or `JOIN`, unlike SQL.

## 12. UPDATE queries

DQL supports bulk updates without loading each entity.

### 12.1 Update one property

```
UPDATE App\Entity\User u
SET u.active = false
WHERE u.id = :id
```

PHP:

```
$affectedRows = $this->em->createQuery(
    'UPDATE App\Entity\User u
     SET u.active = :active
     WHERE u.id = :id'
)
->setParameter('active', false)
->setParameter('id', 10)
->execute();
```

`execute()` returns the number of affected rows.

### 12.2 Update multiple properties

```
UPDATE App\Entity\User u
SET
    u.name = :name,
    u.email = :email
WHERE u.id = :id
```

### 12.3 Update using arithmetic

Increase all product prices by 10%.

```
UPDATE App\Entity\Product p
SET p.price = p.price * 1.10
```

### 12.4 Update using conditions

```
UPDATE App\Entity\Product p
SET p.stock = 0
WHERE p.stock < 0
```

### 12.5 Update using a subquery

```
UPDATE App\Entity\User u
SET u.active = false
WHERE u.id NOT IN (
    SELECT IDENTITY(o.user)
    FROM App\Entity\Order o
)
```

This deactivates users without orders.

### Important: Bulk DQL updates bypass normal entity management

DQL `UPDATE` queries:

- Do not synchronize already-loaded entity objects.
- Do not trigger normal entity lifecycle callbacks.
- Do not automatically increment Doctrine optimistic-lock version fields.
- Do not automatically apply application-level entity validation.

For ordinary updates, use the EntityManager:

```
$user = $this->em->find(User::class, 10);

if ($user !== null) {
    $user->setActive(false);

    $this->em->flush();
}
```

This approach uses Doctrine's UnitOfWork and change tracking.

Use bulk DQL updates when you need to modify many records efficiently and understand the synchronization implications.

## 13. DELETE queries

### 13.1 Delete by ID

```
DELETE FROM App\Entity\User u
WHERE u.id = :id
```

PHP:

```
$affectedRows = $this->em->createQuery(
    'DELETE FROM App\Entity\User u WHERE u.id = :id'
)
->setParameter('id', 10)
->execute();
```

### 13.2 Delete using multiple conditions

```
DELETE FROM App\Entity\User u
WHERE u.active = false
AND u.age < 18
```

### 13.3 Delete using a date

```
$cutoff = new \DateTimeImmutable('-2 years');

$affectedRows = $this->em->createQuery(
    'DELETE FROM App\Entity\Order o
     WHERE o.createdAt < :cutoff'
)
->setParameter('cutoff', $cutoff)
->execute();
```

### 13.4 Delete using a subquery

```
DELETE FROM App\Entity\User u
WHERE NOT EXISTS (
    SELECT o.id
    FROM App\Entity\Order o
    WHERE o.user = u
)
```

Important: Bulk DQL deletes bypass ORM cascades and lifecycle events. Database foreign-key constraints and database-level cascading rules still apply.

For ordinary entity deletion:

```
$user = $this->em->find(User::class, 10);

if ($user !== null) {
    $this->em->remove($user);
    $this->em->flush();
}
```

## 14. INSERT queries

DQL does not support `INSERT` statements.

There are two standard alternatives.

### 14.1 Insert using EntityManager

```
$user = new User();

$user->setName('John');
$user->setEmail('john@example.com');
$user->setActive(true);

$this->em->persist($user);
$this->em->flush();
```

Explanation:

- `persist()` schedules the entity for insertion.
- `flush()` executes the required database operations.

### 14.2 Insert using DBAL

For direct SQL inserts:

```
$conn = $this->em->getConnection();

$conn->insert('users', [
    'name' => 'John',
    'email' => 'john@example.com',
    'active' => 1,
]);
```

DBAL operates on database tables and columns rather than entity mappings.

## 15. Working with relationships

Doctrine provides special DQL expressions for associations.

### 15.1 MEMBER OF

Find users who have a particular order in their orders collection.

```
SELECT u
FROM App\Entity\User u
WHERE :order MEMBER OF u.orders
```

PHP:

```
$users = $this->em->createQuery(
    'SELECT u
     FROM App\Entity\User u
     WHERE :order MEMBER OF u.orders'
)
->setParameter('order', $orderEntity)
->getResult();
```

### 15.2 IS EMPTY

Find users without orders.

```
SELECT u
FROM App\Entity\User u
WHERE u.orders IS EMPTY
```

### 15.3 IS NOT EMPTY

```
SELECT u
FROM App\Entity\User u
WHERE u.orders IS NOT EMPTY
```

### 15.4 SIZE

Find users with more than five orders.

```
SELECT u
FROM App\Entity\User u
WHERE SIZE(u.orders) > 5
```

`SIZE()` counts elements in a mapped collection.

For large datasets, consider a join with `GROUP BY` and `HAVING` or an `EXISTS` subquery, depending on the query and indexes.

### 15.5 IDENTITY

Retrieve the ID of an associated entity.

```
SELECT
    o.id,
    IDENTITY(o.user) AS userId
FROM App\Entity\Order o
```

This is useful when you need only a foreign-key value without hydrating the associated entity.

## 16. CASE expressions

DQL supports conditional expressions using `CASE`.

### 16.1 Simple CASE

```
SELECT
    o.id,
    CASE o.status
        WHEN 'pending' THEN 'Waiting'
        WHEN 'completed' THEN 'Finished'
        ELSE 'Unknown'
    END AS statusLabel
FROM App\Entity\Order o
```

### 16.2 Searched CASE

```
SELECT
    p.name,
    p.price,
    CASE
        WHEN p.price >= 1000 THEN 'Expensive'
        WHEN p.price >= 100 THEN 'Medium'
        ELSE 'Cheap'
    END AS priceCategory
FROM App\Entity\Product p
```

### 16.3 Conditional aggregation

Count active and inactive users separately.

```
SELECT
    SUM(
        CASE WHEN u.active = true THEN 1 ELSE 0 END
    ) AS activeUsers,
    SUM(
        CASE WHEN u.active = false THEN 1 ELSE 0 END
    ) AS inactiveUsers
FROM App\Entity\User u
```

This can be useful for dashboards and reports.

## 17. DQL functions

Doctrine provides several built-in functions.

### String functions

| Function      | Purpose                   | Example                          |
| ------------- | ------------------------- | -------------------------------- |
| `CONCAT()`    | Concatenate strings       | `CONCAT(u.name, ' - ', u.email)` |
| `SUBSTRING()` | Extract part of a string  | `SUBSTRING(u.name, 1, 3)`        |
| `LENGTH()`    | String length             | `LENGTH(u.name)`                 |
| `LOWER()`     | Convert to lowercase      | `LOWER(u.name)`                  |
| `UPPER()`     | Convert to uppercase      | `UPPER(u.name)`                  |
| `TRIM()`      | Remove surrounding spaces | `TRIM(u.name)`                   |
| `LOCATE()`    | Find a substring          | `LOCATE('John', u.name)`         |

Example:

```
SELECT u
FROM App\Entity\User u
WHERE LOWER(u.name) LIKE :search
```

### Numeric functions

| Function | Purpose         |
| -------- | --------------- |
| `ABS()`  | Absolute value  |
| `SQRT()` | Square root     |
| `MOD()`  | Modulo          |
| `SIZE()` | Collection size |

Example:

```
SELECT p
FROM App\Entity\Product p
WHERE MOD(p.id, 2) = 0
```

This selects products with even IDs.

### Date functions

Common built-in functions include:

| Function              | Purpose              |
| --------------------- | -------------------- |
| `CURRENT_DATE()`      | Current date         |
| `CURRENT_TIME()`      | Current time         |
| `CURRENT_TIMESTAMP()` | Current timestamp    |
| `DATE_ADD()`          | Add an interval      |
| `DATE_SUB()`          | Subtract an interval |
| `DATE_DIFF()`         | Difference in days   |

Example:

```
SELECT o
FROM App\Entity\Order o
WHERE o.createdAt < DATE_SUB(CURRENT_DATE(), 30, 'day')
```

For portable application code, it is often simpler to calculate the date in PHP:

```
$cutoff = new \DateTimeImmutable('-30 days');

$orders = $this->em->createQuery(
    'SELECT o
     FROM App\Entity\Order o
     WHERE o.createdAt < :cutoff'
)
->setParameter('cutoff', $cutoff)
->getResult();
```

### COALESCE

Returns the first non-null expression.

```
SELECT
    u.name,
    COALESCE(u.age, 0) AS age
FROM App\Entity\User u
```

### NULLIF

Returns `NULL` if two expressions are equal.

```
SELECT
    NULLIF(p.stock, 0)
FROM App\Entity\Product p
```

### Custom DQL functions

Some MySQL functions, such as `GROUP_CONCAT()`, `JSON_EXTRACT()`, and `DATE_FORMAT()`, are not available as standard portable DQL functions.

You can register custom DQL functions or use DBAL with native SQL.

## 18. Advanced QueryBuilder examples

QueryBuilder is particularly useful when query conditions depend on optional filters.

### 18.1 Dynamic WHERE conditions

```
public function searchUsers(
    ?string $name,
    ?bool $active,
    ?int $minimumAge
): array {
    $qb = $this->em->createQueryBuilder();

    $qb->select('u')
       ->from(User::class, 'u');

    if ($name !== null && $name !== '') {
        $qb->andWhere('u.name LIKE :name')
           ->setParameter('name', '%' . $name . '%');
    }

    if ($active !== null) {
        $qb->andWhere('u.active = :active')
           ->setParameter('active', $active);
    }

    if ($minimumAge !== null) {
        $qb->andWhere('u.age >= :minimumAge')
           ->setParameter('minimumAge', $minimumAge);
    }

    return $qb
        ->orderBy('u.name', 'ASC')
        ->getQuery()
        ->getResult();
}
```

This is a common pattern for Symfony search forms and REST APIs.

### 18.2 Complex AND/OR expressions

```
$qb = $this->em->createQueryBuilder();

$qb->select('u')
   ->from(User::class, 'u')
   ->where(
       $qb->expr()->andX(
           'u.active = :active',
           $qb->expr()->orX(
               'u.age >= :age',
               'u.name = :name'
           )
       )
   )
   ->setParameter('active', true)
   ->setParameter('age', 18)
   ->setParameter('name', 'Admin');

$users = $qb->getQuery()->getResult();
```

Equivalent DQL:

```
SELECT u
FROM App\Entity\User u
WHERE u.active = :active
AND (
    u.age >= :age
    OR u.name = :name
)
```

### 18.3 Dynamic sorting

```
$allowedSortFields = [
    'name' => 'u.name',
    'email' => 'u.email',
    'createdAt' => 'u.createdAt',
];

$sortField = $allowedSortFields[$requestedSort] ?? 'u.id';

$direction = strtoupper($requestedDirection) === 'DESC'
    ? 'DESC'
    : 'ASC';

$qb->orderBy($sortField, $direction);
```

Do not pass arbitrary user-supplied property names into `orderBy()`. DQL parameters cannot bind identifiers, so use an allowlist.

## 19. Partial objects and hydration modes

Doctrine supports different ways to hydrate query results.

### Full entity hydration

```
$users = $query->getResult();
```

Returns managed entity objects by default.

### Array hydration

```
$users = $query->getArrayResult();
```

Returns arrays rather than managed entities.

### Scalar hydration

```
$results = $query->getScalarResult();
```

Useful for reporting queries selecting individual properties and aggregates.

### Partial object selection

```
SELECT PARTIAL u.{id, name}
FROM App\Entity\User u
```

Partial objects can be dangerous because they contain incomplete entity state.

For read-only projections, prefer scalar selection, array hydration, or DTOs.

### Iterating over large results

```
$query = $this->em->createQuery(
    'SELECT u FROM App\Entity\User u'
);

foreach ($query->toIterable() as $user) {
    // Process each user
}
```

For large batch processing, you may also need periodic `clear()` calls to prevent the EntityManager from retaining too many managed objects.

## 20. Native SQL vs DQL

DQL does not support every SQL feature.

| Feature                               | DQL                              | Native SQL / DBAL       |
| ------------------------------------- | -------------------------------- | ----------------------- |
| SELECT                                | Yes                              | Yes                     |
| INSERT                                | No                               | Yes                     |
| UPDATE                                | Yes                              | Yes                     |
| DELETE                                | Yes                              | Yes                     |
| INNER JOIN                            | Yes                              | Yes                     |
| LEFT JOIN                             | Yes                              | Yes                     |
| RIGHT JOIN                            | No standard support              | Yes                     |
| GROUP BY / HAVING                     | Yes                              | Yes                     |
| Subqueries                            | Yes, in supported expressions    | Yes                     |
| UNION / UNION ALL                     | No standard support              | Yes                     |
| Common Table Expressions (`WITH`)     | No standard support              | Yes                     |
| Recursive CTEs                        | No standard support              | Yes                     |
| Window functions (`ROW_NUMBER`, etc.) | No standard support              | Yes                     |
| INSERT ... ON DUPLICATE KEY UPDATE    | No                               | MySQL-specific          |
| JSON functions                        | Custom extensions often required | Yes, database-dependent |
| Stored procedures                     | Not directly through DQL         | Yes                     |
| Database-specific optimizer hints     | Limited/custom                   | Yes                     |

For example, if you need a MySQL window function:

```
SELECT
    id,
    name,
    ROW_NUMBER() OVER (
        ORDER BY created_at DESC
    ) AS row_number
FROM users
```

Use DBAL:

```
$conn = $this->em->getConnection();

$results = $conn->executeQuery(
    'SELECT
        id,
        name,
        ROW_NUMBER() OVER (
            ORDER BY created_at DESC
        ) AS row_number
     FROM users'
)->fetchAllAssociative();
```

DBAL is often the better choice for complex database-specific reporting queries.

## 21. Transactions

Doctrine EntityManager supports transactions.

```
$this->em->wrapInTransaction(function () use ($user, $order) {
    $this->em->persist($user);
    $this->em->persist($order);
});
```

The transaction is committed if the callback completes successfully. Exceptions cause a rollback.

You can also use explicit transaction management:

```
$conn = $this->em->getConnection();

$conn->beginTransaction();

try {
    $this->em->persist($user);
    $this->em->flush();

    $conn->commit();
} catch (\Throwable $e) {
    $conn->rollBack();
    throw $e;
}
```

After a failed ORM flush, the EntityManager may need to be discarded or reset before further use.

## 22. Performance optimization

For applications with many queries or large tables, the following practices are important.

1. Select only required properties when full entities are unnecessary.
2. Avoid N+1 queries by using appropriate fetch joins.
3. Use pagination for large result sets.
4. Index frequently filtered database columns, including foreign keys.
5. Use bulk UPDATE and DELETE for large operations when lifecycle behavior is unnecessary.
6. Use `toIterable()` for processing large result sets incrementally.
7. Use DBAL for complex SQL or database-specific operations.
8. Inspect generated SQL when debugging slow queries.

### Inspect the generated SQL

```
$query = $this->em->createQuery(
    'SELECT u
     FROM App\Entity\User u
     WHERE u.active = :active'
);

$query->setParameter('active', true);

$sql = $query->getSQL();

dump($sql);
```

This shows the SQL Doctrine generates, though parameters are generally still represented by placeholders.

For MySQL performance analysis, run `EXPLAIN` on the generated SQL with the relevant parameter values.

## 23. Complete Symfony repository example

A practical way to organize DQL queries is inside an entity repository.

```
<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findActiveUsers(): array
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT u
                 FROM App\Entity\User u
                 WHERE u.active = true
                 ORDER BY u.name ASC'
            )
            ->getResult();
    }

    public function findByMinimumAge(int $age): array
    {
        return $this->createQueryBuilder('u')
            ->where('u.age >= :age')
            ->setParameter('age', $age)
            ->getQuery()
            ->getResult();
    }

    public function countActiveUsers(): int
    {
        return (int) $this->createQueryBuilder('u')
            ->select('COUNT(u.id)')
            ->where('u.active = true')
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function findUsersWithOrders(): array
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT u
                 FROM App\Entity\User u
                 WHERE EXISTS (
                     SELECT o.id
                     FROM App\Entity\Order o
                     WHERE o.user = u
                 )'
            )
            ->getResult();
    }

    public function deactivateUsersWithoutOrders(): int
    {
        return $this->getEntityManager()
            ->createQuery(
                'UPDATE App\Entity\User u
                 SET u.active = false
                 WHERE NOT EXISTS (
                     SELECT o.id
                     FROM App\Entity\Order o
                     WHERE o.user = u
                 )'
            )
            ->execute();
    }
}
```

Then inject the repository into a Symfony controller:

```
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/users/active', methods: ['GET'])]
    public function activeUsers(
        UserRepository $repository
    ): JsonResponse {
        $users = $repository->findActiveUsers();

        $data = array_map(
            fn (User $user) => [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'email' => $user->getEmail(),
            ],
            $users
        );

        return $this->json($data);
    }
}
```

This separates database querying from controller logic and keeps the code easier to test.

## 24. Quick reference: DQL syntax

| Query type            | Example                                          |
| --------------------- | ------------------------------------------------ |
| Select all            | `SELECT u FROM App\Entity\User u`                |
| Select properties     | `SELECT u.id, u.name FROM App\Entity\User u`     |
| Distinct              | `SELECT DISTINCT u.name FROM App\Entity\User u`  |
| Equality              | `WHERE u.id = :id`                               |
| AND                   | `WHERE u.active = true AND u.age > 18`           |
| OR                    | `WHERE u.name = :name OR u.email = :email`       |
| IN                    | `WHERE u.id IN (:ids)`                           |
| NOT IN                | `WHERE u.id NOT IN (:ids)`                       |
| BETWEEN               | `WHERE u.age BETWEEN 18 AND 65`                  |
| LIKE                  | `WHERE u.name LIKE :name`                        |
| IS NULL               | `WHERE u.age IS NULL`                            |
| ORDER BY              | `ORDER BY u.name ASC`                            |
| INNER JOIN            | `JOIN o.user u`                                  |
| LEFT JOIN             | `LEFT JOIN u.orders o`                           |
| COUNT                 | `SELECT COUNT(u.id)`                             |
| SUM                   | `SELECT SUM(o.total)`                            |
| AVG                   | `SELECT AVG(o.total)`                            |
| MIN                   | `SELECT MIN(o.total)`                            |
| MAX                   | `SELECT MAX(o.total)`                            |
| GROUP BY              | `GROUP BY o.status`                              |
| HAVING                | `HAVING COUNT(o.id) > 5`                         |
| EXISTS                | `WHERE EXISTS (SELECT ...)`                      |
| NOT EXISTS            | `WHERE NOT EXISTS (SELECT ...)`                  |
| Collection empty      | `WHERE u.orders IS EMPTY`                        |
| Collection membership | `WHERE :order MEMBER OF u.orders`                |
| UPDATE                | `UPDATE App\Entity\User u SET u.active = false`  |
| DELETE                | `DELETE FROM App\Entity\User u WHERE u.id = :id` |
| INSERT                | Not supported in DQL                             |

## 25. When should you use DQL, QueryBuilder, or DBAL?

DQL — Best for fixed, entity-oriented queries

Use when the query is known in advance and you want readable SQL-like syntax with Doctrine entity hydration.

QueryBuilder — Best for dynamic queries

Use for filtering, searching, sorting, and building conditions based on optional request parameters.

DBAL — Best for complex or database-specific SQL

Use for MySQL-specific functionality, CTEs, window functions, bulk inserts, and reporting queries that are awkward or unsupported in DQL.

For a new Symfony 8 application, I recommend Doctrine repositories with QueryBuilder for dynamic entity queries, DQL for fixed queries, and DBAL when native SQL is more appropriate.

### Official documentation

- [Doctrine ORM — DQL reference](https://www.doctrine-project.org/projects/doctrine-orm/en/current/reference/dql-doctrine-query-language.html?utm_source=chatgpt.com)
- [Doctrine ORM — QueryBuilder](https://www.doctrine-project.org/projects/doctrine-orm/en/current/reference/query-builder.html?utm_source=chatgpt.com)
- [Doctrine DBAL — Data retrieval and manipulation](https://www.doctrine-project.org/projects/doctrine-dbal/en/current/reference/data-retrieval-and-manipulation.html?utm_source=chatgpt.com)
- [Symfony — Databases and Doctrine ORM](https://symfony.com/doc/current/doctrine.html?utm_source=chatgpt.com)

These references provide the exact supported syntax for your installed Doctrine ORM version, including features that may differ between major releases.
