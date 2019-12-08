---
layout: post
title:  "Learn JavaScript"
date:   2016-04-18 16:46:56
categories: JavaScript
description: Learn JavaScript
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: JavaScript (JS) is a lightweight, interpreted, programming language with first-class functions. Most well-known as the scripting language for Web pages, many non-browser environments also use it, such as node.js and Apache CouchDB. JS is a prototype-based, multi-paradigm, dynamic scripting language, supporting object-oriented, imperative, and functional programming styles.
---

JavaScript (JS) is a lightweight, interpreted, programming language with first-class functions. Most well-known as the scripting language for Web pages, many non-browser environments also use it, such as node.js and Apache CouchDB. JS is a prototype-based, multi-paradigm, dynamic scripting language, supporting object-oriented, imperative, and functional programming styles.

<h2>Variables, Types and Scope</h2>
{% highlight javascript %}
var orderId;
console.log(orderId);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
var orderId = 9001;
console.log(orderId);
{% endhighlight %}
{% highlight javascript %}
9001
{% endhighlight %}
{% highlight javascript %}
var orderId = 9001;
console.log(typeof orderId);
{% endhighlight %}
{% highlight javascript %}
number
{% endhighlight %}
{% highlight javascript %}
var orderId = “ORD-9001”;
console.log(typeof orderId);
{% endhighlight %}
{% highlight javascript %}
string
{% endhighlight %}
{% highlight javascript %}
var isActive = true;
console.log(typeof isActive);
{% endhighlight %}
{% highlight javascript %}
boolean
{% endhighlight %}
{% highlight javascript %}
var isActive;
console.log(typeof isActive);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
var order = {
  orderId: 9001,
  isActive: true
};
console.log(typeof order);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
var cancelledOrders = [9001, 9002,
9003];
console.log(typeof cancelledOrders);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
var order = null;
console.log(typeof order);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
function cancelOrder(orderId) {
};
console.log(typeof cancelOrder);
{% endhighlight %}
{% highlight javascript %}
function
{% endhighlight %}
<h2>Function Fundamentals</h2>
{% highlight javascript %}
function printOrder() {
  console.log(‘Printing order.’);
};
printOrder();
{% endhighlight %}
{% highlight javascript %}
Printing order.
{% endhighlight %}
{% highlight javascript %}
function calcTotalPrice(quantity, price) {
  console.log('Total price: ' + (quantity * price));
};
calcTotalPrice(2, 4.00);
{% endhighlight %}
{% highlight javascript %}
Total price: 8
{% endhighlight %}
{% highlight javascript %}
function calcTotalPrice(quantity, price, currency)
{
  console.log(currency);
};
calcTotalPrice(2, 4.00);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
function getOrder() {
// nothing returned
};
var order = getOrder();
console.log(order);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
<h2>If and Switch Statements</h2>
{% highlight javascript %}
var orderType = 'business';
var shipMethod;
if (orderType == 'business')
  shipMethod = 'FedEx';
else if (orderType == 'personal')
  shipMethod = 'UPS Ground';
else
  shipMethod = 'USPS';
