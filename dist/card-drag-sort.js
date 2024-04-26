import './index.css';
import { defineComponent, useCssVars, computed, ref, openBlock, createElementBlock, Fragment, renderList, normalizeStyle, createElementVNode, renderSlot, toDisplayString, pushScopeId, popScopeId } from "vue";
const _withScopeId = (n) => (pushScopeId("data-v-5a9c119d"), n = n(), popScopeId(), n);
const _hoisted_1 = ["id"];
const _hoisted_2 = ["onMousedown"];
const _hoisted_3 = { class: "card-title" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "empty-text" }, "暂无内容", -1));
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "CardDragSort" },
  __name: "index",
  props: {
    data: { type: Array, required: true },
    columns: { type: Number, default: 3 },
    width: { type: Number, default: 500 },
    height: { type: Number, default: 300 },
    columnSpace: { type: Number, default: 20 },
    rowSpace: { type: Number, default: 20 },
    duration: { type: Number, default: 200 }
  },
  emits: ["dragStart", "dragStop"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "57911cb1": containerHeight.value,
      "f41f9bea": duration.value
    }));
    const emit = __emit;
    const props = __props;
    const dataList = computed(() => {
      return props.data.map((item, index) => {
        return { index, ...item };
      });
    });
    const containerHeight = computed(() => {
      const num = dataList.value.length;
      return Math.ceil(num / props.columns - 1) * (props.height + props.rowSpace) + props.height + "px";
    });
    const duration = computed(() => {
      return props.duration + "ms";
    });
    function cardPositionTop(index) {
      return Math.floor(index / props.columns) * (props.height + props.rowSpace) + "px";
    }
    function cardPositionLeft(index) {
      return index % props.columns * (props.width + props.columnSpace) + "px";
    }
    let dragDom;
    let dragDomData;
    let domStartY;
    let domStartX;
    let mouseStartY;
    let mouseStartX;
    let moveY = 0;
    let moveX = 0;
    let scrollStart;
    let scrollLength = 0;
    let throttleFn;
    let transitionEnd = true;
    function dragStart(e, id) {
      if (!transitionEnd)
        return;
      emit("dragStart", id);
      const card = document.getElementById(id);
      if (!card)
        return;
      dragDom = card;
      dragDomData = dataList.value.find((item) => {
        return item.id === id;
      });
      domStartY = parseInt(dragDom.style.top);
      domStartX = parseInt(dragDom.style.left);
      dragDom.style.zIndex = "100";
      dragDom.style.transition = "none";
      mouseStartY = e.clientY;
      mouseStartX = e.clientX;
      scrollStart = document.documentElement.scrollTop;
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragStop);
      document.addEventListener("scroll", scroll);
      dragDom.addEventListener("transitionend", dragTransitionend);
    }
    function dragMove(e) {
      moveY = domStartY + (e.clientY - mouseStartY);
      moveX = domStartX + (e.clientX - mouseStartX);
      dragDom.style.top = moveY + scrollLength + "px";
      dragDom.style.left = moveX + "px";
      throttleFn = setTimeout(() => {
        findCoveredDom(parseInt(dragDom.style.top), parseInt(dragDom.style.left));
        clearTimeout(throttleFn);
      }, props.duration);
    }
    const cardDrag = ref();
    function findCoveredDom(domY, domX) {
      const domList = Array.from(cardDrag.value.children);
      for (const item of domList) {
        const relativeY = domY - parseInt(item.style.top);
        const relativeX = domX - parseInt(item.style.left);
        if (Math.abs(relativeY) < props.height / 2 && Math.abs(relativeX) < props.width / 2 && dragDomData && item.id !== dragDomData.id) {
          const coveredData = dataList.value.find((dataItem) => {
            return item.id === dataItem.id;
          });
          if (!coveredData || coveredData.id === dragDomData.id)
            return;
          const newIndex = coveredData.index;
          const bigSmall = dragDomData.index > coveredData.index;
          let transitionDataList;
          if (bigSmall) {
            transitionDataList = dataList.value.filter((item2) => {
              if (item2.index >= coveredData.index && item2.index < dragDomData.index) {
                item2.index += 1;
                return item2;
              }
            });
          } else {
            transitionDataList = dataList.value.filter((item2) => {
              if (item2.index <= coveredData.index && item2.index > dragDomData.index) {
                item2.index -= 1;
                return item2;
              }
            });
          }
          dragDomData.index = newIndex;
          for (const tranItem of transitionDataList) {
            const el = document.getElementById(tranItem.id);
            if (el) {
              el.style.top = cardPositionTop(tranItem.index);
              el.style.left = cardPositionLeft(tranItem.index);
            }
          }
        }
      }
    }
    function dragStop() {
      transitionEnd = false;
      dataList.value.sort((a, b) => a.index - b.index);
      emit("dragStop", dataList.value);
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragStop);
      document.removeEventListener("scroll", scroll);
      dragDom.style.transition = `all ${duration.value}`;
      dragDom.style.top = domStartY + "px";
      dragDom.style.left = domStartX + "px";
      dragDom.style.zIndex = "0";
      dragDom.style.top = cardPositionTop(dragDomData.index);
      dragDom.style.left = cardPositionLeft(dragDomData.index);
    }
    function scroll() {
      scrollLength = document.documentElement.scrollTop - scrollStart;
      dragDom.style.top = moveY + scrollLength + "px";
    }
    function dragTransitionend() {
      transitionEnd = true;
      this.removeEventListener("transitionend", dragTransitionend);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "card-drag-sort",
        ref_key: "cardDrag",
        ref: cardDrag
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(dataList.value, (item) => {
          return openBlock(), createElementBlock("div", {
            class: "card-wrap",
            key: item.id,
            id: item.id,
            style: normalizeStyle({
              width: `${__props.width}px`,
              height: `${__props.height}px`,
              top: cardPositionTop(item.index),
              left: cardPositionLeft(item.index)
            })
          }, [
            createElementVNode("div", {
              class: "card-header",
              onMousedown: ($event) => dragStart($event, item.id)
            }, [
              renderSlot(_ctx.$slots, "header", { card: item }, () => [
                createElementVNode("div", _hoisted_3, toDisplayString(item.title || "无标题"), 1)
              ], true)
            ], 40, _hoisted_2),
            renderSlot(_ctx.$slots, "content", { card: item }, () => [
              _hoisted_4
            ], true)
          ], 12, _hoisted_1);
        }), 128))
      ], 512);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const CardDragSort = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a9c119d"]]);
const components = [CardDragSort];
const install = (app) => {
  components.forEach((component) => {
    app.component(component.__name, component);
  });
};
export {
  CardDragSort,
  install as default
};
