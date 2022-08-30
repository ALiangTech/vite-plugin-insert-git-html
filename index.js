import shell from "shelljs";

// code === 0 正常 并且拿到hash
function exec() {
  let temp = {};
  if (!shell.which("git")) {
    shell.echo("Sorry, this script requires git");
    return;
  }
  const commit = shell.exec(
    "git rev-parse --short HEAD && git describe --abbrev=0 --tags"
  );
  if (commit.code !== 0) {
    shell.echo("获取git信息失败");
    return;
  }
  const [hash, tag] = commit.stdout.split("\n");
  temp = { hash, tag };
}

exec();

export const InsertGitToHtml = () => {
  return {
    name: "html-transform",
    transformIndexHtml() {
      console.log(html);
    },
  };
};
