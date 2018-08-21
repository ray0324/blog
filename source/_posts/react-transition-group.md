---
title: react transition group 使用注意点
date: 2018-08-22 01:44
tags:
  - react
  - animation
---

## CSSTransition

1.接受`in`为必选boolean参数，根据其值来设定classname为enter enter-active 或者 exit exit-active

典型用法：

```javascript
  <CSSTransition in={this.state.show} classNames="ani" timeout={100}>
    <Other />
  </CSSTransition>
```

2.接受`in`和`appear`CSSTransition首次加载的时候  appear appear-active才起作用

典型用法：

```javascript
{ 
  this.state.show && 
  <CSSTransition in appear classNames="ani" timeout={100}>
    <Other />
  </CSSTransition>
}
```