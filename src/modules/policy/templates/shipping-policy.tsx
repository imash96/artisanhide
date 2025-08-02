
export default function ShippingPolicy() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl uppercase text-templateBrown font-light">
                Shipping Policy
            </h1>
            <p className="text-sm text-templateBrown tracking-wide font-light">
                Effective Date: 08/01/2025
            </p>
            <p className="text-sm tracking-wide font-light">
                At Artisan Hide, we are committed to delivering your handcrafted items
                safely and on time. This Shipping Policy explains our process,
                timelines, and options for delivering your orders.
            </p>

            {/* 1. Shipping Locations */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    1. Shipping Locations
                </h2>
                <p className="text-sm tracking-wide font-light">
                    We currently ship across India. For international shipping requests,
                    please contact us directly at <strong>support@artisanhide.com</strong>
                    .
                </p>
            </div>

            {/* 2. Processing Time */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    2. Processing Time
                </h2>
                <p className="text-sm tracking-wide font-light">
                    All orders are processed within 2–4 business days. During peak
                    seasons, processing may take slightly longer. You’ll receive an email
                    confirmation with tracking details once your order has been shipped.
                </p>
            </div>

            {/* 3. Shipping Time & Delivery */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    3. Shipping Time & Delivery
                </h2>
                <p className="text-sm tracking-wide font-light">
                    Delivery times vary based on your location:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Metro cities: 2–5 business days
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Other regions: 5–9 business days
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Remote areas: 7–14 business days
                    </li>
                </ul>
                <p className="text-sm tracking-wide font-light">
                    We are not responsible for delays caused by courier partners or due to
                    unforeseen circumstances (like natural disasters or strikes).
                </p>
            </div>

            {/* 4. Shipping Charges */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    4. Shipping Charges
                </h2>
                <p className="text-sm tracking-wide font-light">We offer:</p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Free shipping on all prepaid orders above ₹999
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        A flat fee of ₹79 on orders below ₹999
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Additional charges may apply for Cash on Delivery (COD)
                    </li>
                </ul>
            </div>

            {/* 5. Tracking Your Order */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    5. Tracking Your Order
                </h2>
                <p className="text-sm tracking-wide font-light">
                    Once your order is shipped, you will receive a tracking number by
                    email or SMS. You can track your shipment via the courier's website.
                </p>
            </div>

            {/* 6. Undeliverable Packages */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    6. Undeliverable Packages
                </h2>
                <p className="text-sm tracking-wide font-light">
                    If a package is returned due to incorrect address or repeated failed
                    delivery attempts, we will contact you for an alternative address.
                    Additional shipping charges may apply for reshipping.
                </p>
            </div>

            {/* 7. Damaged or Lost Items */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    7. Damaged or Lost Items
                </h2>
                <p className="text-sm tracking-wide font-light">
                    If your package arrives damaged or is lost in transit, please notify
                    us at <strong>support@artisanhide.com</strong> within 48 hours. We’ll
                    coordinate with the courier to resolve the issue.
                </p>
            </div>

            {/* 8. Contact Us */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">8. Contact Us</h2>
                <p className="text-sm tracking-wide font-light">
                    For questions about shipping, delivery, or tracking, feel free to
                    reach out to:
                </p>
                <p className="text-sm tracking-wide font-light">
                    📧 <strong>support@artisanhide.com</strong>
                </p>
            </div>
        </div>
    )
}