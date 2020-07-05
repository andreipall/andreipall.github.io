---
layout: post
title:  "Spring Framework Annotations"
date:   2020-07-05 16:53:56
categories: java
description: Spring Framework Annotations
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: The Java Programming language provided support for Annotations from Java 5.0. Leading Java frameworks were quick to adopt annotations and the Spring Framework started using annotations from the release 2.5. Due to the way they are defined, annotations provide a lot of context in their declaration.
---
<p>The Java Programming language provided support for Annotations from Java 5.0. Leading Java frameworks were quick to adopt annotations and the Spring Framework started using annotations from the release 2.5. Due to the way they are defined, annotations provide a lot of context in their declaration.</p>
<h2>Core Spring Framework Annotations</h2>
<h3>@Required</h3>
<p>This annotation is applied on bean setter methods. Consider a scenario where you need to enforce a required property. The @Required annotation indicates that the affected bean must be populated at configuration time with the required property. Otherwise an exception of type BeanInitializationException is thrown.</p>
{% highlight java %}
package com.andreipall;
import org.springframework.beans.factory.annotation.Required;

public class Student {
   private Integer age;
   private String name;

   @Required
   public void setAge(Integer age) {
      this.age = age;
   }
   public Integer getAge() {
      return age;
   }
   
   @Required
   public void setName(String name) {
      this.name = name;
   }
   public String getName() {
      return name;
   }
}
{% endhighlight %}
<h3>@Autowired</h3>
<p>This annotation is applied on fields, setter methods, and constructors. The @Autowired annotation injects object dependency implicitly.</p>
<p>When you use @Autowired on fields and pass the values for the fields using the property name, Spring will automatically assign the fields with the passed values.</p>
<p>You can even use @Autowired on private properties, as shown below. (This is a very poor practice though!)</p>
{% highlight java %}
public class Customer {
    @Autowired                               
    private Person person;                   
    private int type;
}
{% endhighlight %}
<p>When you use @Autowired on setter methods, Spring tries to perform the by Type autowiring on the method. You are instructing Spring that it should initiate this property using setter method where you can add your custom code, like initializing any other property with this property.</p>
{% highlight java %}
public class Customer {                                                                                         
    private Person person;
    @Autowired                                                                                                      
    public void setPerson (Person person) {
     this.person=person;
    }
}
{% endhighlight %}
<p>Consider a scenario where you need instance of class A, but you do not store A in the field of the class. You just use A to obtain instance of B, and you are storing B in this field. In this case setter method autowiring will better suite you. You will not have class level unused fields.</p>
<p>When you use @Autowired on a constructor, constructor injection happens at the time of object creation. It indicates the constructor to autowire when used as a bean. One thing to note here is that only one constructor of any bean class can carry the @Autowired annotation.</p>
{% highlight java %}
@Component
public class Customer {
    private Person person;
    @Autowired
    public Customer (Person person) {					
      this.person=person;
    }
}
{% endhighlight %}
<p>NOTE: As of Spring 4.3, @Autowired became optional on classes with a single constructor. In the above example, Spring would still inject an instance of the Person class if you omitted the @Autowired annotation.</p>
<h3>@Qualifier</h3>
<p>This annotation is used along with @Autowired annotation. When you need more control of the dependency injection process, @Qualifier can be used. @Qualifier can be specified on individual constructor arguments or method parameters. This annotation is used to avoid confusion which occurs when you create more than one bean of the same type and want to wire only one of them with a property.</p>
<p>Consider an example where an interface BeanInterface is implemented by two beans BeanB1 and BeanB2.</p>
{% highlight java %}
@Component
public class BeanB1 implements BeanInterface {
  //
}
@Component
public class BeanB2 implements BeanInterface {
  //
}
{% endhighlight %}
<p>Now if BeanA autowires this interface, Spring will not know which one of the two implementations to inject.</p>
<p>One solution to this problem is the use of the @Qualifier annotation.</p>
{% highlight java %}
@Component
public class BeanA {
  @Autowired
  @Qualifier("beanB2")
  private BeanInterface dependency;
  ...
}
{% endhighlight %}
<p>With the @Qualifier annotation added, Spring will now know which bean to autowire where beanB2 is the name of BeanB2.</p>
<h3>@Configuration</h3>
<p>This annotation is used on classes which define beans. @Configuration is an analog for XML configuration file – it is configuration using Java class. Java class annotated with @Configuration is a configuration by itself and will have methods to instantiate and configure the dependencies.</p3>
<p>Here is an example:</p>
{% highlight java %}
@Configuration
public class DataConfig{ 
  @Bean
  public DataSource source(){
    DataSource source = new OracleDataSource();
    source.setURL();
    source.setUser();
    return source;
  }
  @Bean
  public PlatformTransactionManager manager(){
    PlatformTransactionManager manager = new BasicDataSourceTransactionManager();
    manager.setDataSource(source());
    return manager;
  }
}
{% endhighlight %}
<h3>@ComponentScan</h3>
<p>This annotation is used with @Configuration annotation to allow Spring to know the packages to scan for annotated components. @ComponentScan is also used to specify base packages using basePackageClasses or basePackage attributes to scan. If specific packages are not defined, scanning will occur from the package of the class that declares this annotation.</p>
{% highlight java %}
package com.andreipall.blog;
import com.andreipall.blog.componentscan.example.demopackageB.DemoBeanB1;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = {"com.andreipall.blog.componentscan.example.demopackageA",
        "com.andreipall.blog.componentscan.example.demopackageD",
        "com.andreipall.blog.componentscan.example.demopackageE"},
        basePackageClasses = DemoBeanB1.class)
