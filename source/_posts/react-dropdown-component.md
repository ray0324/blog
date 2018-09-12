---
title: React下拉菜单组件设计
date: 2018-09-01 02:25
tags:
  - React
---

React Dropdown下拉组件是一个比较典型的应用。通常在设计组件的时只关注组件内部的事件传递和事件处理，遇到需要在全局绑定事件处理函数的时候，并不知道该怎么处理，下拉菜单组件就是一个典型的例子，当展开菜单后，需要在全局注册一个`click`事件，当点击组件以外的区域时，需要折叠该下拉菜单。这是一个比较典型的应用案例。

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
      // 注意事件的绑定解绑不能传递匿名函数
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