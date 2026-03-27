/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./App.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}",
        "./services/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                jungle: '#1F4E33',
                chili: '#C7432A',
                flame: '#E5812A',
                mango: '#F2B43A',
                cream: '#FFF5E1',
                ink: '#0A0A0A',
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['Fraunces', 'serif'],
                display: ['"Archivo Black"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'scroll': 'scroll 45s linear infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' }, // Move only halfway to create seamless loop
                }
            }
        },
    },
    plugins: [],
}
