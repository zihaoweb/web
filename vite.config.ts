import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server: {
  	// https: true,
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://localhost:3000', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        // ws: true,  // 允许websocket代理
		// 重写路径 --> 作用与vue配置pathRewrite作用相同
        // rewrite: (path) => path.replace(/^\/api/, "")
      }
     },
  }
})
