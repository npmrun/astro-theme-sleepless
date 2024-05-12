import path from "path";
import { promises as fs } from "fs";
import fg from "fast-glob";
import grayMatter from "gray-matter";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

(async function () {
    const publicDir = path.join(process.cwd(), "public");
    const contentDir = path.join(process.cwd(), "./src/content/posts");
    const indexFile = path.join(publicDir, "search-index.json");
    const getSlugFromPathname = (pathname) => {
        const p = pathname.toLowerCase().replace(/\.md$/, "").replace(/\.mdx$/, "")
        const array = p.split("/")
        array[array.length-1] = slugger.slug(array[array.length-1])
        return array.join("/")
    }

    const contentFilePaths = await fg(["**/*.md", "**/*.mdx", "!drafts/**/*"], {
        cwd: contentDir,
    });

    if (contentFilePaths.length) {
        const files = contentFilePaths.map(
            async (filePath) =>
                await fs.readFile(
                    path.resolve(process.cwd(), "./src/content/posts", filePath),
                    "utf8"
                )
        );
        const index = [];
        let i = 0;
        for await (let file of files) {
            const {
                data: { title, description, tags },
                content,
            } = grayMatter(file);
            index.push({
                slug: getSlugFromPathname(contentFilePaths[i]),
                category: "blog",
                title,
                description,
                tags,
                body: content,
            });
            i++;
        }
        await fs.writeFile(indexFile, JSON.stringify(index));
        console.log(
            `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
        );
    }
})();