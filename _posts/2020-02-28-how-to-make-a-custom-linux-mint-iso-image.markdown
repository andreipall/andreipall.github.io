---
layout: post
title:  "How to make a custom Linux Mint iso image"
date:   2020-02-28 12:46:56
categories: Linux
description: How to make a custom Linux Mint iso image
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: This tutorial is all about making a custom Linux Mint iso from a fresh new official dvd image. Download the image from the official download page of Linux Mint (latest is recommended). Now follow the steps below to make a customized Linux Mint cd/dvd image.
---

<p>This tutorial is all about making a custom Linux Mint iso from a fresh new official dvd image. Download the image from the official download page of Linux Mint (latest is recommended). Now follow the steps below to make a customized Linux Mint cd/dvd image:
Conventions adopted in this tutorial:</p>
<ol>
<li>Text with greyed background means warning</li>
<li>Blue color means, this part of the code needs editing after copy paste</li>
<li>Italic texts means they are technical words/codes</li>
<li>Small italic texts means codes.</li>
<li>Some codes are so long that they couldn't end in a single line, watch out...</li>
<li>Texts appear after double slash (//) are comments not codes.</li>
<li>Red colored text tells you to pay serious attention to it</li>
</ol>
<h3>1. Install the required softwares:</h3>
{% highlight bash %}
sudo aptitude install squashfs-tools genisoimage
{% endhighlight %}
<h3>2. Prepare the temporary system:</h3>
<p>linuxmint-19-cinnamon-64bit.iso is used as the base iso image throughout this tutorial. Change the name according to the downloaded image.</p>
{% highlight bash %}
mkdir ~/mylivecd
cp /path_to_the_downloaded_iso_directory/linuxmint-19-cinnamon-64bit.iso ~/mylivecd
cd ~/mylivecd
mkdir mnt
sudo mount -o loop linuxmint-19-cinnamon-64bit.iso mnt
mkdir extracted
sudo rsync --exclude=/casper/filesystem.squashfs -a mnt/ extracted
sudo unsquashfs mnt/casper/filesystem.squashfs
sudo mv squashfs-root edit
{% endhighlight %}
<h3>3. Prepare network connection in the temporary system:</h3>
{% highlight bash %}
sudo cp /etc/resolv.conf edit/etc/
sudo cp /etc/hosts edit/etc/
{% endhighlight %}
<h3>4. Prepare a chroot environment:</h3>
{% highlight bash %}
xhost + //it will enable you to run GUI applications like synaptic but this will disable the x server access control, so use it at your own risk.
sudo mount --bind /dev/ edit/dev
sudo chroot edit
mount -t proc none /proc
mount -t sysfs none /sys
mount -t devpts none /dev/pts
export HOME=/root
export LC_ALL=C
{% endhighlight %}
<p>Now this terminal is in your new system. Don't close this in any circumstances. We will call this the chroot terminal and let's open another terminal and run:</p>
{% highlight bash %}
cd ~/mylivecd
su
{% endhighlight %}
<p>and call this the host terminal. We will use this terminal when needed. You can differentiate between these two by comparing the command history. (This is very important, don't mix up these two terminals in anyway.)
Run codes in chroot terminal if nothing is specified about which terminal to use.</p>
<h3>5. Preparing customization:</h3>
{% highlight bash %}
dbus-uuidgen > /var/lib/dbus/machine-id
dpkg-divert --local --rename --add /sbin/initctl
ln -s /bin/true /sbin/initctl
{% endhighlight %}
<h3>6. Now customize at your hearts content:</h3>
<p>The filesystem is now the "edit" folder inside "mylivecd" directory. You can modify this filesystem to meet your needs. But you only have access to the chroot terminal. So make sure you can do everything with only a terminal. You can use this terminal to run GUI applications too.</p>
<p>To view installed packages by size:</p>
{% highlight bash %}
dpkg-query -W --showformat='${Installed-Size}\t${Package}\n' | sort -nr | less
{% endhighlight %}
<h3>6.1 Installing softwares:</h3>
<p>First update the repository (in chroot terminal):</p>
{% highlight bash %}
apt update
{% endhighlight %}
<p>Install softwares from the chroot terminal by:</p>
{% highlight bash %}
apt install some-package
or
aptitude install packag1 package2 ....
or
dpkg -i some_package.deb
or
synaptic
{% endhighlight %}
<p>then use synaptic package manager to install software.You can run other GUI applicaions too.</p>
<p>If you use synaptic then you will probably need to delete the edit/home/* manually and also delete the edit/run/synaptic.socket in the cleaning step.</p>
<p>In this case the some_package.deb must be located somewhere inside the "edit" directory. So copy the deb files that you want to install by dpkg to a location inside that edit folder and use correct path to the files or use my conventions as below (in chroot terminal):</p>
{% highlight bash %}
mkdir /mydir
chmod -R 777 /mydir
cd /mydir
{% endhighlight %}
<p>Now use your file manager (open as root) to copy files for your packages to this folder or you can use the host terminal too (to copy files here). Now you can use the chroot terminal to install softwares from that directory (.deb files or source). To install softwares you can see the methods written in this tutorial:</p>
<p>Installing softwares in linux</p>
<p>If you have the latest .deb packages then you can copy them into the "/var/cache/apt/archives" directory so that you will be able to install them with the</p>
{% highlight bash %}
apt install package_name
{% endhighlight %}
<p>command in chroot terminal without downloading them. But if they are not latest, then this will do no good at all.</p>
<p>To install all the .deb packages in any directory simply run in chroot terminal:</p>
{% highlight bash %}
cd path_to_that_directory
dpkg -i *.deb
{% endhighlight %}
<h3>6.2 You can do other types of modifications as you have full access to the whole filesystem, if you know how to do it in any regular distro. The main problem is, you have no GUI (Desktop) for making modifications, all there is to edit the config files and the filesystem to modify everything. So you need to be sure about the modifications that they will work correctly beforehand.</h3>
<h3>6.3 Kernel installation (optional):</h3>
<p>First install any kernel (see this for reference) with the chroot terminal then to boot this kernel in live cd/dvd run these codes in the host terminal:</p>
{% highlight bash %}
cp edit/boot/vmlinuz* extracted/casper/vmlinuz
cp edit/boot/initrd.img* extracted/casper/initrd.lz
{% endhighlight %}
<p>If you install more than one kernel then replace * in the above two commands with correct version codes.</p>
<h3>6.4 At last, run this code in chroot terminal to make sure the Linux mint installation application (in live dvd/cd) is up-to-date:</h3>
{% highlight bash %}
apt install ubiquity-frontend-gtk
{% endhighlight %}
<h3>7. Cleanup your new system:</h3>
{% highlight bash %}
aptitude clean
rm -r /var/cache/apt/archives/*
rm -r /mydir
rm -rf /tmp/* ~/.bash_history
rm /var/lib/dbus/machine-id
rm /sbin/initctl
dpkg-divert --rename --remove /sbin/initctl

umount /proc || umount -lf /proc  //ignore warning in this command
umount /sys
umount /dev/pts
exit  //if fails try exit 0                      
sudo umount edit/dev  //ignore error/warning in this command
xhost -
{% endhighlight %}
<p>If you used synaptic (or any other GUI) then you will probably need to do this extra cleaning:</p>
{% highlight bash %}
sudo rm -rf edit/run/synaptic.socket
sudo rm -rf edit/home/*
{% endhighlight %}
<p>From this moment the chroot environment is no more, but this terminal will be used for the rest of the commands, you can close the other (host) terminal.</p>
<h3>8. Regenerate manifest (ignore any warning):</h3>
{% highlight bash %}
su
chmod +w extracted/casper/filesystem.manifest
chroot edit dpkg-query -W --showformat='${Package} ${Version}\n' > extracted/casper/filesystem.manifest
cp extracted/casper/filesystem.manifest extracted/casper/filesystem.manifest-desktop
sed -i '/ubiquity/d' extracted/casper/filesystem.manifest-desktop
sed -i '/casper/d' extracted/casper/filesystem.manifest-desktop
{% endhighlight %}
<h3>9. Compress:</h3>
{% highlight bash %}
rm extracted/casper/filesystem.squashfs
mksquashfs edit extracted/casper/filesystem.squashfs -comp xz
{% endhighlight %}
<h3>10. Update some required files:</h3>
{% highlight bash %}
printf $(sudo du -sx --block-size=1 edit | cut -f1) > extracted/casper/filesystem.size
{% endhighlight %}
<p>open extracted/README.diskdefines file with a text editor and change the name of the disk.</p>
<p>Remove old md5sum and calculate new md5sums:</p>
{% highlight bash %}
cd extracted
rm MD5SUMS
find -type f -print0 | sudo xargs -0 md5sum | grep -v isolinux/boot.cat | sudo tee MD5SUMS
{% endhighlight %}
<h3>11. Create the ISO image:</h3>
{% highlight bash %}
mkisofs -D -r -V "$IMAGE_NAME" -cache-inodes -J -l -b isolinux/isolinux.bin -c isolinux/boot.cat -no-emul-boot -boot-load-size 4 -boot-info-table -o ../Linux-Mint-cinnamon-x64_custom.iso .
exit
sudo chmod 777 ~/mylivecd/Linux-Mint-cinnamon-x64_custom.iso
{% endhighlight %}
<h3>12. Test the ISO image:</h3>
<p>You can use qemu, kvm, virtualbox for a test run of the iso or you can use your physical computer for testing (making a live usb or burning the iso to cd or dvd). If everything is satisfactory then you can make this  a final release of your new custom Linux Mint dristro.</p>
