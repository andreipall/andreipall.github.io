---
layout: post
title:  "Using an embedded Tomcat with Maven Tomcat plugin"
date:   2014-03-18 16:34:28
categories: java
description: Using an embedded Tomcat with Maven Tomcat plugin
keywords: [Andrei Pall, eclipse, java, maven, blog, project]
excerpt: The Apache Tomcat Maven Plugin provides goals to manipulate WAR projects within the Apache Tomcat servlet container. You can run your War Apache Maven project through Apache Maven without deploying your WAR file to an Apache Tomcat instance.
---

<p>Group ID - overall organization / top-level package<br />
Artifact ID - project / library name<br />
Version - unique release number</p>

{% highlight bash %}
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-webapp -DarchetypeArtifactId=maven-archetype-webapp
{% endhighlight %}

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-webapp</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>my-webapp Maven Webapp</name>
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
    <finalName>my-webapp</finalName>
    <plugins>
      <plugin>
         <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.2</version>
      </plugin>
    </plugins>
  </build>
</project>
{% endhighlight %}
<p>Note the packaging element - this tells Maven to build as a WAR. Change into the webapp project's directory and try:</p>
{% highlight bash %}
mvn clean package
mvn clean install tomcat7:run
{% endhighlight %}
<p>You'll see target/my-webapp.war is built, and that all the normal steps were executed.</p>
<p>Now you can modify this webapp project and turn it into anything you need!</p>

<table class="ink-table">
	<thead>
		<tr class="a">
			<th class="content-left">Goal</th>
			<th class="content-left">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr class="b">
			<td>tomcat:deploy</td><td>Deploy a WAR to Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:deploy-only</td><td>Deploy a WAR to Tomcat witjout forking the package lifecycle</td>
		</tr>
		<tr class="b">
			<td>tomcat:exploded</td><td>Deploy an exploded WAR to Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:help</td><td>Display help information on tomcat-maven-plugin.<br>Call <pre> mvn tomcat:help -Ddetail=true -Dgoal=&lt;goal-name&gt;</pre> to display parameter details.</td>
		</tr>
		<tr class="b">
			<td>tomcat:info</td><td>Lists information about the Tomcat version, OS, and JVM properties.</td>
		</tr>
		<tr class="a">
			<td>tomcat:inplace</td><td>Deploy a WAR in-place to Tomcat.</td>
		</tr>
		<tr class="b">
			<td>tomcat:list</td><td>Lists all the currently deployed web applications in Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:redeploy</td><td>Redeploy a WAR in Tomcat. Deploy with forcing update flag to true</td>
		</tr>
		<tr class="b">
			<td>tomcat:reload</td><td>Reload a WAR in Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:resources</td><td>Lists JNDI resources in Tomcat.</td>
		</tr>
		<tr class="b">
			<td>tomcat:roles</td><td>Lists security roles in Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:run</td><td>Runs the current project as a dynamic web application using an embedded Tomcat server.</td>
		</tr>
		<tr class="b">
			<td>tomcat:run-war</td><td>Runs the current project as a packaged web application using an embedded Tomcat server.</td>
		</tr>
		<tr class="a">
			<td>tomcat:run-war-only</td><td>Runs the current project as a packaged web application using an embedded Tomcat server without forking the package cycle.</td>
		</tr>
		<tr class="b">
			<td>tomcat:sessions</td><td>Lists session information for a WAR in Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:shutdown</td><td><p>Shuts down all possibly started embedded tomcat servers. This will be automatically down through a shutdown hook or you may call this Mojo to shut them down explictly.</p><p>By default the <code>shutdown</code> goal is not bound to any phase. For integration tests you might want to bind it to <code>post-integration-test</code>.</p></td>
		</tr>
		<tr class="b">
			<td>tomcat:start</td><td>Start a WAR in Tomcat.</td>
		</tr>
		<tr class="a">
			<td>tomcat:stop</td><td>Stop a WAR in Tomcat.</td>
		</tr>
		<tr class="b">
			<td>tomcat:undeploy</td><td>Undeploy a WAR from Tomcat.</td>
		</tr>
	</tbody>
</table>
