---
layout: post
title:  "PostgreSQL Server Programming"
date:   2016-08-12 16:46:56
categories: SQL
description: PostgreSQL Server Programming
keywords: [Andrei Pall, blog, jekyll, sql, framework]
excerpt: PostgreSQL is a powerful, open source object-relational database system. It has a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux and UNIX (AIX, BSD, HP-UX, SGI IRIX, Mac OS X, Solaris, Tru64).
---

PostgreSQL is a powerful, open source object-relational database system. It has a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux and UNIX (AIX, BSD, HP-UX, SGI IRIX, Mac OS X, Solaris, Tru64).

Let’s start with a simple example. Many	applications include a list	of customers who have a balance in	their account. We’ll use this sample schema	and	data:
{% highlight sql %}
CREATE TABLE accounts(owner text, balance numeric, amount numeric);
INSERT INTO accounts VALUES ('Bob', 100, 4467678);
INSERT INTO accounts VALUES ('Mary', 200, 7897989);
{% endhighlight %}
If anything fails, then none of the transactions will happen:
{% highlight sql %}
BEGIN;
UPDATE accounts	SET	amount = amount	- 14.00	WHERE owner	= 'Bob';
UPDATE accounts	SET	amount = amount	+ 14.00	WHERE owner	= 'Mary';
COMMIT;
{% endhighlight %}
PostgreSQL includes its own programming language named PL/pgSQL that is aimed to
integrate easily with SQL commands:
{% highlight sql %}
CREATE OR REPLACE FUNCTION transfer( 
              i_payer text, 
              i_recipient text, 
              i_amount numeric(15,2))
RETURNS text 
AS
$$
DECLARE
  payer_bal numeric;
BEGIN
  SELECT balance INTO payer_bal FROM accounts WHERE owner = i_payer;
  
  IF NOT FOUND THEN
    RETURN 'Payer account not found';
  END IF;
  
  IF payer_bal < i_amount THEN
    RETURN 'Not enough funds';
  END IF;

  UPDATE accounts SET balance = balance + i_amount WHERE owner = i_recipient;

  IF NOT FOUND THEN
    RETURN 'Recipient does not exist';
  END IF;

  UPDATE accounts SET balance = balance - i_amount WHERE owner = i_payer;
   
  RETURN 'OK';
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}

{% highlight sql %}
SELECT * FROM accounts;
SELECT * FROM transfer('Bob','Mary',14.00);
SELECT * FROM accounts;
{% endhighlight %}
<h3>Data comparisons using operators</h3>
For more complex tasks, you can define your own types, operators, and casts from one type to another, letting you actually compare apples and oranges:
{% highlight sql %}
CREATE TYPE FRUIT_QTY as (name text, qty int);
SELECT '("APPLE", 3)'::FRUIT_QTY;
{% endhighlight %}

{% highlight sql %}
CREATE FUNCTION fruit_qty_larger_than(left_fruit FRUIT_QTY,
                                      right_fruit FRUIT_QTY)
RETURNS BOOL
AS $$
BEGIN
    IF (left_fruit.name = 'APPLE' AND right_fruit.name = 'ORANGE')
    THEN
        RETURN left_fruit.qty > (1.5 * right_fruit.qty);
    END IF;
    IF (left_fruit.name = 'ORANGE' AND right_fruit.name = 'APPLE' )
    THEN
        RETURN (1.5 * left_fruit.qty) > right_fruit.qty;
    END IF;
    RETURN  left_fruit.qty > right_fruit.qty;
END;
$$
LANGUAGE plpgsql;
{% endhighlight %}

{% highlight sql %}
SELECT fruit_qty_larger_than('("APPLE", 3)'::FRUIT_QTY,'("ORANGE", 2)'::FRUIT_QTY);

SELECT fruit_qty_larger_than('("APPLE", 4)'::FRUIT_QTY,'("ORANGE", 2)'::FRUIT_QTY);
{% endhighlight %}

{% highlight sql %}
CREATE OPERATOR > (
    leftarg = FRUIT_QTY,
    rightarg = FRUIT_QTY,
    procedure = fruit_qty_larger_than,
    commutator = >
);
{% endhighlight %}

{% highlight sql %}
SELECT '("ORANGE", 2)'::FRUIT_QTY > '("APPLE", 2)'::FRUIT_QTY;
SELECT '("ORANGE", 2)'::FRUIT_QTY > '("APPLE", 3)'::FRUIT_QTY;
{% endhighlight %}
<h3>Managing related data with triggers</h3>
Server programming can also mean setting up automated actions (TRIGGERS), so that some operations in the database cause some other things to happen as well.
For example, you can set up a process where making an offer on some items automatically reserved them in the stock table.
So let's create a fruit stock table:
{% highlight sql %}
CREATE TABLE fruits_in_stock (
    name text PRIMARY KEY,
    in_stock integer NOT NULL,
    reserved integer NOT NULL DEFAULT 0,
    CHECK (in_stock between 0 and 1000 ),
    CHECK (reserved <= in_stock)
);

