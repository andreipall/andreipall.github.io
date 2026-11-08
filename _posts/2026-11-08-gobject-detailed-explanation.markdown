---
layout: post
title:  "Understanding GObject in C and GTK"
date:   2026-11-08 02:12:56
categories: C
description: Understanding GObject in C and GTK
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: GObject is one of the most important concepts in the GLib and GTK ecosystems.
---
GObject is one of the most important concepts in the **GLib and GTK
ecosystems**. If you want to understand how GTK works internally, how
GTK widgets are created, how objects communicate, or how to create your
own GTK components, understanding GObject is essential.

At first, GObject might seem complicated because it introduces
object-oriented programming concepts into C, a language that does not
natively support classes, inheritance, or methods in the same way as C++
or Java.

However, once you understand how it works internally, the design becomes
quite logical.

We will cover:

1.  What GObject is and why it exists.
2.  How GObject implements object-oriented programming in C.
3.  The structure of a GObject.
4.  Classes, instances, and initialization.
5.  Inheritance and how it works internally.
6.  Virtual methods and method overriding.
7.  Properties and encapsulation.
8.  Signals and event handling.
9.  Interfaces and multiple behavior inheritance.
10. How to create your own GObject, step by step.
11. How GTK uses GObject.
12. A complete example with inheritance.

------------------------------------------------------------------------

# 1. What exactly is GObject?

**GObject is a C-based object system provided by GLib.**

It provides features commonly associated with object-oriented
programming languages:

-   Classes and objects.
-   Inheritance.
-   Polymorphism.
-   Encapsulation.
-   Virtual methods.
-   Interfaces.
-   Properties.
-   Signals and events.
-   Runtime type information.
-   Reference counting and object lifecycle management.

The important thing to understand is that GObject does not change the C
language.

C still does not have native classes.

Instead, GObject implements an object-oriented programming system using
C structures, function pointers, macros, and a runtime type system.

For example, consider a traditional C structure:

``` c
typedef struct {
    char *name;
    int age;
} Person;
```

You can create an instance:

``` c
Person person;

person.name = "Alice";
person.age = 25;
```

But this structure alone does not provide:

-   Inheritance.
-   Virtual methods.
-   Runtime type checking.
-   Automatic object lifecycle management.
-   Signals.
-   Properties.

GObject provides these capabilities.

## Why was GObject created?

Imagine you are developing a graphical application using GTK.

You might have:

-   A button.
-   A text entry.
-   A window.
-   A label.
-   A tree view.

All these elements share certain characteristics.

For example:

-   They have properties.
-   They can emit signals.
-   They have a lifecycle.
-   They can inherit common functionality.
-   They can be referenced by other objects.

Instead of implementing these mechanisms separately for every widget,
GTK uses GObject as a common foundation.

This makes it possible to build a large, reusable object hierarchy.

## The relationship between GLib, GObject, and GTK

``` text
GLib
  Core utility library: data structures, memory utilities, main loop, etc.
  |
  +-- GObject
        Object system, types, inheritance, signals, properties and reference counting
        |
        +-- GTK
              Graphical user interface toolkit built on GObject
              Windows · Buttons · Labels · Entries · Widgets
```

An important distinction:

-   GLib is the underlying utility library.
-   GObject is an object system built on top of GLib.
-   GTK uses GObject to implement its graphical components.

------------------------------------------------------------------------

# 2. How does GObject implement object-oriented programming in C?

To understand GObject, you first need to understand how C represents
objects.

In languages such as C++, you can write:

``` cpp
class Person {
public:
    int age;

    void say_hello() {
        printf("Hello!");
    }
};
```

In C, you cannot write this directly.

But you can represent a similar concept using a structure and functions.

For example:

``` c
typedef struct {
    int age;
} Person;

void person_say_hello(Person *self)
{
    printf("Hello! I am %d years old.\\n", self->age);
}
```

Notice something important:

``` c
void person_say_hello(Person *self)
```

The function receives a pointer to the object.

This pointer represents the object on which the method operates.

In object-oriented languages, this is similar to `this` in C++ or Java.

In GObject, the convention is to call this pointer:

``` c
self
```

or sometimes:

``` c
object
```

GObject follows the same fundamental idea, but adds a formal object
system.

There are two fundamental structures you need to understand:

1.  The instance structure.
2.  The class structure.

These are central to GObject inheritance.

------------------------------------------------------------------------

# 3. The two fundamental structures: Instance and Class

A GObject type generally has two associated structures.

## 3.1 Instance structure

The instance structure represents the actual object in memory.

For example:

``` c
typedef struct _Person {
    GObject parent_instance;

    gchar *name;
    gint age;

} Person;
```

Let's understand each part.

### `typedef struct _Person`

This declares a structure representing a Person object.

### `GObject parent_instance`

This is extremely important.

It means that Person inherits from GObject.

The first member of the Person structure is the parent instance.

This is how GObject implements inheritance in memory.

### `gchar *name`

This represents a property or field belonging to the Person object.

### `gint age`

Another field belonging to the Person object.

An instance of Person therefore contains:

-   Everything inherited from GObject.
-   Its own additional fields.

Conceptually:

``` text
Person instance in memory
+----------------------------------+
| Parent instance: GObject         |
|  - Reference count               |
|  - Object type information       |
|  - Other internal object state   |
+----------------------------------+
| Child instance: Person           |
|  - name                          |
|  - age                           |
+----------------------------------+
```

## 3.2 Class structure

The class structure represents information and behavior shared by all
instances of a particular type.

Example:

``` c
typedef struct _PersonClass {
    GObjectClass parent_class;

    void (*introduce)(Person *self);

} PersonClass;
```

Let's understand this.

### `GObjectClass parent_class`

This means PersonClass inherits from GObjectClass.

The class structure also follows the parent-first layout.

### `void (*introduce)(Person *self)`

This is a function pointer.

It represents a virtual method.

A virtual method is a method whose implementation can be changed by
subclasses.

For example, a Person might introduce themselves differently depending
on the actual object type.

This is how GObject implements polymorphism.

## 3.3 Instance versus class

This distinction is extremely important.

  -----------------------------------------------------------------------
  Instance structure                  Class structure
  ----------------------------------- -----------------------------------
  Represents an individual object     Represents the type's shared
                                      behavior

  Contains object-specific data       Contains virtual method pointers

  One instance per object             One class structure per registered
                                      type

  Stores fields such as name and age  Stores method implementations
  -----------------------------------------------------------------------

