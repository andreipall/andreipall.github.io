---
layout: post
title:  "Install Apache Maven on Ubuntu"
date:   2015-07-25 16:46:56
categories: Java
description: Install Apache Maven on Ubuntu
keywords: [Andrei Pall, blog, mvc, maven, java, framework]
excerpt: Maven is a build automation tool used primarily for Java projects. Maven addresses two aspects of building software - first, it describes how software is built, and second, it describes its dependencies. Contrary to preceding tools like Apache Ant, it uses conventions for the build procedure.
---

Maven is a build automation tool used primarily for Java projects.  Maven addresses two aspects of building software: First, it describes how software is built, and second, it describes its dependencies.

To install Maven type the following commands in Terminal:
{% highlight bash %}
wget http://apache.arvixe.com/maven/maven-3/3.2.5/binaries/apache-maven-3.2.5-bin.tar.gz

tar -zxf apache-maven-3.2.5-bin.tar.gz

sudo cp -R apache-maven-3.2.5 /usr/local

sudo ln -s /usr/local/apache-maven-3.2.5/bin/mvn /usr/bin/mvn

mvn -version 
{% endhighlight %}
