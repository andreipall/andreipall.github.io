---
layout: post
title:  "GTK+ Memory Management Explained"
date:   2026-11-08 12:46:56
categories: C
description: GTK+ Memory Management Explained
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: GTK+ uses a memory management system based primarily on reference counting, provided by the GLib Object System (GObject).
---
GTK+ uses a memory management system based primarily on **reference counting**, provided by the GLib Object System (GObject).

Unlike languages such as Java or Python, GTK+ does not use a traditional
garbage collector. Instead, objects are explicitly managed through
reference counts, object ownership, and destruction.

Understanding this system is essential when developing GTK applications
in C because incorrect memory management can cause:

-   Memory leaks (memory that is never released).
-   Invalid memory access (use-after-free).
-   Double freeing (releasing the same object incorrectly).
-   Crashes when widgets are destroyed.

Let's explore how it works, with practical C examples.

## 1. The basic concept: reference counting

Every GObject-based GTK object maintains a reference count.

The reference count indicates how many active references keep an object
alive.

There are three important operations:

  -----------------------------------------------------------------------
  Function                            Purpose
  ----------------------------------- -----------------------------------
  `g_object_ref()`                    Increases the reference count.

  `g_object_unref()`                  Decreases the reference count.

  `g_object_ref_sink()`               Acquires a normal reference,
                                      consuming a floating reference if
                                      one exists.
  -----------------------------------------------------------------------

When the reference count reaches zero, the object is finalized and its
memory is released.

### Example 1: Creating and destroying a GObject

``` c
#include <glib-object.h>

int main(void)
{
    GObject *obj;

    /* Create an object */
    obj = g_object_new(G_TYPE_OBJECT, NULL);

    /* Reference count is initially 1 */

    /* Increase reference count */
    g_object_ref(obj);

    /* Reference count is now 2 */

    /* Decrease reference count */
    g_object_unref(obj);

    /* Reference count is now 1 */

    /* Release the final reference */
    g_object_unref(obj);

    /* Object is now finalized */

    return 0;
}
```

**What happens?**

1.  Object created --- reference count: 1.
2.  Call `g_object_ref()` --- reference count: 2.
3.  Call `g_object_unref()` --- reference count: 1.
4.  Call `g_object_unref()` again --- reference count: 0.
5.  Object finalized --- memory released.

## 2. Floating references: an important GTK+ concept

One of the most important differences between ordinary GObjects and GTK
widgets is the concept of a **floating reference**.

Most GTK widgets are derived from `GInitiallyUnowned`.

When you create a widget, its initial reference is floating rather than
a normal owned reference.

For example:

``` c
GtkWidget *button;

button = gtk_button_new_with_label("Click Me");
```

The button has an initial floating reference.

Why is this useful?

Because GTK widgets are usually organized in a hierarchy:

``` text
GtkWindow
   |
   +-- GtkBox
         |
         +-- GtkButton
         |
         +-- GtkLabel
```

The parent widget takes ownership of its children.

### Example 2: Adding a button to a container (GTK3)

``` c
GtkWidget *window;
GtkWidget *button;

window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

button = gtk_button_new_with_label("Click Me");

/* The container takes ownership of the floating reference */
gtk_container_add(GTK_CONTAINER(window), button);
```

Here is what happens:

1.  `gtk_button_new_with_label()` creates the button with a floating
    reference.
2.  `gtk_container_add()` adds the button to the window.
3.  The container sinks the floating reference.
4.  The parent now owns the button's reference.
5.  When the parent releases its ownership, the child can be destroyed
    if no other references exist.

**Important:** You normally do not need to call `g_object_unref(button)`
after adding a newly created widget to a GTK3 container.

Doing so would release the reference now owned by the parent.

### What if you want to keep your own reference?

Suppose you want to access the button later, independently of its
parent.

You can acquire another reference:

``` c
GtkWidget *button;

button = gtk_button_new_with_label("Click Me");

/* Acquire your own reference */
g_object_ref_sink(button);

/* Add it to the container */
gtk_container_add(GTK_CONTAINER(window), button);
```

Now the reference ownership is:

-   Your application owns one reference.
-   The parent container owns another reference.

When you no longer need your own reference:

``` c
g_object_unref(button);
```

The button can still exist because its parent owns a reference.

------------------------------------------------------------------------

## 3. Parent-child ownership and widget destruction

GTK uses a hierarchical widget structure.

Generally, a parent widget maintains references to its children.

When a parent is destroyed or releases its children, those references
are released.

Consider:

``` text
Window
  |
  +-- Vertical Box
        |
        +-- Button
        |
        +-- Label
```

If the window and its widget hierarchy are no longer needed, GTK
releases the references held by the hierarchy.

