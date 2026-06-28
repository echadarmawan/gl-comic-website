import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/theme-provider";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Responsive Comic Website",
  description: "Explore a vibrant comic website featuring a responsive design with light and dark modes, a searchable comic list, and an interactive chatbot for engaging conversations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.className} h-full antialiased`}
    >
      <body className="min-h-full m-0">
        <Providers>
          <Navbar />

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
