---
layout: post
title:  "CSS Grid - Complete Guide with Examples"
date:   2026-11-23 08:46:56
categories: PHP
description: CSS Grid - Complete Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: CSS Grid Layout is a powerful CSS layout system that allows you to arrange HTML elements into rows and columns simultaneously.
---
CSS Grid Layout is a powerful CSS layout system that allows you to arrange HTML elements into **rows and columns simultaneously**.

Unlike Flexbox, which primarily works in one dimension (a row or a column), CSS Grid is designed for **two-dimensional layouts**.

CSS Grid is particularly useful for:

- Website layouts with headers, sidebars, content, and footers.
- Responsive card layouts.
- Dashboards and admin interfaces.
- Image galleries.
- Forms with multiple columns.
- Complex layouts with elements spanning multiple rows or columns.

## **1. What is&#x20;**`display: grid`**?**

When you apply `display: grid` to an HTML element, it becomes a **grid container**, and its direct children become **grid items**.

### **Basic example**

```
<div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
    <div class="item">Item 5</div>
    <div class="item">Item 6</div>
</div>
```

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.item {
    padding: 20px;
    background-color: lightblue;
    border: 1px solid blue;
    text-align: center;
}
```

**Result:**

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

The CSS:

```
grid-template-columns: repeat(3, 1fr);
```

creates three columns of equal width.

The six elements are automatically arranged into two rows.

## **2. Understanding the CSS Grid structure**

CSS Grid consists of several important concepts:

- **Grid container:** The parent element with `display: grid`.
- **Grid item:** A direct child of the grid container.
- **Grid track:** A row or column.
- **Grid cell:** The intersection of a row and column.
- **Grid line:** A boundary separating tracks.
- **Grid area:** A rectangular region containing one or more cells.
- **Grid gap:** Space between rows or columns.

The numbered boundaries are grid lines. The highlighted cell is in row 1, column 2.

CSS Grid uses numbered grid lines to position and resize items.

For a grid with three columns, there are four vertical grid lines.

## **3. Grid container properties**

These properties are applied to the parent element.

### **3.1&#x20;**`grid-template-columns`

Defines the number and sizes of columns.

**Example 1: Three equal columns**

```
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```

Equivalent to:

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

The `fr` unit represents a fraction of the available space.

**Example 2: Columns with different widths**

```
.container {
    display: grid;
    grid-template-columns: 100px 200px 100px;
}
```

**Example 3: Mixed fixed and flexible columns**

```
.container {
    display: grid;
    grid-template-columns: 250px 1fr;
}
```

This creates a fixed-width sidebar and a flexible main content area.

**Interactive example:**

**Number of columns**

2 columns

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

CSS: grid-template-columns: repeat(2, 1fr);

### **3.2&#x20;**`grid-template-rows`

Defines the sizes of explicitly declared rows.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 200px;
}
```

This creates:

- Three equal-width columns.
- A first row with a height of 100px.
- A second row with a height of 200px.

You can also use fractional units:

```
.container {
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    height: 400px;
}
```

The middle row receives twice the available fractional space of either outer row.

### **3.3&#x20;**`gap`**,&#x20;**`row-gap`**, and&#x20;**`column-gap`

Controls the spacing between grid cells.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

You can define separate gaps:

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    row-gap: 10px;
    column-gap: 30px;
}
```

Or use the shorthand:

```
.container {
    gap: 10px 30px;
}
```

The first value is the row gap, and the second is the column gap.

**Interactive example:**

**Grid gap**

8px

iframe

### **3.4&#x20;**`repeat()`

The `repeat()` function makes it easier to define repeated tracks.

Instead of:

```
grid-template-columns: 1fr 1fr 1fr 1fr;
```

You can write:

```
grid-template-columns: repeat(4, 1fr);
```

You can also repeat patterns:

```
grid-template-columns: repeat(3, 100px 200px);
```

This creates six columns:

`100px 200px 100px 200px 100px 200px`

### **3.5&#x20;**`minmax()`

Defines a minimum and maximum size for a grid track.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
}
```

Each column has a minimum track size of 150px and can expand to share available space.

Another useful example:

```
.container {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
}
```

