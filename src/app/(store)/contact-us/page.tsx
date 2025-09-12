"use client"

import Facebook from "@/icon/icon-facebok";
import Instagram from "@/icon/icon-instagram";
import Container from "@module/common/create-section";
import Button from "@module/common/custom-button";
import CustomInput from "@module/common/custom-input";
import CustomTextarea from "@module/common/custom-textarea";
import { Mail } from "lucide-react";

export default function Page() {
    return (
        <Container className="py-6 md:py-10 lg:py-16 space-y-[4vw] lg:space-y-[2vw]">
            <div className="space-y-[2vw] lg:space-y-[1vw]">
                <h1 className="text-center text-3xl">Contact Us</h1>
                <p className="text-center lg:max-w-[45vw] mx-auto text-sm tracking-wide text-foreground-muted">
                    Got any questions? We invite you to get in touch with us. Our team is
                    here to help you. Our team will respond to your inquiry as soon as
                    possible.
                </p>
            </div>
            <div className="lg:max-w-[60vw]  mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16 w-full">
                <div className="w-full pt-4 lg:w-[55%]">
                    <ContactForm />
                </div>
                <div className="w-full lg:w-[45%] space-y-[8vw] lg:space-y-[2.5vw] py-[2vw]">
                    <div className="space-y-[2vw] lg:space-y-[0.8vw]">
                        <h3 className="text-[5.5vw]  md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1]">
                            Chat with us
                        </h3>
                        <p className="text-sm tracking-wide text-foreground-muted">
                            We invite you to get in touch with us.{" "}
                        </p>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href="mailto:contact@artisanhide.com"
                        >
                            <Mail size={15} className="mb-[1px]" strokeWidth={1.5} />
                            contact@artisanhide.com
                        </a>
                        {/* <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href=""
                        >
                            <Phone size={15} className="mb-[1px]" strokeWidth={1.5} />
                            +91 72088 20111
                        </a> */}
                    </div>
                    <div className="space-y-[2vw] lg:space-y-[0.8vw]">
                        <h3 className="text-[5.5vw] md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1]">
                            Connect with us
                        </h3>
                        <p className="text-sm tracking-wide text-foreground-muted">
                            We invite you to get in touch with us on social media.{" "}
                        </p>
                        <a className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href="https://instagram.com/ArtisanHideStore" target="_blank"
                        >
                            <Instagram className="size-5" />
                            Instagram
                        </a>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href="https://facebook.com/ArtisanHideStore" target="_blank"
                        >
                            <Facebook className="size-5" />
                            Facebook
                        </a>
                    </div>
                    <div className="space-y-[2vw] lg:space-y-[0.8vw]">
                        <h3 className="text-[5.5vw] md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1]">
                            Our Timing
                        </h3>
                        <p className="text-sm tracking-wide text-foreground-muted">
                            9AM - 5PM Monday to Friday
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

function ContactForm() {


    const handleSubmit = async (formData: FormData) => {
        const payLoad = {
            first_name: formData.get("firstName"),
            last_name: formData.get("lastName"),
            email: formData.get("email"),
            number: formData.get("mobileNumber"),
            message: formData.get("message"),
        }
        console.log(payLoad)
    };
    return (
        <form action={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2.5">
                <CustomInput
                    label="First Name"
                    className="w-full"
                    name="firstName"
                    required
                />
                <CustomInput
                    label="Last Name"
                    className="w-full"
                    name="lastName"
                />
            </div>

            <CustomInput
                label="Email"
                name="email"
                type="email"
                required
            />

            <CustomInput
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
            />

            <CustomTextarea
                label="Message"
                name="message"
                required
            />

            <Button className="tracking-wide cursor-pointer w-full">
                Submit
            </Button>
        </form>
    )
}