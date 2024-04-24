import { App } from 'vue'
import CardDragSort from './CardDragSort/index.vue' // 引入封装好的组件
export { CardDragSort } // 实现按需引入
const components = [CardDragSort]
const install = (app: App) => {
  components.forEach(component => {
    app.component(component.__name as string, component)
  })
}
export default install