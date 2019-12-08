---
layout: post
title:  "Java Database Connectivity JDBC Step by Step"
date:   2018-03-27 12:46:56
categories: Java
description: Java Database Connectivity JDBC Step by Step
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Java Database Connectivity (JDBC) is an application programming interface (API) for the programming language Java, which defines how a client may access a database. It is Java based data access technology and used for Java database connectivity.
---
Java Database Connectivity (JDBC) is an application programming interface (API) for the programming language Java, which defines how a client may access a database. It is Java based data access technology and used for Java database connectivity.

In this tutorial we will use a PostgreSQL database.
The contents of the Maven pom.xml file:
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>jdbc</groupId>
  <artifactId>demo</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <dependencies>
	<dependency>
	  <groupId>org.postgresql</groupId>
	  <artifactId>postgresql</artifactId>
	  <version>42.2.2</version>
	</dependency>
  </dependencies>
</project>
{% endhighlight %}
Connect to the database in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Database successfully connected");
            
            c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Database successfully connected
{% endhighlight %}
Create a new table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Table created successfully");
			
			Statement st = c.createStatement();
			String sql = "CREATE TABLE EMPLOYEE" +
						 "(ID INT PRIMARY KEY NOT NULL," +
						 "NAME TEXT NOT NULL," +
						 "AGE INT NOT NULL," +
						 "ADDRESS CHAR(255), " +
						 "SALARY DECIMAL(20,2))";
			
			st.executeUpdate(sql);
			st.close();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Table created successfully
{% endhighlight %}
Insert data into the table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Data inserted successfully");
			
			Statement st = c.createStatement();
			String sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (1, 'ANDREI', 31, 'BRASOV', 160000);";
			st.executeUpdate(sql);
			
			sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (2, 'STEVE', 32, 'LONDON', 160000);";
			st.executeUpdate(sql);
			
			sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (3, 'GEORGE', 35, 'PARIS', 160000);";
			st.executeUpdate(sql);
			
			sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (4, 'HENRY', 34, 'BUCHAREST', 160000);";
			st.executeUpdate(sql);
			
			sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (5, 'LEARNER', 32, 'VANCOUVER', 160000);";
			st.executeUpdate(sql);
			
			st.close();
			//c.commit();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Data inserted successfully
{% endhighlight %}
Select data from the table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Data selected successfully");
			
			Statement st = c.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM EMPLoYEE;");
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				String address = rs.getString("address");
				float salary = rs.getFloat("salary");
				
				System.out.println("ID = "+id+" NAME = "+name+" AGE = "+age+" ADDRESS = "+address+" SALARY = "+salary+"\n");
				
			}
			
			rs.close();
			st.close();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Data selected successfully
ID = 1 NAME = ANDREI AGE = 31 ADDRESS = BRASOV                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 2 NAME = STEVE AGE = 32 ADDRESS = LONDON                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 3 NAME = GEORGE AGE = 35 ADDRESS = PARIS                                                                                                                                                                                                                                                           SALARY = 160000.0

ID = 4 NAME = HENRY AGE = 34 ADDRESS = BUCHAREST                                                                                                                                                                                                                                                       SALARY = 160000.0

ID = 5 NAME = LEARNER AGE = 32 ADDRESS = VANCOUVER                                                                                                                                                                                                                                                       SALARY = 160000.0
{% endhighlight %}
Update data from the table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Data updated successfully");
			
			Statement st = c.createStatement();
			String sql = "UPDATE EMPLOYEE SET SALARY = 500000 WHERE ID = 4;";
			st.executeUpdate(sql);
			ResultSet rs = st.executeQuery("SELECT * FROM EMPLoYEE;");
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				String address = rs.getString("address");
				float salary = rs.getFloat("salary");
				
				System.out.println("ID = "+id+" NAME = "+name+" AGE = "+age+" ADDRESS = "+address+" SALARY = "+salary+"\n");
				
			}
			
			rs.close();
			st.close();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Data updated successfully
