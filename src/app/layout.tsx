import "./globals.css";
import { themeInitScript } from "@/lib/theme";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kit Mikhael Bagares — Senior Full-Stack Engineer / Lead Developer",
  description:
    "I build production-ready digital products by connecting business goals, thoughtful user experience, scalable engineering, and practical AI workflows. Based in Cebu, Philippines.",
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
  colorScheme: "light dark",
};

export default function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const { children } = props;
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          id="portfolio-theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className="bg-background font-inter text-foreground antialiased"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
