---
layout: post
title: "How to Log JPA Queries"
date: 2023-06-26 11:26:56
categories: java
description: How to Log JPA Queries
keywords: [Andrei Pall, blog, java, jpa, spring, framework]
excerpt: We can log the SQL statements by configuring loggers in the properties file
---
<p>We can log the SQL statements by configuring loggers in the properties file:</p>
{% highlight java %}
logging.level.org.hibernate.SQL=debug
logging.level.org.hibernate.orm.jdbc.bind=trace
{% endhighlight %}
