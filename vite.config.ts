import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { InsertGitToHtml } from './dist/index';
import path from 'path'
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), InsertGitToHtml()]
// })
// export default defineConfig({
 
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
       plugins: [vue(), InsertGitToHtml()]
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
      build: {
        lib: {
          entry: path.resolve(__dirname, 'lib/index.ts'),
          name: 'vite-plugin-git-html',
        }
      }
    }
  }
})