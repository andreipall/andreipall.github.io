---
layout: post
title:  "How to Install Google Chrome on Ubuntu"
date:   2017-07-16 12:46:56
categories: Linux
description: How to Install Google Chrome on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Google Chrome is a freeware web browser developed by Google. It was first released in 2008, for Microsoft Windows, and was later ported to Linux, macOS, iOS and Android. Google Chrome is also the main component of Chrome OS, where it serves as a platform for running web apps. 
---

Google Chrome is a freeware web browser developed by Google. It was first released in 2008, for Microsoft Windows, and was later ported to Linux, macOS, iOS and Android. Google Chrome is also the main component of Chrome OS, where it serves as a platform for running web apps. 

Download the package (64 bit):
{% highlight bash %}
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
{% endhighlight %}
Install the package, forcing install of dependencies:
{% highlight bash %}
sudo dpkg -i --force-depends google-chrome-stable_current_amd64.deb
{% endhighlight %}
