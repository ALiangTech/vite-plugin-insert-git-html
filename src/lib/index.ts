import shell from "shelljs";
import { Commands, PRes } from './types'
// code === 0 正常 能拿到命令执行结果
function exec(commands:Commands): Promise<PRes[]> {
  if(Array.isArray(commands)) {
     const p = commands.map((item) => {
        return new Promise<string>((resolve, reject) => {
            const { code, stdout } = shell.exec(item.command);
            console.log(stdout);
            
            if(code === 0) {
              // 命令执行成功
              resolve({stdout,...item});
            } else {
              reject(`${command}--> 执行失败`);
            }
        })
     })
    const ps = Promise.allSettled(p)
    return ps.then((results) => {
        return results.map(({ status, value }) => {
            if(status === 'fulfilled') {
              return value;
            }
        });
     });
  }
  return Promise.resolve([])
}

// exec();
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
    // apply: "build",
    async transformIndexHtml(html:string) {
      const { commands } = options;
      let tempCommands = Default_Commands;
      if (Array.isArray(commands)) {
         tempCommands = [...Default_Commands, ...commands];
      }
       const info = await exec(tempCommands);
         const attrs = {};
           info.forEach(({ stdout, key}) => {
              attrs[key] = stdout
           })
        return {
          html,
          tags: [
            {
              tag: "meta",
              attrs,
              injectTo: "head-prepen",
            },
          ],
        };
    },
  };
};
