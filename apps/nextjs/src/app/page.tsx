"use client"

// import { api } from "~/trpc/server";
import { Button } from "@peakquest/ui/button";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { PATHS } from "./utils";
import MythicalBeast1 from "./assets/images/questions/mythical-animal-1.png";
import HeroImage from "./assets/images/hero.svg";

export default function HomePage() {
	const router = useRouter()
	// You can await this here if you don't want to show Suspense fallback below
	// const posts = api.post.all();

	return (
		<main className="page-container">
			<div className="flex flex-col justify-start items-center md:justify-center gap-4 space-y-8">
				<div className="md:px-0 md:pt-0 md:pb-6">
					<NextImage
						src={HeroImage}
						alt="hero"
						sizes="(max-width: 480px) 100vw, (max-width: 768px) 300vw, 200vw"
						style={{
							width: "100%",
							height: "auto",
							objectFit: "contain",
						}}
					/>
				</div>
				<div className="flex flex-col space-y-4 md:space-y-8 text-center">
					<div className="flex justify-center">
						<h1 className="text-3xl text-primary sm:text-7xl font-bold">
							PeakQuest
						</h1>
						<span className="text-sm sm:text-lg top-0 relative font-light">Beta</span>
					</div>
					<p className="md:text-3xl text-secondary">Life is a marathon, not a sprint</p>
				</div>
				<Button size="lg" className="jumbo-button" onClick={() => router.push(PATHS.QUESTION_1)}>
					<span className="text-white">Create your quest</span>
				</Button>
				<div className="w-full max-w-2xl overflow-y-scroll">
				</div>
			</div>
			<div className="absolute bottom-0 left-0">
				<NextImage
					src={MythicalBeast1}
					alt="mythical-beast-1"
					sizes="(max-width: 480px) 75vw, (max-width: 768px) 125vw, 200vw"
					style={{
						width: "100%",
						height: "auto",
						objectFit: "contain",
					}}
				/>
			</div>
		</main>
	);
}
