---
layout: post
title:  "Understanding Spacebars"
date:   2016-04-29 16:46:56
categories: JavaScript
description: Understanding Spacebars
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Spacebars is a Meteor template language inspired by Handlebars. It shares some of the spirit and syntax of Handlebars, but it has been tailored to produce reactive Meteor templates when compiled.
---

Spacebars is a Meteor template language inspired by Handlebars. It shares some of the spirit and syntax of Handlebars, but it has been tailored to produce reactive Meteor templates when compiled.

<h2>each</h2>

Iterates over an array or query cursor
Example 1

An array of objects

Js
{% highlight javascript %}
Template.list.helpers({  
  items: [
    { name: "foo", pet: "dog" },
    { name: "bar", pet: "cat" }
  ];
});  
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="list">  
  {{#each items}}
    {{name}} - {{pet}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Or each .. in
{% highlight html %}{% raw %}
<template name="list">  
  {{#each item in items}}
    {{item.name}} - {{item.pet}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
foo - dog  
bar - cat  
{% endhighlight %}
Example 2

An array of strings

Js
{% highlight javascript %}
Template.list.helpers({  
  items: [
    "foo",
    "bar"
  ]
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="list">  
  {{#each items}}
    {{this}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Or each .. in
{% highlight html %}{% raw %}
<template name="list">  
  {{#each item in items}}
    {{item}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
foo  
bar  
{% endhighlight %}
Example 3

A query cursor

Spacebars is smart enough to know how to iterate over a query cursor (and keep everything updated as things change).

Assuming that our Items collection currently has documents that have name and pet fields (just like example 1).

Js
{% highlight javascript %}
Template.list.helpers({  
  items: function() {
    return Items.find();
  }
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="list">  
  {{#each items}}
    {{name}} - {{pet}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Or each .. in
{% highlight html %}{% raw %}
<template name="list">  
  {{#each item in items}}
    {{item.name}} - {{item.pet}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
foo - dog  
bar - cat  
{% endhighlight %}
<h2>with</h2>

Let's highlight why we use this helper.

Js
{% highlight javascript %}
Template.pet.helpers({  
  dog: {
    name: 'Spot',
    age: 3
  }
});
{% endhighlight %}
Template Without with
{% highlight html %}{% raw %}
<template name="pet">  
  name: {{dog.name}}<br>
  age: {{dog.age}}
</template>  
{% endraw %}{% endhighlight %}
Template With with
{% highlight html %}{% raw %}
<template name="pet">  
  {{#with dog}}
    name: {{name}}
    age: {{age}}
  {{/with}}
</template>  
{% endraw %}{% endhighlight %}
with can also take an optional else statement which is used if dog is falsey

Js
{% highlight javascript %}
Template.pet.helpers({  
  dog: false
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="pet">  
  {{#with dog}}
    name: {{name}}
    age: {{age}}
  {{else}}
    There's no dog!
  {{/with}}
</template>  
{% endraw %}{% endhighlight %}
While easy to overlook; as you can see above, with is very much like an if statement. If dog is falsey, the content contained within will not render.

<h2>if, else</h2>

Js
{% highlight javascript %}
Template.pet.helpers({  
  dog: {
    name: 'Spot',
    age: 3,
    sleeping: false
  }
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="pet">  
  {{#if dog.sleeping}}
    {{dog.name}} is sleeping!
  {{else}}
    {{dog.name}} is awake!
  {{/if}}
</template>  
{% endraw %}{% endhighlight %}
Result

Spot is awake!  

<h2>unless</h2>

unless is the opposite of if

Js
{% highlight javascript %}
Template.pet.helpers({  
  dog: {
    name: 'Spot',
    age: 3,
    sleeping: false
  }
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="pet">  
  {{#unless dog.sleeping}}
    {{dog.name}} is awake!
  {{else}}
    {{dog.name}} is sleeping!
  {{/unless}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
Spot is awake!  
{% endhighlight %}
<h2>Template inclusion</h2>

Example 1

We can easily pull in another template to display.
The most common usage is within an each block.

Js
{% highlight javascript %}
Template.list.helpers({  
  items: [
    { name: 'car', colour: 'red' },
    { name: 'sword', colour: 'silver' },
    { name: 'beer', colour: 'amber' }
  ]
});
{% endhighlight %}
Templates
{% highlight html %}{% raw %}
<template name="list">  
  {{#each items}}
    {{> listItem}}
  {{/each}}
</template>

<template name="listItem">  
  {{name}} - {{colour}}<br>
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
car - red  
sword - silver  
beer - amber  
{% endhighlight %}
Notice that our listItem template is automatically passed the current data context from our each block.

Example 2

Passing a data context

Js
{% highlight javascript %}
Template.overview.helpers({  
  users: [
    { name: 'David' },
    { name: 'Shaune' }
  ]
});
{% endhighlight %}
Templates
{% highlight html %}{% raw %}
<template name="overview">  
  {{> userList users}}
</template>

<template name="userList">  
  {{#each this}}
    {{name}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
David  
Shaune  
{% endhighlight %}
Example 3

Passing named arguments

Js
{% highlight javascript %}
Template.overview.helpers({  
  users: [
    { name: 'David' },
    { name: 'Shaune' }
  ]
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="overview">  
  {{> userList users=users title="Top users!"}}
</template>

<template name="userList">  
  <p>{{title}}</p>

  {{#each users}}
    {{name}}<br>
  {{/each}}
</template>  
{% endraw %}{% endhighlight %}
Result
{% highlight javascript %}
Top users!

David  
Shaune  
{% endhighlight %}
<h2>Helpers that take arguments</h2>

Js
{% highlight javascript %}
Template.articles.helpers({  
  items: [
    {
      title: 'Good article',
      status: 'important',
      content: 'A really good article'
    },
    {
      title: 'Normal article',
      status: 'normal',
      content: 'A good article'
    }
  ]
});

Template.article.helpers({  
  statusIs: function(status) {
    return this.status === status;
  }
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="articles">  
  {{#each items}}
    {{> article}}
  {{/each}}
</template>

<template name="article">  
  {{#if statusIs "important"}}
    <strong>{{title}}</strong>
  {{else}}
    {{title}}
  {{/if}}

  <p>{{content}}</p>
</template>  
{% endraw %}{% endhighlight %}
<h2>Custom block helpers</h2>

Template
{% highlight html %}{% raw %}
<template name="header">  
  <header>{{> Template.contentBlock}}</header>
</template>

<template name="examplePage">  
  {{#header}}Example Page{{/header}}
</template>  
{% endraw %}{% endhighlight %}
Template

Example with an else block
{% highlight html %}{% raw %}
<template name="header">  
  <header>
    {{#if ready}}
      {{> Template.contentBlock}}
    {{else}}
      {{> Template.elseBlock}}
    {{/if}}
  </header>
</template>

<template name="examplePage">  
  {{#header ready=Template.subscriptionsReady}}
    Example Page
  {{else}}
    Loading...
  {{/header}}
</template>  
{% endraw %}{% endhighlight %}
<h2>Comments</h2>

Template
{% highlight html %}{% raw %}
{{! Comments can be one line}}

{{!
  Or they can be
  multi-line
}}

{{!-- They can also be written like this --}}
{% endraw %}{% endhighlight %}
<h2>Template.dynamic</h2>

Js
{% highlight javascript %}
Template.example.helpers({  
  template: 'test'
});
{% endhighlight %}
Template
{% highlight html %}{% raw %}
<template name="example">  
  {{> Template.dynamic template=template}}
</template>

<template name="test">  
  Hello World!
</template>  
{% endraw %}{% endhighlight %}
This operator allows you to render templates along with their data context dynamically.
