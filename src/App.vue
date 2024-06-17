<template>
  <div>
    <card-drag-sort :data="data" @drag-stop="dragStop" :duration="500">
      <!-- <template #content="{ card }">
        <div v-if="card.id === 'one'"></div>
      </template> -->
    </card-drag-sort>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
// 打包后测试
import { CardDragSort } from '../dist/card-drag-sort.js'
// 开发
// import { CardDragSort } from '../package/index'
const data = reactive([
  { title: '卡片标题1', id: 'one' },
  { title: '卡片标题2', id: 'two' },
  { title: '卡片标题3', id: 'three' },
  { title: '卡片标题4', id: 'four' },
  { title: '卡片标题5', id: 'five' },
  { title: '卡片标题6', id: 'six' },
  { title: '卡片标题7', id: 'seven' },
  { title: '卡片标题8', id: 'eight' }
])

function dragStop(e) {
  console.log(e)
}
</script>