For example, imagine creating three Person objects:

``` c
Person *alice;
Person *bob;
Person *charlie;
```

Each object has its own name and age.

But they all use the same PersonClass structure.

Conceptually:

``` text
                  PersonClass
              +-------------------+
              | introduce()       |
              | function pointer  |
              +-------------------+
                 /      |      \\
                /       |       \\
        +---------+ +---------+ +---------+
        | Alice   | | Bob     | | Charlie |
        | age: 25 | | age: 30 | | age: 20 |
        +---------+ +---------+ +---------+
```

Three separate instances share one registered class definition.

------------------------------------------------------------------------

# 4. How is a GObject type registered?

In C++, when you declare a class, the compiler knows that the class
exists.

GObject works differently.

It has a runtime type system.

This means that types are registered with GObject so that the system can
identify them at runtime.

For example:

``` c
GType person_get_type(void);
```

This function returns the runtime type identifier of Person.

You can think of `GType` as an identifier representing a registered
type.

GObject uses this information to determine:

-   What type an object belongs to.
-   What its parent type is.
-   What interfaces it implements.
-   What properties it has.
-   What signals it supports.
-   How to initialize and destroy it.

## The `G_DEFINE_TYPE` macro

Instead of manually implementing all type registration logic, GObject
provides macros.

For example:

``` c
G_DEFINE_TYPE(Person, person, G_TYPE_OBJECT)
```

This macro generates much of the machinery needed to register Person as
a GObject-derived type.

The arguments are:

``` c
G_DEFINE_TYPE(
    TypeName,
    type_name,
    ParentType
)
```

For our example:

-   `Person`: the C type name.
-   `person`: the lowercase naming prefix.
-   `G_TYPE_OBJECT`: the parent runtime type.

It establishes that:

``` text
Person inherits from GObject.
```

The macro also provides:

``` c
person_get_type()
```

This is why you frequently see functions such as:

``` c
gtk_widget_get_type();
gtk_window_get_type();
gtk_button_get_type();
```

They return the runtime type identifiers of GTK classes.

------------------------------------------------------------------------

# 5. How does GObject inheritance work?

Inheritance is one of the most important features of GObject.

In object-oriented programming, inheritance allows one class to reuse
and extend another class.

For example, imagine this hierarchy:

``` text
             GObject
                |
              Person
                |
              Student
                |
          UniversityStudent
```

Each child inherits the functionality of its parent.

For example:

-   `GObject` provides the fundamental object system.
-   `Person` adds a name, age, and personal behavior.
-   `Student` adds a university and student-related behavior.
-   `UniversityStudent` adds more specialized behavior.

This is called **single inheritance** because a class has only one
direct parent class.

## 5.1 How is inheritance implemented in memory?

Let's look at a simplified example.

The parent:

``` c
typedef struct _Person {
    GObject parent_instance;

    gchar *name;
    gint age;

} Person;
```

The child:

``` c
typedef struct _Student {
    Person parent_instance;

    gchar *university;
    gint student_id;

} Student;
```

Notice:

``` c
Person parent_instance;
```

Inside Student.

This is what makes Student inherit from Person.

The memory layout is conceptually:

``` text
Student instance
+----------------------------------+
| GObject parent instance          |
|  Reference counting               |
|  Object infrastructure            |
+----------------------------------+
| Person parent instance            |
|  name                             |
|  age                              |
+----------------------------------+
| Student child instance            |
|  university                       |
|  student_id                       |
+----------------------------------+
```

A Student therefore has all the fields of Person, as well as its own
fields.

You can access inherited fields directly:

``` c
Student *student = ...;

student->parent_instance.name;
student->parent_instance.age;
student->university;
student->student_id;
```

The important point is that the parent structure is physically embedded
in the child structure.

This is not copying the parent object into the child.

It is a structured memory layout that allows the child object to be
treated as its parent.

## 5.2 Why must the parent be the first member?

You might wonder why we write:

``` c
typedef struct _Student {
    Person parent_instance;
    gchar *university;
} Student;
```

instead of:

``` c
typedef struct _Student {
    gchar *university;
    Person parent_instance;
} Student;
```

The parent must be the first member because GObject relies on compatible
memory layout and pointer conversions.

In C, a pointer to a structure and a pointer to its first member have
the same address.

Therefore, a pointer to Student can be interpreted as a pointer to its
Person parent.

Conceptually:

``` c
Student *student = ...;

Person *person = (Person *)student;
```

This conversion is valid for the inheritance relationship.

You can now pass the Student to functions expecting a Person:

``` c
void person_print(Person *person)
{
    printf("Name: %s\\n", person->name);
}

person_print((Person *)student);
```

This is one of the mechanisms that makes polymorphism possible in
GObject.

In actual GObject code, you normally use the generated type-checking
macros:

``` c
PERSON(student);
```

These perform a checked cast to Person.

## 5.3 How do you define an inherited GObject type?

For example, let's define Student as a subclass of Person.

The registration macro is:

``` c
G_DEFINE_TYPE(Student, student, PERSON_TYPE)
```

Notice the difference from Person:

``` c
G_DEFINE_TYPE(Person, person, G_TYPE_OBJECT)
```

Person inherits from GObject.

Student inherits from Person.

The third argument always identifies the parent runtime type.

This creates the following type hierarchy:

``` text
G_TYPE_OBJECT
      |
  PERSON_TYPE
      |
 STUDENT_TYPE
```

This is the runtime inheritance hierarchy, not merely a collection of C
structures.

------------------------------------------------------------------------

# 6. How does GObject initialize objects?

GObject has two important initialization mechanisms:

1.  Class initialization.
2.  Instance initialization.

They are not the same thing.

## 6.1 Class initialization: `class_init`

Example:

``` c
static void
person_class_init(PersonClass *klass)
{
    printf("Person class initialized\\n");
}
```

This function initializes the class structure.

It is responsible for configuring things such as:

-   Virtual methods.
-   Properties.
-   Signals.
-   Object lifecycle functions.
-   Other class-level behavior.

Class initialization happens when the type is first initialized, not
every time an instance is created.

You can think of it as preparing the blueprint for the objects.

## 6.2 Instance initialization: `init`

Example:

