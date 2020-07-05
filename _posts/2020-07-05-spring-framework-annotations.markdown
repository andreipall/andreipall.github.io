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
<h2>Spring Boot Annotations</h2>
<h3>@EnableAutoConfiguration</h3>
<p>This annotation is usually placed on the main application class. The @EnableAutoConfiguration annotation implicitly defines a base “search package”. This annotation tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.</p>
{% highlight java %}
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@EnableAutoConfiguration
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
{% endhighlight %}
<h3>@SpringBootApplication</h3>
<p>This annotation is used on the application class while setting up a Spring Boot project. The class that is annotated with the @SpringBootApplication must be kept in the base package. The one thing that the @SpringBootApplication does is a component scan. But it will scan only its sub-packages. As an example, if you put the class annotated with @SpringBootApplication in com.example then @SpringBootApplication will scan all its sub-packages, such as com.example.a, com.example.b, and com.example.a.x.</p>
<p>The @SpringBootApplication is a convenient annotation that adds all the following:</p>
<ul>
<li>@Configuration</li>
<li>@EnableAutoConfiguration</li>
<li>@ComponentScan</li>
</ul>
{% highlight java %}
package com.example.myapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
{% endhighlight %}
<h2>Spring MVC and REST Annotations</h2>
<h3>@Controller</h3>
<p>This annotation is used on Java classes that play the role of controller in your application. The @Controller annotation allows autodetection of component classes in the classpath and auto-registering bean definitions for them. To enable autodetection of such annotated controllers, you can add component scanning to your configuration. The Java class annotated with @Controller is capable of handling multiple request mappings.</p>
<h3>@RequestMapping</h3>
<p>This annotation is used both at class and method level. The @RequestMapping annotation is used to map web requests onto specific handler classes and handler methods. When @RequestMapping is used on class level it creates a base URI for which the controller will be used. When this annotation is used on methods it will give you the URI on which the handler methods will be executed. From this you can infer that the class level request mapping will remain the same whereas each handler method will have their own request mapping.</p>
<p>Sometimes you may want to perform different operations based on the HTTP method used, even though the request URI may remain the same. In such situations, you can use the method attribute of @RequestMapping with an HTTP method value to narrow down the HTTP methods in order to invoke the methods of your class.</p>
<p>Here is a basic example on how a controller along with request mappings work:</p>
{% highlight java %}
@Controller
@RequestMapping("/welcome")
public class WelcomeController{
  @RequestMapping(method = RequestMethod.GET)
  public String home(){
    return "index";
  }	
}
{% endhighlight %}
<h3>@CookieValue</h3>
This annotation is used at method parameter level. @CookieValue is used as argument of request mapping method. The HTTP cookie is bound to the @CookieValue parameter for a given cookie name. This annotation is used in the method annotated with @RequestMapping.
Let us consider that the following cookie value is received with a http request:
{% highlight java %}
JSESSIONID=418AB76CD83EF94U85YD34W
{% endhighlight %}
To get the value of the cookie, use @CookieValue like this:
{% highlight java %}
@RequestMapping("/cookieValue")
  public void getCookieValue(@CookieValue "JSESSIONID" String cookie){
}
{% endhighlight %}
<h3>@CrossOrigin</h3>
<p>This annotation is used both at class and method level to enable cross origin requests. In many cases the host that serves JavaScript will be different from the host that serves the data. In such a case Cross Origin Resource Sharing (CORS) enables cross-domain communication. To enable this communication you just need to add the @CrossOrigin annotation.</p>
<p>By default the @CrossOrigin annotation allows all origin, all headers, the HTTP methods specified in the @RequestMapping annotation and maxAge of 30 min. You can customize the behavior by specifying the corresponding attribute values.</p>
<p>An example to use @CrossOrigin at both controller and handler method levels is this.</p>
{% highlight java %}
@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/account")
public class AccountController {

@CrossOrigin(origins = "http://example.com")
@RequestMapping("/message")
  public Message getMessage() {
      // ...
    }
 
@RequestMapping("/note")
    public Note getNote() {
        // ...
    }
}
{% endhighlight %}
<p>In this example, both getExample() and getNote() methods will have a maxAge of 3600 seconds. Also, getExample() will only allow cross-origin requests from http://example.com, while getNote() will allow cross-origin requests from all hosts.</p>
<h3>@GetMapping</h3>
<p>This annotation is used for mapping HTTP GET requests onto specific handler methods. @GetMapping is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.GET).</p>
<h3>@PostMapping</h3>
<p>This annotation is used for mapping HTTP POST requests onto specific handler methods. @PostMapping is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.POST).</p>
<h3>@PutMapping</h3>
<p>This annotation is used for mapping HTTP PUT requests onto specific handler methods. @PutMapping is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.PUT).</p>
<h3>@PatchMapping</h3>
<p>This annotation is used for mapping HTTP PATCH requests onto specific handler methods. @PatchMapping is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.PATCH).</p>
<h3>@DeleteMapping</h3>
<p>This annotation is used for mapping HTTP DELETE requests onto specific handler methods. @DeleteMapping is a composed annotation that acts as a shortcut for @RequestMapping(method = RequestMethod.DELETE).</p>
<h3>@ExceptionHandler</h3>
<p>This annotation is used at method levels to handle exception at the controller level. The @ExceptionHandler annotation is used to define the class of exception it will catch. You can use this annotation on methods that should be invoked to handle an exception. The @ExceptionHandler values can be set to an array of Exception types. If an exception is thrown that matches one of the types in the list, then the method annotated with matching @ExceptionHandler will be invoked.</p>
{% highlight java %}
@Controller
public class ExceptionHandlingController {

