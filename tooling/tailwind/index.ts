import type {Config} from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["src/**/*.{ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                '2.5xl': ['1.6875rem', {lineHeight: '2.125rem'}],
            },
            width: {
                128: '32rem',
                144: '36rem',
                160: '40rem',
                176: '44rem',
                192: '48rem',
                208: '52rem',
            },
            backgroundImage: {
                'mythical-beast': "url('/images/questions/mythical-animal-watermark.svg')",
                'mountain-watermark': "url('/images/mountain-watermark.png')",
                'mountain-quest': "url('/images/mountain-quest.png')",
                'mountain-quest-mobile': "url('/images/mountain-quest-mobile.png')",
            },
            colors: {
                primary: {
                    DEFAULT: '#10607A',
                    50: '#58C6E9',
                    100: '#46BFE7',
                    200: '#22B3E2',
                    300: '#1999C2',
                    400: '#157C9E',
                    500: '#10607A',
                    600: '#093948',
                    700: '#031217',
                    800: '#000000',
                    900: '#000000',
                    950: '#000000'
                },
                secondary: {
                    DEFAULT: '#5BA1A6',
                    50: '#D2E5E7',
                    100: '#C5DEDF',
                    200: '#AACED1',
                    300: '#90BFC3',
                    400: '#75B0B4',
                    500: '#5BA1A6',
                    600: '#477E82',
                    700: '#335B5E',
                    800: '#1F3839',
                    900: '#0B1415',
                    950: '#020303'
                },
                tertiary: {
                    DEFAULT: '#44ACAF',
                    50: '#C3E7E8',
                    100: '#B4E1E2',
                    200: '#97D5D7',
                    300: '#79C9CB',
                    400: '#5CBDC0',
                    500: '#44ACAF',
                    600: '#348487',
                    700: '#255D5E',
                    800: '#153536',
                    900: '#050D0D',
                    950: '#000000'
                },
                overlay: {
                    DEFAULT: '#9DC3B8',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#E9F1EF',
                    300: '#D0E2DD',
                    400: '#B6D2CA',
                    500: '#9DC3B8',
                    600: '#7AAE9F',
                    700: '#5B9584',
                    800: '#467265',
                    900: '#304F46',
                    950: '#263E37'
                },
                progress: {
                    DEFAULT: '#94A385',
                    50: '#F0F2EE',
                    100: '#E6E9E2',
                    200: '#D1D8CB',
                    300: '#BDC6B4',
                    400: '#A8B59C',
                    500: '#94A385',
                    600: '#788967',
                    700: '#5C694F',
                    800: '#404937',
                    900: '#24291F',
                    950: '#161913'
                },
                button: {
                    DEFAULT: '#5A8684',
                    50: '#C2D6D5',
                    100: '#B6CECD',
                    200: '#9DBDBC',
                    300: '#85ADAB',
                    400: '#6C9C9A',
                    500: '#5A8684',
                    600: '#436463',
                    700: '#2D4342',
                    800: '#162121',
                    900: '#000000',
                    950: '#000000'
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                /*primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },*/
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderColor: {
                DEFAULT: "hsl(var(--border))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [animate],
} satisfies Config;