``` c
static void
person_init(Person *self)
{
    self->name = g_strdup("Unknown");
    self->age = 0;

    printf("Person instance initialized\\n");
}
```

This function initializes an individual object.

It is executed for every new instance.

For example:

``` c
Person *alice = g_object_new(PERSON_TYPE, NULL);
Person *bob = g_object_new(PERSON_TYPE, NULL);
```

Both Alice and Bob receive their own initialization.

Their names and ages are stored separately.

## 6.3 Initialization order with inheritance

This is particularly important.

Suppose you have:

``` text
GObject
   |
 Person
   |
 Student
```

When creating a Student object, the initialization process follows the
inheritance hierarchy.

Conceptually:

``` text
1. Initialize GObject instance
2. Initialize Person instance
3. Initialize Student instance
```

The parent instance is initialized before the child instance.

This is important because Student initialization may depend on fields
initialized by Person.

The class initialization order follows the parent-to-child hierarchy as
well.

However, class initialization occurs when types are initialized, not on
every object construction.

## 6.4 Creating an object with `g_object_new()`

This is the standard way to create a GObject.

``` c
Person *person;

person = g_object_new(PERSON_TYPE, NULL);
```

The first argument is the runtime type.

The second argument is a list of properties.

For example:

``` c
Person *person = g_object_new(
    PERSON_TYPE,
    "name", "Alice",
    "age", 25,
    NULL
);
```

Here:

-   `PERSON_TYPE` identifies the class.
-   `"name"` identifies a property.
-   `"Alice"` is the value of that property.
-   `"age"` identifies another property.
-   `25` is its value.
-   `NULL` terminates the property list.

This is an important difference from manually allocating a C structure.

Instead of doing:

``` c
Person *person = malloc(sizeof(Person));
```

you use:

``` c
Person *person = g_object_new(PERSON_TYPE, NULL);
```

GObject handles the allocation and initialization machinery.

------------------------------------------------------------------------

# 7. Virtual methods and polymorphism

Now we reach another fundamental GObject concept.

**Virtual methods allow a child class to replace or extend the behavior
of its parent class.**

This is how GObject implements polymorphism.

Let's understand it with an example.

Imagine a Person has a method called:

``` c
introduce()
```

A normal Person introduces themselves by saying:

``` text
Hello, I am Alice.
```

But a Student might introduce themselves by saying:

``` text
Hello, I am Alice and I study at University of Bucharest.
```

The method has the same conceptual purpose, but the implementation
differs.

## 7.1 Declaring a virtual method

In the class structure:

``` c
typedef struct _PersonClass {
    GObjectClass parent_class;

    void (*introduce)(Person *self);

} PersonClass;
```

This is a function pointer.

It tells us that every Person class has a virtual method called
`introduce`.

We can implement the default version:

``` c
static void
person_introduce(Person *self)
{
    g_print("Hello, I am %s\\n", self->name);
}
```

Then assign the function pointer during class initialization:

``` c
static void
person_class_init(PersonClass *klass)
{
    klass->introduce = person_introduce;
}
```

Now Person has a default implementation of `introduce`.

## 7.2 Overriding the virtual method

Student can provide its own implementation.

``` c
static void
student_introduce(Person *person)
{
    Student *self = STUDENT(person);

    g_print(
        "Hello, I am %s and I study at %s\\n",
        person->name,
        self->university
    );
}
```

Then assign it in Student's class initialization:

``` c
static void
student_class_init(StudentClass *klass)
{
    PersonClass *person_class = PERSON_CLASS(klass);

    person_class->introduce = student_introduce;
}
```

Notice something important:

``` c
PersonClass *person_class = PERSON_CLASS(klass);
```

We obtain the parent class structure and replace its virtual method.

This is method overriding.

## 7.3 Calling a virtual method

You could call the method like this:

``` c
PersonClass *klass = PERSON_GET_CLASS(person);

klass->introduce(person);
```

However, in a real library, you should normally expose a public method
that performs this dispatch:

``` c
void
person_introduce(Person *self)
{
    PersonClass *klass;

    g_return_if_fail(PERSON_IS(self));

    klass = PERSON_GET_CLASS(self);

    klass->introduce(self);
}
```

Here, `PERSON_IS` is illustrative; use the actual generated type-check
macro, normally `PERSON_IS_PERSON(self)`.

A cleaner conventional implementation is:

``` c
void
person_introduce(Person *self)
{
    PersonClass *klass;

    g_return_if_fail(PERSON_IS_PERSON(self));

    klass = PERSON_GET_CLASS(self);

    klass->introduce(self);
}
```

Now you can write:

``` c
Person *person = g_object_new(PERSON_TYPE, NULL);

person_introduce(person);
```

Or:

``` c
Student *student = g_object_new(STUDENT_TYPE, NULL);

person_introduce(PERSON(student));
```

The same function works for both objects.

But the implementation executed depends on the actual object's runtime
type.

This is dynamic dispatch: the implementation is selected based on the
actual runtime type of the object.

## 7.4 Calling the parent implementation

Sometimes you don't want to completely replace the parent's
implementation.

You want to extend it.

For example:

``` c
static void
student_introduce(Person *person)
{
    Student *self = STUDENT(person);

    /* Call the parent implementation */
    PERSON_CLASS(student_parent_class)->introduce(person);

    /* Add Student-specific behavior */
    g_print("I study at %s\\n", self->university);
}
```

The parent class pointer is made available by the type-definition
machinery as `student_parent_class`.

This is conceptually similar to:

``` cpp
Parent::introduce();
```

in C++.

The result is:

``` text
Hello, I am Alice
I study at University of Bucharest
```

This is useful when you want to preserve the original behavior while
adding new behavior.

------------------------------------------------------------------------

# 8. Properties: How objects expose and manage data

Properties are another essential part of GObject.

A normal C structure exposes fields directly:

``` c
person->name = "Alice";
```

But GObject provides a more structured mechanism.

A property is a named, typed, optionally readable and writable attribute
associated with an object.

For example:

``` text
Person
 ├── name: string
 ├── age: integer
 └── active: boolean
```

Properties provide several benefits:

-   Consistent access to object data.
-   Type validation.
-   Read/write restrictions.
-   Notifications when values change.
-   Integration with GTK and other GObject-based libraries.
-   Support for language bindings and introspection.

## 8.1 Defining properties

GObject properties are usually declared using `GParamSpec` objects.

For example:

