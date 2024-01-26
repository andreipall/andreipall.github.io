---
layout: post
title:  "How to Install a Spring Boot Web Application with Nginx as Reverse Proxy on Debian"
date:   2024-01-26 10:46:56
categories: Java
description: How to Install a Spring Boot Web Application with Nginx as Reverse Proxy on Debian
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Assuming that you have a Spring Boot application packaged as an uber jar in /var/myapp, to install it as a systemd service
---
<p>Assuming that you have a Spring Boot application packaged as an uber jar in /var/myapp, to install it as a systemd service, create a script named myapp.service and place it in /etc/systemd/system directory. The following script offers an example:</p>
{% highlight bash %}
[Unit]
Description=myapp
After=syslog.target network.target

[Service]
User=myapp
Group=myapp

Environment="JAVA_HOME=/path/to/java/home"

ExecStart=${JAVA_HOME}/bin/java -jar /var/myapp/myapp.jar
ExecStop=/bin/kill -15 $MAINPID
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
{% endhighlight %}
<p>Remember to change the Description, User, Group, Environment and ExecStart fields for your application.</p>
<p>The user that runs the application, the PID file, and the console log file are managed by systemd itself and therefore must be configured by using appropriate fields in the ‘service’ script. Consult the service unit configuration man page for more details.</p>
<p>To flag the application to start automatically on system boot, use the following command:</p>
{% highlight bash %}
sudo systemctl enable myapp.service
{% endhighlight %}
<p>Next, you will need to install Nginx as a reverse proxy for Apache Tomcat. First, install the Nginx web server with the following command:</p>
{% highlight bash %}
sudo apt install nginx
sudo nano /etc/nginx/conf.d/project.conf
{% endhighlight %}
{% highlight bash %}
server {
  listen 80;

  server_name    project.local;
  access_log /var/log/nginx/project-access.log;
  error_log /var/log/nginx/project-error.log;

  location / {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080/;
  }
}
{% endhighlight %}
{% highlight bash %}
sudo nginx -t
sudo systemctl restart nginx
{% endhighlight %}
{% highlight bash %}
sudo nano /etc/hosts
{% endhighlight %}
{% highlight bash %}
127.0.0.1 project.local
{% endhighlight %}
