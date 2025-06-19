import Link from "next/link"

const encoded = encodeURI(
    `https://wa.me/917506919895?text=Hi🙋,

    I need more info about the product on artisanhide.com
    `
)

export default function MobileDrawerContact() {
    return (
        <>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-200">
                CONTACT US
            </h3>
            <span>WhatsApp Us :
                <a href={encoded} className='text-blue-1 ml-1'>
                    75069 19895
                </a>
            </span>
            <span>Email Us:
                <a href="mailto:contact@artisanhide.com" className='text-blue-300 ml-1'>
                    contact@artisanhide.com
                </a>
            </span>
            <span>Call Us :
                <a href="tel:+91 75069 19895" className='text-blue-300 ml-1'>
                    75069 19895
                </a>
            </span>
            <span className='text-xs -mt-0.5'>8:00 AM to 8:00 PM, 365 days</span>
            <span className='font-light mt-4'>Please note that you are accessing the BETA Version of
                <Link href='/' className='text-blue-300 ml-1'>
                    artisanhide.com
                </Link>
            </span>
            <span className='font-light'>Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the beta website, please email us on
                <a href="mailto:info@artisanhide.com" className='text-blue-300 ml-1'>
                    info@artisanhide.com
                </a>
            </span>
        </>
    )
}