  // @RequestHandler methods
  ...
  
  // Exception handling methods
  
  // Convert a predefined exception to an HTTP Status code
  @ResponseStatus(value=HttpStatus.CONFLICT,
                  reason="Data integrity violation")  // 409
  @ExceptionHandler(DataIntegrityViolationException.class)
  public void conflict() {
    // Nothing to do
  }
  
  // Specify name of a specific view that will be used to display the error:
  @ExceptionHandler({SQLException.class,DataAccessException.class})
  public String databaseError() {
    // Nothing to do.  Returns the logical view name of an error page, passed
    // to the view-resolver(s) in usual way.
    // Note that the exception is NOT available to this view (it is not added
    // to the model) but see "Extending ExceptionHandlerExceptionResolver"
    // below.
    return "databaseError";
  }

  // Total control - setup a model and return the view name yourself. Or
  // consider subclassing ExceptionHandlerExceptionResolver (see below).
  @ExceptionHandler(Exception.class)
  public ModelAndView handleError(HttpServletRequest req, Exception ex) {
    logger.error("Request: " + req.getRequestURL() + " raised " + ex);

    ModelAndView mav = new ModelAndView();
    mav.addObject("exception", ex);
    mav.addObject("url", req.getRequestURL());
    mav.setViewName("error");
    return mav;
  }
}
{% endhighlight %}
<h3>@InitBinder</h3>
<p>This annotation is a method level annotation that plays the role of identifying the methods which initialize the WebDataBinder - a DataBinder that binds the request parameter to JavaBean objects. To customise request parameter data binding , you can use @InitBinder annotated methods within our controller. The methods annotated with @InitBinder all argument types that handler methods support.</p>
<p>The @InitBinder annotated methods will get called for each HTTP request if you don’t specify the value element of this annotation. The value element can be a single or multiple form names or request parameters that the init binder method is applied to.</p>
{% highlight java %}
@InitBinder
public void initBinder(WebDataBinder dataBinder) {
  StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
  dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
}
@InitBinder(value = "address")
void initAddressValidator(WebDataBinder binder) {
  binder.setValidator(new AddressValidator());
}
{% endhighlight %}
<h3>@Mapper, @Mappings and @Mapping</h3>
<p>This annotation is used on fields. The @Mapping annotation is a meta annotation that indicates a web mapping annotation. When mapping different field names, you need to configure the source field to its target field and to do that you have to add the @Mappings annotation. This annotation accepts an array of @Mapping having the source and the target fields.</p>
{% highlight java %}
public class EmployeeDTO {
    private int employeeId;
    private String employeeName;
    // getters and setters
}
public class Employee {
    private int id;
    private String name;
    // getters and setters
}
{% endhighlight %}
{% highlight java %}
@Mapper
public interface EmployeeMapper {
    @Mappings({
      @Mapping(target="employeeId", source="entity.id"),
      @Mapping(target="employeeName", source="entity.name")
    })
    EmployeeDTO employeeToEmployeeDTO(Employee entity);
    @Mappings({
      @Mapping(target="id", source="dto.employeeId"),
      @Mapping(target="name", source="dto.employeeName")
    })
    Employee employeeDTOtoEmployee(EmployeeDTO dto);
}
{% endhighlight %}
<h3>@MatrixVariable</h3>
<p>This annotation is used to annotate request handler method arguments so that Spring can inject the relevant bits of matrix URI. Matrix variables can appear on any segment each separated by a semicolon. If a URL contains matrix variables, the request mapping pattern must represent them with a URI template. The @MatrixVariable annotation ensures that the request is matched with the correct matrix variables of the URI.</p>
{% highlight java %}
http://localhost:8080/spring-mvc-java-2/employeesContacts/contactNumber=223334411
{% endhighlight %}
{% highlight java %}
@RequestMapping(value = "/employeesContacts/{contactNumber}", 
  method = RequestMethod.GET)
