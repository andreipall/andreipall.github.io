---
layout: post
title:  "PHP Magic Methods"
date:   2018-04-25 12:46:56
categories: PHP
description: PHP Magic Methods
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: The function names __construct(), __destruct(), __call(), __callStatic(), __get(), __set(), __isset(), __unset(), __sleep(), __wakeup(), __toString(), __invoke(), __set_state(), __clone() and __debugInfo() are magical in PHP classes. You cannot have functions with these names in any of your classes unless you want the magic functionality associated with them.
---
The function names __construct(), __destruct(), __call(), __callStatic(), __get(), __set(), __isset(), __unset(), __sleep(), __wakeup(), __toString(), __invoke(), __set_state(), __clone() and __debugInfo() are magical in PHP classes. You cannot have functions with these names in any of your classes unless you want the magic functionality associated with them.
Caution PHP reserves all function names starting with __ as magical. It is recommended that you do not use function names with __ in PHP unless you want some documented magic functionality.

<h3>__toString()</h3>
{% highlight php %}
<?php 
	class Test 
	{ 
		public $name; 
		public function __construct($name) 
		{ 
			$this->name= $name; 
		} 
		
	} 
	 
	$obj = new Test('Tim'); 
	echo $obj; 
?> 
{% endhighlight %}
<h3>__set_state()</h3>
{% highlight php %}
<?php
	class Test  
	{ 
		private $value1; 
		private $value2; 
		public function __construct()  
		{ 
			$this->value1 = 100;  
			$this->value2 = "name"; 
		} 
		public static function __set_state(array $array) { 
			  $tmp = new Test(); 
			  $tmp->value1 = $array['value1']; 
			  $tmp->value2 = "my ".$array['value2']; 
			  return $tmp; 
		 }
	} 
  $testObj = new Test(); 
  $strCode = var_export($testObj, true);
  
  eval($strCode.';');
?>
{% endhighlight %}
<h3>__invoke()</h3>
{% highlight php %}
<?php 
	class test 
	{ 
		public function __invoke() 
		{ 
			echo "I can act as a function now....."; 
		} 
	} 
	$obj = new test; 
	$obj(); 
	var_dump(is_callable($obj));

?>
{% endhighlight %}
<h3>__debugInfo()</h3>
{% highlight php %}
<?php
	class Student 
		{  
		private $id;
		public $name;

		public function __construct( $id, $name)  
		{ 
			$this->id = $id;
			$this->name = $name;   
		} 
		public function __debugInfo() { 
        return [ 
				'Student Id' => $this->id * 2, 
				'Address'=> 'abc' 
			   ]; 
		}
	}  
	$stuObj = new Student( 2, "name");
	var_dump($stuObj);
?>
{% endhighlight %}
<h3>__sleep()</h3>
{% highlight php %}
<?php
	Class Student{
		public $name;
		public $id;
		public $address;
		public $age;
		
		public function printStudentInfo(){
			echo "Student name = ".$this->name."</br>";
			echo "Student id = ".$this->id."</br>";
		}
		
		public function __sleep() {
		 //(Clean up; close database handles, etc)
			return array( "id", "address" );
		}
		

	}
?>
{% endhighlight %}
{% highlight php %}
<?php
// page1.php:

  include("Student1.php");
  
  $stuObj = new Student;
  $stuObj->name= "Tim";
  $stuObj->id = 10;
  $stuObj->address= "abc";
  $stuObj->age = 20;
  
 $s = serialize($stuObj);

  echo $s;
  
  // store $s somewhere where page2.php can find it.
  file_put_contents('store.txt', $s);
?>
{% endhighlight %}
<h3>__wakeup()</h3>
{% highlight php %}
<?php
	Class Student{
		public $name;
		public $id;
		public $address;
		public $age;
		
		public function printStudentInfo(){
			echo "Student name = ".$this->name."</br>";
			echo "Student id = ".$this->id."</br>";
		}

		public function __sleep() {
		 return array_keys( get_object_vars( $this ) );
		}
		
		public function __wakeup() {
		 echo "Hello guys i m back from hibernation....</br>";
		}
		
	}
	
?>
{% endhighlight %}
{% highlight php %}
<?php
// page2.php:
  // this is needed for the unserialize to work properly.
  include("Student3.php");

  $s = file_get_contents('store.txt');
  $stuObj = unserialize($s);

  // now use the function printStudentInfo() of the $stuObj object.  
  $stuObj->printStudentInfo();
