---
layout: post
title:  "Database Normalization"
date:   2020-05-05 16:53:56
categories: sql
description: Database Normalization
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity.
---
<p>Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity. It was first proposed by Edgar F. Codd as part of his relational model.</p>
<p>Normalization entails organizing the columns (attributes) and tables (relations) of a database to ensure that their dependencies are properly enforced by database integrity constraints. It is accomplished by applying some formal rules either by a process of synthesis (creating a new database design) or decomposition (improving an existing database design).</p>
<p>Informally, a relational database relation is often described as "normalized" if it meets third normal form. Most 3NF relations are free of insertion, update, and deletion anomalies.</p>
<p>The normal forms (from least normalized to most normalized) are:</p>
<ul>
<li>UNF: Unnormalized form</li>
<li>1NF: First normal form</li>
<li>2NF: Second normal form</li>
<li>3NF: Third normal form</li>
<li>EKNF: Elementary key normal form</li>
<li>BCNF: Boyce–Codd normal form</li>
<li>4NF: Fourth normal form</li>
<li>ETNF: Essential tuple normal form</li>
<li>5NF: Fifth normal form</li>
<li>DKNF: Domain-key normal form</li>
<li>6NF: Sixth normal form</li>
</ul>
<table>
<tbody><tr>
<td>
</td>
<th scope="col">UNF</th>
<th scope="col">1NF</th>
<th scope="col">2NF</th>
<th scope="col">3NF</th>
<th scope="col">EKNF</th>
<th scope="col">BCNF</th>
<th scope="col">4NF</th>
<th scope="col">ETNF</th>
<th scope="col">5NF</th>
<th scope="col">DKNF</th>
<th scope="col">6NF</th></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Primary key (no duplicate tuples)</td>
<td style="background: #FFB; color: black; vertical-align: middle; text-align: center;" class="partial table-partial"><img alt="Maybe" src="/assets/img/13px-Yellow_check.svg.png" decoding="async" title="Maybe" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">No repeating groups</td>
<td style="background: #FFB; color: black; vertical-align: middle; text-align: center;" class="partial table-partial"><img alt="Maybe" src="/assets/img/13px-Yellow_check.svg.png" decoding="async" title="Maybe" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Atomic columns (cells have single value)</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">No partial dependencies (values depend on the whole of every Candidate key)</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">No transitive dependencies (values depend only on Candidate keys)</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Every non-trivial functional dependency involves either a superkey or an elementary key's subkey</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">No redundancy from any functional dependency</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Every non-trivial, multi-value dependency has a superkey</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">A component of every explicit join dependency is a superkey</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Every non-trivial join dependency is implied by a <a href="/wiki/Candidate_key" title="Candidate key">candidate key</a></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Every constraint is a consequence of domain constraints and key constraints</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="" style="background: #ececec; color: #2C2C2C; vertical-align: middle; text-align: center;" class="table-na">N/A
</td></tr>
<tr>
<td style="text-align:right; background-color: #e6e1dc;">Every join dependency is trivial</td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="No" style="background: #FFD2D2; color:black; vertical-align: middle; text-align: center;" class="table-no2"><img alt="No" src="/assets/img/13px-Dark_Red_x.svg.png" decoding="async" title="No"  data-file-width="600" data-file-height="600" width="13" height="13"></td>
<td data-sort-value="Yes" style="background: #D2FFD2; color: black; vertical-align: middle; text-align: center;" class="table-yes2"><img alt="Yes" src="/assets/img/13px-Green_check.svg.png" decoding="async" title="Yes" data-file-width="600" data-file-height="600" width="13" height="13">
</td></tr></tbody></table>
