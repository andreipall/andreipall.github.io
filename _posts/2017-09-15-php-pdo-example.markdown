---
layout: post
title:  "PHP PDO Example"
date:   2017-09-15 12:46:56
categories: PHP
description: PHP PDO Example
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: PDO - PHP Data Objects - is a database access layer providing a uniform method of access to multiple databases. This tutorial isn't meant to be a complete how-to on SQL. It's written primarily for people currently using the mysql or mysqli extension to help them make the jump to the more portable and powerful PDO.
---

PDO - PHP Data Objects - is a database access layer providing a uniform method of access to multiple databases. This tutorial isn't meant to be a complete how-to on SQL. It's written primarily for people currently using the mysql or mysqli extension to help them make the jump to the more portable and powerful PDO.

{% highlight php %}
<?php
// Official documentation: http://php.net/manual/en/book.pdo.php

/* Class that we will use to hold our data */
class Employee {
  private $last_name;
  private $first_name;
  private $salary;

  public function getFirstName(){ return $this->first_name; }
  public function getLastName(){ return $this->last_name; }
  public function getSalary(){ return $this->salary; }
  public function getYearlySalary(){ return $this->salary * 12; }
}

/* Create main PDO object */
$dsn = "mysql:host=127.0.0.1;dbname=hr;charset=utf8mb4";
$pdo = new PDO($dsn, 'hr_user', 'secretpassword');

/* Execute a prepared statement by binding PHP variables */
$emp_id = 99;
$emp_lastname = 'King';

$stmt = $pdo->prepare('SELECT first_name, last_name, salary FROM employees
  WHERE employee_id > :emp_id AND last_name = :emp_lastname');

/* Bind the variables (note that we specify the type) */
$stmt->bindParam(':emp_id', $emp_id);
$stmt->bindParam(':emp_lastname', $emp_lastname);

/* Execute the statement */
$stmt->execute();

/* Get all rows - note that this array will contain "Employee" objects */
$result = $stmt->fetchAll(PDO::FETCH_CLASS, 'Employee');

/* Go over each of the rows */
echo "<ul>";
foreach($result as $employee) {
  // var_dump($employee);
  printf("<li>first_name: %s, last_name: %s, salary: %.2f</li>",
    $employee->getFirstName(), $employee->getLastName(), $employee->getSalary());
}
echo "</ul>";

?>
{% endhighlight %}
