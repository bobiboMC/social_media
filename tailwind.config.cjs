/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            aspectRatio: {
                '5/2': '5 / 2'
            },
            colors: {
                'promotion-grey': '#B2BABC'
            },
            width: {
                '1_2': '50%'
            }

        },
    },
    plugins: []
}