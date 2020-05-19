---
title: Debounce & Throttle
date: 2020-05-19 17:29
tags:
  - debounce
  - throttle
---

## Debounce

在 JavaScript 中，`debounce` 函数所做的事情就是，强制一个函数在某个连续时间段内只执行一次，哪
怕它本来会被调用多次。我们希望在用户停止某个操作一段时间之后才执行相应的监听函数，而不是在用户操
作的过程当中，浏览器触发多少次事件，就执行多少次监听函数。

```js
/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
*
* @return {Function}     返回一个“去弹跳”了的函数
*/
function debounce(fn, delay) {

  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
```

## Throttle

`throttle`就是固定函数执行的速率，即所谓的“节流”。正常情况下，mousemove 的监听函数可能会每
20ms（假设）执行一次，如果设置 200ms 的“节流”，那么它就会每 200ms 执行一次。比如在1s 的时间
段内，正常的监听函数可能会执行 50（1000/20） 次，“节流” 200ms 后则会执行 5（1000/200） 次。

```js
/**
*
* @param fn {Function}   实际要执行的函数
* @param delay {Number}  执行间隔，单位是毫秒（ms）
*
* @return {Function}     返回一个“节流”函数
*/

function throttle(fn, threshhold) {

  // 记录上次执行的时间
  var last

  // 定时器
  var timer

  // 默认间隔为 250ms
  threshhold || (threshhold = 250)

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {

    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    var now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

    // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}
```