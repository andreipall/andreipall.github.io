---
layout: post
title:  "Functions with variable number of arguments"
date:   2024-03-14 10:46:56
categories: C
description: Functions with variable number of arguments
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: Functions with variable number of arguments
---
<p>Functions with variable number of arguments:</p>
{% highlight c %}
#include <stdio.h>
#include <stdarg.h>

int sum(int n, ...)
{
	int res = 0;
	va_list args;
	
	va_start(args, n);
	
	for (int i=0; i<n; i++)
	{
		int v = va_arg(args, int);
		res += v;
	}
	
	va_end(args);
	
	printf("%d\n", res);
	
	return res;
}

int main()
{
	sum(3, 1, 2, 3);
	sum(2, 1, 2);
	return 0;
}
{% endhighlight %}
