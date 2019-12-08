---
layout: post
title:  "Introduction to Spring MVC"
date:   2016-01-01 16:46:56
categories: Java
description: Introduction to Spring MVC
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: The Spring Framework is an application framework and inversion of control container for the Java platform. The framework's core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE platform.
---

The Spring Framework is an application framework and inversion of control container for the Java platform. The framework's core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE platform. Although the framework does not impose any specific programming model, it has become popular in the Java community as an alternative to, replacement for, or even addition to the Enterprise JavaBeans (EJB) model.

Java EE provides ServletContainerInitializer interface, which allows libraries to be notified of a web application startup. Since Spring 3.1 we have SpringServletContainerInitializer class which handles WebApplicationInitializer by instantiating all found classes implementing this interface, sorting them basing on @Order annotation (non-annotated classes gets the highest possible order, so they are processed at the end) and invoking onStartup() method.


Spring since version 3.2 provides us a few classes implementing WebApplicationInitializer interface, from which first is AbstractContextLoaderInitializer. This class included in spring-web module uses abstract createRootApplicationContext() method to create application context, delegates it to ContextLoaderListener which then is being registered in the ServletContext instance. Creating application context using this class looks as follows:
{% highlight java %}
public class SpringAnnotationWebInitializer
  extends AbstractContextLoaderInitializer {
 
  @Override
  protected WebApplicationContext createRootApplicationContext() {
    AnnotationConfigWebApplicationContext applicationContext =
      new AnnotationConfigWebApplicationContext();
    applicationContext.register(SpringAnnotationConfig.class);
    return applicationContext;
  }
}
{% endhighlight %}
That was the simplest way to start up Spring web context. But if we want to experience benefits provided by Spring MVC and don't want to manually register DispatcherServlet it'll be better to use another class: AbstractDispatcherServletInitializer. It extends previous class and adds two abstract methods: createServletApplicationContext() and getServletMappings().  First method returns WebApplicationContext that will be passed to DispatcherServlet, which will be automatically added into container ServletContext. Please notice that this context will be established as a child of the context returned by createRootApplicationContext() method. Second method - as you have probably already deduced - returns mappings that are used during servlet registration. You can also override getServletFilters() method if you need any custom filters, because default implementation returns just empty array. Exemplary implementation using this class could be:
{% highlight java %}
public class SpringWebMvcInitializer
  extends AbstractDispatcherServletInitializer {
 
  @Override
  protected WebApplicationContext createRootApplicationContext() {
    AnnotationConfigWebApplicationContext applicationContext =
      new AnnotationConfigWebApplicationContext();
    applicationContext.register(SpringRootConfig.class);
    return applicationContext;
  }
 
  @Override
  protected WebApplicationContext createServletApplicationContext() {
    AnnotationConfigWebApplicationContext applicationContext =
      new AnnotationConfigWebApplicationContext();
    applicationContext.register(SpringMvcConfig.class);
    return applicationContext;
  }
 
  @Override
  protected String[] getServletMappings() {
    return new String[]{"/*"};
  }
}
{% endhighlight %}
And now last but definitely not least class: AbstractAnnotationConfigDispatcherServletInitializer. Here we can see further step in simplifying Spring initialization - we don't need to manually create contexts but just set appropriate config classes in getRootConfigClasses() and getServletConfigClasses() methods. I hope you are already familiar with those names, because they works exactly like in the former case. Of course due to this class extends AbstractDispatcherServletInitializer we can still override getServletFilters(). Finally we can implement our configuration in the following way:
{% highlight java %}
public class SpringWebMvcSimpleInitializer
  extends AbstractAnnotationConfigDispatcherServletInitializer {
 
  @Override
  protected Class<?>[] getRootConfigClasses() {
    return new Class[] {SpringRootConfig.class};
  }
 
  @Override
  protected Class<?>[] getServletConfigClasses() {
    return new Class[] {SpringMvcConfig.class};
  }
 
  @Override
  protected String[] getServletMappings() {
    return new String[]{"/*"};
  }
}
{% endhighlight %}

