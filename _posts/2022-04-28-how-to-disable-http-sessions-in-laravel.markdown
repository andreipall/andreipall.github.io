---
layout: post
title:  "How To Disable HTTP Sessions In Laravel"
date:   2022-04-28 12:46:56
categories: PHP
description: How To Disable HTTP Sessions In Laravel
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: If you don’t need any HTTP sessions at all, disabling them is pretty easy. Modify your app/Http/Kernel.php and remove the following pieces of middleware from the protected $middlewareGroups group
---
<p>If you don’t need any HTTP sessions at all, disabling them is pretty easy. Modify your app/Http/Kernel.php and remove the following pieces of middleware from the protected $middlewareGroups group:</p>
{% highlight php %}
\Illuminate\Session\Middleware\StartSession::class,
\Illuminate\View\Middleware\ShareErrorsFromSession::class,
\App\Http\Middleware\VerifyCsrfToken::class,
{% endhighlight %}
