// theme.js
export function initTheme() {
    const themeBtn = document.getElementById('theme-toggle'); 
    const root = document.documentElement; 

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            root.classList.toggle('dark-mode'); 

            const isDark = root.classList.contains('dark-mode'); 
            localStorage.setItem('theme', isDark ? 'dark' : 'light'); 
        });
    }
}