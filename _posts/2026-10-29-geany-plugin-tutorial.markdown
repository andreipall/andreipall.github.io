---
layout: post
title:  "How to create a Geany plugin in C - step-by-step tutorial"
date:   2026-10-29 12:46:56
categories: C
description: How to create a Geany plugin in C - step-by-step tutorial
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: Geany supports plugins written in C that can extend the editor with custom menus, toolbar buttons, keyboard shortcuts, document processing, and more.
---
Geany supports plugins written in C that can extend the editor with custom menus, toolbar buttons, keyboard shortcuts, document processing, and more.

In this tutorial, we'll create a working Geany plugin that adds a new menu item under **Tools**. When clicked, it displays a message dialog.

We'll cover the project structure, source code, compilation, installation, and how to access the currently opened document.

## 1. How Geany plugins work

Geany plugins are shared libraries dynamically loaded by the editor.

```text
Geany editor
     ↓
Plugin API (geanyplugin.h)
     ↓
Your plugin (myplugin.so)
```

Geany loads your shared library and communicates through its C plugin API.

On Linux, plugins typically use the `.so` extension. On Windows, they use `.dll`.

The plugin API provides access to Geany's editor, documents, menus, preferences, and application events.

## 2. Install the development dependencies

For Ubuntu or Debian:

```bash
sudo apt update
sudo apt install geany libgeany-dev \
    build-essential pkg-config
```

For Fedora:

```bash
sudo dnf install geany geany-devel \
    gcc make pkgconf-pkg-config
```

Verify the installation:

```bash
pkg-config --modversion geany
```

You should see the installed Geany version.

You can also inspect the compiler flags:

```bash
pkg-config --cflags --libs geany
```

## 3. Create the plugin project

Create a directory:

```bash
mkdir my-geany-plugin
cd my-geany-plugin
```

Our project will have this structure:

```text
my-geany-plugin/
├── myplugin.c
└── Makefile
```

## 4. Write your first plugin

Create `myplugin.c`:

```c
#include <geanyplugin.h>

/* Required by the Geany plugin API */
GeanyPlugin *geany_plugin;
GeanyData *geany_data;

/* Our menu item */
static GtkWidget *menu_item = NULL;

/* Called when the menu item is clicked */
static void on_menu_clicked(GtkMenuItem *item,
                            gpointer user_data)
{
    dialogs_show_msgbox(
        GTK_MESSAGE_INFO,
        "Hello from my Geany plugin!"
    );
}

/* Called when the plugin is loaded */
static gboolean plugin_init(GeanyPlugin *plugin,
                            gpointer pdata)
{
    menu_item = gtk_menu_item_new_with_label(
        "My First Plugin"
    );

    gtk_container_add(
        GTK_CONTAINER(geany->main_widgets->tools_menu),
        menu_item
    );

    g_signal_connect(
        menu_item,
        "activate",
        G_CALLBACK(on_menu_clicked),
        NULL
    );

    gtk_widget_show(menu_item);

    return TRUE;
}

/* Called when the plugin is unloaded */
static void plugin_cleanup(GeanyPlugin *plugin,
                           gpointer pdata)
{
    gtk_widget_destroy(menu_item);
}

/* Entry point called by Geany */
G_MODULE_EXPORT
void geany_load_module(GeanyPlugin *plugin)
{
    main_locale_init(LOCALEDIR, GETTEXT_PACKAGE);

    plugin->info->name = "My First Plugin";
    plugin->info->description =
        "Example Geany plugin written in C";
    plugin->info->version = "1.0";
    plugin->info->author = "Plugin Developer";

    plugin->funcs->init = plugin_init;
    plugin->funcs->cleanup = plugin_cleanup;

    GEANY_PLUGIN_REGISTER(plugin, 225);
}
```

**Important:** This example uses the modern `GeanyPlugin` registration interface. The exact API version and compatibility requirements depend on your installed Geany release. The registration version `225` is an example API requirement, not a universal value; check your installed headers and target Geany version before building.

## 5. Understanding the C code

