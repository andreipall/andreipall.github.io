---
layout: post
title:  "JavaScript ES6"
date:   2018-02-14 12:46:56
categories: JavaScript
description: ECMAScript 6 — New Features
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: ECMAScript (ES) is a scripting language specification standardized by ECMAScript International. It is used by applications to enable client-side scripting. Languages like JavaScript, Jscript and ActionScript are governed by this specification. This tutorial introduces you to ES6 implementation in JavaScript.
---

ECMAScript (ES) is a scripting language specification standardized by ECMAScript International. It is used by applications to enable client-side scripting. Languages like JavaScript, Jscript and ActionScript are governed by this specification. This tutorial introduces you to ES6 implementation in JavaScript.

<h3>Constants</h3>
Support for constants (also known as "immutable variables"), i.e., variables which cannot be re-assigned new content. Notice: this only makes the variable itself immutable, not its assigned content (for instance, in case the content is an object, this means the object itself can still be altered).
{% highlight javascript %}
const PI = 3.141593; 
PI > 3.0;
{% endhighlight %}
<h3>Scoping</h3>
Block-scoped variables (and constants) without hoisting.
{% highlight javascript %}
for (let i = 0; i < a.length; i++) { 
    let x = a[i]; 
    … 
} 
for (let i = 0; i < b.length; i++) { 
    let y = b[i]; 
    … 
} 
let callbacks = []; 
for (let i = 0; i <= 2; i++) { 
    callbacks[i] = function () { 
        return i * 2; 
    }; 
} 
callbacks[0]() === 0; 
callbacks[1]() === 2; 
callbacks[2]() === 4;
{% endhighlight %}
Block-scoped function definitions.
{% highlight javascript %}
{   
    function foo () { return 1; } 
    foo() === 1; 
    { 
        function foo () { return 2; } 
        foo() === 2; 
    } 
    foo() === 1; 
}
{% endhighlight %}
<h3>Arrow Functions</h3>
Expression Bodies
More expressive closure syntax.
{% highlight javascript %}
odds  = evens.map(v => v + 1); 
pairs = evens.map(v => ({ even: v, odd: v + 1 })); 
nums  = evens.map((v, i) => v + i);
{% endhighlight %}
Statement Bodies
More expressive closure syntax.
{% highlight javascript %}
nums.forEach(v => { 
    if (v % 5 === 0) 
        fives.push(v); 
})
{% endhighlight %}
Lexical this
More intuitive handling of current object context.
{% highlight javascript %}
this.nums.forEach((v) => { 
    if (v % 5 === 0) 
        this.fives.push(v); 
});
{% endhighlight %}
<h3>Extended Parameter Handling</h3>
Default Parameter Values
Simple and intuitive default values for function parameters.
{% highlight javascript %}
function f (x, y = 7, z = 42) { 
    return x + y + z; 
} 
f(1) === 50;
{% endhighlight %}
Rest Parameter
Aggregation of remaining arguments into single parameter of variadic functions.
{% highlight javascript %}
function f (x, y, ...a) { 
    return (x + y) * a.length; 
} 
f(1, 2, "hello", true, 7) === 9;
{% endhighlight %}
Spread Operator
Spreading of elements of an iterable collection (like an array or even a string) into both literal elements and individual function parameters.
{% highlight javascript %}
var params = [ "hello", true, 7 ]; 
var other = [ 1, 2, ...params ]; // [ 1, 2, "hello", true, 7 ] 

function f (x, y, ...a) { 
    return (x + y) * a.length; 
} 
f(1, 2, ...params) === 9; 