This creates a fixed sidebar and a flexible content area that is allowed to shrink below its content's intrinsic minimum width.

### **3.6&#x20;**`auto-fit`**&#x20;and&#x20;**`auto-fill`

These keywords are commonly used with `repeat()` and `minmax()` to create responsive layouts.

**Example using&#x20;**`auto-fit`**:**

```
.container {
    display: grid;
    grid-template-columns: repeat(
        auto-fit,
        minmax(200px, 1fr)
    );
    gap: 20px;
}
```

The browser automatically determines how many columns can fit in the available width.

**Difference between&#x20;**`auto-fit`**&#x20;and&#x20;**`auto-fill`**:**

- `auto-fit`: Collapses empty repeated tracks so existing items can expand.
- `auto-fill`: Keeps empty repeated tracks, reserving their space.

**auto-fit**

Item 1

Item 2

**auto-fill**

Item 1

Item 2

Empty

Empty

Conceptual comparison when the container can fit four tracks but contains only two items.

For most responsive card layouts, `auto-fit` is a convenient choice.

### **3.7&#x20;**`justify-items`

Controls the horizontal alignment of items inside their grid areas in the usual horizontal writing mode.

Possible values include:

| Value     | Description                                              |
| --------- | -------------------------------------------------------- |
| `start`   | Align items to the start                                 |
| `end`     | Align items to the end                                   |
| `center`  | Center items                                             |
| `stretch` | Stretch items to fill available width (default behavior) |

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
}
```

1

2

3

### **3.8&#x20;**`align-items`

Controls the vertical alignment of items inside their grid areas in the usual horizontal writing mode.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 150px;
    align-items: center;
}
```

Possible values include `start`, `end`, `center`, and `stretch`.

### **3.9&#x20;**`place-items`

Shorthand for `align-items` and `justify-items`.

```
.container {
    display: grid;
    place-items: center;
}
```

Equivalent to:

```
.container {
    display: grid;
    align-items: center;
    justify-items: center;
}
```

This is particularly useful for centering content.

### **3.10&#x20;**`justify-content`**,&#x20;**`align-content`**, and&#x20;**`place-content`

These properties align the **entire grid track structure** within the container when extra space is available.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    width: 600px;
    justify-content: center;
}
```

The three 100px columns are centered within the 600px container.

```
.container {
    display: grid;
    grid-template-rows: repeat(2, 100px);
    height: 400px;
    align-content: center;
}
```

The two rows are centered vertically.

You can combine both:

```
.container {
    display: grid;
    place-content: center;
}
```

**Important:** `justify-items` aligns individual items within their cells, while `justify-content` aligns the grid tracks as a group.

### **3.11&#x20;**`grid-auto-flow`

Controls how automatically placed grid items are arranged.

Possible values:

| Value          | Description                              |
| -------------- | ---------------------------------------- |
| `row`          | Fill rows first (default)                |
| `column`       | Fill columns first                       |
| `row dense`    | Fill row-oriented gaps where possible    |
| `column dense` | Fill column-oriented gaps where possible |

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
}
```

The `dense` keyword may visually place later elements into earlier empty cells. Be careful because the visual order may differ from keyboard navigation and reading order.

### **3.12&#x20;**`grid-auto-rows`**&#x20;and&#x20;**`grid-auto-columns`

Controls the sizes of implicitly created grid tracks.

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 150px;
}
```

Any automatically created rows will have a height of 150px.

Another useful option:

```
.container {
    grid-auto-rows: minmax(100px, auto);
}
```

Rows have a minimum height of 100px but can grow to accommodate content.

## **4. Grid item properties**

These properties are applied to individual children of the grid container.

### **4.1&#x20;**`grid-column`

Controls which columns an item occupies.

```
.item1 {
    grid-column: 1 / 3;
}
```

This means the item starts at vertical grid line 1 and ends at line 3, spanning two columns.

You can also use:

```
.item1 {
    grid-column: span 2;
}
```

**Interactive example:**

**Item 1 column span**

2 columns

Item 1

Item 2

Item 3

Item 4

Item 5

Item 6

CSS: grid-column: span 2;

### **4.2&#x20;**`grid-row`

Controls which rows an item occupies.

```
.item1 {
    grid-row: 1 / 3;
}
```

The item spans two rows.

Alternatively:

```
.item1 {
    grid-row: span 2;
}
```

Item 1

2 rows

Item 2

Item 3

Item 4

Item 5

### **4.3&#x20;**`grid-area`

The `grid-area` property can specify an item's row and column positions in one declaration.

```
.item1 {
    grid-area: 1 / 1 / 3 / 3;
}
```

The four values represent:

```
grid-area:
    row-start /
    column-start /
    row-end /
    column-end;
