---
layout: post
title:  "How to Install Laravel Elixir on Ubuntu"
date:   2017-08-07 12:46:56
categories: PHP
description: How to Install Laravel Elixir on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Elixir (not to be confused with the functional programming language) is a build tool that provides a simple user interface and a series of conventions on top of Gulp. Elixir’s core feature is simplifying the most common Gulp tasks by means of a cleaner API and a series of naming and application structure conventions.
---

Elixir (not to be confused with the functional programming language) is a build tool that provides a simple user interface and a series of conventions on top of Gulp. Elixir’s core feature is simplifying the most common Gulp tasks by means of a cleaner API and a series of naming and application structure conventions.

Since Elixir runs on Gulp, you’ll need to set up a few tools before using it:
<ol> 
<li>First, you’ll need Node.js installed:
{% highlight bash %}
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
{% endhighlight %}
</li>
<li>Next, you’ll need to install Gulp globally on your machine:
{% highlight bash %}
sudo npm install --global gulp-cli
{% endhighlight %}
Once Node and Gulp are installed, you will never have to run those commands
again. Now you’re ready to install this project’s dependencies.
</li>
<li>Open the project root in your terminal, and run:
{% highlight bash %}
npm install
{% endhighlight %}
to install the required packages (Laravel ships with an Elixir-ready package.json file to direct NPM).
</li>
</ol>
You’re now set up! You can run gulp to run Gulp/Elixir once, gulp watch to listen for relevant file changes and run in response, or gulp scripts or gulp styles to just run the script or style tasks.
