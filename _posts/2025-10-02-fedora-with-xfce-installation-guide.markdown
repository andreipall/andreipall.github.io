---
layout: post
title:  "Fedora with Xfce – installation guide"
date:   2025-10-02 10:46:56
categories: Linux
description: "Fedora with Xfce – installation guide"
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Fedora is a Linux distribution developed by the community-supported Fedora Project and owned by Red Hat.
---
<p>Fedora is a Linux distribution developed by the community-supported Fedora Project and owned by Red Hat.</p>
{% highlight bash %}
# Update base system
sudo dnf update -y

# Install Xorg display server & minimal tools
sudo dnf install -y xorg-x11-server-Xorg xorg-x11-drv-intel xorg-x11-drv-libinput mesa-dri-drivers dbus-x11 virtualbox-guest-additions --setopt=install_weak_deps=False

# Install Xfce desktop
sudo dnf install -y exo garcon thunar thunar-volman tumbler xfce4-appfinder xfce4-panel xfce4-session xfce4-settings xfce4-terminal xfconf xfdesktop xfwm4 librsvg2 libglvnd-gles --setopt=install_weak_deps=False
sudo dnf install firefox mousepad ristretto thunar-archive-plugin xfce4-notifyd xfce4-screenshooter gvfs-mtp google-noto-fonts-all xarchiver unzip unrar xdg-utils gzip tar network-manager-applet tumbler pulseaudio pavucontrol xfce4-pulseaudio-plugin sassc --setopt=install_weak_deps=False
sudo dnf install parole gstreamer1-libav gstreamer1-plugins-base gstreamer1-plugins-good gstreamer1-plugins-bad-free gstreamer1-plugins-ugly-free transmission-gtk --setopt=install_weak_deps=False
sudo dnf install -y lightdm lightdm-gtk --setopt=install_weak_deps=False
sudo dnf remove openssh

# LightDM is lightweight and works well with Xfce
sudo systemctl enable lightdm
sudo systemctl enable NetworkManager
sudo systemctl set-default graphical.target

sudo nano /etc/lightdm/lightdm.conf
[Seat:*]
xserver-command=X -s 0 -dpms
autologin-user=andrei
autologin-session=xfce

sudo nano /etc/default/grub
GRUB_TIMEOUT=0
GRUB_TIMEOUT_STYLE=hidden
GRUB_DISABLE_OS_PROBER=true
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
{% endhighlight %}
<p>https://github.com/vinceliuice/Qogir-icon-theme</p>
{% highlight bash %}
sudo ./install.sh -t default -c standard
{% endhighlight %}
<p>https://github.com/vinceliuice/Qogir-theme</p>
{% highlight bash %}
sudo ./install.sh -t default -c standard --tweaks image
{% endhighlight %}
<p>Firewall configuration</p>
{% highlight bash %}
sudo firewall-cmd --remove-service=ssh --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-services
# For Transmission:
sudo firewall-cmd --list-ports
sudo firewall-cmd --add-port=51413/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --zone=public --list-all
{% endhighlight %}
<p>Codecs installation</p>
{% highlight bash %}
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install distribution-gpg-keys
sudo rpmkeys --import /usr/share/distribution-gpg-keys/rpmfusion/RPM-GPG-KEY-rpmfusion-free-fedora-$(rpm -E %fedora)
sudo dnf --setopt=localpkg_gpgcheck=1 install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm 
sudo dnf swap ffmpeg-free ffmpeg --allowerasing
sudo dnf install gstreamer1-plugins-bad-freeworld gstreamer1-plugin-openh264
{% endhighlight %}