```

This item spans two rows and two columns.

You can also assign a name:

```
.header {
    grid-area: header;
}
```

Named areas are especially useful for website layouts.

### **4.4&#x20;**`justify-self`

Overrides horizontal item alignment for an individual grid item.

```
.container {
    display: grid;
    justify-items: start;
}

.item2 {
    justify-self: end;
}
```

Only `.item2` is aligned to the end of its grid area.

### **4.5&#x20;**`align-self`

Overrides vertical item alignment for one item.

```
.container {
    display: grid;
    align-items: start;
}

.item2 {
    align-self: end;
}
```

### **4.6&#x20;**`place-self`

Combines `align-self` and `justify-self`.

```
.item2 {
    place-self: center;
}
```

Equivalent to:

```
.item2 {
    align-self: center;
    justify-self: center;
}
```

## **5.&#x20;**`grid-template-areas`

One of CSS Grid's most useful features is the ability to define layouts using named areas.

### **Example: Complete website layout**

Header

Sidebar

**Main Content**

Footer

```
<div class="layout">
    <header>Header</header>
    <aside>Sidebar</aside>
    <main>Main Content</main>
    <footer>Footer</footer>
</div>
```

```
.layout {
    display: grid;

    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";

    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;

    gap: 20px;
    min-height: 100vh;
}

header {
    grid-area: header;
}

aside {
    grid-area: sidebar;
}

main {
    grid-area: main;
    min-width: 0;
}

footer {
    grid-area: footer;
}
```

The layout consists of:

- A header spanning both columns.
- A sidebar with a width of 250px.
- A flexible main content section.
- A footer spanning both columns.

You can make the layout responsive:

```
@media (max-width: 768px) {
    .layout {
        grid-template-areas:
            "header"
            "sidebar"
            "main"
            "footer";

        grid-template-columns: 1fr;
    }
}
```

On smaller screens, all sections appear vertically.

## **6. Practical CSS Grid examples**

### **Example 1: Responsive card layout**

One of the most common CSS Grid use cases.

```
<div class="cards">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
    <div class="card">Card 5</div>
    <div class="card">Card 6</div>
</div>
```

```
.cards {
    display: grid;

    grid-template-columns:
        repeat(auto-fit, minmax(min(100%, 250px), 1fr));

    gap: 20px;
}

.card {
    padding: 30px;
    background: lightblue;
    border-radius: 8px;
}
```

Card 1

Card 2

Card 3

Card 4

Card 5

Card 6

The browser automatically adjusts the number of columns based on available width.

The `min(100%, 250px)` expression also helps prevent overflow in very narrow containers.

### **Example 2: Dashboard layout**

CSS Grid is especially useful for dashboards.

Users

## **1,250**

Revenue

## **$8,500**

Orders

## **340**

**Analytics chart**

Activity

```
<div class="dashboard">
    <div class="stat">Users</div>
    <div class="stat">Revenue</div>
    <div class="stat">Orders</div>

    <div class="chart">Analytics Chart</div>
    <div class="activity">Recent Activity</div>
</div>
```

```
.dashboard {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}

.stat {
    padding: 20px;
    background: lightblue;
}

.chart {
    grid-column: span 2;
    min-width: 0;
}

.activity {
    grid-column: span 1;
}
```

This is a typical admin dashboard structure.

### **Example 3: Image gallery**

```
<div class="gallery">
    <img src="image1.jpg" alt="Image 1">
    <img src="image2.jpg" alt="Image 2">
    <img src="image3.jpg" alt="Image 3">
    <img src="image4.jpg" alt="Image 4">
