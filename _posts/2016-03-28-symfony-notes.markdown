---
layout: post
title:  "Symfony notes"
date:   2016-03-28 16:46:56
categories: PHP
description: Symfony notes
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Symfony notes. Symfony is a set of PHP Components, a Web Application framework, a Philosophy, and a Community — all working together in harmony. Symfony aims to speed up the creation and maintenance of web applications and to replace repetitive coding tasks.
---

Symfony was heavily inspired by other web application frameworks such as Ruby on Rails, Django, and Spring.

Symfony makes heavy use of existing PHP open-source projects as part of the framework, including:
<ul>
<li>Propel or Doctrine as object-relational mapping layers</li>
<li>PDO database abstraction layer</li>
<li>PHPUnit, a unit testing framework</li>
<li>Twig, a templating engine</li>
<li>Swift Mailer, an e-mail library</li>
</ul>

<h5>Creating the Symfony Application</h5>
Once the Symfony Installer is available, create your first Symfony application with the new command:
{% highlight bash %}
symfony new my_project_name
{% endhighlight %}
Creating Symfony Applications without the Installer
{% highlight bash %}
composer create-project symfony/framework-standard-edition my_project_name
{% endhighlight %}
<h5>Creating a JSON Response</h5>
The Response object you return in your controller can contain HTML, JSON or even a binary file like an image or PDF. You can easily set HTTP headers or the status code.
Suppose you want to create a JSON endpoint that returns the lucky number. Just add a second method to LuckyController:
{% highlight php %}
// src/AppBundle/Controller/LuckyController.php
// ...
class LuckyController
{
    // ...
    /**
    * @Route("/api/lucky/number")
    */
    public function apiNumberAction()
    {
        $data = array('lucky_number' => rand(0, 100));
        return new Response(
            json_encode($data),
            200,
            array('Content-Type' => 'application/json')
        );
    }
}
{% endhighlight %}
You can even shorten this with the handy JsonResponse:
{% highlight php %}
// src/AppBundle/Controller/LuckyController.php
// ...
// --> don't forget this new use statement
use Symfony\Component\HttpFoundation\JsonResponse;
class LuckyController
{
    // ...
    /**
    * @Route("/api/lucky/number")
    */
    public function apiNumberAction()
    {
        $data = array(
            'lucky_number' => rand(0, 100),
        );
        // calls json_encode and sets the Content-Type header
        return new JsonResponse($data);
    }
}
{% endhighlight %}
<h5>Using the templating Service</h5>
This doesn't change anything, but it does give you access to Symfony's container: an array-like object that gives you access to every useful object in the system. These useful objects are called services, and Symfony ships with a service object that can render Twig templates, another that can log messages and many more.
To render a Twig template, use a service called templating:
{% highlight php %}
// src/AppBundle/Controller/LuckyController.php
// ...
class LuckyController extends Controller
{
    /**
    * @Route("/lucky/number/{count}")
    */
    public function numberAction($count)
    {
        // ...
        $numbersList = implode(', ', $numbers);
        $html = $this->container->get('templating')->render(
            'lucky/number.html.twig',
            array('luckyNumberList' => $numbersList)
        );
        return new Response($html);
    }
    // ...
}
{% endhighlight %}
But this can get even easier! By extending the Controller class, you also get a lot of shortcut methods, like render():
{% highlight php %}
// src/AppBundle/Controller/LuckyController.php
// ...
/**
* @Route("/lucky/number/{count}")
*/
public function numberAction($count)
{
    // ...
    /*
    $html = $this->container->get('templating')->render(
    'lucky/number.html.twig',
    array('luckyNumberList' => $numbersList)
    );
    return new Response($html);
    */
    // render: a shortcut that does the same as above
    return $this->render(
    'lucky/number.html.twig',
    array('luckyNumberList' => $numbersList)
    );
}
{% endhighlight %}
<h5>Managing Errors and 404 Pages</h5>
When things are not found, you should play well with the HTTP protocol and return a 404 response. To do this, you'll throw a special type of exception. If you're extending the base Controller class, do the following:
{% highlight php %}
public function indexAction()
{
    // retrieve the object from database
    $product = ...;
    if (!$product) {
        throw $this->createNotFoundException('The product does not exist');
    }
    return $this->render(...);
}
{% endhighlight %}
The createNotFoundException() method is just a shortcut to create a special
NotFoundHttpException object, which ultimately triggers a 404 HTTP response inside Symfony.
Of course, you're free to throw any Exception class in your controller - Symfony will automatically return a 500 HTTP response code.
{% highlight php %}
throw new \Exception('Something went wrong!');
{% endhighlight %}
<h5>Managing the Session</h5>
Symfony provides a nice session object that you can use to store information about the user (be it a real person using a browser, a bot, or a web service) between requests. By default, Symfony stores the attributes in a cookie by using the native PHP sessions.
To retrieve the session, call getSession() method on the Request object. This method returns a SessionInterface with easy methods for storing and fetching things from the session:
{% highlight php %}
use Symfony\Component\HttpFoundation\Request;
public function indexAction(Request $request)
{
    $session = $request->getSession();
    // store an attribute for reuse during a later user request
    $session->set('foo', 'bar');
    // get the attribute set by another controller in another request
    $foobar = $session->get('foobar');
    // use a default value if the attribute doesn't exist
    $filters = $session->get('filters', array());
}
{% endhighlight %}
<h5>Flash Messages</h5>
You can also store special messages, called "flash" messages, on the user's session. By design, flash messages are meant to be used exactly once: they vanish from the session automatically as soon as you retrieve them. This feature makes "flash" messages particularly great for storing user notifications.
For example, imagine you're processing a form submission:
{% highlight php %}
use Symfony\Component\HttpFoundation\Request;
public function updateAction(Request $request)
{
    $form = $this->createForm(...);
    $form->handleRequest($request);
    if ($form->isValid()) {
        // do some sort of processing
        $this->addFlash(
            'notice',
            'Your changes were saved!'
        );
        // $this->addFlash is equivalent to $this->get('session')->getFlashBag()->add
        return $this->redirectToRoute(...);
    }
    return $this->render(...);
}
{% endhighlight %}
After processing the request, the controller sets a flash message in the session and then redirects. The message key (notice in this example) can be anything: you'll use this key to retrieve the message.
In the template of the next page (or even better, in your base layout template), read any flash messages from the session:
{% highlight php %}
{% for flash_message in app.session.flashbag.get('notice') %}
<div class="flash-notice">
{{ flash_message }}
</div>
{% endfor %}
{% endhighlight %}
<h5>Visualizing & Debugging Routes</h5>
{% highlight php %}
php bin/console debug:router
{% endhighlight %}
<h5>Linking to Assets</h5>
{% highlight bash %}
<img src="{{ asset('images/logo.png') }}" alt="Symfony!" />
<link href="{{ asset('css/blog.css') }}" rel="stylesheet" />
<img src="{{ absolute_url(asset('images/logo.png')) }}" alt="Symfony!" />
{% endhighlight %}
<h5>What is a Service?</h5>
Put simply, a Service is any PHP object that performs some sort of "global" task. It's a purposefully-generic name used in computer science to describe an object that's created for a specific purpose (e.g. delivering emails). Each service is used throughout your application whenever you need the specific functionality it provides. You don't have to do anything special to make a service: simply write a PHP class with some code that accomplishes a specific task.
<h5>What is a Service Container?</h5>
A Service Container (or dependency injection container) is simply a PHP object that manages the
instantiation of services (i.e. objects).
For example, suppose you have a simple PHP class that delivers email messages. Without a service container, you must manually create the object whenever you need it:
{% highlight php %}
use AppBundle\Mailer;

