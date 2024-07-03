---
layout: post
title:  "How to simulate a try-catch mechanism in C"
date:   2024-07-03 09:46:56
categories: C
description: How to simulate a try-catch mechanism in C
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: In C, there is no built-in try-catch mechanism like in languages such as C++ or Java. However, you can simulate this behavior using setjmp and longjmp
---
<p>In C, there is no built-in try-catch mechanism like in languages such as C++ or Java. However, you can simulate this behavior using setjmp and longjmp from the <setjmp.h> library. These functions allow you to jump back to a previously saved state, effectively providing a way to handle errors in a manner similar to try-catch.</p>
{% highlight c %}
#include <stdio.h>
#include <setjmp.h>

static jmp_buf buf;

static void throwError(int err) {
    longjmp(buf, err);
}

static void doSomethingRisky(int count) {
    if (count % 2 == 0) {
        printf("Operation succeeded on iteration %d.\n", count);
    } else {
        printf("Operation failed on iteration %d.\n", count);
        throwError(1); // Simulate an error
    }
}

int main() {
    int count = 0;
    int result;

    while (count < 10) {
        result = setjmp(buf);
        if (result == 0) {
            // Try block
            doSomethingRisky(count);
        } else {
            // Catch block
            printf("Caught an error: %d. Recovering and continuing...\n", result);
        }
        count++;
    }

    printf("Program finished.\n");
    return 0;
}
{% endhighlight %}
