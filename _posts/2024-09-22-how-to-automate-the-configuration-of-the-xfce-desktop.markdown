---
layout: post
title:  "How to automate the configuration of the Xfce desktop"
date:   2024-09-22 10:46:56
categories: Linux
description: How to automate the configuration of the Xfce desktop
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Xfce is a lightweight desktop environment for UNIX-like operating systems. It aims to be fast and low on system resources, while still being visually appealing and user friendly.
---
<p>Xfce is a lightweight desktop environment for UNIX-like operating systems. It aims to be fast and low on system resources, while still being visually appealing and user friendly.</p>
{% highlight bash %}
#!/bin/bash
xfconf-query --channel thunar -p /misc-show-delete-action -t 'bool' -s true --create
xfconf-query --channel xfce4-desktop -p /desktop-menu/show -t 'bool' -s false --create
xfconf-query --channel xfce4-desktop -p /windowlist-menu/show -t 'bool' -s false --create
xfconf-query --channel xfce4-notifyd -p /notify-location -t string -s bottom-right --create
xfconf-query --channel xfce4-panel -p /panels -a -t int -s 1 --create
xfconf-query --channel xfce4-panel -p /panels/panel-2 -r -R
xfconf-query --channel xfce4-panel -p /panels/dark-mode -s false
xfconf-query --channel xfce4-panel -p /panels/panel-1/plugin-ids -a -t int -s 1 -t int -s 4 -t int -s 5 -t int -s 7 -t int -s 15 -t int -s 2 -t int -s 3 -t int -s 6 -t int -s 8 -t int -s 9 -t int -s 10 -t int -s 11 -t int -s 12 -t int -s 13 -t int -s 14 --create
xfconf-query --channel xfce4-panel -p /panels/panel-1/position -t string -s 'p=8;x=960;y=1055'
xfconf-query --channel xfce4-panel -p /panels/panel-1/position-locked -s true
xfconf-query --channel xfce4-panel -p /panels/panel-1/size -t int -s 26
xfconf-query --channel xfce4-panel -p /plugins -r -R
xfconf-query --channel xfce4-panel -p /plugins/plugin-1 -t string -s 'applicationsmenu' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-10 -t string -s 'notification-plugin' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-11 -t string -s 'separator' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-11/style -t int -s 0 --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-12 -t string -s 'clock' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-12/digital-date-font -t string -s 'Noto Sans 8' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-12/digital-time-font -t string -s 'Noto Sans 8' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-13 -t string -s 'separator' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-13/style -t int -s 0 --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-14 -t string -s 'actions' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-15 -t string -s 'launcher' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-15/items -a -t string -s 'firefox.desktop' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-1/button-title -t string -s 'Start' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-2 -t string -s 'tasklist' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-2/grouping -t 'bool' -s false --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-2/sort-order -t int -s 4 --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-3 -t string -s 'separator' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-3/expand -t 'bool' -s true --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-3/style -t int -s 0 --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-4 -t string -s 'showdesktop' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-5 -t string -s 'launcher' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-5/items -a -t string -s 'xfce4-file-manager.desktop' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-6 -t string -s 'systray' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-6/square-icons -t 'bool' -s true --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-7 -t string -s 'launcher' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-7/items -a -t string -s 'xfce4-terminal.desktop' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-8 -t string -s 'pulseaudio' --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-8/enable-keyboard-shortcuts -t 'bool' -s true --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-8/show-notifications -t 'bool' -s true --create
xfconf-query --channel xfce4-panel -p /plugins/plugin-9 -t string -s 'power-manager-plugin' --create
xfconf-query --channel xfce4-session -p /general/SaveOnExit -t 'bool' -s false --create
xfconf-query --channel xfce4-terminal -p /background-darkness -t double -s 0.700000 --create
xfconf-query --channel xfce4-terminal -p /background-mode -t string -s TERMINAL_BACKGROUND_TRANSPARENT --create
xfconf-query --channel xfce4-terminal -p /font-use-system -t 'bool' -s true --create
xfconf-query --channel xfwm4 -p /general/workspace_count -t int -s 1
xfconf-query --channel xfwm4 -p /general/title_font -t string -s 'Noto Sans Bold 9'
xfconf-query --channel xsettings -p /Gtk/FontName -t string -s 'Noto Sans 9'
xfconf-query --channel xsettings -p /Gtk/MonospaceFontName -t string -s 'Noto Sans Mono 9'
xfconf-query --channel xsettings -p /Net/IconThemeName -t string -s 'elementary'
xfconf-query --channel xsettings -p /Net/ThemeName -t string -s 'Adwaita'
xfconf-query --channel xsettings -p /Xft/Antialias -t int -s 1
xfconf-query --channel xsettings -p /Xft/DPI -t int -s -1 --create
xfconf-query --channel xsettings -p /Xft/Hinting -t int -s -1
xfconf-query --channel xsettings -p /Xft/HintStyle -t string -s 'hintfull'
xfconf-query --channel xsettings -p /Xft/RGBA -t string -s 'rgb'
xfce4-panel -r
{% endhighlight %}
