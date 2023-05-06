import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import urlToModule from 'rollup-plugin-import-meta-url-to-module';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), urlToModule({optimizeHref:true})],
  base: './', 
  // server: {
  //   proxy: {
  //     // 选项写法
  //     "/api": {
  //       target: "http://jhc.owvlab.net",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/style/index.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  },
})