CREATE TABLE fruit_offer (
    offer_id serial PRIMARY KEY,
    recipient_name text,
    offer_date timestamp default current_timestamp,
    fruit_name text REFERENCES fruits_in_stock,
    offered_amount integer
);
{% endhighlight %}
The offer table has an ID for the offer (so you can distinguish between offers later), recipient, date, offered fruit name, and offered amount.
For automating the reservation management, you first need a trigger function, which implements the management logic:
{% highlight sql %}
CREATE OR REPLACE FUNCTION reserve_stock_on_offer () RETURNS trigger AS $$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            UPDATE fruits_in_stock
	       SET reserved = reserved + NEW.offered_amount
	     WHERE name = NEW.fruit_name;
	ELSIF TG_OP = 'UPDATE' THEN
	    UPDATE fruits_in_stock
	       SET reserved = reserved - OLD.offered_amount
                                     + NEW.offered_amount
	     WHERE name = NEW.fruit_name;
	ELSIF TG_OP = 'DELETE' THEN
	   UPDATE fruits_in_stock
	      SET reserved = reserved - OLD.offered_amount
	    WHERE name = OLD.fruit_name;
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
You have to tell PostgreSQL to call this function each and every time the offer row is changed:
{% highlight sql %}
CREATE TRIGGER manage_reserve_stock_on_offer_change
AFTER INSERT OR UPDATE OR DELETE ON fruit_offer
    FOR EACH ROW EXECUTE PROCEDURE reserve_stock_on_offer();
{% endhighlight %}
After this we are ready to test the functionality.
First, we will add some fruit to our stock:
{% highlight sql %}
INSERT INTO fruits_in_stock VALUES('APPLE',500);
INSERT INTO fruits_in_stock VALUES('ORANGE',500);
SELECT * FROM fruits_in_stock;

INSERT INTO fruit_offer(recipient_name,fruit_name,offered_amount) VALUES('Bob','APPLE',100);
SELECT * FROM fruit_offer;
SELECT * FROM fruits_in_stock;

UPDATE fruit_offer SET offered_amount = 115 WHERE offer_id = 1;
SELECT * FROM fruits_in_stock;

DELETE FROM fruit_offer WHERE offer_id = 1;
SELECT * FROM fruits_in_stock;
{% endhighlight %}
<h3>Auditing changes</h3>
{% highlight sql %}
CREATE TABLE salaries(
	emp_name text PRIMARY KEY,
	salary integer NOT NULL
);

CREATE TABLE salary_change_log(	
	changed_by text DEFAULT CURRENT_USER,
	changed_at timestamp DEFAULT CURRENT_TIMESTAMP,
	salary_op text,
	emp_name text,
	old_salary integer,
	new_salary integer
);
REVOKE ALL ON salary_change_log FROM PUBLIC;
GRANT ALL ON salary_change_log TO managers;
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION log_salary_change () RETURNS trigger AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
	INSERT INTO salary_change_log(salary_op,emp_name,new_salary) VALUES (TG_OP,NEW.emp_name,NEW.salary);
	ELSIF TG_OP = 'UPDATE' THEN
	INSERT INTO salary_change_log(salary_op,emp_name,old_salary,new_salary) VALUES (TG_OP,NEW.emp_name,OLD.salary,NEW.salary);
	ELSIF TG_OP = 'DELETE' THEN
	INSERT INTO salary_change_log(salary_op,emp_name,old_salary) VALUES (TG_OP,NEW.emp_name,OLD.salary);
	END IF;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_salary_change
AFTER INSERT OR UPDATE OR DELETE ON salaries
FOR EACH ROW EXECUTE PROCEDURE log_salary_change ();
{% endhighlight %}

{% highlight sql %}
INSERT INTO	salaries values('Bob',1000);
UPDATE salaries	SET	salary = 1100 WHERE emp_name = 'Bob';
INSERT INTO salaries VALUES('Mary',1000);
UPDATE salaries SET salary = salary	+ 200;
SELECT * FROM salaries;
{% endhighlight %}
{% highlight bash %}
-[	RECORD	1	]--
emp_name	|	Bob
salary		|	1300
-[	RECORD	2	]--
emp_name	|	Mary
salary		|	1200
{% endhighlight %}
{% highlight sql %}
SELECT * FROM salary_change_log;
{% endhighlight %}
Each one of these changes is saved into the salary change log table for auditing purposes:
{% highlight bash %}
-[	RECORD	1	]--------------------------
changed_by	|	frank
changed_at	|	2012-01-25	15:44:43.311299
salary_op	|	INSERT
emp_name	|	Bob
old_salary	|	
new_salary	|	1000
-[	RECORD	2	]--------------------------
changed_by	|	frank
changed_at	|	2012-01-25	15:44:43.313405
salary_op	|	UPDATE
emp_name	|	Bob
old_salary	|	1000
new_salary	|	1100
-[	RECORD	3	]--------------------------
changed_by	|	frank
changed_at	|	2012-01-25	15:44:43.314208
salary_op	|	INSERT
emp_name	|	Mary
old_salary	|	
new_salary	|	1000
-[	RECORD	4	]--------------------------
changed_by	|	frank
changed_at	|	2012-01-25	15:44:43.314903
salary_op	|	UPDATE
emp_name	|	Bob
old_salary	|	1100
new_salary	|	1300
-[	RECORD	5	]--------------------------
changed_by	|	frank
changed_at	|	2012-01-25	15:44:43.314903
salary_op	|	UPDATE
emp_name	|	Maryold_salary	|	1000
new_salary	|	1200
{% endhighlight %}
Also, give users access to only two functions: the first function is for any user taking a look at salaries and the other function can be used to change salaries, which is available only to managers.
The	functions will have	all	the	access to the underlying tables	because they are declared as SECURITY DEFINER, which	means that they	run	with the privileges	of the user	who	created them.
This is how the salary lookup function will look:
{% highlight sql %}
CREATE OR REPLACE FUNCTION get_salary(text)
RETURNS integer
AS $$
 -- if you look at other people's salaries, it gets logged
 INSERT INTO salary_change_log(salary_op,emp_name,new_salary)
 SELECT 'SELECT',emp_name,salary
 FROM salaries
 WHERE upper(emp_name) = upper($1)
 AND upper(emp_name) != upper(CURRENT_USER);
 -- don't log select of own salary
 -- return the requested salary
 SELECT salary FROM salaries WHERE upper(emp_name) = upper($1);
