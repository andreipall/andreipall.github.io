---
layout: post
title:  "How to Set Up Django on Nginx with uWSGI on Arch Linux"
date:   2023-12-10 14:46:56
categories: Python
description: How to Set Up Django on Nginx with uWSGI on Arch Linux
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Install uwsgi on your virtual environment
---
<p>Install uwsgi on your virtual environment:</p>
{% highlight bash %}
pip install wheel
pip install uwsgi
{% endhighlight %}
<p>Now we can serve the Django project with uWSGI with the following command:</p>
{% highlight bash %}
uwsgi --http :8000 --plugin python --module core.wsgi
{% endhighlight %}
<p>Install and start Nginx:</p>
{% highlight bash %}
sudo pacman -S nginx
sudo systemctl enable nginx
sudo systemctl start nginx
{% endhighlight %}
<p>Change the Nginx configuration:</p>
{% highlight bash %}
sudo nano /etc/nginx/nginx.conf
{% endhighlight %}
{% highlight bash %}
user http;
worker_processes auto;
worker_cpu_affinity auto;

events {
    multi_accept on;
    worker_connections 1024;
}

http {
    charset utf-8;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    server_tokens off;
    log_not_found off;
    types_hash_max_size 4096;
    client_max_body_size 16M;

    # MIME
    include mime.types;
    default_type application/octet-stream;

    # logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log warn;

    # load configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
{% endhighlight %}
{% highlight bash %}
mkdir /etc/nginx/sites-available
mkdir /etc/nginx/sites-enabled

sudo nano /etc/nginx/sites-available/project.conf
{% endhighlight %}
{% highlight bash %}
upstream django {
    server unix:///srv/http/project/project.sock; 
}

server {
    listen      80;
    server_name project.local;
    charset     utf-8;

    client_max_body_size 75M; 

    location /media  {
        alias /srv/http/project/media; 
    }

    location /static {
        alias /srv/http/project/static;
    }

    location / {
        uwsgi_pass  django;
        include     /srv/http/project/uwsgi_params; 
    }
}
{% endhighlight %}
{% highlight bash %}
sudo ln -s /etc/nginx/sites-available/project.conf /etc/nginx/sites-enabled/project.conf
{% endhighlight %}
<p>Create the file uwsgi_params on your project path:</p>
{% highlight bash %}
uwsgi_param  QUERY_STRING       $query_string;
uwsgi_param  REQUEST_METHOD     $request_method;
uwsgi_param  CONTENT_TYPE       $content_type;
uwsgi_param  CONTENT_LENGTH     $content_length;

uwsgi_param  REQUEST_URI        $request_uri;
uwsgi_param  PATH_INFO          $document_uri;
uwsgi_param  DOCUMENT_ROOT      $document_root;
uwsgi_param  SERVER_PROTOCOL    $server_protocol;
uwsgi_param  REQUEST_SCHEME     $scheme;
uwsgi_param  HTTPS              $https if_not_empty;

uwsgi_param  REMOTE_ADDR        $remote_addr;
uwsgi_param  REMOTE_PORT        $remote_port;
uwsgi_param  SERVER_PORT        $server_port;
uwsgi_param  SERVER_NAME        $server_name;
{% endhighlight %}
{% highlight bash %}
sudo systemctl restart nginx
{% endhighlight %}
<p>Download an image to media folder and test:</p>
{% highlight bash %}
uwsgi --socket project.sock --module core.wsgi --chmod-socket=666 --plugin python
{% endhighlight %}
<p>Create the ini file at the root of you Django project:</p>
{% highlight bash %}
nano project_uwsgi.ini
{% endhighlight %}
{% highlight bash %}
[uwsgi]
# full path to Django project's root directory
chdir            = /srv/http/project/
# Django's wsgi file
module           = core.wsgi
# full path to python virtual env
home             = /srv/http/project/env
# enable uwsgi master process
master          = true
# maximum number of worker processes
processes       = 10
# the socket (use the full path to be safe
socket          = /srv/http/project/project.sock
# socket permissions
chmod-socket    = 666
# clear environment on exit
vacuum          = true
# daemonize uwsgi and write messages into given log
daemonize       = /srv/http/project/uwsgi-emperor.log
{% endhighlight %}
{% highlight bash %}
uwsgi --ini project_uwsgi.ini

sudo mkdir /etc/uwsgi/vassals
sudo ln -s /srv/http/project/project_uwsgi.ini /etc/uwsgi/vassals/
uwsgi --emperor /etc/uwsgi/vassals --uid http --gid http
sudo nano /etc/systemd/system/project.uwsgi.service
{% endhighlight %}
{% highlight bash %}
[Unit]
Description=uwsgi emperor for project website
After=network.target
[Service]
User=http
Restart=always
ExecStart=/srv/http/project/env/bin/uwsgi --master --emperor /etc/uwsgi/vassals --uid http --gid http
KillSignal=SIGQUIT
[Install]
WantedBy=multi-user.target
{% endhighlight %}
{% highlight bash %}
sudo systemctl start project.uwsgi.service
sudo systemctl enable project.uwsgi.service

journalctl -u project.uwsgi.service
{% endhighlight %}
