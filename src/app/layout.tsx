import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from '@/utils/supabase/server';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

import "@/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StatusStack",
  description: "Analytics Dashboard for App Uptime",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 flex flex-col min-h-screen`}
      >
        <Header user={user}></Header>
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