console.log(shipMethod);
{% endhighlight %}
{% highlight javascript %}
FedEx
{% endhighlight %}
{% highlight javascript %}
var orderType = 'business';
var shipMethod;
switch (orderType) {
  case 'business':
    shipMethod = 'FedEx';
    // break;
  case 'personal':
    shipMethod = 'UPS Ground';
    break;
  default:
  shipMethod = 'USPS';
}
console.log(shipMethod);
{% endhighlight %}
{% highlight javascript %}
var orderTotal = 99.99;
var discount;
switch (true) {
  case orderTotal >= 50 && orderTotal < 75:
    discount = 10;
    break;
  case orderTotal >= 75 && orderTotal < 100:
    discount = 20;
    break;
  case orderTotal >= 100:
    discount = 30;
    break;
  default:
    discount = 0;
}
console.log(discount);
{% endhighlight %}
<h2>while and do...while Statements</h2>
{% highlight javascript %}
var lineItemCount = 3;
var currentItem = 0;
while (currentItem < lineItemCount) {
  console.log("item: " + currentItem);
  currentItem++;
}
{% endhighlight %}
{% highlight javascript %}
var lineItemCount = 3;
var currentItem = 0;
do {
  console.log("item: " + currentItem);
  currentItem++;
} while (currentItem < lineItemCount);
{% endhighlight %}
<h2>for and for...in</h2>
{% highlight javascript %}
var lineItemCount = 5;
for (var i = 0; i < lineItemCount; i++) {
  console.log(i);
  if (i == 1)
    break;
}
{% endhighlight %}
{% highlight javascript %}
0
1
{% endhighlight %}
{% highlight javascript %}
var lineItemCount = 5;
for (var i = 0; i < lineItemCount; i++) {
  if (i == 1)
    continue;
    console.log(i);
}
{% endhighlight %}
{% highlight javascript %}
0
2
3
4
{% endhighlight %}
{% highlight javascript %}
var lineItem = {
  product: "Widget 1",
  quantity: 4,
  price: 9.50
};
for (var field in lineItem)
  console.log(field + " : " + lineItem[field]);
{% endhighlight %}
{% highlight javascript %}
product : Widget 1
quantity : 4
price : 9.50
{% endhighlight %}
<h2>Hoisting</h2>
Hoisted variables are initialized to undefined.
{% highlight javascript %}
console.log(productId);
{% endhighlight %}
{% highlight javascript %}
ReferenceError:
productId is not defined
{% endhighlight %}
{% highlight javascript %}
console.log(productId);
var productId = '9000';
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
var total = price * quantity;
var price = 3.00;
var quantity = 5;
console.log(total);
{% endhighlight %}
{% highlight javascript %}
NaN
{% endhighlight %}
{% highlight javascript %}
showProduct();
function showProduct() {
  console.log('Showing a Product');
}
{% endhighlight %}
{% highlight javascript %}
Showing a Product
{% endhighlight %}
{% highlight javascript %}
showProduct();
var showProduct = function () {
  console.log('Showing a Product');
}
{% endhighlight %}
{% highlight javascript %}
TypeError: showProduct is not a function
{% endhighlight %}
{% highlight javascript %}
var showProduct = function () {
  console.log('Showing a Product');
}
showProduct();
{% endhighlight %}
{% highlight javascript %}
Showing a Product
{% endhighlight %}
{% highlight javascript %}
showProduct();
function showProduct() {
  console.log('Showing a Product');
}
{% endhighlight %}
{% highlight javascript %}
Showing a Product
{% endhighlight %}
<h2>Numbers</h2>
{% highlight javascript %}
var count;
var price = 5.00;
console.log(price / count);
{% endhighlight %}
{% highlight javascript %}
NaN
{% endhighlight %}
{% highlight javascript %}
console.log(typeof NaN);
{% endhighlight %}
{% highlight javascript %}
number
{% endhighlight %}
{% highlight javascript %}
var n = NaN;
if (isNaN(n))
  console.log('NaN!');
{% endhighlight %}
{% highlight javascript %}
NaN!
{% endhighlight %}
<h2>Strings</h2>
{% highlight javascript %}
var productType = 'Hardware';
console.log(productType.toLowerCase());
{% endhighlight %}
{% highlight javascript %}
hardware
{% endhighlight %}
<h2>Boolean Values</h2>
{% highlight javascript %}
var isSpecial = true;
if (isSpecial)
  console.log("It's true!");
{% endhighlight %}
{% highlight javascript %}
It’s true!
{% endhighlight %}
<h2>undefined and null</h2>
{% highlight javascript %}
var productId;
console.log(typeof productId);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
var productId = null;
console.log(typeof productId);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
console.log(typeof null);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
console.log(undefined == null);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
console.log(undefined === null);
{% endhighlight %}
{% highlight javascript %}
false
{% endhighlight %}
<h2>Global Scope</h2>
{% highlight javascript %}
PRD-2000
PRD-2000
{% endhighlight %}
{% highlight javascript %}
console.log(this === window);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
<h2>Function Scope</h2>
{% highlight javascript %}
var description = 'original product';
function updateProduct() {
  var description = 'updated product';
  var updateProductId = function () {
    console.log(description);
  }
}
updateProductId();
updateProduct();
{% endhighlight %}
{% highlight javascript %}
updated product
{% endhighlight %}
<h2>Block Scope</h2>
{% highlight javascript %}
'use strict';
try {
  throw 123;
}
catch (e) {
  console.log(e);
}
{% endhighlight %}
{% highlight javascript %}
123
{% endhighlight %}
{% highlight javascript %}
'use strict';
console.log(insideCatch);
try {
  throw 123;
}
catch (e) {
  var insideCatch = 'insideCatch';
  console.log(e);
}
{% endhighlight %}
{% highlight javascript %}
undefined
123
{% endhighlight %}
<h2>Reference Type Examples</h2>
{% highlight javascript %}
var blog = {
  name: 'Ski Utah'
};
var updatedBlog = blog;
console.log(updatedBlog.name);
{% endhighlight %}
{% highlight javascript %}
Ski Utah
{% endhighlight %}
{% highlight javascript %}
var blog = {
  name: 'Ski Utah'
};
function changeBlogName(localBlog) {
  localBlog.name = 'no name';
}
changeBlogName(blog);
console.log(blog.name);
{% endhighlight %}
{% highlight javascript %}
no name
{% endhighlight %}
<h2>Array Fundamentals</h2>
{% highlight javascript %}
var entries = new Array('Trains', 'Plains', 'Automobiles');
console.log(entries instanceof Array);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var entries = new Array('Trains', 42, true);
console.log(entries instanceof Array);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var entries = ['Trains', 'Plains', 'Automobiles'];
console.log(entries[3]);
{% endhighlight %}
{% highlight javascript %}
undefined
{% endhighlight %}
{% highlight javascript %}
var ratings = [];
ratings.push(5);
ratings.push(2, 4);
console.log(ratings.pop());
{% endhighlight %}
{% highlight javascript %}
4
{% endhighlight %}
<h2>Date Fundamentals</h2>
{% highlight javascript %}
var dt = new Date();
console.log(dt);
{% endhighlight %}
{% highlight javascript %}
Fri Sep 25 2016 11:20:11 GMT-0700 (Pacific Daylight Time)
{% endhighlight %}
{% highlight javascript %}
var dt = new Date();
console.log(dt.getFullYear());
{% endhighlight %}
{% highlight javascript %}
2016
{% endhighlight %}
<h2>Regular Expressions</h2>
{% highlight javascript %}
var blogText = "Sam I Am";
var pattern = /am/g;
console.log(pattern.test(blogText));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var blogText = "Sam I Am";
var pattern = /m/g;
var result = pattern.exec(blogText);
console.log(result);
{% endhighlight %}
{% highlight javascript %}
["m", index: 2, input: "Sam I Am"]
{% endhighlight %}
{% highlight javascript %}
var blogText = "Sam I Am";
var pattern = /m/g;
var result = blogText.match(pattern);
console.log(result);
{% endhighlight %}
{% highlight javascript %}
["m", "m"]
{% endhighlight %}
<h2>Simple Objects and JSON</h2>
{% highlight javascript %}
var project = new Object();
project.name = 'Project Phoenix';
console.log(project.name);
{% endhighlight %}
{% highlight javascript %}
Project Phoenix
{% endhighlight %}
{% highlight javascript %}
var project = new Object();
project.name = 'Project Phoenix';
project.securityLevel = 15;
project.updateDueDate = function () {
  return true;
};
console.log(project.updateDueDate());
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var project = {};
project.name = 'Project Phoenix';
console.log(project.name);
{% endhighlight %}
{% highlight javascript %}
Project Phoenix
{% endhighlight %}
{% highlight javascript %}
var project = {
  name: 'Project Phoenix',
  securityLevel: 15,
  updateDueDate: function () {
    return true;
  }
};
console.log(project.name);
{% endhighlight %}
{% highlight javascript %}
Project Phoenix
{% endhighlight %}
{% highlight javascript %}
var project = {
  tasks: [
    {
      taskName: 'first'
    },
    {
      taskName: 'second'
    }
  ]
};
console.log(project.tasks[1].taskName);
{% endhighlight %}
{% highlight javascript %}
second
{% endhighlight %}
<h2>Prototypes</h2>
Every JavaScript Object has a prototype property. However, we don't always have access to it.
The prototype property is simply an object.
{% highlight javascript %}
var project = anyObject;
project.someFunction();
{% endhighlight %}
How does JavaScript locate / resolve someFunction?
<ul>
<li>project.someFunction()</li>
<li>project.prototype.someFunction()</li>
<li>project.prototype.prototype.someFunction()</li>
<li>project.prototype.prototype.prototype.someFunction()</li>
<li>etc.</li>
</ul>

