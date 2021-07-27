---
layout: post
title:  "C Makefile cheatsheet"
date:   2021-07-27 12:46:56
categories: C
description: C Makefile cheatsheet
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Make is a build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles which specify how to derive the target program.
---
<p>Make is a build automation tool that automatically builds executable programs and libraries from source code by reading files called Makefiles which specify how to derive the target program.</p>

<h1>C Makefile cheatsheet<a class="headerlink" href="#c-makefile-cheatsheet" title="Permalink to this headline">¶</a></h1>
<div class="contents topic" id="table-of-contents">
<p class="topic-title">Table of Contents</p>
<ul class="simple">
<li><p><a class="reference internal" href="#c-makefile-cheatsheet" id="id1">C Makefile cheatsheet</a></p>
<ul>
<li><p><a class="reference internal" href="#automatic-variables" id="id2">Automatic variables</a></p></li>
<li><p><a class="reference internal" href="#using-warning-text-check-make-rules-for-debug" id="id3">using <code class="docutils literal notranslate"><span class="pre">$(warning</span> <span class="pre">text)</span></code> check make rules (for debug)</a></p></li>
<li><p><a class="reference internal" href="#string-functions" id="id4">string functions</a></p></li>
<li><p><a class="reference internal" href="#using-sort-list-sort-list-and-remove-duplicates" id="id5">using <code class="docutils literal notranslate"><span class="pre">$(sort</span> <span class="pre">list)</span></code> sort list and remove duplicates</a></p></li>
<li><p><a class="reference internal" href="#single-dollar-sign-and-double-dollar-sign" id="id6">single dollar sign and double dollar sign</a></p></li>
<li><p><a class="reference internal" href="#build-executable-files-respectively" id="id7">build executable files respectively</a></p></li>
<li><p><a class="reference internal" href="#using-eval-predefine-variables" id="id8">using <code class="docutils literal notranslate"><span class="pre">$(eval)</span></code> predefine variables</a></p></li>
<li><p><a class="reference internal" href="#build-subdir-and-link-together" id="id9">build subdir and link together</a></p></li>
<li><p><a class="reference internal" href="#build-shared-library" id="id10">build shared library</a></p></li>
<li><p><a class="reference internal" href="#build-shared-and-static-library" id="id11">build shared and static library</a></p></li>
<li><p><a class="reference internal" href="#build-recursively" id="id12">build recursively</a></p></li>
<li><p><a class="reference internal" href="#replace-current-shell" id="id13">replace current shell</a></p></li>
<li><p><a class="reference internal" href="#one-line-condition" id="id14">one line condition</a></p></li>
<li><p><a class="reference internal" href="#using-define-to-control-cflags" id="id15">Using define to control CFLAGS</a></p></li>
</ul>
</li>
</ul>
</div>
<section id="automatic-variables">
<h2>Automatic variables<a class="headerlink" href="#automatic-variables" title="Permalink to this headline">¶</a></h2>
<table class="docutils align-default">
<colgroup>
<col style="width: 27%">
<col style="width: 73%">
</colgroup>
<tbody>
<tr class="row-odd"><td><p>automatic variables</p></td>
<td><p>descriptions</p></td>
</tr>
<tr class="row-even"><td><p>$@</p></td>
<td><p>The file name of the target</p></td>
</tr>
<tr class="row-odd"><td><p>$&lt;</p></td>
<td><p>The name of the first prerequisite</p></td>
</tr>
<tr class="row-even"><td><p>$^</p></td>
<td><p>The names of all the prerequisites</p></td>
</tr>
<tr class="row-odd"><td><p>$+</p></td>
<td><p>prerequisites listed more than once are duplicated in the order</p></td>
</tr>
</tbody>
</table>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="nf">all</span><span class="o">:</span> <span class="n">hello</span> <span class="n">world</span>

<span class="nf">hello world</span><span class="o">:</span> <span class="n">foo</span> <span class="n">foo</span> <span class="n">foo</span> <span class="n">bar</span> <span class="n">bar</span>
        @echo <span class="s2">"== target: </span><span class="nv">$@</span><span class="s2"> =="</span>
        @echo $&lt;
        @echo $^
        @echo $+

<span class="nf">foo</span><span class="o">:</span>
        @echo <span class="s2">"Hello foo"</span>

<span class="nf">bar</span><span class="o">:</span>
        @echo <span class="s2">"Hello Bar"</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>Hello foo