``` c
enum {
    PROP_0,
    PROP_NAME,
    PROP_AGE,
    N_PROPERTIES
};

static GParamSpec *properties[N_PROPERTIES];
```

The enumeration identifies each property.

`PROP_0` is a reserved initial value. The actual properties begin at
`PROP_NAME`.

Inside `person_class_init()`:

``` c
static void
person_class_init(PersonClass *klass)
{
    GObjectClass *object_class = G_OBJECT_CLASS(klass);

    object_class->set_property = person_set_property;
    object_class->get_property = person_get_property;

    properties[PROP_NAME] =
        g_param_spec_string(
            "name",
            "Name",
            "The person's name",
            "Unknown",
            G_PARAM_READWRITE
        );

    properties[PROP_AGE] =
        g_param_spec_int(
            "age",
            "Age",
            "The person's age",
            0,
            150,
            0,
            G_PARAM_READWRITE
        );

    g_object_class_install_properties(
        object_class,
        N_PROPERTIES,
        properties
    );
}
```

Let's examine the important functions.

### `g_param_spec_string()`

Creates a string property specification.

Its arguments include:

1.  Property name.
2.  Human-readable nickname.
3.  Description.
4.  Default value.
5.  Property flags.

### `g_param_spec_int()`

Creates an integer property specification.

It includes:

-   Minimum value.
-   Maximum value.
-   Default value.
-   Property flags.

### `g_object_class_install_properties()`

Registers the properties with the class.

The properties are now known to the GObject runtime system.

## 8.2 Implementing property setters

When somebody changes a property, GObject invokes the class's
`set_property` function.

Example:

``` c
static void
person_set_property(
    GObject *object,
    guint property_id,
    const GValue *value,
    GParamSpec *pspec
)
{
    Person *self = PERSON(object);

    switch (property_id) {

    case PROP_NAME:
        g_free(self->name);
        self->name = g_value_dup_string(value);
        break;

    case PROP_AGE:
        self->age = g_value_get_int(value);
        break;

    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(
            object,
            property_id,
            pspec
        );
        break;
    }
}
```

Notice:

``` c
g_value_dup_string(value);
```

It extracts and duplicates the string from the GValue.

This matters because the object needs to own its own copy of the string.

## 8.3 Implementing property getters

Similarly:

``` c
static void
person_get_property(
    GObject *object,
    guint property_id,
    GValue *value,
    GParamSpec *pspec
)
{
    Person *self = PERSON(object);

    switch (property_id) {

    case PROP_NAME:
        g_value_set_string(value, self->name);
        break;

    case PROP_AGE:
        g_value_set_int(value, self->age);
        break;

    default:
        G_OBJECT_WARN_INVALID_PROPERTY_ID(
            object,
            property_id,
            pspec
        );
        break;
    }
}
```

Now the object can expose its internal fields through the GObject
property system.

## 8.4 Reading and writing properties

You can set properties during construction:

``` c
Person *person = g_object_new(
    PERSON_TYPE,
    "name", "Alice",
    "age", 25,
    NULL
);
```

You can also change them later:

``` c
g_object_set(
    person,
    "name", "Bob",
    "age", 30,
    NULL
);
```

And retrieve them:

``` c
gchar *name;
gint age;

g_object_get(
    person,
    "name", &name,
    "age", &age,
    NULL
);

g_print("%s is %d years old\\n", name, age);

g_free(name);
```

An important detail: `g_object_get()` duplicates string values for the
caller, so you must free the returned string.

## 8.5 Property flags

Some common property flags are:

  -----------------------------------------------------------------------
  Flag                                Meaning
  ----------------------------------- -----------------------------------
  
  `G_PARAM_READABLE`                  The property can be read

  `G_PARAM_WRITABLE`                  The property can be changed

  `G_PARAM_READWRITE`                 Both reading and writing are
                                      allowed

  `G_PARAM_CONSTRUCT`                 The property can be set during
                                      construction

  `G_PARAM_CONSTRUCT_ONLY`            The property can only be set during
                                      construction

  `G_PARAM_EXPLICIT_NOTIFY`           The implementation explicitly
                                      controls notification

  -----------------------------------------------------------------------

Properties are particularly important in GTK because many GTK widgets
expose their configuration through GObject properties.

For example, a button has properties such as its label and sensitivity.

------------------------------------------------------------------------

# 9. Signals: How GObjects communicate

Signals are another fundamental feature.

A signal is a mechanism through which an object announces that something
has happened.

For example:

-   A button was clicked.
-   A window was closed.
-   A property changed.
-   A value was selected.
-   A file operation completed.

Signals allow objects to communicate without needing to know exactly who
is listening.

This is called event-driven programming.

## 9.1 The button example

Imagine you have a GTK button.

You want to execute a function whenever the user clicks it.

You can connect a callback to its `clicked` signal:

``` c
g_signal_connect(
    button,
    "clicked",
    G_CALLBACK(on_button_clicked),
    NULL
);
```

The callback:

``` c
static void
on_button_clicked(
    GtkButton *button,
    gpointer user_data
)
{
    g_print("The button was clicked!\\n");
}
```

The relationship is:

``` text
User clicks button
        |
        v
Button emits "clicked"
        |
        v
GObject signal system
        |
        v
on_button_clicked()
        |
        v
Your application executes code
```

## 9.2 Why are signals useful?

Consider two objects:

``` text
Button
Application
```

The button does not need to know what the application will do when it is
clicked.

It simply emits a signal.

The application listens for that signal.

This creates loose coupling.

The button can be reused in different applications without changing its
implementation.

## 9.3 Signals are not exactly the same as virtual methods

This distinction is important.

  -----------------------------------------------------------------------
  Virtual methods                     Signals
  ----------------------------------- -----------------------------------
  
  Define overridable class behavior   Announce events

  Stored as function pointers in      Registered in the GObject signal
  class structures                    system

  Used by subclasses to customize     Used by other objects or functions
  behavior                            to react

  Usually dispatched through a class  Can invoke multiple connected
  method                              callbacks
  
  -----------------------------------------------------------------------

Signals can also have a class closure or default class handler, so they
can interact with inheritance. However, their main purpose is event
communication.

## 9.4 Creating a custom signal

You can define your own signal.

For example, imagine a Person object emits a signal when their birthday
occurs.

First, define an identifier:

