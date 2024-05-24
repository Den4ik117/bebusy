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
    safelist: [
      'bg-blue-300',
      'text-blue-700',
      'bg-gray-300',
      'text-gray-700',
    ],
}