Hello <span class="nv">Bar</span>
<span class="o">==</span> target: <span class="nv">hello</span> <span class="o">==</span>
foo
foo bar
foo foo foo bar <span class="nv">bar</span>
<span class="o">==</span> target: <span class="nv">world</span> <span class="o">==</span>
foo
foo bar
foo foo foo bar bar
</pre></div>
</div>
</section>
<section id="using-warning-text-check-make-rules-for-debug">
<h2>using <code class="docutils literal notranslate"><span class="pre">$(warning</span> <span class="pre">text)</span></code> check make rules (for debug)<a class="headerlink" href="#using-warning-text-check-make-rules-for-debug" title="Permalink to this headline">¶</a></h2>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="k">$(</span><span class="nv">warning</span> <span class="nv">Top</span> <span class="nv">level</span> <span class="nv">warning</span><span class="k">)</span>

<span class="nv">FOO</span> <span class="o">:=</span> <span class="k">$(</span>warning FOO variable<span class="k">)</span>foo
<span class="nv">BAR</span>  <span class="o">=</span> <span class="k">$(</span>warning BAR variable<span class="k">)</span>bar

<span class="nf">$(warning target)target</span><span class="o">:</span> <span class="k">$(</span><span class="nv">warning</span> <span class="nv">prerequisite</span> <span class="nv">list</span><span class="k">)</span><span class="n">Makefile</span> <span class="k">$(</span><span class="nv">BAR</span><span class="k">)</span>
        <span class="k">$(</span>warning tagrget script<span class="k">)</span>
        @ls
<span class="nf">$(BAR)</span><span class="o">:</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>Makefile:1: Top level warning
Makefile:3: FOO variable
Makefile:6: target
Makefile:6: prerequisite list
Makefile:6: BAR variable
Makefile:9: BAR variable
Makefile:7: tagrget script
Makefile
</pre></div>
</div>
</section>
<section id="string-functions">
<h2>string functions<a class="headerlink" href="#string-functions" title="Permalink to this headline">¶</a></h2>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SRC</span>      <span class="o">=</span> hello_foo.c hello_bar.c foo_world.c bar_world.c

<span class="nv">SUBST</span>    <span class="o">=</span> <span class="k">$(</span>subst .c,,<span class="k">$(</span>SRC<span class="k">))</span>

<span class="nv">SRCST</span>    <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">PATSRCST</span> <span class="o">=</span> <span class="k">$(</span>SRC:%.c<span class="o">=</span>%.o<span class="k">)</span>
<span class="nv">PATSUBST</span> <span class="o">=</span> <span class="k">$(</span>patsubst %.c, %.o, <span class="k">$(</span>SRC<span class="k">))</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="nf">all</span><span class="o">:</span> <span class="n">sub</span> <span class="n">filter</span> <span class="n">findstring</span> <span class="n">words</span> <span class="n">word</span> <span class="n">wordlist</span>

<span class="nf">sub</span><span class="o">:</span>
        @echo <span class="s2">"== sub example =="</span>
        @echo <span class="s2">"SUBST: "</span> <span class="k">$(</span>SUBST<span class="k">)</span>
        @echo <span class="s2">"SRCST: "</span> <span class="k">$(</span>SRCST<span class="k">)</span>
        @echo <span class="s2">"PATSRCST: "</span> <span class="k">$(</span>PATSRCST<span class="k">)</span>
        @echo <span class="s2">"PATSUBST: "</span> <span class="k">$(</span>PATSUBST<span class="k">)</span>
        @echo <span class="s2">""</span>

