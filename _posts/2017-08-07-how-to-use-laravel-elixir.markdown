---
layout: post
title:  "How to Use Laravel Elixir"
date:   2017-08-07 13:46:56
categories: PHP
description: How to Use Laravel Elixir
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Elixir is a build tool that provides a simple user interface and a series of conventions on top of Gulp. Elixir can preprocess your CSS using Sass or LESS. It can concatenate files, minify them, rename them, and copy them, and it can copy entire directories or individual files.
---

Elixir is a build tool that provides a simple user interface and a series of conventions on top of Gulp. Elixir can preprocess your CSS using Sass or LESS. It can concatenate files, minify them, rename them, and copy them, and it can copy entire directories or individual files.

<h3>The --production flag</h3>
By default, Elixir doesn’t minify all the files it’s generating. But if you want to run the build scripts in “production” mode, with all minification enabled, you can just add the --production flag:
{% highlight bash %}
gulp --production
{% endhighlight %}
<h3>Compiling multiple files with Elixir</h3>
{% highlight javascript %}
const elixir = require('laravel-elixir');
elixir(mix => {
    mix.sass([
        'app.scss',
        'public.scss'
    ]);
});
{% endhighlight %}
<h3>Combining stylesheets with Elixir</h3>
{% highlight javascript %}
const elixir = require('laravel-elixir');
elixir(mix => {
    // Combines all files from resources/assets/css and subfolders
    mix.styles();
    // Combines files from resources/assets/css
    mix.styles([
        'normalize.css',
        'app.css'
    ]);
    // Combines all styles from other directory
    mix.stylesIn('resources/some/other/css/directory');
    // Combines given styles from resources/assets/css
    // and outputs to a custom directory
    mix.styles([
        'normalize.css',
        'app.css'
    ], 'public/other/css/output.css');
    // Combines given styles from custom directory
    // and outputs to a custom directory
    mix.styles([
        'normalize.css',
        'app.css'
    ], 'public/other/css/output.css', 'resources/some/other/css/directory');
});
{% endhighlight %}
<h3>Concatenating JavaScript</h3>
{% highlight javascript %}
const elixir = require('laravel-elixir');
elixir(mix => {
    // Combines files from resources/assets/js
    mix.scripts([
        'jquery.js',
        'app.js'
    ]);
    // Combines all scripts from other directory
    mix.scriptsIn('resources/some/other/js/directory');
    // Combines given scripts from resources/assets/js
    // and outputs to a custom directory
    mix.scripts([
        'jquery.js',
        'app.js'
    ], 'public/other/js/output.js');
    // Combines given scripts from custom directory
    // and outputs to a custom directory
    mix.scripts([
        'jquery.js',
        'app.js'
    ], 'public/other/js/output.js', 'resources/some/other/js/directory');
});
{% endhighlight %}
<h3>mix.version</h3>
{% highlight javascript %}
const elixir = require('laravel-elixir');
elixir(mix => {
    mix.version(['css/all.css', 'js/app.js']);
});
{% endhighlight %}
This will generate a version of the specified file with a unique hash appended to it in the public/build directory—something like public/build/css/all-84fh4556.css.
Using the elixir() helper in views:
{% highlight php %}
<link rel="stylesheet" href="{ { elixir('css/all.css') } }">
<script src="{ { elixir('js/app.js') } }"></script>
// will output something like:
<link rel="stylesheet" href="/css/all-84fh4556.css">
<script src="js/app-84fh4556.js"></script>
{% endhighlight %}
