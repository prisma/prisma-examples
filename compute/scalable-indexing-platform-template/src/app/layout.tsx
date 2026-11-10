import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { StructuredData } from "@/components/common/structured-data";
import { TooltipProvider } from "@/components/ui/tooltip";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Where this copy of the app is served. Set NEXT_PUBLIC_SITE_URL to your own
// address so Open Graph and Twitter image URLs resolve against it.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevShelf — Search 1M+ Open Source Learning Projects & Blueprints",
    template: "%s | DevShelf",
  },
  description:
    "Sub-second full-text discovery engine indexing over 1,000,000 verified open-source tutorials, engineering blueprints, distributed systems architectures, and ML models.",
  keywords: [
    "open source search engine",
    "developer tutorials",
    "code repositories",
    "engineering blueprints",
    "machine learning models",
    "distributed systems",
    "Next.js architectures",
    "Anas",
  ],
  authors: [{ name: "Anas", url: "https://github.com/anas20023" }],
  creator: "Anas",
  publisher: "DevShelf",
  applicationName: "DevShelf",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "DevShelf",
    title: "DevShelf — Search 1M+ Open Source Learning Projects & Blueprints",
    description:
      "Sub-second full-text search across curated tutorials, mini-projects, and machine learning models.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevShelf - Open Source Learning Index",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevShelf — Search 1M+ Open Source Learning Projects",
    description:
      "Sub-second full-text search across curated tutorials, mini-projects, and machine learning models.",
    creator: "@anas",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", plusJakartaSans.variable, jetbrainsMono.variable)}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
