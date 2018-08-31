---
title: React下拉菜单组件设计
date: 2018-09-01 02:25
tags:
  - React
---

React Dropdown下拉组件是一个比较典型的应用。通常在设计组件的时只关注组件内部的事件传递和事件处理函数，而下拉菜单组件就需要在组件外部绑定事件，这个应用比较典型。

## 组件源码

```jsx
import React from 'react';
import './style.css';

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      // 在DOM根节点上为组件绑定事件处理函数
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    // 在这里解绑组件在DOM根节点上绑定的事件
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }

  render() {
    return (
      <div className="dropdown">
        <div className="button" onClick={this.showDropdownMenu}> My Setting </div>
        {
          this.state.displayMenu ? (
            <ul>
              <li><a className="active" href="#Create Page">Create Page</a></li>
              <li><a href="#Manage Pages">Manage Pages</a></li>
              <li><a href="#Create Ads">Create Ads</a></li>
              <li><a href="#Manage Ads">Manage Ads</a></li>
              <li><a href="#Activity Logs">Activity Logs</a></li>
              <li><a href="#Setting">Setting</a></li>
              <li><a href="#Log Out">Log Out</a></li>
            </ul>
          ) : null
        }
      </div>

    );
  }
}
export default Dropdown;

```