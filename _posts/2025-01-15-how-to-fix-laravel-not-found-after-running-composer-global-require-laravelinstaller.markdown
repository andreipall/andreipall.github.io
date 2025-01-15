---
layout: post
title:  "How to fix Laravel not found after running composer global require laravel/installer"
date:   2025-01-15 11:46:56
categories: PHP
description: How to fix Laravel not found after running composer global require laravel/installer
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: The issue you&#039;re encountering is likely due to the global Composer bin directory not being added to your system&#039;s PATH. Here are the steps to resolve this
---
<p>The issue you&#039;re encountering is likely due to the global Composer bin directory not being added to your system&#039;s PATH. Here are the steps to resolve this:</p>
<ol>
<li>
<p>Find the Composer global bin directory:</p>
{% highlight bash %}
composer global config bin-dir --absolute
# Output: /home/your-username/.composer/vendor/bin
{% endhighlight %}
</li>
<li>
<p>Edit the shell configuration file:</p>
{% highlight bash %}
nano ~/.bashrc
{% endhighlight %}
</li>
<li>
<p>Add the directory to the PATH:</p>
{% highlight bash %}
export PATH="$PATH:/home/your-username/.config/composer/vendor/bin"
{% endhighlight %}
</li>
<li>
<p>Apply the changes:</p>
{% highlight bash %}
source ~/.bashrc
{% endhighlight %}
</li>
<li>
<p>Verify the installation:</p>
{% highlight bash %}
laravel new my-application
{% endhighlight %}
</li>
</ol>
