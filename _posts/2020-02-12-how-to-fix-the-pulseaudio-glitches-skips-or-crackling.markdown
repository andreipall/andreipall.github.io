---
layout: post
title:  "How to fix the PulseAudio glitches, skips or crackling"
date:   2020-02-12 12:46:56
categories: Linux
description: How to fix the PulseAudio glitches, skips or crackling
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: The newer implementation of the PulseAudio sound server uses timer-based audio scheduling instead of the traditional, interrupt-driven approach. Timer-based scheduling may expose issues in some ALSA drivers. On the other hand, other drivers might be glitchy without it on, so check to see what works on your system.
---
<p>The newer implementation of the PulseAudio sound server uses timer-based audio scheduling instead of the traditional, interrupt-driven approach.</p>
<p>Timer-based scheduling may expose issues in some ALSA drivers. On the other hand, other drivers might be glitchy without it on, so check to see what works on your system.</p>
<p>To turn timer-based scheduling off add tsched=0 in /etc/pulse/default.pa:</p>
{% highlight bash %}
load-module module-udev-detect tsched=0
{% endhighlight %}
