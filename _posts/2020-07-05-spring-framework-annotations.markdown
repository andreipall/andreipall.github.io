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
