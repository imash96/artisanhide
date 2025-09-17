import Facebook from "@/icon/icon-facebok";
import Google from "@/icon/icon-google";
import Logo from "@/icon/logo";
import Button from "@module/common/custom-button";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({ children }: LayoutProps<"/auth">) {
    return (
        <main className="flex min-h-screen">
            {/* Left Banner (Desktop only) */}
            <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
                <div className="absolute inset-0">
                    <Image
                        src="/temp_img/mobileBanner.jpg"
                        alt="Leather product promotional banner"
                        fill
                        quality={100}
                        sizes="(min-width: 768px) 12rem, (min-width: 640px) 15rem, 16rem"
                        className="object-cover object-top"
                        placeholder="empty"
                    />
                </div>
                <Button
                    href="/"
                    variant="outline"
                    color="secondary"
                    className="relative z-10 w-fit gap-2"
                >
                    <Home className="w-4 h-4" />
                    Home
                </Button>
                <div className="relative z-10 text-same-white">
                    <h1 className="text-4xl font-extrabold leading-snug mb-4">
                        Crafted Elegance,<br />
                        Timeless Style
                    </h1>
                    <p className="max-w-md text-same-white/70">
                        Discover premium leather essentials that combine rugged craftsmanship with refined detail.
                    </p>
                </div>
            </div>

            {/* Right Panel: Login Form */}
            <div className="flex flex-col w-full lg:w-1/2 justify-center items-center overflow-auto no-scrollbar px-6 sm:px-12">
                <div className="flex justify-center pt-6 lg:pt-10 xl:pt-20">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo className="w-32" />
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center md:p-8 md:pt-0 w-full">
                    <div className="w-full max-w-md p-6 relative">
                        {/* Login Form */}
                        {children}

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center" aria-hidden>
                                <div className="w-full h-px bg-border" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-background px-4 text-sm text-muted-foreground">
                                    or sign in with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button variant="outline" className="w-full gap-2 py-2">
                                <Google className="h-5 w-5" />
                                <span className="text-sm font-medium">Google</span>
                            </Button>
                            <Button variant="outline" className="w-full gap-2 py-2">
                                <Facebook className="h-5 w-5" />
                                <span className="text-sm font-medium">Facebook</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
