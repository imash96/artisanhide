

export default function TermOfSale() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl uppercase text-templateBrown font-light">
                Terms and Conditions
            </h1>
            <p className="text-sm text-templateBrown tracking-wide font-light">
                Effective Date: 08/01/2025
            </p>
            <p className="text-sm tracking-wide font-light">
                Welcome to Artisan Hide. By accessing or using our website, products, or
                services, you agree to comply with and be bound by the following Terms
                and Conditions. Please read them carefully.
            </p>

            {/* 1. Use of Website */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    1. Use of Website
                </h2>
                <p className="text-sm tracking-wide font-light">
                    This website and its content are intended for personal, non-commercial
                    use only. You agree not to reproduce, distribute, modify, or create
                    derivative works without our written permission.
                </p>
            </div>

            {/* 2. Product Information */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    2. Product Information
                </h2>
                <p className="text-sm tracking-wide font-light">
                    We strive to ensure product details, pricing, and availability are
                    accurate. However, we reserve the right to correct errors and update
                    information at any time without prior notice.
                </p>
            </div>

            {/* 3. Orders and Payments */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    3. Orders and Payments
                </h2>
                <p className="text-sm tracking-wide font-light">
                    All orders are subject to acceptance and availability. We reserve the
                    right to cancel or refuse any order for any reason. Payment must be
                    completed before order processing.
                </p>
            </div>

            {/* 4. Intellectual Property */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    4. Intellectual Property
                </h2>
                <p className="text-sm tracking-wide font-light">
                    All content on this website—including text, images, logos, and
                    designs—is the property of Artisan Hide and is protected by
                    intellectual property laws. Unauthorized use is strictly prohibited.
                </p>
            </div>

            {/* 5. Limitation of Liability */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    5. Limitation of Liability
                </h2>
                <p className="text-sm tracking-wide font-light">
                    Artisan Hide is not liable for any indirect, incidental, or
                    consequential damages arising from the use or inability to use our
                    website or products.
                </p>
            </div>

            {/* 6. Returns and Refunds */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    6. Returns and Refunds
                </h2>
                <p className="text-sm tracking-wide font-light">
                    Please refer to our <strong>Return & Refund Policy</strong> for
                    detailed information on return eligibility and procedures.
                </p>
            </div>

            {/* 7. Privacy Policy */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    7. Privacy Policy
                </h2>
                <p className="text-sm tracking-wide font-light">
                    Use of our website is also governed by our{" "}
                    <strong>Privacy Policy</strong>. By using this site, you consent to
                    the collection and use of information as described there.
                </p>
            </div>

            {/* 8. Governing Law */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    8. Governing Law
                </h2>
                <p className="text-sm tracking-wide font-light">
                    These terms shall be governed by and interpreted under the laws of
                    India. Any disputes arising shall be subject to the exclusive
                    jurisdiction of the courts in Mumbai, Maharashtra.
                </p>
            </div>

            {/* 9. Modifications */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    9. Modifications
                </h2>
                <p className="text-sm tracking-wide font-light">
                    We reserve the right to modify these Terms and Conditions at any time.
                    Changes will be effective immediately upon posting. Continued use of
                    the site means you accept the updated terms.
                </p>
            </div>

            {/* 10. Contact Us */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">10. Contact Us</h2>
                <p className="text-sm tracking-wide font-light">
                    For questions or concerns about these Terms, contact us at:
                </p>
                <p className="text-sm tracking-wide font-light">
                    📧 <strong>support@artisanhide.com</strong>
                </p>
            </div>
        </div>
    )
}