---
layout: post
title:  "Install Atom text editor on Ubuntu via PPA"
date:   2016-04-08 16:46:56
categories: PHP
description: Install Atom text editor on Ubuntu via PPA
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Atom is a hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors. We designed it to be deeply customizable, but still approachable using the default configuration.
---

Atom is text / source code editor based on web technologies and you can tweak its interface with CSS or easily add new features with HTML and Javascript, at least according to its website. The text editor features Node.js integration, allowing you to seamlessly mix usage of Node and browser APIs. And of course, since it's developed by GitHub, it features built-in Git integration.

Other Atom features include:
<ul>
<li>file system browser;</li>
<li>fuzzy finder for quickly opening files;</li>
<li>fast project-wide search and replace;</li>
<li>multiple cursors and selections;</li>
<li>multiple panes;</li>
<li>snippets;</li>
<li>code folding;</li>
<li>a clean preferences UI;</li>
<li>supports importing TextMate grammars and themes.</li>
</ul>

To install Atom in Ubuntu and derivatives (Linux Mint, elementary OS, etc.), use the following commands:
{% highlight bash %}
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom
{% endhighlight %}
