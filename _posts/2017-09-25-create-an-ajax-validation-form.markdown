---
layout: post
title:  "Create an AJAX Validation Form"
date:   2017-09-25 12:46:56
categories: PHP
description: Create an AJAX Validation Form
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Ajax is a set of Web development techniques using many Web technologies on the client side to create asynchronous Web applications. With Ajax, Web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.
---
Ajax is a set of Web development techniques using many Web technologies on the client side to create asynchronous Web applications. With Ajax, Web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.
The following tutorial demonstrates how to use AJAX to perform form validation.

{% highlight html %}
<!doctype html>
<html>
<head>
    <title>AJAX form Check</title>
    <style>
      .error{display:none; color:red;}
    </style>
</head>

<body>
  <form action="validator.php" method="POST" id="myform">
    Name: <input type="text" value="" class="form-group" name="name">
    <span class="error-name error">Missing Name</span>
    <br>
    Email: <input type="email" value="" class="form-group" name="email">
    <span class="error-email error">Missing Email</span>
    <br>
    <button type="submit">Submit</button>
  </form>
  <div id="message"></div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script>
    $(document).ready(function(){
      $('form').submit(function(e){
        e.preventDefault();
        $('.error').hide();
        var data = $('#myform').serialize();
        $('#message').html('sending.....');
        $.ajax({
          type:'POST'
          , url:'validator.php'
          , data: data
          , dataType: 'json'
          , success: function(d){
            $('#message').html(d.message);
            if(d.success){
              //$('#myform').append('<div>'+d.message+'</div>');
                $('#message').html(d.message);
            }else{
              if(d.errors.name){
                $('.error-name').show();
                $('.error-name').html(d.errors.name);
              }
              if(d.errors.email){
                $('.error-email').show();
                $('.error-email').html(d.errors.email);
              }
            }

          }
        })
      })

    })
  </script>
</body>
</html>
{% endhighlight %}
The contents of the validator.php file:
{% highlight php %}
<?php
$errors = array();
$response = array();

if(empty($_POST['name'])){
  $errors['name'] = 'Name is needed!';
}
if(empty($_POST['email'])){
  $errors['email'] = 'Email is needed!';
}

$response['errors'] = $errors;

if(!empty($errors)){
  $response['success'] = false;
  $response['message'] = 'FAIL!';
} else {
  $response['success'] = true;
  $response['message'] = 'SUCCESS!';
}

echo json_encode($response);
{% endhighlight %}
