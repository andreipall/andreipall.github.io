---
layout: post
title:  "Implementation of Default Arguments in C using struct"
date:   2024-03-14 09:46:56
categories: C
description: Implementation of Default Arguments in C using struct
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: Implementation of Default Arguments in C using struct
---
<p>Implementation of Default Arguments in C using struct:</p>
{% highlight c %}
#include <stdio.h>

//First step - create structure with the arguments
typedef struct {
	int id;
	int age;
	float salary;
} bio_t;

//Second step - create actual function and pass the structure as argument
void _set_bio(const bio_t B)
{
	printf("%d, %d, $%.2f\n", B.id, B.age, B.salary);
}

//Step three - create macro using ellipsis notation
#define set_bio(...) _set_bio((bio_t) {__VA_ARGS__});

int main()
{
	set_bio();
	set_bio(1);
	set_bio(1, 40);
	set_bio(2, 38, 5000);
	set_bio(.salary=7777.7);
	return 0;
}
{% endhighlight %}
