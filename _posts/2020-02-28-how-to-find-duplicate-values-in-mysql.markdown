---
layout: post
title:  "How To Find Duplicate Values in MySQL"
date:   2020-04-01 16:53:56
categories: sql
description: How To Find Duplicate Values in MySQL
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Data duplication happens because of many reasons. Finding duplicate values is one of the important tasks that you must deal with when working with the databases.
---
<p>Data duplication happens because of many reasons. Finding duplicate values is one of the important tasks that you must deal with when working with the databases.</p>
<p>In this tutorial, you will learn how to find duplicate values of one or more columns in MySQL.</p>
<h3>Find duplicate values in one column</h3>
{% highlight sql %}
SELECT 
    col, 
    COUNT(col)
FROM
    table_name
GROUP BY col
HAVING COUNT(col) > 1;
{% endhighlight %}
<h3>Find duplicate values in multiple columns</h3>
{% highlight sql %}
SELECT 
    col1, COUNT(col1),
    col2, COUNT(col2),
    ...
 
FROM
    table_name
GROUP BY 
    col1, 
    col2, ...
HAVING 
       (COUNT(col1) > 1) AND 
       (COUNT(col2) > 1) AND 
       ...
{% endhighlight %}
