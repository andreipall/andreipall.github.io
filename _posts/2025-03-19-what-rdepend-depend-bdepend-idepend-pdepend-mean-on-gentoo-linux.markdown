---
layout: post
title:  "What RDEPEND, DEPEND, BDEPEND, IDEPEND, PDEPEND mean on Gentoo Linux?"
date:   2025-03-19 10:46:56
categories: Linux
description: What RDEPEND, DEPEND, BDEPEND, IDEPEND, PDEPEND mean on Gentoo Linux?
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: On Gentoo Linux, package dependencies are managed using Ebuild variables. These variables define when and how dependencies are required during different phases of package installation.
---
<p>On Gentoo Linux, package dependencies are managed using Ebuild variables. These variables define when and how dependencies are required during different phases of package installation. Here’s what each of them means:</p>
<ol>
  <li>
    <h2>DEPEND (Build-time dependencies)</h2>
    <ul>
      <li>Specifies dependencies required at build time.</li>
      <li>These are necessary only while compiling the package.</li>
      <li>Once the package is installed, these dependencies may no longer be needed.</li>
    </ul>
  </li>
  <li>
    <h2>RDEPEND (Run-time dependencies)</h2>
    <ul>
      <li>Specifies dependencies required at runtime.</li>
      <li>These are needed for the package to function properly after installation.</li>
      <li>Usually, RDEPEND and DEPEND are the same unless the package needs something only during compilation.</li>
    </ul>
  </li>
  <li>
    <h2>BDEPEND (Build-time dependencies for binary packages)</h2>
    <ul>
      <li>Specifies build dependencies needed when cross-compiling or using a binary package.</li>
      <li>Useful for bootstrapping or when building packages in an isolated environment.</li>
      <li>Use Case: When cross-compiling, BDEPEND ensures that necessary tools (like gcc) are available in the build environment.</li>
    </ul>
  </li>
  <li>
    <h2>IDEPEND (Install-time dependencies)</h2>
    <ul>
      <li>Specifies dependencies needed only during package installation.</li>
      <li>Once the package is installed, these dependencies can be removed.</li>
      <li>Use Case: If a package needs unzip only to extract files during installation.</li>
    </ul>
  </li>
  <li>
    <h2>PDEPEND (Post-install dependencies)</h2>
    <ul>
      <li>Specifies dependencies that must be installed after the package is installed.</li>
      <li>Used when a package cannot be installed until another package is fully set up.</li>
      <li>Use Case: If a package installs correctly without dbus, but it needs dbus to function properly later.</li>
    </ul>
  </li>
</ol>
