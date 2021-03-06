---
title: babel
date: 2019-6-6
tags:
  - babel
  - 前端构建工具
categories:
  - [前端构建工具, babel]
---

[babel](https://babeljs.io/docs/en/babel-preset-env)

## 预设

下一代 JavaScript 语法的编译器。处理浏览器的语法兼容问题。

### babel-preset-es2015 -> babel-preset-latest

最初的解决方案。

在没有配置项的情况下，babel-preset-env 表现的同 babel-preset-latest 一样(或者可以说同 babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 结合到一起，表现的一致)

是的，在 2017 年第三季度我们终于要和 ES2015 preset 说再见了。

后续使用 babel-preset-env 来替代。

### babel-preset-env

preset-env 相当于用到的已经确定进入 es 规范的语法。

为了处理后续添加更多的功能，配置更方便而出现。babel-preset-env 是非常重要且常用的一个插件预设。

@babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

### 预设的演变

1. es2015 +> es1016 +> es2017

2. babel-preset-latest = ES2015 + ES2016 + ...

3. babel-preset-env，它可以根据开发者的配置，按需加载插件。配置项大致包括：

   - 需要支持的平台：比如 node、浏览器等。
   - 需要支持的平台的版本：比如支持 node@6.1 等。

**默认配置的情况下，它跟 babel-preset-latest 是等同的，会加载从 es2015 开始的所有 preset**。

### babel-preset-stage-x，按照提按阶段区分的，与上边的标准不同

所以上边 preset-env，不包括一些提案阶段的语法。

babel-preset-stage-x 和 babel-preset-env 有什么区别

stage-x(stage-0/1/2/3/4)

stage-x 和上面的 es2015 等有些类似，但是**它是按照 JavaScript 的提案阶段区分的，一共有 5 个阶段。**而数字越小，阶段越靠后，存在依赖关系。也就是说 stage-0 是包括 stage-1 的，以此类推。

## 插件

单独处理。

其实看了上面的应该也明白了，presets，也就是一堆 plugins 的预设，起到方便的作用。如果你不采用 presets，完全可以单独引入某个功能。

比如以下的设置就会引入编译箭头函数的功能。

```json
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

### transform-runtime

transform-runtime 是为了方便使用 babel-runtime 的，它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。

transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。

所以 transform-runtime 的方式**更适合开发工具包**，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。

这个插件最大的作用主要有几下几点：

- 解决编译中产生的**重复的工具函数**，减小代码体积；
- 非实例方法的 poly-fill，如 Object.assign，但是实例方法不支持，如"foobar".includes("foo")，这时候需要单独引入 babel-polyfil。l

### transform-remove-console

## 自定义预设或插件

Babel 支持自定义的预设(presets)或插件(plugins)。如果你的插件在 npm 上，可以直接采用这种方式"plugins": ["babel-plugin-myPlugin"]，当然，你也可以缩写，它和"plugins": ["myPlugin"]是等价的。此外，你还可以采用本地的相对路径引入插件，比如"plugins": ["./node_modules/asdf/plugin"]。

## plugins/presets 排序

- 具体而言，plugins 优先于 presets 进行编译。
- plugins 按照数组的 index 增序(从数组第一个到最后一个)进行编译。
- presets 按照数组的 index 倒序(从数组最后一个到第一个)进行编译。因为作者认为大部分会把 presets 写成["es2015", "stage-0"]。具体细节可以看这个。

## 推荐的配置

```json
{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

最新的 webpack4:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-stage-0"],
  "plugins": ["@babel/plugin-transform-runtime"],
  "comments": true
}
```
