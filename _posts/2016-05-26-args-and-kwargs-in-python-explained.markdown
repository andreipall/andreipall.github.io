---
layout: post
title:  "args and kwargs in Python Explained"
date:   2016-05-26 16:46:56
categories: Python
description: args and kwargs in Python Explained
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: args and kwargs are mostly used in function definitions. args and kwargs allow you to pass a variable number of arguments to a function. What does variable mean here is that you do not know before hand that how many arguments can be passed to your function by the user so in this case you use these two keywords.
---

<h2>Usage of *args</h2>
*args and **kwargs are mostly used in function definitions. *args and **kwargs allow you to pass a variable number of arguments to a function. What does variable mean here is that you do not know before hand that how many arguments can be passed to your function by the user so in this case you use these two keywords. *args is used to send a non-keyworded variable length argument list to the function. Here’s an example to help you get a clear idea:
{% highlight python %}
def test_var_args(f_arg, *argv):
    print "first normal arg:", f_arg
    for arg in argv:
        print "another arg through *argv :", arg

test_var_args('yasoob','python','eggs','test')
{% endhighlight %}
This produces the following result:
{% highlight python %}
first normal arg: yasoob
another arg through *argv : python
another arg through *argv : eggs
another arg through *argv : test
{% endhighlight %}
Usage of **kwargs
**kwargs allows you to pass keyworded variable length of arguments to a function. You should use **kwargs if you want to handle named arguments in a function. Here is an example to get you going with it:
{% highlight python %}
def greet_me(**kwargs):
    if kwargs is not None:
        for key, value in kwargs.iteritems():
            print "%s == %s" %(key,value)
 
>>> greet_me(name="yasoob")
name == yasoob
{% endhighlight %}





