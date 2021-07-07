---
layout: post
title:  "Hibernate - Mapping Types"
date:   2021-07-07 15:30:56
categories: java
description: Hibernate - Mapping Types
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: When you prepare a Hibernate mapping document, you find that you map the Java data types into RDBMS data types. The types declared and used in the mapping files are not Java data types; they are not SQL database types either. These types are called Hibernate mapping types, which can translate from Java to SQL data types and vice versa.
---
<p>When you prepare a Hibernate mapping document, you find that you map the Java data types into RDBMS data types. The <b>types</b> declared and used in the mapping files are not Java data types; they are not SQL database types either. These types are called <b>Hibernate mapping types</b>, which can translate from Java to SQL data types and vice versa.</p>
<p>This chapter lists down all the basic, date and time, large object, and various other builtin mapping types.</p>
<h2>Primitive Types</h2>
<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<th style="width:25%;text-align:center;">Mapping type</th>
<th style="text-align:center;">Java type</th>
<th style="width:30%;text-align:center;">ANSI SQL Type</th>
</tr>
<tr>
<td>integer</td>
<td>int or java.lang.Integer</td>
<td>INTEGER</td>
</tr>
<tr>
<td>long</td>
<td>long or java.lang.Long</td>
<td>BIGINT</td>
</tr>
<tr>
<td>short</td>
<td>short or java.lang.Short</td>
<td>SMALLINT</td>
</tr>
<tr>
<td>float</td>
<td>float or java.lang.Float</td>
<td>FLOAT</td>
</tr>
<tr>
<td>double</td>
<td>double or java.lang.Double</td>
<td>DOUBLE</td>
</tr>
<tr>
<td>big_decimal</td>
<td>java.math.BigDecimal</td>
<td>NUMERIC</td>
</tr>
<tr>
<td>character</td>
<td>java.lang.String</td>
<td>CHAR(1)</td>
</tr>
<tr>
<td>string</td>
<td>java.lang.String</td>
<td>VARCHAR</td>
</tr>
<tr>
<td>byte</td>
<td>byte or java.lang.Byte</td>
<td>TINYINT</td>
</tr>
<tr>
<td>boolean</td>
<td>boolean or java.lang.Boolean</td>
<td>BIT</td>
</tr>
<tr>
<td>yes/no</td>
<td>boolean or java.lang.Boolean</td>
<td>CHAR(1) ('Y' or 'N')</td>
</tr>
<tr>
<td>true/false</td>
<td>boolean or java.lang.Boolean</td>
<td>CHAR(1) ('T' or 'F')</td>
</tr>
</tbody></table>
<h2>Date and Time Types</h2>
<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<th style="width:25%;text-align:center;">Mapping type</th>
<th style="text-align:center;">Java type</th>
<th style="width:25%;text-align:center;">ANSI SQL Type</th>
</tr>
<tr>
<td>date</td>
<td>java.util.Date or java.sql.Date</td>
<td>DATE</td>
</tr>
<tr>
<td>time</td>
<td>java.util.Date or java.sql.Time</td>
<td>TIME</td>
</tr>
<tr>
<td>timestamp</td>
<td>java.util.Date or java.sql.Timestamp</td>
<td>TIMESTAMP</td>
</tr>
<tr>
<td>calendar</td>
<td>java.util.Calendar</td>
<td>TIMESTAMP</td>
</tr>
<tr>
<td>calendar_date</td>
<td>java.util.Calendar</td>
<td>DATE</td>
</tr>
</tbody></table>
<h2>Binary and Large Object Types</h2>
<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<th style="width:25%;text-align:center;">Mapping type</th>
<th style="text-align:center;">Java type</th>
<th style="width:25%;text-align:center;">ANSI SQL Type</th>
</tr>
<tr>
<td style="vertical-align:middle;">binary</td>
<td style="vertical-align:middle;">byte[]</td>
<td>VARBINARY (or BLOB)</td>
</tr>
<tr>
<td>text</td>
<td>java.lang.String</td>
<td>CLOB</td>
</tr>
<tr>
<td style="vertical-align:middle;">serializable</td>
<td>any Java class that implements java.io.Serializable</td>
<td>VARBINARY (or BLOB)</td>
</tr>
<tr>
<td>clob</td>
<td>java.sql.Clob</td>
<td>CLOB</td>
</tr>
<tr>
<td>blob</td>
<td>java.sql.Blob</td>
<td>BLOB</td>
</tr>
</tbody></table>
<h2>JDK-related Types</h2>
<table class="table table-bordered" style="text-align:center;">
<tbody><tr>
<th style="width:25%;text-align:center;">Mapping type</th>
<th style="text-align:center;">Java type</th>
<th style="width:25%;text-align:center;">ANSI SQL Type</th>
</tr>
<tr>
<td>class</td>
<td>java.lang.Class</td>
<td>VARCHAR</td>
</tr>
<tr>
<td>locale</td>
<td>java.util.Locale</td>
<td>VARCHAR</td>
</tr>
<tr>
<td>timezone</td>
<td>java.util.TimeZone</td>
<td>VARCHAR</td>
</tr>
<tr>
<td>currency</td>
<td>java.util.Currency</td>
<td>VARCHAR</td>
</tr>
</tbody></table>
