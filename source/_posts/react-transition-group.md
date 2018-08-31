---
title: React-transition-group 使用注意点
date: 2018-08-22 01:44
tags:
  - React
  - Animation
---

## CSSTransition

`CSSTransition`组件是参考`ng-animate`进行设计的，在动画的关键位置为DOM添加节点，然后通过CSS3在这些关键位置添加关键帧动画以实现动画效果。

如：

```jsx
  <CSSTransition
    in={show}
    timeout={400}
    classNames="fade"
    mountOnEnter
    unmountOnExit
  >
    <Modal content="hello" />
  </CSSTransition>
```

这里通过切换`in`的值来实现显示或隐藏`Modal`组件，上面的示例在切换`in`的值为`true`时，`Modal`组件先添加`fade-enter`，紧接着会添加`fade-enter-active`,400ms的`timeout`时间过去后，再添加`fade-enter-done`，当再次切换`in`的状态时候，也一样得到`fade-exit`,`fade-exit-active`,`fade-exit-active`,我们在这三个关键节点上添加动画关键帧来实现动画。

```less
.fade{
  &-enter{
    opacity: 0.01;
    transform: scale(1.185);
    &-active{
      opacity: 1;
      transform: scale(1);
      transition: opacity 400ms ease-in, transform 400ms ease-in;
    }
  }
  &-exit{
    opacity: 1;
    transform: scale(1);
    &-active{
      opacity: 0.01;
      transform:scale(1.185);
      transition: opacity 400ms ease-out, transform 400ms ease-out;
    }
  }
}

```

**这里需要注意的是，淡出的时候在添加`unmountOnExit`来卸载组建而不是直接判断，下面的写法就会导致淡出的动画还未进行，组建就已经卸载了，这是经常可能碰到的一个坑。**

```jsx
  <CSSTransition
    in={show}
    timeout={400}
    classNames="fade"
  >
    { show && <Modal content="hello" />}
  </CSSTransition>
```

### 典型使用示例

[https://github.com/Ihatetomatoes/react-transition-group-classes](https://github.com/Ihatetomatoes/react-transition-group-classes)