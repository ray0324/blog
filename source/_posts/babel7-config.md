---
title: Babel7配置说明
date: 2021-12-31 19:22
tags:
  - Babel
---

Babel 是一个工具链,主要用于将 ECMAScript 2015+ 版本的代码转换为向后
兼容的 JavaScript 语法,以便能够运行在当前和旧版本的浏览器或其他环境中。

在实际开发中，经常会遇到需要配置 babel 转码的场景,Babel 那么多插件，到底该
怎么配置？

## 如何选择插件

通常我们只需要配置`@babel/preset-env`预设来自动加载大部分插件，这个预
设究竟包含哪些插件呢？babel 官网有详细的罗列:

### TC39 Proposals

**_注意：如果使用到 TC39 草案中的特性(以上),则需要单独加载相关的 babel 插件。_**

- async-do-expressions
- decorators
- do-expressions
- export-default-from
- function-bind
- function-sent
- partial-application
- pipeline-operator
- private-methods
- record-and-tuple
- throw-expressions

### @babel/preset-env 预设包含的插件

**_注意：以下插件在@babel/preset-env 中已经自动集成，无需单独加载_**

#### ES2022

- class-properties
- class-static-block
- private-property-in-object
- syntax-top-level-await

#### ES2021

- logical-assignment-operators
- numeric-separator

#### ES2020

- export-namespace-from
- nullish-coalescing-operator
- optional-chaining
- syntax-bigint
- syntax-dynamic-import
- syntax-import-meta

#### ES2019

- optional-catch-binding
- json-strings

#### ES2018

- async-generator-functions
- object-rest-spread
- unicode-property-regex
- dotall-regex
- named-capturing-groups-regex

#### ES2017

- async-to-generator

#### ES2016

- exponentiation-operator

#### ES2015

- arrow-functions
- block-scoping
- classes
- computed-properties
- destructuring
- duplicate-keys
- for-of
- function-name
- instanceof
- literals
- new-target
- object-super
- parameters
- shorthand-properties
- spread
- sticky-regex
- template-literals
- typeof-symbol
- unicode-escapes
- unicode-regex

#### ES5

- property-mutators

#### ES3

- member-expression-literals
- property-literals
- reserved-words



### @babel/plugin-transform-runtime

这个插件可以抽出转码过程中的一些帮助方法，使之可以在项目中复用
一般装了这个插件相应的也要安装相应的运行环境一般引入的插件不会造成全局污染
适合开发公共lib库的时候引入,而对于一般性的项目则无需引入直接配置好prese-env即可

```bash
npm i --save-dev @babel/plugin-transform-runtime
```

```js

// babel配置corejs:false/2/3
{
  plugins: [
    ["@babel/plugin-transform-runtime",{corejs:false}],
  ],
}

// corejs:false - 输出代码
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
// corejs:2 - 输出代码
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));
// corejs:3 - 输出代码
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

```

**根据以上输出代码可知根据配置的不同项目依赖需要分别安装不同的runtime**

```bash
npm i --save @babel/runtime # corejs:false
npm i --save @babel/runtime-corejs2 # corejs:2
npm i --save @babel/runtime-corejs3 # corejs:3
```

## 结论

### 在一般项目中配置

```js
 // package.json
 {
   "dependencies": {
    "core-js": "^3.20.1"
  },
  "devDependencies"{
    "@babel/core": "^7.16.5",
    "@babel/plugin-proposal-decorators": "^7.16.5",
    "@babel/preset-env": "^7.16.5",
  }
 }

 // babel.config.js
 {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        loose: true,
        useBuiltIns: "usage",
        corejs: "3.20",
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
};

```

### 在公共lib开发

```js
//package.json
{
  "dependencies": {
    "@babel/runtime-corejs3": "^7.16.5"
  },
  "devDependencies": {
    "@babel/core": "^7.16.5",
    "@babel/plugin-proposal-decorators": "^7.16.5",
    "@babel/plugin-transform-runtime": "^7.16.5",
    "@babel/preset-env": "^7.16.5",
  }
 }

// babel.config.js
{
  presets: [
    [ "@babel/preset-env", { modules: "auto" } ],
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", { corejs: 3 }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
}


 ```
