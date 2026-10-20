---
layout: post
title:  "Symfony configuration options"
date:   2026-10-20 07:46:56
categories: PHP
description: Symfony configuration options
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: In Symfony, configuration options are spread across the official documentation, YAML configuration files in your project, and the configuration reference for each component.
---
In Symfony, configuration options are spread across the official documentation, YAML configuration files in your project, and the configuration reference for each component.

**The best place to start is the official Symfony Configuration Reference:** it documents the available options for Symfony components and bundles.

## 1. Official configuration reference

[Symfony — All Configuration Options](https://symfony.com/doc/current/reference/index.html)

This is the main index for configuration options, including:

- `framework` — sessions, routing, cache, mailer-related framework settings, and more.
- `security` — firewalls, authentication, access control.
- `doctrine` — database and ORM configuration.
- `twig` — template configuration.
- `monolog` — logging.
- `web_profiler` and `debug` — development tools.

## 2. Inspect configuration from your terminal

Symfony provides useful console commands for discovering options in your actual project.

| Command | What it shows |
|---|---|
| `php bin/console config:dump-reference framework` | Available `framework` options and their defaults |
| `php bin/console debug:config framework` | Effective `framework` configuration |
| `php bin/console config:dump-reference security` | Available security configuration options |
| `php bin/console debug:config security` | Effective security configuration |
| `php bin/console debug:container` | Registered services in the dependency injection container |

For example, to inspect the available framework options, run:

```bash
php bin/console config:dump-reference framework
```

To see what your application actually uses:

```bash
php bin/console debug:config framework
```

These commands are documented in the [FrameworkBundle configuration reference](https://symfony.com/doc/current/reference/configuration/framework.html).

## 3. Explore your project files

Look in these locations:

```text
config/
├── packages/
│   ├── framework.yaml
│   ├── security.yaml
│   ├── doctrine.yaml
│   └── twig.yaml
├── packages/
│   └── dev/
└── services.yaml
```

Your files may differ depending on which packages you've installed. The `config/packages/` directory contains configuration for your application, while environment-specific directories can override settings.

**My recommendation:** Start with `config:dump-reference` whenever you want to discover every supported option for a particular configuration section. Then use `debug:config` to compare those options with your application's effective settings.

One important detail: third-party bundles have their own configuration options, so the official Symfony reference won't necessarily cover every package you install. The same `config:dump-reference` command often works for those bundles too, using their configuration root key.
