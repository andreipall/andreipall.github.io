---
layout: post
title:  "Creating a custom GTK widget from scratch"
date:   2026-11-09 02:12:56
categories: C
description: Creating a custom GTK widget from scratch
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: I'll demonstrate how to create a custom GTK 4 widget in C, using GObject, custom rendering, properties, signals, and mouse interaction.
---
I'll demonstrate how to create a **custom GTK 4 widget in C**, using GObject, custom rendering, properties, signals, and mouse interaction.

We'll build a reusable `MyGauge` widget that displays a circular progress indicator. Unlike a widget assembled from existing GTK controls, this will be a new widget type derived directly from `GtkWidget`.

**Illustration:** A circular gauge displaying 73% progress, with a green progress arc on a dark background.

## 1. Understanding GTK's widget architecture

GTK 4 uses the GObject type system. Every GTK widget ultimately inherits from `GObject`.

Our inheritance hierarchy will be:

```text
GObject
   ↓
GtkWidget
   ↓
MyGauge
```

To implement a custom widget, we need to understand several important GTK concepts:

| Concept | Purpose |
|---|---|
| `GObject` | Type system, properties, signals, object lifecycle |
| `GtkWidget` | Base class for visual widgets |
| `GtkWidgetClass` | Virtual methods for rendering and sizing |
| `GtkSnapshot` | GTK 4 rendering system |
| `GtkEventController` | Handles user input |
| `gtk_widget_queue_draw()` | Requests a new render |
| `gtk_widget_queue_resize()` | Requests a new size calculation |

## 2. Project structure

We'll create three files:

```text
my-gtk-project/
├── main.c
├── my-gauge.c
└── my-gauge.h
```

## 3. Define the custom widget header

The header defines our public widget type and API.

**my-gauge.h**

```c
#ifndef MY_GAUGE_H
#define MY_GAUGE_H

#include <gtk/gtk.h>

G_BEGIN_DECLS

#define MY_TYPE_GAUGE (my_gauge_get_type())

G_DECLARE_FINAL_TYPE(
    MyGauge,
    my_gauge,
    MY,
    GAUGE,
    GtkWidget
)

GtkWidget *my_gauge_new(void);

void my_gauge_set_value(MyGauge *self, double value);
double my_gauge_get_value(MyGauge *self);

G_END_DECLS

#endif
```

### Explanation

`G_DECLARE_FINAL_TYPE()` declares a new GObject type.

It automatically generates several declarations, including:

- `MyGauge` and `MyGaugeClass` types.
- `my_gauge_get_type()`.
- `MY_GAUGE()` for casting.
- `MY_IS_GAUGE()` for runtime type checking.

The `FINAL` designation means other classes cannot inherit from `MyGauge`. If you want to create a widget that other developers can subclass, use `G_DECLARE_DERIVABLE_TYPE()` instead.

The public API contains three functions: a constructor, a setter and a getter.

## 4. Implement the widget

**my-gauge.c**

