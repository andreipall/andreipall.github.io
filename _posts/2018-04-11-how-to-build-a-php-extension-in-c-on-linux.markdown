---
layout: post
title:  "How to Build a PHP Extension in C on Linux"
date:   2018-04-11 12:46:56
categories: PHP
description: How to Build a PHP Extension in C on Linux
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: If you've used PHP, you've used extensions. With only a few exceptions, every userspace function in the PHP language is grouped into one extension or another. In this tutorial, you'll be making an extension that exports a single function returning a string containing the words - "Hello World".
---
If you've used PHP, you've used extensions. With only a few exceptions, every userspace function in the PHP language is grouped into one extension or another. In this tutorial, you'll be making an extension that exports a single function returning a string containing the words - "Hello World". In PHP code you'd probably do it something like this:
{% highlight php %}
<?php

function hello_world() {
    return 'Hello World';
}

?>
{% endhighlight %}
The config.m4 file:
{% highlight c %}
PHP_ARG_ENABLE(hello, whether to enable Hello World support, 
[ --enable-hello   Enable Hello World support])

if test "$PHP_HELLO" = "yes"; then
   AC_DEFINE(HAVE_HELLO, 1, [Whether you have Hello World])
   PHP_NEW_EXTENSION(hello, hello.c, $ext_shared)
fi
{% endhighlight %}
The php_hello.h file:
{% highlight c %}
#ifndef PHP_HELLO_H
#define PHP_HELLO_H 1
#define PHP_HELLO_WORLD_VERSION "1.0"
#define PHP_HELLO_WORLD_EXTNAME "hello"

PHP_FUNCTION(hello_world);

extern zend_module_entry hello_module_entry;
#define phpext_hello_ptr &hello_module_entry

#endif
{% endhighlight %}
The hello.c file:
{% highlight c %}
#ifdef HAVE_CONFIG_H
#include "config.h"
#endif
#include "php.h"
#include "php_hello.h"

static zend_function_entry hello_functions[] = {
    PHP_FE(hello_world, NULL)
    {NULL, NULL, NULL}
};

zend_module_entry hello_module_entry = {
#if ZEND_MODULE_API_NO >= 20010901
    STANDARD_MODULE_HEADER,
#endif
    PHP_HELLO_WORLD_EXTNAME,
    hello_functions,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
#if ZEND_MODULE_API_NO >= 20010901
    PHP_HELLO_WORLD_VERSION,
#endif
    STANDARD_MODULE_PROPERTIES
};

#ifdef COMPILE_DL_HELLO
ZEND_GET_MODULE(hello)
#endif

PHP_FUNCTION(hello_world)
{
    RETURN_STRING("Hello World");
}
{% endhighlight %}
Compile the extension:
{% highlight bash %}
phpize
./configure --enable-hello
make
cd modules
sudo mv hello.so /usr/lib/php/modules/
sudo nano /etc/php/php.ini
#add the line
extension=hello
#save the file
sudo systemctl restart httpd
{% endhighlight %}
Test the extension with a index.php file:
{% highlight php %}
<?php
echo hello_world();
phpinfo();
?>
{% endhighlight %}