$$ LANGUAGE SQL SECURITY DEFINER;
{% endhighlight %}
The set_salary() function abstracts away the need to check whether the user exists;	if the user does not exist, it is created. Setting someone’s salary to 0 will remove him or her from the salary table. Thus, the interface is simplified to a large extent, and the client application of these functions needs to know, and do, less:
{% highlight sql %}
CREATE OR REPLACE FUNCTION set_salary(i_emp_name text, i_salary int)
RETURNS TEXT AS $$
DECLARE
 old_salary integer;
BEGIN
 SELECT salary INTO old_salary
 FROM salaries
 WHERE upper(emp_name) = upper(i_emp_name);
   IF NOT FOUND THEN
   INSERT INTO salaries VALUES(i_emp_name, i_salary);
   INSERT INTO salary_change_log(salary_op,emp_name,new_salary)
   VALUES ('INSERT',i_emp_name,i_salary);
   RETURN 'INSERTED USER ' || i_emp_name;
   ELSIF i_salary > 0 THEN
   UPDATE salaries
   SET salary = i_salary
   WHERE upper(emp_name) = upper(i_emp_name);
   INSERT INTO salary_change_log(salary_op,emp_name,old_salary,new_salary) VALUES ('UPDATE',i_emp_name,old_salary,i_salary);
   RETURN 'UPDATED USER ' || i_emp_name;
   ELSE -- salary set to 0
   DELETE FROM salaries WHERE upper(emp_name) = upper(i_emp_name);
   INSERT INTO salary_change_log(salary_op,emp_name,old_salary) VALUES ('DELETE',i_emp_name,old_salary);
   RETURN 'DELETED USER ' || i_emp_name;
   END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
{% endhighlight %}
Now, drop the audit trigger (otherwise the changes will be logged twice) and test the new functionality:
{% highlight sql %}
DROP TRIGGER audit_salary_change ON salaries;
SELECT set_salary('Fred',750);
SELECT set_salary('frank',100);
SELECT * FROM salaries;
{% endhighlight %}
{% highlight bash %}
-[	RECORD	1	]---
emp_name	|	Bob
salary		|	1300
-[	RECORD	2	]---
emp_name	|	Mary
salary		|	1200
-[	RECORD	3	]---
emp_name	|	Fred
salary		|	750
-[	RECORD	4	]---
emp_name	|	frank
salary		|	100
{% endhighlight %}
{% highlight sql %}
SELECT set_salary('mary',0);
{% endhighlight %}
{% highlight bash %}
-[	RECORD	1	]-----------------
set_salary | DELETED USER mary
{% endhighlight %}
{% highlight sql %}
SELECT * FROM salaries;
{% endhighlight %}

{% highlight sql %}
-[	RECORD	1	]---
emp_name	|	Bob
salary		|	1300
-[	RECORD	2	]---
emp_name	|	Fred
salary		|	750
-[	RECORD	3	]---
emp_name	|	frank
salary		|	100
{% endhighlight %}
{% highlight sql %}
SELECT * FROM salary_change_log;
{% endhighlight %}
{% highlight bash %}
...
-[	RECORD	6	]--------------------------
changed_by	|	gsmith
changed_at	|	2013-01-25	15:57:49.057592
salary_op	|	INSERT
emp_name	|	Fred
old_salary	|	
new_salary	|	750
-[	RECORD	7	]--------------------------
changed_by	|	gsmith
changed_at	|	2013-01-25	15:57:49.062456
salary_op	|	INSERT
emp_name	|	frank
old_salary	|	
new_salary	|	100
-[	RECORD	8	]--------------------------
changed_by	|	gsmith
changed_at	|	2013-01-25	15:57:49.064337
salary_op	|	DELETE
emp_name	|	mary
old_salary	|	1200
new_salary	|
{% endhighlight %}
<h3>Data cleaning</h3>
{% highlight sql %}
CREATE OR REPLACE FUNCTION uppercase_name ()
RETURNS trigger AS $$
BEGIN
	NEW.emp_name = upper(NEW.emp_name);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER uppercase_emp_name
BEFORE INSERT OR UPDATE OR DELETE ON salaries
 FOR EACH ROW EXECUTE PROCEDURE uppercase_name ();
{% endhighlight %}
{% highlight sql %}
SELECT set_salary('arnold',80);
SELECT * FROM salaries;
{% endhighlight %}
{% highlight bash %}
-[	RECORD	1	]---
emp_name	|	Bob
salary		|	1300
-[	RECORD	2	]---
emp_name	|	Fred
salary		|	750
-[	RECORD	3	]---
emp_name	|	Frank
salary		|	100
-[	RECORD	4	]---
emp_name	|	ARNOLD
salary		|	80
{% endhighlight %}
After fixing the existing mixed-case employee names, we can make sure that all employee names will be uppercased in the future by adding a constraint:
{% highlight sql %}
alter table salaries add constraint	emp_name_must_be_uppercasepostgres CHECK (emp_name = upper(emp_name));
{% endhighlight %}
<h3>Conditional	expressions</h3>
{% highlight sql %}
CREATE OR REPLACE FUNCTION format_us_full_name(
                             prefix text, firstname text, 
                             mi text, lastname text, 
                             suffix text)
  RETURNS text AS
$$
DECLARE
        fname_mi text;
        fmi_lname text;
        prefix_fmil text;
        pfmil_suffix text;
