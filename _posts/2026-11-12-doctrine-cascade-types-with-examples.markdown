---
layout: post
title:  "Doctrine ORM cascade types explained with examples"
date:   2026-11-12 07:46:56
categories: PHP
description: Doctrine ORM cascade types explained with examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: In Doctrine ORM, cascade operations determine which operations performed on one entity are automatically propagated to its associated entities.
---
In Doctrine ORM, cascade operations determine which operations performed on one entity are automatically propagated to its associated entities.

For example, imagine a Symfony 8 application with two entities:

- `User` — represents a user.
- `Post` — represents a blog post belonging to a user.

When you save, delete, refresh, or detach a `User`, Doctrine can automatically apply certain operations to the associated `Post` entities, depending on the cascade configuration.

## 1. All Doctrine cascade types

Doctrine ORM supports five individual cascade operations, plus `all` as a shortcut.

| Cascade type | Description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `persist`    | Automatically persists associated entities.                                                                      |
| `remove`     | Automatically removes associated entities.                                                                       |
| `refresh`    | Reloads associated entities from the database.                                                                   |
| `detach`     | Detaches associated entities from Doctrine's EntityManager.                                                      |
| `merge`      | Merges the state of detached associated entities. Legacy operation; not supported in Doctrine ORM 3.x and newer. |
| `all`        | Enables every cascade operation supported by the installed Doctrine ORM version.                                 |

Important: Cascades are defined on entity relationships such as `OneToMany`, `ManyToOne`, `OneToOne`, and `ManyToMany`.

They are directional: a cascade defined on `User::$posts` propagates operations from `User` to its posts, not automatically in the reverse direction.

The examples below use PHP 8 attributes, Symfony-style entities, and modern Doctrine ORM conventions.

## 2. Basic entity relationship

We'll use the following entities for the examples.

User.php

```

<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private string $name;

    #[ORM\OneToMany(
        targetEntity: Post::class,
        mappedBy: 'user',
        cascade: ['persist']
    )]
    private Collection $posts;

    public function __construct()
    {
        $this->posts = new ArrayCollection();
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function addPost(Post $post): void
    {
        if (!$this->posts->contains($post)) {
            $this->posts->add($post);
            $post->setUser($this);
        }
    }

    public function getPosts(): Collection
    {
        return $this->posts;
    }
}

```

Post.php

```

<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\ManyToOne(
        targetEntity: User::class,
        inversedBy: 'posts'
    )]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setUser(?User $user): void
    {
        $this->user = $user;
    }
}

```

Notice that `Post::$user` is the owning side of the relationship. Setting it correctly is necessary for Doctrine to persist the foreign key.

## 3. Cascade `persist`

Commonly recommended

Purpose: Automatically persist new associated entities when their parent is persisted, or when Doctrine discovers new entities through a managed relationship during `flush()`.

Configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['persist']
)]
private Collection $posts;
```

### Example

```

$user = new User();
$user->setName('John');

$post1 = new Post();
$post1->setTitle('My first post');

$post2 = new Post();
$post2->setTitle('My second post');

$user->addPost($post1);
$user->addPost($post2);

$entityManager->persist($user);
$entityManager->flush();

```

Doctrine automatically inserts all three entities into the database.

Cascade persist execution

User: John

persist($user)

Post 1

INSERT

Post 2

INSERT

Without `cascade: ['persist']`, you would need:

```
$entityManager->persist($user);
$entityManager->persist($post1);
$entityManager->persist($post2);
$entityManager->flush();
```

Otherwise, Doctrine generally throws an exception when it encounters new entities through a relationship that does not cascade persistence.

### Important details

- `persist()` does not immediately execute SQL. The actual insert happens during `flush()`.
- It also works for new children added to an already managed parent.
- You don't need to call `persist()` again when updating an already managed entity.
- Cascading persistence does not automatically establish the owning-side relationship. Your entity methods must maintain it.

Recommended use: Parent-child relationships where children are normally created together with their parent, such as an `Order` and its `OrderItem` entities.

## 4. Cascade `remove`

Use with care

Purpose: Automatically delete associated entities when the parent entity is removed.

Configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['remove']
)]
private Collection $posts;
```

### Example

Assume the database contains:

| Entity | Records                 |
| ------ | ----------------------- |
| User   | John (ID 1)             |
| Post   | First post (User ID 1)  |
| Post   | Second post (User ID 1) |

Execute:

```
$user = $entityManager->find(User::class, 1);

$entityManager->remove($user);
$entityManager->flush();
```

Doctrine schedules the user and both associated posts for deletion.

Cascade remove execution

User: John

remove($user)

Post 1

DELETE

Post 2

DELETE

### Important details

- Deletes happen during `flush()`.
- Doctrine can load associated entities into memory before deleting them.
- Doctrine lifecycle events such as `preRemove` and `postRemove` can run for each removed entity.
- Cascade remove is recursive across relationships configured to cascade removal.
- Removing one post from the `$posts` collection does not automatically delete that post from the database.

