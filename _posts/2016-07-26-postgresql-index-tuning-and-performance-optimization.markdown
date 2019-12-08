---
layout: post
title:  "PostgreSQL Index Tuning and Performance Optimization"
date:   2016-07-26 16:46:56
categories: SQL
description: PostgreSQL Index Tuning and Performance Optimization
keywords: [Andrei Pall, blog, postgresql, sql, framework]
excerpt: PostgreSQL is an object-relational database (ORDBMS) – i.e. an RDBMS, with additional (optional use) "object" features – with an emphasis on extensibility and standards compliance. As a database server, its primary functions are to store data securely and return that data in response to requests from other software applications.
---

PostgreSQL is an object-relational database (ORDBMS) – i.e. an RDBMS, with additional (optional use) "object" features – with an emphasis on extensibility and standards compliance. As a database server, its primary functions are to store data securely and return that data in response to requests from other software applications.

The DVDRental Postgres Sample DB

First, <a title="Download Sample DB" href="/downloads/dvdrental.tar">download the file</a> and put it somewhere on your drive. It's a TAR file (an archive) and you'll use it directly when loading.

To load this up, do this:
{% highlight bash %}
createdb dvdrental
{% endhighlight %}
This will create the sample DB. Then, you'll need to run pg_restore.

If the bin is in your path, you should be able to run pg_restore straight away.

Now, run it:
{% highlight bash %}
pg_restore -d dvdrental /home/andrei/dvdrental.tar
{% endhighlight %}
That's it - you should be good to go.

<h3>EXPLAIN</h3>
EXPLAIN keyword shows the execution plan of a statement with related information
{% highlight sql %}
EXPLAIN SELECT * FROM film;

-- "Seq Scan on film (cost=0.00..64.00 rows=1000 width=384)"
-- COST (disk pages read * seq_page_cost) + (rows scanned ) cpu_tuple_cost)

SELECT relpages AS 'Disk Page Read', reltuples AS 'Rows Scanned' FROM pg_class WHERE relname = 'film';

-- Planner Cost Constants
-- seq_page_cost = estimate of the cost of a disk page fetch. Default = 1
-- cpu_tuple_cost = estimate of the cost of processing each row. Default = 0.01

-- COST (disk pages read * seq_page_cost) + (rows scanned * cpu_tuple_cost)
-- COST (54              * 1.0)           + (1000         * 0.01)
-- COST (54) + (10) = 64

EXPLAIN SELECT * FROM film WHERE film_id > 40;

EXPLAIN SELECT * FROM film WHERE film_id < 40;

EXPLAIN SELECT * FROM film WHERE film_id > 40 AND rating = 'PG-13';

EXPLAIN SELECT * FROM film WHERE film_id < 40 AND rating = 'PG-13';
{% endhighlight %}
<h3>EXPLAIN ANALYZE</h3>
{% highlight sql %}
EXPLAIN ANALYZE SELECT * FROM film;

EXPLAIN ANALYZE SELECT * FROM film WHERE film_id > 40;

EXPLAIN ANALYZE SELECT * FROM film WHERE film_id < 40;

EXPLAIN ANALYZE SELECT * FROM film WHERE film_id > 40 AND rating = 'PG-13';

EXPLAIN ANALYZE SELECT * FROM film WHERE film_id < 40 AND rating = 'PG-13';
{% endhighlight %}
<h3>Improving Query Performance with Indexes</h3>
Index is a specific structure that organizes data and references to the data in such a manner that it is easier as well as faster to look up associated relevant data.
<h4>B-Tree Index</h4>
Use with:
* Equality Queries (<, <=, =, >=, >)
* Range Queries (BETWEEN, IN)
Advantages:
* Retrieving faster data
* Faster SELECT queries
Disadvantages:
* Inserting slower data
* Slower INSERT, UPDATE, DELETE queries

Creating Index
{% highlight sql %}
EXPLAIN ANALYZE SELECT title, length FROM film WHERE length = 60;

CREATE INDEX idx_film_length ON film (length);
{% endhighlight %}
Creating Multicolumn Index (maximum 32 columns)
Cover Index - Index containing all columns needed for a query
{% highlight sql %}
EXPLAIN ANALYZE SELECT title, length, rating, replacement_cost, rental_rate FROM film WHERE length BETWEEN 60 AND 70 AND rating = 'G';

CREATE INDEX idx_film_length ON film (length);
CREATE INDEX idx_film_length_rating ON film (length,rating);
CREATE INDEX idx_film_rating_length ON film (rating,length);
CREATE INDEX idx_film_cover ON film (rating,length,title,replacement_cost,rental_rate);

REINDEX INDEX idx_film_cover;
REINDEX TABLE film;

DROP INDEX idx_film_length;
{% endhighlight %}
Unique Index
Index used to enforce uniqueness of a column's value, or the uniqueness of the combined values of more than one column is known as Unique Index.
{% highlight sql %}
CREATE INDEX idx_SampleTable_id ON SampleTable(id);

ALTER TABLE sampletable ADD CONSTRAINT sampletable_firstcol UNIQUE(firstcol);

CREATE UNIQUE INDEX unq_sampletable_firstcol ON sampletable(firstcol);
{% endhighlight %}
Index and Case Insensitive Search
{% highlight sql %}
SELECT * FROM film WHERE lower(title) = 'arizona bang';

CREATE INDEX film_title_search_lower ON film (lower(title));
{% endhighlight %}
