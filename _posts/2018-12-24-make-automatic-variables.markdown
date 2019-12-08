---
layout: post
title:  "Make Automatic Variables"
date:   2018-12-24 12:46:56
categories: C
description: Make Automatic Variables
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: GNU Make is a tool which controls the generation of executables and other non-source files of a program from the program's source files. Make gets its knowledge of how to build your program from a file called the makefile, which lists each of the non-source files and how to compute it from other files.
---
GNU Make is a tool which controls the generation of executables and other non-source files of a program from the program's source files. Make gets its knowledge of how to build your program from a file called the makefile, which lists each of the non-source files and how to compute it from other files. When you write a program, you should write a makefile for it, so that it is possible to use Make to build and install the program.<br>
Automatic variables are set by make after a rule is matched. They provide access to elements from the target and prerequisite lists so you don’t have to explicitly specify any filenames. They are very useful for avoiding code duplication, but are critical when defining more general pattern rules.<br>
There are seven “core” automatic variables:<br>
$@ The filename representing the target.<br>
$% The filename element of an archive member specification.<br>
$< The filename of the first prerequisite.<br>
$? The names of all prerequisites that are newer than the target, separated by
spaces.<br>
$^ The filenames of all the prerequisites, separated by spaces. This list has duplicate filenames removed since for most uses, such as compiling, copying, etc., duplicates are not wanted.<br>
$+ Similar to $^ , this is the names of all the prerequisites separated by spaces, except that $+ includes duplicates. This variable was created for specific situations such as arguments to linkers where duplicate values have meaning.<br>
$* The stem of the target filename. A stem is typically a filename without its suffix. Its use outside of pattern rules is discouraged.<br>
<br>
In addition, each of the above variables has two variants for compatibility with other makes. One variant returns only the directory portion of the value. This is indicated by appending a “D” to the symbol, $(@D), $(<D), etc. The other variant returns only the file portion of the value. This is indicated by appending an F to the symbol, $(@F), $(<F), etc.
