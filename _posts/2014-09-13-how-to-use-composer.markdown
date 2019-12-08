---
layout: post
title:  "How to use Composer"
date:   2014-09-13 08:10:43
categories: PHP
description: How to use Composer
keywords: [Andrei Pall, blog, php, composer]
excerpt: Composer is a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you. Composer is not a package manager. Yes, it deals with "packages" or libraries, but it manages them on a per-project basis.
---

<h6>Install Composer Globally</h6>

Composer requires PHP 5.3.2+ to run. A few sensitive php settings and compile flags are also required, but the installer will warn you about any incompatibilities.

To install packages from sources instead of simple zip archives, you will need git, svn or hg depending on how the package is version-controlled.

You can run these commands to easily access composer from anywhere on your system:
{% highlight bash %}
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
{% endhighlight %}
<h6>Defining dependencies</h6>

<a href="https://packagist.org">Packagist</a> is the main Composer repository. It aggregates all sorts of PHP packages that are installable with Composer.
To install Mustache create the file composer.json:
{% highlight javascript %}
{
  "require": {
    "mustache/mustache": "2.7.0"
  }
}
{% endhighlight %}
and run the command:
{% highlight bash %}
composer install
{% endhighlight %}
To use this package in our project create a file test.php with the content:
{% highlight php %}
<?php
require_once "vendor/autoload.php"

$mustache = new Mustache_Engine();

echo $mustache->render("Hello {{name}}", ["name" => "Andrei"]);
?>
{% endhighlight %}
To update a Composer package run:
{% highlight bash %}
composer update
{% endhighlight %}

<h6>Create project with Composer</h6>
{% highlight bash %}
composer search laravel
composer create-project laravel/laravel

cd laravel
php artisan serve


composer show slim/slim
composer create-project slim/slim slim-2.4.0 2.4.0
{% endhighlight %}
