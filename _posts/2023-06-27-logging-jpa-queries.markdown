---
layout: post
title:  "Logging JPA Queries"
date:   2023-06-27 12:46:56
categories: java
description: Logging JPA Queries
keywords: [Andrei Pall, blog, java, jpa, spring, framework]
excerpt: We can log the SQL statements by configuring loggers in the properties file
---
<p>We can log the SQL statements by configuring loggers in the properties file:</p>
{% highlight java %}
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
{% endhighlight %}
