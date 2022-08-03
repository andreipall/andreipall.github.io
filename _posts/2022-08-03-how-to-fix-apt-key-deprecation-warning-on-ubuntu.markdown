---
layout: post
title:  "How to Fix ‘apt-key’ Deprecation Warning on Ubuntu"
date:   2022-08-03 12:46:56
categories: Linux
description: How to Fix ‘apt-key’ Deprecation Warning on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: If you see an apt-key deprecated warning when you run apt update on Ubuntu and want to fix it, you’re in the right place. In this post I walk you through the process.
---
<p>If you see an apt-key deprecated warning when you run apt update on Ubuntu and want to fix it, you’re in the right place. In this post I walk you through the process.</p>
<p>After I followed the steps to install MySQL on Ubuntu I noticed the following error every time I run apt update:</p>
{% highlight bash %}
W: http://repo.mysql.com/apt/ubuntu/dists/jammy/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
{% endhighlight %}
<p>Open a new Terminal window and then look inside your legacy apt-key file by running this command:</p>
{% highlight bash %}
sudo apt-key list
{% endhighlight %}
<p>Scroll through the list carefully. Pay attention to how things are laid out. Find the section that mentions the package listed in the initial warning (if you see multiple warnings you will need to repeat these steps for each one in turn). </p>
<p>In my case I’m looking for the key related to MySQL, and it looks like this:</p>
{% highlight bash %}
pub   rsa4096 2021-12-14 [SC] [expires: 2023-12-14]
      859B E8D7 C586 F538 430B  19C2 467B 942D 3A79 BD29
uid           [ unknown] MySQL Release Engineering <mysql-build@oss.oracle.com>
sub   rsa4096 2021-12-14 [E] [expires: 2023-12-14]
{% endhighlight %}
<p>Copy the last 8 characters from the second line — in the example above this is 3A79 BD29 — and convert it to a .gpg file using the command below. Remember to drop the space between the 8 characters and specify a gpg file name that is relevant to the package the key is for.</p>
<p>In my example I had to run:</p>
{% highlight bash %}
sudo apt-key export 3A79BD29 | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/mysql.gpg
{% endhighlight %}
<p>Once you’ve constructed your command hit enter. That’s all you need to do.</p>
<p>When you next run an apt update the deprecated key error will no longer appear for the repo you just applied (though if you have more than one repo affected, you’ll need to repeat the steps above for each one).</p>
