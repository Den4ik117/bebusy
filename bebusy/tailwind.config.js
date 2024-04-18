const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.vue',
        './resources/**/*.blade.php',
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
            }
        },
    },
    plugins: [],
}
