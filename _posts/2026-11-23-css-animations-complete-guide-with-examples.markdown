---
layout: post
title:  "CSS Animations - Complete Guide with Examples"
date:   2026-11-23 09:46:56
categories: PHP
description: CSS Animations - Complete Guide with Examples
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: CSS animations allow you to change the appearance, position, size, rotation, opacity, and other CSS properties of HTML elements over time, without requiring JavaScript.
---
CSS animations allow you to change the appearance, position, size, rotation, opacity, and other CSS properties of HTML elements over time, without requiring JavaScript.

They are useful for loading indicators, notifications, buttons, menus, progress bars, page transitions, and interactive effects.

CSS provides two main ways to animate elements:

- **CSS Transitions:** Animate changes between property values, usually triggered by a hover, focus, or class change.
- **CSS Keyframe Animations:** Define multiple animation stages using `@keyframes`, with control over timing, repetition, and direction.

## **1. Basic CSS animation using&#x20;**`@keyframes`

A CSS animation has two parts: a `@keyframes` rule that defines what changes, and an `animation` property that applies it to an element.

```
<div class="box"></div>
```

```
.box {
    width: 100px;
    height: 100px;
    background-color: blue;

    animation-name: changeColor;
    animation-duration: 3s;
}

@keyframes changeColor {
    from {
        background-color: blue;
    }

    to {
        background-color: red;
    }
}
```

The box changes from blue to red over three seconds. Because the default iteration count is `1` and the default fill mode is `none`, it returns to its original blue style after the animation finishes.

**Live example:**

iframe

## **2. CSS animation properties**

CSS provides several properties for controlling animations.

| Property                    | Description                           | Default   |
| --------------------------- | ------------------------------------- | --------- |
| `animation-name`            | Name of the `@keyframes` animation    | `none`    |
| `animation-duration`        | Time for one iteration                | `0s`      |
| `animation-timing-function` | Controls the animation's speed curve  | `ease`    |
| `animation-delay`           | Time before the animation begins      | `0s`      |
| `animation-iteration-count` | Number of repetitions                 | `1`       |
| `animation-direction`       | Direction of playback                 | `normal`  |
| `animation-fill-mode`       | Styles applied before/after animation | `none`    |
| `animation-play-state`      | Running or paused                     | `running` |

Let's examine them individually.

## **3.&#x20;**`animation-duration`

Controls how long one iteration takes.

```
.box {
    animation-name: move;
    animation-duration: 2s;
}

@keyframes move {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(200px);
    }
}
```

You can specify the duration in seconds (`s`) or milliseconds (`ms`).

```
animation-duration: 500ms;
animation-duration: 1s;
animation-duration: 2.5s;
```

**Interactive example:**

**Animation duration**

2.0s

iframe

A shorter duration produces faster movement over the same distance.

## **4.&#x20;**`animation-timing-function`

Controls how the animation progresses over time.

Possible values include:

| Value            | Description                                   |
| ---------------- | --------------------------------------------- |
| `linear`         | Constant speed                                |
| `ease`           | Slow start, faster middle, slow end (default) |
| `ease-in`        | Slow start                                    |
| `ease-out`       | Slow end                                      |
| `ease-in-out`    | Slow start and slow end                       |
| `steps(n)`       | Discrete jumps instead of continuous movement |
| `cubic-bezier()` | Custom timing curve                           |

**Interactive example:**

**Timing function**

ease-in-out

iframe

```
.box {
    animation: move 2s ease-in-out infinite alternate;
}
```

### **Custom&#x20;**`cubic-bezier()`

You can create custom easing curves:

