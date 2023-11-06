---
layout: post
title:  "Type hinting in PHP"
date:   2023-11-06 11:46:56
categories: PHP
description: Type hinting in PHP
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Type-hinting allows you to enforce specific types in your code. The code below tells the script to enforce strict types.
---
<p>Type-hinting allows you to enforce specific types in your code. The code below tells the script to enforce strict types:</p>
{% highlight php %}
declare(strict_types=1);
{% endhighlight %}
<p>Note: The strict_types declaration must be the very first statement in the script.</p>

<p>As of PHP 8.0, PHP has thirteen different types you can specify for declarations in your code. Let's take a look at each of them below:</p>
<ul>
<li>string - Value must be a string.</li>
<li>int - Value must be an integer.</li>
<li>float - Value must be a floating-point number.</li>
<li>bool - Value must be Boolean (i.e., either true or false).</li>
<li>array - Value must be an array.</li>
<li>iterable - Value must be an array or object that can be used with the foreach loop.</li>
<li>callable - Value must be a callable function.</li>
<li>parent - Value must be an instance of the parent to the defining class. This can only be used on class and instance methods.</li>
<li>self - Value must be either an instance of the class that defines the method or a child of the class. This can only be used on class and instance methods.</li>
<li>interface name - Value must be an object that implements the given interface.</li>
<li>class name - Value must be an instance of the given class name.</li>
<li>mixed - Value can be any type.</li>
<li>void - Value must be nothing. It can only be used in function returns.</li>
</ul>

<p>Type-Hinting Function Parameters</p>
{% highlight php %}
function add(int $a, int $b) {
    return $a + $b;
}
{% endhighlight %}
<p>Type-Hinting Function Returns</p>
{% highlight php %}
function add(int $a, int $b): int {
    return $a + $b;
}
{% endhighlight %}
<p>Sometimes, you might not want to return anything from a function; if you would like to enforce this, you can use the void type:</p>
{% highlight php %}
function like(): void {
    $post->likes + 1;
    return;
}
{% endhighlight %}
<p>Alternatively, you might want to return the instance of the object that defines a function from the same function. You can use the static type for this purpose:</p>
{% highlight php %}
class Person
{
    public function returnPerson(): static
    {
        return new Person();
    }
}
{% endhighlight %}
<p>The code above defines a class, Person, with a function, returnPerson, that returns a Person object.</p>

<p>Nullable Types</p>
{% highlight php %}
function greeting(?string $username) : ?string
{
    if ($username) {
        return "Hello, $username!";
    }
    return null;
}
{% endhighlight %}
<p>Union Types</p>
{% highlight php %}
function formatPrice(float | int $price): string
{
    return '$' . number_format($price, 2);
}
{% endhighlight %}
<p>Type-Hinting Class Properties</p>
{% highlight php %}
class Person
{
    public string $name;
    public int $age;
    public float $height;
    public bool $is_married;

    public function __construct($name, $age, $height, $is_married)
    {
        $this->name = $name;
        $this->age = $age;
        $this->height = $height;
        $this->is_married = $is_married;
    }
}
{% endhighlight %}
<p>The callable Type</p>
{% highlight php %}
function sortArray(callable $sort_function, array $array)
{
    $sort_function($array);
    return $array;
}

function bubbleSort(array $array): array
{
    $sorted = false;
    while (!$sorted) {
        $sorted = true;
        for ($i = 0; $i < count($array) - 1; $i++) {
            if ($array[$i] > $array[$i + 1]) {
                $temp = $array[$i];
                $array[$i] = $array[$i + 1];
                $array[$i + 1] = $temp;
                $sorted = false;
            }
        }
    }
    print_r($array);
    return $array;
}

sortArray('bubbleSort', [1, 3, 2, 5, 4]);
{% endhighlight %}
<p>Constructor property promotion</p>
{% highlight php %}
class Customer
{
    public function __construct(
        public string $name, 
        public string $email, 
        public DateTimeImmutable $birth_date,
    ) {}
}
{% endhighlight %}
