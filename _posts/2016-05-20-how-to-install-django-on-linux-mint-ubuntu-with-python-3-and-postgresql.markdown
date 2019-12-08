---
layout: post
title:  "How to Install Django on Linux Mint / Ubuntu with Python 3 and PostgreSQL"
date:   2016-05-20 16:46:56
categories: Python
description: How to Install Django on Linux Mint / Ubuntu with Python 3 and PostgreSQL
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel.
---

Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel.
{% highlight bash %}
sudo apt-get install python3-pip postgresql postgresql-contrib libpq-dev pgadmin3  git

sudo -u postgres psql postgres
\password postgres
\q

sudo pip3 install virtualenv
sudo apt-get install python3-dev libpq-dev
mkdir django
cd django
virtualenv -p /usr/bin/python3 venv
source venv/bin/activate
pip install Django
pip install psycopg2
django-admin startproject myproject
cd myproject
{% endhighlight %}
In the settings.py file change
{% highlight python %}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
{% endhighlight %}
to
{% highlight python %}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'myprojectdb',
	'USER': 'myprojectdbuser',
	'PASSWORD': 'myprojectdbpass',
	'HOST': 'localhost',
	'PORT': '',
    }
}
{% endhighlight %}
{% highlight bash %}
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
python manage.py createsuperuser
python manage.py startapp newsletter
{% endhighlight %}





