---
title: File、Blob与Base64相互转化
date: 2019-03-26 08:58
tags:
  - base64
  - File
  - Blob
  - FormData
---

Web开发过程中，经常会用到文件上传的功能，有时候我们需要将文件转化成base64或者将base64转化成文件的形式来适配后端接口。

## File转Base64

通常使用FileReader读取文件的base64

```js
  // 将文件转化成base64
  function fileToBase64(file, cb) {
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      cb(e.target.result)
    }
    fileReader.readAsDataURL(file);
  }

  // 使用
  document.querySelector('#file').addEventListener('change', function (e) {
    var file = e.target.files[0];
    fileToBase64(file, function (base64) {
      // 输出文件的base64信息
      console.log(base64);
    })
  })

```

## Base64转Blob

```js
  // 将文件转化成Blob
  function base64ToBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var binaryString = atob(arr[1]);
    var n = binaryString.length;
    var buffer = new Uint8Array(n);
    while (n--) {
      buffer[n] = binaryString.charCodeAt(n);
    }
    return new Blob([buffer],{type: mime});
  }
```

## 利用FormData上传文件

```js
  var blob = new Blob([buffer],{type: mime})
  const data = new FormData();
  data.append('filename', blob);
  const opt = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  axios.post(url, data, opt);
```