``` c
enum {
    SIGNAL_BIRTHDAY,
    N_SIGNALS
};

static guint signals[N_SIGNALS];
```

Then register the signal inside `person_class_init()`:

``` c
signals[SIGNAL_BIRTHDAY] =
    g_signal_new(
        "birthday",
        G_TYPE_FROM_CLASS(klass),
        G_SIGNAL_RUN_LAST,
        0,
        NULL,
        NULL,
        NULL,
        G_TYPE_NONE,
        0
    );
```

The important arguments include:

-   Signal name: `"birthday"`.
-   Signal owner type.
-   Signal flags.
-   Return type: `G_TYPE_NONE`.
-   Number of parameters: `0`.

To emit it:

``` c
g_signal_emit(
    self,
    signals[SIGNAL_BIRTHDAY],
    0
);
```

To listen to it:

``` c
g_signal_connect(
    person,
    "birthday",
    G_CALLBACK(on_birthday),
    NULL
);
```

The callback:

``` c
static void
on_birthday(Person *person, gpointer user_data)
{
    g_print("%s is celebrating a birthday!\\n", person->name);
}
```

Now the Person object can announce events, and other parts of your
application can react.

------------------------------------------------------------------------

# 10. Interfaces: Implementing multiple behaviors

There is another important concept: interfaces.

GObject supports single class inheritance, but it also supports
implementing multiple interfaces.

Why is this useful?

Imagine you have these classes:

``` text
Person
Student
Teacher
Robot
```

Now imagine that both Student and Teacher can perform an action called
`Printable`.

A Robot can also implement Printable.

You don't necessarily want Printable to be a parent class.

Instead, you want it to describe a capability.

This is what interfaces are for.

Conceptually:

``` text
                 Printable interface
                  +-------------+
                  | print()     |
                  +-------------+
                    /    |    \\
                   /     |     \\
             Student  Teacher  Robot
```

The classes have different parentage, but they share a common
capability.

For example, a simplified interface might look like:

``` c
typedef struct _PrintableInterface {
    GTypeInterface parent_iface;

    void (*print)(GObject *self);

} PrintableInterface;
```

An interface is registered with:

``` c
G_DEFINE_INTERFACE(Printable, printable, G_TYPE_OBJECT)
```

A class implements it with:

``` c
G_DEFINE_TYPE_WITH_CODE(
    Student,
    student,
    PERSON_TYPE,
    G_IMPLEMENT_INTERFACE(
        PRINTABLE_TYPE,
        student_printable_init
    )
)
```

The interface initialization function assigns the implementation:

``` c
static void
student_printable_init(PrintableInterface *iface)
{
    iface->print = student_print;
}
```

The exact function signatures and declarations depend on the interface
design, but the fundamental idea is that the class provides
implementations for the interface's operations.

**Remember the difference:**

-   Inheritance answers: What kind of object is this?
-   Interfaces answer: What can this object do?

This distinction becomes very useful when designing large applications.

------------------------------------------------------------------------

# 11. Object lifecycle and reference counting

GObject also provides automatic memory-management infrastructure through
reference counting.

This is one of its most important features.

In normal C, you might allocate memory:

``` c
Person *person = malloc(sizeof(Person));
```

Then later:

``` c
free(person);
```

But GObject uses a different mechanism.

The principal functions are:

``` c
g_object_ref()
g_object_unref()
```

## 11.1 Reference counting

Every GObject has a reference count.

The reference count represents how many active references are keeping
the object alive.

For example:

``` c
Person *person = g_object_new(PERSON_TYPE, NULL);
```

The object begins with one reference.

You can add another reference:

``` c
g_object_ref(person);
```

Now there are two references.

When you release one:

``` c
g_object_unref(person);
```

The object still exists because another reference remains.

When the final reference is released:

``` c
g_object_unref(person);
```

The object is finalized and its memory is eventually released.

Conceptually:

``` text
Object created                  1 reference
      |
g_object_ref()                  2 references
      |
First g_object_unref()          1 reference
      |
Final g_object_unref()          0 references
      |
Object destroyed
```

You should not use the object after its final reference has been
released.

## 11.2 Finalization

Suppose Person owns a dynamically allocated string:

``` c
self->name = g_strdup("Alice");
```

When the object is destroyed, that string must also be released.

You do this by overriding the `finalize` method.

``` c
static void
person_finalize(GObject *object)
{
    Person *self = PERSON(object);

    g_free(self->name);

    G_OBJECT_CLASS(person_parent_class)->finalize(object);
}
```

Then assign it inside class initialization:

``` c
static void
person_class_init(PersonClass *klass)
{
    GObjectClass *object_class = G_OBJECT_CLASS(klass);

    object_class->finalize = person_finalize;
}
```

Why call:

``` c
G_OBJECT_CLASS(person_parent_class)->finalize(object);
```

Because the parent class might also own resources that need to be
released.

Each class is responsible for cleaning up its own resources and allowing
its parent to do the same.

## 11.3 `dispose()` versus `finalize()`

You will frequently encounter two lifecycle methods.

  -----------------------------------------------------------------------
  Method                              Purpose
  ----------------------------------- -----------------------------------
  `dispose()`                         Releases references to other
                                      GObjects and breaks object
                                      relationships

  `finalize()`                        Releases remaining resources owned
                                      by the object, such as allocated
                                      memory
  -----------------------------------------------------------------------

For example, imagine a Window object owns a reference to another
GObject.

You might release that reference in `dispose()`.

You might free a dynamically allocated string in `finalize()`.

A typical lifecycle looks like:

``` text
g_object_new()
      |
      v
Object initialized
      |
      v
Object used
      |
      v
g_object_unref()
      |
      v
Reference count reaches zero
      |
      v
dispose()
      |
      v
finalize()
      |
      v
Memory released
```

An important detail: `dispose()` can be called more than once in certain
object-lifecycle situations, so implementations should be written to
tolerate repeated calls.

Also, reference counting alone does not automatically prevent reference
cycles. If two objects hold strong references to each other, neither may
reach zero. Weak references or explicit relationship cleanup can be
necessary.

------------------------------------------------------------------------

# 12. Putting everything together: A complete GObject inheritance example

Let's build a small example with two types:

-   `Person`: the parent class.
-   `Student`: the child class.

We want to implement:

1.  Inheritance.
2.  Object initialization.
3.  Virtual methods.
4.  Method overriding.
5.  Properties.
6.  Memory management.

