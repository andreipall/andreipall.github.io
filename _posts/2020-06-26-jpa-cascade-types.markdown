---
layout: post
title:  "JPA Cascade Types"
date:   2020-06-26 16:53:56
categories: java
description: JPA Cascade Types
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Entity relationships often depend on the existence of another entity — for example, the Person–Address relationship. Without the Person, the Address entity doesn't have any meaning of its own. When we delete the Person entity, our Address entity should also get deleted.
---
<p>Entity relationships often depend on the existence of another entity — for example, the Person–Address relationship. Without the Person, the Address entity doesn't have any meaning of its own. When we delete the Person entity, our Address entity should also get deleted. Cascading is the way to achieve this. When we perform some action on the target entity, the same action will be applied to the associated entity.</p>
<table>
<tbody><tr>
	<th>Cascade Types</th>
	<th>Description</th>
</tr>
<tr>
	<td>PERSIST</td>
	<td>The persist operation makes a transient instance persistent. CascadeType PERSIST propagates the persist operation from a parent to a child entity. When we save the person entity, the address entity will also get saved.</td>
</tr>
<tr>
	<td>MERGE</td>
	<td>The merge operation copies the state of the given object onto the persistent object with the same identifier. CascadeType.MERGE propagates the merge operation from a parent to a child entity.</td>
</tr>
<tr>
	<td>DETACH</td>
	<td>The detach operation removes the entity from the persistent context. When we use CascaseType.DETACH, the child entity will also get removed from the persistent context.</td>
</tr>
<tr>
	<td>REFRESH</td>
	<td>Refresh operations re-read the value of a given instance from the database. In some cases, we may change an instance after persisting in the database, but later we need to undo those changes. In that kind of scenario, this may be useful. When we use this operation with CascadeType REFRESH, the child entity also gets reloaded from the database whenever the parent entity is refreshed.</td>
</tr>
<tr>
	<td>REMOVE</td>
	<td>CascadeType.REMOVE propagates the remove operation from parent to child entity.</td>
</tr>
<tr>
	<td>ALL</td>
	<td>Cascade.ALL propagates all operations — including Hibernate-specific ones — from a parent to a child entity.</td>
</tr>
</tbody></table>
