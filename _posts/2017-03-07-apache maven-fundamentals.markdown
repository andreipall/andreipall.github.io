---
layout: post
title:  "Apache Maven Fundamentals"
date:   2017-03-07 16:46:56
categories: Java
description: Apache Maven Fundamentals
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Apache Maven is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information. Maven aims to gather current principles for best practices development.
---

Apache Maven is a software project management and comprehension tool. Based on the concept of a project object model (POM), Maven can manage a project's build, reporting and documentation from a central piece of information. Maven aims to gather current principles for best practices development.

<h3>Maven’s Objectives</h3>
Maven’s primary goal is to allow a developer to comprehend the complete state of a development effort in the shortest period of time. In order to attain this goal there are several areas of concern that Maven attempts to deal with:
<ul>
<li>Making the build process easy</li>
<li>Providing a uniform build system</li>
<li>Providing quality project information</li>
<li>Providing guidelines for best practices development</li>
<li>Allowing transparent migration to new features</li>
</ul>
Maven Demo:
{% highlight java %}
package com.maven;

public class HelloWorld {

	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}
{% endhighlight %}
{% highlight xml %}
<project>
	<modelVersion>4.0.0</modelVersion>
	<artifactId>maven-hello-world</artifactId>
	<groupId>com.maven</groupId>
	<version>1.0</version>
	<packaging>jar</packaging>
</project>
{% endhighlight %}
{% highlight bash %}
mvn compile
mvn package
{% endhighlight %}
<h3>Maven Standard Directory Layout</h3>
<table class="table table-striped" border="1">
<tbody><tr class="a">
<td align="left"><tt>src/main/java</tt></td>
<td align="left">Application/Library sources</td></tr>
<tr class="b">
<td align="left"><tt>src/main/resources</tt></td>
<td align="left">Application/Library resources</td></tr>
<tr class="a">
<td align="left"><tt>src/main/resources-filtered</tt></td>
<td align="left">Application/Library resources which are filtered. (Starting with Maven 3.4.0, not yet released.)</td></tr>
<tr class="b">
<td align="left"><tt>src/main/filters</tt></td>
<td align="left">Resource filter files</td></tr>
<tr class="a">
<td align="left"><tt>src/main/webapp</tt></td>
<td align="left">Web application sources</td></tr>
<tr class="b">
<td align="left"><tt>src/test/java</tt></td>
<td align="left">Test sources</td></tr>
<tr class="a">
<td align="left"><tt>src/test/resources</tt></td>
<td align="left">Test resources</td></tr>
<tr class="b">
<td align="left"><tt>src/test/resources-filtered</tt></td>
<td align="left">Test resources which are filtered by default. (Starting with Maven 3.4.0, not yet released.)</td></tr>
<tr class="a">
<td align="left"><tt>src/test/filters</tt></td>
<td align="left">Test resource filter files</td></tr>
<tr class="b">
<td align="left"><tt>src/it</tt></td>
<td align="left">Integration Tests (primarily for plugins)</td></tr>
<tr class="a">
<td align="left"><tt>src/assembly</tt></td>
<td align="left">Assembly descriptors</td></tr>
<tr class="b">
<td align="left"><tt>src/site</tt></td>
<td align="left">Site</td></tr>
<tr class="a">
<td align="left"><tt>LICENSE.txt</tt></td>
<td align="left">Project's license</td></tr>
<tr class="b">
<td align="left"><tt>NOTICE.txt</tt></td>
<td align="left">Notices and attributions required by libraries that the project depends on</td></tr>
<tr class="a">
<td align="left"><tt>README.txt</tt></td>
<td align="left">Project's readme</td></tr></tbody>
</table>
Inheritance
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd ">
	
	<modelVersion>4.0.0</modelVersion>
	<artifactId>organization-parent-pom</artifactId>
	<groupId>com.maven</groupId>
	<version>1.0.0</version>
	<packaging>pom</packaging>

	<name>Learning Maven Examples</name>
	<description>This is a project used to demonstrate maven principles</description>
	<url>http://course.maven.com</url>
	
	<licenses>
		<license>
			<name>Apache License</name>
			<comments>We are pretty good about sharing</comments>
		</license>
	</licenses>
	
</project>
{% endhighlight %}
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd ">
	
	<modelVersion>4.0.0</modelVersion>
	<artifactId>maven-examples</artifactId>

	<parent>
		<artifactId>organization-parent-pom</artifactId>
		<groupId>com.maven</groupId>
		<version>1.0.0</version>
	</parent>	