@ResponseBody
public ResponseEntity<List<Employee>> getEmployeeBycontactNumber(
  @MatrixVariable(required = true) String contactNumber) {
    List<Employee> employeesList = new ArrayList<Employee>();
    ...
    return new ResponseEntity<List<Employee>>(employeesList, HttpStatus.OK);
}
{% endhighlight %}
<h3>@PathVariable</h3>
<p>This annotation is used to annotate request handler method arguments. The @RequestMapping annotation can be used to handle dynamic changes in the URI where certain URI value acts as a parameter. You can specify this parameter using a regular expression. The @PathVariable annotation can be used declare this parameter.</p>
{% highlight java %}
@ResponseStatus(value = HttpStatus.OK)
@GetMapping(value = "/user/{name}/{email}")
public void process2(@PathVariable String name, @PathVariable String email) {
    logger.info("User name: {} and email: {}", name, email);
}
{% endhighlight %}
<h3>@RequestAttribute</h3>
<p>This annotation is used to bind the request attribute to a handler method parameter. Spring retrieves the named attributes value to populate the parameter annotated with @RequestAttribute. While the @RequestParam annotation is used bind the parameter values from query string, the @RequestAttribute is used to access the objects which have been populated on the server side.</p>

@Controller
public class ExampleController {
{% highlight java %}
  @RequestMapping("/")
  @ResponseBody
  public String handle (@RequestAttribute("visitorCounter") Integer counter) {
      return String.format("Visitor number: %d", counter);
  }
}
{% endhighlight %}
<h3>@RequestBody</h3>
<p>This annotation is used to annotate request handler method arguments. The @RequestBody annotation indicates that a method parameter should be bound to the value of the HTTP request body. The HttpMessageConveter is responsible for converting from the HTTP request message to object.</p>
{% highlight java %}
@PostMapping("/request")
public ResponseEntity postController(
  @RequestBody LoginForm loginForm) {
  
    exampleService.fakeAuthenticate(loginForm);
    return ResponseEntity.ok(HttpStatus.OK);
}
{% endhighlight %}
{% highlight java %}
public class LoginForm {
    private String username;
    private String password;
    // ...
}
{% endhighlight %}
{% highlight bash %}
curl -i \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
-X POST --data 
  '{"username": "johnny", "password": "password"}' "https://localhost:8080/.../request"
{% endhighlight %}
<h3>@RequestHeader</h3>
<p>This annotation is used to annotate request handler method arguments. The @RequestHeader annotation is used to map controller parameter to request header value. When Spring maps the request, @RequestHeader checks the header with the name specified within the annotation and binds its value to the handler method parameter. This annotation helps you to get the header details within the controller class.</p>
{% highlight java %}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @GetMapping(value = "/agent")
    @ResponseStatus(value = HttpStatus.OK)
    public void client(@RequestHeader(value="User-Agent") String userAgent) {

        logger.info("User agent is: {}", userAgent);
    }

    @GetMapping(value = "/all")
    @ResponseStatus(value = HttpStatus.OK)
    public void all(@RequestHeader Map<String, String> headers) {

        logger.info("All headers: {}", headers);
    }
}
{% endhighlight %}
<h3>@RequestParam</h3>
<p>This annotation is used to annotate request handler method arguments. Sometimes you get the parameters in the request URL, mostly in GET requests. In that case, along with the @RequestMapping annotation you can use the @RequestParam annotation to retrieve the URL parameter and map it to the method argument. The @RequestParam annotation is used to bind request parameters to a method parameter in your controller.</p>
{% highlight java %}
@GetMapping("/api/foos")
@ResponseBody
public String getFoos(@RequestParam(required = false) String id) { 
    return "ID: " + id;
}
{% endhighlight %}
{% highlight bash %}
http://localhost:8080/api/foos?id=abc
----
ID: abc
{% endhighlight %}
<h3>@RequestPart</h3>
<p>This annotation is used to annotate request handler method arguments. The @RequestPart annotation can be used instead of @RequestParam to get the content of a specific multipart and bind to the method argument annotated with @RequestPart. This annotation takes into consideration the “Content-Type” header in the multipart(request part).</p>
{% highlight java %}
@RequestMapping(value = "/user/avatar/update", method = RequestMethod.POST, consumes = { "multipart/form-data" })
public @ResponseBody GenericResponseBody userAvatarUpdate(@RequestPart("avatar_data") AvatarRequest avatarRequest,
      @RequestPart("avatar_file") MultipartFile file) {
   User authenticatedUser = new AuthenticationHolder().getAuthenticatedUser();
   User persistentUser = userService.findByPK(authenticatedUser.getId());

   try {
      persistentUser.setPicture(Utility.cropImage(file.getBytes(), avatarRequest.getX().intValue(),
            avatarRequest.getY().intValue(), avatarRequest.getWidth().intValue(),
            avatarRequest.getHeight().intValue(), avatarRequest.getScaleX() == -1 ? true : false,
            avatarRequest.getScaleY() == -1 ? true : false, avatarRequest.getRotate()));
   } catch (BusinessException | IOException e) {
      return new GenericResponseBody(GenericResponseBodyState.ERROR);
   }

   userService.update(persistentUser);

   return new GenericResponseBody(GenericResponseBodyState.SUCCESS);
}
{% endhighlight %}
<h3>@ResponseBody</h3>
<p>This annotation is used to annotate request handler methods. The @ResponseBody annotation is similar to the @RequestBody annotation. The @ResponseBody annotation indicates that the result type should be written straight in the response body in whatever format you specify like JSON or XML. Spring converts the returned object into a response body by using the HttpMessageConveter.</p>
{% highlight java %}
@Controller
@RequestMapping("/post")
public class ExamplePostController {
 
