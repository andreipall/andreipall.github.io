---
layout: post
title:  "Bash script to hide the Linux desktop menu entries"
date:   2023-09-09 12:46:56
categories: Linux
description: Bash script to hide the Linux desktop menu entries
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: This Bash script hides the desktop menu entries.
---
<p>This Bash script hides the desktop menu entries:</p>
{% highlight bash %}
#!/bin/bash
# This Bash script hides the desktop menu entries, by Andrei Pall

entryNames=("avahi-discover.desktop" "bssh.desktop" "bvnc.desktop" "gcr-prompter.desktop" "gcr-viewer.desktop" "mpv.desktop" "qv4l2.desktop" "qvidcap.desktop" "xfce4-mail-reader.desktop")
path="/usr/share/applications/"

counter=0
for entryName in "${entryNames[@]}"
do
    entry_path="$path$entryName"
    # Check if the entry exists
    if test -f "$entry_path"; then
        # Check if the entry is hidden
        if ! grep -q "NoDisplay=true" "$entry_path"; then
            echo "NoDisplay=true" >> $entry_path
            echo "The file $entry_path is hidden."
            let counter++
        fi
    fi
done
if [ "$counter" -eq "0" ]; then
   echo "No desktop menu entries found.";
fi
{% endhighlight %}
