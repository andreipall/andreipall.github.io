---
layout: post
title:  "How to install Ubuntu's Firefox in Linux Mint"
date:   2019-04-23 12:46:56
categories: Linux
description: How to install Ubuntu's Firefox in Linux Mint
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: I recently migrated my system to Linux Mint from Ubuntu, and I was very dissapointed by the Firefox version of Linux Mint. Problems include bookmarks and the lack of autocomplete in the Google search bar (i.e. the one within the browser, at the right side).
---
I recently migrated my system to Linux Mint from Ubuntu, and I was very dissapointed by the Firefox version of Linux Mint. Problems include bookmarks and the lack of autocomplete in the Google search bar (i.e. the one within the browser, at the right side). A re-installation didn't improve anything; on the contrary, things got worst.
To install Ubuntu's Firefox in Linux Mint:
<ol>
<li>Remove Mint version of Firefox.</li>
{% highlight bash %}
sudo apt remove firefox
{% endhighlight %}
<li>In directory /etc/apt/preferences.d create file firefox.pref (or any other name)</li>
{% highlight bash %}
sudo nano /etc/apt/preferences.d/firefox.pref
{% endhighlight %}
<li>with content:</li>
{% highlight bash %}
Package: firefox firefox-locale-*
Pin: release o=Ubuntu
Pin-Priority: 800
{% endhighlight %}
<li>Run apt-get update or similar action and install Firefox back. Now it will be always from Ubuntu repository:</li>
{% highlight bash %}
sudo apt update && sudo apt install firefox
{% endhighlight %}
</ol>
If you have newly installed and not updated (!) system, you can skip first step. Just create this file, go to update manager, press "check" button (!) and install updates. Mint version of Firefox will be replaced by Ubuntu version.
