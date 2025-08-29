import { cookies } from "next/headers";
import { use } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import HolyLoader from "holy-loader";
import Announcement from "@/layout/home/templates/announcement";

import "@/style/globals.css";
import "@/style/mode_light.css";
import "@/style/mode_dark.css";
import Script from "next/script";

const BricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"], display: 'swap' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = use(cookies()).get('__theme')?.value
  return (
    <html lang="en" data-theme={theme ? theme : "light"}>
      <head>
        {process.env.NEXT_PUBLIC_GOOGLE_TAG_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_ID} />}
        {/* Trustpilot Script */}
        {process.env.NODE_ENV === "production" &&
          <Script
            id="trustpilot-script"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(a,f)})(window,document,'script','https://invitejs.trustpilot.com/tp.min.js ', 'tp');tp('register', 'ogjwFsXcS1kWSc5k');`,
            }}
          />
        }
      </head>
      <body className={`${BricolageGrotesque.className} bg-background antialiased pb-14 lg:pb-0`}>
        <HolyLoader color="gray" easing="ease-out" />
        <Announcement />
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}