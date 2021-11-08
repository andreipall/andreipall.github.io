---
layout: post
title:  "Spring Boot Configuration"
date:   2018-05-10 12:46:56
categories: Java
description: Spring Boot Configuration
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Hibernate is the most popular implementation of JPA. The Java Persistence API provides Java developers with an api for mapping java objects to relational data. In this article, you will learn about Spring Boot database configuration.
---
Hibernate is the most popular implementation of JPA. The Java Persistence API provides Java developers with an api for mapping java objects to relational data. In this article, you will learn about Spring Boot database configuration.


Configure application.properties:
{% highlight java %}
server.port=8000
spring.datasource.url=jdbc:mysql://localhost/DatabaseDemo
spring.datasource.username=root
spring.datasource.password=eclipse
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create-drop

#spring.jpa.show-sql=true

#Show SQL
spring.jpa.properties.hibernate.show_sql=true

#Format SQL
spring.jpa.properties.hibernate.format_sql=true

#Show bind values
logging.level.org.hibernate.type.descriptor.sql=trace
{% endhighlight %}
Restart the app and you are ready!<br/>
Things to note:
<ul>
<li>Spring Boot chooses a default value for you based on whether it thinks your database is embedded (default create-drop) or not (default none).</li>
<li>spring.jpa.hibernate.ddl-auto is the setting to perform SchemaManagementTool actions automatically
<ul>
<li>none: No action will be performed.</li>
<li>create-only: Database creation will be generated.</li>
<li>drop: Database dropping will be generated.</li>
<li>create: Database dropping will be generated followed by database creation.</li>
<li>validate: Validate the database schema</li>
<li>update: Update the database schema</li>
</ul>
</li>
<li>Reference: <a href="https://docs.jboss.org/hibernate/orm/5.2/userguide/html_single/Hibernate_User_Guide.html#configurations-hbmddl">https://docs.jboss.org/hibernate/orm/5.2/userguide/html_single/Hibernate_User_Guide.html#configurations-hbmddl</a></li>
</ul>
