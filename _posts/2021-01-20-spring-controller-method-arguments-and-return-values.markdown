---
layout: post
title:  "Spring Controller Method Arguments And Return Values"
date:   2021-01-20 16:30:56
categories: java
description: Spring Controller Method Arguments And Return Values
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: @RequestMapping handler methods have a flexible signature and can choose from a range of supported controller method arguments and return values. The next table describes the supported controller method arguments.
---
<p>@RequestMapping handler methods have a flexible signature and can choose from a range of supported controller method arguments and return values.</p>
<h3>Method Arguments</h3>
<p>The next table describes the supported controller method arguments.</p>
<table class="tableblock frame-all grid-all stretch">
<colgroup>
<col style="width: 33.3333%;">
<col style="width: 66.6667%;">
</colgroup>
<thead>
<tr>
<th class="tableblock halign-left valign-top">Controller method argument</th>
<th class="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>WebRequest</code>, <code>NativeWebRequest</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Generic access to request parameters and request and session attributes, without direct
use of the Servlet API.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>javax.servlet.ServletRequest</code>, <code>javax.servlet.ServletResponse</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Choose any specific request or response type — for example, <code>ServletRequest</code>, <code>HttpServletRequest</code>,
or Spring’s <code>MultipartRequest</code>, <code>MultipartHttpServletRequest</code>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>javax.servlet.http.HttpSession</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Enforces the presence of a session. As a consequence, such an argument is never <code>null</code>.
Note that session access is not thread-safe. Consider setting the
<code>RequestMappingHandlerAdapter</code> instance’s <code>synchronizeOnSession</code> flag to <code>true</code> if multiple
requests are allowed to concurrently access a session.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>javax.servlet.http.PushBuilder</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Servlet 4.0 push builder API for programmatic HTTP/2 resource pushes.
Note that, per the Servlet specification, the injected <code>PushBuilder</code> instance can be null if the client
does not support that HTTP/2 feature.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.security.Principal</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Currently authenticated user — possibly a specific <code>Principal</code> implementation class if known.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>HttpMethod</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The HTTP method of the request.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.util.Locale</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The current request locale, determined by the most specific <code>LocaleResolver</code> available (in
effect, the configured <code>LocaleResolver</code> or <code>LocaleContextResolver</code>).</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.util.TimeZone</code> + <code>java.time.ZoneId</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The time zone associated with the current request, as determined by a <code>LocaleContextResolver</code>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.io.InputStream</code>, <code>java.io.Reader</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to the raw request body as exposed by the Servlet API.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.io.OutputStream</code>, <code>java.io.Writer</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to the raw response body as exposed by the Servlet API.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@PathVariable</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to URI template variables. See <a href="#mvc-ann-requestmapping-uri-templates">URI patterns</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@MatrixVariable</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to name-value pairs in URI path segments. See <a href="#mvc-ann-matrix-variables">Matrix Variables</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@RequestParam</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to the Servlet request parameters, including multipart files. Parameter values
are converted to the declared method argument type. See <a href="#mvc-ann-requestparam"><code>@RequestParam</code></a> as well
as <a href="#mvc-multipart-forms">Multipart</a>.</p>
<p class="tableblock"> Note that use of <code>@RequestParam</code> is optional for simple parameter values.
See “Any other argument”, at the end of this table.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@RequestHeader</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to request headers. Header values are converted to the declared method argument
type. See <a href="#mvc-ann-requestheader"><code>@RequestHeader</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@CookieValue</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to cookies. Cookies values are converted to the declared method argument
type. See <a href="#mvc-ann-cookievalue"><code>@CookieValue</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@RequestBody</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to the HTTP request body. Body content is converted to the declared method
argument type by using <code>HttpMessageConverter</code> implementations. See <a href="#mvc-ann-requestbody"><code>@RequestBody</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>HttpEntity&lt;B&gt;</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to request headers and body. The body is converted with an <code>HttpMessageConverter</code>.
See <a href="#mvc-ann-httpentity">HttpEntity</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@RequestPart</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to a part in a <code>multipart/form-data</code> request, converting the part’s body
with an <code>HttpMessageConverter</code>. See <a href="#mvc-multipart-forms">Multipart</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.util.Map</code>, <code>org.springframework.ui.Model</code>, <code>org.springframework.ui.ModelMap</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to the model that is used in HTML controllers and exposed to templates as
part of view rendering.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>RedirectAttributes</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Specify attributes to use in case of a redirect (that is, to be appended to the query
string) and flash attributes to be stored temporarily until the request after redirect.
See <a href="#mvc-redirecting-passing-data">Redirect Attributes</a> and <a href="#mvc-flash-attributes">Flash Attributes</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@ModelAttribute</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to an existing attribute in the model (instantiated if not present) with
data binding and validation applied. See <a href="#mvc-ann-modelattrib-method-args"><code>@ModelAttribute</code></a> as well as
<a href="#mvc-ann-modelattrib-methods">Model</a> and <a href="#mvc-ann-initbinder"><code>DataBinder</code></a>.</p>
<p class="tableblock"> Note that use of <code>@ModelAttribute</code> is optional (for example, to set its attributes).
See “Any other argument” at the end of this table.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>Errors</code>, <code>BindingResult</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to errors from validation and data binding for a command object
(that is, a <code>@ModelAttribute</code> argument) or errors from the validation of a <code>@RequestBody</code> or
<code>@RequestPart</code> arguments. You must declare an <code>Errors</code>, or <code>BindingResult</code> argument
immediately after the validated method argument.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>SessionStatus</code> + class-level <code>@SessionAttributes</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For marking form processing complete, which triggers cleanup of session attributes
declared through a class-level <code>@SessionAttributes</code> annotation. See
<a href="#mvc-ann-sessionattributes"><code>@SessionAttributes</code></a> for more details.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>UriComponentsBuilder</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For preparing a URL relative to the current request’s host, port, scheme, context path, and
the literal part of the servlet mapping. See <a href="#mvc-uri-building">URI Links</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@SessionAttribute</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to any session attribute, in contrast to model attributes stored in the session
as a result of a class-level <code>@SessionAttributes</code> declaration. See
<a href="#mvc-ann-sessionattribute"><code>@SessionAttribute</code></a> for more details.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@RequestAttribute</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For access to request attributes. See <a href="#mvc-ann-requestattrib"><code>@RequestAttribute</code></a> for more details.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Any other argument</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">If a method argument is not matched to any of the earlier values in this table and it is
a simple type (as determined by
<a href="https://docs.spring.io/spring-framework/docs/5.3.3/javadoc-api/org/springframework/beans/BeanUtils.html#isSimpleProperty-java.lang.Class-">BeanUtils#isSimpleProperty</a>,
it is a resolved as a <code>@RequestParam</code>. Otherwise, it is resolved as a <code>@ModelAttribute</code>.</p></td>
</tr>
</tbody>
</table>
<h3>Return Values</h3>
<p>The next table describes the supported controller method return values.</p>
<table class="tableblock frame-all grid-all stretch">
<colgroup>
<col style="width: 33.3333%;">
<col style="width: 66.6667%;">
</colgroup>
<thead>
<tr>
<th class="tableblock halign-left valign-top">Controller method return value</th>
<th class="tableblock halign-left valign-top">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@ResponseBody</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The return value is converted through <code>HttpMessageConverter</code> implementations and written to the
response. See <a href="#mvc-ann-responsebody"><code>@ResponseBody</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>HttpEntity&lt;B&gt;</code>, <code>ResponseEntity&lt;B&gt;</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The return value that specifies the full response (including HTTP headers and body) is to be converted
through <code>HttpMessageConverter</code> implementations and written to the response.
See <a href="#mvc-ann-responseentity">ResponseEntity</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>HttpHeaders</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">For returning a response with headers and no body.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>String</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">A view name to be resolved with <code>ViewResolver</code> implementations and used together with the implicit
model — determined through command objects and <code>@ModelAttribute</code> methods. The handler
method can also programmatically enrich the model by declaring a <code>Model</code> argument
(see <a href="#mvc-ann-requestmapping-registration">Explicit Registrations</a>).</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>View</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">A <code>View</code> instance to use for rendering together with the implicit model — determined
through command objects and <code>@ModelAttribute</code> methods. The handler method can also
programmatically enrich the model by declaring a <code>Model</code> argument
(see <a href="#mvc-ann-requestmapping-registration">Explicit Registrations</a>).</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>java.util.Map</code>, <code>org.springframework.ui.Model</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Attributes to be added to the implicit model, with the view name implicitly determined
through a <code>RequestToViewNameTranslator</code>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>@ModelAttribute</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">An attribute to be added to the model, with the view name implicitly determined through
a <code>RequestToViewNameTranslator</code>.</p>
<p class="tableblock"> Note that <code>@ModelAttribute</code> is optional. See "Any other return value" at the end of
this table.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>ModelAndView</code> object</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">The view and model attributes to use and, optionally, a response status.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>void</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">A method with a <code>void</code> return type (or <code>null</code> return value) is considered to have fully
handled the response if it also has a <code>ServletResponse</code>, an <code>OutputStream</code> argument, or
an <code>@ResponseStatus</code> annotation. The same is also true if the controller has made a positive
<code>ETag</code> or <code>lastModified</code> timestamp check (see <a href="#mvc-caching-etag-lastmodified">Controllers</a> for details).</p>
<p class="tableblock"> If none of the above is true, a <code>void</code> return type can also indicate “no response body” for
REST controllers or a default view name selection for HTML controllers.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>DeferredResult&lt;V&gt;</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Produce any of the preceding return values asynchronously from any thread — for example, as a
result of some event or callback. See <a href="#mvc-ann-async">Asynchronous Requests</a> and <a href="#mvc-ann-async-deferredresult"><code>DeferredResult</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>Callable&lt;V&gt;</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Produce any of the above return values asynchronously in a Spring MVC-managed thread.
See <a href="#mvc-ann-async">Asynchronous Requests</a> and <a href="#mvc-ann-async-callable"><code>Callable</code></a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>ListenableFuture&lt;V&gt;</code>,
<code>java.util.concurrent.CompletionStage&lt;V&gt;</code>,
<code>java.util.concurrent.CompletableFuture&lt;V&gt;</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Alternative to <code>DeferredResult</code>, as a convenience (for example, when an underlying service
returns one of those).</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>ResponseBodyEmitter</code>, <code>SseEmitter</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Emit a stream of objects asynchronously to be written to the response with
<code>HttpMessageConverter</code> implementations. Also supported as the body of a <code>ResponseEntity</code>.
See <a href="#mvc-ann-async">Asynchronous Requests</a> and <a href="#mvc-ann-async-http-streaming">HTTP Streaming</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock"><code>StreamingResponseBody</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Write to the response <code>OutputStream</code> asynchronously. Also supported as the body of a
<code>ResponseEntity</code>. See <a href="#mvc-ann-async">Asynchronous Requests</a> and <a href="#mvc-ann-async-http-streaming">HTTP Streaming</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Reactive types — Reactor, RxJava, or others through <code>ReactiveAdapterRegistry</code></p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Alternative to <code>DeferredResult</code> with multi-value streams (for example, <code>Flux</code>, <code>Observable</code>)
collected to a <code>List</code>.</p>
<p class="tableblock"> For streaming scenarios (for example, <code>text/event-stream</code>, <code>application/json+stream</code>),
<code>SseEmitter</code> and <code>ResponseBodyEmitter</code> are used instead, where <code>ServletOutputStream</code>
blocking I/O is performed on a Spring MVC-managed thread and back pressure is applied
against the completion of each write.</p>
<p class="tableblock"> See <a href="#mvc-ann-async">Asynchronous Requests</a> and <a href="#mvc-ann-async-reactive-types">Reactive Types</a>.</p></td>
</tr>
<tr>
<td class="tableblock halign-left valign-top"><p class="tableblock">Any other return value</p></td>
<td class="tableblock halign-left valign-top"><p class="tableblock">Any return value that does not match any of the earlier values in this table and that
is a <code>String</code> or <code>void</code> is treated as a view name (default view name selection through
<code>RequestToViewNameTranslator</code> applies), provided it is not a simple type, as determined by
<a href="https://docs.spring.io/spring-framework/docs/5.3.3/javadoc-api/org/springframework/beans/BeanUtils.html#isSimpleProperty-java.lang.Class-">BeanUtils#isSimpleProperty</a>.
Values that are simple types remain unresolved.</p></td>
</tr>
</tbody>
</table>