$mailer = new Mailer('sendmail');
$mailer->send('ryan@example.com', ...);
{% endhighlight %}
<h5>Creating/Configuring Services in the Container</h5>
A better answer is to let the service container create the Mailer object for you. In order for this to work, you must teach the container how to create the Mailer service. This is done via configuration, which can be specified in YAML, XML or PHP:
{% highlight php %}
#app/config/services.yml
  services:
    app.mailer:
       class:      AppBundle\Mailer
       arguments:  [sendmail]
{% endhighlight %}
When Symfony initializes, it builds the service container using the application configuration (app/config/config.yml by default). The exact file that's loaded is dictated by the AppKernel::registerContainerConfiguration() method, which loads an environment-specific configuration file (e.g. config_dev.yml for the dev environment or config_prod.yml for prod).
An instance of the AppBundle\Mailer class is now available via the service container. The container is available in any traditional Symfony controller where you can access the services of the container via the get() shortcut method:
{% highlight php %}
class HelloController extends Controller
{
    // ...
    public function sendEmailAction()
    {
        // ...

        $mailer = $this->get('app.mailer');

        $mailer->send('ryan@foobar.net', ...);
    }
}
{% endhighlight %}
When you ask for the app.mailer service from the container, the container constructs the object and returns it. This is another major advantage of using the service container. Namely, a service is never constructed until it's needed. If you define a service and never use it on a request, the service is never created. This saves memory and increases the speed of your application. This also means that there's very little or no performance hit for defining lots of services. Services that are never used are never constructed.
<h5>Service Parameters</h5>
{% highlight php %}
# app/config/services.yml
  parameters:
    app.mailer.transport: sendmail
    
  services:
    app.mailer:
       class:      AppBundle\Mailer
       arguments:  ['%app.mailer.transport%']
{% endhighlight %}
The end result is exactly the same as before - the difference is only in how you defined the service. By enclosing the app.mailer.transport string with percent (%) signs, the container knows to look for a parameter with that name. When the container is built, it looks up the value of each parameter and uses it in the service definition.
{% highlight php %}
# app/config/parameters.yml
parameters:
  # This will be parsed as string '@securepass'
  mailer_password: '@@securepass'
{% endhighlight %}
<h5>Debugging Services</h5>
{% highlight php %}
php bin/console debug:container
{% endhighlight %}
