import { cookies } from "next/headers";
import { use } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/mode_light.css";
import "@/styles/mode_dark.css";

const BricolageGrotesque = Bricolage_Grotesque({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = use(cookies())
  const theme = cookieStore.get('__theme')
  return (
    <html lang="en" data-theme={theme?.value ? theme.value : "light"}>
      <body className={`${BricolageGrotesque.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}