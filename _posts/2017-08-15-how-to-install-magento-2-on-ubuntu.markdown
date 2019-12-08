---
layout: post
title:  "How to Install Magento 2 on Ubuntu"
date:   2017-08-15 12:46:56
categories: PHP
description: How to Install Magento 2 on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Magento is an open-source e-commerce platform written in PHP. The software was originally developed by Varien, Inc, a US private company headquartered in Culver City, California, with assistance from volunteers. Magento employs the MySQL/MariaDB relational database management system, the PHP programming language, and elements of the Zend Framework.
---

Magento is an open-source e-commerce platform written in PHP. The software was originally developed by Varien, Inc, a US private company headquartered in Culver City, California, with assistance from volunteers. Magento employs the MySQL/MariaDB relational database management system, the PHP programming language, and elements of the Zend Framework. 

To install the default LAMP stack in Ubuntu 10.04 and above:
{% highlight bash %}
sudo apt-get install lamp-server^
sudo apt-get install phpmyadmin
sudo apt-get install php7.0-curl php7.0-mcrypt php7.0-intl php7.0-zip php7.0-gd php7.0-soap


sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/magento.local.conf

sudo nano /etc/apache2/sites-available/magento.local.conf
{% endhighlight %}
Download and extract the Magento 2 archieve to /var/www/magento.local.
{% highlight bash %}
<VirtualHost *:80>
	#ServerName www.example.com

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/magento.local
	
	<Directory /var/www/magento.local>
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

cd /var/www/magento.local

sudo a2dissite 000-default.conf
sudo a2ensite magento.local.conf
sudo a2enmod rewrite
sudo service apache2 restart
{% endhighlight %}