BEGIN        
        fname_mi := CONCAT_WS(' ',
                                  CASE trim(firstname) 
                                    WHEN '' 
                                    THEN NULL 
                                    ELSE firstname 
                                  END, 
                                  CASE trim(mi) 
                                    WHEN '' 
                                    THEN NULL 
                                    ELSE mi 
                                  END || '.');
        fmi_lname := CONCAT_WS(' ',
                                   CASE fname_mi 
                                     WHEN '' 
                                     THEN NULL 
                                     ELSE fname_mi 
                                   END,
                                   CASE trim(lastname) 
                                     WHEN '' 
                                     THEN NULL 
                                     ELSE lastname 
                                   END);
        prefix_fmil := CONCAT_WS('. ',
                                      CASE trim(prefix) 
                                        WHEN '' 
                                        THEN NULL 
                                        ELSE prefix 
                                      END, 
                                      CASE fmi_lname 
                                        WHEN '' 
                                        THEN NULL 
                                        ELSE fmi_lname 
                                      END);
        pfmil_suffix := CONCAT_WS(', ',
                                       CASE prefix_fmil 
                                         WHEN '' 
                                         THEN NULL 
                                         ELSE prefix_fmil 
                                       END, 
                                       CASE trim(suffix) 
                                         WHEN '' 
                                         THEN NULL 
                                         ELSE suffix || '.' 
                                       END);        
        RETURN pfmil_suffix;
END;
$$
LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT format_us_full_name('Mr', 'Martin', 'L', 'King', 'Jr');
{% endhighlight %}
{% highlight bash %}
	format_us_full_name
-------------------------
	Mr.	Martin	L.	King,	Jr.
{% endhighlight %}
Loops with counters
{% highlight sql %}
CREATE OR REPLACE FUNCTION fib(n integer) 
  RETURNS decimal(1000,0) 
AS $$
  DECLARE counter integer := 0;
  DECLARE a decimal(1000,0) := 0;
  DECLARE b decimal(1000,0) := 1;
BEGIN
  IF (n < 1) THEN
    RETURN 0;
  END IF;

  LOOP
    EXIT WHEN counter = n;
    counter := counter + 1;
    SELECT  b,a+b INTO a,b;
  END LOOP;
  
  RETURN a;
END;
$$
  LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT fib(4);
{% endhighlight %}
Looping through query results
{% highlight sql %}
FOR	row	IN	
EXECUTE 'SELECT * FROM job_queue q WHERE NOT processed LIMIT 100'	
LOOP	
	CASE row.process_type
		WHEN 'archive_point_of_sale'
			THEN INSERT INTO hist_orders (...)	
				 SELECT... FROM orders	
					INNER JOIN order_detail...	
					INNER JOIN item...;
		WHEN 'prune_archived_orders'
			THEN DELETE FROM order_detail	
				  WHERE order_id in (SELECT order_id FROM hist_orders);
				 DELETE FROM orders	
				  WHERE order_id IN (SELECT order_id FROM hist_orders);
		ELSE
			RAISE NOTICE 'Unknown process_type: %', row.process_type;
	END;
	UPDATE job_queue SET processed = TRUE WHERE id = q.id;
END LOOP;
{% endhighlight %}
The following is an example from the PostgreSQL documentation that shows dynamic
commands running inside a loop:
{% highlight sql %}
CREATE FUNCTION cs_refresh_mviews() RETURNS integer AS $$
DECLARE
	mviews	RECORD;
BEGIN
	PERFORM cs_log('Refreshing materialized views...');
	FOR mviews IN SELECT * FROM cs_materialized_views ORDER BY sort_key	
LOOP
	--Now "mviews" has one record from cs_materialized_views
	PERFORM cs_log('Refreshing materialized view ' || quote_ident(mviews.mv_name) || ' ...');
	EXECUTE 'TRUNCATE TABLE ' || quote_ident(mviews.mv_name);
	EXECUTE 'INSERT INTO ' || quote_ident(mviews.mv_name) || ' ' ||mviews.mv_query;
END	LOOP;
	PERFORM cs_log('Done refreshing materialized views.');
	RETURN	1;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
Looping Through Arrays
{% highlight sql %}
CREATE FUNCTION findmax(int[]) RETURNS int8 AS $$
DECLARE
	max int8 := 0;
	x int;
BEGIN
	FOREACH x IN ARRAY $1
	LOOP
	  IF x > max THEN
		max := x;
	  END IF;
	END LOOP;
	RETURN max;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
select findmax(ARRAY[1,2,3,4,5,	-1]);
{% endhighlight %}
Returning a record
So far, all of our function examples have featured a simple scalar value in the	 RETURN clause. In PL/pgSQL, you can also define set-returning functions (SRF). These functions can return either a type defined by an existing table or a generic record type. Let’s take a look at a simple example:
{% highlight sql %}
CREATE TABLE names(id serial, name varchar);
INSERT INTO names(name) VALUES('John');
INSERT INTO names(name) VALUES('Martin');
INSERT INTO names(name) VALUES('Peter');

CREATE OR REPLACE FUNCTION GetNames() RETURNS SETOF names AS 'SELECT * FROM names;'	LANGUAGE 'sql';
{% endhighlight %}
{% highlight sql %}
select GetNames();

getnames
------------
	(1,John)
	(2,Martin)
	(3,Peter)
(3	rows)
{% endhighlight %}
{% highlight sql %}
select * from GetNames() where id > 2;
{% endhighlight %}
{% highlight bash %}
id	|	name
----+-------
3	|	Peter
(1	row)
{% endhighlight %}
{% highlight sql %}
CREATE TYPE nametype AS (id int, name varchar);
CREATE FUNCTION PlpgGetNames() RETURNS SETOF nametype AS
$$
DECLARE
r nametype%rowtype;
BEGIN
	FOR r IN SELECT id, name FROM names LOOP
		RETURN	NEXT	r;
	END	LOOP;
	RETURN;
END	;
$$ LANGUAGE 'plpgsql';
{% endhighlight %}
{% highlight sql %}
SELECT PlpgGetNames();

	plpggetnames	
