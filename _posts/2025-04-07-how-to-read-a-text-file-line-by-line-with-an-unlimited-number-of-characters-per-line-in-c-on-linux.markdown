---
layout: post
title:  "How to read a text file line by line with an unlimited number of characters per line in C on Linux"
date:   2025-04-07 02:46:56
categories: C
description: How to read a text file line by line with an unlimited number of characters per line in C on Linux
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: To read a text file line by line with an unlimited number of characters per line in C on Linux, the best and most idiomatic way is to use getline(), which dynamically allocates (or reallocates) memory as needed.
---
<p>To read a text file line by line with an unlimited number of characters per line in C on Linux, the best and most idiomatic way is to use getline(), which dynamically allocates (or reallocates) memory as needed.</p>
{% highlight c %}
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *file = fopen("your_file.txt", "r");
    if (!file) {
        perror("fopen");
        return 1;
    }

    char *line = NULL;     // Pointer to store the line
    size_t len = 0;        // Allocated buffer size
    ssize_t read;          // Number of characters read

    while ((read = getline(&line, &len, file)) != -1) {
        printf("Line: %s", line);  // Print each line
    }

    free(line);  // Free the allocated memory
    fclose(file);

    return 0;
}
{% endhighlight %}
