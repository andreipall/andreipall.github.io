---
layout: post
title:  "Format Specifiers in C"
date:   2025-02-26 02:46:56
categories: C
description: Format Specifiers in C
keywords: [Andrei Pall, blog, c, gcc, linux]
excerpt: The format specifier in C is used to tell the compiler about the type of data to be printed or scanned in input and output operations.
---
<p>The format specifier in C is used to tell the compiler about the type of data to be printed or scanned in input and output operations.</p>
<p>The below table contains the most commonly used format specifiers in C:</p>
<table><thead><tr><th><p dir="ltr" style="text-align: center;"><span>Format Specifier</span></p>
</th><th><p dir="ltr" style="text-align: center;"><span>Description</span></p>
</th></tr></thead><tbody><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%c</strong></b></p>
</td><td><span>For character type.</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%d</strong></b></p><div id="GFG_AD_Desktop_InContent_ATF_336x280" style="text-align:center; max-height: 280px;"></div><div id="GFG_AD_gfg_mobile_336x280_1" style="margin: 5px 0;"></div>
</td><td><span>For signed integer type.</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%e or %E</strong></b></p>
</td><td><span>For scientific notation of floats.</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%f</strong></b></p>
</td><td><span>For float type.</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%g or %G</strong></b></p>
</td><td><span>For float type with the current precision.</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%i</strong></b></p>
</td><td><span>signed integer</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%ld or %li</strong></b></p>
</td><td><span>Long</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%lf</strong></b></p>
</td><td><span>Double</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%Lf</strong></b></p>
</td><td><span>Long double</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%lu</strong></b></p>
</td><td><span>Unsigned int or unsigned long</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%lli or %lld</strong></b></p>
</td><td><span>Long long</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%llu</strong></b></p>
</td><td><span>Unsigned long long</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%o</strong></b></p>
</td><td><span>Octal representation</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%p</strong></b></p>
</td><td><span>Pointer</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%s</strong></b></p>
</td><td><span>String</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%u</strong></b></p>
</td><td><span>Unsigned int</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%x or %X</strong></b></p>
</td><td><span>Hexadecimal representation</span></td></tr><tr><td><p dir="ltr" style="text-align: center;"><b><strong>%n</strong></b></p>
</td><td><span>Prints nothing</span></td></tr><tr><td><p style="text-align: center;"><b><strong>%%</strong></b></p>
</td><td><span>Prints % character</span></td></tr></tbody></table>

