---
layout: post
title:  "CodeIgniter 4 Spark Commands - Complete Reference Guide"
date:   2026-10-28 07:46:56
categories: PHP
description: CodeIgniter 4 Spark Commands - Complete Reference Guide
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Spark is the command-line interface (CLI) for CodeIgniter 4. It allows you to generate controllers, models, migrations, and other files, manage databases, run development servers, inspect routes, clear caches, and perform maintenance tasks.
---
**Spark** is the command-line interface (CLI) for CodeIgniter 4. It allows you to generate controllers, models, migrations, and other files, manage databases, run development servers, inspect routes, clear caches, and perform maintenance tasks.

All commands should be executed from the root directory of your CodeIgniter 4 project, where the `spark` file is located.

```bash
php spark <command> [arguments] [options]
```

For example:

```bash
php spark make:controller Users
php spark migrate
php spark routes
```

The commands available depend on your CodeIgniter version and installed packages. Custom commands may also appear.

## 1. General and development commands

| Command | Description | Example |
|---|---|---|
| `list` | Lists all available Spark commands | `php spark list` |
| `help` | Displays help for a specific command | `php spark help migrate` |
| `serve` | Starts the built-in PHP development server | `php spark serve` |
| `routes` | Displays registered application routes | `php spark routes` |
| `env` | Changes the application's environment setting | `php spark env development` |
| `namespaces` | Displays registered PSR-4 namespaces | `php spark namespaces` |

### Examples

Start the development server on a custom port:

```bash
php spark serve --port 8080
```

Set the application environment to development:

```bash
php spark env development
```

Show all registered routes:

```bash
php spark routes
```

Show the help for a command:

```bash
php spark help make:model
```

**Note:** The `serve` command is intended for development, not production hosting.

## 2. Code generators (`make:*`)

These commands automatically generate PHP classes and boilerplate files.

| Command | What it does | Example |
|---|---|---|
| `make:controller` | Creates a controller | `php spark make:controller Users` |
| `make:model` | Creates a database model | `php spark make:model UserModel` |
| `make:entity` | Creates an entity class | `php spark make:entity User` |
| `make:migration` | Creates a database migration | `php spark make:migration CreateUsersTable` |
| `make:seeder` | Creates a database seeder | `php spark make:seeder UserSeeder` |
| `make:filter` | Creates a request/response filter | `php spark make:filter AuthFilter` |
| `make:config` | Creates a configuration class | `php spark make:config Payment` |
| `make:command` | Creates a custom Spark command | `php spark make:command Cleanup` |
| `make:validation` | Creates a validation configuration class | `php spark make:validation UserRules` |
| `make:cell` | Creates a view cell and its view | `php spark make:cell UserProfile` |
| `make:transformer` | Creates an API transformer | `php spark make:transformer UserTransformer` |
| `make:test` | Creates a PHPUnit test skeleton | `php spark make:test UserTest` |
| `make:scaffold` | Generates several related application files | `php spark make:scaffold Product` |

