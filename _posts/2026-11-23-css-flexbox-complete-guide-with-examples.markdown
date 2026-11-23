---
layout: post
title:  "CSS Flexbox - Complete Guide with Examples"
date:   2026-11-23 07:46:56
categories: PHP
description: CSS Flexbox - Complete Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: CSS Flexbox (Flexible Box Layout) is a CSS layout system used to arrange HTML elements in rows or columns, control their alignment, distribute available space, and create responsive layouts.
---
CSS Flexbox (Flexible Box Layout) is a CSS layout system used to arrange HTML elements in **rows or columns**, control their alignment, distribute available space, and create responsive layouts.

It is particularly useful for navigation bars, menus, cards, forms, buttons, and page layouts.

## **1. What is&#x20;**`display: flex`**?**

When you apply `display: flex` to an HTML element, that element becomes a **flex container**, and its direct children become **flex items**.

```
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
</div>
```

```
.container {
    display: flex;
}

.item {
    padding: 20px;
    background-color: lightblue;
    border: 1px solid blue;
}
```

**Result:**

Item 1

Item 2

Item 3

Without `display: flex`, these `<div>` elements would normally appear vertically. With Flexbox, they appear horizontally by default.

## **2. Understanding the main axis and cross axis**

Flexbox uses two axes:

- **Main axis:** The direction in which flex items are arranged.
- **Cross axis:** The direction perpendicular to the main axis.

With `flex-direction: row`, the main axis is horizontal and the cross axis is vertical.

The axes change when you change `flex-direction`.

## **3. Flex container properties**

These properties are applied to the parent element.

### **3.1&#x20;**`flex-direction`

Controls the direction in which items are arranged.

Possible values:

| Value            | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `row`            | Left to right in a left-to-right writing mode (default) |
| `row-reverse`    | Reverses the row direction                              |
| `column`         | Top to bottom                                           |
| `column-reverse` | Reverses the column direction                           |

**Interactive example:**

**flex-direction**

column

Item 1

Item 2

Item 3

Change the dropdown to see how item direction changes.

```
.container {
    display: flex;
    flex-direction: column;
}
```

This displays items vertically.

### **3.2&#x20;**`justify-content`

Controls how flex items are distributed **along the main axis**.

Possible values:

| Value           | Description                            |
| --------------- | -------------------------------------- |
| `flex-start`    | Items at the beginning (default)       |
| `flex-end`      | Items at the end                       |
| `center`        | Items centered                         |
| `space-between` | First and last items at opposite edges |
| `space-around`  | Equal space around each item           |
| `space-evenly`  | Equal spacing between items and edges  |

**Interactive example:**

**justify-content**

space-evenly

1

2

3

```
.container {
    display: flex;
    justify-content: space-between;
}
```

With `flex-direction: column`, `justify-content` controls vertical positioning instead.

### **3.3&#x20;**`align-items`

Controls how flex items are aligned **along the cross axis**.

Possible values:

| Value        | Description                                    |
| ------------ | ---------------------------------------------- |
| `stretch`    | Stretch items to fill the cross axis (default) |
| `flex-start` | Align at the beginning                         |
| `flex-end`   | Align at the end                               |
| `center`     | Center items                                   |
| `baseline`   | Align text baselines                           |

**Interactive example:**

iframe

flex-start

center

flex-end

stretch

baseline

```
.container {
    display: flex;
    align-items: center;
}
```

This is frequently used to vertically center elements in a horizontal flex container.

### **3.4&#x20;**`flex-wrap`

Controls whether items must remain on one line or can wrap onto multiple lines.

Possible values:

- `nowrap` — All items remain on one line (default).
- `wrap` — Items wrap onto additional lines.
- `wrap-reverse` — Items wrap in the opposite cross-axis direction.

**Interactive example:**

nowrapwrapwrap-reverse

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

```
.container {
    display: flex;
    flex-wrap: wrap;
}
```

This is useful for responsive card layouts.

### **3.5&#x20;**`gap`**,&#x20;**`row-gap`**, and&#x20;**`column-gap`

Controls the spacing between flex items.

