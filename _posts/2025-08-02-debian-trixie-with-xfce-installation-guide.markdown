---
layout: post
title:  "Debian Trixie with Xfce – installation guide"
date:   2025-08-02 10:46:56
categories: Linux
description: "Debian Trixie with Xfce – installation guide"
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Debian is one of the oldest operating systems based on the Linux kernel, and is the basis of many other Linux distributions.
---
Debian is one of the oldest operating systems based on the Linux kernel, and is the basis of many other Linux distributions.
{% highlight bash %}
apt-get install xserver-xorg-video-intel xserver-xorg-input-all xserver-xorg-core polkitd systemd-timesyncd sudo --no-install-recommends
apt-get install xfce4 chromium mousepad ristretto thunar-archive-plugin xfce4-notifyd xfce4-screenshooter xfce4-terminal gvfs-backends fonts-noto xarchiver unzip 7zip transmission-gtk parole network-manager-applet gstreamer1.0-libav gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gnome-icon-theme tumbler ca-certificates pulseaudio pavucontrol lightdm lightdm-gtk-greeter foliate --no-install-recommends
apt remove os-prober

systemctl enable dbus
systemctl enable lightdm.service
systemctl enable NetworkManager

gpasswd -a andrei sudo

nano /etc/lightdm/lightdm.conf
[Seat:*]
xserver-command=X -s 0 -dpms
autologin-user=andrei
autologin-session=xfce

nano /etc/default/grub
GRUB_TIMEOUT=0
GRUB_CMDLINE_LINUX_DEFAULT="systemd.show_status=1 systemd.log_level=info"
GRUB_TIMEOUT_STYLE=hidden
GRUB_DISABLE_OS_PROBER=true
update-grub
{% endhighlight %}
Set managed=true in network manager config:
{% highlight bash %}
nano /etc/NetworkManager/NetworkManager.conf
{% endhighlight %}
https://github.com/vinceliuice/Qogir-icon-theme
{% highlight bash %}
./install.sh -t default -c standard
{% endhighlight %}
https://github.com/vinceliuice/Qogir-theme
{% highlight bash %}
./install.sh -t default -c standard --tweaks image
{% endhighlight %}
Add the non-free repository
{% highlight bash %}
nano /etc/apt/sources.list


deb http://deb.debian.org/debian/ trixie main non-free-firmware non-free
deb-src http://deb.debian.org/debian/ trixie main non-free-firmware non-free

deb http://security.debian.org/debian-security trixie-security main non-free-firmware non-free
deb-src http://security.debian.org/debian-security trixie-security main non-free-firmware non-free

# trixie-updates, to get updates before a point release is made;
# see https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_updates_and_backports
deb http://deb.debian.org/debian/ trixie-updates main non-free-firmware non-free
deb-src http://deb.debian.org/debian/ trixie-updates main non-free-firmware non-free


sudo apt install p7zip-rar
{% endhighlight %}
Install the firewall:
{% highlight bash %}
apt-get install ufw --no-install-recommends
ufw enable
ufw default deny incoming
ufw default allow outgoing
ufw status verbose
# For Transmission:
ufw allow 51413/tcp
ufw allow 51413/udp
{% endhighlight %}
Time synchronization
{% highlight bash %}
timedatectl set-ntp true
timedatectl status
{% endhighlight %}
