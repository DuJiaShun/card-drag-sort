## vue3 卡片拖拽排序组件

## install

```sh
npm install card-darg-sort
```

## init

```
<template>
  ...
  <card-drag-sort></card-drag-sort>
  ...
</template>

<style>
import { CardDragSort } from 'card-drag-sort'
...
</style>
```

## Props

| 属性        | 说明                   | 类型   | 是否必填 | 默认值 |
| ----------- | ---------------------- | ------ | -------- | ------ |
| data        | 需要传入的卡片数据     | Array  | Y        | -      |
| columns     | 卡片排列的列数         | Number | N        | 3      |
| width       | 卡片宽度               | Number | N        | 500    |
| height      | 卡片外部需要占据的高度 | Number | N        | 300    |
| columnSpace | 卡片列间距             | Number | N        | 20     |
| rowSpace    | 卡片行间距             | Number | N        | 20     |

##### data

| 属性  | 说明                            | 类型   | 是否必填 | 默认值 |
| ----- | ------------------------------- | ------ | -------- | ------ |
| id    | 设置卡片的 id 作为唯一识别      | String | Y        | -      |
| index | 设置卡片位置，从 0 开始依次递增 | Number | Y        | -      |
| title | 设置卡片的标题名称              | String | N        | -      |


## Slot
只有点击header部分时才能触发拖拽事件
#### title
```
  <template #header="slotData">
    <!-- 自定义内容 -->
  </template>
```
#### content
```
  <template #content="slotData">
    <!-- 自定义内容 -->
  </template>
```