```
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
```

You can specify different horizontal and vertical gaps:

```
.container {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 20px;
}
```

Unlike margins, `gap` does not add spacing outside the flex items at the container edges.

### **3.6&#x20;**`align-content`

Controls how **multiple flex lines** are distributed along the cross axis.

It only has a visible effect when multiple flex lines exist and there is extra cross-axis space.

Common values include `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`, and `stretch`.

```
.container {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    height: 300px;
}
```

**Important distinction:**

- `align-items` aligns items within their flex lines.
- `align-content` distributes the flex lines themselves.

### **3.7&#x20;**`flex-flow`

A shorthand combining `flex-direction` and `flex-wrap`.

```
.container {
    display: flex;
    flex-flow: row wrap;
}
```

Equivalent to:

```
.container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
```

## **4. Flex item properties**

These properties are applied to the children of the flex container, not to the container itself.

### **4.1&#x20;**`flex-grow`

Controls how much an item grows to occupy available free space.

```
.container {
    display: flex;
}

.item1 {
    flex-grow: 1;
}

.item2 {
    flex-grow: 2;
}

.item3 {
    flex-grow: 1;
}
```

**Interactive example:**

**Item 2 flex-grow**

2

Item 1

Item 2

Item 3

Items 1 and 3 each have `flex-grow: 1`. This demo uses zero flex-basis to make the proportions easier to see.

The `flex-grow` values determine how positive free space is divided. They do not necessarily determine the final width ratio, because the items' base sizes also matter.

### **4.2&#x20;**`flex-shrink`

Controls how much a flex item can shrink when there is insufficient space.

```
.item1 {
    flex-shrink: 1;
}

.item2 {
    flex-shrink: 0;
}
```

Here, `.item2` will not shrink due to Flexbox's shrinking algorithm.

The default is `flex-shrink: 1`.

Note that shrinkage also depends on the item's flex base size and minimum size. Flex items with long content may need `min-width: 0` to shrink as expected.

### **4.3&#x20;**`flex-basis`

Defines the initial main-axis size of an item before free space is distributed.

```
.item {
    flex-basis: 200px;
}
```

For a row layout, it generally controls the initial width. For a column layout, it generally controls the initial height.

### **4.4&#x20;**`flex`**&#x20;shorthand**

Combines three properties:

```
.item {
    flex: 1 1 200px;
}
```

Equivalent to:

```
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 200px;
}
```

Common values:

| Value             | Meaning                                              |
| ----------------- | ---------------------------------------------------- |
| `flex: 1`         | Grow and shrink, starting from a zero basis          |
| `flex: auto`      | `1 1 auto`                                           |
| `flex: none`      | `0 0 auto`                                           |
| `flex: 0 0 200px` | Fixed 200px flex basis, without growing or shrinking |

For most equal-width column layouts, `flex: 1` is convenient.

### **4.5&#x20;**`align-self`

Overrides the container's `align-items` property for one individual item.

```
.container {
    display: flex;
    align-items: flex-start;
    height: 200px;
}

.item2 {
    align-self: flex-end;
}
```

Item 1

Item 2

Item 3

Conceptually, Item 2 is aligned to the bottom of the flex container while the others stay at the top.

### **4.6&#x20;**`order`

Changes the visual order of flex items.

```
.item1 {
    order: 3;
}

.item2 {
    order: 1;
}

.item3 {
    order: 2;
}
```

Visual result: Item 2, Item 3, Item 1.

By default, all items have `order: 0`.

**Accessibility note:** `order` changes visual placement, not DOM or keyboard navigation order. Avoid using it to rearrange content in a way that makes keyboard navigation confusing.

## **5. Practical Flexbox examples**

### **Example 1: Center an element horizontally and vertically**

Centered element

```
<div class="container">
    <div class="box">Centered element</div>
</div>
```

```
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
}

.box {
    padding: 20px;
    background: lightblue;
}
```

This is one of the most common uses of Flexbox.

### **Example 2: Navigation bar**

**MyWebsite**

Home

About

Contact

