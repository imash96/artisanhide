

export default function ReturnRefundPolicy() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl uppercase text-templateBrown font-light">
                Return & Refund Policy
            </h1>
            <p className="text-sm text-templateBrown tracking-wide font-light">
                Effective Date: 08/01/2025
            </p>
            <p className="text-sm tracking-wide font-light">
                At Artisan Hide, we take pride in our craftsmanship and are committed to
                ensuring your satisfaction. This Return & Refund Policy outlines the
                conditions under which you may return products or request a refund.
            </p>

            {/* 1. Eligibility for Returns */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    1. Eligibility for Returns
                </h2>
                <p className="text-sm tracking-wide font-light">
                    To be eligible for a return:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        The item must be unused, unworn, and in its original condition with
                        tags and packaging intact.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        The return request must be initiated within 7 days of receiving the
                        product.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Custom-made or personalized products are non-returnable unless
                        defective or damaged on arrival.
                    </li>
                </ul>
            </div>

            {/* 2. Return Process */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    2. Return Process
                </h2>
                <p className="text-sm tracking-wide font-light">
                    To initiate a return, please:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Contact our support team at <strong>support@artisanhide.com</strong>{" "}
                        with your order number and reason for return.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        We will respond with return instructions and the return shipping
                        address.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Please ensure the item is securely packaged to avoid damage during
                        transit.
                    </li>
                </ul>
            </div>

            {/* 3. Refunds */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">3. Refunds</h2>
                <p className="text-sm tracking-wide font-light">
                    Once we receive and inspect the returned item, we will:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Notify you via email about the status of your return.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Approve or reject your refund request based on item condition.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        If approved, initiate a refund to your original payment method
                        within 7-10 business days.
                    </li>
                </ul>
                <p className="text-sm tracking-wide font-light">
                    Please note: Original shipping charges are non-refundable.
                </p>
            </div>

            {/* 4. Exchanges */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">4. Exchanges</h2>
                <p className="text-sm tracking-wide font-light">
                    We only replace items if they are defective or damaged upon arrival.
                    If you need to exchange a product, please email us within 48 hours of
                    delivery.
                </p>
            </div>

            {/* 5. Non-Returnable Items */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    5. Non-Returnable Items
                </h2>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Customized or personalized products.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Items marked as final sale or clearance.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Gift cards or downloadable content.
                    </li>
                </ul>
            </div>

            {/* 6. Damaged or Defective Products */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    6. Damaged or Defective Products
                </h2>
                <p className="text-sm tracking-wide font-light">
                    If you receive a damaged or defective product:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Please contact us within 48 hours of delivery.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Include photos and a description of the issue in your email.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        We will review and arrange a replacement or refund at no extra
                        charge.
                    </li>
                </ul>
            </div>

            {/* 7. Shipping Costs */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    7. Shipping Costs
                </h2>
                <p className="text-sm tracking-wide font-light">
                    You will be responsible for paying the return shipping costs unless
                    the item is defective or incorrect. We recommend using a trackable
                    shipping service or purchasing shipping insurance, as we cannot
                    guarantee that we will receive your returned item.
                </p>
            </div>

            {/* 8. Late or Missing Refunds */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    8. Late or Missing Refunds
                </h2>
                <p className="text-sm tracking-wide font-light">
                    If you haven’t received a refund yet:
                </p>
                <ul className="list-inside list-disc space-y-3">
                    <li className="text-sm tracking-wide font-light">
                        Double-check your bank account or credit card statement.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        Contact your payment provider; it may take additional time to post
                        the refund.
                    </li>
                    <li className="text-sm tracking-wide font-light">
                        If you still have not received your refund after 10 business days,
                        contact us at <strong>support@artisanhide.com</strong>.
                    </li>
                </ul>
            </div>

            {/* 9. Policy Updates */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">
                    9. Policy Updates
                </h2>
                <p className="text-sm tracking-wide font-light">
                    We may update this Return & Refund Policy at any time. Changes will be
                    posted on this page with a revised effective date. Continued use of
                    our services implies your acceptance of the updated policy.
                </p>
            </div>

            {/* 10. Contact Us */}
            <div className="space-y-4">
                <h2 className="text-xl uppercase text-templateBrown">10. Contact Us</h2>
                <p className="text-sm tracking-wide font-light">
                    For any questions or assistance with returns or refunds, please
                    contact:
                </p>
                <p className="text-sm tracking-wide font-light">
                    📧 <strong>support@artisanhide.com</strong>
                </p>
            </div>
        </div>
    )
}