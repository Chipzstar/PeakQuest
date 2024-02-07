import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local'
import { Providers } from "./providers";
import { cn } from "@peakquest/ui";
import { ThemeProvider, ThemeToggle } from "@peakquest/ui/theme";
import { Toaster } from "@peakquest/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

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
	title: "Peak Quest",
	description: "Simple monorepo with shared backend for web & mobile apps",
	openGraph: {
		title: "Peak Quest",
		description: "Simple monorepo with shared backend for web & mobile apps",
		url: "https://create-t3-turbo.vercel.app",
		siteName: "Peak Quest",
	},
	twitter: {
		card: "summary_large_image",
		site: "@chipz_oguibe",
		creator: "@chipz_oguibe",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head><script async src="https://eu.umami.is/script.js" data-website-id="2e93f9f7-d995-486a-8670-4a173f444b8b"></script></head>
			<body
				className={cn(
					"min-h-screen text-foreground bg-overlay-400",
					LucidaGrande.className
				)}
			>
				<Providers>
					{props.children}
				</Providers>
			</body>
		</html>
	);
}
