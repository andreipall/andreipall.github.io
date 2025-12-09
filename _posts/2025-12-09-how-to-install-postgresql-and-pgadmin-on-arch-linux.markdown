---
layout: post
title:  "How to install PostgreSQL and pgAdmin on Arch Linux"
date:   2025-12-09 10:53:56
categories: sql
description: How to install PostgreSQL and pgAdmin on Arch Linux
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: PostgreSQL is an open source, community driven, standard compliant object-relational database system.
---
<p>PostgreSQL is an open source, community driven, standard compliant object-relational database system.</p>
<p>Install the postgresql package. It will also create a system user called postgres.</p>
{% highlight bash %}
sudo pacman -S postgresql
su -
su postgres
initdb --locale=C.UTF-8 --encoding=UTF8 -D /var/lib/postgres/data --data-checksums
exit
systemctl enable postgresql.service
systemctl start postgresql.service
exit
sudo -u postgres psql postgres
\password postgres
\q
{% endhighlight %}
<p>To install pgAdmin 4 download the AUR package and install it using the commands:</p>
{% highlight bash %}
sudo pacman -S base-devel
makepkg
sudo pacman -U package_file
{% endhighlight %}