var str = "foo"; 
var chars = [ ...str ]; // [ "f", "o", "o" ]
{% endhighlight %}
<h3>Template Literals</h3>
String Interpolation
Intuitive expression interpolation for single-line and multi-line strings. (Notice: don't be confused, Template Literals were originally named "Template Strings" in the drafts of the ECMAScript 6 language specification)
{% highlight javascript %}
var customer = { name: "Foo" }; 
var card = { amount: 7, product: "Bar", unitprice: 42 }; 
var message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`;
{% endhighlight %}
Custom Interpolation
Flexible expression interpolation for arbitrary methods.
{% highlight javascript %}
get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`;
{% endhighlight %}
Raw String Access
Access the raw template string content (backslashes are not interpreted).
{% highlight javascript %}
function quux (strings, ...values) { 
    strings[0] === "foo\n"; 
    strings[1] === "bar"; 
    strings.raw[0] === "foo\\n"; 
    strings.raw[1] === "bar"; 
    values[0] === 42; 
} 
quux `foo\n${ 42 }bar` 

String.raw `foo\n${ 42 }bar` === "foo\\n42bar";
{% endhighlight %}
<h3>Extended Literals</h3>
Binary & Octal Literal
Direct support for safe binary and octal literals.
{% highlight javascript %}
0b111110111 === 503; 
0o767 === 503;
{% endhighlight %}
Unicode String & RegExp Literal
Extended support using Unicode within strings and regular expressions.
{% highlight javascript %}
"𠮷".length === 2;
"𠮷".match(/./u)[0].length === 2;
"𠮷" === "\uD842\uDFB7";
"𠮷" === "\u{20BB7}";
"𠮷".codePointAt(0) == 0x20BB7;
for (let codepoint of "𠮷") console.log(codepoint);
{% endhighlight %}
<h3>Enhanced Regular Expression</h3>
Regular Expression Sticky Matching
Keep the matching position sticky between matches and this way support efficient parsing of arbitrary long input strings, even with an arbitrary number of distinct regular expressions.
{% highlight javascript %}
let parser = (input, match) => { 
    for (let pos = 0, lastPos = input.length; pos < lastPos; ) { 
        for (let i = 0; i < match.length; i++) { 
            match[i].pattern.lastIndex = pos; 
            let found; 
            if ((found = match[i].pattern.exec(input)) !== null) { 
                match[i].action(found); 
                pos = match[i].pattern.lastIndex; break; 
            } 
        } 
    } 
} 

let report = (match) => { 
    console.log(JSON.stringify(match)); 
}; 
parser("Foo 1 Bar 7 Baz 42", [ 
    { pattern: /^Foo\s+(\d+)/y, action: (match) => report(match) }, 
    { pattern: /^Bar\s+(\d+)/y, action: (match) => report(match) }, 
    { pattern: /^Baz\s+(\d+)/y, action: (match) => report(match) }, 
    { pattern: /^\s*/y, action: (match) => {} } 
]);
{% endhighlight %}
<h3>Enhanced Object Properties</h3>
Property Shorthand
Shorter syntax for common object property definition idiom.
{% highlight javascript %}
obj = { x, y };
{% endhighlight %}
Computed Property Names
Support for computed names in object property definitions.
{% highlight javascript %}
let obj = { 
    foo: "bar", 
    [ "baz" + quux() ]: 42 
};
{% endhighlight %}
Method Properties
Support for method notation in object property definitions, for both regular functions and generator functions.
{% highlight javascript %}
obj = { 
    foo (a, b) { … }, 
    bar (x, y) { … }, 
    *quux (x, y) { … } 
};
{% endhighlight %}
<h3>Destructuring Assignment</h3>
Array Matching
Intuitive and flexible destructuring of Arrays into individual variables during assignment.
{% highlight javascript %}
var list = [ 1, 2, 3 ]; 
var [ a, , b ] = list; 
[ b, a ] = [ a, b ];
{% endhighlight %}
Object Matching, Shorthand Notation
Intuitive and flexible destructuring of Objects into individual variables during assignment.
{% highlight javascript %}
var { op, lhs, rhs } = getASTNode();
{% endhighlight %}
Object Matching, Deep Matching
Intuitive and flexible destructuring of Objects into individual variables during assignment.
{% highlight javascript %}
var { op: a, lhs: { op: b }, rhs: c } = getASTNode();
{% endhighlight %}
Object And Array Matching, Default Values
Simple and intuitive default values for destructuring of Objects and Arrays.
{% highlight javascript %}
var obj = { a: 1 }; 
var list = [ 1 ]; 
var { a, b = 2 } = obj; 
var [ x, y = 2 ] = list;
{% endhighlight %}
Parameter Context Matching
Intuitive and flexible destructuring of Arrays and Objects into individual parameters during function calls.
{% highlight javascript %}
function f ([ name, val ]) { 
    console.log(name, val); 
} 
function g ({ name: n, val: v }) { 
    console.log(n, v); 
} 
function h ({ name, val }) { 
    console.log(name, val); 
} 
f([ "bar", 42 ]); 
g({ name: "foo", val: 7 }); 
h({ name: "bar", val: 42 });
{% endhighlight %}
Fail-Soft Destructuring
Fail-soft destructuring, optionally with defaults.
{% highlight javascript %}
var list = [ 7, 42 ]; 
var [ a = 1, b = 2, c = 3, d ] = list; 
a === 7; 
b === 42; 
c === 3; 
d === undefined;
{% endhighlight %}
<h3>Modules</h3>
Value Export/Import
Support for exporting/importing values from/to modules without global namespace pollution.
{% highlight javascript %}
//  lib/math.js 
export function sum (x, y) { return x + y }; 
export var pi = 3.141593;
//  someApp.js 
import * as math from "lib/math"; 
console.log("2π = " + math.sum(math.pi, math.pi));
//  otherApp.js 
import { sum, pi } from "lib/math"; 
console.log("2π = " + sum(pi, pi));
{% endhighlight %}
Default & Wildcard
Marking a value as the default exported value and mass-mixin of values.
{% highlight javascript %}
//  lib/mathplusplus.js 
export * from "lib/math"; 
export var e = 2.71828182846; 
export default (x) => Math.exp(x);
//  someApp.js 
import exp, { pi, e } from "lib/mathplusplus"; 
console.log("e^{π} = " + exp(pi));
{% endhighlight %}
<h3>Classes</h3>
Class Definition
More intuitive, OOP-style and boilerplate-free classes.
{% highlight javascript %}
class Shape { 
    constructor (id, x, y) { 
        this.id = id; 
        this.move(x, y); 
    } 
    move (x, y) { 
        this.x = x; 
        this.y = y; 
    } 
}
{% endhighlight %}
Class Inheritance
More intuitive, OOP-style and boilerplate-free inheritance.
{% highlight javascript %}
class Rectangle extends Shape { 
    constructor (id, x, y, width, height) { 
        super(id, x, y); 
        this.width  = width; 
        this.height = height; 
    } 
} 
class Circle extends Shape { 
    constructor (id, x, y, radius) { 
        super(id, x, y); 
        this.radius = radius; 
    } 
}
{% endhighlight %}
Class Inheritance, From Expressions
Support for mixin-style inheritance by extending from expressions yielding function objects. [Notice: the generic aggregation function is usually provided by a library like this one, of course]
{% highlight javascript %}
var aggregation = (baseClass, ...mixins) => { 
    let base = class _Combined extends baseClass { 
        constructor (...args) { 
            super(...args); 
            mixins.forEach((mixin) => { 
                mixin.prototype.initializer.call(this); 
            }); 
        } 
    }; 
    let copyProps = (target, source) => { 
        Object.getOwnPropertyNames(source) 
            .concat(Object.getOwnPropertySymbols(source)) 
            .forEach((prop) => { 
            if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) 
                return 
            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop)) 
        }) 
    } 
    mixins.forEach((mixin) => { 
        copyProps(base.prototype, mixin.prototype); 
        copyProps(base, mixin); }); 
        return base; 
}; 

