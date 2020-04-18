---
layout: post
title:  "How To Delete Duplicate Rows in MySQL"
date:   2020-04-18 16:53:56
categories: sql
description: How To Delete Duplicate Rows in MySQL
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Data duplication happens because of many reasons. Removing duplicate rows is one of the important tasks that you must deal with when working with the databases.
---
<p>Data duplication happens because of many reasons. Removing duplicate rows is one of the important tasks that you must deal with when working with the databases.</p>
<p>In this tutorial, you will learn various ways to delete duplicate rows in MySQL.</p>
<h3>Delete duplicate rows using DELETE JOIN statement</h3>
<p>The following statement deletes duplicate rows and keeps the highest id:</p>
{% highlight sql %}
DELETE t1 FROM contacts t1
INNER JOIN contacts t2 
WHERE 
    t1.id < t2.id AND 
    t1.email = t2.email;
{% endhighlight %}
<p>You can execute the query that find duplicate emails again to verify the delete:</p>
{% highlight sql %}
SELECT 
    email, 
    COUNT(email)
FROM
    contacts
GROUP BY 
    email
HAVING 
    COUNT(email) > 1;
{% endhighlight %}
<p>The query returns an empty set, which means that the duplicate rows have been deleted.</p>
<p>In case you want to delete duplicate rows and keep the lowest id, you can use the following statement:</p>
{% highlight sql %}
DELETE c1 FROM contacts c1
INNER JOIN contacts c2 
WHERE
    c1.id > c2.id AND 
    c1.email = c2.email;
{% endhighlight %}
<h3>Delete duplicate rows using an intermediate table</h3>
<p>The following shows the steps for removing duplicate rows using an intermediate table:</p>
<ol>
<li>Create a new table whose structure is the same as the original table:</li>
{% highlight sql %}
CREATE TABLE source_copy LIKE source;
{% endhighlight %}
<li>Insert distinct rows from the original table to the new table:</li>
{% highlight sql %}
INSERT INTO source_copy
SELECT * FROM source
GROUP BY col; -- column that has duplicate values
{% endhighlight %}
<li>Drop the original table and rename the immediate table to the original one:</li>
{% highlight sql %}
DROP TABLE source;
ALTER TABLE source_copy RENAME TO source;
{% endhighlight %}
</ol>
<p>For example, the following statements delete rows with duplicate emails from the contacts table:</p>
{% highlight sql %}
-- step 1
CREATE TABLE contacts_temp 
LIKE contacts;

-- step 2
INSERT INTO contacts_temp
SELECT * 
FROM contacts 
GROUP BY email;

-- step 3
DROP TABLE contacts;

ALTER TABLE contacts_temp 
RENAME TO contacts;
{% endhighlight %}
<h3>Delete duplicate rows using the ROW_NUMBER() function</h3>
<p>The following statement uses the ROW_NUMBER() function to assign a sequential integer number to each row. If the email is duplicate, the row number will be greater than one.</p>
{% highlight sql %}
SELECT 
	id, 
    email, 
    ROW_NUMBER() OVER ( 
		PARTITION BY email 
        ORDER BY email
	) AS row_num 
FROM contacts;
{% endhighlight %}
<p>The following statement returns id list of the duplicate rows:</p>
{% highlight sql %}
SELECT 
	id 
FROM (
	SELECT 
		id,
		ROW_NUMBER() OVER (
			PARTITION BY email
			ORDER BY email) AS row_num
	FROM 
		contacts
) t
WHERE 
	row_num > 1;
{% endhighlight %}
<p>And you just delete the duplicate rows from the contacts table using the DELETE statement with a subquery in the WHERE clause:</p>
{% highlight sql %}
DELETE FROM contacts 
WHERE 
	id IN (
	SELECT 
		id 
	FROM (
		SELECT 
			id,
			ROW_NUMBER() OVER (
				PARTITION BY email
				ORDER BY email) AS row_num
		FROM 
			contacts
		
	) t
    WHERE row_num > 1
);
{% endhighlight %}
<p>In this tutorial, you have learned how to delete duplicate rows in MySQL.</p>
