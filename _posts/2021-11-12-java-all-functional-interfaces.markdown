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


                <p>
    The term <em>Java functional interface</em> was introduced in Java 8.
    A <em>functional interface</em> in Java is an interface that contains only a single abstract (unimplemented)
    method. A functional interface can contain default and static methods which do have an implementation, in
    addition to the single unimplemented method.
</p>

<p>
    Here is a Java functional interface example:
</p>

<pre class="codeBox">public interface MyFunctionalInterface {
    public void execute();
}
</pre>

<p>
    The above counts as a functional interface in Java because it only contains a single method, and that method
    has no implementation. Normally a Java interface does not contain implementations of the methods it declares,
    but it can contain implementations in default methods, or in static methods. Below is another example of
    a Java functional interface, with implementations of some of the methods:
</p>

<pre class="codeBox">public interface MyFunctionalInterface2{
    public void execute();

    public default void print(String text) {
        System.out.println(text);
    }

    public static void print(String text, PrintWriter writer) throws IOException {
        writer.write(text);
    }
}
</pre>

<p>
    The above interface still counts as a functional interface in Java, since it only contains a single
    non-implemented method.
</p>



<a name="functional-interfaces-can-be-implemented-by-a-lambda-expression"></a>
<h2>Functional Interfaces Can Be Implemented by a Lambda Expression</h2>

<p>
    A Java functional interface can be implemented by a <a href="http://tutorials.jenkov.com/java/lambda-expressions.html">Java Lambda Expression</a>.
    Here is an example that implements the functional interface <code>MyFunctionalInterface</code> defined in the beginning of this
    Java functional interface tutorial:
</p>

<pre class="codeBox">MyFunctionalInterface lambda = () -&gt; {
    System.out.println("Executing...");
}
</pre>

<p>
    A Java lambda expression implements a single method from a Java interface. In order to know what method the lambda
    expression implements, the interface can only contain a single unimplemented method. In other words, the interface
    must be a Java functional interface.
</p>

<p>
    I will not be explaining Java lambda expressions in more detail. Click the link in the beginning of this section
    to learn more about lambda expressions.
</p>



<a name="built-in-functional-interfaces-in-java"></a>
<h2>Built-in Functional Interfaces in Java</h2>

<p>
    Java contains a set of functional interfaces designed for commonly occuring use cases, so you don't have to
    create your own functional interfaces for every little use case. In the following sections I will be describing
    some of these built-in functional interfaces in Java.
</p>




<a name="function"></a>
<h2>Function</h2>

<p>
    The Java <code>Function</code> interface (<code>java.util.function.Function</code>) interface is one of the
    most central functional interfaces in Java. The <code>Function</code> interface represents a function (method)
    that takes a single parameter and returns a single value. Here is how the <code>Function</code> interface
    definition looks:
</p>

<pre class="codeBox">public interface Function&lt;T,R&gt; {

    public &lt;R&gt; apply(T parameter);
}
</pre>

<p>
    The <code>Function</code> interface actually contains a few extra methods in addition to the methods listed
    above, but since they all come with a default implementation,  you do not have to implement these extra methods.
    The extra methods will be explained in later sections.
</p>

<p>
    The only method you have to implement to implement the <code>Function</code> interface is the <code>apply()</code>
    method. Here is a <code>Function</code> implementation example:
</p>

<pre class="codeBox">public class AddThree implements Function&lt;Long, Long&gt; {

    @Override
    public Long apply(Long aLong) {
        return aLong + 3;
    }
}
</pre>

<p>
    This <code>Function</code> implementation implements the <code>apply()</code> method so it takes a <code>Long</code>
    as parameter, and returns a <code>Long</code>. Here is an example of using the above <code>AddThree</code> class:
</p>

<pre class="codeBox">Function&lt;Long, Long&gt; adder = new AddThree();
Long result = adder.apply((long) 4);
System.out.println("result = " + result);
</pre>

<p>
    First this example creates a new <code>AddThree</code> instance and assigns it to a <code>Function</code> variable.
    Second, the example calls the <code>apply()</code> method on the <code>AddThree</code> instance. Third, the
    example prints out the result (which is 7).
</p>

<p>
    You can also implement the <code>Function</code> interface using a Java lambda expression. Here is how that looks:
</p>

