---
layout: post
title:  "How to monitor a directory and all its subdirectories for file changes"
date:   2024-08-01 09:46:56
categories: C
description: How to monitor a directory and all its subdirectories for file changes
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: To monitor a directory and all its subdirectories for file changes and execute a command when a file is changed using inotify in C on Linux
---
<p>To monitor a directory and all its subdirectories for file changes and execute a command when a file is changed using inotify in C on Linux, you can follow these steps:</p>
<ol><li><strong>Initialize inotify</strong>: Create an inotify instance.</li><li><strong>Add Watchers</strong>: Add watches for the directory and its subdirectories.</li><li><strong>Handle Events</strong>: Monitor the events and execute the command when a file change is detected.</li><li><strong>Recursively Watch Subdirectories</strong>: Ensure that any newly created subdirectories are also watched.</li></ol>
<p>Here is an example program demonstrating these steps:</p>
{% highlight c %}
#include <stdio.h>
#include <stdlib.h>
#include <sys/inotify.h>
#include <limits.h>
#include <unistd.h>
#include <string.h>
#include <dirent.h>
#include <sys/types.h>
#include <sys/stat.h>

#define EVENT_SIZE (sizeof(struct inotify_event))
#define EVENT_BUF_LEN (1024 * (EVENT_SIZE + 16))

// Function to add a watch to a directory and all its subdirectories
void add_watch_recursive(int fd, const char *dir) {
    struct dirent *entry;
    DIR *dp = opendir(dir);
    if (dp == NULL) {
        perror("opendir");
        return;
    }
    // Add the directory to inotify watch
    if (inotify_add_watch(fd, dir, IN_MODIFY | IN_CREATE | IN_DELETE) == -1) {
        perror("inotify_add_watch");
    }

    // Recursively add watches for subdirectories
    while ((entry = readdir(dp))) {
        if (entry->d_type == DT_DIR) {
            char path[PATH_MAX];
            if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
                continue;
            }
            snprintf(path, sizeof(path), "%s/%s", dir, entry->d_name);
            add_watch_recursive(fd, path);
        }
    }
    closedir(dp);
}

int main(int argc, char *argv[]) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <directory> <command>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    char *dir_to_watch = argv[1];
    char *command = argv[2];

    int length, i = 0;
    int fd;
    int wd;
    char buffer[EVENT_BUF_LEN];

    // Create an inotify instance
    fd = inotify_init();
    if (fd < 0) {
        perror("inotify_init");
        exit(EXIT_FAILURE);
    }

    // Add watches to the directory and its subdirectories
    add_watch_recursive(fd, dir_to_watch);

    // Loop to read events
    while (1) {
        i = 0;
        length = read(fd, buffer, EVENT_BUF_LEN);
        if (length < 0) {
            perror("read");
            exit(EXIT_FAILURE);
        }

        while (i < length) {
            struct inotify_event *event = (struct inotify_event *) &buffer[i];
            if (event->len) {
                if (event->mask & IN_MODIFY) {
                    printf("File modified: %s\n", event->name);
                    system(command);
                } else if (event->mask & IN_CREATE) {
                    printf("File or directory created: %s\n", event->name);
                    if (event->mask & IN_ISDIR) {
                        char new_dir[PATH_MAX];
                        snprintf(new_dir, sizeof(new_dir), "%s/%s", dir_to_watch, event->name);
                        add_watch_recursive(fd, new_dir);
                    }
                    system(command);
                } else if (event->mask & IN_DELETE) {
                    printf("File or directory deleted: %s\n", event->name);
                    system(command);
                }
            }
            i += EVENT_SIZE + event->len;
        }
    }

    // Clean up
    close(fd);

    return 0;
}
{% endhighlight %}
<p>Compile the program with gcc -o inotify_example inotify_example.c.</p>
<p>Run the program with ./inotify_example &lt;directory_to_watch&gt; &lt;command_to_execute&gt;.</p>
