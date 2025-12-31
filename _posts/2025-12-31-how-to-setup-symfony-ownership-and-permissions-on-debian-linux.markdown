---
layout: post
title:  "How to setup Symfony ownership and permissions on Debian Linux"
date:   2025-12-31 06:46:56
categories: PHP
description: How to setup Symfony ownership and permissions on Debian Linux
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: There are basically two ways to setup your ownership and permissions. Either you give yourself ownership or you make the webserver the owner of all files.
---
<p>There are basically two ways to setup your ownership and permissions. Either you give yourself ownership or you make the webserver the owner of all files.</p>
<p><strong>Webserver as owner (the way most people do it, and the Symfony doc&#039;s way):</strong></p>
<p>assuming www-data (it could be something else) is your webserver user.</p>
{% highlight bash %}sudo chown -R www-data:www-data /path/to/your/symfony/root/directory{% endhighlight %}
<p>if you do that, the webserver owns all the files, and is also the group, and you will have some problems uploading files or working with files via FTP, because your FTP client will be logged in as you, not your webserver, so add your user to the webserver user group:</p>
{% highlight bash %}sudo usermod -a -G www-data andrei{% endhighlight %}
<p>Of course, this assumes your webserver is running as www-data, and your user is andrei.</p>
<p>Then you set all your directories to 755 and your files to 644...
SET file permissions</p>
{% highlight bash %}sudo find /path/to/your/symfony/root/directory -type f -exec chmod 644 {} \;{% endhighlight %}
<p>SET directory permissions</p>
{% highlight bash %}sudo find /path/to/your/symfony/root/directory -type d -exec chmod 755 {} \;{% endhighlight %}
<p><strong>Your user as owner</strong></p>
<p>I prefer to own all the directories and files (it makes working with everything much easier), so, go to your Symfony root directory:</p>
{% highlight bash %}cd cd /var/www/symfony #assuming this is your current root directory{% endhighlight %}
{% highlight bash %}sudo chown -R $USER:www-data .{% endhighlight %}
<p>Then I give both myself and the webserver permissions:</p>
{% highlight bash %}sudo find . -type f -exec chmod 664 {} \;   
sudo find . -type d -exec chmod 775 {} \;{% endhighlight %}
<p><strong>Then give the webserver the rights to read and write to storage and cache</strong></p>
<p>Whichever way you set it up, then you need to give read and write permissions to the webserver for storage, cache and any other directories the webserver needs to upload or write too (depending on your situation), so run the commands from bash above:</p>
{% highlight bash %}
sudo chgrp -R www-data var
sudo chmod -R ug+rwx var
{% endhighlight %}
<p>Now, you&#039;re secure and your website works, and you can work with the files fairly easily</p>
