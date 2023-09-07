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
};
var sc = document.getElementById("utteranc-sc");
// var parentNode = sc.parentNode;
sc.appendChild(script);

if (document.currentScript && document.currentScript.parentNode) {
    document.currentScript.parentNode.removeChild(document.currentScript);
}