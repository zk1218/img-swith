# 图片渐变切换组件 img-swith

一个 Web 组件（Web Components），功能是以渐变方式自动切换多个图片。

## 如何使用？

1. 在页面中引入本脚本文件，如 
```js
<script src="img-swith.js"></script>
```

2. 在页面中使用
```js
<img-swith imgs="图片地址列表"></img-swith>
```
或者
```js
<img-swith>
    <img src="...">
    <img src="...">
    <img src="...">
    ...
</img-swith>
```

## 属性

### imgs
显示的图片地址列表。

有三种写法：

1. 多个图片地址用竖线分隔，如：
```html
imgs="http://www.xxx.com/1.jpg|http://www.xxx.com/2.jpg|http://www.xxx.com/3.jpg"
```

2. 地址中的不同部分可用括号加逗号的方式分隔，如：
```html
imgs="http://www.xxx.com/(a,b,c,d,e).jpg"
```
  
3. 地址中的不同部分如果是连续的数字，可用两个点代表，如：
```html
imgs="http://www.xxx.com/(0..100).jpg"。
```
第一个数字的位数决定了生成的数字是否补0

* 三种写法可混用，如：
```html
imgs="http://www.xxx.com/(a,b,c,d,e).jpg|http://www.xxx.com/(0..10).jpg|http://www.xxx.com/xxx.jpg"
```

### speed
渐变的时间，即渐变的速度，在多长时间内渐变完毕。单位：秒

### interval
每张图片切换的间隔时间。包含渐变时间。单位：秒

### imgmaxwidth
每张图片的最大宽度。当图片宽度小于此宽度时，将以原宽度显示。大于时将按此宽度显示，高度则按比例显示。

### imgmaxheight
每张图片的最大高度。当图片高度小于此高度时，将以原高度显示。大于时将按此高度显示，宽度则按比例显示。