class Colored { 
    initializer () { this._color = "white"; } 
    get color () { return this._color; } 
    set color (v) { this._color = v; } 
} 
class ZCoord { 
    initializer () { this._z = 0; } 
    get z () { return this._z; } 
    set z (v) { this._z = v; } 
} 
class Shape { 
    constructor (x, y) { this._x = x; this._y = y; } 
    get x () { return this._x; } 
    set x (v) { this._x = v; } 
    get y () { return this._y; } 
    set y (v) { this._y = v; } 
} 
class Rectangle extends aggregation(Shape, Colored, ZCoord) {} 

var rect = new Rectangle(7, 42); 
rect.z  = 1000; 
rect.color = "red"; 
console.log(rect.x, rect.y, rect.z, rect.color);
{% endhighlight %}
Base Class Access
Intuitive access to base class constructor and methods.
{% highlight javascript %}
class Shape {
    … 
    toString () { 
        return `Shape(${this.id})` 
    } 
} 
class Rectangle extends Shape { 
    constructor (id, x, y, width, height) { 
        super(id, x, y); 
        … 
    } 
    toString () { 
        return "Rectangle > " + super.toString(); 
    } 
} 
class Circle extends Shape { 
    constructor (id, x, y, radius) { 
        super(id, x, y); 
        … 
    } 
    toString () { 
        return "Circle > " + super.toString(); 
    } 
}
{% endhighlight %}
Static Members
Simple support for static class members.
{% highlight javascript %}
class Rectangle extends Shape { 
    … 
    static defaultRectangle () { 
        return new Rectangle("default", 0, 0, 100, 100); 
    } 
} 
class Circle extends Shape { 
    … 
    static defaultCircle () { 
        return new Circle("default", 0, 0, 100); 
    } 
} 
var defRectangle = Rectangle.defaultRectangle(); 
var defCircle  = Circle.defaultCircle();
{% endhighlight %}
Getter/Setter
Getter/Setter also directly within classes (and not just within object initializers, as it is possible since ECMAScript 5.1).
{% highlight javascript %}
class Rectangle { 
    constructor (width, height) { 
        this._width  = width; 
        this._height = height; 
    } 
    set width (width) { this._width = width; } 
    get width () { return this._width; } 
    set height (height) { this._height = height; } 
    get height () { return this._height; } 
    get area () { return this._width * this._height; } 
}; 
var r = new Rectangle(50, 20); 
r.area === 1000;
{% endhighlight %}
<h3>Symbol Type</h3>
Symbol Type
Unique and immutable data type to be used as an identifier for object properties. Symbol can have an optional description, but for debugging purposes only.
{% highlight javascript %}
Symbol("foo") !== Symbol("foo"); 
const foo = Symbol(); 
const bar = Symbol(); 
typeof foo === "symbol"; 
typeof bar === "symbol"; 
let obj = {}; 
obj[foo] = "foo"; 
obj[bar] = "bar"; 
JSON.stringify(obj); // {} 
Object.keys(obj); // [] 
Object.getOwnPropertyNames(obj); // [] 
Object.getOwnPropertySymbols(obj); // [ foo, bar ]
{% endhighlight %}
Global Symbols
Global symbols, indexed through unique keys.
{% highlight javascript %}
Symbol.for("app.foo") === Symbol.for("app.foo") 
const foo = Symbol.for("app.foo"); 
const bar = Symbol.for("app.bar"); 
Symbol.keyFor(foo) === "app.foo"; 
Symbol.keyFor(bar) === "app.bar"; 
typeof foo === "symbol"; 
typeof bar === "symbol"; 
let obj = {}; 
obj[foo] = "foo"; 
obj[bar] = "bar"; 
JSON.stringify(obj); // {} 
Object.keys(obj); // [] 
Object.getOwnPropertyNames(obj); // [] 
Object.getOwnPropertySymbols(obj); // [ foo, bar ]
{% endhighlight %}
<h3>Iterators</h3>
Iterator & For-Of Operator
Support "iterable" protocol to allow objects to customize their iteration behaviour. Additionally, support "iterator" protocol to produce sequence of values (either finite or infinite). Finally, provide convenient of operator to iterate over all values of an iterable object.
{% highlight javascript %}
let fibonacci = { 
    [Symbol.iterator]() { 
        let pre = 0, cur = 1; 
        return { 
            next () { 
                [ pre, cur ] = [ cur, pre + cur ]; 
                return { done: false, value: cur }; 
            } 
        }; 
    } 
} 