public class BlogPostsApplicationWithComponentScan {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.
                run(BlogPostsApplicationWithComponentScan.class,args);
        System.out.println("Contains A  "+context.
                containsBeanDefinition("demoBeanA"));
        System.out.println("Contains B2  " + context.
                containsBeanDefinition("demoBeanB2"));
        System.out.println("Contains C   " + context.
                containsBeanDefinition("demoBeanC"));
        System.out.println("Contains D   " + context.
                containsBeanDefinition("demoBeanD"));

    }
}
{% endhighlight %}
<h3>@Bean</h3>
<p>This annotation is used at the method level. @Bean annotation works with @Configuration to create Spring beans. As mentioned earlier, @Configuration will have methods to instantiate and configure dependencies. Such methods will be annotated with @Bean. The method annotated with this annotation works as bean ID and it creates and returns the actual bean.</p>
<p>Here is an example:</p>
{% highlight java %}
@Configuration
public class AppConfig{
  @Bean
  public Person person(){
    return new Person(address());
  }
  @Bean
  public Address address(){
    return new Address();
  }
}
{% endhighlight %}
<h3>@Lazy</h3>
<p>This annotation is used on component classes. By default all autowired dependencies are created and configured at startup. But if you want to initialize a bean lazily, you can use @Lazy annotation over the class. This means that the bean will be created and initialized only when it is first requested for. You can also use this annotation on @Configuration classes. This indicates that all @Bean methods within that @Configuration should be lazily initialized.</p>
{% highlight java %}
@Lazy
@Configuration
@ComponentScan(basePackages = "com.andreipall")
public class AppConfig {
 
    @Bean
    public Region getRegion(){
        return new Region();
    }
 
    @Bean
    public Country getCountry(){
        return new Country();
    }
}
{% endhighlight %}
<p>To apply this to only a specific bean, let's remove the @Lazy from a class, then we add it to the config of the desired bean:</p>
{% highlight java %}
@Bean
@Lazy(true)
public Region getRegion(){
    return new Region();
}
{% endhighlight %}
<h3>@Value</h3>
<p>This annotation is used at the field, constructor parameter, and method parameter level. The @Value annotation indicates a default value expression for the field or parameter to initialize the property with. As the @Autowired annotation tells Spring to inject object into another when it loads your application context, you can also use @Value annotation to inject values from a property file into a bean’s attribute. It supports both #{...} and ${...} placeholders.</p>
{% highlight java %}
value.from.file=Value got from the file
priority=high
listOfValues=A,B,C
{% endhighlight %}
{% highlight java %}
@Value("${value.from.file}")
private String valueFromFile;
{% endhighlight %}
<h2>Spring Framework Stereotype Annotations</h2>
<h3>@Component</h3>
<p>This annotation is used on classes to indicate a Spring component. The @Component annotation marks the Java class as a bean or say component so that the component-scanning mechanism of Spring can add into the application context.</p>
{% highlight java %}
package com.andreipall;

import org.springframework.stereotype.Component;

@Component
public class MathComponent {

	public int add(int x, int y) {
		return x + y;
	}
}
{% endhighlight %}
{% highlight java %}
package com.andreipall;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringMainClass {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
		context.scan("com.andreipall");
		context.refresh();

		MathComponent ms = context.getBean(MathComponent.class);

		int result = ms.add(1, 2);
		System.out.println("Addition of 1 and 2 = " + result);

		context.close();
	}
}
{% endhighlight %}
<h3>@Controller</h3>
<p>The @Controller annotation is used to indicate the class is a Spring controller. This annotation can be used to identify controllers for Spring MVC.</p>
<h3>@Service</h3>
<p>This annotation is used on a class. The @Service marks a Java class that performs some service, such as execute business logic, perform calculations and call external APIs. This annotation is a specialized form of the @Component annotation intended to be used in the service layer.</p>
<h3>@Repository</h3>
<p>This annotation is used on Java classes which directly access the database. The @Repository annotation works as marker for any class that fulfills the role of repository or Data Access Object.</p>
<p>This annotation has a automatic translation feature. For example, when an exception occurs in the @Repository there is a handler for that exception and there is no need to add a try catch block.</p>