</project>
{% endhighlight %}
Profiles
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd ">
	
	<modelVersion>4.0.0</modelVersion>
	<artifactId>maven-examples</artifactId>
	<groupId>com.maven</groupId>
	<version>1.0.0</version>
	
	<build>
		<directory>C:\Users\Andrei Pall\Desktop\Artifact Destination\development\</directory>
	</build>

	<profiles>
		<profile>
			<id>production</id>
			<activation>
				<property>
					<name>env.PACKAGE_ENV</name>
					<value>PROD</value>
				</property>
			</activation>
			<build>
				<directory>C:\Users\Andrei Pall\Desktop\Artifact Destination\production\</directory>
			</build>
		</profile>
	</profiles>	
</project>
{% endhighlight %}
{% highlight bash %}
mvn clean
mvn -Pproduction package
{% endhighlight %}
Generating Projects
{% highlight bash %}
mvn archetype:generate
{% endhighlight %}
Dependency Management
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.maven</groupId>
  <artifactId>more-maven-examples</artifactId>
  <version>1.0</version>
  <packaging>jar</packaging>

  <name>more-maven-examples</name>
  <url>http://maven.apache.org</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
  	<dependency>
    	<groupId>org.apache.commons</groupId>
    	<artifactId>commons-lang3</artifactId>
    	<version>3.3.2</version>
	</dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
{% endhighlight %}
Plugins
Jar Plugin
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.maven</groupId>
  <artifactId>more-maven-examples</artifactId>
  <version>1.0</version>
  <packaging>jar</packaging>

  <name>more-maven-examples</name>
  <url>http://maven.apache.org</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <build>
  	<pluginManagement>
  		<plugins>
  			<plugin>
  				<groupId>org.apache.maven.plugins</groupId>
  				<artifactId>maven-compiler-plugin</artifactId>
  				<version>3.2</version>
  				<configuration>
  					<verbose>true</verbose>
  				</configuration>		
  			</plugin>
  		    <plugin>
  		    	<artifactId>maven-jar-plugin</artifactId>
  		    	<version>2.4</version>
  		    	<configuration>
  		   			<finalName>pomTest</finalName>
  		   			<forceCreation>true</forceCreation>
  		   			<excludes>
  		   				<exclude>**/ExcludeMe.class</exclude>
  		   			</excludes>
  		    	</configuration>
  		    </plugin>
  			
  		</plugins>
  	</pluginManagement>
  </build>
     
  <dependencies>
  	<dependency>
  		<groupId>org.apache.commons</groupId>
  		<artifactId>commons-lang3</artifactId>
  		<version>3.3.2</version>
  	</dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
{% endhighlight %}
Javadoc Plugin
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.maven</groupId>
	<artifactId>more-maven-examples</artifactId>
	<version>1.0</version>
	<packaging>jar</packaging>

	<name>more-maven-examples</name>
	<url>http://maven.apache.org</url>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<build>
		<plugins>
			<plugin>
				<artifactId>maven-javadoc-plugin</artifactId>
				<groupId>org.apache.maven.plugins</groupId>
				<version>2.10.1</version>
			</plugin>
		</plugins>
		<pluginManagement>
			<plugins>
				<plugin>
					<artifactId>maven-javadoc-plugin</artifactId>
					<configuration>
						<footer>This is the new footer</footer>
					</configuration>
					<executions>
						<execution>
							<phase>compile</phase>
							<goals><goal>jar</goal></goals>
						</execution>
					</executions>
				</plugin>
				<plugin>
					<groupId>org.apache.maven.plugins</groupId>
					<artifactId>maven-compiler-plugin</artifactId>
					<version>3.2</version>
					<configuration>
						<verbose>true</verbose>
					</configuration>
				</plugin>
				<plugin>
					<artifactId>maven-jar-plugin</artifactId>
					<version>2.4</version>
					<configuration>
						<finalName>pomTest</finalName>
						<forceCreation>true</forceCreation>
						<excludes>
							<exclude>**/ExcludeMe.class</exclude>
						</excludes>
					</configuration>
				</plugin>
				<plugin>
					<artifactId>maven-javadoc-plugin</artifactId>
					<executions>
						<execution>
							<id>attach-javadocs</id>
							<phase>compile</phase>
							<goals>
								<goal>jar</goal>
							</goals>
						</execution>
					</executions>
				</plugin>
			</plugins>
		</pluginManagement>
	</build>

	<dependencies>
		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-lang3</artifactId>
			<version>3.3.2</version>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

</project>
{% endhighlight %}
War Plugin
{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.maven</groupId>
  <artifactId>web-maven-example</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>web-maven-example Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
  	<plugins>
  		<plugin>
  			<groupId>org.apache.maven.plugins</groupId>
  			<artifactId>maven-war-plugin</artifactId>
  			<version>2.6</version>
  			<configuration>
  				<warName>mavenWeb</warName>
  			</configuration>
  		</plugin>
  	</plugins>
  </build>
</project>
{% endhighlight %}