for (let n of fibonacci) { 
    if (n > 1000) 
        break; 
    console.log(n); 
}
{% endhighlight %}
<h3>Generators</h3>
Generator Function, Iterator Protocol
Support for generators, a special case of Iterators containing a generator function, where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite).
{% highlight javascript %}
let fibonacci = {
    *[Symbol.iterator]() { 
        let pre = 0, cur = 1; 
        for (;;) { 
            [ pre, cur ] = [ cur, pre + cur ]; 
            yield cur; 
        } 
    } 
} 
for (let n of fibonacci) { \
    if (n > 1000) 
        break; 
    console.log(n); 
}
{% endhighlight %}
Generator Function, Direct Use
Support for generator functions, a special variant of functions where the control flow can be paused and resumed, in order to produce sequence of values (either finite or infinite).
{% highlight javascript %}
function* range (start, end, step) { 
    while (start < end) { 
        yield start; 
        start += step; 
    } 
} 

for (let i of range(0, 10, 2)) { 
    console.log(i); // 0, 2, 4, 6, 8 
}
{% endhighlight %}
Generator Matching
Support for generator functions, i.e., functions where the control flow can be paused and resumed, in order to produce and spread sequence of values (either finite or infinite).
{% highlight javascript %}
let fibonacci = function* (numbers) { 
    let pre = 0, cur = 1; 
    while (numbers-- > 0) { 
        [ pre, cur ] = [ cur, pre + cur ]; 
        yield cur; 
    } 
}; 

