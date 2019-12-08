---
layout: post
title:  "How To Deploy a Rails App with Passenger and Apache on Ubuntu"
date:   2017-08-16 12:46:56
categories: Ruby
description: How To Deploy a Rails App with Passenger and Apache on Ubuntu
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: In this tutorial, we will demonstrate how to install Phusion Passenger as your Rails-friendly web server, which is easy to install, configure, and maintain. We will integrate it into Apache on Ubuntu 16.04. By the end of this tutorial, we will have a test Rails application deployed.
---

In this tutorial, we will demonstrate how to install Phusion Passenger as your Rails-friendly web server, which is easy to install, configure, and maintain. We will integrate it into Apache on Ubuntu 16.04. By the end of this tutorial, we will have a test Rails application deployed. 

<h3>Step 1 — Install Ruby</h3>
We will install Ruby manually from source.

Before we do anything else, we should run an update to make sure that all of the packages we want to install are up to date:
{% highlight bash %}
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs

cd
wget http://ftp.ruby-lang.org/pub/ruby/2.4/ruby-2.4.0.tar.gz
tar -xzvf ruby-2.4.0.tar.gz
cd ruby-2.4.0/
./configure
make
sudo make install
ruby -v

sudo gem install bundler
{% endhighlight %}
<h3>Step 2 — Install Rails</h3>
Since Rails ships with so many dependencies these days, we're going to need to install a Javascript runtime like NodeJS. This lets you use Coffeescript and the Asset Pipeline in Rails which combines and minifies your javascript to provide a faster production environment.

To install NodeJS, we're going to add it using the official repository:
{% highlight bash %}
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo gem install rails
{% endhighlight %}
And now for the moment of truth. Let's create your first Rails application in /var/www:
{% highlight bash %}
#### If you want to use SQLite (not recommended)
rails new rails.local

#### If you want to use MySQL
rails new rails.local -d mysql

#### If you want to use Postgres
# Note that this will expect a postgres user with the same username
# as your app, you may need to edit config/database.yml to match the
# user you created earlier
rails new rails.local -d postgresql
{% endhighlight %}
<h3>Step 3 — Install Apache</h3>
To install Apache, type this command:
{% highlight bash %}
sudo apt-get install apache2
{% endhighlight %}
Yes, that’s all!
<h3>Step 4 — Install Passenger</h3>
{% highlight bash %}
# Install our PGP key and add HTTPS support for APT
sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

# Add our APT repository
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger xenial main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update

# Install Passenger
sudo apt-get install libapache2-mod-passenger
sudo a2enmod passenger
sudo service apache2 restart
{% endhighlight %}
<h3>Step 5 — Deploy</h3>
At this point you can deploy your own Rails application if you have one ready.
{% highlight bash %}
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/rails.local.conf

sudo nano /etc/apache2/sites-available/rails.local.conf
{% endhighlight %}
{% highlight bash %}
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/rails.local/public
        RailsEnv development
        <Directory "/var/www/rails.local/public">
                Options FollowSymLinks
                Require all granted
        </Directory>
        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
{% endhighlight %}
Disable the default site, enable your new site, and restart Apache:
{% highlight bash %}
sudo nano /etc/hosts

sudo a2dissite 000-default.conf
sudo a2ensite rails.local.conf
sudo service apache2 restart
{% endhighlight %}
