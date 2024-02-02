---
layout: post
title:  "How to read a large file in C on Linux"
date:   2024-02-02 10:46:56
categories: C
description: How to read a large file in C on Linux
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: Reading a large file in C on Linux involves opening the file, reading its contents in chunks, and processing each chunk as needed. Here's a simple example using the standard C library functions
---
<p>Reading a large file in C on Linux involves opening the file, reading its contents in chunks, and processing each chunk as needed. Here's a simple example using the standard C library functions:</p>
{% highlight c %}
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 4096  // Adjust the buffer size as needed

int main() {
    FILE *file;
    char buffer[BUFFER_SIZE];
    size_t bytesRead;

    // Open the file for reading
    file = fopen("your_large_file.txt", "rb");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read and process the file in chunks
    while ((bytesRead = fread(buffer, 1, sizeof(buffer), file)) > 0) {
        // Process the buffer (you can replace or extend this part)
        // For example, print the content of the buffer:
        fwrite(buffer, 1, bytesRead, stdout);
    }

    // Close the file
    fclose(file);

    return 0;
}
{% endhighlight %}
<p>Explanation:</p>
<ol>
<li>The fopen function is used to open the file for reading in binary mode ("rb").</li>
<li>A buffer (buffer) of a specified size is used to read the file in chunks. You can adjust the BUFFER_SIZE to suit your needs.</li>
<li>The fread function reads a chunk of data from the file into the buffer.</li>
<li>Process the buffer as needed. In this example, it simply prints the content to the standard output using fwrite.</li>
<li>The loop continues until fread returns 0, indicating the end of the file or an error.</li>
</ol>
