import { cookies } from "next/headers";
import { use } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import HolyLoader from "holy-loader";
import Announcement from "@/layouts/home/templates/announcement";

import "@/styles/globals.css";
import "@/styles/mode_light.css";
import "@/styles/mode_dark.css";

const BricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], display: 'swap' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = use(cookies()).get('__theme')?.value
  return (
    <html lang="en" data-theme={theme ? theme : "light"}>
      <body className={`${BricolageGrotesque.className} antialiased pb-14 lg:pb-0`}>
        <HolyLoader color="gray" easing="ease-out" />
        <Announcement />
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}