--------------
	(1,John)
	(2,Martin)
	(3,Peter)
(3	rows)
{% endhighlight %}
{% highlight sql %}
CREATE TABLE application_settings_old (
		version varchar(200),
		key varchar(200),
		value varchar(2000)
);

CREATE TABLE  application_settings_new (
		version varchar(200),
		full_name varchar(2000),
		description varchar(2000),
		print_certificate varchar(2000),
		show_advertisements varchar(2000),
		show_splash_screen varchar(2000)
);
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION 
    flatten_application_settings(app_version varchar(200))
RETURNS setof application_settings_new
AS $$
BEGIN
    -- Create a temporary table to hold a single row of data
    IF EXISTS (SELECT relname FROM pg_class WHERE relname='tmp_settings') 
    THEN
      TRUNCATE TABLE tmp_settings;
    ELSE
      CREATE TEMP TABLE tmp_settings (LIKE application_settings_new);
    END IF;

    -- the row will contain all of the data for this application version
    INSERT INTO tmp_settings (version) VALUES (app_version);

    -- add the details to the record for this application version
    UPDATE tmp_settings
    SET full_name = (SELECT value 
                       FROM application_settings_old 
                      WHERE version = app_version 
                        AND key='full_name'),
        description = (SELECT value 
                         FROM application_settings_old 
                        WHERE version = app_version 
                          AND key='description'),
        print_certificate = (SELECT value 
                               FROM application_settings_old 
                              WHERE version = app_version 
                                AND key='print_certificate'),
        show_advertisements = (SELECT value 
                                 FROM application_settings_old 
                                WHERE version = app_version 
                                  AND key='show_advertisements'),
        show_splash_screen = (SELECT value 
                                FROM application_settings_old 
                               WHERE version = app_version 
                                 AND key='show_splash_screen');

    --  hand back the results to the caller
    RETURN QUERY SELECT * FROM tmp_settings;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
INSERT INTO application_settings_new
SELECT ( flatten_application_settings(version)).*
FROM (
    SELECT version
    FROM application_settings_old
    GROUP BY version
) As ver;

SELECT fib(25);

SELECT (flatten_application_settings('9.08.97'));

SELECT * FROM flatten_application_settings('9.08.97');

UPDATE application_settings_new 
   SET full_name = flat.full_name,
       description  = flat.description,
       print_certificate = flat.print_certificate,
       show_advertisements = flat.show_advertisements,
       show_splash_screen = flat.show_splash_screen  
  FROM flatten_application_settings('9.08.97') flat;
{% endhighlight %}
<h3>Sets and arrays</h3>
Returning a set of integers
{% highlight sql %}
CREATE OR REPLACE FUNCTION fibonacci_seq(num integer)
  RETURNS SETOF integer AS $$
DECLARE
    a int := 0;
    b int := 1;
BEGIN
    IF (num <= 0)
        THEN RETURN;
    END IF;

    RETURN NEXT a;
    LOOP
        EXIT WHEN num <= 1;
        RETURN NEXT b;

        num = num - 1;
        SELECT b, a + b INTO a, b;
    END LOOP;
END;
$$ language plpgsql;
{% endhighlight %}
{% highlight bash %}
SELECT fibonacci_seq(5);
	fibonacci_seq	
---------------
	0
	1
	1
	2
	3
(5	rows)
{% endhighlight %}
Using a set returning function
{% highlight bash %}
SELECT * FROM fibonacci_seq(3);

	fibonacci_seq	
---------------
	0
	1
	1
(3	rows)
{% endhighlight %}
{% highlight bash %}
SELECT * FROM fibonacci_seq(3) WHERE 1 = ANY(SELECT fibonacci_seq(3));

	fibonacci_seq	
---------------
	0
	1
	1
(3	rows)
{% endhighlight %}
{% highlight bash %}
SELECT * FROM fibonacci_seq(10) as fib WHERE fib > 3;
	fibonacci_seq	
---------------
	5
	8
	13
	21
	34
(5	rows)
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION installed_languages()
  RETURNS SETOF pg_language AS $$
BEGIN
    RETURN QUERY SELECT * FROM  pg_language;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM installed_languages();
-[	RECORD	1	]-+----------
lanname			|	internal
lanowner		|	10
lanispl			|	f
lanpltrusted	|	f
lanplcallfoid	|	0
laninline		|	0
lanvalidator	|	2246
lanacl			|	
-[	RECORD	2	]-+----------
lanname			|	c
lanowner		|	10
lanispl			|	f
lanpltrusted	|	f
lanplcallfoid	|	0
laninline		|	0
lanvalidator	|	2247
lanacl			|	
-[	RECORD	3	]-+----------
lanname			|	sql
lanowner		|	10
lanispl			|	f
lanpltrusted	|	t
lanplcallfoid	|	0
laninline		|	0
lanvalidator	|	2248
lanacl			|	
-[	RECORD	4	]-+----------
lanname			|	plpgsql
lanowner		|	10
lanispl			|	t
lanpltrusted	|	t
lanplcallfoid	|	12596
laninline		|	12597
lanvalidator	|	12598
lanacl			|	
-[	RECORD	5	]-+----------
lanname			|	plpythonu
lanowner		|	10
lanispl			|	t
lanpltrusted	|	f
lanplcallfoid	|	17563
laninline		|	17564
lanvalidator	|	17565
lanacl			|	
{% endhighlight %}
Functions based on views
{% highlight bash %}
SELECT * FROM pg_stat_activity WHERE state='active';

