---
title: hello
date: 2015-08-21 23:50:10
tags:
---
## RN

```
import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    Picker,
    // PickerIOS,
    TouchableOpacity,
    PixelRatio,
    StyleSheet
} from 'react-native';

import { Button } from './components/Button';
import { Select } from './components/Select';

export default class BranchSet extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.itm1}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.props.navigator.pop()}
                    >
                    <Text style={styles.itm1Txt}>hello</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.props.navigator.replace({name:'signin'})}
                    >
                    <Text style={styles.itm1Txt}>hello</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.itm2}>
                <Select />
            </View>
        </View>

    );
  }
}
```

### bash

```bash
npm install jquery
```
### markdown

```markdown
## Summary

- [General](#general)
- [Features](#features)
- [Install](#install)
- [Configuration](#configuration)
- [License](#license)

## General

- **Version** : 2.0
- **Compatibility** : Hexo 3 or later

## Features
```

## JavaScript

```javascript
var data = {
  a:1,
  b:2
}
console.log(data);
```
## css 文件

```

pre {
  font-family: "Menlo", "Meslo LG", monospace;
  font-size: 13px;
  padding: 0;
  padding-bottom: 0;
  line-height: 22px;
  border-radius: 4px;
  border: 1px dotted #666;
  overflow-x: auto;
}
```
## YAML 文件

```
# Site
title: Hexo
subtitle:
description:
author: John Doe
language:
timezone: Asia/Shanghai
```
## JSON DATA

```
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": {"text": "...", "sensitive": false}
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": {"text": "...", "sensitive": false}
  }
]
```
## Javascript

```
/**
* Meta Helper
* @description Generate meta tags for HTML header
* @example
*     <%- meta(post) %>
*/
function trim (str) {
    return str.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
}

function split (str, sep) {
    var result = [];
    var matched = null;
    while (matched = sep.exec(str)) {
        result.push(matched[0]);
    }
    return result;
}
```

thisi is `npm install gulp`
thisi is `npm install grunt`
