import shell from "shelljs";
const FULFILLED = 'fulfilled';
import { IndexHtmlTransformResult  } from 'vite'
export interface CommandItem {
    command: string;
    key: string
}

export type Commands = CommandItem[];

export interface PromiseItem extends CommandItem {
    stdout: string
}
// code === 0 正常 能拿到命令执行结果
async function exec(commands:Commands) {
  if(Array.isArray(commands)) {
     const p = commands.map((item) => {
        return new Promise<PromiseItem>((resolve, reject) => {
            const { code, stdout } = shell.exec(item.command);
            if(code === 0) {
              // 命令执行成功
              resolve({stdout,...item});
            } else {
              reject(`${item.command}--> 执行失败`);
            }
        })
     })
    const results = await Promise.allSettled(p);
    return results.map((item_1) => {
      if (item_1.status === FULFILLED) {
        return item_1.value;
      }
    });
  }
  return Promise.resolve([])
}

const Default_Commands:Commands = [
  {
    command: 'git rev-parse --short HEAD',
    key: 'commit'
  },
  {
    command: "git describe --abbrev=0 --tags",
    key: 'tag'
  }
];
// @param commands array 其他的git执行命令
interface options {
  commands: Commands
}
export const InsertGitToHtml = (options: options = {
  commands: []
} ) => {
  return {
    name: "insert-html-transform",
    apply: "build",
    async transformIndexHtml(html:string) {
      const attrs:Record<string, string> = {};
      const res:IndexHtmlTransformResult = {
        html,
        tags:[
           {
            tag: "meta",
            attrs,
            injectTo: "head-prepend",
        }
        ]
      }
      const { commands } = options;
      let tempCommands = Default_Commands;
      if (Array.isArray(commands)) {
         tempCommands = [...Default_Commands, ...commands];
      }
       const info = await exec(tempCommands);
           info.forEach((item) => {
              if(item) {
               const { stdout, key} = item;
                attrs[key] = stdout.replace(/\r|\n/ig, "") // 删除换行符
              }
           })
      return res;
    },
  };
};
export default InsertGitToHtml