-[	RECORD	1	]----+--------------------------------
datid				|	17557
datname				|	hannu
pid					|	8933
usesysid			|	10
usename				|	postgres
application_name	|	psql
client_addr			|	
client_hostname		|	
client_port			|	-1
backend_start		|	2013-03-19	13:47:45.920902-04
xact_start			|	2013-03-19	14:05:47.91225-04
query_start			|	2013-03-19	14:05:47.91225-04
state_change		|	2013-03-19	14:05:47.912253-04
waiting				|	f
state				|	active
query				|	select * from pg_stat_activity | where state='active';
{% endhighlight %}
{% highlight sql %}
CREATE VIEW running_queries AS
SELECT
	(CURRENT_TIMESTAMP - query_start) as runtime,
	pid,
	usename,
	waiting,
	query
FROM pg_stat_activity
WHERE state='active'
ORDER BY 1 DESC
LIMIT 10;
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION running_queries(rows int, qlen int)
  RETURNS SETOF running_queries AS
$$
BEGIN
   RETURN QUERY SELECT
      runtime,
      pid,
      usename,
      waiting,
      substring(query,1,qlen) as query
   FROM running_queries
   ORDER BY 1 DESC
   LIMIT rows;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION running_queries(rows int, qlen int)
  RETURNS SETOF running_queries AS
$$
BEGIN
   RETURN QUERY SELECT
      runtime,
      pid,
      usename,
      waiting,
     (CASE WHEN ( usename= session_user )
        OR (select usesuper
              from pg_user
             where usename = session_user)
      THEN
        substring(query,1,qlen)
      ELSE
        substring(ltrim(query), 1, 6) || ' ***'
      END) as query,
      appname   
    FROM running_queries
   ORDER BY 1 DESC
   LIMIT rows;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM running_queries(5,25);
{% endhighlight %}
OUT parameters and records
{% highlight sql %}
CREATE OR REPLACE FUNCTION positives(
                     INOUT a int, 
                     INOUT b int, 
                     INOUT c int)
AS $$
BEGIN
    IF a < 0 THEN a = null; END IF;
    IF b < 0 THEN b = null; END IF;
    IF c < 0 THEN c = null; END IF;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM positives(-1,	1,	2);

-[ RECORD 1 ]
a	|	
b	|	1
c	|	2
{% endhighlight %}
Returning records
{% highlight sql %}
CREATE FUNCTION permutations(INOUT a int, 
                             INOUT b int, 
                             INOUT c int)
RETURNS SETOF RECORD
AS $$
BEGIN
    RETURN NEXT;
    SELECT b,c INTO c,b; RETURN NEXT;
    SELECT a,b INTO b,a; RETURN NEXT;
    SELECT b,c INTO c,b; RETURN NEXT;
    SELECT a,b INTO b,a; RETURN NEXT;
    SELECT b,c INTO c,b; RETURN NEXT;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM permutations(1, 2, 3);
-[	RECORD	1	]
a	|	1
b	|	2
c	|	3
-[	RECORD	2	]
a	|	1
b	|	3
c	|	2
-[	RECORD	3	]
a	|	3
b	|	1
c	|	2
-[	RECORD	4	]
a	|	3
b	|	2
c	|	1
-[	RECORD	5	]
a	|	2
b	|	3
c	|	1
-[	RECORD	6	]
a	|	2
b	|	1
c	|	3
{% endhighlight %}
Using RETURNS TABLE
{% highlight sql %}
CREATE FUNCTION permutations2(ia int, ib int, ic int)
  RETURNS TABLE(a int, b int, c int)
AS $$
BEGIN
  RETURN NEXT a,b,c;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
CREATE TYPE abc AS (a int, b int, c int);

CREATE FUNCTION permutations2(ia int, ib int, ic int)
  RETURNS SETOF abc                 
AS $$
BEGIN
    RETURN NEXT a,b,c;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
Returning with no predefined structure
{% highlight sql %}
CREATE OR REPLACE FUNCTION run_a_query(query TEXT)
  RETURNS SETOF RECORD 
AS $$
DECLARE
    retval RECORD;
BEGIN
    FOR retval IN EXECUTE query LOOP
        RETURN NEXT retval;
    END LOOP ;
