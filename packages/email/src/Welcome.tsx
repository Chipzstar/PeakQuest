import {
	Body,
	Button,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface WelcomeEmailProps {
	name?: string;
	questId?: string;
	quest?: string;
}


export const WelcomeEmail = ({
								 name,
								 questId,
								 quest,
							 }: WelcomeEmailProps) => {
	const questLink = `https://peak-quest.vercel.app/quest/${questId}`
	return (
		<Html>
			<Preview>A quest to improve your life</Preview>
			<Head />
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Welcome to <strong>PeakQuest</strong>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hey {name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Thank you for sharing your quest with us.
						</Text>
						<Section className="mt-[30px]">
							<Heading className="text-black text-[18px] font-semibold  mx-0">
								Your quest
							</Heading>
							<Text className="text-black text-[14px] leading-[24px]">
								{quest}
							</Text>
						</Section>
						<Section className="mt-[14px]">
							<Text className="text-black text-[14px]  leading-[24px]">
								You can access your quest at any time by visiting the link below:
							</Text>
							<Text className="text-black text-[14px] leading-[24px]">
								<Link href={questLink} className="text-blue-600 no-underline">
									{questLink}
								</Link>
							</Text>
						</Section>

						<Section className="text-black text-[12px] mt-[20px]">
							<Text >
								Best wishes,
							</Text>
							<Text>
								PeakQuest Team
							</Text>
						</Section>

						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Life is a marathon not a sprint.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

WelcomeEmail.PreviewProps = {
	name: "John",
	questId: "ce01feb1-6242-4f14-b3c3-ae7cae0028b7",
	quest: "Become a youtuber"
} as WelcomeEmailProps;

export default WelcomeEmail;
