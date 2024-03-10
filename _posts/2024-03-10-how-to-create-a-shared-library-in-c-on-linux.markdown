---
layout: post
title:  "How to create a shared library in C on Linux"
date:   2024-03-10 10:46:56
categories: C
description: How to create a shared library in C on Linux
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: To create a shared library create the following files
---
<p>headers/foo.h:</p>
{% highlight c %}
#ifndef foo_h__
#define foo_h__
 
extern void foo(void);
 
#endif  // foo_h__
{% endhighlight %}
<p>utils/foo.c:</p>
{% highlight c %}
#include <stdio.h>

void foo(void)
{
    puts("Hello, I am a shared library.");
}
{% endhighlight %}
<p>main.c:</p>
{% highlight c %}
#include <stdio.h>
#include "headers/foo.h"
 
int main(void)
{
    puts("This is a shared library test...");
    foo();
    return 0;
}
{% endhighlight %}
<h3>Step 1: Compiling with Position Independent Code</h3>
<p>Inside the utils directory we need to compile our library source code into position-independent code (PIC):</p>
{% highlight bash %}
gcc -c -Wall -Werror -fpic foo.c
{% endhighlight %}
<h3>Step 2: Creating a shared library from an object file</h3>
<p>Now we need to actually turn this object file into a shared library. We will call it libfoo.so:</p>
{% highlight bash %}
gcc -shared -o libfoo.so foo.o
{% endhighlight %}
<h3>Step 3: Making the library available at runtime</h3>
{% highlight bash %}
sudo mv libfoo.so /usr/lib/
{% endhighlight %}
<p>Now the file is in a standard location, we need to tell the loader it is available for use, so let us update the cache:</p>
{% highlight bash %}
sudo ldconfig
{% endhighlight %}
<p>That should create a link to our shared library and update the cache so it is available for immediate use. Let us double check:</p>
{% highlight bash %}
ldconfig -p | grep foo
{% endhighlight %}
<p>Link our executable. Notice we do not need the -l option since our library is stored in a default location:</p>
{% highlight bash %}
gcc -Wall -o test main.c -lfoo
{% endhighlight %}
<p>Let us make sure we are using the /usr/lib instance of our library using ldd:</p>
{% highlight bash %}
ldd test | grep foo
libfoo.so => /usr/lib/libfoo.so (0x00a42000)
{% endhighlight %}
<p>Good, now let us run it:</p>
{% highlight bash %}
./test
This is a shared library test...
Hello, I am a shared library.
{% endhighlight %}
<p>That about wraps it up. We have covered how to build a shared library.</p>
