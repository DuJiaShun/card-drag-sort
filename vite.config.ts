import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'
export default defineConfig({
  plugins: [vue(), dts(), libCss()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './package/index.ts'), // 指定组件编译入口文件
      name: 'CardDragSort',
      fileName: 'card-drag-sort'
    },
    // 请确保外部化那些你的库中不需要的依赖
    rollupOptions: {
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      // 在打包代码时移除 console、debugger
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
