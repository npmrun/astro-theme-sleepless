import { visitParents, CONTINUE, EXIT, SKIP } from 'unist-util-visit-parents'

function buildNode (url, title, isLazy) {
    return {
        type: "raw",
        value: `<figure class="iframe-wrapper">
        <div class="iframe-title">
      <!--   <div class="text">
          网页
          </div> -->
          <div class="buttons">
            ${isLazy?`<div class="button" onclick="const el = this.parentElement.parentElement.parentElement.querySelector('iframe');const tmpUrl = el.getAttribute('data-src');if(!tmpUrl)return;el.src = tmpUrl;el.removeAttribute('data-src');el.parentElement.classList.toggle('iframe-load')" title="加载">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="#000" stroke-linecap="round" stroke-width="4"><path fill="#2F88FF" stroke-linejoin="round" d="M22 43C17.2742 41.2327 13.3325 35.1851 11.3597 31.6428C10.5079 30.1134 10.9566 28.2347 12.3236 27.1411C13.8473 25.9222 16.0438 26.0438 17.4236 27.4236L19 29V17.5C19 16.1193 20.1193 15 21.5 15C22.8807 15 24 16.1193 24 17.5V23.5C24 22.1193 25.1193 21 26.5 21C27.8807 21 29 22.1193 29 23.5V25.5C29 24.1193 30.1193 23 31.5 23C32.8807 23 34 24.1193 34 25.5V27.5C34 26.1193 35.1193 25 36.5 25C37.8807 25 39 26.1193 39 27.5V35.368C39 36.4383 38.7354 37.496 38.1185 38.3707C37.0949 39.8219 35.255 42.0336 33 43C29.5 44.5 26.3701 44.6343 22 43Z"/><path stroke-linejoin="round" d="M36 12L32 16L28 12"/><path d="M14 13C14 8.02944 18.0294 4 23 4C27.9706 4 32 8.02944 32 13C32 13.5641 31.9481 14.1161 31.8488 14.6514"/></g></svg>
        </div>`:''}
            <div class="button" onclick="const el = this.parentElement.parentElement.parentElement.querySelector('iframe');const tmpUrl = el.src;el.src = 'about:blank';const _t = setTimeout(()=>{el.src = tmpUrl;clearTimeout(_t)}, 300);" title="重载">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4l-4-4z"/></svg>
            </div>
            <div class="button" onclick="window.open('${url}')" title="新标签打开">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M6 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2.5a.5.5 0 0 1 1 0V14a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h2.5a.5.5 0 0 1 0 1H6Zm5-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V4.707l-4.146 4.147a.5.5 0 0 1-.708-.708L15.293 4H11.5a.5.5 0 0 1-.5-.5Z"/></svg>
            </div>
            <div class="button" onclick="this.parentElement.parentElement.parentElement.classList.toggle('iframe-fullpage')" title="全屏">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="8" x="7" y="8" rx="1"/></g></svg>
            </div>
          </div>
          <div class="title">${title}</div>
        </div>
        <div class="iframe-inner ${isLazy?'lazy':'notlazy'}">
          <div class="iframe-mask"></div>
          <iframe width="100%" ${isLazy?`data-src="${url}"`:`src="${url}"`}>
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
            const reg = new RegExp(`<\!-- iframe (.*?) (.*?)-->$`)
            const lazyreg = new RegExp(`<\!-- iframe-lazy (.*?) (.*?)-->$`)
            if (node.type === 'raw' && (reg.test(node.value)||lazyreg.test(node.value))) {
                let isLazy = lazyreg.test(node.value)
                let result = (isLazy ? lazyreg : reg).exec(node.value)
                if (result && !!result.length) {
                    const [_, url, title] = result
                    let index = -1
                    for (let i = 0; i < parent.children.length; i++) {
                        const element = parent.children[i]
                        if (node === element) {
                            index = i
                            break
                        }
                    }
                    parent.children[index] = buildNode(url, title, isLazy)
                    return SKIP
                }
            }
        })
    }
}