ID = 1 NAME = ANDREI AGE = 31 ADDRESS = BRASOV                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 2 NAME = STEVE AGE = 32 ADDRESS = LONDON                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 3 NAME = GEORGE AGE = 35 ADDRESS = PARIS                                                                                                                                                                                                                                                           SALARY = 160000.0

ID = 5 NAME = LEARNER AGE = 32 ADDRESS = VANCOUVER                                                                                                                                                                                                                                                       SALARY = 160000.0

ID = 4 NAME = HENRY AGE = 34 ADDRESS = BUCHAREST                                                                                                                                                                                                                                                       SALARY = 500000.0
{% endhighlight %}
Insert data into the table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Data inserted successfully");
			
			Statement st = c.createStatement();
			String sql = "INSERT INTO EMPLOYEE (ID,NAME,AGE,ADDRESS,SALARY) VALUES (6, 'John', 41, 'CHICAGO', 7000000);";
			st.executeUpdate(sql);
			ResultSet rs = st.executeQuery("SELECT * FROM EMPLoYEE;");
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				String address = rs.getString("address");
				float salary = rs.getFloat("salary");
				
				System.out.println("ID = "+id+" NAME = "+name+" AGE = "+age+" ADDRESS = "+address+" SALARY = "+salary+"\n");
				
			}
			
			rs.close();
			st.close();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Data inserted successfully
ID = 1 NAME = ANDREI AGE = 31 ADDRESS = BRASOV                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 2 NAME = STEVE AGE = 32 ADDRESS = LONDON                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 3 NAME = GEORGE AGE = 35 ADDRESS = PARIS                                                                                                                                                                                                                                                           SALARY = 160000.0

ID = 5 NAME = LEARNER AGE = 32 ADDRESS = VANCOUVER                                                                                                                                                                                                                                                       SALARY = 160000.0

ID = 4 NAME = HENRY AGE = 34 ADDRESS = BUCHAREST                                                                                                                                                                                                                                                       SALARY = 500000.0

ID = 6 NAME = John AGE = 41 ADDRESS = CHICAGO                                                                                                                                                                                                                                                         SALARY = 7000000.0
{% endhighlight %}
Delete data from the table in the Main.java file:
{% highlight java %}
package demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {

	public static void main(String[] args) {
		try
		{
			Connection c = DriverManager.getConnection("jdbc:postgresql://localhost:5432/test", "postgres", "eclipse");
			if(c != null)
				System.out.println("Data deleted successfully");
			
			Statement st = c.createStatement();
			String sql = "DELETE FROM EMPLOYEE WHERE ID=3;";
			st.executeUpdate(sql);
			ResultSet rs = st.executeQuery("SELECT * FROM EMPLoYEE;");
			while(rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				String address = rs.getString("address");
				float salary = rs.getFloat("salary");
				
				System.out.println("ID = "+id+" NAME = "+name+" AGE = "+age+" ADDRESS = "+address+" SALARY = "+salary+"\n");
				
			}
			
			rs.close();
			st.close();
			c.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			System.err.println(e.getClass().getName()+": "+e.getMessage());
			System.exit(0);
		}
	}

}
{% endhighlight %}
Run the application:
{% highlight java %}
Data deleted successfully
ID = 1 NAME = ANDREI AGE = 31 ADDRESS = BRASOV                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 2 NAME = STEVE AGE = 32 ADDRESS = LONDON                                                                                                                                                                                                                                                          SALARY = 160000.0

ID = 5 NAME = LEARNER AGE = 32 ADDRESS = VANCOUVER                                                                                                                                                                                                                                                       SALARY = 160000.0

ID = 4 NAME = HENRY AGE = 34 ADDRESS = BUCHAREST                                                                                                                                                                                                                                                       SALARY = 500000.0

ID = 6 NAME = John AGE = 41 ADDRESS = CHICAGO                                                                                                                                                                                                                                                         SALARY = 7000000.0
{% endhighlight %}
