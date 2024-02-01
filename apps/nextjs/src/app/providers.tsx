// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {TRPCReactProvider} from "~/trpc/react";
import {ThemeProvider, ThemeToggle} from "@peakquest/ui/theme";
import {Toaster} from "@peakquest/ui/toast";

export function Providers({children}: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<TRPCReactProvider>
				<NextUIProvider>
					{children}
				</NextUIProvider>
			</TRPCReactProvider>
			<div className="absolute bottom-4 right-4">
				<ThemeToggle/>
			</div>
			<Toaster/>
		</ThemeProvider>
	)
}
