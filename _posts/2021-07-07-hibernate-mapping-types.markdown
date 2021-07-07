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


<table>
<tbody><tr>
<th>Hibernate type (org.hibernate.type)</th>
<th>JDBC type</th>
<th>Java type</th>
</tr>
<tr>
<td>StringType</td>
<td>VARCHAR</td>
<td>String</td>
</tr>
<tr>
<td>MaterializedClob</td>
<td>CLOB</td>
<td>String</td>
</tr>
<tr>
<td>TextType</td>
<td>LONGVARCHAR</td>
<td>String</td>
</tr>
<tr>
<td>CharacterType</td>
<td>CHAR</td>
<td>char or Character</td>
</tr>
<tr>
<td>BooleanType</td>
<td>BIT</td>
<td>boolean or Boolean</td>
</tr>
<tr>
<td>NumericBooleanType</td>
<td>INTEGER (e.g. 0 = false and 1 = true)</td>
<td>boolean or Boolean</td>
</tr>
<tr>
<td>YesNoType</td>
<td>CHAR (e.g. ‘N’ or ‘n’ = false and ‘Y’ or ‘y’ = true)</td>
<td>boolean or Boolean</td>
</tr>
<tr>
<td>TrueFalseType</td>
<td>CHAR (e.g. ‘F’ or ‘f’ = false and ‘T’ or ‘t’ = true)</td>
<td>boolean or Boolean</td>
</tr>
<tr>
<td>ByteType</td>
<td>TINYINT</td>
<td>byte or Byte</td>
</tr>
<tr>
<td>ShortType</td>
<td>SMALLINT</td>
<td>short or Short</td>
</tr>
<tr>
<td>IntegerType</td>
<td>INTEGER</td>
<td>int or Integer</td>
</tr>
<tr>
<td>LongType</td>
<td>BIGINT</td>
<td>long or Long</td>
</tr>
<tr>
<td>FloatType</td>
<td>FLOAT</td>
<td>float or Float</td>
</tr>
<tr>
<td>DoubleType</td>
<td>DOUBLE</td>
<td>double or Double</td>
</tr>
<tr>
<td>BigIntegerType</td>
<td>NUMERIC</td>
<td>BigInteger</td>
</tr>
<tr>
<td>BigDecimalType</td>
<td>NUMERIC</td>
<td>BigDecimal </td>
</tr>
<tr>
<td>TimestampType</td>
<td>TIMESTAMP</td>
<td>java.sql.Timestamp or java.util.Date</td>
</tr>
<tr>
<td>TimeType</td>
<td>TIME</td>
<td>java.sql.Time</td>
</tr>
<tr>
<td>DateType</td>
<td>DATE</td>
<td>java.sql.Date</td>
</tr>
<tr>
<td>CalendarType</td>
<td>TIMESTAMP</td>
<td>java.util.Calendar or java.util.GregorianCalendar</td>
</tr>
<tr>
<td>CalendarType</td>
<td>DATE</td>
<td>java.util.Calendar or java.util.GregorianCalendar</td>
</tr>
<tr>
<td>CurrencyType</td>
<td>VARCHAR</td>
<td>java.util.Currency</td>
</tr>
<tr>
<td>LocaleType</td>
<td>VARCHAR</td>
<td>java.util.Locale</td>
</tr>
<tr>
<td>TimeZoneType</td>
<td>VARCHAR</td>
<td>java.util.TimeZone</td>
</tr>
<tr>
<td>UrlType</td>
<td>VARCHAR</td>
<td>java.net.URL</td>
</tr>
<tr>
<td>ClassType</td>
<td>VARCHAR</td>
<td>java.lang.Class</td>
</tr>
<tr>
<td>BlobType</td>
<td>BLOB</td>
<td>java.sql.Blob</td>
</tr>
<tr>
<td>ClobType</td>
<td>CLOB</td>
<td>java.sql.Clob</td>
</tr>
<tr>
<td>BinaryType</td>
<td>VARBINARY</td>
<td>byte[] or Byte[]</td>
</tr>
<tr>
<td>BinaryType</td>
<td>BLOB</td>
<td>byte[] or Byte[]</td>
</tr>
<tr>
<td>BinaryType</td>
<td>LONGVARBINARY</td>
<td>byte[] or Byte[]</td>
</tr>
<tr>
<td>BinaryType</td>
<td>LONGVARBINARY</td>
<td>byte[] or Byte[]</td>
</tr>
<tr>
<td>CharArrayType</td>
<td>VARCHAR</td>
<td>char[] or Character[]</td>
</tr>
<tr>
<td>UUIDBinaryType</td>
<td>BINARY</td>
<td>java.util.UUID</td>
</tr>
<tr>
<td>UUIDBinaryType</td>
<td>CHAR or VARCHAR</td>
<td>java.util.UUID</td>
</tr>
<tr>
<td>UUIDBinaryType</td>
<td>PostgreSQL UUID</td>
<td>java.util.UUID</td>
</tr>
<tr>
<td>SerializableType</td>
<td>VARBINARY</td>
<td>Serializable</td>
</tr>
</tbody></table>
