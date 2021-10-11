---
layout: post
title:  "MySQL query to extract domains from URLs"
date:   2021-10-11 16:53:56
categories: sql
description: MySQL query to extract domains from URLs
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: MySQL query to extract domains from URLs
---
<p>MySQL query to extract domains from URLs:</p>
{% highlight sql %}
SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(target_url, '/', 3), '://', -1), '/', 1), '?', 1) AS domain
{% endhighlight %}
<p>Explanation (cause non-trivial SQL rarely makes sense):</p>
{% highlight sql %}
SUBSTRING_INDEX(target_url, '/', 3) - strips any path if the url has a protocol
SUBSTRING_INDEX(THAT, '://', -1) - strips any protocol from THAT
SUBSTRING_INDEX(THAT, '/', 1) - strips any path from THAT ( if there was no protocol )
SUBSTRING_INDEX(THAT, '?', 1) - strips the query string from THAT ( if there was no path or trailing / )
{% endhighlight %}
