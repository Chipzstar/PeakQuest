import type {Metadata, Viewport} from "next";
import localFont from 'next/font/local'

import {cn} from "@1goal/ui";
import {ThemeProvider, ThemeToggle} from "@1goal/ui/theme";
import {Toaster} from "@1goal/ui/toast";

import {env} from "~/env";
import {TRPCReactProvider} from "~/trpc/react";

import "~/app/globals.css";

const LucidaGrande = localFont({
    src: [
        {
            path: './assets/fonts/LucidaGrande.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './assets/fonts/LucidaGrandeBold.ttf',
            weight: '400',
            style: 'italic',
        },
    ]
})

export const metadata: Metadata = {
    metadataBase: new URL(
        env.VERCEL_ENV === "production"
            ? "https://turbo.t3.gg"
            : "http://localhost:3000",
    ),
    title: "One Goal",
    description: "Simple monorepo with shared backend for web & mobile apps",
    openGraph: {
        title: "One Goal",
        description: "Simple monorepo with shared backend for web & mobile apps",
        url: "https://create-t3-turbo.vercel.app",
        siteName: "One Goal",
    },
    twitter: {
        card: "summary_large_image",
        site: "@jullerino",
        creator: "@jullerino",
    },
};

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                "min-h-screen text-foreground bg-overlay-400",
                LucidaGrande.className
            )}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>{props.children}</TRPCReactProvider>
            <div className="absolute bottom-4 right-4">
                <ThemeToggle/>
            </div>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
