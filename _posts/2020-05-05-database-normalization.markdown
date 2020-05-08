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
<h2>Example of a step by step normalization</h2>
<p>Normalization is a database design technique, which is used to design a relational database table up to higher normal form. The process is progressive, and a higher level of database normalization cannot be achieved unless the previous levels have been satisfied.</p>
<p>That means that, having data in unnormalized form (the least normalized) and aiming to achieve the highest level of normalization, the first step would be to ensure compliance to first normal form, the second step would be to ensure second normal form is satisfied, and so forth in order mentioned above, until the data conform to sixth normal form.</p>
<p>However, it is worth noting that normal forms beyond 4NF are mainly of academic interest, as the problems they exist to solve rarely appear in practice.</p>
<p>Please note that the data in the following example were intentionally designed to contradict most of the normal forms. In real life, it's quite possible to be able to skip some of the normalization steps because the table doesn't contain anything contradicting the given normal form. It also commonly occurs that fixing a violation of one normal form also fixes a violation of a higher normal form in the process. Also one table has been chosen for normalization at each step, meaning that at the end of this example process, there might still be some tables not satisfying the highest normal form.</p>
<h3>Initial data</h3>
<p>Let a database table with the following structure:</p>
<table>
<tbody><tr>
<th>Title
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Format
</th>
<th>Price
</th>
<th>Subject
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th>Publisher
</th>
<th>Publisher Country
</th>
<th>Publication Type
</th>
<th>Genre ID
</th>
<th>Genre Name
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>Hardcover
</td>
<td>49.99
</td>
<td>MySQL,
<p>Database,
</p><p>Design
</p>
</td>
<td>520
</td>
<td>Thick
</td>
<td>Apress
</td>
<td>USA
</td>
<td>E-book
</td>
<td>1
</td>
<td>Tutorial
</td></tr></tbody></table>
<p>We assume in this example that each book has only one author.</p>
<h3>Satisfying 1NF</h3>
<p>To satisfy 1NF, the values in each column of a table must be atomic. In the initial table, Subject contains a set of subject values, meaning it does not comply.</p>
<p>One way to achieve the 1NF would be to separate the duplicities into multiple columns using repeating groups 'subject':</p>
<table>
<tbody><tr>
<th><u>Title</u>
</th>
<th><u>Format</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Price
</th>
<th>Subject 1
</th>
<th>Subject 2
</th>
<th>Subject 3
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th>Publisher
</th>
<th>Publisher country
</th>
<th>Genre ID
</th>
<th>Genre Name
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Hardcover
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>49.99
</td>
<td>MySQL
</td>
<td>Database
</td>
<td>Design
</td>
<td>520
</td>
<td>Thick
</td>
<td>Apress
</td>
<td>USA
</td>
<td>1
</td>
<td>Tutorial
</td></tr></tbody></table>
<p>Although now the table formally complies to the 1NF (is atomic), the problem with this solution is obvious - if a book has more than three subjects, it cannot be added to the database without altering its structure.</p>
<p>To solve the problem in a more elegant way, it is necessary to identify entities represented in the table and separate them into their own respective tables. In this case, it would result in Book, Subject and Publisher tables:</p>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th><u>Format</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Price
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th><i>Subject ID</i>
</th>
<th>Genre Name
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Hardcover
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>49.99
</td>
<td>520
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>1</i>
</td></tr></tbody></table>
<table>
<tbody><tr>
<td>
<table>
<caption><b>Subject</b>
</caption>
<tbody><tr>
<th><b><u>Subject ID</u></b>
</th>
<th><b>Subject name</b>
</th></tr>
<tr>
<td>1
</td>
<td>MySQL
</td></tr>
<tr>
<td>2
</td>
<td>Database
</td></tr>
<tr>
<td>3
</td>
<td>Design
</td></tr></tbody></table>
</td>
<td>
<table>
<caption><b>Publisher</b>
</caption>
<tbody><tr>
<th><b><u>Publisher_ID</u></b>
</th>
<th><b>Name</b>
</th>
<th><b>Country</b>
</th></tr>
<tr>
<td>1
</td>
<td>Apress
</td>
<td>USA
</td></tr></tbody></table>
</td></tr></tbody></table>
<p>Simply separating the initial data into multiple tables would break the connection between the data. That means the relationships between the newly introduced tables need to be determined. Notice that the Publisher ID column in the Book's table is a foreign key realizing many-to-one relation between a book and a publisher.</p>
<p>A book can fit many subjects, as well as a subject may correspond to many books. That means also a many-to-many relationship needs to be defined, achieved by creating a link table:</p>
<table>
<tbody><tr>
<td>
<table>
<caption><b>Title - Subject</b>
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th><i><b>Subject ID</b></i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>1
</td></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>2
</td></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>3
</td></tr></tbody></table>
<p><br>
</p>
</td></tr></tbody></table>
<p>Instead of one table in unnormalized form, there are now 4 tables conforming to the 1NF.</p>
<h3>Satisfying 2NF</h3>
<p>The Book table has one candidate key, the compound key {Title , Format}. Consider the following table fragment:</p>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th><u>Format</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Price
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th>Genre ID
</th>
<th>Genre Name
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Hardcover
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>49.99
</td>
<td>520
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>E-book
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>22.34
</td>
<td>520
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E-book
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>13.88
</td>
<td>538
</td>
<td>Thick
</td>
<td>2
</td>
<td>Popular science
</td>
<td><i>2</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Paperback
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>39.99
</td>
<td>538
</td>
<td>Thick
</td>
<td>2
</td>
<td>Popular science
</td>
<td><i>2</i>
</td></tr></tbody></table>
<p>All of the attributes that are not part of the key depend on Title, but only Price also depends on Format. To conform to 2NF and remove duplicities, every non-key attribute must depend on the whole key, not just part of it.</p>
<p>To normalize this table, make {Title} the (simple) key so that every non-key attribute depends upon the whole key, and remove Price into a separate table so that its dependency on Format can be preserved:</p>
<table>
<tbody><tr>
<td>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th>Genre ID
</th>
<th>Genre Name
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>520
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>538
</td>
<td>Thick
</td>
<td>2
</td>
<td>Popular science
</td>
<td><i>2</i>
</td></tr></tbody></table>
</td>
<td>
<table>
<caption>Format - Prices
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th><u>Format</u>
</th>
<th>Price
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Hardcover
</td>
<td>49.99
</td></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>E-book
</td>
<td>22.34
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E-book
</td>
<td>13.88
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Paperback
</td>
<td>39.99
</td></tr></tbody></table>
</td></tr></tbody></table>
<p>Now, the book table conforms to 2NF.</p>
<h3>Satisfying 3NF</h3>
<p>A table in third normal form (3NF) is a table in 2NF that has no transitive dependencies. Note the book table with more rows (previously omitted for brevity):</p>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th>Genre ID
</th>
<th>Genre Name
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>520
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>538
</td>
<td>Thick
</td>
<td>2
</td>
<td>Popular science
</td>
<td><i>2</i>
</td></tr>
<tr>
<td>Learning SQL
</td>
<td>Alan Beaulieu
</td>
<td>American
</td>
<td>338
</td>
<td>Slim
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>3</i>
</td></tr>
<tr>
<td>SQL Cookbook
</td>
<td>Anthony Molinaro
</td>
<td>American
</td>
<td>636
</td>
<td>Thick
</td>
<td>1
</td>
<td>Tutorial
</td>
<td><i>3</i>
</td></tr></tbody></table>
<p>Genre ID and Genre Name both depend upon the primary key {Title}, but they are not independent of one another. The dependency of, say, Genre Name on the primary key can be deduced from the dependency of Genre Name on Genre ID and of Genre ID on the primary key. Since there are more titles than genres, that dependency introduces redundant data into the Book table which can be eliminated by abstracting the dependency of Genre Name on Genre ID into its own table:</p>
<table>
<tbody><tr>
<td>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th><i>Genre ID</i>
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>520
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>538
</td>
<td>Thick
</td>
<td><i>2</i>
</td>
<td><i>2</i>
</td></tr>
<tr>
<td>Learning SQL
</td>
<td>Alan Beaulieu
</td>
<td>American
</td>
<td>338
</td>
<td>Slim
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr>
<tr>
<td>SQL Cookbook
</td>
<td>Anthony Molinaro
</td>
<td>American
</td>
<td>636
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr></tbody></table>
</td>
<td><br>
<table>
<caption>Book Genres
</caption>
<tbody><tr>
<th><u>Genre ID</u>
</th>
<th>Genre Name
</th></tr>
<tr>
<td>1
</td>
<td>Tutorial
</td></tr>
<tr>
<td>2
</td>
<td>Popular science
</td></tr></tbody></table>
</td></tr></tbody></table>
<p>The Book table is now in third normal form. Although tables in 1NF are by definition normalized, "normalized" is commonly used to mean 3NF.</p>
<h3>Satisfying EKNF</h3>
<p>The elementary key normal form (EKNF) falls strictly between 3NF and BCNF and is not much discussed in the literature. It is intended “to capture the salient qualities of both 3NF and BCNF” while avoiding the problems of both (namely, that 3NF is “too forgiving” and BCNF is “prone to computational complexity”). Since it is rarely mentioned in literature, it is not included in this example.</p>
<h3>Satisfying BCNF</h3>
<p>Consider the table in 3NF from the previous step:</p>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th>Author
</th>
<th>Author Nationality
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th><i>Genre ID</i>
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>American
</td>
<td>520
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E.F.Codd
</td>
<td>British
</td>
<td>538
</td>
<td>Thick
</td>
<td><i>2</i>
</td>
<td><i>2</i>
</td></tr>
<tr>
<td>Learning SQL
</td>
<td>Alan Beaulieu
</td>
<td>American
</td>
<td>338
</td>
<td>Slim
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr>
<tr>
<td>SQL Cookbook
</td>
<td>Anthony Molinaro
</td>
<td>American
</td>
<td>636
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr></tbody></table>
<p>There is a non-trivial dependency violating BCNF - {Author} → {Author Nationality}. Therefore, the table should be decomposed:</p>
<table>
<tbody><tr>
<td>
<table>
<caption>Book
</caption>
<tbody><tr>
<th><u>Title</u>
</th>
<th>Author
</th>
<th>Pages
</th>
<th>Thickness
</th>
<th><i>Genre ID</i>
</th>
<th><i>Publisher ID</i>
</th></tr>
<tr>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Chad Russell
</td>
<td>520
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>1</i>
</td></tr>
<tr>
<td>The Relational Model for Database Management: Version 2
</td>
<td>E.F.Codd
</td>
<td>538
</td>
<td>Thick
</td>
<td><i>2</i>
</td>
<td><i>2</i>
</td></tr>
<tr>
<td>Learning SQL
</td>
<td>Alan Beaulieu
</td>
<td>338
</td>
<td>Slim
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr>
<tr>
<td>SQL Cookbook
</td>
<td>Anthony Molinaro
</td>
<td>636
</td>
<td>Thick
</td>
<td><i>1</i>
</td>
<td><i>3</i>
</td></tr></tbody></table>
</td>
<td>
<table>
<caption>Author - Nationality
</caption>
<tbody><tr>
<th><u>Author</u>
</th>
<th>Author Nationality
</th></tr>
<tr>
<td>Chad Russell
</td>
<td>American
</td></tr>
<tr>
<td>E.F.Codd
</td>
<td>British
</td></tr>
<tr>
<td>Alan Beaulieu
</td>
<td>American
</td></tr>
<tr>
<td>Anthony Molinaro
</td>
<td>American
</td></tr></tbody></table>
</td>
<td>
</td></tr></tbody></table>
<p>Now, each attribute represents a fact about the key, the whole key, and nothing but the key. Therefore BCNF has been achieved.</p>
<h3>Satisfying 4NF</h3>
<p>Assume the database is owned by a book retailer franchise that has several franchisees that own shops in different locations. And therefore the retailer decided to add a table that contains data about availability of the books at different locations:</p>
<table>
<caption align="top"><b>Franchisee - Book  Location</b>
</caption>
<tbody><tr>
<th><u>Franchisee ID</u>
</th>
<th><u>Title</u>
</th>
<th><u>Location</u>
</th></tr>
<tr>
<td>1
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>California
</td></tr>
<tr>
<td>1
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Florida
</td></tr>
<tr>
<td>1
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Texas
</td></tr>
<tr>
<td>1
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>California
</td></tr>
<tr>
<td>1
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Florida
</td></tr>
<tr>
<td>1
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Texas
</td></tr>
<tr>
<td>2
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>California
</td></tr>
<tr>
<td>2
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Florida
</td></tr>
<tr>
<td>2
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Texas
</td></tr>
<tr>
<td>2
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>California
</td></tr>
<tr>
<td>2
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Florida
</td></tr>
<tr>
<td>2
</td>
<td>The Relational Model for Database Management: Version 2
</td>
<td>Texas
</td></tr>
<tr>
<td>3
</td>
<td>Beginning MySQL Database Design and Optimization
</td>
<td>Texas
</td></tr>
</tbody></table>
<p>As this table structure consists of a compound primary key, it doesn't contain any non-key attributes and it's already in BCNF (and therefore also satisfies all the previous normal forms). However, if we assume that all available books are offered in each area, we might notice that the Title is not unambiguously bound to a certain Location and therefore the table doesn't satisfy 4NF.</p>
<p>That means that, to satisfy the fourth normal form, this table needs to be decomposed as well:</p>
<table>
<tbody><tr>
<td>
<table>
<caption align="top"><b>Franchisee - Book</b>
</caption>
<tbody><tr>
<th><u>Franchisee ID</u>
</th>
<th><u>Title</u>
</th></tr>
<tr>
<td>1
</td>
<td>Beginning MySQL Database Design and Optimization
</td></tr>
<tr>
<td>1
</td>
<td>The Relational Model for Database Management: Version 2
</td></tr>
<tr>
<td>2
</td>
<td>Beginning MySQL Database Design and Optimization
</td></tr>
<tr>
<td>2
</td>
<td>The Relational Model for Database Management: Version 2
</td></tr>
<tr>
<td>3
</td>
<td>Beginning MySQL Database Design and Optimization
</td></tr>
</tbody></table>
</td>
<td>
<table>
<caption align="top">Franchisee - Location
</caption>
<tbody><tr>
<th><u>Franchisee ID</u>
</th>
<th><u>Location</u>
</th></tr>
<tr>
<td>1
</td>
<td>California
</td></tr>
<tr>
<td>1
</td>
<td>Florida
</td></tr>
<tr>
<td>1
</td>
<td>Texas
</td></tr>
<tr>
<td>2
</td>
<td>California
</td></tr>
<tr>
<td>2
</td>
<td>Florida
</td></tr>
<tr>
<td>2
</td>
<td>Texas
</td></tr>
<tr>
<td>3
</td>
<td>Texas
</td></tr>
</tbody></table>
</td></tr></tbody></table>
<p>Now, every record is unambiguously identified by a superkey, therefore 4NF is satisfied.</p>
