---
layout: post
title:  "How to Delete Commit History on Github"
date:   2019-12-09 12:46:56
categories: Linux
description: How to Delete Commit History on Github
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: This tutorial will help you to delete commit history from your local git repository and remote git repository hosted on Github. In this repository, you will remove the local master branch and create a new master branch.
---
<p>This tutorial will help you to delete commit history from your local git repository and remote git repository hosted on Github. In this repository, you will remove the local master branch and create a new master branch. Finally, push changes to the remote git repository.</p>
<p>Follow the below steps to complete this task:</p>
<ol>
<li>Create Orphan Branch - Create a new orphan branch in git repository. The newly created branch will not show in 'git branch' command.</li>
{% highlight bash %}
git checkout --orphan temp_branch
{% endhighlight %}
<li>Add Files to Branch - Now add all files to newly created branch and commit them using following commands.</li>
{% highlight bash %}
git add -A
git commit -am "the first commit"
{% endhighlight %}
<li>Delete master Branch - Now you can delete the master branch from your git repository.</li>
{% highlight bash %}
git branch -D master
{% endhighlight %}
<li>Rename Current Branch - After deleting the master branch, let’s rename newly created branch name to master.</li>
{% highlight bash %}
git branch -m master
{% endhighlight %}
<li>Push Changes - You have completed the changes to your local git repository. Finally, push your changes to the remote (Github) repository forcefully.</li>
{% highlight bash %}
git push -f origin master
{% endhighlight %}
</ol>