for (let n of fibonacci(1000)) 
    console.log(n); 

let numbers = [ ...fibonacci(1000) ]; 

let [ n1, n2, n3, ...others ] = fibonacci(1000);
{% endhighlight %}
Generator Control-Flow
Support for generators, a special case of Iterators where the control flow can be paused and resumed, in order to support asynchronous programming in the style of "co-routines" in combination with Promises (see below). [Notice: the generic async function usually is provided by a reusable library and given here just for better understanding. See co or Bluebird's coroutine in practice.]
{% highlight javascript %}
//  generic asynchronous control-flow driver 
function async (proc, ...params) { 
    var iterator = proc(...params); 
    return new Promise((resolve, reject) => { 
        let loop = (value) => { 
            let result; 
            try { 
                result = iterator.next(value); 
            } 
            catch (err) { 
                reject(err); 
            } 
            if (result.done) 
                resolve(result.value); 
            else if ( typeof result.value === "object" && typeof result.value.then === "function") 
                result.value.then((value) => { 
                    loop(value); 
                }, (err) => { 
                    reject(err); 
                }); 
            else 
                loop(result.value); 
        } 
        loop(); 
    }); 
}
//  application-specific asynchronous builder 
function makeAsync (text, after) { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => resolve(text), after); 
    }); 
}
//  application-specific asynchronous procedure 
async(function* (greeting) { 
    let foo = yield makeAsync("foo", 300) 
    let bar = yield makeAsync("bar", 200) 
    let baz = yield makeAsync("baz", 100) 
    return `${greeting} ${foo} ${bar} ${baz}` 
}, "Hello").then((msg) => { 
    console.log("RESULT:", msg); // "Hello foo bar baz" 
})
{% endhighlight %}
Generator Methods
Support for generator methods, i.e., methods in classes and on objects, based on generator function
{% highlight javascript %}
class Clz { 
    * bar () { 
        … 
    } 
}; 
let Obj = { 
    * foo () { 
        … 
    } 
};
{% endhighlight %}
<h3>Map/Set & WeakMap/WeakSet</h3>
Set Data-Structure
Cleaner data-structure for common algorithms based on set
{% highlight javascript %}
let s = new Set(); 
s.add("hello").add("goodbye").add("hello"); 
s.size === 2; 
s.has("hello") === true; 
for (let key of s.values()) // insertion order 
    console.log(key);
{% endhighlight %}
Map Data-Structure
Cleaner data-structure for common algorithms based on maps.
{% highlight javascript %}
let m = new Map(); 
let s = Symbol(); 
m.set("hello", 42); 
m.set(s, 34); 
m.get(s) === 34; 
m.size === 2; 
for (let [ key, val ] of m.entries()) 
    console.log(key + " = " + val);
{% endhighlight %}
Weak-Link Data-Structures
Memory-leak-free Object-key’d side-by-side data-structures.
{% highlight javascript %}
let isMarked  = new WeakSet(); 
let attachedData = new WeakMap(); 

export class Node { 
    constructor (id) { this.id = id; } 
    mark () { isMarked.add(this); } 
    unmark () { isMarked.delete(this); } 
    marked () { return isMarked.has(this); } 
    set data (data) { attachedData.set(this, data); } 
    get data () { return attachedData.get(this); } 
} 

