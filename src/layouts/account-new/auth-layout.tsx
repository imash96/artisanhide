import Facebook from "@/icons/icon-facebok";
import Google from "@/icons/icon-google";
import Button from "@modules/common/custom-button";
import CustomDivider from "@modules/common/custom-divider"

export default function AuthLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="max-w-sm mx-auto flex flex-col justify-center">
            {children}
            <div className="mt-6">
                <CustomDivider text="or" />
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full bg-transparent rounded-md">
                        <Google className="h-5 w-5 mr-2" />
                        Google
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent rounded-md">
                        <Facebook className="h-5 w-5 mr-2" />
                        Facebook
                    </Button>
                </div>
            </div>
        </div>
    )
}