---
layout: default
title: Blog archive
---
<div class="page-content wc-container">
  <div>
  <h1>Blog Archive</h1>  
  {% for post in site.posts %}
  	{% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
  	{% if currentyear != year %}
    	{% unless forloop.first %}</ul>{% endunless %}
    		<h5>{{ currentyear }}</h5>
    		<ul class="posts">
    		{% capture year %}{{currentyear}}{% endcapture %} 
  		{% endif %}
    <li><a href="{{ post.url }}" class="post-title">{{ post.title }}</a></li>
  {% endfor %}