    @Autowired
    ExampleService exampleService;
 
    @PostMapping("/response")
    @ResponseBody
    public ResponseTransfer postResponseController(
      @RequestBody LoginForm loginForm) {
        return new ResponseTransfer("Thanks For Posting!!!");
     }
}
{% endhighlight %}
{% highlight java %}
{"text":"Thanks For Posting!!!"}
{% endhighlight %}
<h3>@ResponseStatus</h3>
<p>This annotation is used on methods and exception classes. @ResponseStatus marks a method or exception class with a status code and a reason that must be returned. When the handler method is invoked the status code is set to the HTTP response which overrides the status information provided by any other means. A controller class can also be annotated with @ResponseStatus which is then inherited by all @RequestMapping methods.</p>
{% highlight java %}
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such order")
public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(String message) {

        super(message);
    }
}
{% endhighlight %}
<h3>@ControllerAdvice</h3>
<p>This annotation is applied at the class level. As explained earlier, for each controller you can use @ExceptionHandler on a method that will be called when a given exception occurs. But this handles only those exception that occur within the controller in which it is defined. To overcome this problem you can now use the @ControllerAdvice annotation. This annotation is used to define @ExceptionHandler, @InitBinder and @ModelAttribute methods that apply to all @RequestMapping methods. Thus if you define the @ExceptionHandler annotation on a method in @ControllerAdvice class, it will be applied to all the controllers.</p>
{% highlight java %}
@ControllerAdvice
class GlobalControllerExceptionHandler {
    @ResponseStatus(HttpStatus.CONFLICT)  // 409
    @ExceptionHandler(DataIntegrityViolationException.class)
    public void handleConflict() {
        // Nothing to do
    }
}
{% endhighlight %}
<h3>@RestController</h3>
<p>This annotation is used at the class level. The @RestController annotation marks the class as a controller where every method returns a domain object instead of a view. By annotating a class with this annotation you no longer need to add @ResponseBody to all the RequestMapping method. It means that you no more use view-resolvers or send html in response. You just send the domain object as HTTP response in the format that is understood by the consumers like JSON.</p>
<p>@RestController is a convenience annotation which combines @Controller and @ResponseBody.</p>
<h3>@RestControllerAdvice</h3>
<p>This annotation is applied on Java classes. @RestControllerAdvice is a convenience annotation which combines @ControllerAdvice and @ResponseBody. This annotation is used along with the @ExceptionHandler annotation to handle exceptions that occur within the controller.</p>
<h3>@SessionAttribute</h3>
<p>This annotation is used at method parameter level. The @SessionAttribute annotation is used to bind the method parameter to a session attribute. This annotation provides a convenient access to the existing or permanent session attributes.</p>
{% highlight java %}
@GetMapping("/info")
public String userInfo(@SessionAttribute("user") User user) {
	...
	return "user";
}
{% endhighlight %}
<h3>@SessionAttributes</h3>
<p>This annotation is applied at type level for a specific handler. The @SessionAtrributes annotation is used when you want to add a JavaBean object into a session. This is used when you want to keep the object in session for short lived. @SessionAttributes is used in conjunction with @ModelAttribute.
Consider this example:</p>
{% highlight java %}
@Controller
@SessionAttributes("visitor")
@RequestMapping("/trades")
public class TradeController {

    @RequestMapping("/**")
    public String handleRequestById (@ModelAttribute("visitor") Visitor visitor,
                                     Model model,
                                     HttpServletRequest request) {
        model.addAttribute("msg", "trades request, serving page " +
                                                 request.getRequestURI());
        visitor.addPageVisited(request.getRequestURI());
        return "traders-page";
    }
   ...
}
{% endhighlight %}
<p>The @ModelAttribute name is assigned to the @SessionAttributes as value. The @SessionAttributes has two elements. The value element is the name of the session in the model and the types element is the type of session attributes in the model.</p>
