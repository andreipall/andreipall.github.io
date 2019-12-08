---
layout: post
title:  "PHP testing with PHPUnit"
date:   2014-09-14 18:20:53
categories: PHP
description: PHP testing with PHPUnit
keywords: [Andrei Pall, blog, php, test]
excerpt: PHPUnit is a unit testing framework for the PHP programming language. It is an instance of the xUnit architecture for unit testing frameworks that originated with SUnit and became popular with JUnit. PHPUnit was created by Sebastian Bergmann and its development is hosted on GitHub.
---

<h6>Install PHPUnit</h6>

PHPUnit 4.2 requires PHP 5.3.3; using the latest version of PHP is highly recommended.

PHPUnit requires the dom and json extensions, which are normally enabled by default.

PHPUnit also requires the pcre, reflection, and spl extensions. They are required by PHP core since 5.3.0 and normally cannot be disabled.

The easiest way to obtain PHPUnit is to download a PHP Archive (PHAR) that has all required (as well as some optional) dependencies of PHPUnit bundled in a single file.

The phar extension is required for using PHP Archives (PHAR).

The openssl extension is required for using the --self-update feature of the PHAR.

If the Suhosin extension is enabled, you need to allow execution of PHARs in your php.ini:
{% highlight bash %}
suhosin.executor.include.whitelist = phar
{% endhighlight %}

To globally install the PHAR:
{% highlight bash %}
sudo apt-get install php-pear
wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
sudo mv phpunit.phar /usr/local/bin/phpunit
phpunit --version
{% endhighlight %}
To install via Composer create the project tdd and inside create the composer.json file:
{% highlight javascript %}
{
    "require-dev": {
        "phpunit/phpunit": "4.2.*"
    }
}
{% endhighlight %}
<h6>Write our first test</h6>
After install lets write our first test:
{% highlight php %}
<?php
class SomeTest extends PHPUnit_Framework_TestCase
{
  public function testSomething()
  {
    $this->assertTrue(true);
  }
}
?>
{% endhighlight %}
and run the test:
{% highlight bash %}
phpunit test.php
PHPUnit 4.2.5 by Sebastian Bergmann.

.

Time: 24 ms, Memory: 2.50Mb

OK (1 test, 1 assertion)
{% endhighlight %}
Next create the class Calculator.php inside the src directory:
{% highlight php %}
<?php
class Calculator
{

}
?>
{% endhighlight %}
To test the class create the file CalculatorTest.php inside the tests directory:
{% highlight php %}
<?php
class CalculatorTest extends PHPUnit_Framework_TestCase
{
  public function testSomething()
  {
  }
}
?>
{% endhighlight %}
and run the test:
{% highlight bash %}
phpunit CalculatorTest.php
PHPUnit 4.2.5 by Sebastian Bergmann.

.

Time: 21 ms, Memory: 2.50Mb

OK (1 test, 0 assertions)
{% endhighlight %}
The methods must be public and start with test to be recognized as tests.
<h6>Assertions</h6> 
{% highlight php %}
<?php
class AssertionsTest extends PHPUnit_Framework_TestCase
{
  public function testBasicAssertion()
  {
    $this->assertTrue(1 + 5 == 6);
  }
}
?>
{% endhighlight %}
{% highlight bash %}
phpunit --colors AssertionsTest.php
PHPUnit 4.2.5 by Sebastian Bergmann.

.

Time: 22 ms, Memory: 2.50Mb

OK (1 test, 1 assertion)
{% endhighlight %}
<h6>Exceptions</h6>
{% highlight php %}
<?php
class AssertionsTest extends PHPUnit_Framework_TestCase
{
  public function testException()
  {
    try {
      throw new LogicException('Foo', 1234);
    } catch(LogicException $e) {
      $this->assertEquals($e->getMessage(), 'Foo');
      $this->assertEquals($e->getCode(), 1234);
    }
  }
}
?>
{% endhighlight %}
{% highlight php %}
<?php
class AssertionsTest extends PHPUnit_Framework_TestCase
{
  /**
   * @expectedException        LogicException
   * @expectedExceptionMessage Foo
   * @expectedExceptionCode    1234
   */
  public function testException()
  {
    throw new LogicException('Foo', 1234);
  }
}
?>
{% endhighlight %}
<h6>Errors, warnings and notices</h6>
{% highlight php %}
<?php
class ExampleTest extends PHPUnit_Framework_TestCase
{
  /**
   * @expectedException PHPUnit_Framewrk_Error
   */
  public function testError()
  {
    new SomeClassThatDontExistsInThatContext;
  }
  
  /**
   * @expectedException PHPUnit_Framewrk_Error_Warning
   */
  public function testWarning()
  {
    new SomeClassThatDontExistsInThatContext;
  }
  
  /**
   * @expectedException PHPUnit_Framewrk_Error_Notice
   */
  public function testNotice()
  {
    $_GET[THAT_CONSTANT_IS_NOT_DEFINED];
  }
}
?>
{% endhighlight %}
We can not test fatal errors because fatal erors stop de execution of the script.
<h6>Testing output</h6>
{% highlight php %}
<?php
class Command
{
  const VERSION ='0.0.1';
  
  public function printVersion()
  {
    print 'Version is ' . self::VERSION;
  }
}