<pre class="codeBox">Function&lt;Long, Long&gt; adder = (value) -&gt; value + 3;
Long resultLambda = adder.apply((long) 8);
System.out.println("resultLambda = " + resultLambda);
</pre>

<p>
    As you can see, the <code>Function</code> interface implementation is now inlined in the declaration of the <code>adderLambda</code> variable,
    rather than in a separate class. This is a bit shorter, plus we can see directly in the above code what it is doing.
</p>




<a name="predicate"></a>
<h2>Predicate</h2>

<p>
    The Java <code>Predicate</code> interface, <code>java.util.function.Predicate</code>, represents a simple function
    that takes a single value as parameter, and returns true or false. Here is how the <code>Predicate</code>
    functional interface definition looks:
</p>

<pre class="codeBox">public interface Predicate&lt;T&gt; {
    boolean test(T t);
}
</pre>
<p>
    The <code>Predicate</code> interface contains more methods than the <code>test()</code> method, but the rest
    of the methods are default or static methods which you don't have to implement.
</p>

<p>
    You can implement the <code>Predicate</code> interface using a class, like this:
</p>

<pre class="codeBox">public class CheckForNull implements Predicate {
    @Override
    public boolean test(Object o) {
        return o != null;
    }
}
</pre>

<p>
    You can also implement the Java <code>Predicate</code> interface using a Lambda expression. Here is an example
    of implementing the <code>Predicate</code> interface using a Java lambda expression:
</p>

<pre class="codeBox">Predicate predicate = (value) -&gt; value != null;
</pre>

<p>
    This lambda implementation of the <code>Predicate</code> interface effectively does the same as the implementation
    above that uses a class.
</p>




<a name="unaryoperator"></a>
<h2>UnaryOperator</h2>
<p>
    The Java <code>UnaryOperator</code> interface is a functional interface that represents an operation 
    which takes a single parameter and returns a parameter of the same type. 
    Here is an example of a Java <code>UnaryOperator</code> implementation:
</p>

<pre class="codeBox">UnaryOperator&lt;Person&gt; unaryOperator = 
        (person) -&gt; { person.name = "New Name"; return person; };
</pre>

<p>
    The <code>UnaryOperator</code> interface can be used to represent an operation that takes a specific object
    as parameter, modifies that object, and returns it again - possibly as part of a functional stream processing
    chain.
</p>




<a name="binaryoperator"></a>
<h2>BinaryOperator</h2>

<p>
    The Java <code>BinaryOperator</code> interface is a functional interface that represents an operation
    which takes two parameters and returns a single value. Both parameters and the return type must be of the
    same type.
</p>

<p>
    The Java <code>BinaryOperator</code> interface is useful when implementing functions that sum, subtract,
    divide, multiply etc. two elements of the same type, and returns a third element of the same type.
</p>

<p>
    Here is an example implementation of the <code>BinaryOperator</code> interface:
</p>

<pre class="codeBox">BinaryOperator&lt;MyValue&gt; binaryOperator =
        (value1, value2) -&gt; { value1.add(value2); return value1; };
</pre>




<a name="supplier"></a>
<h2>Supplier</h2>
<p>
    The Java <code>Supplier</code> interface is a functional interface that represents an function that supplies
    a value of some sorts. The <code>Supplier</code> interface can also be thought of as a factory interface.
    Here is an example implementation of the Java <code>Supplier</code> interface:
</p>

<pre class="codeBox">Supplier&lt;Integer&gt; supplier = () -&gt; new Integer((int) (Math.random() * 1000D));
</pre>

<p>
    This Java <code>Supplier</code> implementation returns a new <code>Integer</code> instance with a random
    value between 0 and 1000.
</p>




<a name="consumer"></a>
<h2>Consumer</h2>

<p>
    The Java <code>Consumer</code> interface is a functional interface that represents an function that
    consumes a value without returning any value. A Java <code>Consumer</code> implementation could be
    printing out a value, or writing it to a file, or over the network etc. Here is an example
    implementation of the Java <code>Consumer</code> interface:
</p>

<pre class="codeBox">Consumer&lt;Integer&gt; consumer = (value) -&gt; System.out.println(value);
</pre>

<p>
    This Java <code>Consumer</code> implementation prints the value passed as parameter to it out to
    <code>System.out</code>.
</p>

            
