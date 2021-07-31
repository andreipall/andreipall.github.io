---
layout: post
title:  "TypeScript Cheat Sheet"
date:   2018-02-14 12:46:56
categories: JavaScript
description: TypeScript Cheat Sheet
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.
---
<p>TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.</p>
<table>
<tbody>
<tr>
<td colspan="2"><b>Usage</b></td>
</tr>
<tr>
<td style="width: 35%">Install</td>
<td>
<pre class=" language-bash" title=""><code class=" language-bash">npm install TypeScript
</code></pre>
</td>
</tr>
<tr>
<td>Run</td>
<td>
<pre class=" language-bash" title=""><code class=" language-bash">npx tsc
</code></pre>
</td>
</tr>
<tr>
<td>Run with a specific config</td>
<td>
<pre class=" language-bash" title=""><code class=" language-bash">npx tsc --project configs/my_tsconfig.json
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Triple slash directives</b></td>
</tr>
<tr>
<td>Reference built-in types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">/// &lt;reference lib="es2016.array.include" /&gt;</span>
</code></pre>
</td>
</tr>
<tr>
<td>Reference other types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">/// &lt;reference path="../my_types" /&gt;</span>
<span class="token comment">/// &lt;reference types="jquery" /&gt;</span>
</code></pre>
</td>
</tr>
<tr>
<td>AMD</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">/// &lt;amd-module name="Name" /&gt;</span>
<span class="token comment">/// &lt;amd-dependency path="app/foo" name="foo" /&gt;</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Compiler comments</b></td>
</tr>
<tr>
<td>Don’t check this file</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">// @ts-nocheck</span></code></pre>
</td>
</tr>
<tr>
<td>Check this file (JS)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">// @ts-check</span></code></pre>
</td>
</tr>
<tr>
<td>Ignore the next line</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">// @ts-ignore</span></code></pre>
</td>
</tr>
<tr>
<td>Expect an error on the next line</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token comment">// @ts-expect-error</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Operators</b> (TypeScript-specific and draft JavaScript)</td>
</tr>
<tr>
<td><code>??</code> (nullish coalescing)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">getValue</span><span class="token punctuation">(</span>val<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token string">'nil'</span> <span class="token punctuation">{</span>
  <span class="token comment">// Will return 'nil' if `val` is falsey (including 0)</span>
  <span class="token comment">// return val || 'nil';</span>

  <span class="token comment">// Will only return 'nil' if `val` is null or undefined</span>
  <span class="token keyword">return</span> val <span class="token operator">??</span> <span class="token string">'nil'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>?.</code> (optional chaining)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">countCaps</span><span class="token punctuation">(</span>value<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// The `value` expression be undefined if `value` is null or</span>
  <span class="token comment">// undefined, or if the `match` call doesn't find anything.</span>
  <span class="token keyword">return</span> value<span class="token operator">?.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[A-Z]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">)</span><span class="token operator">?.</span>length <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>!</code> (null assertion)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> value<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

<span class="token comment">// ... Code that we're sure will initialize `value` ...</span>

<span class="token comment">// Assert that `value` is defined</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">value is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>value<span class="token operator">!</span><span class="token punctuation">.</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> characters long</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>&amp;&amp;=</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> a<span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
 
<span class="token comment">// assign a value only if current value is truthy</span>
 
a <span class="token operator">&amp;&amp;=</span> <span class="token string">'default'</span><span class="token punctuation">;</span> <span class="token comment">// a is still undefined</span>
b <span class="token operator">&amp;&amp;=</span>  <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// b is now 5</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>||=</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> a<span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
 
<span class="token comment">// assign a value only if current value is falsy</span>
 
a <span class="token operator">||=</span> <span class="token string">'default'</span><span class="token punctuation">;</span> <span class="token comment">// a is 'default' now</span>
b <span class="token operator">||=</span>  <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// b is still 1</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>??=</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> a<span class="token punctuation">;</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 
<span class="token comment">// assign a value only if current value is null or undefined</span>
 
a <span class="token operator">??=</span> <span class="token string">'default'</span><span class="token punctuation">;</span> <span class="token comment">// a is now 'default'</span>
b <span class="token operator">??=</span>  <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// b is still 0</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Basic types</b></td>
</tr>
<tr>
<td>Untyped</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">any</span></code></pre>
</td>
</tr>
<tr>
<td>A string</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">string</span></code></pre>
</td>
</tr>
<tr>
<td>A number</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">number</span></code></pre>
</td>
</tr>
<tr>
<td>A true / false value</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">boolean</span></code></pre>
</td>
</tr>
<tr>
<td>A non-primitive value</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">object</code></pre>
</td>
</tr>
<tr>
<td>Uninitialized value</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">undefined</span></code></pre>
</td>
</tr>
<tr>
<td>Explicitly empty value</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">null</span></code></pre>
</td>
</tr>
<tr>
<td>Null or undefined (usually only used for function returns)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">void</span></code></pre>
</td>
</tr>
<tr>
<td>A value that can never occur</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">never</span></code></pre>
</td>
</tr>
<tr>
<td>A value with an unknown type</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">unknown</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Object types</b></td>
</tr>
<tr>
<td>Object</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span>
    requiredStringVal<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    optionalNum<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> readOnlyBool<span class="token operator">:</span> bool<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre>
</td></tr>
<tr>
<td>Object with arbitrary string properties (like a hashmap or dictionary)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> Type<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span> Type<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Literal types</b></td>
</tr>
<tr>
<td>String</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> direction<span class="token operator">:</span> <span class="token string">'left'</span> <span class="token operator">|</span> <span class="token string">'right'</span><span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td>Numeric</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> roll<span class="token operator">:</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">|</span> <span class="token number">3</span> <span class="token operator">|</span> <span class="token number">4</span> <span class="token operator">|</span> <span class="token number">5</span> <span class="token operator">|</span> <span class="token number">6</span><span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Arrays and tuples</b></td>
</tr>
<tr>
<td>Array of strings</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></code></pre>
</td>
</tr>
<tr>
<td>Array of functions that return strings</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token operator">&gt;</span></code></pre>
</td>
</tr>
<tr>
<td>Basic tuples</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> myTuple<span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">boolean</span><span class="token operator">?</span> <span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
<pre class=" language-typescript" title=""><code class=" language-typescript">myTuple <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string">'test'</span><span class="token punctuation">,</span> <span class="token number">42</span> <span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td>Variadic tuples</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Numbers</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Strings</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
 
<span class="token keyword">type</span> <span class="token class-name">NumbersAndStrings</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>Numbers<span class="token punctuation">,</span> <span class="token operator">...</span>Strings<span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token comment">// [number, number, string, string]</span>

<span class="token keyword">type</span> <span class="token class-name">NumberAndRest</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// [number, varying number of string] </span>

<span class="token keyword">type</span> <span class="token class-name">RestAndBoolean</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">boolean</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token comment">// [varying number of any, boolean]</span>
</code></pre>
</td>
</tr>
<tr>
<td>Named tuples</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Vector2D</span> <span class="token operator">=</span> <span class="token punctuation">[</span>x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">createVector2d</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token operator">:</span> Vector2D<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token comment">// function createVector2d(x: number, y: number): void</span>
</code></pre>
</td>
</tr>
<tr><td colspan="2"><b>Functions</b></td>
</tr>
<tr>
<td>Function type</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">,</span> argN<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Type<span class="token punctuation">;</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> <span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">,</span> argN<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> Type<span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Constructor</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ConstructedType<span class="token punctuation">;</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ConstructedType<span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Function type with optional param</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">,</span> optional<span class="token operator">?</span><span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ReturnType</code></pre>
</td>
</tr>
<tr>
<td>Function type with rest param</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">,</span> <span class="token operator">...</span>allOtherArgs<span class="token operator">:</span> Type<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ReturnType</code></pre>
</td>
</tr>
<tr>
<td>Function type with static property</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Type<span class="token punctuation">;</span> staticProp<span class="token operator">:</span> Type<span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Default argument</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span>arg1 <span class="token operator">=</span> <span class="token string">'default'</span><span class="token punctuation">)</span><span class="token operator">:</span> ReturnType <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Arrow function</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token operator">...</span><span class="token punctuation">;</span> <span class="token keyword">return</span> value<span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType <span class="token operator">=&gt;</span> value<span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td><code>this</code> typing</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token operator">:</span> Foo<span class="token punctuation">,</span> arg1<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Overloads</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">conv</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">conv</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">conv</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Union and intersection types</b></td>
</tr>
<tr>
<td>Union</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> myUnionVariable<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td>Intersection</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> myIntersectionType<span class="token operator">:</span> Foo <span class="token operator">&amp;</span> Bar<span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Named types</b></td>
</tr>
<tr>
<td>Interface</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span><span class="token punctuation">,</span> SomeClass <span class="token punctuation">{</span>
    property<span class="token operator">:</span> Type<span class="token punctuation">;</span>
    optionalProp<span class="token operator">?</span><span class="token operator">:</span> Type<span class="token punctuation">;</span>
    optionalMethod<span class="token operator">?</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Class</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">class</span> <span class="token class-name">Child</span>
<span class="token keyword">extends</span> <span class="token class-name">Parent</span>

<span class="token keyword">implements</span> <span class="token class-name">Child</span><span class="token punctuation">,</span> OtherChild <span class="token punctuation">{</span>
    property<span class="token operator">:</span> Type<span class="token punctuation">;</span>
    defaultProperty <span class="token operator">=</span> <span class="token string">'default value'</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> _privateProperty<span class="token operator">:</span> Type<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> _privateReadonlyProperty<span class="token operator">:</span> Type<span class="token punctuation">;</span>
    <span class="token keyword">static</span> staticProperty<span class="token operator">:</span> Type<span class="token punctuation">;</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>arg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token function">_privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Type <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token function-variable function">methodProperty</span><span class="token operator">:</span> <span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> ReturnType<span class="token punctuation">;</span>
    <span class="token function">overloadedMethod</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType<span class="token punctuation">;</span>
    <span class="token function">overloadedMethod</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> OtherType<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType<span class="token punctuation">;</span>
    <span class="token function">overloadedMethod</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> CommonT<span class="token punctuation">)</span><span class="token operator">:</span> CommonReturnT <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> ReturnType <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token function">subclassedMethod</span><span class="token punctuation">(</span>arg1<span class="token operator">:</span> Type<span class="token punctuation">)</span><span class="token operator">:</span> ReturnType <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">subclassedMethod</span><span class="token punctuation">(</span>arg1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</td></tr>
<tr>
<td>Enum</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">enum</span> Options <span class="token punctuation">{</span>
    <span class="token constant">FIRST</span><span class="token punctuation">,</span>
    <span class="token constant">EXPLICIT</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token constant">BOOLEAN</span> <span class="token operator">=</span> Options<span class="token punctuation">.</span><span class="token constant">FIRST</span> <span class="token operator">|</span> Options<span class="token punctuation">.</span><span class="token constant">EXPLICIT</span><span class="token punctuation">,</span>
    <span class="token constant">COMPUTED</span> <span class="token operator">=</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">enum</span> Colors <span class="token punctuation">{</span>
    Red <span class="token operator">=</span> <span class="token string">"#FF0000"</span><span class="token punctuation">,</span>
    Green <span class="token operator">=</span> <span class="token string">"#00FF00"</span><span class="token punctuation">,</span>
    Blue <span class="token operator">=</span> <span class="token string">"#0000FF"</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Type alias</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">    <span class="token keyword">type</span> <span class="token class-name">Name</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">Direction</span> <span class="token operator">=</span> <span class="token string">'left'</span> <span class="token operator">|</span> <span class="token string">'right'</span><span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">ElementCreator</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">type</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Element<span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">Point</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">Point3D</span> <span class="token operator">=</span> Point <span class="token operator">&amp;</span> <span class="token punctuation">{</span> z<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">PointProp</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> Point<span class="token punctuation">;</span> <span class="token comment">// 'x' | 'y'</span>

    <span class="token keyword">const</span> point<span class="token operator">:</span> Point <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">type</span> <span class="token class-name">PtValProp</span> <span class="token operator">=</span> <span class="token keyword">keyof</span> <span class="token keyword">typeof</span> point<span class="token punctuation">;</span> <span class="token comment">// 'x' | 'y'</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Generics</b></td>
</tr>
<tr>
<td>Function using type parameters</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>items<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function-variable function">callback</span><span class="token operator">:</span> <span class="token punctuation">(</span>item<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre>
</td>
</tr>
<tr>
<td>Interface with multiple types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Pair<span class="token operator">&lt;</span><span class="token constant">T1</span><span class="token punctuation">,</span> <span class="token constant">T2</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
    first<span class="token operator">:</span> <span class="token constant">T1</span><span class="token punctuation">;</span>
    second<span class="token operator">:</span> <span class="token constant">T2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Constrained type parameter</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">ConstrainedType</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span></code></pre>
</td>
</tr>
<tr>
<td>Default type parameter</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> DefaultType<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span></code></pre>
</td>
</tr>
<tr>
<td>Constrained and default type parameter</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">ConstrainedType</span> <span class="token operator">=</span> DefaultType<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span></code></pre>
</td>
</tr>
<tr>
<td>Generic tuples</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Arr</span> <span class="token operator">=</span> <span class="token keyword">readonly</span> <span class="token builtin">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
 
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">concat</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">U</span> <span class="token keyword">extends</span> Arr<span class="token punctuation">,</span> <span class="token constant">V</span> <span class="token keyword">extends</span> Arr<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token constant">V</span><span class="token punctuation">)</span><span class="token operator">:</span> 
<span class="token punctuation">[</span><span class="token operator">...</span><span class="token constant">U</span><span class="token punctuation">,</span> <span class="token operator">...</span><span class="token constant">V</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token operator">...</span>a<span class="token punctuation">,</span> <span class="token operator">...</span>b<span class="token punctuation">]</span> <span class="token punctuation">}</span>
 
<span class="token keyword">const</span> strictResult <span class="token operator">=</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'3'</span><span class="token punctuation">,</span> <span class="token string">'4'</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> relaxedResult <span class="token operator">=</span> <span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'3'</span><span class="token punctuation">,</span> <span class="token string">'4'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token comment">// strictResult is of type [1, 2, '3', '4']</span>
<span class="token comment">// relaxedResult is of type (string | number)[]</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Index, mapped, and conditional types</b></td>
</tr>
<tr>
<td>Index type query (<code>keyof</code>)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Point</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> pointProp<span class="token operator">:</span> <span class="token keyword">keyof</span> Point <span class="token operator">=</span> <span class="token string">'x'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getProp</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">K</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
    val<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
    propName<span class="token operator">:</span> <span class="token constant">K</span>

<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Mapped types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Stringify<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Partial<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span><span class="token constant">P</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">P</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Conditional types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Swapper</span> <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">number</span></span> <span class="token operator">|</span> <span class="token builtin">string</span><span class="token operator">&gt;</span>
    <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">number</span></span> <span class="token operator">?</span> <span class="token builtin">string</span> <span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
</code></pre>
<p><em>is equivalent to</em></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span>
</code></pre>
<p><em>if T is number, or</em></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">number</span>
</code></pre>
<p><em>if T is string</em>
</p></td>
</tr>
<tr>
<td>Conditional mapped types</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    firstName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    lastName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    age<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">StringProps<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token constant">K</span> <span class="token keyword">in</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">[</span><span class="token constant">K</span><span class="token punctuation">]</span> <span class="token keyword">extends</span> <span class="token class-name"><span class="token builtin">string</span></span> <span class="token operator">?</span> <span class="token constant">K</span> <span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">PersonStrings</span> <span class="token operator">=</span> StringProps<span class="token operator">&lt;</span>Person<span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// PersonStrings is "firstName" | "lastName"</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Utility types</b></td>
</tr>
<tr>
<td>Partial</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">Partial<span class="token operator">&lt;</span><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> x<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> z<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Readonly</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token operator">&gt;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span>
    <span class="token keyword">readonly</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

    <span class="token keyword">readonly</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

    <span class="token keyword">readonly</span> z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Pick</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">Pick<span class="token operator">&lt;</span><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'x'</span> <span class="token operator">|</span> <span class="token string">'y'</span><span class="token operator">&gt;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Record</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript">Record<span class="token operator">&lt;</span><span class="token string">'x'</span> <span class="token operator">|</span> <span class="token string">'y'</span> <span class="token operator">|</span> <span class="token string">'z'</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">&gt;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> y<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> z<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></code></pre>
</td>
</tr>
<tr>
<td>Exclude</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Excluded</span> <span class="token operator">=</span> Exclude<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">number</span></code></pre>
</td>
</tr>
<tr>
<td>Extract</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Extracted</span> <span class="token operator">=</span> Extract<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">string</span></code></pre>
</td>
</tr>
<tr>
<td>NonNullable</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">NonNull</span> <span class="token operator">=</span> NonNullable<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">void</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span></code></pre>
</td>
</tr>
<tr>
<td>ReturnType</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">ReturnValue</span> <span class="token operator">=</span> ReturnType<span class="token operator">&lt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token builtin">string</span></code></pre>
</td>
</tr>
<tr>
<td>InstanceType</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">class</span> <span class="token class-name">Renderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></code></pre>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">type</span> <span class="token class-name">Instance</span> <span class="token operator">=</span> InstanceType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> Renderer<span class="token operator">&gt;</span><span class="token punctuation">;</span></code></pre>
<p><i>is equivalent to</i></p>
<pre class=" language-typescript" title=""><code class=" language-typescript">Renderer</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Type guards</b></td>
</tr>
<tr>
<td>Type predicates</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">function</span> <span class="token function">isThing</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> Thing <span class="token punctuation">{</span>
    <span class="token comment">// return true if val is a Thing</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isThing</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// value is of type Thing</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>typeof</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">declare</span> value<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">"number"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// value is of type Number</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// value is a string</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>instanceof</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">declare</span> value<span class="token operator">:</span> Date <span class="token operator">|</span> Error<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">Date</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// value is a Date</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// value is an Error</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td><code>in</code></td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">interface</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span> <span class="token function">woof</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Cat</span> <span class="token punctuation">{</span> <span class="token function">meow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">speak</span><span class="token punctuation">(</span>pet<span class="token operator">:</span> Dog <span class="token operator">|</span> Cat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">'woof'</span> <span class="token keyword">in</span> pet<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pet<span class="token punctuation">.</span><span class="token function">woof</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        pet<span class="token punctuation">.</span><span class="token function">meow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Assertions</b></td>
</tr>
<tr>
<td>Type</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> val <span class="token operator">=</span> someValue <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">;</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> val <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>someValue<span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td>Const (immutable value)</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> point <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">}</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">;</span></code></pre>
<p>or</p>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">let</span> point <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token keyword">const</span><span class="token operator">&gt;</span><span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> y<span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td colspan="2"><b>Ambient declarations</b></td>
</tr>
<tr>
<td>Global</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">declare</span> <span class="token keyword">const</span> $<span class="token operator">:</span> JQueryStatic<span class="token punctuation">;</span></code></pre>
</td>
</tr>
<tr>
<td>Module</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">"foo"</span> <span class="token punctuation">{</span>
    <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Bar</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
<tr>
<td>Wildcard module</td>
<td>
<pre class=" language-typescript" title=""><code class=" language-typescript"><span class="token keyword">declare</span> <span class="token keyword">module</span> <span class="token string">"text!*"</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">default</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</td>
</tr>
</tbody>
</table>
