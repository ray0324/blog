---
title: React中常见问题
date: 2023-06-12 09:07
tags:
  - React
---


## React 中 useMemo 和 useCallback 区别

useMemo 和 useCallback 是 React Hooks 提供的一些自定义 Hook，用于优化性能和避免不必要的计算。

useMemo 用于缓存计算结果，只有当依赖项发生变化时，才会重新计算结果。它通常用于计算一些不会频繁变化的复杂数据，例如从 API 获取的数据或需要大量计算的数据。

useCallback 用于缓存函数，只有当依赖项发生变化时，才会重新创建函数。它通常用于缓存事件处理程序或需要频繁调用的函数，以避免不必要的函数创建和销毁。

以下是它们的主要区别：

1. useMemo 返回计算结果，而 useCallback 返回函数引用。
2. useMemo 的依赖项可以是任何可以比较的值（例如字符串、数字、对象），而 useCallback 的依赖项必须是函数或类实例。
3. useMemo 的返回值可以在组件渲染时使用，而 useCallback 的返回值只能用于回调函数中。
4. useMemo 可以接受一个可选的初始值参数，如果没有提供初始值，则返回第一个依赖项的结果。而 useCallback 必须至少提供一个依赖项。
   综上所述，useMemo 更适用于缓存计算结果，而 useCallback 更适用于缓存函数。

### useCallback 示例

```js
import React, { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```

### useMemo 示例

```js
import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const result = useMemo(() => {
    console.log('compute');
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>count: {count}</p>
      <p>result: {result}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count)}>1</button>
    </div>
  );
}
```

## React 中 useMemo 和 memo 有何区别

React 中 useMemo 和 memo 的区别如下

- memo 是一个高阶组件，而 useMemo 是一个 React Hook。
- memo 用于包装不想重新渲染的组件，而 useMemo 用于包装函数，以确保该函数中的值仅在其依赖项之一发生变化时才重新计算。
- memo 会跳过渲染组件并重用上次渲染的结果，而 useMemo 不会改变组件的渲染过程。

```js
import React, { memo } from 'react';

const Child = memo(function Child({ count }) {
  console.log('Child render');
  return <div>Child: {count}</div>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleClick}>+1</button>
      <Child count={count} />
    </div>
  );
}
```


## React 的 Hooks 函数和普通函数有什么不同

react 的 hooks 函数和普通函数有以下不同：

- 调用方式不同：hooks 函数组件内调用，普通函数不在组件内调用。
- 参数不同：hooks 函数参数为 props，普通函数参数为 url。
- 功能不同：hooks 函数能调用诸如 useState、useRef 等，普通函数则不能。由此可以通过内置的 Hooks 获得 Fiber 的访问方式，可以实现在组件级别存储数据的方案等。hooks 函数需要以 use 开头，普通函数则没有这个限制。

## React 中的 key 有什么作用

key 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染，提高 React 应用的性能。

## React 中的 diff 算法

React 中的 Diff 算法是同层比较算法，它可以实现时间复杂度为 O(n)的算法，其中 n 是树中节点的总数。

React 为了性能优化，会在内存中维护一个虚拟 DOM，当有变动发生时，会通过 Diff 算法对新旧 DOM 树进行比较，找出需要更新的部分，再把需要更新的部分放到真实的 DOM 树上，这样就完成了一次 UI 的更新。

## React 中的 setState 是同步还是异步的

在 React 中，setState 并不总是同步的，它可能是异步的。

React 为了提高性能，会将多个 setState()调用合并成一个调用，而不是每次状态变化都执行一次 render()方法。

但是，当你想要在调用 setState()后获取最新的状态数据时，这种合并机制就会导致你无法立即拿到最新的状态数据。

React 为了解决这个问题，提供了 setState()的第二个参数，它可以接受一个回调函数，该回调函数会在 setState()完成合并并重新渲染组件后执行。

## React 中的事件处理

React 中的事件处理和原生的事件处理有以下不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- 在 React 中你不能通过返回 false 的方式阻止默认行为，你必须明确的使用 preventDefault。
- 在 React 中你不能通过返回 false 的方式阻止事件冒泡，你必须明确的调用 stopPropagation。

## React 中的事件合成

React 中的事件是通过事件委托的方式处理的，它使用了统一的事件监听器，将所有的事件都绑定到了 document 上，而并非将事件绑定到每一个节点上。

React 中的事件委托是基于合成事件的，合成事件是 React 根据 W3C 标准制定的一套合成事件接口，它屏蔽了底层浏览器的 API 细节，提供了一套更简单的事件处理机制，并且它是跨浏览器的。

## React 中的事件绑定

React 中的事件绑定和原生的事件绑定有以下不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。


