import type { Metadata } from 'next';
import '../index.css';
import Providers from '@/components/providers';

export const metadata: Metadata = {
	title: 'Next.js + tRPC + Prisma Todo',
	description: 'A simple todo app with Next.js, tRPC, and Prisma',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<nav className="border-b px-4 py-3 flex justify-center items-center">
						<div className="mx-auto max-w-4xl">
							<h1 className="text-xl font-bold">Next.js + tRPC + Prisma</h1>
						</div>
					</nav>
					{children}
				</Providers>
			</body>
		</html>
	);
}
