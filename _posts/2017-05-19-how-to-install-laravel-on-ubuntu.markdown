---
layout: post
title:  "How to Install Laravel on Ubuntu"
date:   2017-05-19 12:46:56
categories: PHP
description: How to Install Laravel on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Laravel is a free, open-source PHP web framework intended for the development of web applications following the model–view–controller (MVC) architectural pattern. Some of the features of Laravel are a modular packaging system with a dedicated dependency manager, different ways for accessing relational databases, utilities that aid in application deployment and maintenance, and its orientation toward syntactic sugar. 
---

Laravel is a free, open-source PHP web framework intended for the development of web applications following the model–view–controller (MVC) architectural pattern. Some of the features of Laravel are a modular packaging system with a dedicated dependency manager, different ways for accessing relational databases, utilities that aid in application deployment and maintenance, and its orientation toward syntactic sugar. 

To install the default LAMP stack in Ubuntu 10.04 and above:
{% highlight bash %}
sudo apt-get install lamp-server^
sudo apt-get install phpmyadmin

sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/blog.local.conf

sudo nano /etc/apache2/sites-available/blog.local.conf
{% endhighlight %}
{% highlight bash %}
<VirtualHost *:80>
	#ServerName www.example.com

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/blog.local/public
	
	<Directory /var/www/blog.local>
            AllowOverride All
    </Directory>
	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
{% endhighlight %}
{% highlight bash %}
sudo nano /etc/hosts

sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

cd /var/www
sudo composer create-project --prefer-dist laravel/laravel blog.local

sudo a2dissite 000-default.conf
sudo a2ensite blog.local.conf
sudo a2enmod rewrite
sudo service apache2 restart
{% endhighlight %}
