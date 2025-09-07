---
layout: post
title:  "How to install PostgreSQL and pgAdmin on Debian Trixie"
date:   2025-09-07 10:53:56
categories: sql
description: How to install PostgreSQL and pgAdmin on Debian Trixie
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Follow this guide to install the PostgreSQL database server and the pgAdmin4 PostgreSQL administration tool to your Debian 13 system
---
<p>Follow this guide to install the PostgreSQL database server and the pgAdmin4 PostgreSQL administration tool to your Debian 13 system:</p>
{% highlight sql %}
sudo apt install postgresql postgresql-client
sudo -u postgres psql
\password postgres
\q
{% endhighlight %}
<p>To install pgAdmin4 run the following commands:</p>
{% highlight bash %}
sudo apt install curl lsb-release

#
# Setup the repository
#

# Install the public key for the repository (if not done previously):
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

#
# Install pgAdmin
#

# Install for both desktop and web modes:
sudo apt install pgadmin4

# Install for desktop mode only:
sudo apt install pgadmin4-desktop

# Install for web mode only: 
sudo apt install pgadmin4-web 

# Configure the webserver, if you installed pgadmin4-web:
sudo /usr/pgadmin4/bin/setup-web.sh
{% endhighlight %}