```c
#include "my-gauge.h"
#include <math.h>

struct _MyGauge {
    GtkWidget parent_instance;

    double value;
};

G_DEFINE_TYPE(MyGauge, my_gauge, GTK_TYPE_WIDGET)

enum {
    PROP_0,
    PROP_VALUE,
    N_PROPERTIES
};

static GParamSpec *properties[N_PROPERTIES];

/* Render the widget */
static void
my_gauge_snapshot(GtkWidget *widget, GtkSnapshot *snapshot)
{
    MyGauge *self = MY_GAUGE(widget);

    int width = gtk_widget_get_width(widget);
    int height = gtk_widget_get_height(widget);

    double cx = width / 2.0;
    double cy = height / 2.0;
    double radius = MIN(width, height) * 0.35;

    graphene_rect_t bounds = GRAPHENE_RECT_INIT(
        0, 0, width, height
    );

    cairo_t *cr = gtk_snapshot_append_cairo(
        snapshot, &bounds
    );

    /* Background circle */
    cairo_set_source_rgb(cr, 0.25, 0.28, 0.32);
    cairo_set_line_width(cr, 12);

    cairo_arc(cr, cx, cy, radius, 0, 2 * G_PI);
    cairo_stroke(cr);

    /* Progress arc */
    cairo_set_source_rgb(cr, 0.25, 0.75, 0.55);
    cairo_set_line_width(cr, 12);
    cairo_set_line_cap(cr, CAIRO_LINE_CAP_ROUND);

    double start = -G_PI / 2;
    double end = start + 2 * G_PI * self->value / 100.0;

    if (self->value > 0) {
        cairo_arc(cr, cx, cy, radius, start, end);
        cairo_stroke(cr);
    }

    /* Percentage text */
    char text[32];
    g_snprintf(text, sizeof(text), "%.0f%%", self->value);

    cairo_set_source_rgb(cr, 1, 1, 1);
    cairo_select_font_face(
        cr, "Sans",
        CAIRO_FONT_SLANT_NORMAL,
        CAIRO_FONT_WEIGHT_BOLD
    );

    cairo_set_font_size(cr, 28);

    cairo_text_extents_t extents;
    cairo_text_extents(cr, text, &extents);

    cairo_move_to(
        cr,
        cx - (extents.width / 2 + extents.x_bearing),
        cy - (extents.height / 2 + extents.y_bearing)
    );

    cairo_show_text(cr, text);

    cairo_destroy(cr);
}

/* Preferred widget size */
static void
my_gauge_measure(
    GtkWidget *widget,
    GtkOrientation orientation,
    int for_size,
    int *minimum,
    int *natural,
    int *minimum_baseline,
    int *natural_baseline
)
{
    *minimum = 100;
    *natural = 200;

    if (minimum_baseline)
        *minimum_baseline = -1;

    if (natural_baseline)
        *natural_baseline = -1;
}

/* GObject property getter */
static void
my_gauge_get_property(
    GObject *object,
    guint property_id,
    GValue *value,
    GParamSpec *pspec
)
{
    MyGauge *self = MY_GAUGE(object);

    switch (property_id) {
        case PROP_VALUE:
            g_value_set_double(value, self->value);
            break;

        default:
            G_OBJECT_WARN_INVALID_PROPERTY_ID(
                object, property_id, pspec
            );
    }
}

/* GObject property setter */
static void
my_gauge_set_property(
    GObject *object,
    guint property_id,
    const GValue *value,
    GParamSpec *pspec
)
{
    MyGauge *self = MY_GAUGE(object);

    switch (property_id) {
        case PROP_VALUE:
            my_gauge_set_value(
                self, g_value_get_double(value)
            );
            break;

        default:
            G_OBJECT_WARN_INVALID_PROPERTY_ID(
                object, property_id, pspec
            );
    }
}

/* Register class behavior */
static void
my_gauge_class_init(MyGaugeClass *klass)
{
    GtkWidgetClass *widget_class = GTK_WIDGET_CLASS(klass);
    GObjectClass *object_class = G_OBJECT_CLASS(klass);

    widget_class->snapshot = my_gauge_snapshot;
    widget_class->measure = my_gauge_measure;

    object_class->get_property = my_gauge_get_property;
    object_class->set_property = my_gauge_set_property;

    properties[PROP_VALUE] = g_param_spec_double(
        "value",
        "Value",
        "Current gauge value",
        0.0,
        100.0,
        0.0,
        G_PARAM_READWRITE | G_PARAM_EXPLICIT_NOTIFY |
        G_PARAM_STATIC_STRINGS
    );

    g_object_class_install_properties(
        object_class,
        N_PROPERTIES,
        properties
    );
}

/* Initialize each widget instance */
static void
my_gauge_init(MyGauge *self)
{
    self->value = 0.0;

    gtk_widget_set_overflow(
        GTK_WIDGET(self),
        GTK_OVERFLOW_HIDDEN
    );
}

/* Public constructor */
GtkWidget *
my_gauge_new(void)
{
    return g_object_new(MY_TYPE_GAUGE, NULL);
}

/* Public setter */
void
my_gauge_set_value(MyGauge *self, double value)
{
    g_return_if_fail(MY_IS_GAUGE(self));
    g_return_if_fail(isfinite(value));

    value = CLAMP(value, 0.0, 100.0);

    if (self->value == value)
        return;

    self->value = value;

    gtk_widget_queue_draw(GTK_WIDGET(self));

    g_object_notify_by_pspec(
        G_OBJECT(self),
        properties[PROP_VALUE]
    );
}

/* Public getter */
double
my_gauge_get_value(MyGauge *self)
{
    g_return_val_if_fail(MY_IS_GAUGE(self), 0.0);

    return self->value;
}
```

## 5. How the implementation works

### A. Instance structure

```c
struct _MyGauge {
    GtkWidget parent_instance;
    double value;
};
```

Each widget instance has its own memory. `parent_instance` must be the first member so the object layout is compatible with GTK's inheritance system.

The `value` field stores the current percentage.

### B. Registering the type

```c
G_DEFINE_TYPE(MyGauge, my_gauge, GTK_TYPE_WIDGET)
```

This implements the type-registration machinery and connects our new class to `GtkWidget`.

GTK can then recognize `MyGauge` as a widget.

