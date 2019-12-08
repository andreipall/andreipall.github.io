---
layout: post
title:  "Uploading images to PHP Server via AJAX"
date:   2018-03-11 12:46:56
categories: PHP
description: Uploading images to PHP Server via AJAX
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Ajax is a set of Web development techniques using many Web technologies on the client side to create asynchronous Web applications. With Ajax, Web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.
---
Ajax is a set of Web development techniques using many Web technologies on the client side to create asynchronous Web applications. With Ajax, Web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page.
The following tutorial demonstrates how to upload images to PHP Server via AJAX.

{% highlight html %}
<!DOCTYPE html>
<html>

<head>
    <title>PHP image Upload</title>
</head>

<body>
    <form id="uploader" action="uploader.php" method="post" enctype="multipart/form-data">
        <div id="preview"></div>
        <input type="file" name="fileUpload" id="fileUpload">
        <input type="submit" value="Upload file"> </form>
    <div id="output"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script>
        $(document).ready(function () {
            $('#uploader').on('submit', function (e) {
                e.preventDefault();
                var fData = new FormData($('form')[0]);
                $.ajax({
                    url: "uploader.php"
                    , type: "POST"
                    , data: fData
                    , contentType: false
                    , processData: false
                    , success: function (data) {
                        $('#output').html(data);
                    }
                })
            })
            $('#fileUpload').change(function () {
                var myImage = new FileReader();
                myImage.onload = imageReady;
                myImage.readAsDataURL(this.files[0]);
            })
        })

        function imageReady(e) {
            //$('#preview').html('<img src="' + e.target.result + '" width="100px">');
            $.ajax({
                url: "save.php"
                , type: "POST"
                , data: {
                    baseData: e.target.result
                }
                , dataType: "text"
                , success: function (data) {
                    $('#preview').html('<img src="' + data + '" width="100px">');
                }
            })
        }
    </script>
</body>

</html>
{% endhighlight %}
The contents of the uploader.php file:
{% highlight php %}
<?php

if (isset($_FILES["fileUpload"]["name"]))
{
$imageFile = ($_FILES["fileUpload"]["name"]);
$imageType = ($_FILES["fileUpload"]["type"]);
$validext = array(
"jpeg",
"jpg",
"png"
);
$fileExt = pathinfo($imageFile, PATHINFO_EXTENSION);
echo $fileExt . "<br />";
$ready = false;
if ((($imageType == "image/jpeg") || ($imageType == "image/jpg") || ($imageType == "image/png")) && in_array($fileExt, $validext))
{
$ready = true;
echo "was valid image<br />";
}
 else
{
echo "was not an image<br />";
}

if ($_FILES["fileUpload"]["size"] < 1000000)
{
$ready = true;
echo "file size is " . $_FILES["fileUpload"]["size"] . "<br />";
}
 else
{
echo "file was TOO BIG!<br />";
$ready = false;
}

if ($_FILES["fileUpload"]["error"])
{
echo "looks like there was an error " . $_FILES["fileUpload"]["error"] . "<br />";
$ready = false;
}

$targetPath = "images/" . $imageFile;
$sourcePath = $_FILES["fileUpload"]["tmp_name"];
if (file_exists($targetPath))
{
echo "File already there <br />";
$ready = false;
}

if ($ready == true)
{
move_uploaded_file($sourcePath, $targetPath);
        echo "upload successful <img src='".$targetPath."' width='100px' height='100px'>";
}
}
?>
{% endhighlight %}
The contents of the save.php file:
{% highlight php %}
<?php
$img = $_POST['baseData'];
$img = str_replace('data:image/jpeg;base64,','',$img);
$img = str_replace(' ','',$img);
$data = base64_decode($img);
$imagepath = 'images/new'.rand(1000,10000).'.jpg';
file_put_contents($imagepath,$data);
echo $imagepath;
?>
{% endhighlight %}