| Component | Explanation |
|---|---|
| `geanyplugin.h` | Provides the Geany plugin API and GTK declarations. |
| `geany_load_module()` | Entry point used by Geany to discover and register the plugin. |
| `plugin->info` | Defines the plugin name, description, version, and author. |
| `plugin->funcs->init` | Called when the plugin is activated. |
| `plugin->funcs->cleanup` | Called when the plugin is disabled or Geany exits. |
| `GEANY_PLUGIN_REGISTER()` | Registers the plugin and checks API compatibility. |
| `g_signal_connect()` | Connects a GTK event to a C callback function. |

One important correction to the example: initialize Geany's global data pointer inside `plugin_init()` before using the `geany` macro:

```c
geany_plugin = plugin;
geany_data = plugin->geany_data;
```

Place these two assignments at the beginning of `plugin_init()`. This makes the example's access to `geany->main_widgets` valid.

If your plugin does not use translations, you can also omit `main_locale_init(LOCALEDIR, GETTEXT_PACKAGE)` until you configure localization.

## 6. Compile the plugin

Compile the source file:

```bash
gcc -Wall -Wextra -fPIC \
    $(pkg-config --cflags geany) \
    -c myplugin.c -o myplugin.o
```

Create the shared library:

```bash
gcc -shared -o myplugin.so myplugin.o \
    $(pkg-config --libs geany)
```

Or compile everything in one command:

```bash
gcc -Wall -fPIC -shared \
    -o myplugin.so myplugin.c \
    $(pkg-config --cflags --libs geany)
```

The result is `myplugin.so`, which Geany can load as a plugin.

## 7. Install and activate the plugin

Create the user plugin directory:

```bash
mkdir -p ~/.config/geany/plugins
```

Copy the compiled plugin:

```bash
cp myplugin.so ~/.config/geany/plugins/
```

In Geany, open **Tools → Plugin Manager**, find *My First Plugin*, and enable it.

Then open the Tools menu and click **My First Plugin**. A message dialog should appear.

## 8. Access the currently opened document

A more useful plugin can read information about the document currently being edited.

For example, replace `on_menu_clicked()` with:

```c
static void on_menu_clicked(GtkMenuItem *item,
                            gpointer user_data)
{
    GeanyDocument *doc = document_get_current();

    if (doc == NULL || !doc->is_valid)
    {
        dialogs_show_msgbox(
            GTK_MESSAGE_INFO,
            "No document is open."
        );
        return;
    }

    dialogs_show_msgbox(
        GTK_MESSAGE_INFO,
        "Current document: %s",
        DOC_FILENAME(doc)
    );
}
```

This code obtains the current document, checks whether it is valid, and displays its filename.

## 9. Read or modify editor text

Geany uses the Scintilla editing component.

To get the text of the current document:

```c
GeanyDocument *doc = document_get_current();

if (doc != NULL && doc->is_valid)
{
    ScintillaObject *sci = doc->editor->sci;

    gchar *text = sci_get_contents(sci, -1);

    if (text != NULL)
    {
        g_print("Document text:\n%s\n", text);
        g_free(text);
    }
}
```

To insert text at the cursor position:

```c
GeanyDocument *doc = document_get_current();

if (doc != NULL && doc->is_valid)
{
    ScintillaObject *sci = doc->editor->sci;

    sci_insert_text(sci, -1, "Hello from my plugin!");
}
```

For larger modifications, consider using Scintilla undo actions so users can undo the changes.

## 10. Add more functionality

Once the basic plugin works, you can expand it with:

- **Document events:** respond when a file is opened, saved, or closed.
- **Keyboard shortcuts:** register custom actions.
- **Sidebar panels:** display custom GTK widgets.
- **Configuration:** implement `plugin->funcs->configure`.
- **Editor commands:** manipulate text, selections, or the current cursor position.

The best reference is Geany's own example plugin and API documentation:

- [Geany Plugin HowTo](https://www.geany.org/manual/reference/howto.html)
- [Official demoplugin.c source code](https://github.com/geany/geany/blob/master/plugins/demoplugin.c)

**Recommended next step:** Start with the menu plugin, then add a command that operates on the selected text. This introduces the document API, Scintilla API, and GTK event handling without requiring a complex plugin architecture.
