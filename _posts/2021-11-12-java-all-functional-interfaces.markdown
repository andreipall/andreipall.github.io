---
layout: post
title:  "Java - All Functional Interfaces"
date:   2021-12-11 10:53:56
categories: java
description: Java - All Functional Interfaces
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Here follows a complete list of the general purpose functional interfaces available in the standard Java API.
---
<p>Here follows a complete list of the general purpose functional interfaces available in the standard Java API.</p>
<table class="white">
<thead>
  <tr>
	<th>Interface</th>
	<th style="text-align: right">Type</th>
	<th></th>
  </tr>
</thead>
<tbody>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html"><code>Runnable</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/BiConsumer.html"><code>BiConsumer&lt;T, U&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/BiFunction.html"><code>BiFunction&lt;T, U, R&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→&nbsp;<code>R</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/BinaryOperator.html"><code>BinaryOperator&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>T</code></td>
	<td>→&nbsp;<code>T</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/BiPredicate.html"><code>BiPredicate&lt;T, U&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/BooleanSupplier.html"><code>BooleanSupplier</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Callable.html"><code>Callable&lt;V&gt;</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code>V</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html"><code>Consumer&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleBinaryOperator.html"><code>DoubleBinaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code>, <code class="keyword">double</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleConsumer.html"><code>DoubleConsumer</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleFunction.html"><code>DoubleFunction&lt;R&gt;</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→&nbsp;<code>R</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoublePredicate.html"><code>DoublePredicate</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleSupplier.html"><code>DoubleSupplier</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleToIntFunction.html"><code>DoubleToIntFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleToLongFunction.html"><code>DoubleToLongFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleUnaryOperator.html"><code>DoubleUnaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">double</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html"><code>Function&lt;T, R&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code>R</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntBinaryOperator.html"><code>IntBinaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code>, <code class="keyword">int</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntConsumer.html"><code>IntConsumer</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntFunction.html"><code>IntFunction&lt;R&gt;</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→&nbsp;<code>R</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntPredicate.html"><code>IntPredicate</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntSupplier.html"><code>IntSupplier</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntToDoubleFunction.html"><code>IntToDoubleFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntToLongFunction.html"><code>IntToLongFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/IntUnaryOperator.html"><code>IntUnaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">int</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongBinaryOperator.html"><code>LongBinaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code>, <code class="keyword">long</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongConsumer.html"><code>LongConsumer</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongFunction.html"><code>LongFunction&lt;R&gt;</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→&nbsp;<code>R</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongPredicate.html"><code>LongPredicate</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongSupplier.html"><code>LongSupplier</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongToDoubleFunction.html"><code>LongToDoubleFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongToIntFunction.html"><code>LongToIntFunction</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/LongUnaryOperator.html"><code>LongUnaryOperator</code></a>
	</td>
	<td style="text-align: right"><code class="keyword">long</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjDoubleConsumer.html"><code>ObjDoubleConsumer&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code class="keyword">double</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjIntConsumer.html"><code>ObjIntConsumer&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code class="keyword">int</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ObjLongConsumer.html"><code>ObjLongConsumer&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code class="keyword">long</code></td>
	<td>→</td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html"><code>Predicate&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code class="keyword">boolean</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/Supplier.html"><code>Supplier&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"></td>
	<td>→&nbsp;<code>T</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToDoubleBiFunction.html"><code>ToDoubleBiFunction&lt;T,&nbsp;U&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToDoubleFunction.html"><code>ToDoubleFunction&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code class="keyword">double</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToIntBiFunction.html"><code>ToIntBiFunction&lt;T, U&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToIntFunction.html"><code>ToIntFunction&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code class="keyword">int</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToLongBiFunction.html"><code>ToLongBiFunction&lt;T, U&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code>, <code>U</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/ToLongFunction.html"><code>ToLongFunction&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code class="keyword">long</code></td>
  </tr>
  <tr>
	<td>
	  <a href="https://docs.oracle.com/javase/8/docs/api/java/util/function/UnaryOperator.html"><code>UnaryOperator&lt;T&gt;</code></a>
	</td>
	<td style="text-align: right"><code>T</code></td>
	<td>→&nbsp;<code>T</code></td>
  </tr>
</tbody>
</table>
