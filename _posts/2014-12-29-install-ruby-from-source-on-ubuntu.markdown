---
layout: post
title:  "Install Ruby from Source on Ubuntu"
date:   2014-12-29 16:46:56
categories: Ruby
description: Install Ruby from Source on Ubuntu
keywords: [Andrei Pall, blog, gem, mvc, ruby, framework]
excerpt: You can use several tools to install Ruby. This blog post describes how to build and install Ruby from source on Ubuntu. If you cannot compile your own Ruby, and you do not want to use a third-party tool, you can use your system’s package manager to install Ruby.
---

Sometimes compilation fails because of unmet system dependencies, or compilation succeeds but the new Ruby version exhibits weird failures at runtime. The following instructions are our recommendations for a sane build environment:
{% highlight bash %}
sudo apt-get install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev
{% endhighlight %}
You can install Ruby from source. Download and unpack a tarball, then just do this:
{% highlight bash %}
./configure
make
sudo make install
{% endhighlight %}
By default, this will install Ruby into /usr/local. To change, pass the --prefix=DIR option to the ./configure script.
