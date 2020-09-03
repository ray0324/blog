---
title: 利用canvas实现图片压缩
date: 2020-09-03 09:39:41
tags:
  - canvas
  - compress
---

在本地照片上传过程中经常需要用到图片压缩，这里利用h5的canvas来实现

```js
/**
 * @param {File} file 图片文件
 * @param {Object} opt 选项
 * @property {number} opt.width 图片宽度
 * @property {number} opt.height 图片宽度
 * @property {number} opt.quality 图片图片质量[0,1]
 */
function imgCompress(file, { width, height, quality }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = () => {
      reject("FileReader read file Error!");
    };
    reader.onload = () => {
      var img = new Image();
      img.src = reader.result;
      img.onerror = () => {
        reject("Image read Error!");
      };
      img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var scale = Math.max(img.width / width, img.height / height, 1);
        canvas.width = img.width / scale;
        canvas.height = img.height / scale;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
}

```