</div>
```

```
.gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.gallery img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
```

[Canada Needs More Climbing Arborists - News - Arbtalk | The Social Network For Arborists](https://images.openai.com/static-rsc-4/ZdLAi0RKbJO9NtKjDGyf9XgNWobwAHpkpoTWi4Lvo2Nw84BA_wtqu7KGMD04kQmiqdBk5o0PdmdsLT9k0887mUUaQBmSayK7eFItciZBGphKHtxw9XeWoLzzMxsl6gxCc4DppXpxbxTVGvxZBUrgTaKvNSwSQlMd3KFBKH8WAnE?purpose=inline)

[Discovering the Essentials of Soap Bar Ingredients  | Watermark Body Care™](https://images.openai.com/static-rsc-4/L0oBnx1X8pKR8YGiznoLkAoaXKVhEqe-DHweEEzvqe_w80iYg68rSPZ5aSwydxaEnEZOA7dOb0NtQV6bI4b2ZUmgC9fuIZV3fQZe5uecbV8fGnVEhG-47iK2KDRl0TU3x9_vJQeZReIIK0hkGc1I0Kmaa4r5VKj7Jbdomjf9BUQ?purpose=inline)

[Surfness Lodge, Baleal (updated prices 2026)](https://images.openai.com/static-rsc-4/qmQsTpQ7mRYsIG5lYZk5I57Ih_JtEpo24koHAJgbzsd7GwOmdDk_yLsn-G9aOxqbIzSfnUamOU62WlJf1gWpVV32qr6BkupJ9hf3TDXys1EgVcQCIvmxbdkANMViPoW3nGeDhsGDTC0au_1pLFsBvwi4QOSwQXeWQrbMr74QqaE?purpose=inline)

[Dunes de sable pendant la journée photo – Image gratuite de Sable sur Unsplash](https://images.openai.com/static-rsc-4/kQoqoJT-ivE9mpsg9dHv6jTvkl7nw1aceHBcCF9-S8HlQN5HuOKrHfHvw1JQ94vs6OOg_70EUCrHwzJdsFmYeVSgv9JPWFCUT8Ewbq32U8TDJ7-3N6ApDuKdI98CpNGJc1v1Cs77jSM5_NMJcKiMVylec14xaugwHTpM45czCqE?purpose=inline)

### **Example 4: Form with two columns**

```
<form class="form-grid">
    <label>
        First name
        <input type="text">
    </label>

    <label>
        Last name
        <input type="text">
    </label>

    <label>
        Email
        <input type="email">
    </label>

    <label>
        Phone
        <input type="tel">
    </label>

    <button type="submit">Submit</button>
</form>
```

```
.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

.form-grid label {
    display: grid;
    gap: 6px;
}

.form-grid input {
    width: 100%;
    box-sizing: border-box;
}

.form-grid button {
    grid-column: 1 / -1;
}

@media (max-width: 600px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
```

First name

Last name

Email

Phone

SubmitVisual preview of the two-column form layout.

The submit button spans both columns.

### **Example 5: Center an element**

CSS Grid provides a very simple way to center an element horizontally and vertically.

```
<div class="container">
    <div class="box">Centered element</div>
</div>
```

```
.container {
    display: grid;
    place-items: center;
    height: 300px;
}

.box {
    padding: 20px;
    background: lightblue;
}
```

Centered element

### **Example 6: Complex layout with spanning items**

You can combine `grid-column` and `grid-row` to create more complex layouts.

```
<div class="grid-layout">
    <div class="item item1">1</div>
    <div class="item item2">2</div>
    <div class="item item3">3</div>
    <div class="item item4">4</div>
    <div class="item item5">5</div>
</div>
```

```
.grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
}

.item1 {
    grid-column: span 2;
}

.item2 {
    grid-row: span 2;
}