### C. Drawing with `snapshot()`

GTK 4 uses a snapshot-based rendering architecture.

```c
widget_class->snapshot = my_gauge_snapshot;
```

When GTK renders the widget, it calls our `my_gauge_snapshot()` implementation.

The rendering process is:

```text
Widget value changes
        ↓
gtk_widget_queue_draw()
        ↓
GTK schedules a render
        ↓
my_gauge_snapshot()
        ↓
GTK renders the scene
```

GTK 4 does not use the old GTK 3 `draw()` virtual method. The snapshot API builds render nodes that GTK can efficiently render.

Here, `gtk_snapshot_append_cairo()` creates a Cairo drawing context within the snapshot. Cairo makes it straightforward to draw arcs and text.

For more complex widgets, GTK's snapshot primitives can be more efficient than using Cairo for everything.

### D. Widget sizing

```c
widget_class->measure = my_gauge_measure;
```

GTK calls `measure()` to determine the widget's preferred dimensions.

Our widget reports a minimum of 100 pixels and a natural size of 200 pixels in both orientations.

The parent layout container then decides how much space to allocate.

For more sophisticated layouts, you may also implement `size_allocate()` or use a custom `GtkLayoutManager`.

### E. Properties

We register a GObject property named `value`.

This means the widget can be configured through the standard GObject API:

```c
g_object_set(gauge, "value", 75.0, NULL);
```

And queried with:

```c
double value;
g_object_get(gauge, "value", &value, NULL);
```

It also enables property binding and change notifications:

```c
g_signal_connect(
    gauge,
    "notify::value",
    G_CALLBACK(on_value_changed),
    NULL
);
```

## 6. Create the GTK application

Now we can instantiate the widget and display it in a GTK window.

**main.c**

```c
#include <gtk/gtk.h>
#include "my-gauge.h"

static void
on_slider_changed(GtkRange *range, gpointer user_data)
{
    MyGauge *gauge = MY_GAUGE(user_data);

    double value = gtk_range_get_value(range);
    my_gauge_set_value(gauge, value);
}

static void
activate(GtkApplication *app, gpointer user_data)
{
    GtkWidget *window = gtk_application_window_new(app);

    gtk_window_set_title(GTK_WINDOW(window), "Custom GTK Widget");
    gtk_window_set_default_size(GTK_WINDOW(window), 350, 350);

    GtkWidget *box = gtk_box_new(GTK_ORIENTATION_VERTICAL, 15);

    gtk_widget_set_margin_top(box, 20);
    gtk_widget_set_margin_bottom(box, 20);
    gtk_widget_set_margin_start(box, 20);
    gtk_widget_set_margin_end(box, 20);

    GtkWidget *gauge = my_gauge_new();
    my_gauge_set_value(MY_GAUGE(gauge), 73.0);

    gtk_widget_set_hexpand(gauge, TRUE);
    gtk_widget_set_vexpand(gauge, TRUE);

    GtkWidget *slider = gtk_scale_new_with_range(
        GTK_ORIENTATION_HORIZONTAL,
        0.0, 100.0, 1.0
    );

    gtk_range_set_value(GTK_RANGE(slider), 73.0);

    g_signal_connect(
        slider,
        "value-changed",
        G_CALLBACK(on_slider_changed),
        gauge
    );

    gtk_box_append(GTK_BOX(box), gauge);
    gtk_box_append(GTK_BOX(box), slider);

    gtk_window_set_child(GTK_WINDOW(window), box);
    gtk_window_present(GTK_WINDOW(window));
}

int
main(int argc, char **argv)
{
    GtkApplication *app = gtk_application_new(
        "com.example.customgauge",
        G_APPLICATION_DEFAULT_FLAGS
    );

    g_signal_connect(app, "activate", G_CALLBACK(activate), NULL);

    int status = g_application_run(
        G_APPLICATION(app), argc, argv
    );

    g_object_unref(app);

    return status;
}
```

## 7. Compile and run

On Ubuntu or Debian, install the development packages:

```bash
sudo apt install build-essential pkg-config libgtk-4-dev
```

Compile:

```bash
gcc main.c my-gauge.c -o my-app \
    $(pkg-config --cflags --libs gtk4) -lm
```

Run:

```bash
./my-app
```

You should see a GTK window containing a circular gauge and a slider. Moving the slider updates the gauge immediately.

## 8. Add mouse interaction

GTK 4 uses event controllers and gestures rather than the old GTK 3 event signals.

For example, to let users click the gauge to increase its value, add this callback to `my-gauge.c`:

