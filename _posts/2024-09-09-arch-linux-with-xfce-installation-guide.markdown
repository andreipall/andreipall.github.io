---
layout: post
title:  "Arch Linux with Xfce – installation guide"
date:   2024-09-09 10:46:56
categories: Linux
description: "Arch Linux with Xfce – installation guide"
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Arch Linux is a lightweight and flexible Linux distribution that tries to Keep It Simple.
---
{% highlight bash %}
fdisk -l
fdisk /dev/sdb
// m for help
// p to print the current partition layout
// g to create an empty partition table
// n to create a new partition
// t to change partition type
// w to write the changes
mkfs.fat -F32 /dev/sdb1
mkfs.ext4 /dev/sdb2
pacman -Syy
mount /dev/sdb2 /mnt
pacstrap -K /mnt base linux linux-firmware sudo nano
genfstab -U /mnt >> /mnt/etc/fstab
arch-chroot /mnt
ln -sf /usr/share/zoneinfo/Europe/Bucharest /etc/localtime
hwclock --systohc
nano /etc/locale.gen
uncomment en_US.UTF-8 UTF-8
locale-gen
echo LANG=en_US.UTF-8 > /etc/locale.conf
export LANG=en_US.UTF-8
echo andrei-pc > /etc/hostname
nano /etc/hosts
127.0.0.1	localhost
::1		localhost
passwd
pacman -S grub efibootmgr intel-ucode
mkdir /boot/efi
mount /dev/sdb1 /boot/efi
grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi
grub-mkconfig -o /boot/grub/grub.cfg
exit
umount -R /mnt
reboot

ip addr show
nano /etc/systemd/network/20-wired.network
[Match]
Name=enp4s0

[Network]
DHCP=yes

ip link set dev enp4s0 up
systemctl start systemd-networkd.service
systemctl start systemd-resolved.service
pacman -S xorg-server xf86-video-intel intel-media-driver
useradd -m -c "Full Name" -G wheel andrei
passwd andrei
nano /etc/sudoers
uncomment %wheel ALL=(ALL) ALL
nano /etc/default/grub
GRUB_TIMEOUT=0
GRUB_CMDLINE_LINUX_DEFAULT="systemd.show_status=1 systemd.log_level=info"
GRUB_PRELOAD_MODULES="part_gpt"
GRUB_TIMEOUT_STYLE=hidden
grub-mkconfig -o /boot/grub/grub.cfg
pacman -S xfce4
select all except xfce4-power-manager xfwm4-themes
pacman -S xfce4-goodies
select: mousepad ristretto thunar-archive-plugin xfce4-pulseaudio-plugin xfce4-screenshoter xfce4-notifyd
pacman -S lightdm-gtk-greeter network-manager-applet noto-fonts parole gst-libav gst-plugins-bad gst-plugins-ugly chromium gvfs gvfs-mtp xarchiver unrar unzip pulseaudio pavucontrol xreader transmission-gtk
systemctl enable lightdm.service
systemctl enable NetworkManager

nano /etc/lightdm/lightdm.conf
[Seat:*]
xserver-command=X -s 0 -dpms
autologin-user=andrei
autologin-session=xfce

groupadd -r autologin
gpasswd -a andrei autologin

Put the following in ~/.config/gtk-3.0/settings.ini (create the file if it doesn’t exist): 
[Settings]
gtk-recent-files-max-age=0
gtk-recent-files-limit=0

rm ~/.local/share/recently-used.xbel
reboot
{% endhighlight %}
<p>Uncomplicated firewall configuration</p>
{% highlight bash %}
pacman -S ufw
systemctl enable ufw.service
systemctl start ufw.service
systemctl status ufw
ufw default allow outgoing
ufw default deny incoming
ufw allow ssh
ufw allow 22
ufw status
ufw enable
ufw allow http/tcp
ufw allow from 192.168.3.3 to any port 22 proto tcp
ufw status numbered
ufw delete 1
ufw status numbered
For Transmission:
ufw allow 51413/tcp
ufw allow 51413/udp
{% endhighlight %}
<p>Time synchronization</p>
{% highlight bash %}
timedatectl set-ntp true
timedatectl status
{% endhighlight %}
