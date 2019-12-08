---
layout: post
title:  "Ruby Variables Scope"
date:   2017-06-12 16:46:56
categories: Ruby
description: Ruby Variables Scope
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Scope defines where in a program a variable is accessible. Ruby has four types of variable scope, local, global, instance and class. In addition, Ruby has one constant type. Each variable type is declared by using a special character at the start of the variable name as outlined in the following table.
---

<h3>What is Variable Scope?</h3>
Scope defines where in a program a variable is accessible. Ruby has four types of variable scope, local, global, instance and class. In addition, Ruby has one constant type. Each variable type is declared by using a special character at the start of the variable name as outlined in the following table.

<table cellspacing="0" border="1">
<tbody><tr style="background:#efefef;">
<th>Name Begins With</th><th>Variable Scope</th>
</tr><tr><td><code>$</code> </td><td>A global variable </td></tr>
<tr><td>
<code>@</code> </td><td> An instance variable </td></tr>
<tr><td>
<code>[a-z]</code> or <code>_</code> </td><td>A local variable </td></tr>
<tr><td>
<code>[A-Z]</code> </td><td>A constant</td></tr>
<tr><td>
<code>@@</code></td><td>A class variable</td></tr></tbody></table>

In addition, Ruby has two pseudo-variables which cannot be assigned values. These are nil which is assigned to uninitialized variables and self which refers to the currently executing object. In the remainder of this chapter we will look at each of these variable scopes in turn. 

<h3>Ruby Local Variables</h3>
Local variables are local to the code construct in which they are declared. For example, a local variable declared in a method or within a loop cannot be accessed outside of that loop or method. Local variable names must begin with either an underscore or a lower case letter. For example: 
{% highlight ruby %}
loopcounter = 10
_LoopCounter = 20
{% endhighlight %}
<h3>Ruby Global Variables</h3>
Global variables in Ruby are accessible from anywhere in the Ruby program, regardless of where they are declared. Global variable names are prefixed with a dollar sign ($). For example: 
{% highlight ruby %}
$welcome = "Welcome to Ruby Essentials"
{% endhighlight %}
Use of global variables is strongly discouraged. The problem with global variables is that, not only are they visible anywhere in the code for a program, they can also be changed from anywhere in the application. This can make tracking bugs difficult. 
<h3>Ruby Class Variables</h3>
A class variable is a variable that is shared amongst all instances of a class. This means that only one variable value exists for all objects instantiated from this class. This means that if one object instance changes the value of the variable, that new value will essentially change for all other object instances.
Another way of thinking of thinking of class variables is as global variables within the context of a single class.
Class variables are declared by prefixing the variable name with two @ characters (@@). Class variables must be initialized at creation time. For example: 
{% highlight ruby %}
@@total = 0
{% endhighlight %}
<h3>Ruby Instance Variables</h3>
Instance variables are similar to Class variables except that their values are local to specific instances of an object. For example if a class contains an instance variable called @total, if one instance of the object changes the current value of @total the change is local to only the object that made the change. Other objects of the same class have their own local copies of the variable which are independent of changes made in any other objects.

Instance variables are declared in Ruby by prefixing the variable name with a single @ sign: 
{% highlight ruby %}
@total = 10
{% endhighlight %}
<h3>Ruby Constant Scope</h3>
Ruby constants are values which, once assigned a value, should not be changed. I say should because Ruby differs from most programming languages in that it allows a constant value to be changed after it has been declared, although the interpreter will protest slightly with a warning message.
Constants declared within a class or module are available anywhere within the context of that class or module. Constants declared outside of a class or module are assigned global scope. 
