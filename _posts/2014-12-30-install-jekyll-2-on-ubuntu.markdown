---
layout: post
title:  "Install Jekyll 2 on Ubuntu"
date:   2014-12-30 16:46:56
categories: Ruby
description: Install Jekyll 2 on Ubuntu
keywords: [Andrei Pall, blog, gem, mvc, ruby, framework]
excerpt: Jekyll is a static site generator with a templating system that can be adapted for many types of websites, including blogs. It can be run on a server, or run locally and the generated files uploaded to a server. It is the default software used by Github Pages.
---

Jekyll is a static site generator with a templating system that can be adapted for many types of websites, including blogs. It can be run on a server, or run locally and the generated files uploaded to a server. It is the default software used by Github Pages.

Install ruby, the ruby development libraries, and the make command.
{% highlight bash %}
sudo apt-get install ruby ruby-dev make gcc nodejs
{% endhighlight %}

Install the Jekyll gem system wide. For speed, we are excluding the extended documentation. To include all documentation, omit the --no-rdoc --no-ri switches.
{% highlight bash %}
sudo gem install jekyll --no-rdoc --no-ri
sudo gem install pygments.rb

jekyll new my-awesome-site
cd my-awesome-site
jekyll serve
=> Now browse to http://localhost:4000
{% endhighlight %}

Additional gems can add features to Jekyll, such the github-pages gem which bundles together several gems supported by Github Pages.
{% highlight bash %}
sudo gem install github-pages --no-rdoc --no-ri
{% endhighlight %}

Although not required, git is often used to manage the files of a Jekyll website.
{% highlight bash %}
sudo apt-get install git

git add --all
git commit -m "Initial commit"
git push -u origin master
{% endhighlight %}
