---
layout: post
title:  "How to set a system-wide umask"
date:   2023-11-05 11:46:56
categories: Linux
description: How to set a system-wide umask
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: To set a system-wide umask edit the file.
---
<p>To set a system-wide umask edit the file:</p>
{% highlight bash %}
sudo nano /etc/login.defs
{% endhighlight %}
{% highlight bash %}
[...]
UMASK 000
[...]
{% endhighlight %}
