/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,vue}',
    ],
    theme: { extend: {
        colors: {
            primary: {
                '50': '#EFEFF5',
                '100': '#D3D3E4',
                '200': '#B7B7D2',
                '300': '#9B9BC0',
                '400': '#7E7EAF',
                '500': '#62629D',
                '600': '#4E4E7E',
                '700': '#3B3B5E',
                '800': '#27273F',
                '900': '#14141F',
            },
        },
    } },
    plugins: [],
};

