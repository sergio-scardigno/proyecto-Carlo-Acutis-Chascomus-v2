import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { GtmNoScript, GtmPageViewTracker, GtmScript } from "@/components/Gtm";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Misión San Carlo Acutis",
	description: "Sitio moderno con hero parallax y secciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="es">
			<head>
				<GtmScript />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<GtmNoScript />
				<GtmPageViewTracker />
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
  );
}