.item3 {
    grid-row: span 2;
}
```

1 — spans 2 columns

2

3

4

5

The exact arrangement depends on both explicit placement and the grid auto-placement algorithm.

## **7. CSS Grid vs Flexbox**

Both are useful, but they solve different layout problems.

| Feature                         | Flexbox                | Grid            |
| ------------------------------- | ---------------------- | --------------- |
| Primary layout model            | One-dimensional        | Two-dimensional |
| Rows and columns together       | Limited                | Excellent       |
| Aligning buttons and navigation | Excellent              | Good            |
| Complex page layouts            | Possible               | Excellent       |
| Responsive cards                | Good                   | Excellent       |
| Item spanning rows/columns      | No grid-style spanning | Yes             |
| Content-based distribution      | Excellent              | Good            |
| Explicit placement              | Limited                | Excellent       |

**Flexbox example:**

```
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

Best suited for a navigation bar or toolbar.

**Grid example:**

```
.container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
}
```

Best suited for a sidebar and main content layout.

You can also combine them:

```
.page {
    display: grid;
    grid-template-columns: 250px 1fr;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

This is common in real-world applications: Grid manages the overall page structure, while Flexbox aligns elements inside individual sections.

## **8. Common CSS Grid mistakes**

| Problem                                        | Solution                                          |
| ---------------------------------------------- | ------------------------------------------------- |
| Grid items overflow their columns              | Use `minmax(0, 1fr)` or `min-width: 0`            |
| Columns do not resize responsively             | Use `auto-fit` with `minmax()`                    |
| `justify-content` appears to do nothing        | The tracks may already occupy all available width |
| `align-items` does not center the whole grid   | Use `align-content` or `place-content`            |
| A grid item does not span the expected columns | Check `grid-column` start/end lines               |
| Grid rows have unexpected heights              | Check `grid-auto-rows` and content sizing         |
| `grid-template-areas` does not work            | Ensure named areas form valid rectangles          |
| Elements appear in unexpected positions        | Check explicit placement and `grid-auto-flow`     |

## **9. CSS Grid quick reference**

### **Container properties**

| Property                | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `display: grid`         | Enables CSS Grid                             |
| `grid-template-columns` | Defines columns                              |
| `grid-template-rows`    | Defines rows                                 |
| `grid-template-areas`   | Defines named layout areas                   |
| `gap`                   | Spacing between tracks                       |
| `row-gap`               | Vertical spacing between rows                |
| `column-gap`            | Horizontal spacing between columns           |
| `justify-items`         | Aligns items along the inline axis           |
| `align-items`           | Aligns items along the block axis            |
| `place-items`           | Shorthand for both item alignments           |
| `justify-content`       | Aligns the grid tracks along the inline axis |
| `align-content`         | Aligns the grid tracks along the block axis  |
| `place-content`         | Shorthand for both content alignments        |
| `grid-auto-flow`        | Controls automatic placement                 |
| `grid-auto-rows`        | Sizes implicit rows                          |
| `grid-auto-columns`     | Sizes implicit columns                       |

### **Item properties**

| Property            | Purpose                                |
| ------------------- | -------------------------------------- |
| `grid-column-start` | Starting column line                   |
| `grid-column-end`   | Ending column line                     |
| `grid-column`       | Shorthand for column placement         |
| `grid-row-start`    | Starting row line                      |
| `grid-row-end`      | Ending row line                        |
| `grid-row`          | Shorthand for row placement            |
| `grid-area`         | Grid area name or line-based placement |
| `justify-self`      | Individual inline-axis alignment       |
| `align-self`        | Individual block-axis alignment        |
| `place-self`        | Shorthand for individual alignment     |

## **10. Most useful CSS Grid patterns**

These are the patterns worth remembering for everyday development.

**Three equal columns:**

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

**Responsive columns without media queries:**

```
.container {
    display: grid;
    grid-template-columns:
        repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: 20px;
}
```

**Fixed sidebar with flexible content:**

```
.container {
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
    gap: 20px;
}
```

**Center an element:**

```
.container {
    display: grid;
    place-items: center;
    min-height: 100vh;
}
```

**Make an item span all columns:**

```
.item {
    grid-column: 1 / -1;
}
```

**Two-column layout on desktop, one column on mobile:**

```
.container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
```

**Key takeaway:** For most modern web applications, the combination of `display: grid`, `grid-template-columns`, `repeat()`, `minmax()`, `gap`, and `grid-column` is enough to build a wide range of responsive layouts.
