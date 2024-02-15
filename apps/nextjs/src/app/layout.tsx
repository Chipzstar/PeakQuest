import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local'
import { Providers } from "./providers";
import { cn } from "@peakquest/ui";

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
			? "https://www.peakquest.app/"
			: "http://localhost:3000",
	),
	title: "Peak Quest",
	description: "Embark on success with PeakQuest: personalized goals, gamified adventures, and dedicated support. Start climbing now! 🏔️🚀",
	openGraph: {
		title: "Peak Quest",
		description: "Embark on success with PeakQuest: personalized goals, gamified adventures, and dedicated support. Start climbing now! 🏔️🚀",
		url: "https://www.peakquest.app",
		siteName: "PeakQuest",
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
