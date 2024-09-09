---
layout: post
title:  "Arch Linux with Xfce installation guide"
date:   2024-09-09 10:46:56
categories: Linux
description: Arch Linux with Xfce installation guide
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Arch Linux is a lightweight and flexible Linux distribution that tries to Keep It Simple.
---
{% highlight bash %}
fdisk -l
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

ip link set dev enp4s0 up
systemctl start systemd-networkd.service
systemctl start systemd-resolved.service
pacman -S xorg-server xf86-video-intel
useradd -m -G wheel andrei
passwd andrei
nano /etc/sudoers
uncomment %wheel ALL=(ALL) ALL
nano /etc/default/grub
GRUB_TIMEOUT=0
grub-mkconfig -o /boot/grub/grub.cfg
pacman -S xfce4
pacman -S xfce4-goodies
select: mousepad ristretto thunar-archive-plugin thunar-media-tags-plugin xfce4-pulseaudio-plugin xfce4-screenshoter xfce4-notifyd
pacman -S lightdm-gtk-greeter network-manager-applet noto-fonts celluloid firefox gvfs gvfs-mtp xarchiver unrar unzip pulseaudio pavucontrol xreader transmission-gtk
systemctl enable lightdm.service
systemctl enable NetworkManager
nano /etc/lightdm/lightdm.conf
[Seat:*]
autologin-user=andrei
autologin-session=xfce

groupadd -r autologin
gpasswd -a andrei autologin
reboot
{% endhighlight %}