```c
static void
my_gauge_clicked(
    GtkGestureClick *gesture,
    int n_press,
    double x,
    double y,
    gpointer user_data
)
{
    MyGauge *self = MY_GAUGE(user_data);

    double next = self->value + 10.0;

    if (next > 100.0)
        next = 0.0;

    my_gauge_set_value(self, next);
}
```

Then extend `my_gauge_init()`:

```c
static void
my_gauge_init(MyGauge *self)
{
    self->value = 0.0;

    gtk_widget_set_overflow(
        GTK_WIDGET(self),
        GTK_OVERFLOW_HIDDEN
    );

    GtkGesture *click = gtk_gesture_click_new();

    g_signal_connect(
        click,
        "pressed",
        G_CALLBACK(my_gauge_clicked),
        self
    );

    gtk_widget_add_controller(
        GTK_WIDGET(self),
        GTK_EVENT_CONTROLLER(click)
    );
}
```

Now clicking anywhere inside the widget increases its value by 10%, wrapping back to zero after 100%.

The `GtkGestureClick` controller belongs to the widget after being added, so you don't need to unref it manually.

## 9. Add a custom signal

GObject supports custom signals, which allow other components to respond to widget-specific events.

For example, we can emit `value-changed` whenever the gauge value changes.

Add a signal enumeration to `my-gauge.c`:

```c
enum {
    SIGNAL_VALUE_CHANGED,
    N_SIGNALS
};

static guint signals[N_SIGNALS];
```

Register the signal in `my_gauge_class_init()`:

```c
signals[SIGNAL_VALUE_CHANGED] = g_signal_new(
    "value-changed",
    G_TYPE_FROM_CLASS(klass),
    G_SIGNAL_RUN_LAST,
    0,
    NULL,
    NULL,
    NULL,
    G_TYPE_NONE,
    1,
    G_TYPE_DOUBLE
);
```

Then add this at the end of `my_gauge_set_value()`:

```c
g_signal_emit(
    self,
    signals[SIGNAL_VALUE_CHANGED],
    0,
    self->value
);
```

Applications can now connect to it:

```c
static void
on_gauge_changed(MyGauge *gauge,
                 double value,
                 gpointer user_data)
{
    g_print("Gauge value: %.1f\n", value);
}
```

```c
g_signal_connect(
    gauge,
    "value-changed",
    G_CALLBACK(on_gauge_changed),
    NULL
);
```

The custom signal is useful for communicating meaningful widget events, while the existing `notify::value` signal supports generic GObject property observation.

## 10. Important GTK 4 lifecycle methods

When developing more advanced widgets, you'll encounter additional virtual methods.

| Method | When GTK calls it |
|---|---|
| `measure()` | When calculating preferred sizes |
| `size_allocate()` | When allocating the widget's size |
| `snapshot()` | When producing render nodes |
| `root()` | When the widget becomes attached to a `GtkRoot` |
| `unroot()` | When detached from its root |
| `map()` | When becoming mapped for display |
| `unmap()` | When becoming unmapped |
| `dispose()` | During object teardown |
| `finalize()` | During final object destruction |

For instance, if your widget owns dynamically allocated resources, you should release them at the appropriate point in its lifecycle.

## 11. Further improvements for a production widget

Our example is intentionally small, but a production-quality GTK widget should also consider:

- **Accessibility:** expose the gauge's role, value, and description through GTK's accessibility APIs.
- **Keyboard interaction:** make the widget focusable and add keyboard controllers if users can change its value.
- **CSS integration:** use GTK's styling system and style classes instead of hardcoded colors.
- **High-DPI rendering:** use GTK's coordinate and rendering APIs rather than assuming a particular display resolution.
- **Animation:** use `gtk_widget_add_tick_callback()` to animate transitions.
- **Text rendering:** use Pango for properly shaped, localized, and accessible text instead of Cairo's basic text API.
- **Resource management:** implement `dispose()` or `finalize()` if the widget starts owning resources that require cleanup.

## 12. Choosing the right approach

GTK offers several ways to create custom widgets.

| Approach | Best for |
|---|---|
| Subclass `GtkWidget` | Completely custom controls and rendering |
| Subclass `GtkBox` | Composite widgets containing other controls |
| Subclass `GtkDrawingArea` | Custom graphics without a full widget subclass |
| Custom `GtkLayoutManager` | Complex child positioning |
| `GtkWidget` with `GtkSnapshot` | Specialized, high-performance visual components |

**For a truly custom widget, subclassing `GtkWidget` directly is the most flexible approach.** It gives you control over rendering, sizing, properties, signals, interaction, and lifecycle behavior.

The example above provides the foundation for building more sophisticated widgets such as charts, timelines, media controls, custom editors, and graphical dashboards.