class OutputTest extends PHPUnit_Framework_TestCase
{
  /**
   * @expectedException        LogicException
   * @expectedExceptionMessage Foo
   * @expectedExceptionCode    1234
   */
  public function testOutputsHello()
  {
    ob_start();
    $command = new Command();
    $command->printVersion();
    $txt = ob_get_clean();
    $this->assertEquals('Version is 0.0.1', $txt);
  }
}
?>
{% endhighlight %}
<h6>Incomplete and skipped tests</h6>
{% highlight php %}
<?php
class SomeClassTest extends PHPUnit_Framework_TestCase
{
  public function testSomethingThatDontExistsNow()
  {
    this>markTestIncomplete('Waiting for implementation');
  }
}
?>
{% endhighlight %}
<h6>Fixtures</h6>
{% highlight php %}
<?php
class SomeClassTest extends PHPUnit_Framework_TestCase
{
  protected $data;
  
  public static function setUpBeforeClass()
  {
    echo 'once at the beginning';
  }
  
  public function setUp()
  {
    $this->data = array(1, 2, 3);
  }
  
  public function testPushingToArray()
  {
    array_push($this->data, 5);
    $this->assertCount(4, $this->data);
    $this->assertContains(1, $this->data);
    $this->assertContains(2, $this->data);
    $this->assertContains(3, $this->data);
    $this->assertContains(4, $this->data);
  }
  
  public function testPopFromArray()
  {
    array_pop($this->data);
    $this->assertCount(2, $this->data);
    $this->assertContains(1, $this->data);
    $this->assertContains(2, $this->data);
    $this->assertNotContains(3, $this->data);
  }
  
  public function testShiftFromArray()
  {
    array_shift($this->data);
    $this->assertCount(2, $this->data);
    $this->assertContains(2, $this->data);
    $this->assertContains(3, $this->data);
    $this->assertNotContains(1, $this->data);
  }
  
  public function tearDown()
  {
    echo 'End';
  }
  
  public static function tearDownAfterClass()
  {
    echo 'once at the end';
  }
}
?>
{% endhighlight %}
<h6>Mocks</h6>
{% highlight php %}
<?php
interface TaskInterface
{
  public function execute(array $options);
}
?>
{% endhighlight %}
{% highlight php %}
<?php
require_once 'TaskInterface.php';

class TaskRunner
{
  protected $tasks = array();
  
  public function registerTask(TaskInterface $task)
  {
    $this->tasks[] = $task;
  }
  
  public function runAll($options)
  {
    foreach($this->tasks as $task) {
      $task->execute($options);
    }
  }
}
?>
{% endhighlight %}
{% highlight php %}
<?php
require_once '../src/TaskRunner.php';

class TaskRunnerTest extends PHPUnit_Framework_TestCase
{
  public function testRunAllPassesParamsCorrectly()
  {
    $mock = $this->getMock('TaskInterface', array('execute'));
    $mock->expects($this->exactly(2))
         ->method('execute')
         ->with($this->equalTo(array('foo')));
         
    $runner = new TaskRunner();
    $runner->registerTask($mock);
    $runner->registerTask($mock);
    $runner->runAll(array('foo'));
  }
}
?>
{% endhighlight %}
<h6>Stubs</h6>
{% highlight php %}
<?php
class Config
{
  public function get()
  {
    return 'd-m-Y';
  }
}
?>
{% endhighlight %}
{% highlight php %}
<?php
class DateFormatter
{
  protected $config;
  
  public function __construct(Config $config)
  {
    $this->config = $config;
  }
  
  public function getFormattedDate($timestamp)
  {
    return date($this->config->get('date.format'), $timestamp);
  }
}
?>
{% endhighlight %}
{% highlight php %}
<?php
require_once '../src/DateFormatter.php';
require_once '../src/Config.php

class DateFormatterTest extends PHPUnit_Framework_TestCase
{ 
  public function testFormattingDatesBasedOnConfig()
  {
    $stub = $this->getMock("Config");
    $stub->expects($this->any())
         ->method('get')
         ->will($this->returnValue('c'));
    
    $formatter = new DateFormatter($stub);
    $this->assertEquals($formatter->getFormattedDate(0), '1970-01-01T01:00:00+01:00');
    //var_dump($stub->get('param'));
  }
}
?>
{% endhighlight %}
<h6>Databases</h6>
{% highlight php %}
<?php
class SimpleDBTest extends PHPUnit_Framework_TestCase
{
  protected $db;
  
  public function setUp()
  {
    $this->db = new PDO('sqlite::memory:');
    $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    ...
  }
  
  public function testSummerizedResult()
  {
    $result = $this->db->query('SELECT SUM(score) AS sum FROM results WHERE user_id = 1')->fetchObject();
    $this->assertEquas(89466, $result->sum);
    
    $result = $this->db->query('SELECT SUM(score) AS sum FROM results WHERE user_id = 2')->fetchObject();
    $this->assertEquas(12, $result->sum);
  }
  
  public function testSingleResult()
  {
    $result = $this->db->query('SELECT * FROM results WHERE id = 2')->fetchObject();
    $expected = (object)array(
        'id' => 2,
        'game_id' => 1,
        'user_id' => 2,
        'score' =>89234
    );
    $this->assertEquals($expected, $result, '', 0, 10, true);
  }
  
  public function tearDown()
  {
    $this->db->exec('DROP TABLE results');
  }
}
?>
{% endhighlight %}
