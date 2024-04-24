<template>
  <div class="card-drag-sort" ref="cardDrag">
    <div
      class="card-wrap"
      v-for="item in data"
      :key="item.id"
      :id="item.id"
      :tabIndex="item.index"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        top: cardPositionTop(item.index),
        left: cardPositionLeft(item.index)
      }"
    >
      <div class="card-header" @mousedown="dragStart($event, item.id)">
        <slot name="header" :item="item">
          <div class="card-title">{{ item.title }}</div>
        </slot>
      </div>
      <slot name="content" :item="item">
        <div class="empty-text">暂无内容</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed, ref } from 'vue'
defineOptions({ name: 'CardDragSort' })
interface dataType {
  title: string
  id: string
  index: number
}

const props = defineProps({
  data: { type: Array as PropType<dataType[]>, required: true },
  columns: { type: Number, default: 3 },
  width: { type: Number, default: 500 },
  height: { type: Number, default: 300 },
  columnSpace: { type: Number, default: 20 },
  rowSpace: { type: Number, default: 20 }
})

// 计算容器的高度
const containerHeight = computed(() => {
  const num = props.data.length
  return Math.ceil(num / props.columns - 1) * (props.height + props.rowSpace) + props.height + 'px'
})

// 每个card坐标
function cardPositionTop(index: number) {
  return Math.floor(index / props.columns) * (props.height + props.rowSpace) + 'px'
}
function cardPositionLeft(index: number) {
  return (index % props.columns) * (props.width + props.columnSpace) + 'px'
}

// 拖动的dom元素
let dragDom: HTMLElement
// 拖动的dom元素对应的数据
let dragDomData: dataType
// dom元素起始点
let domStartY: number
let domStartX: number
// 鼠标起始点
let mouseStartY: number
let mouseStartX: number
// dom元素需要移动的距离 = 鼠标移动的距离
let moveY: number = 0
let moveX: number = 0
// 鼠标滚轮起始点
let scrollStart: number
// 鼠标滚轮滚动的长度
let scrollLength: number = 0
// 节流函数
let throttleFn: NodeJS.Timeout

// 鼠标按下拖动开始
function dragStart(e: MouseEvent, id: string) {
  // 获取拖动的dom元素
  const card = document.getElementById(id)
  if (!card) return
  dragDom = card
  // 获取拖动dom元素的数据
  dragDomData = props.data.find(item => {
    return item.id === id
  }) as dataType
  // 记录dom元素起始点
  domStartY = parseInt(dragDom.style.top)
  domStartX = parseInt(dragDom.style.left)
  dragDom.style.zIndex = '100'
  // 移除过渡动画
  dragDom.style.transition = 'none'

  // 记录鼠标起始点
  mouseStartY = e.clientY
  mouseStartX = e.clientX

  // 记录鼠标滚轮起始点
  scrollStart = document.documentElement.scrollTop
  // 添加鼠标监听事件
  document.addEventListener('mousemove', dragMove)
  document.addEventListener('mouseup', dragStop)
  document.addEventListener('scroll', scroll)
}

// 鼠标拖动
function dragMove(e: MouseEvent) {
  // 记录鼠标移动距离
  moveY = domStartY + (e.clientY - mouseStartY)
  moveX = domStartX + (e.clientX - mouseStartX)

  // dom元素跟随移动 ps:y轴位置 = 鼠标移动的距离 + 滚动距离
  dragDom.style.top = moveY + scrollLength + 'px'
  dragDom.style.left = moveX + 'px'

  // 节流
  throttleFn = setTimeout(() => {
    findCoveredDom(parseInt(dragDom.style.top), parseInt(dragDom.style.left))
    clearTimeout(throttleFn)
  }, 400)
}

// 父元素
const cardDrag = ref()
// 找到被覆盖的元素
function findCoveredDom(domY: number, domX: number) {
  // 遍历子元素
  const domList: HTMLElement[] = Array.from(cardDrag.value.children)
  for (const item of domList) {
    const relativeY = domY - parseInt(item.style.top)
    const relativeX = domX - parseInt(item.style.left)
    if (
      Math.abs(relativeY) < props.height / 2 &&
      Math.abs(relativeX) < props.width / 2 &&
      dragDomData &&
      item.id !== dragDomData.id
    ) {
      // 找到插入的位置
      const coveredData = props.data.find(dataItem => {
        return item.tabIndex === dataItem.index
      })
      if (!coveredData || coveredData.id === dragDomData.id) return
      // 比较两个元素顺序的大小
      const bigSmall = dragDomData.index > coveredData.index
      // 如果拖动的元素比覆盖的元素大 则往后移一位
      if (bigSmall) {
        let transitionDataList = props.data.filter(item => {
          return item.index >= coveredData.index && item.index < dragDomData.index
        })
        dragDomData.index = coveredData.index
        for (const tranItem of transitionDataList) {
          tranItem.index = tranItem.index + 1
          const el = document.getElementById(tranItem.id)
          if (el) {
            el.style.top = cardPositionTop(tranItem.index)
            el.style.left = cardPositionLeft(tranItem.index)
          }
        }
      }
      // 如果拖动的元素比覆盖的元素小 则往前移一位
      if (!bigSmall) {
        let transitionDataList = props.data.filter(item => {
          return item.index <= coveredData.index && item.index > dragDomData.index
        })
        dragDomData.index = coveredData.index
        for (const tranItem of transitionDataList) {
          tranItem.index = tranItem.index - 1
          const el = document.getElementById(tranItem.id)
          if (el) {
            el.style.top = cardPositionTop(tranItem.index)
            el.style.left = cardPositionLeft(tranItem.index)
          }
        }
      }
    }
  }
}

// 鼠标抬起拖动结束
function dragStop() {
  // 移除所有鼠标事件
  document.removeEventListener('mousemove', dragMove)
  document.removeEventListener('mouseup', dragStop)
  document.removeEventListener('scroll', scroll)

  // 添加过渡动画
  dragDom.style.transition = 'all 0.4s'
  dragDom.style.top = domStartY + 'px'
  dragDom.style.left = domStartX + 'px'
  dragDom.style.zIndex = '0'

  dragDom.style.top = cardPositionTop(dragDomData.index)
  dragDom.style.left = cardPositionLeft(dragDomData.index)
}

// 监听滚轮
function scroll() {
  // 获取滚动距离
  scrollLength = document.documentElement.scrollTop - scrollStart
  dragDom.style.top = moveY + scrollLength + 'px'
}
</script>

<style lang="scss" scoped>
.card-drag-sort {
  position: relative;
  width: 100%;
  height: v-bind(containerHeight);
  .card-wrap {
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 8px #ccc;
    transition: all 0.4s;
    .card-header {
      height: 50px;
      user-select: none;
      cursor: move;
      border-bottom: 1px solid #e0e0e0;
    }
    .card-title {
      line-height: 49px;
      font-size: 14px;
      color: gray;
      background-color: #fff;
      padding: 0px 15px;
    }
    .empty-text {
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: gray;
    }
  }
}
</style>
