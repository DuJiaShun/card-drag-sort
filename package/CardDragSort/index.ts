import type { App } from 'vue'
import CardDragSort from './index.vue'
CardDragSort.install = (app: App) => {
  app.component(CardDragSort.__name as string, CardDragSort)
  return app
}
export default CardDragSort