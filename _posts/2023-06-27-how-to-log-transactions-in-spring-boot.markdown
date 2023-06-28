---
layout: post
title: "How to Log Transactions in Spring Boot"
date: 2023-06-27 11:26:56
categories: java
description: How to Log Transactions in Spring Boot
keywords: [Andrei Pall, blog, java, jpa, spring, framework]
excerpt: We can log the transactions by configuring loggers in the properties file
---
<p>We can log the transactions by configuring loggers in the properties file:</p>
{% highlight java %}
logging.level.org.springframework.orm.jpa=DEBUG
logging.level.org.springframework.transaction=DEBUG
{% endhighlight %}
