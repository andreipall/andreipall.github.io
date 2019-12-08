---
layout: post
title:  "Virtual Hosts In Tomcat"
date:   2017-03-01 16:46:56
categories: Java
description: Virtual Hosts In Tomcat
keywords: [Andrei Pall, blog, mvc, maven, java, spring, framework]
excerpt: Apache Tomcat is an open-source Java Servlet Container developed by the Apache Software Foundation. Tomcat implements several Java EE specifications including Java Servlet, JavaServer Pages (JSP), Java EL, and WebSocket, and provides a "pure Java" HTTP web server environment in which Java code can run.
---

Apache Tomcat is an open-source Java Servlet Container developed by the Apache Software Foundation. Tomcat implements several Java EE specifications including Java Servlet, JavaServer Pages (JSP), Java EL, and WebSocket, and provides a "pure Java" HTTP web server environment in which Java code can run.

To create virtual host edit the tomcat-users.xml file from the conf Tomcat installation directory:
{% highlight xml %}
<role rolename="admin-gui"/>
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="manager-jmx"/>
<role rolename="manager-status"/>
<user username="andrei" password="password" roles="admin-gui,manager-gui,manager-script,manager-jmx,manager-status"/>
{% endhighlight %}
After that edit the TOMCAT_HOME/conf/server.xml config file and add a new virtual host:
{% highlight xml %}
  <Host name="outdoorduds.com"  
        appBase="outdoorapps"
        unpackWARs="true"
        autoDeploy="true">
    <Alias>www.outdoorduds.com</Alias>
  </Host>
{% endhighlight %}
And add the virtualhost to /etc/hosts file:
{% highlight bash %}
127.0.0.1       outdoorduds.com
{% endhighlight %}
Restart Tomcat if is running and deploy ROOT.war to the new appBase, TOMCAT_HOME/outdoorapps -- now we have a 'root context' for the new domain name.

