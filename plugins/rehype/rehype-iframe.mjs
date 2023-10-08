import { visitParents, CONTINUE, EXIT, SKIP } from 'unist-util-visit-parents'

function buildNode (url) {
    return {
        type: "raw",
        value: `<figure class="iframe-wrapper">
        <div class="iframe-title">
      <!--   <div class="text">
          网页
          </div> -->
          <div class="buttons">
            <div class="button" onclick="window.open('${url}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M6 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h2.5a.5.5 0 0 1 0 1H6Zm5-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V4.707l-4.146 4.147a.5.5 0 0 1-.708-.708L15.293 4H11.5a.5.5 0 0 1-.5-.5Z"/></svg>
          </div>
          <div class="button" onclick="const el = this.parentElement.parentElement.parentElement.querySelector('iframe');const tmpUrl = el.src;el.src = 'about:blank';const _t = setTimeout(()=>{el.src = tmpUrl;clearTimeout(_t)}, 300);">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4l-4-4z"/></svg>
          </div>
          </div>
        </div>
        <div class="iframe-inner">
          <iframe width="100%" src="${url}">
            <div>
            不支持iframe
            </div>
          </iframe>
        </div>
      </figure>`
    }
}

export default function () {
    return async (tree) => {
        visitParents(tree, 'raw', (node, ancestors) => {
            const parent = ancestors[ancestors.length - 1]
            const reg = new RegExp(`<\!-- iframe (.*?) -->$`)
            if (node.type === 'raw' && reg.test(node.value)) {
                let result = reg.exec(node.value)
                if (result && !!result.length) {
                    const [_, url] = result
                    let index = -1
                    for (let i = 0; i < parent.children.length; i++) {
                        const element = parent.children[i]
                        if (node === element) {
                            index = i
                            break
                        }
                    }
                    parent.children[index] = buildNode(url)
                    return SKIP
                }
            }
        })
    }
}