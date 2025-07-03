---
layout: post
title: "How to deploy Angular and Spring Boot on Tomcat"
date: 2025-07-03 06:26:56
categories: java
description: How to deploy Angular and Spring Boot on Tomcat
keywords: [Andrei Pall, blog, java, jpa, spring, framework]
excerpt: To deploy a Spring Boot API with an Angular frontend on Apache Tomcat, you'll need to build both applications, combine them properly, and deploy them as a single .war or serve them separately depending on your setup.
---
<p>To deploy a Spring Boot API with an Angular frontend on Apache Tomcat, you'll need to build both applications, combine them properly, and deploy them as a single .war or serve them separately depending on your setup. Here's how to do it step by step:</p>
<h3>1. Build the Angular Project</h3>

<p>Run this in your Angular project folder:</p>
{% highlight java %}
ng build --configuration production
{% endhighlight %}
<p>This generates static files in dist/your-project-name/.</p>

<h3>2. Copy Angular Build Output to Spring Boot resources/static</h3>

<p>In your Spring Boot project:</p>

<p>Delete or clean src/main/resources/static (optional).</p>

<p>Copy Angular's output:</p>
{% highlight java %}
cp -r dist/your-project-name/* src/main/resources/static/
{% endhighlight %}
<p>Spring Boot will serve these files as static web resources (like an SPA) at http://yourdomain.com/index.html.</p>

<h3>3. Modify Spring Boot Controller (Optional)</h3>

<p>To serve the index.html for all unknown paths (Angular routing), add a fallback controller:</p>
{% highlight java %}
@Controller
public class ForwardController {
    @RequestMapping(value = "/{[path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
{% endhighlight %}
<h3>4. Package Spring Boot as a WAR</h3>

<p>Edit pom.xml:</p>
{% highlight java %}
<packaging>war</packaging>
{% endhighlight %}
<p>And add this to your SpringBootApplication class:</p>
{% highlight java %}
@SpringBootApplication
public class MyApp extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MyApp.class);
    }
}
{% endhighlight %}
<h3>5. Build the WAR</h3>
{% highlight java %}
mvn clean package
{% endhighlight %}
<p>You’ll get a file like: target/myapp.war</p>
<h3>6. Deploy the WAR to Tomcat</h3>
<p>Copy the WAR to Tomcat’s webapps/ directory.</p>
<p>Start Tomcat.</p>
<p>Access the app at: http://localhost:8080/myapp/</p>
