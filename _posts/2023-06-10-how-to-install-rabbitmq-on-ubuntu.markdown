---
layout: post
title:  "How to Install RabbitMQ on Ubuntu"
date:   2023-06-10 12:46:56
categories: Linux
description: How to Install RabbitMQ on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Here are the commands to install RabbitMQ on Ubuntu
---
<p>Here are the commands to install RabbitMQ on Ubuntu:</p>
{% highlight bash %}
sudo apt-get install rabbitmq-server

sudo rabbitmq-plugins enable rabbitmq_management

//Open http://localhost:15672/ with user: guest password: guest

//Add a new/fresh user, say user test and password test:
rabbitmqctl add_user test test

// Give administrative access to the new user:
rabbitmqctl set_user_tags test administrator

 // Set permission to newly created user:
rabbitmqctl set_permissions -p / test ".*" ".*" ".*"
{% endhighlight %}