```
<nav class="navbar">
    <div class="logo">MyWebsite</div>

    <div class="links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </div>
</nav>
```

```
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #1e293b;
}

.links {
    display: flex;
    gap: 20px;
}

.navbar a,
.logo {
    color: white;
}
```

`justify-content: space-between` pushes the logo and links to opposite sides.

### **Example 3: Sidebar and main content**

Sidebar

Navigation

**Main content**

Expands to fill remaining space

```
<div class="layout">
    <aside class="sidebar">Sidebar</aside>
    <main class="content">Main content</main>
</div>
```

```
.layout {
    display: flex;
    gap: 20px;
}

.sidebar {
    flex: 0 0 250px;
}

.content {
    flex: 1;
    min-width: 0;
}
```

The sidebar has a fixed flex basis of 250px, while the content uses the remaining space.

### **Example 4: Responsive cards**

Card 1

Card 2

Card 3

```
<div class="cards">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
</div>
```

```
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 250px;
    padding: 20px;
    background: lightblue;
}
```

Each card starts with a preferred basis of 250px, can grow, and can wrap to the next line when necessary.

### **Example 5: Push a button to the right**

```
<div class="toolbar">
    <span>Dashboard</span>
    <button>Logout</button>
</div>
```

```
.toolbar {
    display: flex;
    align-items: center;
}

.toolbar button {
    margin-left: auto;
}
```

**Dashboard**

Logout

`margin-left: auto` consumes available space before the button, pushing it to the right in a left-to-right row layout.

### **Example 6: Form with a flexible input**

```
<form class="search-form">
    <input type="text" placeholder="Search...">
    <button type="submit">Search</button>
</form>
```

```
.search-form {
    display: flex;
    gap: 10px;
}

.search-form input {
    flex: 1;
    min-width: 0;
}

.search-form button {
    flex: none;
}
```

Search

The input expands to occupy available width while the button retains its natural size.

## **6. Common Flexbox mistakes**

| Problem                                                          | Solution                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `justify-content` does not vertically center items               | Use `align-items: center` for a row                                      |
| `align-items: center` does not vertically center a column layout | Use `justify-content: center` with available height                      |
| Items overflow their container                                   | Try `flex-wrap: wrap`                                                    |
| A flexible item with long text refuses to shrink                 | Add `min-width: 0`                                                       |
| `align-content` has no visible effect                            | Ensure multiple lines exist and the container has extra cross-axis space |
| Items become narrower than expected                              | Check `flex-shrink` and `flex-basis`                                     |
| `height: 100%` doesn't work as expected                          | Ensure the parent has a definite height                                  |

## **7. Flexbox vs CSS Grid**

Both are modern CSS layout systems, but they serve different purposes.

**Flexbox**

1

2

3

Best for one-dimensional layouts (rows or columns).

**Grid**

1

2

3

4

5

6

Best for two-dimensional layouts (rows and columns together).

Use Flexbox for navigation bars, toolbars, buttons, forms, and content alignment. Use Grid when you need precise control over rows and columns simultaneously.

## **8. Flexbox quick reference**

| Property          | Applies to | Default                                      |
| ----------------- | ---------- | -------------------------------------------- |
| `display: flex`   | Container  | `block` for a div                            |
| `flex-direction`  | Container  | `row`                                        |
| `justify-content` | Container  | `normal` (usually behaves like `flex-start`) |
| `align-items`     | Container  | `normal` (usually behaves like `stretch`)    |
| `flex-wrap`       | Container  | `nowrap`                                     |
| `align-content`   | Container  | `normal`                                     |
| `gap`             | Container  | `normal` (effectively zero)                  |
| `flex-grow`       | Item       | `0`                                          |
| `flex-shrink`     | Item       | `1`                                          |
| `flex-basis`      | Item       | `auto`                                       |
| `align-self`      | Item       | `auto`                                       |
| `order`           | Item       | `0`                                          |

**The five properties worth learning first** are `display: flex`, `flex-direction`, `justify-content`, `align-items`, and `gap`. Once you understand those, `flex-wrap` and `flex: 1` cover most everyday Flexbox layouts.
