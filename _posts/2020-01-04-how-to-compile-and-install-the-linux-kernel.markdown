---
layout: post
title:  "How to compile and install the Linux Kernel"
date:   2020-01-04 12:46:56
categories: C
description: How to compile and install the Linux Kernel
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: This step by step how to covers compiling the Linux kernel version 5.4.7 under Ubuntu 18.04 or Linux Mint 19. The following instructions were successfully tested on Linux Mint 19.3, however, instructions remain the same for any other Linux distribution.
---
<p>This step by step how to covers compiling the Linux kernel version 5.4.7 under Ubuntu 18.04 or Linux Mint 19. The following instructions were successfully tested on Linux Mint 19.3, however, instructions remain the same for any other Linux distribution.</p>
<ol>
<li>Get the latest Linux kernel source code</li>
{% highlight bash %}
wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.4.7.tar.xz
{% endhighlight %}
<li>Extract the tar.xz file</li>
{% highlight bash %}
unxz -v linux-5.4.7.tar.xz
tar xvf linux-5.4.7.tar
{% endhighlight %}
<li>Install the required compilers and other tools</li>
{% highlight bash %}
sudo apt-get install build-essential libncurses-dev bison flex libssl-dev libelf-dev
{% endhighlight %}
<li>Configure the Linux kernel features and modules</li>
{% highlight bash %}
cd linux-5.4.7
make localmodconfig
{% endhighlight %}
<li>Compile the kernel</li>
{% highlight bash %}
make -j4
{% endhighlight %}
<li>Install the Linux kernel modules</li>
{% highlight bash %}
sudo make modules_install
{% endhighlight %}
<li>Install the Linux kernel</li>
{% highlight bash %}
sudo make install
{% endhighlight %}
<li>Update Grub config</li>
{% highlight bash %}
sudo update-initramfs -c -k 5.4.7
sudo update-grub
{% endhighlight %}
<li>Verify the new Linux kernel version after reboot</li>
{% highlight bash %}
uname -mrs
{% endhighlight %}
</ol>
<p>Congratulations! You have completed various steps to build the Linux kernel from source code and the compiled kernel should be running on your system.</p>