However, an important distinction exists between GTK3 and GTK4.

  -----------------------------------------------------------------------
  GTK version                         Widget removal and destruction
  ----------------------------------- -----------------------------------
  GTK3                                Uses `gtk_container_remove()` and
                                      `gtk_widget_destroy()` patterns.

  GTK4                                Uses widget unparenting and
                                      reference management;
                                      `gtk_widget_destroy()` is no longer
                                      available.
  -----------------------------------------------------------------------

### Example 3: GTK3 widget destruction

``` c
GtkWidget *window;
GtkWidget *button;

window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

button = gtk_button_new_with_label("Hello");

gtk_container_add(GTK_CONTAINER(window), button);

/* Destroy the window */
gtk_widget_destroy(window);
```

Destroying the window also destroys its widget hierarchy.

### Example 4: GTK4 widget ownership

GTK4 uses APIs such as `gtk_window_set_child()`:

``` c
GtkWidget *window;
GtkWidget *button;

window = gtk_window_new();

button = gtk_button_new_with_label("Hello");

/* The window takes ownership of the child */
gtk_window_set_child(GTK_WINDOW(window), button);
```

When you remove a child from its parent using GTK4's widget APIs, the
parent releases its ownership.

If another strong reference exists, the widget remains alive.

See the [GTK4 Common
Questions](https://docs.gtk.org/gtk4/question_index.html) for further
details.

------------------------------------------------------------------------

## 4. Memory management of ordinary allocated memory

Not everything in GTK is a GObject.

For ordinary dynamically allocated memory, GLib provides:

-   `g_malloc()`
-   `g_malloc0()`
-   `g_strdup()`
-   `g_free()`

These functions are similar to the standard C functions `malloc()`,
`calloc()`, `strdup()`, and `free()`.

### Example 5: Allocating and freeing a string

``` c
#include <glib.h>
#include <stdio.h>

int main(void)
{
    gchar *name;

    /* Allocate memory */
    name = g_strdup("GTK Memory Management");

    printf("%s\\n", name);

    /* Release allocated memory */
    g_free(name);

    return 0;
}
```

**Important distinction:**

``` c
g_object_unref(object);
```

is used for reference-counted GObjects.

``` c
g_free(memory);
```

is used for memory allocated with GLib allocation functions.

Never interchange these functions.

------------------------------------------------------------------------

## 5. The difference between dispose() and finalize()

When a GObject's reference count reaches zero, its destruction happens
in two important stages.

### Stage 1: dispose()

The `dispose()` method releases references to other objects owned by the
object.

For example, suppose a custom GTK object contains a reference to another
GObject.

During disposal, it should release that reference.

### Stage 2: finalize()

The `finalize()` method releases the remaining resources associated with
the object, such as allocated memory.

The general lifecycle is:

1.  Object is created.
2.  Object is used; references are acquired and released.
3.  Reference count reaches zero.
4.  `dispose()` releases references to other objects.
5.  `finalize()` releases remaining allocated resources.
6.  Object memory is released.

### Example 6: Implementing dispose() and finalize()

Imagine a custom GObject containing a reference to another object and an
allocated string.

``` c
typedef struct {
    GObject parent_instance;

    GObject *child;
    gchar *name;

} MyObject;
```

The disposal and finalization methods could look like this:

``` c
static void
my_object_dispose(GObject *object)
{
    MyObject *self = (MyObject *)object;

    /* Release reference to child */
    g_clear_object(&self->child);

    G_OBJECT_CLASS(my_object_parent_class)->dispose(object);
}

static void
my_object_finalize(GObject *object)
{
    MyObject *self = (MyObject *)object;

    /* Release allocated string */
    g_free(self->name);

    G_OBJECT_CLASS(my_object_parent_class)->finalize(object);
}
```

Notice the use of:

``` c
g_clear_object(&self->child);
```

This releases the object's reference and sets its pointer to `NULL`.

The distinction between disposal and finalization is important because
`dispose()` can be called more than once, whereas `finalize()` is called
only once.

------------------------------------------------------------------------

## 6. Signal callbacks and memory management

GTK applications frequently use signals to respond to user actions.

For example:

``` c
g_signal_connect(
    button,
    "clicked",
    G_CALLBACK(on_button_clicked),
    NULL
);
```

A common mistake is assuming that connecting a signal automatically
transfers ownership of every object involved.

It does not.

You should understand the lifetime of:

-   The object emitting the signal.
-   The callback function's user data.
-   Any objects referenced by the callback.

### Example 7: Using signal callbacks

``` c
#include <gtk/gtk.h>

static void
on_button_clicked(GtkButton *button, gpointer data)
{
    g_print("Button clicked!\\n");
}

int main(int argc, char *argv[])
{
    GtkWidget *window;
    GtkWidget *button;

    gtk_init(&argc, &argv);

    window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

    button = gtk_button_new_with_label("Click Me");

    g_signal_connect(
        button,
        "clicked",
        G_CALLBACK(on_button_clicked),
        NULL
    );

    gtk_container_add(GTK_CONTAINER(window), button);

    gtk_widget_show_all(window);

    gtk_main();

    return 0;
}
```

Here, the button is owned by its parent container. The signal connection
does not require you to manually increase the button's reference count.

If you pass dynamically allocated user data to a signal callback,
consider using `g_signal_connect_data()` with a destroy notifier so that
the data is released when the signal handler is disconnected or its
emitter is finalized.

------------------------------------------------------------------------

## 7. Memory leaks caused by circular references

Another important problem is circular references.

Imagine two objects:

``` text
Object A ------> Object B
   ^                |
   |________________|
```

-   Object A owns a reference to Object B.
-   Object B owns a reference to Object A.

Even if the application releases its external references to both
objects, their reference counts may remain above zero.

Consequently, neither object gets finalized.

This is called a **reference cycle**.

GObject reference counting does not automatically detect such cycles.

### How can you prevent this?

Use weak references when an object needs to observe another object
without keeping it alive.

For example:

``` c
g_object_add_weak_pointer(
    G_OBJECT(other_object),
    (gpointer *)&self->other_object
);
```

A weak pointer does not increase the reference count. When the
referenced object is finalized, the pointer is automatically set to
`NULL`.

Remember to remove the weak pointer registration if its storage is going
away before the referenced object.

For more advanced cases, GObject provides `GWeakRef`.

------------------------------------------------------------------------

## 8. Common memory management mistakes

  -----------------------------------------------------------------------
  Mistake                 Consequence             Correct approach
  ----------------------- ----------------------- -----------------------
  Forgetting              Memory leak             Release owned
  `g_object_unref()`                              references.

  Calling                 Invalid memory access   Track reference
  `g_object_unref()`                              ownership.
  twice                                           

  Calling `g_free()` on a Invalid memory          Use `g_object_unref()`.
  GObject                 management              

  Calling                 Incorrect ownership     Sink or transfer the
  `g_object_unref()` on a handling                floating reference
  floating widget                                 first.

  Forgetting to free      Memory leak             Use `g_free()`.
  allocated strings                               

  Creating strong         Objects never finalized Use weak references or
  reference cycles                                break cycles.

  Using an object after   Use-after-free          Ensure a valid strong
  finalization                                    reference exists.
  -----------------------------------------------------------------------

## 9. Best practices for GTK+ memory management

Here are some practical rules to follow when developing GTK
applications:

1.  **Understand ownership:** Know which function returns a new
    reference and which functions transfer ownership.
2.  **Use `g_object_ref()` carefully:** Only acquire additional
    references when you need independent ownership.
3.  **Release references:** Every owned reference should eventually be
    released.
4.  **Use `g_clear_object()`:** Prefer it when releasing object pointers
    stored in structures.
5.  **Use `g_free()` for allocated memory:** Do not confuse ordinary
    memory allocations with GObject instances.
6.  **Understand floating references:** GTK widgets commonly start with
    floating references, unlike ordinary GObjects.
7.  **Avoid reference cycles:** Use weak references when appropriate.
8.  **Respect GTK version differences:** GTK3 and GTK4 have different
    widget removal and destruction APIs.

------------------------------------------------------------------------

## 10. Quick reference: important memory functions

  -----------------------------------------------------------------------
  Function                            Description
  ----------------------------------- -----------------------------------
  `g_object_new()`                    Creates a GObject.

  `g_object_ref()`                    Acquires another reference.

  `g_object_unref()`                  Releases a reference.

  `g_object_ref_sink()`               Converts a floating reference into
                                      a normal reference, or acquires a
                                      reference if already sunk.

  `g_clear_object()`                  Releases a reference and sets the
                                      pointer to NULL.

  `g_object_weak_ref()`               Registers a callback when an object
                                      is finalized.

  `g_malloc()`                        Allocates memory.

  `g_malloc0()`                       Allocates zero-initialized memory.

  `g_strdup()`                        Duplicates a string.

  `g_free()`                          Frees allocated memory.
  -----------------------------------------------------------------------

## 11. Official documentation for further learning

These are useful references from the GNOME project:

1.  [GObject Type System
    Concepts](https://docs.gtk.org/gobject/concepts.html) -- Object
    creation, reference counting, disposal and finalization.
2.  [GNOME Memory Management
    Guidelines](https://developer.gnome.org/documentation/guidelines/programming/memory-management.html)
    -- Ownership, allocation and floating references.

**The most important principle to remember:** GTK+ memory management is
based on ownership. Every reference must have a clear owner, and that
owner must release it when it is no longer needed.
