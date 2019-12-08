---
layout: post
title:  "How to write FreeBSD image to USB flash drive"
date:   2017-04-14 16:46:56
categories: Linux
description: How to write FreeBSD image to USB flash drive
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: dd is a command-line utility for Unix and Unix-like operating systems whose primary purpose is to convert and copy files. On Unix, device drivers for hardware and special device files appear in the file system just like normal files; dd can also read and/or write from/to these files, provided that function is implemented in their respective driver. 
---

dd is a command-line utility for Unix and Unix-like operating systems whose primary purpose is to convert and copy files. On Unix, device drivers for hardware and special device files appear in the file system just like normal files; dd can also read and/or write from/to these files, provided that function is implemented in their respective driver.

1) Assuming you are using dd within FreeBSD or Linux:
{% highlight bash %}
umount /dev/sdb
{% endhighlight %}
2) If your USB stick is under /dev/sdb
{% highlight bash %}
dd if=FreeBSD-10.3-RELEASE-amd64-memstick.img of=/dev/sdb bs=10240
{% endhighlight %}
Please note the of=/dev/sdb argument as you are supposed to write to the whole stick instead of its first partition.

3) Now reboot and choose the USB stick as the boot option.
