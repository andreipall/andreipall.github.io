---
layout: post
title:  "JPA Default Fetch Types"
date:   2018-06-08 12:46:56
categories: Java
description: JPA Default Fetch Types
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Hibernate is the most popular implementation of JPA. The Java Persistence API provides Java developers with an api for mapping java objects to relational data. In this article, you will learn about JPA default fetch types.
---
Hibernate is the most popular implementation of JPA. The Java Persistence API provides Java developers with an api for mapping java objects to relational data. In this article, you will learn about JPA default fetch types.


  <table>
    <thead>
      <tr>
        <th>Mapping</th>
        <th>Default Fetch Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>@OneToOne</td>
        <td>FetchType.EAGER</td>
      </tr>
      <tr>
        <td>@OneToMany</td>
        <td>FetchType.LAZY</td>
      </tr>
      <tr>
        <td>@ManyToOne</td>
        <td>FetchType.EAGER</td>
      </tr>
      <tr>
        <td>@ManyToMany</td>
        <td>FetchType.LAZY</td>
      </tr>
    </tbody>
  </table>
