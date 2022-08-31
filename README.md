# vite-plugin-git-html

向index.html文件插入git的一些信息 默认插入最新的short commit 和 tag标签到 meta 元素上面
 
只在build 构建环境下生效

```javascript
    npm install -D vite-plugin-git-html
```


```javascript
  // vite.config.ts
import { InsertGitToHtml } from 'vite-plugin-mpa'

// @see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...other plugins
    InsertGitToHtml(/* options */),
  ],
})
```