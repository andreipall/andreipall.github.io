---
layout: post
title:  "Simple MVC framework in Ruby"
date:   2014-03-02 17:46:56
categories: Ruby
description: Simple MVC framework in Ruby
keywords: [Andrei Pall, blog, gem, mvc, ruby, framework]
excerpt: Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user.
---

For the beginning we will create a gem by running:

{% highlight bash %}
bundle gem simplemvc
{% endhighlight %}

then open the file /simplemvc/lib/simplemvc.rb

{% highlight ruby %}
require "simplemvc/version"

module Simplemvc
  # Your code goes here...
  class Application
    def call(env)
      [200, {"Content-Type" => "text/html"}, ["Hello"]]
    end
  end
end
{% endhighlight %}

{% highlight bash %}
mkdir blog
cd blog
touch Gemfile
{% endhighlight %}

Edit the Gemfile:

{% highlight ruby %}
source "https://rubygems.org"

gem "simplemvc", path: "../simplemvc"
gem "sqlite3"
{% endhighlight %}

To build and install the gem run:

{% highlight bash %}
gem build simplemvc.gemspec
gem install simplemvc-0.0.1.gem
bundle
touch config.ru
{% endhighlight %}

Edit config.ru

{% highlight ruby %}
require './config/application.rb'

use Rack::ContentType

app = Blog::Application.new

app.route do
  match "/", "home#index"

  match "/:controller/:action" # /haha/hehe
end

run app
{% endhighlight %}

Create the file /blog/config/application.rb

{% highlight ruby %}
require 'simplemvc'

$LOAD_PATH << File.join(File.dirname(__FILE__), "..", "app", "controllers")
$LOAD_PATH << File.join(File.dirname(__FILE__), "..", "app", "models")

module Blog
  class Application < Simplemvc::Application
  end
end
{% endhighlight %}

{% highlight ruby %}
require "simplemvc/version"

module Simplemvc
  # Your code goes here...
  class Application
    def call(env)
      if env["PATH_INFO"] == "/"
        return [ 302, {"Location" => "/pages/about"}, []]
      end
      if env["PATH_INFO"] == "/favicon.ico"
        return [ 302, {}, []]
      end
      
      controller_class, action = get_controller_and_action(env)
      response = controller_class.new.send(action)
      
      [200, {"Content-Type" => "text/html"}, [response]]
    end
    
    def get_controller_and_action(env)
      _, controller_name, action = env["PATH_INFO"].split("/")
      controller_name = controller_name.capitalize + "Controller"
      [Object.const_get(controller_name), action]
    end
  end
end
{% endhighlight %}

{% highlight bash %}
gem install erubis
{% endhighlight %}

Create the controller:

{% highlight ruby %}
class MyPagesController < Simplemvc::Controller
  attr_reader :name
  
  def about
    render :about, name: "Rem", last_name: "Zolotykh"
  end

  def tell_me
    @name = "Rem"
  end
end
run app
{% endhighlight %}

For more details visit <a href="https://tutsplus.com/course/ruby-mvc-framework-from-scratch/" rel="nofollow" target="_blank">Ruby MVC Framework From Scratch</a>.

<p><i class="icon-download-alt"></i> Download <a title="attached files" href="/downloads/simplemvc-blog.tar.gz">attached files</a></p>
