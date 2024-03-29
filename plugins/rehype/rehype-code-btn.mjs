import { visitParents, CONTINUE, EXIT, SKIP } from 'unist-util-visit-parents'
import { selectAll, select } from 'unist-util-select';
// import { fromHtml } from 'hast-util-from-html'

export default function () {
    return (tree) => {
        // https://github.com/syntax-tree/unist-util-is?tab=readme-ov-file#testfunction
        visitParents(tree, (node, index, parent) => {
            if(node.type === "element" && node.tagName === "pre" && node.properties?.className?.[0]?.startsWith("language-")) {
              return true
            }
        }, (node, ancestors) => {
            const parent = ancestors[ancestors.length - 1]
            let index = -1
            for (let i = 0; i < parent.children.length; i++) {
                const element = parent.children[i]
                if (node === element) {
                    index = i
                    continue
                }
            }
            if (index !== -1) {
                const tree = node // fromHtml(node.value, { fragment: true })
                const preElement = select('[tagName=pre]', tree);
                if (preElement) {
                    const codeElement = select('[tagName=code]', preElement);
                    // 源码
                    // TODO 去除diff模式的-号代码
                    const raw = selectAll("text", codeElement).reduce((a, b) => (a.value ?? a) + (b.value ?? b), { value: "" })
                    let curLanguage = ""
                    if(preElement.properties?.className?.[0]){
                      let str = preElement.properties?.className?.[0]
                      curLanguage = str.replace(/^language-/, "")
                    }
                    preElement.properties["data-language"] = curLanguage
                    parent.children[index] = {
                        type: "element",
                        tagName: "div",
                        properties: {
                            className: "pre-wrapper",
                            style: `position: relative;`,
                            ["data-language"]: curLanguage
                        },
                        children: [
                            {
                                type: "element",
                                tagName: "button",
                                properties: {
                                    className: "copy",
                                    onclick: createClickCallback(raw, {
                                        'copy-success': '复制成功',
                                        'copy-timeout': 3000,
                                    })
                                },
                            },
                            preElement
                        ]
                    }
                }
            }
        })
    }
}

function createClickCallback (str, setting) {
    return `(function(button){
    const setting = ${JSON.stringify(setting)}

    function setCopied() {
        button.classList.add("copied")
        button.setAttribute("data-copy-success", setting['copy-success'])
    }

    function resetButton() {
		setTimeout(function () {
            button.classList.remove("copied")
            button.classList.remove("error")
        }, setting['copy-timeout']);
	}

    function onSuccess() {
      setCopied();
      resetButton();
    }

    function onError(error) {
      error && console.error(error);
      button.classList.add("error")
      resetButton();
    }

    function fallbackCopyTextToClipboard(str) {
      var textArea = document.createElement('textarea');
      textArea.value = str

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        setTimeout(function () {
          if (successful) onSuccess()
          else onError()
        }, 1);
      } catch (err) {
        setTimeout(function () {
          onError(err)
        }, 1);
      }

      document.body.removeChild(textArea);
    }

    function copyTextToClipboard(str) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(str)
          .then(onSuccess, function () {
            fallbackCopyTextToClipboard(str);
          });
      } else {
        fallbackCopyTextToClipboard(str);
      }
    }

    copyTextToClipboard(${JSON.stringify(str)})
  })(this)`;
}

// const btn = document.querySelector("button")
// const codeEL = document.querySelector("code")
// btn.setAttribute("onclick", )
