// src/utils/getRoutes.ts
import fs from 'fs-extra';
import path from 'path';

// 规范化路径：去除特定字符（点号和百分号），并全部小写化
function normalizePath(fileName: string): string {
    return fileName
        .toLowerCase() // 转为小写
        .replace(/[.%?？]+/g, ''); // 去除点号、百分号和问号
}

interface TreeNode {
    name: string;
    path: string;
    children?: TreeNode[];
}

export async function getRoutes(dir: string, basePath: string = 'posts'): Promise<TreeNode[]> {
    const files = await fs.readdir(dir);
    const tree: TreeNode[] = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            // 递归调用，保留目录结构
            const childRoutes = await getRoutes(filePath, path.join(basePath, file));
            childRoutes.sort(v=>v.children?1:-1)
            tree.push({ name: file, path: filePath, children: childRoutes });
        } else if (file.endsWith('.md')) {
            // 规范化文件名并生成对应的URL路径
            const normalizedFileName = normalizePath(file.replace('.md', '')); // 去除.md后缀并规范化
            const urlPath = `/${basePath}/${normalizedFileName}`.toLowerCase(); // 保留目录结构并全部小写
            tree.push({ name: normalizedFileName, path: urlPath });
        }
    }

    return tree;
}