Recommended use: Relationships where children must not survive their parent, such as `Invoice` and `InvoiceLine`.

Avoid `cascade: ['remove']` on relationships to shared entities such as `Post → Category`, because deleting a post could also delete a category used by other posts.

## 5. Cascade `refresh`

Purpose: Reload associated entities from the database when the parent entity is refreshed, discarding their unflushed in-memory changes.

Configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['refresh']
)]
private Collection $posts;
```

### Example

Suppose the database contains:

```
User.name  = "John"
Post.title = "Original title"
```

You modify both entities:

```
$user = $entityManager->find(User::class, 1);

$post = $user->getPosts()->first();

$user->setName('Michael');
$post->setTitle('Modified title');
```

At this point, these changes exist only in memory.

Now execute:

```
$entityManager->refresh($user);
```

The state is restored from the database:

```
User.name  = "John"
Post.title = "Original title"
```

Without `cascade: ['refresh']`, refreshing the user would not automatically refresh its posts.

### Important details

- `refresh()` overwrites unflushed modifications on the refreshed entities.
- It does not perform a database rollback.
- It can trigger additional SQL queries to reload associated entities.
- It is useful when the database has been changed externally or when you want to discard local changes.

Recommended use: Applications that need to reload authoritative database values for an entity and its dependent objects.

## 6. Cascade `detach`

Purpose: Detach associated entities when the parent is detached from the EntityManager.

A detached entity is no longer tracked for automatic persistence of its changes.

Configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['detach']
)]
private Collection $posts;
```

### Example

```
$user = $entityManager->find(User::class, 1);

$post = $user->getPosts()->first();

// Detach the user and its posts
$entityManager->detach($user);

// These changes are not automatically tracked
$user->setName('Michael');
$post->setTitle('Changed after detach');

$entityManager->flush();
```

The modifications are not saved because both objects have been detached.

Without cascade detach, the posts would remain managed if they had already been loaded and managed by the EntityManager.

### Important details

- Detaching does not delete anything from the database.
- The PHP objects still exist.
- Changes to detached objects are not automatically detected.
- Calling `clear()` detaches all managed entities, without requiring cascade detach.
- In modern Doctrine ORM, `detach()` is a relatively uncommon operation.

Recommended use: Specialized workflows where you need to stop tracking an entire object graph, such as certain long-running processing operations.

## 7. Cascade `merge` — legacy Doctrine ORM 2.x

Legacy only

Purpose: Propagate merging from a detached parent to associated detached entities.

This operation is available in older Doctrine ORM 2.x versions but was removed in Doctrine ORM 3. Do not use it in a new Symfony project running Doctrine ORM 3.x.

Legacy configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['merge']
)]
private Collection $posts;
```

### Example (Doctrine ORM 2.x only)

Suppose you have a detached user and its associated posts.

```
// Legacy Doctrine ORM 2.x code

$managedUser = $entityManager->merge($detachedUser);

$entityManager->flush();
```

With cascade merge, Doctrine also merges the associated post entities.

A crucial distinction is that `merge()` returns a managed entity. The original detached object does not become managed simply because `merge()` was called.

### Modern replacement

In Doctrine ORM 3.x, load the managed entity and copy the required changes explicitly:

```
$user = $entityManager->find(
    User::class,
    $userId
);

$user->setName($newName);

// Load and update the relevant Post entities
// explicitly as needed.

$entityManager->flush();
```

This approach is more predictable, especially when handling entity graphs coming from forms, APIs, or serialized objects.

## 8. Cascade `all`

Purpose: Enable every supported cascade operation.

Configuration:

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['all']
)]
private Collection $posts;
```

In Doctrine ORM 3.x, this is effectively equivalent to:

```
cascade: [
    'persist',
    'remove',
    'refresh',
    'detach'
]
```

In older Doctrine ORM 2.x versions, it also includes `merge`.

### Example

```
$user = new User();
$user->setName('John');

$post = new Post();
$post->setTitle('My first post');

$user->addPost($post);

// Cascade persist
$entityManager->persist($user);
$entityManager->flush();

// Cascade refresh
$entityManager->refresh($user);

// Cascade remove
$entityManager->remove($user);
$entityManager->flush();
```

This works, but enabling every cascade type is rarely necessary.

Recommendation: Prefer explicit cascades such as:

```
cascade: ['persist', 'remove']
```

This makes the intended lifecycle behavior clearer and reduces the risk of unexpected operations.

## 9. `orphanRemoval: true` — an important related feature

Although `orphanRemoval` is not technically a cascade type, it is closely related to `cascade: ['remove']`.

The difference is very important.

- `cascade: ['remove']` deletes child entities when the parent is deleted.
- `orphanRemoval: true` deletes a child entity when it is removed from the parent's relationship, even if the parent continues to exist.

