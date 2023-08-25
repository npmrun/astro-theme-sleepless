if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

function toggleTheme() {
    if (!document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
    } else {
        localStorage.removeItem('theme')
        document.documentElement.classList.remove('dark')
    }
}

window.toggleTheme = toggleTheme
