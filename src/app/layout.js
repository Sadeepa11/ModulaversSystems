import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./componets/Nav"; // Make sure the path is correct

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata = {
  title: "Modulavers Systems | Innovative Software Solutions",
  description:
    "Modulavers Systems is a Sri Lankan software company delivering custom web and mobile applications, cloud solutions, and digital transformation services with a focus on innovation and quality.",
  keywords: [
    "Modulavers Systems",
    "Software Company Sri Lanka",
    "Web Development",
    "Mobile App Development",
    "React",
    "Next.js",
    "Node.js",
    "MERN Stack",
    "Full Stack Development",
    "Custom Software Solutions",
    "IT Company Sri Lanka",
  ],
  metadataBase: new URL("https://modulaverssystems.com"), // Make sure domain is correct
  authors: [
    {
      name: "Modulavers Systems Team",
      url: "https://modulaverssystems.com",
    },
  ],
  creator: "Modulavers Systems",
  openGraph: {
    title: "Modulavers Systems | Innovative Software Solutions",
    description:
      "We specialize in custom software development, responsive websites, and digital solutions. Build your future with Modulavers Systems.",
    url: "https://modulaverssystems.com",
    siteName: "Modulavers Systems",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "/public/logo/mylogo/mv.png", // Add a real image in /public/images/
        width: 1200,
        height: 630,
        alt: "Modulavers Systems – Software Solutions Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modulavers Systems | Software & Web Solutions",
    description:
      "Sri Lanka-based tech company offering modern web, mobile, and full-stack development services.",
    creator: "@Modulavers", // Optional if you have a Twitter
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/public/logo/mylogo/mv.png",
    apple: "/public/logo/mylogo/mv.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://modulaverssystems.com",
    languages: {
      "en-LK": "/en",
      "si-LK": "/si",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`bg-white text-black dark:bg-gray-900 dark:text-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav/>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