Generator commands and options are documented in the official [CodeIgniter CLI Generators guide](https://codeigniter.com/user_guide/cli/cli_generators.html). Some commands require newer CodeIgniter 4 versions.

### Useful generator options

Create a REST API controller:

```bash
php spark make:controller Api/Users --restful controller
```

Create a model associated with a particular database table:

```bash
php spark make:model UserModel --table users
```

Create a model returning entities:

```bash
php spark make:model UserModel --table users --return entity
```

Create a model in another namespace:

```bash
php spark make:model Product --namespace Acme\Shop
```

Create a custom Spark command named `app:cleanup`:

```bash
php spark make:command Cleanup --command app:cleanup
```

Overwrite an existing generated file:

```bash
php spark make:controller Users --force
```

Generate a basic CRUD-related scaffold:

```bash
php spark make:scaffold Product
```

This generates a controller, model, migration, and seeder skeleton. It does **not** automatically implement a fully functioning CRUD interface.

## 3. Database and migration commands

| Command | What it does | Example |
|---|---|---|
| `db:create` | Creates a database | `php spark db:create myapp` |
| `db:seed` | Runs a database seeder | `php spark db:seed UserSeeder` |
| `db:table` | Displays information about a database table | `php spark db:table users` |
| `migrate` | Executes pending migrations | `php spark migrate` |
| `migrate:status` | Shows which migrations have been executed | `php spark migrate:status` |
| `migrate:rollback` | Rolls back migrations | `php spark migrate:rollback` |
| `migrate:refresh` | Rolls back and reruns migrations | `php spark migrate:refresh` |

### Examples

Create a new database:

```bash
php spark db:create myapp
```

Generate a migration:

```bash
php spark make:migration CreateProductsTable
```

Execute pending migrations:

```bash
php spark migrate
```

Execute migrations for a particular database group:

```bash
php spark migrate -g tests
```

Execute migrations across all namespaces:

```bash
php spark migrate --all
```

Check migration status:

```bash
php spark migrate:status
```

Roll back migrations:

```bash
php spark migrate:rollback
```

Refresh migrations:

```bash
php spark migrate:refresh
```

Populate a database with seed data:

```bash
php spark db:seed ProductSeeder
```

**Important:** Migration rollback and refresh commands can reverse schema changes and potentially destroy data. Make backups before running them against important databases.

## 4. Cache commands

| Command | What it does | Example |
|---|---|---|
| `cache:clear` | Clears application cache using the configured cache handler | `php spark cache:clear` |
| `cache:info` | Displays file cache information | `php spark cache:info` |

```bash
# Clear application cache
php spark cache:clear

# Inspect file cache
php spark cache:info
```

`cache:info` supports the File cache handler. `cache:clear` does not automatically clear every type of framework, PHP opcode, or external server cache.

## 5. Security, encryption, and configuration commands

| Command | What it does | Example |
|---|---|---|
| `key:generate` | Generates an encryption key | `php spark key:generate` |
| `config:check` | Checks configuration values | `php spark config:check` |
| `filter:check` | Shows which filters apply to a particular route | `php spark filter:check get /users` |

### Examples

Generate a new encryption key:

```bash
php spark key:generate
```

Check application configuration:

```bash
php spark config:check
```

Inspect filters applied to a GET request:

```bash
php spark filter:check get /users
```

Generating a new encryption key can make previously encrypted data unreadable if the old key is replaced. Preserve your existing key when you have encrypted production data.

## 6. Maintenance and housekeeping commands

| Command | What it does | Example |
|---|---|---|
| `logs:clear` | Deletes framework log files | `php spark logs:clear` |
| `debugbar:clear` | Deletes saved Debug Toolbar data | `php spark debugbar:clear` |

```bash
php spark logs:clear
php spark debugbar:clear
```

These commands help clean up development data and logs. They do not optimize PHP code or update application dependencies.

## 7. Translation and localization commands

| Command | What it does | Example |
|---|---|---|
| `lang:find` | Finds language strings used in application code | `php spark lang:find` |
| `lang:sync` | Synchronizes language translation files | `php spark lang:sync` |

For example:

```bash
php spark lang:find
```

This is useful for locating language keys when building multilingual applications.

```bash
php spark lang:sync
```

This helps synchronize translation files. Check its available options for your installed framework version.

## 8. Additional package-specific commands

Some commands appear only when additional packages are installed.

For example, the optional CodeIgniter Shield package provides authentication-related commands.

| Command | What it does | Example |
|---|---|---|
| `shield:setup` | Initializes Shield configuration and setup | `php spark shield:setup` |
| `shield:user` | Provides CLI user-management functionality | `php spark shield:user` |

These are not part of the core CodeIgniter framework.

## 9. How to get the exact complete command list for your installation

Because the available commands vary by framework version and packages, the authoritative list is the one generated by your project.

```bash
# Show all registered commands
php spark list

# Show a compact alphabetical list
php spark list --simple

# Show help for a particular command
php spark help migrate

# Show command-specific options
php spark migrate --help
```

You can also export the command list to a text file:

```bash
php spark list > spark-commands.txt
```

Or save the simpler command list:

```bash
php spark list --simple > spark-commands.txt
```

This is especially useful when comparing commands before and after upgrading CodeIgniter.

## 10. Practical workflow: Creating a REST API

For a CodeIgniter 4 REST API, a typical sequence is:

```bash
# 1. Generate a RESTful controller
php spark make:controller Api/Products --restful controller

# 2. Generate a model
php spark make:model ProductModel --table products

# 3. Generate a migration
php spark make:migration CreateProductsTable

# 4. Generate a seeder
php spark make:seeder ProductSeeder

# 5. Run migrations after implementing the schema
php spark migrate

# 6. Populate sample data after implementing the seeder
php spark db:seed ProductSeeder

# 7. Inspect registered API routes
php spark routes

# 8. Start the development server
php spark serve
```

You still need to implement the controller methods, migration schema, seeder contents, and API routes.

## 11. Commands worth knowing for daily development

| Task | Command |
|---|---|
| Start development server | `php spark serve` |
| Create controller | `php spark make:controller Users` |
| Create REST controller | `php spark make:controller Users --restful controller` |
| Create model | `php spark make:model UserModel` |
| Create migration | `php spark make:migration CreateUsersTable` |
| Apply migrations | `php spark migrate` |
| Check migrations | `php spark migrate:status` |
| Roll back migrations | `php spark migrate:rollback` |
| Run database seeder | `php spark db:seed UserSeeder` |
| Clear cache | `php spark cache:clear` |
| Check routes | `php spark routes` |
| Check filters | `php spark filter:check get /users` |
| Clear logs | `php spark logs:clear` |
| Generate encryption key | `php spark key:generate` |
| List all commands | `php spark list --simple` |

For further reference, see the official [Spark Commands documentation](https://codeigniter.com/user_guide/cli/spark_commands.html) and [CLI Generators documentation](https://codeigniter.com/user_guide/cli/cli_generators.html).

**Version note:** This guide is based on the CodeIgniter 4.7 documentation and covers the standard built-in command families, with package-specific examples identified separately. Your installed version's `php spark list` output remains the definitive inventory, particularly for commands introduced or changed between releases.
