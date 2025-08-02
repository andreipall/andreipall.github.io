---
layout: post
title:  "Debian Trixie with Xfce installation guide"
date:   2025-08-02 10:46:56
categories: Linux
description: Debian Trixie with Xfce installation guide
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Debian is one of the oldest operating systems based on the Linux kernel, and is the basis of many other Linux distributions.
---
{% highlight bash %}
apt-get install xserver-xorg-video-intel xserver-xorg-input-all xserver-xorg-core polkitd systemd-timesyncd --no-install-recommends
apt-get install xfce4 chromium mousepad ristretto thunar-archive-plugin xfce4-notifyd xfce4-screenshooter xfce4-terminal gvfs-backends fonts-noto-core xarchiver unzip 7zip transmission-gtk parole network-manager-applet gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gnome-icon-theme tumbler ca-certificates pulseaudio pavucontrol lightdm lightdm-gtk-greeter --no-install-recommends

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
Install the firewall:
{% highlight bash %}
apt-get install ufw
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
