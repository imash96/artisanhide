import { cookies } from "next/headers";
import { use } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import HolyLoader from "holy-loader";
import Announcement from "@/layout/home/templates/announcement";

import "@/style/globals.css";
import "@/style/mode_light.css";
import "@/style/mode_dark.css";

const BricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], display: 'swap' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = use(cookies()).get('__theme')?.value
  return (
    <html lang="en" data-theme={theme ? theme : "light"}>
      <body className={`${BricolageGrotesque.className} bg-background antialiased pb-14 lg:pb-0`}>
        <HolyLoader color="gray" easing="ease-out" />
        <Announcement />
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}