To make the example easier to understand, we'll separate the
declarations from the implementations.

## 12.1 Person: The parent class

First, the declarations:

``` c
#include <glib-object.h>

typedef struct _Person Person;
typedef struct _PersonClass PersonClass;

struct _Person {
    GObject parent_instance;

    gchar *name;
    gint age;
};

struct _PersonClass {
    GObjectClass parent_class;

    void (*introduce)(Person *self);
};

/* Type registration */
GType person_get_type(void);

#define PERSON_TYPE (person_get_type())

#define PERSON(obj) \\
    (G_TYPE_CHECK_INSTANCE_CAST((obj), PERSON_TYPE, Person))

#define PERSON_CLASS(klass) \\
    (G_TYPE_CHECK_CLASS_CAST((klass), PERSON_TYPE, PersonClass))

#define PERSON_GET_CLASS(obj) \\
    (G_TYPE_INSTANCE_GET_CLASS((obj), PERSON_TYPE, PersonClass))

#define PERSON_IS_PERSON(obj) \\
    (G_TYPE_CHECK_INSTANCE_TYPE((obj), PERSON_TYPE))
```

Let's examine what we have.

The instance:

``` c
struct _Person {
    GObject parent_instance;
    gchar *name;
    gint age;
};
```

The class:

``` c
struct _PersonClass {
    GObjectClass parent_class;
    void (*introduce)(Person *self);
};
```

The macros provide:

-   Type identification.
-   Instance casting.
-   Class casting.
-   Access to the object's actual class structure.

In production code, modern GObject declarations generally use
`G_DECLARE_DERIVABLE_TYPE` or `G_DECLARE_FINAL_TYPE` in headers rather
than manually writing all these macros. Here, the manual declarations
make the underlying mechanism visible.

## 12.2 Implementing Person

Now let's implement the class.

``` c
G_DEFINE_TYPE(Person, person, G_TYPE_OBJECT)
```

This registers Person as a GObject-derived type.

Next, implement the default virtual method:

``` c
static void
person_introduce(Person *self)
{
    g_print(
        "Hello, I am %s and I am %d years old.\\n",
        self->name,
        self->age
    );
}
```

Then the initialization function:

``` c
static void
person_init(Person *self)
{
    self->name = g_strdup("Unknown");
    self->age = 0;
}
```

The class initialization:

``` c
static void
person_class_init(PersonClass *klass)
{
    klass->introduce = person_introduce;
}
```

We also need a public function to invoke the virtual method:

``` c
void
person_introduce(Person *self)
{
    g_return_if_fail(PERSON_IS_PERSON(self));

    PersonClass *klass = PERSON_GET_CLASS(self);

    klass->introduce(self);
}
```

Now we have a functioning GObject parent class.

## 12.3 Student: The child class

Now we define Student.

First, the structures:

``` c
typedef struct _Student Student;
typedef struct _StudentClass StudentClass;

struct _Student {
    Person parent_instance;

    gchar *university;
};

struct _StudentClass {
    PersonClass parent_class;
};
```

Notice:

``` c
Person parent_instance;
```

This is inheritance.

Student contains the complete Person instance as its parent.

The class structure also contains:

``` c
PersonClass parent_class;
```

This allows Student to inherit the parent's virtual methods.

Now define its type:

``` c
GType student_get_type(void);

#define STUDENT_TYPE (student_get_type())

#define STUDENT(obj) \\
    (G_TYPE_CHECK_INSTANCE_CAST((obj), STUDENT_TYPE, Student))

#define STUDENT_IS_STUDENT(obj) \\
    (G_TYPE_CHECK_INSTANCE_TYPE((obj), STUDENT_TYPE))
```

## 12.4 Registering Student

Now:

``` c
G_DEFINE_TYPE(Student, student, PERSON_TYPE)
```

This is a very important line.

It tells GObject:

``` text
Student inherits from Person.
```

The parent type is `PERSON_TYPE`, not `G_TYPE_OBJECT`.

## 12.5 Overriding the virtual method

Let's give Student a different introduction method:

``` c
static void
student_introduce(Person *person)
{
    Student *self = STUDENT(person);

    g_print(
        "Hello, I am %s, I am %d years old, "
        "and I study at %s.\\n",
        person->name,
        person->age,
        self->university
    );
}
```

Notice that the function accepts a `Person *`, not a `Student *`.

Why?

Because the virtual method was originally declared in `PersonClass`:

``` c
void (*introduce)(Person *self);
```

The overriding function must have a compatible signature.

We cast the parent pointer to Student to access the additional fields.

Now initialize Student:

``` c
static void
student_init(Student *self)
{
    self->university = g_strdup("Unknown University");
}
```

And configure the class:

``` c
static void
student_class_init(StudentClass *klass)
{
    PersonClass *person_class = PERSON_CLASS(klass);

    person_class->introduce = student_introduce;
}
```

Here is the most important operation:

``` c
person_class->introduce = student_introduce;
```

Student replaces the inherited virtual method with its own
implementation.

## 12.6 Creating and using the objects

Now let's use both types.

``` c
int main(void)
{
    Person *person;

    Student *student;

    person = g_object_new(PERSON_TYPE, NULL);

    student = g_object_new(STUDENT_TYPE, NULL);

    g_free(person->name);
    person->name = g_strdup("Alice");
    person->age = 25;

    person_introduce(person);

    g_free(student->parent_instance.name);
    student->parent_instance.name = g_strdup("Bob");

    student->parent_instance.age = 21;

    g_free(student->university);
    student->university = g_strdup("University of Bucharest");

    person_introduce(PERSON(student));

    g_object_unref(person);
    g_object_unref(student);

    return 0;
}
```

Expected output:

``` text
Hello, I am Alice and I am 25 years old.

Hello, I am Bob, I am 21 years old,
and I study at University of Bucharest.
```

Notice something particularly interesting:

We call the exact same function:

``` c
person_introduce(...)
```

But the result depends on the object's actual type.

For a Person, the default implementation runs.

For a Student, the overridden implementation runs.

This is polymorphism.

## What happened internally?

1.  **Person is created**

    `g_object_new(PERSON_TYPE, NULL)` allocates and initializes a
    Person.

2.  **Student is created**

    `g_object_new(STUDENT_TYPE, NULL)` allocates a Student with its
    inherited Person instance.