```
.box {
    animation-timing-function:
        cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

The four values define two control points of a cubic Bézier curve. The first and third values (the x-coordinates) must be between 0 and 1. The y-coordinates can extend outside that range, producing overshoot effects.

## **5.&#x20;**`animation-delay`

Specifies how long to wait before an animation starts.

```
.box {
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-delay: 1s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
```

Here, the animation begins after one second.

Negative delays are also allowed:

```
animation-delay: -1s;
```

This makes the animation start as though it had already been running for one second.

## **6.&#x20;**`animation-iteration-count`

Controls how many times an animation repeats.

```
.box {
    animation: bounce 1s;
    animation-iteration-count: 3;
}
```

The animation runs three times.

For an infinite animation:

```
.box {
    animation: bounce 1s infinite;
}
```

Fractional iteration counts are also possible:

```
animation-iteration-count: 2.5;
```

The animation completes two full iterations and half of a third.

## **7.&#x20;**`animation-direction`

Controls the direction of animation playback.

| Value               | Description                 |
| ------------------- | --------------------------- |
| `normal`            | From first keyframe to last |
| `reverse`           | From last keyframe to first |
| `alternate`         | Forward, then backward      |
| `alternate-reverse` | Backward, then forward      |

```
.box {
    animation: move 2s infinite alternate;
}
```

This makes the box move forward and backward repeatedly.

**Animation direction**

alternate-reverse

iframe

## **8.&#x20;**`animation-fill-mode`

Controls which animation styles are applied before the animation starts and after it ends.

| Value       | Description                                               |
| ----------- | --------------------------------------------------------- |
| `none`      | No animation styles retained outside active playback      |
| `forwards`  | Retains styles from the final relevant keyframe           |
| `backwards` | Applies initial relevant keyframe styles during the delay |
| `both`      | Combines `forwards` and `backwards`                       |

Example:

```
.box {
    opacity: 0;
    animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
```

With `forwards`, the box stays visible after the animation finishes.

Without `forwards`, it would return to its underlying `opacity: 0` style.

Note that `forwards` does not permanently change the element's underlying CSS property value.

## **9.&#x20;**`animation-play-state`

Allows an animation to be paused or resumed.

Possible values:

```
animation-play-state: running;
animation-play-state: paused;
```

**Interactive example:**

iframe

&#x20;Pause animation

```
.box {
    animation: spin 2s linear infinite;
}

.box:hover {
    animation-play-state: paused;
}
```

This pauses the animation when the mouse is over the element.

## **10. The&#x20;**`animation`**&#x20;shorthand**

Instead of writing every animation property separately:

```
.box {
    animation-name: move;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
}
```

You can write:

```
.box {
    animation: move 2s ease-in-out 1s infinite alternate both running;
}
```

The shorthand can contain all these values, although some can appear in different orders.

**Important:** For time values, the first is interpreted as the duration and the second as the delay.

You can also run multiple animations on one element:

```
.box {
    animation:
        move 2s ease-in-out infinite alternate,
        changeColor 3s linear infinite alternate;
}
```

# **11. Practical CSS animation examples**

## **Example 1: Fade-in animation**

Useful for notifications, modal content, and elements appearing on a page.

iframe

```
<div class="message">Welcome to the website!</div>
```

```
.message {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
```

The live preview repeats the effect to demonstrate it; the code example plays once and retains its final state.

## **Example 2: Slide-in animation**

Useful for sidebars, menus, and notifications.

```
.notification {
    animation: slideIn 0.5s ease-out both;
}

@keyframes slideIn {
    from {
        transform: translateX(100px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

iframe

## **Example 3: Loading spinner**

A common animation for loading data from an API.

```
<div class="spinner"></div>
```

```
.spinner {
    width: 50px;
    height: 50px;

    border: 6px solid #ddd;
    border-top: 6px solid #2563eb;
    border-radius: 50%;

    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

iframe

For an accessible loading indicator, provide a status message that assistive technologies can understand.

## **Example 4: Bouncing ball**

```
<div class="ball"></div>
```

```
.ball {
    width: 60px;
    height: 60px;
    background: #2563eb;
    border-radius: 50%;

    animation: bounce 1s ease-in-out infinite alternate;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(100px);
    }
}
```

iframe

## **Example 5: Pulsing button**

Useful for drawing attention to an important action, but should be used sparingly.

```
<button class="pulse-button">Click me</button>
```

```
.pulse-button {
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: white;

    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.08);
    }
}
```

iframe

## **Example 6: Progress bar animation**

```
<div class="progress">
    <div class="progress-bar"></div>
</div>
```

```
.progress {
    width: 100%;
    height: 20px;
    background: #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background: #2563eb;

    animation: progress 3s ease-out forwards;
}

@keyframes progress {
    from {
        width: 0%;
    }

    to {
        width: 75%;
    }
}
```

iframe

This example demonstrates a visual effect. For real progress, update the bar according to actual task completion rather than relying on a fixed-duration animation.

## **Example 7: Shake animation for invalid form fields**

Useful for indicating validation errors, together with a visible error message.

```
.invalid {
    animation: shake 0.4s ease-in-out;
}

@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    75% {
        transform: translateX(8px);
    }
}
```

You can apply the class using JavaScript when validation fails:

```
const input = document.querySelector("#email");

input.classList.remove("invalid");

// Restart the animation.
void input.offsetWidth;

input.classList.add("invalid");
```

A shake animation should supplement, not replace, accessible validation text.

## **Example 8: Multiple keyframe stages**

Animations can have more than two stages.

```
.box {
    animation: complexAnimation 4s infinite;
}

@keyframes complexAnimation {
    0% {
        transform: translateX(0) rotate(0deg);
        background: blue;
    }

    25% {
        transform: translateX(100px) rotate(90deg);
        background: green;
    }

    50% {
        transform: translateX(100px) translateY(100px)
                   rotate(180deg);
        background: yellow;
    }

    75% {
        transform: translateY(100px) rotate(270deg);
        background: orange;
    }

    100% {
        transform: translateX(0) rotate(360deg);
        background: blue;
    }
}
```

The percentages represent positions in the animation timeline, not percentages of distance.

For a four-second animation, 25% corresponds to one second and 75% corresponds to three seconds.

# **12. CSS transitions vs CSS animations**

CSS transitions and CSS animations are related, but they behave differently.

| Feature                    | CSS Transition              | CSS Animation                 |
| -------------------------- | --------------------------- | ----------------------------- |
| Requires `@keyframes`      | No                          | Yes                           |
| Multiple stages            | Not directly                | Yes                           |
| Repetition                 | No built-in iteration count | Yes                           |
| Direction control          | Limited                     | Yes                           |
| Triggered by state changes | Typically                   | Can be                        |
| Automatic playback         | Requires property change    | Yes                           |
| Best for                   | Hover, focus, toggles       | Loaders, entrances, sequences |

### **Transition example: Hover button**

```
<button class="button">Hover me</button>
```

```
.button {
    background: #2563eb;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;

    transition:
        background-color 0.3s ease,
        transform 0.3s ease;
}

.button:hover {
    background: #1d4ed8;
    transform: scale(1.1);
}
```

iframe

The transition starts when the button is hovered and reverses when the pointer leaves.

For ordinary button hover effects, transitions are generally simpler than keyframe animations.

## **13. Animating&#x20;**`transform`

The `transform` property is one of the most useful properties for CSS animations.

It supports translation, rotation, scaling, and skewing.

### **Translate**

Moves an element.

```
@keyframes move {
    to {
        transform: translateX(100px);
    }
}
```

### **Rotate**

Rotates an element.

```
@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
```

### **Scale**

Changes the visual size.

```
@keyframes zoom {
    to {
        transform: scale(1.5);
    }
}
```

### **Skew**

Slants an element.

```
@keyframes skew {
    to {
        transform: skewX(20deg);
    }
}
```

### **Combining transformations**

```
@keyframes transformExample {
    from {
        transform: translateX(0) rotate(0deg) scale(1);
    }

    to {
        transform: translateX(100px)
                   rotate(180deg)
                   scale(1.2);
    }
}
```

Transform functions are applied in order, so changing their order can change the result.

## **14. CSS animation performance**

Not all CSS properties are equally efficient to animate.

In general, animations involving `transform` and `opacity` are more likely to run smoothly because browsers can often process them without recalculating layout.

| Property             | Typical performance characteristics |
| -------------------- | ----------------------------------- |
| `transform`          | Usually efficient                   |
| `opacity`            | Usually efficient                   |
| `width` / `height`   | Can trigger layout recalculation    |
| `top` / `left`       | Can trigger layout recalculation    |
| `margin` / `padding` | Can trigger layout recalculation    |
| `box-shadow`         | Can require repainting              |
| `background-color`   | Usually requires painting           |

For example, prefer:

```
@keyframes move {
    to {
        transform: translateX(200px);
    }
}
```

Over:

```
@keyframes move {
    to {
        left: 200px;
    }
}
```

when you only need to move an element visually.

The `left` property changes positioning and may require layout work, whereas `transform` generally avoids layout recalculation.

You can also use:

```
.box {
    will-change: transform;
}
```

However, use `will-change` selectively. Applying it to many elements unnecessarily can increase memory usage.

## **15. Accessibility:&#x20;**`prefers-reduced-motion`

Some users configure their operating system to reduce animations.

CSS provides a media query to respect this preference.

```
@media (prefers-reduced-motion: reduce) {
    .animated-element {
        animation: none;
        transition: none;
    }
}
```

You can also keep essential state changes while removing unnecessary movement:

```
@media (prefers-reduced-motion: reduce) {
    .animated-element {
        animation-duration: 0.01ms;
        animation-iteration-count: 1;
    }
}
```

The second technique can be useful when an application depends on animation completion events, although removing that dependency is preferable where possible.

## **16. Advanced: Scroll-driven animations**

Modern CSS also supports animations whose progress is driven by scrolling rather than elapsed time.

For example:

```
.progress-indicator {
    animation: grow linear both;
    animation-timeline: scroll(root);
}

@keyframes grow {
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
}
```

This can create a reading-progress indicator that grows as the user scrolls.

Browser support and behavior vary, so test scroll-driven animations in your target browsers and provide an appropriate fallback.

## **17. CSS animations quick reference**

| Goal                      | CSS technique                                     |
| ------------------------- | ------------------------------------------------- |
| Fade in                   | Animate `opacity` from 0 to 1                     |
| Slide in                  | Animate `transform: translateX()`                 |
| Rotate                    | Animate `transform: rotate()`                     |
| Zoom                      | Animate `transform: scale()`                      |
| Bounce                    | Animate `translateY()` with alternating direction |
| Repeat forever            | `animation-iteration-count: infinite`             |
| Delay start               | `animation-delay`                                 |
| Reverse playback          | `animation-direction: reverse`                    |
| Move back and forth       | `animation-direction: alternate`                  |
| Keep final keyframe style | `animation-fill-mode: forwards`                   |
| Pause animation           | `animation-play-state: paused`                    |
| Custom easing             | `cubic-bezier()`                                  |
| Animate discrete steps    | `steps()`                                         |
| Animate multiple effects  | Comma-separated `animation` values                |

## **18. Five CSS animation patterns worth remembering**

**Fade in:**

```
.element {
    animation: fadeIn 0.5s ease-out both;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
```

**Slide in:**

```
.element {
    animation: slideIn 0.5s ease-out both;
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
}
```

**Rotate continuously:**

```
.element {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**Pulse:**

```
.element {
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.1); }
}
```

**Hover transition:**

```
.element {
    transition: transform 0.3s ease;
}

.element:hover {
    transform: scale(1.05);
}
```

**Key takeaway:** Use CSS transitions for simple state changes such as hover and focus. Use `@keyframes` animations when you need multiple stages, automatic playback, repetition, or more precise control over an animation's timing and direction. For smooth animations, prefer `transform` and `opacity` whenever practical.
