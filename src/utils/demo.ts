import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import glob from "fast-glob";
import grayMatter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAllHTML() {
    const tree = await import.meta.glob("@root/public/demo/@show/**/*.(html|md)", {
        eager: true,
        query: "?raw",
    })
    return tree;
}

async function praseDemo() {
    const tree = await getAllHTML()
    const result = {};
    const checkedArray = new Set()
    for (const key in tree) {
        if (Object.prototype.hasOwnProperty.call(tree, key)) {
            let content = (tree[key] as any)?.default ?? tree[key];
            const {
                data: { title: _title, route: _route, dir: _dir },
                content: mdContent,
            } = grayMatter(content);
            content = mdContent
            if(key.endsWith(".md")) {
                try {
                    const data = { title: _title, route: _route, dir: _dir, content }
                    if(!data.title) {
                        data.title = title
                    }
                    let dir = data.dir
                    if(!dir){
                        dir = "0 示例"
                    }
                    if (!result[dir]) result[dir] = [];
                    result[dir].push({
                        ...data
                    });
                } catch (error) {
                    console.error(error);
                }
                continue
            }
            const route = key.replace(/\/public/, '')
            let title = "未命名 | " + route;
            let desc = "";
            const titleReg = /<title>(.*?)<\/title>/i.exec(content);
            if (titleReg && titleReg[1]) {
                title = titleReg[1];
                if(!title.startsWith("Public:")){
                    continue
                }
                title = title.replace("Public:", "")
            }
            const descReg = /<meta name="description" content="(.*?)">/i.exec(
                content
            );
            if (descReg && descReg[1]) {
                desc = descReg[1];
            }
            let dir = path.parse(route).dir.replace(/\/demo\//, "").replace(/@show\/?/, "");
            let checked = false
            if(!dir){
                dir = "0 示例"
                checked = true
            }
            if(checked) {
                checkedArray.add(dir)
            }
            if (!result[dir]) result[dir] = [];
            result[dir].push({
                title,
                desc,
                dir,
                route,
                content,
            });
        }
    }
    return [result, Array.from(checkedArray)];
}

export { praseDemo };
