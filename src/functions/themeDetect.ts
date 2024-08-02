export function ThemeDetect(): boolean {
    const darkThemePreference = localStorage.getItem('darkTheme');
    if (darkThemePreference === 'dark') {
        return true;
    } else if (darkThemePreference === 'light') {
        return false;
    } else {
        const prefersDark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark;
    }
}
