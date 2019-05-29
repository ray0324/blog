---
title: React-transition-group 之异步路由动画
date: 2019-04-23 10:47
tags:
  - React
  - Animation
---

在使用React-transition-group做路由动画的时候，经常因为code spliting导致动画无效。原因
多半是由于路由钩子动画执行的时候组件并未加载到。所以观察DOM结构中并未发现react动画相关的
钩子class。这就需要我们在做代码拆分的时候做写细节处理。

```jsx
// route.js
import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './app.css';

// 代码code spliting
const Index = React.lazy(() => import("./pages/index"));
const About = React.lazy(() => import("./pages/about"));
const Home = React.lazy(() => import("./pages/home"));

// 注意：这里的div为外层动画的挂载点。
// page内部的节点异步挂载
const wrap = WrappedComponent => () => (
  <div className="page">
    <Suspense fallback={null}>
      <WrappedComponent />
    </Suspense>
  </div>
);

function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="page"
              appear
              timeout={850}
            >
              <Switch location={location}>
                <Route exact path="/" component={wrap(Index)} />
                <Route exact path="/home" component={wrap(Home)} />
                <Route exact path="/about" component={wrap(About)} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

```

下面是三个被拆分的示例组件代码

```jsx
// index.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Index extends Component {
  render() {
    return (
      <div
        className="index"
        style={{
          backgroundColor: "rgb(255,80,61)"
        }}
      >
        <h1>Index Page</h1>
        <p>
          <Link to="/">index</Link>
          <Link to="/home">home</Link>
          <Link to="/about">about</Link>
        </p>
      </div>
    );
  }
}

```

```jsx
// home.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Index extends Component {
  render() {
    return (
      <div
        className="home"
        style={{
          backgroundColor: "rgb(78,133,255)"
        }}
      >
        <h1>Home Page</h1>
        <p>
          <Link to="/">index</Link>
          <Link to="/home">home</Link>
          <Link to="/about">about</Link>
        </p>
      </div>
    );
  }
}


```

```jsx
// about.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Index extends Component {
  render() {
    return (
      <div
        className="about"
        style={{
          backgroundColor: "rgb(0,163,58)"
        }}
      >
        <h1>About Page</h1>
        <p>
          <Link to="/">index</Link>
          <Link to="/home">home</Link>
          <Link to="/about">about</Link>
        </p>
      </div>
    );
  }
}


```

样式文件

```css
/*app.css */
.page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.page-appear {
  opacity: 0;
  top: 20px;
}

.page-appear-active {
  opacity: 1;
  top: 0;
  transition: opacity 550ms ease-in, top 550ms ease-in;
}

.page-enter {
  opacity: 0;
  top: 20px;
}

.page-enter-active {
  opacity: 1;
  top: 0;
  transition: opacity 550ms ease-in 300ms, top 550ms ease-in 300ms;
}

.page-exit {
  opacity: 1;
  top: 0;
}

.page-exit-active {
  opacity: 0;
  top: 20px;
  transition: opacity 250ms ease, top 250ms ease;
}

```