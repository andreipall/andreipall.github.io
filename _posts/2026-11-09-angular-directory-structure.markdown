---
layout: post
title:  "Angular directory structure"
date:   2026-11-09 01:46:56
categories: JavaScript
description: Angular directory structure
keywords: [Andrei Pall, blog, php, symfony, framework]
excerpt: For a new Angular 22+ project using standalone components, I recommend a feature-based directory structure, rather than organizing the entire application by file type.
---
For a new **Angular 22+ project using standalone components**, I recommend a **feature-based directory structure**, rather than organizing the entire application by file type.

This is particularly suitable for Angular applications that consume Spring Boot REST APIs.

## 1. Recommended directory structure

```text
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.interceptor.ts
│   │   ├── interceptors/
│   │   │   └── error.interceptor.ts
│   │   └── services/
│   │       └── notification.service.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── loading-spinner/
│   │   │   └── confirmation-dialog/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── features/
│   │   ├── users/
│   │   │   ├── components/
│   │   │   │   └── user-form/
│   │   │   │       ├── user-form.ts
│   │   │   │       ├── user-form.html
│   │   │   │       └── user-form.css
│   │   │   ├── pages/
│   │   │   │   ├── user-list/
│   │   │   │   │   ├── user-list.ts
│   │   │   │   │   ├── user-list.html
│   │   │   │   │   └── user-list.css
│   │   │   │   └── user-detail/
│   │   │   ├── services/
│   │   │   │   └── users-api.service.ts
│   │   │   ├── models/
│   │   │   │   └── user.model.ts
│   │   │   └── users.routes.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   ├── components/
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   └── settings/
│   │       ├── pages/
│   │       ├── services/
│   │       └── settings.routes.ts
│   │
│   ├── layout/
│   │   ├── header/
│   │   ├── sidebar/
│   │   └── footer/
│   │
│   ├── app.ts
│   ├── app.html
│   ├── app.css
│   ├── app.config.ts
│   └── app.routes.ts
│
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
│
├── assets/
├── styles.css
├── index.html
└── main.ts
```

This follows Angular's modern recommendations: organize code by feature, keep related files together, and avoid large global directories containing unrelated components and services.

The `core`, `shared`, `features`, and `layout` directories are architectural conventions, not mandatory Angular directories.

## 2. What belongs in each directory?

| Directory | Purpose |
|---|---|
| `core/` | Application-wide authentication, guards, interceptors and singleton services |
| `shared/` | Reusable components, directives, pipes and utilities |
| `features/` | Application functionality organized by business domain |
| `layout/` | Header, navigation, sidebar, footer and page layouts |
| `environments/` | Environment-specific configuration |
| `assets/` | Static assets such as images and fonts |

The most important rule is to keep feature-specific code inside its feature. For example, a `UsersApiService` should remain inside `features/users/`, not in a global `services/` directory.

## 3. Feature-based routing with lazy loading

**app.routes.ts**

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes')
        .then(m => m.USERS_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)
  }
];
```

**features/users/users.routes.ts**

```typescript
import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/user-list/user-list')
        .then(m => m.UserList)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail')
        .then(m => m.UserDetail)
  }
];
```

This keeps routing independent for each feature and allows Angular to lazy-load functionality when required.

## 4. Organizing REST API services

For a Spring Boot backend, I recommend creating a dedicated API service for each feature.

**features/users/services/users-api.service.ts**

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl,
      user
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
```

**features/users/models/user.model.ts**

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
}
```

For larger applications, consider separate models for `User`, `CreateUserRequest`, and `UpdateUserRequest`, because the data required to create a user often differs from the data returned by the API.

## 5. Organizing components within features

A useful distinction is between *pages* and *components*.

**Pages** represent routed screens, such as `UserList`, `UserDetail`, and `UserEdit`. They coordinate data loading, user actions and navigation.

**Components** represent reusable pieces of a feature, such as `UserForm`, `UserTable`, and `UserFilters`. They receive inputs and emit events where appropriate.

If a component is reused only within the users feature, keep it under `features/users/components/`. Move it into `shared/components/` only when it is genuinely reusable across unrelated features.

## 6. What I would avoid

I would avoid this structure for a medium or large project:

```text
app/
├── components/
│   ├── user-list/
│   ├── user-form/
│   ├── dashboard/
│   └── settings/
├── services/
│   ├── users.service.ts
│   ├── dashboard.service.ts
│   └── settings.service.ts
├── models/
│   ├── user.ts
│   ├── dashboard.ts
│   └── settings.ts
└── guards/
```

It works for small projects, but as the application grows, related files become scattered across directories.

Also, don't introduce excessive nesting for a feature with only one or two files. Keeping related files together is more important than following a rigid directory hierarchy.

## 7. My recommendation

For a new Angular + Spring Boot application, use:

- **Feature-based architecture** for business functionality.
- **Standalone components**, without new NgModules.
- **Lazy-loaded feature routes**.
- **Feature-specific REST API services**.
- **Signals** for component state, with RxJS where useful for HTTP and asynchronous streams.
- **Core services** for application-wide functionality.
- **Shared components** only for genuinely reusable UI.

One additional recommendation: follow Angular CLI's current file-naming conventions (`user-list.ts`, `user-list.html`, etc.) consistently rather than mixing them with older `.component.ts` naming conventions.

**For a long-lived enterprise application, the feature-based structure above is the approach I would choose.** It scales well, makes features easier to maintain, and reduces the impact of future Angular upgrades.
