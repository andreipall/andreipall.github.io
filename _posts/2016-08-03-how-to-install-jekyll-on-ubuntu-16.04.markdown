---
layout: post
title:  "How to install Jekyll on Ubuntu 16.04"
date:   2016-08-03 16:46:56
categories: Ruby
description: How to install Jekyll on Ubuntu 16.04
keywords: [Andrei Pall, blog, jekyll, sql, framework]
excerpt: Jekyll is a static site generator with a templating system that can be adapted for many types of websites, including blogs. It can be run on a server, or run locally and the generated files uploaded to a server. It is the default software used by Github Pages.
---

Jekyll is a static site generator with a templating system that can be adapted for many types of websites, including blogs. It can be run on a server, or run locally and the generated files uploaded to a server. It is the default software used by Github Pages.

Installing Jekyll package on Ubuntu 16.04 is as easy as running the following command on terminal:
{% highlight bash %}
sudo apt-get install jekyll git gitg

jekyll new my-awesome-site
cd my-awesome-site
jekyll serve
=> Now browse to http://localhost:4000
{% endhighlight %}
<h3>Clone the repository</h3>
Go to the folder where you want to store your project, and clone the new repository:
{% highlight bash %}
git clone https://github.com/username/username.github.io
{% endhighlight %}
<h3>Push it</h3>
Enter the project folder and add, commit, and push your changes:
{% highlight bash %}
git add --all

git commit -m "Initial commit"

git push -u origin master
{% endhighlight %}