<span class="nf">filter</span><span class="o">:</span>
        @echo <span class="s2">"== filter example =="</span>
        @echo <span class="s2">"filter: "</span> <span class="k">$(</span>filter hello_%, <span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">"filter-out: </span><span class="k">$(</span>filter-out hello_%, <span class="k">$(</span>SRC<span class="k">))</span><span class="s2">"</span>
        @echo <span class="s2">""</span>

<span class="nf">findstring</span><span class="o">:</span>
        @echo <span class="s2">"== findstring example =="</span>
        @echo <span class="s2">"Res: "</span> <span class="k">$(</span>findstring hello, hello world<span class="k">)</span>
        @echo <span class="s2">"Res: "</span> <span class="k">$(</span>findstring hello, ker<span class="k">)</span>
        @echo <span class="s2">"Res: "</span> <span class="k">$(</span>findstring world, worl<span class="k">)</span>
        @echo <span class="s2">""</span>

<span class="nf">words</span><span class="o">:</span>
        @echo <span class="s2">"== words example =="</span>
        @echo <span class="s2">"num of words: "</span><span class="k">$(</span>words <span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">""</span>


<span class="nf">word</span><span class="o">:</span>
        @echo <span class="s2">"== word example =="</span>
        @echo <span class="s2">"1st word: "</span> <span class="k">$(</span>word <span class="m">1</span>,<span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">"2nd word: "</span> <span class="k">$(</span>word <span class="m">2</span>,<span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">"3th word: "</span> <span class="k">$(</span>word <span class="m">3</span>,<span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">""</span>


<span class="nf">wordlist</span><span class="o">:</span>
        @echo <span class="s2">"== wordlist example =="</span>
        @echo <span class="s2">"[1:3]:"</span><span class="k">$(</span>wordlist <span class="m">1</span>,3,<span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="s2">""</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ <span class="nv">make</span>
<span class="o">==</span> sub <span class="nv">example</span> <span class="o">==</span>
SUBST:  hello_foo hello_bar foo_world bar_world
SRCST:  hello_foo.o hello_bar.o foo_world.o bar_world.o
PATSRCST:  hello_foo.o hello_bar.o foo_world.o bar_world.o
PATSUBST:  hello_foo.o hello_bar.o foo_world.o bar_world.o

<span class="o">==</span> filter <span class="nv">example</span> <span class="o">==</span>
filter:  hello_foo.c hello_bar.c
filter-out: foo_world.c bar_world.c

<span class="o">==</span> findstring <span class="nv">example</span> <span class="o">==</span>
Res:  hello
Res:
Res:

<span class="o">==</span> words <span class="nv">example</span> <span class="o">==</span>
num of words: <span class="nv">4</span>

<span class="o">==</span> word <span class="nv">example</span> <span class="o">==</span>
1st word:  hello_foo.c
2nd word:  hello_bar.c
3th word:  foo_world.c

<span class="o">==</span> wordlist <span class="nv">example</span> <span class="o">==</span>
<span class="o">[</span><span class="m">1</span>:3<span class="o">]</span>:hello_foo.c hello_bar.c foo_world.c
</pre></div>
</div>
</section>
<section id="using-sort-list-sort-list-and-remove-duplicates">
<h2>using <code class="docutils literal notranslate"><span class="pre">$(sort</span> <span class="pre">list)</span></code> sort list and remove duplicates<a class="headerlink" href="#using-sort-list-sort-list-and-remove-duplicates" title="Permalink to this headline">¶</a></h2>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SRC</span> <span class="o">=</span> foo.c bar.c ker.c foo.h bar.h ker.h

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="nf">all</span><span class="o">:</span>
        @echo <span class="k">$(</span>suffix <span class="k">$(</span>SRC<span class="k">))</span>
        @echo <span class="k">$(</span>sort <span class="k">$(</span>suffix <span class="k">$(</span>SRC<span class="k">)))</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
.c .c .c .h .h .h
.c .h
</pre></div>
</div>
</section>
<section id="single-dollar-sign-and-double-dollar-sign">
<h2>single dollar sign and double dollar sign<a class="headerlink" href="#single-dollar-sign-and-double-dollar-sign" title="Permalink to this headline">¶</a></h2>
<table class="docutils align-default">
<colgroup>
<col style="width: 24%">
<col style="width: 76%">
</colgroup>
<tbody>
<tr class="row-odd"><td><p>dollar sign</p></td>
<td><p>descriptions</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">$</span></code></p></td>
<td><p>reference a make variable using <code class="docutils literal notranslate"><span class="pre">$</span></code></p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">$$</span></code></p></td>
<td><p>reference a shell variable using <code class="docutils literal notranslate"><span class="pre">$$</span></code></p></td>
</tr>
</tbody>
</table>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">LIST</span> <span class="o">=</span> one two three

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">single_dollar</span> <span class="n">double_dollar</span>

<span class="nf">all</span><span class="o">:</span> <span class="n">single_dollar</span> <span class="n">double_dollar</span>

<span class="nf">double_dollar</span><span class="o">:</span>
        @echo <span class="s2">"=== double dollar sign example ==="</span>
        @for i <span class="k">in</span> <span class="k">$(</span>LIST<span class="k">)</span><span class="p">;</span> <span class="k">do</span> <span class="se">\</span>
                <span class="nb">echo</span> <span class="nv">$$</span>i<span class="p">;</span>     <span class="se">\</span>
        <span class="k">done</span>

<span class="nf">single_dollar</span><span class="o">:</span>
        @echo <span class="s2">"=== single dollar sign example ==="</span>
        @for i <span class="k">in</span> <span class="k">$(</span>LIST<span class="k">)</span><span class="p">;</span> <span class="k">do</span>  <span class="se">\</span>
                <span class="nb">echo</span> <span class="nv">$i</span><span class="p">;</span>     <span class="se">\</span>
        <span class="k">done</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ <span class="nv">make</span>
<span class="o">===</span> single dollar sign <span class="nv">example</span> <span class="o">===</span>



<span class="o">===</span> double dollar sign <span class="nv">example</span> <span class="o">===</span>
one
two
three
</pre></div>
</div>
</section>
<section id="build-executable-files-respectively">
<h2>build executable files respectively<a class="headerlink" href="#build-executable-files-respectively" title="Permalink to this headline">¶</a></h2>
<p>directory layout</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- bar.c
<span class="p">|</span>-- bar.h
<span class="p">|</span>-- foo.c
<span class="sb">`</span>-- foo.h
</pre></div>
</div>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="c"># CFLAGS: Extra flags to give to the C compiler</span>
<span class="nv">CFLAGS</span>   <span class="o">+=</span> -Werror -Wall -O2 -g
<span class="nv">SRC</span>       <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">OBJ</span>       <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">EXE</span>       <span class="o">=</span> <span class="k">$(</span>subst .c,,<span class="k">$(</span>SRC<span class="k">))</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span> <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>

<span class="nf">clean</span><span class="o">:</span>
    rm -rf *.o *.so *.a *.la <span class="k">$(</span>EXE<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
cc -Werror -Wall -O2 -g   -c -o foo.o foo.c
cc -Werror -Wall -O2 -g   -c -o bar.o bar.c
cc   foo.o   -o foo
cc   bar.o   -o bar
</pre></div>
</div>
</section>
<section id="using-eval-predefine-variables">
<h2>using <code class="docutils literal notranslate"><span class="pre">$(eval)</span></code> predefine variables<a class="headerlink" href="#using-eval-predefine-variables" title="Permalink to this headline">¶</a></h2>
<p>without <code class="docutils literal notranslate"><span class="pre">$(eval)</span></code></p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SRC</span> <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">EXE</span> <span class="o">=</span> <span class="k">$(</span>subst .c,,<span class="k">$(</span>SRC<span class="k">))</span>

<span class="cp">define PROGRAM_template</span>
<span class="nv">$1_SHARED</span> <span class="o">=</span> lib<span class="k">$(</span>strip <span class="nv">$1</span><span class="k">)</span>.so
<span class="cp">endef</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="k">$(</span><span class="nv">foreach</span> <span class="nv">exe</span>, <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>, <span class="k">$(</span><span class="nv">call</span> <span class="nv">PROGRAM_template</span>, <span class="k">$(</span><span class="nv">exe</span><span class="k">)))</span>

<span class="nf">all</span><span class="o">:</span>
        @echo <span class="k">$(</span>foo_SHARED<span class="k">)</span>
        @echo <span class="k">$(</span>bar_SHARED<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
Makefile:11: *** missing separator.  Stop.
</pre></div>
</div>
<p>with <code class="docutils literal notranslate"><span class="pre">$(evall)</span></code></p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">CFLAGS</span>  <span class="o">+=</span> -Wall -g -O2 -I./include
<span class="nv">SRC</span> <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">EXE</span> <span class="o">=</span> <span class="k">$(</span>subst .c,,<span class="k">$(</span>SRC<span class="k">))</span>

<span class="cp">define PROGRAM_template</span>
<span class="nv">$1_SHARED</span> <span class="o">=</span> lib<span class="k">$(</span>strip <span class="nv">$1</span><span class="k">)</span>.so
<span class="cp">endef</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="k">$(</span><span class="nv">foreach</span> <span class="nv">exe</span>, <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>, <span class="k">$(</span><span class="nv">eval</span> <span class="k">$(</span><span class="nv">call</span> <span class="nv">PROGRAM_template</span>, <span class="k">$(</span><span class="nv">exe</span><span class="k">))))</span>

<span class="nf">all</span><span class="o">:</span>
        @echo <span class="k">$(</span>foo_SHARED<span class="k">)</span>
        @echo <span class="k">$(</span>bar_SHARED<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
libfoo.so
libbar.so
</pre></div>
</div>
</section>
<section id="build-subdir-and-link-together">
<h2>build subdir and link together<a class="headerlink" href="#build-subdir-and-link-together" title="Permalink to this headline">¶</a></h2>
<p>directory layout</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- include
<span class="p">|</span>   <span class="sb">`</span>-- foo.h
<span class="sb">`</span>-- src
    <span class="p">|</span>-- foo.c
    <span class="sb">`</span>-- main.c
</pre></div>
</div>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">CFLAGS</span>  <span class="o">+=</span> -Wall -g -O2 -I./include
<span class="nv">SRC</span>     <span class="o">=</span> <span class="k">$(</span>wildcard src/*.c<span class="k">)</span>
<span class="nv">OBJ</span>     <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">EXE</span>     <span class="o">=</span> main

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span> <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>

<span class="nf">$(EXE)</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>LDFLAGS<span class="k">)</span> -o <span class="nv">$@</span> $^

<span class="nf">%.o</span><span class="o">:</span> %.<span class="n">c</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>CFLAGS<span class="k">)</span> -c $&lt; -o <span class="nv">$@</span>

<span class="nf">clean</span><span class="o">:</span>
        rm -rf *.o *.so *.a *.la <span class="k">$(</span>EXE<span class="k">)</span> src/*.o src/*.so src/*a
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
cc -Wall -g -O2 -I./include -c src/foo.c -o src/foo.o
cc -Wall -g -O2 -I./include -c src/main.c -o src/main.o
cc  -o main src/foo.o src/main.o
</pre></div>
</div>
</section>
<section id="build-shared-library">
<h2>build shared library<a class="headerlink" href="#build-shared-library" title="Permalink to this headline">¶</a></h2>
<p>directory layout</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- include
<span class="p">|</span>   <span class="sb">`</span>-- common.h
<span class="sb">`</span>-- src
    <span class="p">|</span>-- bar.c
    <span class="sb">`</span>-- foo.c
</pre></div>
</div>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SONAME</span>    <span class="o">=</span> libfoobar.so.1
<span class="nv">SHARED</span>    <span class="o">=</span> src/libfoobar.so.1.0.0
<span class="nv">SRC</span>       <span class="o">=</span> <span class="k">$(</span>wildcard src/*.c<span class="k">)</span>
<span class="nv">OBJ</span>       <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>

<span class="nv">CFLAGS</span>    <span class="o">+=</span> -Wall -Werror -fPIC -O2 -g -I./include
<span class="nv">LDFLAGS</span>   <span class="o">+=</span> -shared -Wl,-soname,<span class="k">$(</span>SONAME<span class="k">)</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SHARED</span><span class="k">)</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>

<span class="nf">$(SHARED)</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>LDFLAGS<span class="k">)</span> -o <span class="nv">$@</span> $^

<span class="nf">%.o</span><span class="o">:</span> %.<span class="n">c</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>CFLAGS<span class="k">)</span> -c $^ -o <span class="nv">$@</span>

<span class="nf">clean</span><span class="o">:</span>
        rm -rf src/*.o src/*.so.* src/*.a src/*.la
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
cc -Wall -Werror -fPIC -O2 -g -I./include -c src/foo.c -o src/foo.o
cc -Wall -Werror -fPIC -O2 -g -I./include -c src/bar.c -o src/bar.o
cc -shared -Wl,-soname,libfoobar.so.1 -o src/libfoobar.so.1.0.0 src/foo.o src/bar.o
</pre></div>
</div>
</section>
<section id="build-shared-and-static-library">
<h2>build shared and static library<a class="headerlink" href="#build-shared-and-static-library" title="Permalink to this headline">¶</a></h2>
<p>directory layout</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- include
<span class="p">|</span>   <span class="p">|</span>-- bar.h
<span class="p">|</span>   <span class="sb">`</span>-- foo.h
<span class="sb">`</span>-- src
    <span class="p">|</span>-- Makefile
    <span class="p">|</span>-- bar.c
    <span class="sb">`</span>-- foo.c
</pre></div>
</div>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SUBDIR</span> <span class="o">=</span> src

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">clean</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">$(SUBDIR)</span><span class="o">:</span>
        make -C <span class="nv">$@</span> <span class="k">$(</span>MAKECMDGOALS<span class="k">)</span>
</pre></div>
</div>
<p>src/Makefile</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span><span class="nv">SRC</span>      <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">OBJ</span>      <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">LIB</span>      <span class="o">=</span> libfoobar

<span class="nv">STATIC</span>   <span class="o">=</span> <span class="k">$(</span>LIB<span class="k">)</span>.a
<span class="nv">SHARED</span>   <span class="o">=</span> <span class="k">$(</span>LIB<span class="k">)</span>.so.1.0.0
<span class="nv">SONAME</span>   <span class="o">=</span> <span class="k">$(</span>LIB<span class="k">)</span>.so.1
<span class="nv">SOFILE</span>   <span class="o">=</span> <span class="k">$(</span>LIB<span class="k">)</span>.so

<span class="nv">CFLAGS</span>  <span class="o">+=</span> -Wall -Werror -g -O2 -fPIC -I../include
<span class="nv">LDFLAGS</span> <span class="o">+=</span> -shared -Wl,-soname,<span class="k">$(</span>SONAME<span class="k">)</span>

.PHONY: all clean

all: <span class="k">$(</span>STATIC<span class="k">)</span> <span class="k">$(</span>SHARED<span class="k">)</span> <span class="k">$(</span>SONAME<span class="k">)</span> <span class="k">$(</span>SOFILE<span class="k">)</span>

<span class="k">$(</span>SOFILE<span class="k">)</span>: <span class="k">$(</span>SHARED<span class="k">)</span>
        ln -sf <span class="k">$(</span>SHARED<span class="k">)</span> <span class="k">$(</span>SOFILE<span class="k">)</span>

<span class="k">$(</span>SONAME<span class="k">)</span>: <span class="k">$(</span>SHARED<span class="k">)</span>
        ln -sf <span class="k">$(</span>SHARED<span class="k">)</span> <span class="k">$(</span>SONAME<span class="k">)</span>

<span class="k">$(</span>SHARED<span class="k">)</span>: <span class="k">$(</span>STATIC<span class="k">)</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>LDFLAGS<span class="k">)</span> -o <span class="nv">$@</span> $&lt;

<span class="k">$(</span>STATIC<span class="k">)</span>: <span class="k">$(</span>OBJ<span class="k">)</span>
        <span class="k">$(</span>AR<span class="k">)</span> <span class="k">$(</span>ARFLAGS<span class="k">)</span> <span class="nv">$@</span> $^

%.o: %.c
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>CFLAGS<span class="k">)</span> -c -o <span class="nv">$@</span> $&lt;

clean:
        rm -rf *.o *.a *.so *.so.*
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
make -C src
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Entering directory <span class="s1">'/root/test/src'</span>
cc -Wall -Werror -g -O2 -fPIC -I../include -c -o foo.o foo.c
cc -Wall -Werror -g -O2 -fPIC -I../include -c -o bar.o bar.c
ar rv libfoobar.a foo.o bar.o
ar: creating libfoobar.a
a - foo.o
a - bar.o
cc -shared -Wl,-soname,libfoobar.so.1 -o libfoobar.so.1.0.0 libfoobar.a
ln -sf libfoobar.so.1.0.0 libfoobar.so.1
ln -sf libfoobar.so.1.0.0 libfoobar.so
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Leaving directory <span class="s1">'/root/test/src'</span>
</pre></div>
</div>
</section>
<section id="build-recursively">
<h2>build recursively<a class="headerlink" href="#build-recursively" title="Permalink to this headline">¶</a></h2>
<p>directory layout</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- include
<span class="p">|</span>   <span class="sb">`</span>-- common.h
<span class="p">|</span>-- src
<span class="p">|</span>   <span class="p">|</span>-- Makefile
<span class="p">|</span>   <span class="p">|</span>-- bar.c
<span class="p">|</span>   <span class="sb">`</span>-- foo.c
<span class="sb">`</span>-- <span class="nb">test</span>
    <span class="p">|</span>-- Makefile
    <span class="sb">`</span>-- test.c
</pre></div>
</div>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SUBDIR</span> <span class="o">=</span> src <span class="nb">test</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">clean</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SUBDIR</span><span class="k">)</span>

<span class="nf">$(SUBDIR)</span><span class="o">:</span>
        <span class="k">$(</span>MAKE<span class="k">)</span> -C <span class="nv">$@</span> <span class="k">$(</span>MAKECMDGOALS<span class="k">)</span>
</pre></div>
</div>
<p>src/Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">SONAME</span>   <span class="o">=</span> libfoobar.so.1
<span class="nv">SHARED</span>   <span class="o">=</span> libfoobar.so.1.0.0
<span class="nv">SOFILE</span>   <span class="o">=</span> libfoobar.so

<span class="nv">CFLAGS</span>  <span class="o">+=</span> -Wall -g -O2 -Werror -fPIC -I../include
<span class="nv">LDFLAGS</span> <span class="o">+=</span> -shared -Wl,-soname,<span class="k">$(</span>SONAME<span class="k">)</span>

<span class="nv">SRC</span>      <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">OBJ</span>      <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">SHARED</span><span class="k">)</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>

<span class="nf">$(SHARED)</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>LDFLAGS<span class="k">)</span> -o <span class="nv">$@</span> $^
        ln -sf <span class="k">$(</span>SHARED<span class="k">)</span> <span class="k">$(</span>SONAME<span class="k">)</span>
        ln -sf <span class="k">$(</span>SHARED<span class="k">)</span> <span class="k">$(</span>SOFILE<span class="k">)</span>

<span class="nf">%.o</span><span class="o">:</span> %.<span class="n">c</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>CFLAGS<span class="k">)</span> -c $&lt; -o <span class="nv">$@</span>

<span class="nf">clean</span><span class="o">:</span>
        rm -rf *.o *.so.* *.a *.so
</pre></div>
</div>
<p>test/Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">CFLAGS</span>    <span class="o">+=</span> -Wall -Werror -g -I../include
<span class="nv">LDFLAGS</span>   <span class="o">+=</span> -Wall -L../src -lfoobar

<span class="nv">SRC</span>        <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">OBJ</span>        <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">EXE</span>        <span class="o">=</span> test_main

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span> <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>

<span class="nf">$(EXE)</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span>
        <span class="k">$(</span>CC<span class="k">)</span> -o <span class="nv">$@</span> $^ <span class="k">$(</span>LDFLAGS<span class="k">)</span>

<span class="nf">%.o</span><span class="o">:</span> %.<span class="n">c</span>
        <span class="k">$(</span>CC<span class="k">)</span> <span class="k">$(</span>CFLAGS<span class="k">)</span> -c $&lt; -o <span class="nv">$@</span>

<span class="nf">clean</span><span class="o">:</span>
        rm -rf *.so *.o *.a <span class="k">$(</span>EXE<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
make -C src
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Entering directory <span class="s1">'/root/proj/src'</span>
cc -Wall -g -O2 -Werror -fPIC -I../include -c foo.c -o foo.o
cc -Wall -g -O2 -Werror -fPIC -I../include -c bar.c -o bar.o
cc -shared -Wl,-soname,libfoobar.so.1 -o libfoobar.so.1.0.0 foo.o bar.o
ln -sf libfoobar.so.1.0.0 libfoobar.so.1
ln -sf libfoobar.so.1.0.0 libfoobar.so
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Leaving directory <span class="s1">'/root/proj/src'</span>
make -C <span class="nb">test</span>
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Entering directory <span class="s1">'/root/proj/test'</span>
cc -Wall -Werror -g -I../include -c test.c -o test.o
cc -o test_main test.o -Wall -L../src -lfoobar
make<span class="o">[</span><span class="m">1</span><span class="o">]</span>: Leaving directory <span class="s1">'/root/proj/test'</span>
$ tree .
.
<span class="p">|</span>-- Makefile
<span class="p">|</span>-- include
<span class="p">|</span>   <span class="sb">`</span>-- common.h
<span class="p">|</span>-- src
<span class="p">|</span>   <span class="p">|</span>-- Makefile
<span class="p">|</span>   <span class="p">|</span>-- bar.c
<span class="p">|</span>   <span class="p">|</span>-- bar.o
<span class="p">|</span>   <span class="p">|</span>-- foo.c
<span class="p">|</span>   <span class="p">|</span>-- foo.o
<span class="p">|</span>   <span class="p">|</span>-- libfoobar.so -&gt; libfoobar.so.1.0.0
<span class="p">|</span>   <span class="p">|</span>-- libfoobar.so.1 -&gt; libfoobar.so.1.0.0
<span class="p">|</span>   <span class="sb">`</span>-- libfoobar.so.1.0.0
<span class="sb">`</span>-- <span class="nb">test</span>
    <span class="p">|</span>-- Makefile
    <span class="p">|</span>-- test.c
    <span class="p">|</span>-- test.o
    <span class="sb">`</span>-- test_main

<span class="m">3</span> directories, <span class="m">14</span> files
</pre></div>
</div>
</section>
<section id="replace-current-shell">
<h2>replace current shell<a class="headerlink" href="#replace-current-shell" title="Permalink to this headline">¶</a></h2>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">OLD_SHELL</span> <span class="o">:=</span> <span class="k">$(</span>SHELL<span class="k">)</span>
<span class="nv">SHELL</span> <span class="o">=</span> /usr/bin/python

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="nf">all</span><span class="o">:</span>
        @import os<span class="p">;</span> print os.uname<span class="o">()[</span><span class="m">0</span><span class="o">]</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
Linux
</pre></div>
</div>
</section>
<section id="one-line-condition">
<h2>one line condition<a class="headerlink" href="#one-line-condition" title="Permalink to this headline">¶</a></h2>
<p>syntax: <code class="docutils literal notranslate"><span class="pre">$(if</span> <span class="pre">cond,</span> <span class="pre">then</span> <span class="pre">part,</span> <span class="pre">else</span> <span class="pre">part)</span></code></p>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">VAR</span> <span class="o">=</span>
<span class="nv">IS_EMPTY</span> <span class="o">=</span> <span class="k">$(if</span> <span class="k">$(</span>VAR<span class="k">)</span>, <span class="k">$(</span>info not empty<span class="k">)</span>, <span class="k">$(</span>info empty<span class="k">))</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span>

<span class="nf">all</span><span class="o">:</span>
        @echo <span class="k">$(</span>IS_EMPTY<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
empty

$ make <span class="nv">VAR</span><span class="o">=</span><span class="nb">true</span>
not empty
</pre></div>
</div>
</section>
<section id="using-define-to-control-cflags">
<h2>Using define to control CFLAGS<a class="headerlink" href="#using-define-to-control-cflags" title="Permalink to this headline">¶</a></h2>
<p>Makefile</p>
<div class="highlight-make notranslate"><div class="highlight"><pre><span></span><span class="nv">CFLAGS</span> <span class="o">+=</span> -Wall -Werror -g -O2
<span class="nv">SRC</span>     <span class="o">=</span> <span class="k">$(</span>wildcard *.c<span class="k">)</span>
<span class="nv">OBJ</span>     <span class="o">=</span> <span class="k">$(</span>SRC:.c<span class="o">=</span>.o<span class="k">)</span>
<span class="nv">EXE</span>     <span class="o">=</span> <span class="k">$(</span>subst .c,,<span class="k">$(</span>SRC<span class="k">))</span>

<span class="cp">ifdef DEBUG</span>
<span class="nv">CFLAGS</span> <span class="o">+=</span> -DDEBUG
<span class="cp">endif</span>

<span class="nf">.PHONY</span><span class="o">:</span> <span class="n">all</span> <span class="n">clean</span>

<span class="nf">all</span><span class="o">:</span> <span class="k">$(</span><span class="nv">OBJ</span><span class="k">)</span> <span class="k">$(</span><span class="nv">EXE</span><span class="k">)</span>

<span class="nf">clean</span><span class="o">:</span>
        rm -rf <span class="k">$(</span>OBJ<span class="k">)</span> <span class="k">$(</span>EXE<span class="k">)</span>
</pre></div>
</div>
<p>output</p>
<div class="highlight-bash notranslate"><div class="highlight"><pre><span></span>$ make
cc -Wall -Werror -g -O2   -c -o foo.o foo.c
cc   foo.o   -o foo
$ make <span class="nv">DEBUG</span><span class="o">=</span><span class="m">1</span>
cc -Wall -Werror -g -O2 -DDEBUG   -c -o foo.o foo.c
cc   foo.o   -o foo
</pre></div>
</div>
</section>