?>
{% endhighlight %}
<h3>__clone()</h3>
{% highlight php %}
<?php
	class Charger{
		public $name;
		public function __construct($name){
		 $this->name = $name;
		}
		public function charging(){
			echo "Charger name ".$this->name." Charging........";
		}
	}
	Class ToyCar{
		public $carName;
		Public $colour;
		Public $chargerObj;
		
		public function __clone(){
			$this->chargerObj = clone $this->chargerObj;
		}
		
		public function __construct($name, $colour, $charger){
		 $this->carName = $name;
		 $this->colour  = $colour;
		 $this->chargerObj	= $charger;
		}

	}

	$charObj = new Charger("6 Volt Charger.");
	$carObj  = new ToyCar("Car 1", "Black", $charObj);

	$otherCarObj = clone $carObj;
	
	$otherCarObj->carName = "Car2";
	$otherCarObj->chargerObj->name = "12 Volt Charger";

	print_r($carObj);
	
	echo "</br></br>";
	
	print_r($otherCarObj);
?>
{% endhighlight %}
<h3>__set()</h3>
{% highlight php %}
<?php
class Student 
{ 
	public function __set( $propertyName, $propertyValue )  
	{  
		echo"Property name is $propertyName and its value is $propertyValue";  
	}  
} 
 $stuObj = new Student();  
 $stuObj->grade = "Good Grades";   
?>
{% endhighlight %}
<h3>__get()</h3>
{% highlight php %}
<?php
class Student 
{ 
	public function __set( $propertyName, $propertyValue )  
	{  
		echo"Property name is $propertyName and its value is $propertyValue";  
	} 
	 public function __get( $propertyName )  
	 {  
		return "Tim";  
	 }  
} 
 $stuObj = new Student();  
 echo $stuObj->studenName; 
?>
{% endhighlight %}
<h3>__isset() and __unset()</h3>
{% highlight php %}
<?php
	class Student{
		private $_extraInfo = array();
		
		public function __set($propertyName,$propertyValue){
			$this->_extraInfo[$propertyName] = $propertyValue;
		}
		
		public function __get($propertyName){
			if ( array_key_exists( $propertyName, $this->_extraInfo ) ) {
				 return $this->_extraInfo[$propertyName];
			} else {
				 return null;
			}
		}
		
		public function __isset($propertyName){
			if(isset($this->_extraInfo[$propertyName])){
				echo "Property \$$propertyName is set.<br/>";		
			} else {
				echo "Property \$$propertyName is not set.<br/>";
			}
		}
		
		public function __unset($propertyName){
			unset($this->_extraInfo[$propertyName]);
			
			echo "\$$propertyName is unset <br/>";
		}
		
	}
	$objStudent = new Student();

	$objStudent->birthCountry = "Germany";
	$objStudent->nationality = "United Kingdom";
	
	echo "Overloaded Property name is \$birthCountry= ";
	echo $objStudent->birthCountry . "</br>";
	
	echo "Overloaded Property name is \$nationality= ";
	echo $objStudent->nationality . "</br></br>";

	
	isset($objStudent->birthCountry);
	isset($objStudent->nationality);
	echo "</br>";
	
	unset($objStudent->birthCountry);
	unset($objStudent->nationality);
	echo "</br>";
	
	isset($objStudent->birthCountry);
	isset($objStudent->nationality);
?>
{% endhighlight %}
<h3>__call() and __callStatic()</h3>
{% highlight php %}
<?php
class Test
{
    public function __call($methodName, $arguments)
    {
        echo "Calling object method '$methodName' with Arguments("
             . implode(', ', $arguments). ")</br></br>";
    }
	
    public static function __callStatic($methodName, $arguments)
    {
		echo "Static method $methodName is called.";
        if($methodName == "multiply"){	
			$total = 1;
			foreach($arguments as $num){
				$total = $total * $num;
			}
			echo " answer is = $total";
		}else{
			echo " I am not doing anything Hun!!!.";
		}
    }
}
	$obj = new Test;
    $obj->runTest(1,2);
	Test::Multiply(2, 4, 3, 4, 5);

?>
{% endhighlight %}
