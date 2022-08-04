---
layout: post
title:  "How to Fix "Skipping acquire of configured file 'main/binary-i386/Packages'" notification on Ubuntu"
date:   2022-08-04 12:46:56
categories: Linux
description: How to Fix "Skipping acquire of configured file 'main/binary-i386/Packages'" notification on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Here is the command to remove multi architecture (only if you have no 32 bit applications)
---
<p>Here is the command to remove multi architecture (only if you have no 32 bit applications):</p>
{% highlight bash %}
sudo dpkg --remove-architecture i386
{% endhighlight %}