let foo = new Node("foo"); 

JSON.stringify(foo) === '{"id":"foo"}'; 
foo.mark(); 
foo.data = "bar"; 
foo.data === "bar"; 
JSON.stringify(foo) === '{"id":"foo"}'; 
isMarked.has(foo) === true 
attachedData.has(foo) === true 
foo = null /* remove only reference to foo */ 
attachedData.has(foo) === false 
isMarked.has(foo) === false
{% endhighlight %}
<h3>Typed Arrays</h3>
Support for arbitrary byte-based data structures to implement network protocols, cryptography algorithms, file format manipulations, etc.
{% highlight javascript %}
//  ES6 class equivalent to the following C structure:
//  struct Example { unsigned long id; char username[16]; float amountDue; }; class Example { 
    constructor (buffer = new ArrayBuffer(24)) { 
        this.buffer = buffer; 
    } 
    set buffer (buffer) { 
        this._buffer  = buffer; 
        this._id  = new Uint32Array (this._buffer,  0,  1); 
        this._username  = new Uint8Array  (this._buffer,  4, 16);
        this._amountDue = new Float32Array(this._buffer, 20,  1); 
    } 
    get buffer () { return this._buffer; } 
    set id (v) { this._id[0] = v; } 
    get id () { return this._id[0]; } 
    set username (v) { this._username[0] = v; } 
    get username () { return this._username[0]; } 
    set amountDue (v) { this._amountDue[0] = v; } 
    get amountDue () { return this._amountDue[0]; } 
} 

let example = new Example() 
example.id = 7 
example.username = "John Doe" 
example.amountDue = 42.0
{% endhighlight %}
<h3>New Built-In Methods</h3>
Object Property Assignment
New function for assigning enumerable properties of one or more source objects onto a destination object.
{% highlight javascript %}
var dest = { quux: 0 }; 
var src1 = { foo: 1, bar: 2 }; 
var src2 = { foo: 3, baz: 4 }; 
Object.assign(dest, src1, src2); 
dest.quux === 0; 
dest.foo === 3; 
dest.bar === 2; 
dest.baz === 4;
{% endhighlight %}
Array Element Finding
New function for finding an element in an array.
{% highlight javascript %}
[ 1, 3, 4, 2 ].find(x => x > 3); // 4 
[ 1, 3, 4, 2 ].findIndex(x => x > 3); // 2
{% endhighlight %}
String Repeating
New string repeating functionality.
{% highlight javascript %}
" ".repeat(4 * depth); 
"foo".repeat(3);
{% endhighlight %}
String Searching
New specific string functions to search for a sub-string.
{% highlight javascript %}
"hello".startsWith("ello", 1); // true 
"hello".endsWith("hell", 4);  // true 
"hello".includes("ell");  // true 
"hello".includes("ell", 1);  // true 
"hello".includes("ell", 2);  // false
{% endhighlight %}
Number Type Checking
New functions for checking for non-numbers and finite numbers.
{% highlight javascript %}
Number.isNaN(42) === false; 
Number.isNaN(NaN) === true;
 
