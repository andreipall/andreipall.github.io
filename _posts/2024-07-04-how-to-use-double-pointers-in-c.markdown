---
layout: post
title:  "How to use double pointers in C"
date:   2024-07-04 09:46:56
categories: C
description: How to use double pointers in C
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: A pointer is a variable that stores the memory address of another variable as its value.
---
<p>A pointer is a variable that stores the memory address of another variable as its value.</p>
{% highlight c %}
#include <stdio.h>
#include <malloc.h>

void change_nr(int ** nr) {
    *nr = (int *) malloc(sizeof(int));
}

int main()
{
    int * p_nr = NULL;
    change_nr(&p_nr);
    * p_nr = 4;
    printf("%d", *p_nr);
    free(p_nr);
    return 0;
}
{% endhighlight %}
