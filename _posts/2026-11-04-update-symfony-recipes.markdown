---
layout: post
title:  "How to update Symfony 8 recipes"
date:   2026-11-04 07:46:56
categories: PHP
description: How to update Symfony 8 recipes
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: To update Symfony 8 recipes, use Symfony Flex through Composer.
---
To update Symfony 8 recipes, use **Symfony Flex** through Composer.

### 1. List available recipe updates

```
composer recipes
```

This shows installed recipes and indicates which ones have updates available.

### 2. Update all outdated recipes

```
composer recipes:update
```

Symfony Flex will let you select which recipes to update.

To update a specific recipe:

```
composer recipes:update symfony/framework-bundle
```

### 3. Update without being prompted for a GitHub token

Since you don't want Composer to ask for a GitHub token, use:

```
COMPOSER_NO_INTERACTION=1 composer recipes:update symfony/framework-bundle
```

This disables interactive prompts, but it does not bypass GitHub API rate limits. If the limit is exhausted, changelog retrieval may still fail.

### 4. Review the changes

Symfony Flex may modify configuration files. Inspect the changes:

```
git status
git diff
git diff --cached
```

If everything looks correct:

```
git add .
git commit -m "Update Symfony 8 recipes"
```

### 5. Verify the recipes

```
composer recipes
```

You can also validate your Symfony configuration:

```
php bin/console lint:container
php bin/console cache:clear
```

### Important: Recipes vs Symfony packages

Updating recipes is different from updating Symfony itself.

| Command | Purpose |
|---|---|
| `composer recipes` | Show installed recipes and updates |
| `composer recipes:update` | Update recipe configuration |
| `composer update "symfony/*" --with-all-dependencies` | Update Symfony packages within Composer constraints |
| `composer outdated "symfony/*"` | List outdated Symfony packages |

**For Symfony 8.1:** If your project currently uses Symfony 8.0 and you want to upgrade to 8.1, first update your Symfony dependencies and then update the recipes.

Also, the `symfony/framework-bundle/8.1` recipe you encountered does not necessarily mean your installed Symfony framework is already version 8.1. The package version and recipe version are related but distinct.
