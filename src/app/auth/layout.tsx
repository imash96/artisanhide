import Facebook from "@/icon/icon-facebok";
import Google from "@/icon/icon-google";
import Logo from "@/icon/logo";
import Button from "@module/common/custom-button";
import CustomDivider from "@module/common/custom-divider";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex min-h-screen">
            {/* Left - Form Section */}
            <div className="flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24">
                <div className="w-full max-w-md space-y-8">
                    <Link href="/">
                        <span className="flex mb-1">
                            <ArrowLeft className="w-4" />
                            Back
                        </span>
                    </Link>
                    <Logo className="w-36" />

                    {/* Children content (forms, etc.) */}
                    {children}

                    {/* Divider and Social Login */}
                    <div className="space-y-6">
                        <CustomDivider text="or" />
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2 rounded-md py-2"
                            >
                                <Google className="h-5 w-5" />
                                <span className="text-sm font-medium">Google</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2 rounded-md py-2"
                            >
                                <Facebook className="h-5 w-5" />
                                <span className="text-sm font-medium">Facebook</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right - Background Image */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <Image
                    alt="Leather fashion background"
                    src="/temp_img/desktopBanner.webp"
                    className="absolute inset-0 h-full w-full object-cover"
                    width={1908}
                    height={1080}
                    priority
                />
            </div>
        </div>
    );
}