<h2>Object.create() and Prototypes</h2>
{% highlight javascript %}
var project = {
  securityLevel: 2
};
var secretProject = Object.create(project);
console.log(secretProject.__proto__ === Object.prototype);
{% endhighlight %}
{% highlight javascript %}
false
{% endhighlight %}
{% highlight javascript %}
var project = {
  securityLevel: 2
};
var secretProject = Object.create(project);
console.log(secretProject.__proto__.__proto__ === Object.prototype);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var task = { };
Object.defineProperty(task, 'text', {
  value: 'Get this job done!'
});
console.log(task.text);
{% endhighlight %}
{% highlight javascript %}
Get this job done!
{% endhighlight %}
{% highlight javascript %}
'use strict';
var task = {
  dueDate: '1/15/16'
};
Object.defineProperty(task, 'dueDate', {
  get: function () {
    return this.dueDate;
  },
  set: function (newValue) {
    this.dueDate = newValue;
  }
});
task.dueDate = '2/2/16';
console.log(task.dueDate);
{% endhighlight %}
{% highlight javascript %}
2/6/16
{% endhighlight %}
<h2>Miscellaneous Object Functions</h2>
{% highlight javascript %}
'use strict';
var project = {
  name: 'Top Secret Project',
  dueDate: '1/1/2016'
};
console.log(project.hasOwnProperty('name'));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
'use strict';
var project = {
  name: 'Top Secret Project',
  dueDate: '1/1/2016'
};
console.log(project.hasOwnProperty('toString'));
{% endhighlight %}
{% highlight javascript %}
false
{% endhighlight %}
{% highlight javascript %}
'use strict';
var project = {
  name: 'Top Secret Project',
  dueDate: '1/1/2016'
};
console.log(project.__proto__.hasOwnProperty('toString'));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
'use strict';
var project = {
  name: 'Top Secret Project',
  dueDate: '1/1/2016'
};
console.log(Object.prototype.isPrototypeOf(project));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var project = {
  securityLevel: 2
};
var secretProject = Object.create(project);
console.log(project.isPrototypeOf(secretProject));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var project = {
  securityLevel: 2
};
var secretProject = Object.create(project);
console.log(Object.prototype.isPrototypeOf(secretProject));
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
<h2>Naming Function Expressions</h2>
{% highlight javascript %}
var hireEmployee = function (name) {
};
console.log(typeof hireEmployee);
{% endhighlight %}
{% highlight javascript %}
function
{% endhighlight %}
{% highlight javascript %}
var hireEmployee = function (name) {
  throw ('Error');
};
hireEmployee('JJ');
{% endhighlight %}
{% highlight javascript %}
Uncaught Error - hireEmployee
{% endhighlight %}
<h2>Constructor Functions</h2>
{% highlight javascript %}
console.log(typeof Object);
{% endhighlight %}
{% highlight javascript %}
function
{% endhighlight %}
{% highlight javascript %}
var Employee = function (name) {
  this.name = name;
};
var newEmployee = new Employee('JJ');
console.log(typeof newEmployee);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
var Employee = function (name) {
  this.name = name;
};
var e1 = new Employee('JJ');
var e2 = new Employee('JV');
console.log(e1.__proto__ === e2.__proto__);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var Employee = function (name) {
  this.name = name;
  this.giveRaise = function () {
  };
};
var e1 = new Employee('JJ');
var e2 = new Employee('JV');
console.log(e1.giveRaise === e2.giveRaise);
{% endhighlight %}
{% highlight javascript %}
false
{% endhighlight %}
{% highlight javascript %}
console.log(typeof this);
{% endhighlight %}
{% highlight javascript %}
object
{% endhighlight %}
{% highlight javascript %}
console.log(this === window);
{% endhighlight %}
{% highlight javascript %}
true
{% endhighlight %}
{% highlight javascript %}
var name = 'Jeff';
console.log(this.name);
{% endhighlight %}
{% highlight javascript %}
Jeff
{% endhighlight %}
{% highlight javascript %}
var employee = {
  name: 'Jeff',
  updateSalary: function () {
    console.log(this);
  }
};
employee.updateSalary();
{% endhighlight %}
{% highlight javascript %}
Object {name: "Jeff"}
{% endhighlight %}
{% highlight javascript %}
var employee = {
  name: 'Jeff',
  updateSalary: function () {
    var fn = function () {
      console.log(this);
    };
    fn();
  }
};
employee.updateSalary();
{% endhighlight %}
{% highlight javascript %}
Window {...}
{% endhighlight %}
{% highlight javascript %}
var Address = function (line1) {
  this.line1 = line1;
};
Address.prototype.updateZipCode = function () {
  console.log(this);
};
var addr = new Address('123 State St.');
addr.updateZipCode();
{% endhighlight %}
{% highlight javascript %}
Address {line1: "123 State St."}
{% endhighlight %}
<h2>Using call() and apply()</h2>
{% highlight javascript %}
var updateZipCode = function () {
  console.log(this);
};
updateZipCode.call({});
{% endhighlight %}
{% highlight javascript %}
Object {}
{% endhighlight %}
{% highlight javascript %}
var updateZipCode = function () {
  console.log(this);
};
updateZipCode.call({ zip: '11787'});
{% endhighlight %}
{% highlight javascript %}
Object {zip: "11787"}
{% endhighlight %}
{% highlight javascript %}
var updateZipCode = function (newZip, country) {
  console.log(newZip + ' ' + country);
};
var zipCode = {
  zip: '11787'
};
updateZipCode.call(zipCode, '11888', 'us');
{% endhighlight %}
{% highlight javascript %}
11888 us
{% endhighlight %}
{% highlight javascript %}
var updateZipCode = function (newZip, country) {
  console.log(newZip + ' ' + country);
};
var zipCode = {
  zip: '11787'
};
updateZipCode.apply(zipCode, ['11888', 'us']);
{% endhighlight %}
{% highlight javascript %}
11888 us
{% endhighlight %}
{% highlight javascript %}
var updateZipCode = function (newZip, country) {
  console.log(newZip + ' ' + country);
};
var zipCode = {
  zip: '11787'
};
updateZipCode.apply(zipCode, '11888', 'us');
{% endhighlight %}
{% highlight javascript %}
Uncaught TypeError: Function.prototype.apply: Arguments list has wrong type
{% endhighlight %}
<h2>Closures</h2>
{% highlight javascript %}
var salaryUpdater = function (salary) {
  var currentSalary = salary;
  var generator = function () {
    currentSalary = currentSalary * 2;
    return currentSalary;
  };
  return generator;
};
var updateFn = salaryUpdater(50000);
console.log(updateFn());
{% endhighlight %}
{% highlight javascript %}
100000
{% endhighlight %}
{% highlight javascript %}
var salaryUpdater = function (salary) {
  var currentSalary = salary;
  var generator = function () {
    currentSalary += 10000;
    return currentSalary;
  };
  return generator;
};
var updateFn = salaryUpdater(50000);
updateFn();
console.log(updateFn());
{% endhighlight %}
{% highlight javascript %}
70000
{% endhighlight %}
<h2>IIFEs</h2>
Immediately Invoked Function Expressions
{% highlight javascript %}
(function () {
  console.log('Executed!');
})();
{% endhighlight %}
{% highlight javascript %}
Executed!
{% endhighlight %}
{% highlight javascript %}
var app = {};
(function (ns) {
  ns.name = 'None';
})(app);
console.log(app.name);
{% endhighlight %}
{% highlight javascript %}
None
{% endhighlight %}
<h2>Recursion</h2>
{% highlight javascript %}
var orgChart = {
name: 'Michael', subordinates: [
    {
      name: 'Andy', subordinates: [
      {
        name: 'Dwight', subordinates: []
      },
      {
        name: 'Kevin', subordinates: []
      }
      ]
    }
  ]
};
var fn = function (topEmployee) {
console.log(topEmployee.name);
for (var i = 0; i < topEmployee.subordinates.length; i++)
  fn(topEmployee.subordinates[i]);
};
fn(orgChart);
{% endhighlight %}
{% highlight javascript %}
Michael
Andy
Dwight
Kevin
{% endhighlight %}
<h2>Error Handling</h2>
{% highlight javascript %}
try {
  throw new Error('Custom Error');
}
catch (e) {
  console.log(e.name + ' - ' + e.message);
}
{% endhighlight %}
{% highlight javascript %}
Error - Custom Error
{% endhighlight %}
{% highlight javascript %}
try {
  throw new Error('Custom Error');
}
catch (e) {
  console.log(e.name + ' - ' + e.message);
}
finally {
  console.log('Finally done.');
}
{% endhighlight %}
{% highlight javascript %}
Error - Custom Error
Finally done.
{% endhighlight %}