3.  **The same public method is called**

    `person_introduce()` receives a pointer to the object.

4.  **GObject identifies its actual runtime type**

    It obtains the corresponding class structure.

5.  **The appropriate virtual method is executed**

    Person uses `person_introduce`; Student uses `student_introduce`.

6.  **Objects are released**

    `g_object_unref()` releases the references.

*Note:* This example deliberately uses direct field access to make
inheritance visible. Real applications should generally expose data
through properties and public methods. Also, the example's allocated
strings would normally be released by implementing `finalize()`.

------------------------------------------------------------------------

# 13. How GTK uses GObject

Now that you understand GObject, let's connect it to GTK.

GTK is built around GObject.

Almost every major GTK component is a GObject-derived type.

For example:

-   `GtkApplication`
-   `GtkWindow`
-   `GtkWidget`
-   `GtkButton`
-   `GtkLabel`
-   `GtkEntry`

Let's examine a simplified inheritance hierarchy from GTK 4:

``` text
GObject
   |
GInitiallyUnowned
   |
GtkWidget
   |
   +-- GtkButton
   |
   +-- GtkLabel
   |
   +-- GtkEntry
   |
   +-- GtkBox
```

This is a simplified view of the inheritance hierarchy, not the complete
GTK type system.

## 13.1 What does GtkWidget provide?

GtkWidget is an important parent class.

It provides common widget functionality, such as:

-   Visibility.
-   Sizing.
-   Layout integration.
-   Focus handling.
-   Widget lifecycle.
-   CSS styling integration.
-   Accessibility integration.
-   Event handling infrastructure.

For example, a button doesn't need to implement all of these mechanisms
from scratch.

It inherits the common widget functionality from GtkWidget.

This is the main benefit of inheritance: code reuse and shared behavior.

## 13.2 Creating a GTK button

Consider this GTK 4 code:

``` c
GtkWidget *button;

button = gtk_button_new_with_label("Click me");
```

What happens internally?

Conceptually:

1.  GTK creates an instance of the button type.
2.  The button inherits the functionality of GtkWidget.
3.  The button has its own button-specific implementation.
4.  Its label property is initialized.
5.  GTK manages the widget's integration into the interface.

You can inspect its runtime type:

``` c
g_print(
    "Type: %s\\n",
    G_OBJECT_TYPE_NAME(button)
);
```

The output will identify the object's actual runtime type.

## 13.3 Properties in GTK

You can change a button's properties using GObject:

``` c
g_object_set(
    button,
    "sensitive",
    FALSE,
    NULL
);
```

This disables the button.

You can also use GTK-specific functions:

``` c
gtk_widget_set_sensitive(button, FALSE);
```

Both approaches ultimately work with the widget's underlying object
functionality.

The GTK-specific function often provides a clearer and more convenient
API.

## 13.4 Signals in GTK

A button emits a signal when clicked.

``` c
g_signal_connect(
    button,
    "clicked",
    G_CALLBACK(on_button_clicked),
    NULL
);
```

GTK uses GObject signals to provide its event-driven programming model.

For example:

``` c
static void
on_button_clicked(
    GtkButton *button,
    gpointer user_data
)
{
    g_print("Button clicked!\\n");
}
```

The button does not need to know what your callback does.

It only emits the signal.

GObject's signal system handles calling the connected functions.

## 13.5 Creating your own GTK widget

One of the most useful applications of GObject is creating custom GTK
widgets.

For example, suppose you want a custom widget called:

``` text
TemperatureWidget
```

It might inherit from GtkWidget:

``` c
typedef struct _TemperatureWidget {
    GtkWidget parent_instance;

    double temperature;

} TemperatureWidget;
```

Its class structure:

``` c
typedef struct _TemperatureWidgetClass {
    GtkWidgetClass parent_class;

} TemperatureWidgetClass;
```

Register it:

``` c
G_DEFINE_TYPE(
    TemperatureWidget,
    temperature_widget,
    GTK_TYPE_WIDGET
)
```

Notice:

``` c
GTK_TYPE_WIDGET
```

This means that TemperatureWidget inherits from GtkWidget.

You can now implement widget-specific behavior, such as custom drawing,
measurement, and layout.

In GTK 4, custom rendering is normally implemented using the widget's
`snapshot` virtual method and GTK's rendering infrastructure, rather
than the old GTK 3 drawing model.

This is how you can create reusable custom graphical components.

------------------------------------------------------------------------

# 14. GObject macros you should know

When reading GTK or GLib source code, you will encounter many macros.

These are some of the most important ones.

  -----------------------------------------------------------------------
  Macro                               Purpose
  ----------------------------------- -----------------------------------
  `G_DEFINE_TYPE()`                   Defines and registers a normal
                                      GObject-derived type

  `G_DEFINE_TYPE_WITH_PRIVATE()`      Defines a type with private
                                      instance data

  `G_DEFINE_TYPE_WITH_CODE()`         Allows additional type-registration
                                      operations

  `G_DEFINE_ABSTRACT_TYPE()`          Defines an abstract GObject type

  `G_DEFINE_INTERFACE()`              Defines a GObject interface

  `G_IMPLEMENT_INTERFACE()`           Registers interface implementation

  `G_OBJECT()`                        Casts to GObject

  `G_OBJECT_CLASS()`                  Casts to GObjectClass

  `G_OBJECT_TYPE()`                   Gets an object's runtime type

  `G_OBJECT_TYPE_NAME()`              Gets the runtime type's name

  `G_TYPE_CHECK_INSTANCE_TYPE()`      Checks whether an instance has a
                                      particular type

  `G_TYPE_CHECK_INSTANCE_CAST()`      Performs a checked instance cast

  `G_OBJECT_CLASS()`                  Accesses the GObject class
                                      structure
  -----------------------------------------------------------------------

There are also two important declaration macros:

### `G_DECLARE_DERIVABLE_TYPE`

Used when you want other developers to be able to inherit from your
class.

Example:

``` c
#define PERSON_TYPE (person_get_type())

G_DECLARE_DERIVABLE_TYPE(
    Person,
    person,
    PERSON,
    PERSON,
    GObject
)
```

You then define the class structure:

``` c
struct _PersonClass {
    GObjectClass parent_class;

    void (*introduce)(Person *self);
};
```

The instance structure is declared by the macro, so you normally store
additional instance fields privately.

### `G_DECLARE_FINAL_TYPE`

