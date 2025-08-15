export default function AddressCard({ title, address, email }: AddressCardProps) {
    return (
        <div className="space-y-0.5 text-gray-700 font-light text-sm">
            <h4 className="font-medium text-brown mb-2 text-base">{title}</h4>
            <div className="text-gray-700 space-y-1">
                <p className="font-medium">{address.name}</p>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>{address.cityLine}</p>
                <p>{address.countryCode}</p>
                <p>{address.phone}</p>
            </div>
            {email && <p>{email}</p>}
        </div>
    )
}

interface AddressCardProps {
    title: string
    email?: string
    address: {
        name: string;
        address1: string;
        address2: string;
        cityLine: string;
        phone: string;
        countryCode: string;
    }
}