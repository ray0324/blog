---
title: 股票常见行情指标计算-MA
date: 2021-07-04 14:15
tags:
  - stock
---

## 移动平均线(MA)

移动平均线，Moving Average，简称 MA，MA 是用统计分析的方法，将一定时期内的证券价格（指数）加以平均，并把不同时间的平均值连接起来，形成一根 MA，用以观察证券价格变动趋势的一种技术指标。

移动平均线是由著名的美国投资专家 Joseph E.Granville（葛兰碧，又译为格兰威尔）于 20 世纪中期提出来的。均线理论是当今应用最普遍的技术指标之一，它帮助交易者确认现有趋势、判断将出现的趋势、发现过度延生即将反转的趋势。

N 日移动平均线=N 日收市价之和/N

以时间的长短划分，移动平均线可分为短期、中期、长期几种，一般短期移动平均线 5 天与 10 天；中期有 30 天、65 天；长期有 200 天及 280 天。可单独使用，也可多条同时使用。综合观察长、中、短期移动平均线，可以判研市场的多重倾向。如果三种移动平均线并列上涨，该市场呈多头排列；如果三种移动平均线并列下跌，该市场呈空头排列。

移动平均线说到底是一种趋势追踪的工具，便于识别趋势已经终结或反转，领先的趋势正在形成或延续的契机。它不会领先于市场，只是忠实地追随市场，所以它具有滞后的特点，然而却无法造假。

### 实现

```js

function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push(undefined);
      continue;
    }
    var sum = 0;
    // 计算 (i-dayCount,i]收盘价总和
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j];
    }
    result.push(sum / dayCount);
  }
  return result;
}
```

### 算法优化

```js
function MA(n, data) {
  let result = [];
  let sum = 0;
  for (let i = 0, len = data.length; i < len; i++) {
    sum += data[i];
    if (i >= n) {
      sum -= data[i - n];
    }

    // 保证前n-1个数据为undefined
    if (i < n - 1) {
      result.push(undefined);
      continue;
    }
    result.push(sum / n);
  }
  return result;
}
```
