---
layout: post
title:  "CodeIgniter 4 config comparison"
date:   2026-10-07 06:46:56
categories: PHP
description: CodeIgniter 4 config comparison
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: For CodeIgniter 4, a good approach is to compare your project's `app/Config/` files against the corresponding files shipped in `vendor/codeigniter4/framework/app/Config/`.
---
For CodeIgniter 4, a good approach is to compare your project's `app/Config/` files against the corresponding files shipped in `vendor/codeigniter4/framework/app/Config/`.

## Compare a single file on Linux

```bash
diff -u app/Config/App.php vendor/codeigniter4/framework/app/Config/App.php
```

The `-u` option produces a readable unified diff. Lines beginning with `-` are from your project and lines beginning with `+` are from the new framework version.

## Compare the entire configuration directory

```bash
diff -ru app/Config vendor/codeigniter4/framework/app/Config
```

I prefer comparing individual files during an upgrade because it's easier to distinguish **your custom configuration** from **new CodeIgniter defaults**:

```bash
diff -u app/Config/App.php vendor/codeigniter4/framework/app/Config/App.php
diff -u app/Config/Database.php vendor/codeigniter4/framework/app/Config/Database.php
diff -u app/Config/Filters.php vendor/codeigniter4/framework/app/Config/Filters.php
diff -u app/Config/Security.php vendor/codeigniter4/framework/app/Config/Security.php
```

## Using Git

Git also has a useful diff viewer even when the files aren't versions of the same tracked file:

```bash
git diff --no-index \
    app/Config/App.php \
    vendor/codeigniter4/framework/app/Config/App.php
```

This can provide syntax highlighting in terminals that support it.

## On Windows

If you're developing on Windows, **WinMerge** is particularly convenient. Compare these directories:

```text
your-project\app\Config
your-project\vendor\codeigniter4\framework\app\Config
```

Other good GUI choices are VS Code's file comparison and Beyond Compare.

### Using VS Code

Right-click your project's file:

```text
app/Config/App.php
```

Choose **Select for Compare**, then right-click:

```text
vendor/codeigniter4/framework/app/Config/App.php
```

and choose **Compare with Selected**.

## Important caveat

Don't try to make your `app/Config/App.php` identical to the framework version. Your file is expected to contain application-specific settings.

For example, if your existing file contains:

```php
public string $indexPage = '';
```

while the new framework file has:

```php
public string $indexPage = 'index.php';
```

that doesn't mean you should change yours.

During an upgrade, you're primarily looking for:

- New configuration properties
- Removed properties
- Changed property types
- Changed defaults
- Structural changes introduced by CodeIgniter

Keep your application's intentional customizations.

## Don't forget spark and public/index.php

These files belong to the CodeIgniter project skeleton rather than just the Composer package, so Composer does not necessarily replace your project copies automatically.

```php
diff spark vendor/codeigniter4/framework/spark
diff public/index.php vendor/codeigniter4/framework/public/index.php
```

If you haven't customized them, you can replace them:

```php
cp vendor/codeigniter4/framework/spark spark
cp vendor/codeigniter4/framework/public/index.php public/index.php
```