<table>
<tbody>
<tr>
<td style="text-align: center;">
<p><strong>Symbol/ Notation</strong></p>
</td>
<td style="text-align: center;">
<p><strong>Format Specifier Name</strong></p>
</td>
<td style="text-align: center;">
<p><strong>Description</strong></p>
</td>
<td style="text-align: center;">
<p><strong>Data type</strong></p>
</td>
<td style="text-align: center;">
<p><strong>Range</strong></p>
</td>
<td style="text-align: center;">
<p><strong>Size</strong></p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%d or %i</p>
</td>
<td style="text-align: center;">
<p>Decimal integer</p>
</td>
<td style="text-align: center;">
<p>Signed integer in base 10</p>
</td>
<td style="text-align: center;">
<p>int</p>
</td>
<td style="text-align: center;">
<p>-2147483648 to 2147483647</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%f</p>
</td>
<td style="text-align: center;">
<p>Float</p>
</td>
<td style="text-align: center;">
<p>Floating point number with six digits of precision</p>
</td>
<td style="text-align: center;">
<p>float</p>
</td>
<td style="text-align: center;">
<p>1.2E-38 to 3.4E+38</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%Lf</p>
</td>
<td style="text-align: center;">
<p>Long double</p>
</td>
<td style="text-align: center;">
<p>Floating point number with extended precision</p>
</td>
<td style="text-align: center;">
<p>long double</p>
</td>
<td style="text-align: center;">
<p>3.4E-4932 to 1.1E+4932</p>
</td>
<td style="text-align: center;">
<p>10 or 16 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%c</p>
</td>
<td style="text-align: center;">
<p>Character</p>
</td>
<td style="text-align: center;">
<p>Single character</p>
</td>
<td style="text-align: center;">
<p>char</p>
</td>
<td style="text-align: center;">
<p>-128 to 127</p>
</td>
<td style="text-align: center;">
<p>1 byte</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%s</p>
</td>
<td style="text-align: center;">
<p>String</p>
</td>
<td style="text-align: center;">
<p>String of characters</p>
</td>
<td style="text-align: center;">
<p>char[]</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%p</p>
</td>
<td style="text-align: center;">
<p>Pointer</p>
</td>
<td style="text-align: center;">
<p>Address in memory</p>
</td>
<td style="text-align: center;">
<p>void *</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
<td style="text-align: center;">
<p>4 or 8 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%Id</p>
</td>
<td style="text-align: center;">
<p>Long integer</p>
</td>
<td style="text-align: center;">
<p>Signed long integer</p>
</td>
<td style="text-align: center;">
<p>signed long</p>
</td>
<td style="text-align: center;">
<p>-2147483648 to 2147483647</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%lu</p>
</td>
<td style="text-align: center;">
<p>Unsigned Long</p>
</td>
<td style="text-align: center;">
<p>Unsigned long integer</p>
</td>
<td style="text-align: center;">
<p>unsigned long</p>
</td>
<td style="text-align: center;">
<p>0 to 4294967295</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%lld</p>
</td>
<td style="text-align: center;">
<p>Long Long</p>
</td>
<td style="text-align: center;">
<p>Signed long long integer</p>
</td>
<td style="text-align: center;">
<p>long long</p>
</td>
<td style="text-align: center;">
<p>-9223372036854775808 to 9223372036854775807</p>
</td>
<td style="text-align: center;">
<p>8 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%llu</p>
</td>
<td style="text-align: center;">
<p>Unsigned Long Long</p>
</td>
<td style="text-align: center;">
<p>Unsigned long long integer</p>
</td>
<td style="text-align: center;">
<p>unsigned long long</p>
</td>
<td style="text-align: center;">
<p>0 to 18446744073709551615</p>
</td>
<td style="text-align: center;">
<p>8 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%x</p>
</td>
<td style="text-align: center;">
<p>Hexadecimal</p>
</td>
<td style="text-align: center;">
<p>Unsigned integer in base 16</p>
</td>
<td style="text-align: center;">
<p>unsigned int</p>
</td>
<td style="text-align: center;">
<p>0 to 4294967295</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%E</p>
</td>
<td style="text-align: center;">
<p>Scientific notation</p>
</td>
<td style="text-align: center;">
<p>Floating point number in scientific notation</p>
</td>
<td style="text-align: center;">
<p>double</p>
</td>
<td style="text-align: center;">
<p>2.2E-308 to 1.8E+308</p>
</td>
<td style="text-align: center;">
<p>8 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%o</p>
</td>
<td style="text-align: center;">
<p>Octal</p>
</td>
<td style="text-align: center;">
<p>Unsigned integer in base 8</p>
</td>
<td style="text-align: center;">
<p>unsigned int</p>
</td>
<td style="text-align: center;">
<p>0 to 4294967295</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%u</p>
</td>
<td style="text-align: center;">
<p>Unsigned Decimal</p>
</td>
<td style="text-align: center;">
<p>Unsigned integer in base 10</p>
</td>
<td style="text-align: center;">
<p>unsigned int</p>
</td>
<td style="text-align: center;">
<p>0 to 4294967295</p>
</td>
<td style="text-align: center;">
<p>4 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%hd</p>
</td>
<td style="text-align: center;">
<p>Short</p>
</td>
<td style="text-align: center;">
<p>Short signed integer</p>
</td>
<td style="text-align: center;">
<p>short</p>
</td>
<td style="text-align: center;">
<p>-32768 to 32767</p>
</td>
<td style="text-align: center;">
<p>2 bytes</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%m</p>
</td>
<td style="text-align: center;">
<p>Error message</p>
</td>
<td style="text-align: center;">
<p>Error message corresponding to the error number in the argument</p>
</td>
<td style="text-align: center;">
<p>int</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%n</p>
</td>
<td style="text-align: center;">
<p>Output assignment</p>
</td>
<td style="text-align: center;">
<p>Stores the number of characters written so far into the pointer argument</p>
</td>
<td style="text-align: center;">
<p>int *</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
<td style="text-align: center;">
<p>-</p>
</td>
</tr>
<tr>
<td style="text-align: center;">
<p>%hu</p>
</td>
<td style="text-align: center;">
<p>Unsigned Short</p>
</td>
<td style="text-align: center;">
<p>Short unsigned integer</p>
</td>
<td style="text-align: center;">
<p>unsigned short</p>
</td>
<td style="text-align: center;">
<p>0 to 65535</p>
</td>
<td style="text-align: center;">
<p>2 bytes</p>
</td>
</tr>
</tbody>
</table>
