---
title: Javascript中经典自定义函数
date: 2016-06-30 14:11
tags:
  - JavaScript
---

## 日期格式化函数

```js

Date.prototype.Format = function(fmt){
  var o = {
    "m+" : this.getMonth()+1,  //月份
    "d+" : this.getDate(),     //日
    "h+" : this.getHours(),    //小时
    "i+" : this.getMinutes(),  //分
    "s+" : this.getSeconds(),  //秒
  };
  if(/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt;
}

```


## 模板引擎

```html

<!-- 模版代码 -->
<script type="text/html" id="tpl">
  <ul>
    <% for ( var i = 0; i < users.length; i++ ) { %>
      <li><a href="<%=users[i].url%>"><%=users[i].name%></a></li>
    <% } %>
    </ul>
</script>

<!-- 模版引擎仅用一个函数实现 -->
<script type="text/javascript">
  function template(id,obj){
    var html=document.getElementById(id).innerHTML;
    var result="var p=[]; with(obj){p.push('"
        +html.replace(/[\r\n\t]/g,"")
          .replace(/<%=(.*?)%>/g,"');p.push($1);p.push('")
          .replace(/<%/g,"');")
          .replace(/%>/g,"p.push('")
        +" ');}return p.join('');";
    var fn=new Function("obj",result);
    return fn(data);
  }
</script>

<!-- 使用方法 -->
<script type="text/javascript">
  var data ={users:[{url:2,name:'ray'},{url:1,name:'ray0324'}]};
  var str = template('tpl',data);
  document.getElementById('wrap').innerHTML =str;
</script>

```