END;
$$ LANGUAGE PLPGSQL;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM run_a_query('SELECT usename::text,usesysid::int FROM	
pg_user') AS ("user" text, uid int);
-[	RECORD	1	]--
user	|	postgres
uid		|	10
-[	RECORD	2	]--
user	|	hannu
uid		|	17573
{% endhighlight %}
Returning SETOF ANY
{% highlight sql %}
CREATE OR REPLACE FUNCTION array_to_rows( array_in ANYARRAY )
  RETURNS TABLE(row_out ANYELEMENT)
AS $$
BEGIN
    FOR i IN 1.. array_upper(array_in,1) LOOP
         row_out =  array_in[i];   
         RETURN NEXT ;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT array_to_rows('{1,2,3}'::int[]);
-[	RECORD	1	]-+--
array_to_rows	|	1
-[	RECORD	2	]-+--
array_to_rows	|	2
-[	RECORD	3	]-+--
array_to_rows	|	3
{% endhighlight %}
Variadic argument lists
PostgreSQL allows you to write a function with a variable number of arguments.	This is accomplished using VARIADIC.
{% highlight sql %}
CREATE OR REPLACE FUNCTION get_nspc_tbls(VARIADIC arr name[])
RETURNS TABLE(table_name name,id oid,nspname name)
AS $$
BEGIN 
RETURN QUERY SELECT c.relname , c.oid , n.nspname from pg_class c, 
			pg_namespace n where c.relnamespace = n.oid and n.nspname = any(arr);
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
SELECT * FROM get_nspc_tbls('public','pg_temp');
-[	RECORD	1	]------------------------
table_name	|	a
id			|	16434
nspname		|	public
-[	RECORD	2	]------------------------
table_name	|	parameter
id			|	24682
nspname		|	public
-[	RECORD	3	]------------------------
table_name	|	application_settings_old
id			|	24690
nspname		|	public
-[	RECORD	4	]------------------------
table_name	|	foo
id			|	16455
nspname		|	pg_temp
{% endhighlight %}
Returning cursors
{% highlight sql %}
DECLARE
	curs1 refcursor;
	curs2 CURSOR FOR SELECT * FROM tenk1;
	curs3 CURSOR (key integer) IS SELECT * FROM tenk1 WHERE unique1 = key;
{% endhighlight %}
{% highlight sql %}
CREATE FUNCTION myfunc(refcursor, refcursor) RETURNS SETOF refcursor AS $$
BEGIN
    OPEN $1 FOR SELECT * FROM table_1;
    RETURN NEXT $1;
    OPEN $2 FOR SELECT * FROM table_2;
    RETURN NEXT $2;
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION myfunc2(cur1 refcursor, cur2 refcursor)
RETURNS VOID AS $$
BEGIN
    OPEN cur1 FOR SELECT * FROM table_1;
    OPEN cur2 FOR SELECT * FROM table_2;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
BEGIN;
SELECT * FROM myfunc('a', 'b');
FETCH ALL FROM a;
FETCH ALL FROM b;
COMMIT;
{% endhighlight %}
Iterating over cursors returned from another function
Let’s define our cursor returning function. This function will open a cursor for a query, based on its argument and then return that cursor:
{% highlight sql %}
create table fiverows(id serial primary key, data text);
insert into fiverows(data) values ('one'), ('two'),
                     ('three'), ('four'), ('five');

CREATE FUNCTION curtest1(cur refcursor, tag text) 
  RETURNS refcursor 
AS $$
BEGIN
    OPEN cur FOR SELECT id, data || '+' || tag FROM fiverows;
    RETURN cur;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
Next, we define a function, which uses the function we just created to open two additional cursors, and then process the query results. To show that we are not cheating and that the function really creates the cursors, we use the function	twice and iterate over the results in parallel:
{% highlight sql %}
CREATE FUNCTION curtest2(tag1 text, tag2 text) 
  RETURNS SETOF fiverows 
AS $$
DECLARE
    cur1 refcursor;
    cur2 refcursor;
    row record;
BEGIN
    cur1 = curtest1(NULL, tag1);
    cur2 = curtest1(NULL, tag2);
    LOOP
        FETCH cur1 INTO row;
        EXIT WHEN NOT FOUND ;
        RETURN NEXT row;
        FETCH cur2 INTO row;
        EXIT WHEN NOT FOUND ;
        RETURN NEXT row;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
<h3>PL/pgSQL Trigger Functions</h3>
Creating the trigger function:
{% highlight sql %}
CREATE OR REPLACE FUNCTION notify_trigger() 
  RETURNS TRIGGER AS $$ 
BEGIN 
    RAISE NOTICE 'Hi, I got % invoked FOR % % % on %', 
                               TG_NAME, 
                               TG_LEVEL, 
                               TG_WHEN, 
                               TG_OP, 
                               TG_TABLE_NAME; 
END; 
$$ LANGUAGE plpgsql;

CREATE TABLE notify_test(i int);

CREATE TRIGGER notify_insert_trigger
  AFTER INSERT ON notify_test
  FOR EACH ROW
EXECUTE PROCEDURE notify_trigger();
{% endhighlight %}
{% highlight sql %}
INSERT INTO notify_test	VALUES(1),(2);

NOTICE:	Hi, I got notify_insert_trigger invoked FOR ROW AFTER INSERT on notify_test	
ERROR: control	reached	end	of	trigger	procedure	without	RETURN	
CONTEXT: PL/pgSQL function notify_trigger()
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION notify_trigger()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'Hi, I got % invoked FOR % % % on %',
                               TG_NAME,
                               TG_LEVEL, TG_WHEN, TG_OP, TG_TABLE_NAME;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
{% endhighlight %}
{% highlight sql %}
CREATE TRIGGER notify_update_trigger 
  AFTER UPDATE ON notify_test 
  FOR EACH ROW 
EXECUTE PROCEDURE notify_trigger(); 

CREATE TRIGGER notify_delete_trigger 
  AFTER DELETE ON notify_test 
  FOR EACH ROW 
EXECUTE PROCEDURE notify_trigger();
{% endhighlight %}
{% highlight sql %}
CREATE TRIGGER notify_trigger 
  AFTER INSERT OR UPDATE OR DELETE 
  ON notify_test 
  FOR EACH ROW 
EXECUTE PROCEDURE notify_trigger();
{% endhighlight %}
{% highlight sql %}
CREATE TRIGGER notify_truncate_trigger 
  AFTER TRUNCATE ON notify_test 
  FOR EACH STATEMENT 
EXECUTE PROCEDURE notify_trigger();
{% endhighlight %}
The audit trigger
{% highlight sql %}
CREATE TABLE audit_log (
    username text, -- who did the change
    event_time_utc timestamp, -- when the event was recorded
    table_name text, -- contains schema-qualified table name
    operation text, -- INSERT, UPDATE, DELETE or TRUNCATE
    before_value json, -- the OLD tuple value
    after_value json -- the NEW tuple value
);

CREATE OR REPLACE FUNCTION audit_trigger() 
  RETURNS trigger AS $$ 
DECLARE 
    old_row json := NULL; 
    new_row json := NULL; 
BEGIN 
    IF TG_OP IN ('UPDATE','DELETE') THEN 
        old_row = row_to_json(OLD); 
    END IF; 
    IF TG_OP IN ('INSERT','UPDATE') THEN 
        new_row = row_to_json(NEW); 
    END IF; 
    INSERT INTO  audit_log( 
        username, 
        event_time_utc, 
        table_name, 
        operation, 
        before_value, 
        after_value 
    ) VALUES ( 
        session_user, 
        current_timestamp AT TIME ZONE 'UTC', 
        TG_TABLE_SCHEMA ||  '.' || TG_TABLE_NAME, 
        TG_OP, 
        old_row, 
        new_row 
    ); 
    RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_log 
  AFTER INSERT OR UPDATE OR DELETE 
  ON notify_test 
  FOR EACH ROW 
EXECUTE PROCEDURE audit_trigger();
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION cancel_op() 
  RETURNS TRIGGER AS $$ 
BEGIN 
    IF TG_WHEN = 'AFTER' THEN 
        RAISE EXCEPTION 'YOU ARE NOT ALLOWED TO % ROWS IN %.%', 
                          TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME; 
    END IF; 
    RAISE NOTICE '% ON ROWS IN %.% WON''T HAPPEN', 
                          TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME; 
    RETURN NULL; 
END; 
$$ LANGUAGE plpgsql;

CREATE TABLE delete_test1(i int);

CREATE TRIGGER disallow_delete AFTER DELETE ON delete_test1 FOR EACH ROW  EXECUTE PROCEDURE cancel_op();

CREATE TRIGGER disallow_truncate 
  AFTER TRUNCATE ON delete_test1 
  FOR EACH STATEMENT 
EXECUTE PROCEDURE cancel_op();
{% endhighlight %}
Disallowing DELETE and TRUNCATE
{% highlight sql %}
CREATE OR REPLACE FUNCTION cancel_op() 
  RETURNS TRIGGER AS $$ 
BEGIN 
    IF TG_WHEN = 'AFTER' THEN 
        RAISE EXCEPTION 'YOU ARE NOT ALLOWED TO % ROWS IN %.%', 
                          TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME; 
    END IF; 
    RAISE NOTICE '% ON ROWS IN %.% WON''T HAPPEN', 
                          TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME; 
    RETURN NULL; 
END; 
$$ LANGUAGE plpgsql;

CREATE TABLE delete_test1(i int);

CREATE TRIGGER disallow_delete AFTER DELETE ON delete_test1 FOR EACH ROW  EXECUTE PROCEDURE cancel_op();

CREATE TRIGGER disallow_truncate 
  AFTER TRUNCATE ON delete_test1 
  FOR EACH STATEMENT 
EXECUTE PROCEDURE cancel_op();
{% endhighlight %}
Modifying the NEW record
{% highlight sql %}
CREATE OR REPLACE FUNCTION stamp() 
  RETURNS TRIGGER AS $$ 
BEGIN 
    NEW.last_changed_by = SESSION_USER; 
    NEW.last_changed_at = CURRENT_TIMESTAMP; 
    RETURN NEW; 
END; 
$$ LANGUAGE plpgsql; 

CREATE TABLE modify_test( 
     id serial PRIMARY KEY, 
     data text, 
     created_by text default SESSION_USER, 
     created_at timestamp default CURRENT_TIMESTAMP, 
     last_changed_by text default SESSION_USER, 
     last_changed_at timestamp default CURRENT_TIMESTAMP 
); 

CREATE TRIGGER changestamp 
  BEFORE UPDATE ON modify_test 
  FOR EACH ROW  
EXECUTE PROCEDURE changestamp();
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION usagestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_by = SESSION_USER;
        NEW.created_at = CURRENT_TIMESTAMP;
    ELSE
        NEW.created_by = OLD.created_by;
        NEW.created_at = OLD.created_at;    
    END IF
    NEW.last_changed_by = SESSION_USER;
    NEW.last_changed_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER usagestamp
BEFORE INSERT OR UPDATE ON modify_test
FOR EACH ROW  
EXECUTE PROCEDURE usagestamp();
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION cancel_with_message()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION '%', TG_ARGV[0];
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER no_updates_on_friday_afternoon
BEFORE INSERT OR UPDATE OR DELETE OR TRUNCATE ON new_tasks
FOR EACH STATEMENT
WHEN (CURRENT_TIME > '12:00' AND extract(DOW from CURRENT_TIMESTAMP) = 5)
EXECUTE PROCEDURE cancel_with_message(new_tasks);
{% endhighlight %}
<h2>Event Triggers</h2>
{% highlight sql %}
CREATE TABLE track_ddl
(
  event text, 
  command text, 
  ddl_time timestamp, 
  usr text
);

CREATE OR REPLACE FUNCTION track_ddl_function()
RETURNS event_trigger
AS
$$
BEGIN
  INSERT INTO track_ddl values(tg_tag, tg_event, now(), session_user);
  RAISE NOTICE 'DDL logged';
END
$$ LANGUAGE plpgsql;

CREATE EVENT TRIGGER track_ddl_event ON ddl_command_start
WHEN TAG IN ('CREATE TABLE', 'DROP TABLE', 'ALTER TABLE')
EXECUTE PROCEDURE track_ddl_function();
{% endhighlight %}
{% highlight sql %}
CREATE TABLE event_check(i int);
SELECT * FROM track_ddl;
-[	RECORD	1	]------------------------
event		|	CREATE	TABLE
command		|	ddl_command_start
ddl_time	|	2014-04-13	16:58:40.331385
usr			|	testusr
{% endhighlight %}
{% highlight sql %}
CREATE OR REPLACE FUNCTION abort_create_table_func()
RETURNS event_trigger
AS 
$$
DECLARE
	current_hour int := extract(hour from now());
BEGIN
	if current_hour < 9 and current_hour > 18 and TG_TAG = 'CREATE TABLE'
	then
		RAISE NOTICE 'Not a suitable time to create a table';
	endif;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
{% endhighlight %}
