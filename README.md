## vue3 卡片拖拽排序组件

## 安装

```
npm install card-darg-sort
```

## 使用

```
<template>
  ...
  <card-drag-sort></card-drag-sort>
  ...
</template>

<style setup lang="ts">
import { CardDragSort } from 'card-drag-sort'
...
</style>
```

## 属性

| 属性        | 描述                       | 类型   | 是否必填 | 默认值 |
| ----------- | -------------------------- | ------ | -------- | ------ |
| data        | 传入的卡片数据，详情见下表 | Array  | Y        | -      |
| columns     | 卡片排列的列数             | Number | N        | 3      |
| width       | 卡片的宽度                 | Number | N        | 500    |
| height      | 卡片的高度                 | Number | N        | 300    |
| columnSpace | 卡片列间距                 | Number | N        | 20     |
| rowSpace    | 卡片行间距                 | Number | N        | 20     |
| duration    | 过渡效果时间，单位毫秒     | Number | N        | 200    |

#### data

| 属性  | 描述           | 类型   | 是否必填 | 默认值 |
| ----- | -------------- | ------ | -------- | ------ |
| id    | 卡片的唯一标识 | String | Y        | -      |
| title | 卡片的标题     | String | N        | 无标题 |

## 插槽

| 属性    | 描述       | 类型 |
| ------- | ---------- | ---- |
| header  | 自定义标题 | -    |
| content | 自定义内容 | -    |

```
<card-drag-sort :data="data">
  <template #header="{ card }">
    {{ card.title }}
  </template>
  <template #content="{ card }">
    <div v-if="card.id === 'one'">
      <!-- 自定义内容 -->
    </div>
    ...
  </template>
</card-drag-sort>
```

## 事件

| 事件名     | 描述                                        | 类型     |
| ---------- | ------------------------------------------- | -------- |
| drag-start | 点击卡片顶部标题栏时触发，参数为卡片唯一 id | Function |
| drag-end  | 在松开鼠标时触发，参数为最新卡片顺序        | Function |
