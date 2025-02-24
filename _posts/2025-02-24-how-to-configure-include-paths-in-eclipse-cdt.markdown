---
layout: post
title:  "How to Configure Include Paths in Eclipse CDT"
date:   2025-02-24 02:46:56
categories: C
description: How to Configure Include Paths in Eclipse CDT
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: If Eclipse CDT (C/C++ Development Tooling) doesn't recognize your header files for autocomplete, indexing, or compilation, you need to configure the include paths.
---
<p>If Eclipse CDT (C/C++ Development Tooling) doesn't recognize your header files for autocomplete, indexing, or compilation, you need to configure the include paths.</p>
<h3>Step 1: Open Project Properties</h3>
<ol>
  <li>Right-click on your <strong>C/C++ project</strong> in the <strong>Project Explorer</strong>.</li>
  <li>Select>Properties</strong>.</li>
  <li>Go to <strong>C/C++ General</strong> → <strong>Paths and Symbols</strong>.</li>
</ol>
<h3>Step 2: Add Include Paths</h3>
<ol>
  <li>Select the <strong>Includes</strong> tab.</li>
  <li>Choose the language (<code>GNU C</code> or <code>GNU C++</code>).</li>
  <li>Click <strong>Add</strong> and enter the path where your header files are located (e.g., <code>/home/user/my_headers</code>).</li>
  <li>Click <strong>OK</strong> and <strong>Apply and Close</strong>.</li>
</ol>
<p><strong>Tip:</strong> If your project uses <code>pkg-config</code>, you can find the correct include paths with:</p>
{% highlight bash %}
pkg-config --cflags your-library
{% endhighlight %}
