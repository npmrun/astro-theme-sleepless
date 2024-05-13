var script = document.createElement("script");
script.setAttribute("src", "https://utteranc.es/client.js");
script.setAttribute("repo", "npmrun/astro-theme-sleepless");
script.setAttribute("issue-term", "pathname");
script.setAttribute("label", "评论");
script.setAttribute("theme", "github-light");
script.setAttribute("crossorigin", "anonymous");
script.setAttribute("async", "");

script.onerror = function () {
    if (sc) {
        sc.innerText = "评论加载失败，刷新重试";
    }
    clearInterval(checkId)
};
var sc = document.getElementById("utteranc-sc");
// var parentNode = sc.parentNode;
sc.appendChild(script);

function checkSuccess() {
    clearInterval(checkId)
    var el = document.querySelector(".comment-el")
    if(el) {
        el.remove()
    }
}
var commentLoadingTime = 0; 
let checkId = setInterval(() => {
    var el = sc.querySelector(".utterances")
    if(el && el.getAttribute("style")) {
        checkSuccess()
    } else {
        commentLoadingTime += 1
        if (commentLoadingTime > 20) {
            clearInterval(checkId);
            if (sc) {
                sc.innerText = "评论加载失败，刷新重试";
            }
        }
    }
}, 500);

if (document.currentScript && document.currentScript.parentNode) {
    document.currentScript.parentNode.removeChild(document.currentScript);
}