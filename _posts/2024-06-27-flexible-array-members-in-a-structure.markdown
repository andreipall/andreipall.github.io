---
layout: post
title:  "Flexible array members in a structure"
date:   2024-06-27 09:46:56
categories: C
description: Flexible array members in a structure
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: Flexible array members in a structure
---
<p>Implementation of flexible array members in a structure:</p>
{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct student
{
    int stud_id;
    //this is used to store the size of the flexible character array stud_name[]
    int stud_name_len;
    //this is used to store the size of the struct
    int struct_size;
    //flexible array member (FAM) - must be at the end of the structure definition
    char stud_name[];
};

struct student * create_student(struct student * s, int id, char name[])
{
    s = malloc(sizeof(*s)+sizeof(char)*strlen(name));
    s->stud_id = id;
    s->stud_name_len = strlen(name);
    strcpy(s->stud_name, name);
    s->struct_size = (sizeof(*s)+sizeof(char)*strlen(s->stud_name));
    return s;
}

void print_student(struct student *s)
{
    printf("student id: %d\nstudent name: %s\nname length: %d\nallocated struct size: %d\n", s->stud_id, s->stud_name, s->stud_name_len, s->struct_size);
}

int main()
{
    struct student * s1 = create_student(s1, 123, "Cristi");
    struct student * s2 = create_student(s2, 124, "Andrei Pall");
    print_student(s1);
    printf("\n");
    print_student(s2);
    printf("\n");
    printf("sizeof struct student: %lu\n", sizeof(struct student));
    free(s1);
    free(s2);
    return 0;
}
{% endhighlight %}
{% highlight c %}
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct struct_name
{
    int len;
    char name[];
};

int main()
{
    char name[200];
    printf("Enter your name:\n");
    fgets(name, 200, stdin);
    name[strcspn(name, "\r\n")] = 0;
    printf("Entered name: %s, size: %ld\n", name, strlen(name));
    printf("Entered name array size: %ld\n", sizeof(name));
    struct struct_name *s = malloc(sizeof(struct struct_name) + (sizeof(char) * strlen(name)));
    s->len = strlen(name);
    strncpy(s->name, name, strlen(name));
    printf("Flexible array is: %s, length:%d\n", s->name, s->len);
    free(s);
    return 0;
}
{% endhighlight %}