### Example

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['persist', 'remove'],
    orphanRemoval: true
)]
private Collection $posts;
```

Assume John has three posts.

```
$user = $entityManager->find(User::class, 1);

$post = $user->getPosts()->first();

$user->getPosts()->removeElement($post);

$entityManager->flush();
```

With `orphanRemoval: true`, Doctrine deletes the removed post from the database.

Without `orphanRemoval: true`, Doctrine does not automatically delete the post. To disassociate it correctly, you must update the owning side (`Post::$user`), and the foreign key must allow null if you intend to keep the post without a user.

### Comparison

| Operation                    | `cascade: ['remove']`         | `orphanRemoval: true`            |
| ---------------------------- | ----------------------------- | -------------------------------- |
| Delete parent                | Deletes children              | Deletes privately owned children |
| Remove child from collection | Does not delete child         | Deletes child                    |
| Delete child directly        | Works independently           | Works independently              |
| Parent remains in database   | Yes, when only disassociating | Yes, when only disassociating    |

Use `orphanRemoval` only for entities exclusively owned by their parent. Doctrine assumes an orphan is no longer needed and does not check whether other entities still reference it.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.doctrine-project.org\&sz=32)

Doctrine Object Relational Mapper (ORM)+1



## 10. `cascade: ['remove']` vs `onDelete: 'CASCADE'`

These are frequently confused.

### Doctrine-level cascade

```
#[ORM\OneToMany(
    targetEntity: Post::class,
    mappedBy: 'user',
    cascade: ['remove']
)]
private Collection $posts;
```

Doctrine manages the deletion of associated entities through the EntityManager.

### Database-level cascade

```
#[ORM\ManyToOne(
    targetEntity: User::class,
    inversedBy: 'posts'
)]
#[ORM\JoinColumn(
    nullable: false,
    onDelete: 'CASCADE'
)]
private ?User $user = null;
```

This configures the database foreign key to delete posts automatically when the referenced user row is deleted.

| Feature                         | Doctrine `remove`  | SQL `ON DELETE CASCADE`            |
| ------------------------------- | ------------------ | ---------------------------------- |
| Execution                       | Doctrine ORM       | Database                           |
| Loads related entities          | May load them      | No                                 |
| Doctrine lifecycle events       | Yes                | No, for database-cascaded children |
| Performance for many children   | Potentially slower | Usually faster                     |
| Works with direct SQL DELETE    | No                 | Yes                                |
| Requires foreign key constraint | No                 | Yes                                |

For large collections, database-level cascading is often more efficient. If you configure both, Doctrine may explicitly remove children before the database gets an opportunity to cascade their deletion.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.doctrine-project.org\&sz=32)

Doctrine Object Relational Mapper (ORM)+1



## 11. Which cascades should you use?

For a typical Symfony application, I would recommend the following:

| Relationship           | Recommended configuration                                            |
| ---------------------- | -------------------------------------------------------------------- |
| User → Posts           | `['persist']`, optionally `remove`                                   |
| Order → OrderItems     | `['persist', 'remove']` + `orphanRemoval: true`                      |
| Invoice → InvoiceLines | `['persist', 'remove']` + `orphanRemoval: true`                      |
| Post → Category        | No cascade                                                           |
| Post → Tags            | Usually no cascade                                                   |
| User → Profile         | `['persist', 'remove']` + `orphanRemoval: true` if exclusively owned |
| Product → Manufacturer | No cascade                                                           |

For example, a good configuration for an `Order` entity would be:

```

#[ORM\OneToMany(
    targetEntity: OrderItem::class,
    mappedBy: 'order',
    cascade: ['persist', 'remove'],
    orphanRemoval: true
)]
private Collection $items;

```

This allows you to create an order with its items, delete an order with all its items, and delete individual items by removing them from the collection.

## Final recommendations

For most modern Symfony and Doctrine ORM projects:

1. Use `cascade: ['persist']` when creating child entities through a parent.
2. Add `remove` when child entities must be deleted together with their parent.
3. Add `orphanRemoval: true` when removing a child from a relationship should delete it permanently.
4. Prefer `onDelete: 'CASCADE'` for large child collections when database-level deletion is appropriate.
5. Avoid `cascade: ['all']` unless every supported operation is genuinely needed.
6. Do not use `merge` in Doctrine ORM 3.x or newer.

Also remember that cascades apply to EntityManager operations, not arbitrary DQL bulk `DELETE` or `UPDATE` queries. Database foreign-key cascades are a separate mechanism.

Official references: [Doctrine ORM — Working with Associations](https://www.doctrine-project.org/projects/doctrine-orm/en/stable/reference/working-with-associations.html?utm_source=chatgpt.com) and [Doctrine ORM — Association Mapping](https://www.doctrine-project.org/projects/doctrine-orm/en/stable/reference/association-mapping.html?utm_source=chatgpt.com).
