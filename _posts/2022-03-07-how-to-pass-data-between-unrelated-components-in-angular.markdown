---
layout: post
title:  "How To Pass Data Between Unrelated Components In Angular"
date:   2022-03-07 11:53:56
categories: JavaScript
description: How To Pass Data Between Unrelated Components In Angular
keywords: [Andrei Pall, blog, linux, framework]
excerpt: To pass data between unrelated components In Angular use a shared service with Subject or BehaviorSubject, like this:
---
<p>To pass data between unrelated components In Angular use a shared service with Subject or BehaviorSubject, like this:</p>
{% highlight javascript %}
// service.ts

@Injectable({
 providedIn: 'root'
})
export class MyService {
 sharedValue$ = new Subject();
}

// component a

@Component({
 ...
})
export class ComponentA implements OnInit {
constructor(private myService: MyService) {
}

ngOnInit() {
 // get data
 this.myService.sharedValue$.subscribe(data => {
  // data will update here upon changes
  console.log(data) // 100
 })
}


}

// component b

@Component({
 ...
})
export class ComponentB implements OnInit {
constructor(private myService: MyService) {
}

ngOnInit() {
 // set data
 this.myService.sharedValue$.next(100)
}


}
{% endhighlight %}