Number.isFinite(Infinity) === false; 
Number.isFinite(-Infinity) === false; 
Number.isFinite(NaN) === false; 
Number.isFinite(123) === true;
{% endhighlight %}
Number Safety Checking
Checking whether an integer number is in the safe range, i.e., it is correctly represented by JavaScript (where all numbers, including integer numbers, are technically floating point number).
{% highlight javascript %}
Number.isSafeInteger(42) === true; 
Number.isSafeInteger(9007199254740992) === false;
{% endhighlight %}
Number Comparison
Availability of a standard Epsilon value for more precise comparison of floating point numbers.
{% highlight javascript %}
console.log(0.1 + 0.2 === 0.3); // false 
console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON); // true
{% endhighlight %}
Number Truncation
Truncate a floating point number to its integral part, completely dropping the fractional part.
{% highlight javascript %}
console.log(Math.trunc(42.7)) // 42 
console.log(Math.trunc( 0.1)) // 0 
console.log(Math.trunc(-0.1)) // -0
{% endhighlight %}
Number Sign Determination
Determine the sign of a number, including special cases of signed zero and non-number.
{% highlight javascript %}
console.log(Math.sign(7))  // 1 
console.log(Math.sign(0))  // 0 
console.log(Math.sign(-0))  // -0 
console.log(Math.sign(-7))  // -1 
console.log(Math.sign(NaN)) // NaN 
{% endhighlight %}
<h3>Promises</h3>
Promise Usage
First class representation of a value that may be made asynchronously and be available in the future.
{% highlight javascript %}
function msgAfterTimeout (msg, who, timeout) { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout); 
    }); 
} 
msgAfterTimeout("", "Foo", 100).then((msg) => 
    msgAfterTimeout(msg, "Bar", 200) 
).then((msg) => { 
    console.log(`done after 300ms:${msg}`); 
});
{% endhighlight %}
Promise Combination
Combine one or more promises into new promises without having to take care of ordering of the underlying asynchronous operations yourself.
{% highlight javascript %}
function fetchAsync (url, timeout, onData, onError) { 
    … 
} 
let fetchPromised = (url, timeout) => { 
    return new Promise((resolve, reject) => { 
        fetchAsync(url, timeout, resolve, reject); 
    }); 
} 
Promise.all([ 
    fetchPromised("http://backend/foo.txt", 500), 
    fetchPromised("http://backend/bar.txt", 500), 
    fetchPromised("http://backend/baz.txt", 500) 
]).then((data) => { 
    let [ foo, bar, baz ] = data; 
    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`); 
}, (err) => { 
    console.log(`error: ${err}`); 
});
{% endhighlight %}
<h3>Meta-Programming</h3>
Proxying
Hooking into runtime-level object meta-operations.
{% highlight javascript %}
let target = { 
    foo: "Welcome, foo" 
}; 
let proxy = new Proxy(target, { 
    get (receiver, name) { 
        return name in receiver ? receiver[name] : `Hello, ${name}`; 
    } 
}); 
proxy.foo === "Welcome, foo"; 
proxy.world === "Hello, world";
{% endhighlight %}
Reflection
Make calls corresponding to the object meta-operations.
{% highlight javascript %}
let obj = { a: 1 };
Object.defineProperty(obj, "b", { value: 2 });
obj[Symbol("c")] = 3;
Reflect.ownKeys(obj); // [ "a", "b", Symbol(c) ]
{% endhighlight %}
<h3>Internationalization & Localization</h3>
Collation
{% highlight javascript %}
// in German,  "ä" sorts with "a"
// in Swedish, "ä" sorts after "z"
var list = [ "ä", "a", "z" ];
var l10nDE = new Intl.Collator("de");
var l10nSV = new Intl.Collator("sv");
l10nDE.compare("ä", "z") === -1;
l10nSV.compare("ä", "z") === +1;
console.log(list.sort(l10nDE.compare)); // [ "a", "ä", "z" ]
console.log(list.sort(l10nSV.compare)); // [ "a", "z", "ä" ]
{% endhighlight %}
Number Formatting
Format numbers with digit grouping and localized separators.
{% highlight javascript %}
var l10nEN = new Intl.NumberFormat("en-US"); 
var l10nDE = new Intl.NumberFormat("de-DE"); 
l10nEN.format(1234567.89) === "1,234,567.89"; 
l10nDE.format(1234567.89) === "1.234.567,89";
{% endhighlight %}
Currency Formatting
Format numbers with digit grouping, localized separators and attached currency symbol.
{% highlight javascript %}
var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }); 
var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }); 
var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }); 
l10nUSD.format(100200300.40) === "$100,200,300.40"; 
l10nGBP.format(100200300.40) === "£100,200,300.40"; 
l10nEUR.format(100200300.40) === "100.200.300,40 €";
{% endhighlight %}
Date/Time Formatting
Format date/time with localized ordering and separators.
{% highlight javascript %}
var l10nEN = new Intl.DateTimeFormat("en-US"); 
var l10nDE = new Intl.DateTimeFormat("de-DE"); 
l10nEN.format(new Date("2015-01-02")) === "1/2/2015"; 
l10nDE.format(new Date("2015-01-02")) === "2.1.2015";
{% endhighlight %}