Used when you don't want other classes to inherit from your type.

Example:

``` c
#define STUDENT_TYPE (student_get_type())

G_DECLARE_FINAL_TYPE(
    Student,
    student,
    STUDENT,
    STUDENT,
    GObject
)
```

A final class can still inherit from another class, but it cannot itself
be subclassed.

**Important:** `G_DECLARE_DERIVABLE_TYPE` and `G_DECLARE_FINAL_TYPE` are
normally used in header files, while `G_DEFINE_TYPE` and related macros
are used in implementation files.

------------------------------------------------------------------------

# 15. How all the concepts fit together

Let's put all the main concepts into one picture.

``` text
                 GObject architecture

+----------------------------------------------+
| Runtime type system — GType                  |
| Identifies types, parents, interfaces,       |
| and registered metadata.                     |
+----------------------------------------------+

+----------------------+  +----------------------+
| Instance structure   |  | Class structure      |
|----------------------|  |----------------------|
| Individual data      |  | Shared class behavior|
| Parent instance      |  | Virtual methods      |
| Object state         |  | Parent class         |
+----------------------+  +----------------------+

+--------------------+  +--------------------+
| Inheritance        |  | Polymorphism       |
| Reuse and extend   |  | Override virtual   |
| parent classes     |  | methods            |
+--------------------+  +--------------------+

+--------------------+  +--------------------+
| Properties         |  | Signals            |
| Standardized       |  | Communicate events |
| object data access |  | between objects    |
+--------------------+  +--------------------+

+--------------------+  +--------------------+
| Interfaces         |  | Reference counting |
| Share capabilities |  | Manage object      |
| across classes     |  | lifetime           |
+--------------------+  +--------------------+
```

# 16. Important differences between C++, Java, and GObject

If you already know an object-oriented programming language, this
comparison can help you understand GObject.

  -------------------------------------------------------------------------------------
  Concept           C++                      Java                     GObject
  ----------------- ------------------------ ------------------------ -----------------
  Class             Native language feature  Native language feature  C structures and
                                                                      runtime
                                                                      registration

  Object            Class instance           Class instance           Instance
                                                                      structure

  Inheritance       `class B : public A`     `class B extends A`      Parent instance
                                                                      as first member

  Virtual method    `virtual`                Overridable instance     Function pointers
                                             methods                  in class
                                                                      structure

  Polymorphism      Virtual dispatch         Dynamic dispatch         Runtime class and
                                                                      virtual method
                                                                      dispatch

  Interface         Abstract class/interface `interface`              GObject interface

  Properties        Usually                  Fields/getters/setters   GObject property
                    fields/getters/setters                            system

  Events            Libraries or callbacks   Listeners and events     Signals

  Memory management Manual or smart pointers Garbage collection       Reference
                                                                      counting

  Runtime type      RTTI                     Built-in                 GType system
  information                                                         
  -------------------------------------------------------------------------------------

One important difference is memory management.

GObject does not use garbage collection like Java.

Instead, it primarily uses reference counting.

Another difference is that GObject makes many object-oriented features
available through C conventions rather than requiring compiler support.

------------------------------------------------------------------------

# 17. Common mistakes when learning GObject

These are mistakes worth avoiding.

**1. Confusing the instance structure with the class structure**

Remember:

``` c
struct _Person {
    GObject parent_instance;
    gint age;
};
```

Contains data belonging to an individual object.

Whereas:

``` c
struct _PersonClass {
    GObjectClass parent_class;
    void (*introduce)(Person *self);
};
```

Contains class-level behavior.

**2. Forgetting the parent instance**

When implementing inheritance, the parent must be the first member of
the instance structure.

**3. Using the wrong parent type**

For example:

``` c
G_DEFINE_TYPE(Student, student, G_TYPE_OBJECT)
```

would make Student inherit directly from GObject.

If Student should inherit from Person, use:

``` c
G_DEFINE_TYPE(Student, student, PERSON_TYPE)
```

**4. Confusing properties with structure fields**

A field is simply a C variable inside a structure.

A GObject property is a registered attribute with metadata, access
rules, and optional notifications.

A field can back a property, but they are not the same thing.

**5. Forgetting to release references**

Every owned reference should eventually be released.

For example:

``` c
g_object_unref(object);
```

Failing to do this can cause memory leaks.

**6. Forgetting the parent implementation**

When overriding lifecycle methods such as `dispose()` and `finalize()`,
you generally need to invoke the corresponding parent implementation.

**7. Assuming signals and virtual methods are the same**

Virtual methods customize class behavior.

Signals announce events and allow callbacks to react.

------------------------------------------------------------------------

# 18. Recommended learning resources

If you want to understand GObject at a deeper level, I recommend reading
the official documentation in this order:

1.  **GObject Concepts** --- [Official GObject
    concepts](https://docs.gtk.org/gobject/concepts.html).
2.  [GObject tutorial](https://docs.gtk.org/gobject/tutorial.html) ---
    practical examples of creating types and using properties.
3.  [GObject reference](https://docs.gtk.org/gobject/class.Object.html)
    --- the base object API.
4.  [GObject signals](https://docs.gtk.org/gobject/signals.html) ---
    signal registration, emission and callbacks.
5.  [GTK 4 documentation](https://docs.gtk.org/gtk4/) --- see how
    GObject is used in a real graphical toolkit.

------------------------------------------------------------------------

# 19. The most important things to remember

If you remember only a few concepts, remember these:

  Concept              What it means
  -------------------- --------------------------------------------------
  GObject              An object-oriented system implemented in C
  GType                Runtime identification and registration of types
  Instance structure   Holds data belonging to an individual object
  Class structure      Holds shared behavior and virtual methods
  `G_DEFINE_TYPE`      Registers and defines a GObject type
  `g_object_new()`     Creates a GObject instance
  Inheritance          Embeds the parent instance and extends its class
  Virtual methods      Allow subclasses to override behavior
  Properties           Provide a standardized interface to object data
  Signals              Allow objects to communicate through events
  Interfaces           Allow unrelated classes to share capabilities
  `g_object_unref()`   Releases an object reference

**My recommendation:** Pay particular attention to the relationship
between the instance structure, class structure, and `G_DEFINE_TYPE`.
These three concepts are the foundation for understanding almost
everything else in GObject.

Once you understand them, GTK's architecture becomes much easier to
follow.
