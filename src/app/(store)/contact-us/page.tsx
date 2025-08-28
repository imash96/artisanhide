"use client"

import Container from "@module/common/create-section";
import Button from "@module/common/custom-button";
import CustomInput from "@module/common/custom-input";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    return (
        <Container className="py-6 md:py-10 lg:py-16 space-y-[4vw] lg:space-y-[2vw]">
            <div className="space-y-[2vw] lg:space-y-[1vw]">
                <h1 className="text-center text-3xl text-templateBrown">Contact Us</h1>
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
                        <h3 className="text-[5.5vw]  md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1] text-templateBrown">
                            Chat with us
                        </h3>
                        <p className="text-sm tracking-wide text-foreground-muted">
                            We invite you to get in touch with us.{" "}
                        </p>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href=""
                        >
                            <Mail size={15} className="mb-[1px]" strokeWidth={1.5} />
                            contact@artisanhide.com
                        </a>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href=""
                        >
                            <Phone size={15} className="mb-[1px]" strokeWidth={1.5} />
                            +91 72088 20111
                        </a>
                    </div>
                    <div className="space-y-[2vw] lg:space-y-[0.8vw]">
                        <h3 className="text-[5.5vw] md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1] text-templateBrown">
                            Connect with us
                        </h3>
                        <p className="text-sm tracking-wide text-foreground-muted">
                            We invite you to get in touch with us on social media.{" "}
                        </p>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href=""
                        >
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuH7c5cLpGehi0b4iQk90fXUzC9p7Ebla13w&s"
                                className="h-4 w-4 mb-[1px] rounded-xs"
                                width={50}
                                height={50}
                                alt=""
                            />
                            Instagram
                        </a>
                        <a
                            className="flex items-center gap-2 text-sm tracking-wide text-foreground-muted "
                            href=""
                        >
                            <Image
                                src="https://static.vecteezy.com/system/resources/previews/021/495/985/non_2x/facebook-social-media-logo-icon-free-png.png"
                                className="h-4 w-4 mb-[1px] rounded-xs"
                                width={50}
                                height={50}
                                alt=""
                            />
                            Facebook
                        </a>
                    </div>
                    <div className="space-y-[2vw] lg:space-y-[0.8vw]">
                        <h3 className="text-[5.5vw] md:text-[4vw] text-left lg:text-[1.5vw] leading-[1.1] text-templateBrown">
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
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        message: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit} className={`space-y-6`}>
            <div className="flex items-center gap-2.5">
                <div className="space-y-1 w-full">
                    <CustomInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                </div>
                <div className="space-y-1 w-full">
                    <CustomInput
                        label="Last Name"
                        name="lastName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-1 w-full">
                <CustomInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="space-y-1 w-full">
                <CustomInput
                    label="Mobile Number"
                    name="mobileNumber"
                    type="tel"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                />
            </div>

            <div className="space-y-1 w-full">
                <label htmlFor="message" className="text-[13px] tracking-wide block">
                    Message
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Message (Optional)"
                    className="w-full border h-16 placeholder:text-xs rounded-md px-3 py-2.5 text-[13px]"
                />
            </div>

            <Button className="tracking-wide cursor-pointer w-full">
                Submit
            </Button>
        </form>
    )
}