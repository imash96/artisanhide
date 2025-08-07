import Thumbnail from "@modules/product/components/thumbnail";
import CartRemoveButton from "./cart-remove-button";

type CartThumbnailProps = {
    thumbnail: string | undefined
    title: string
    id: string
}

export default function CartThumbnail({ thumbnail, title, id }: CartThumbnailProps) {
    return (
        <div className="relative w-24 xs:w-20">
            <Thumbnail
                thumbnail={thumbnail}
                alt={title}
                className="bg-gray-50 rounded-md border border-gray-300"
            />
            <CartRemoveButton
                itemId={id}
                size='default'
                className="absolute -top-2 -right-2"
            />
        </div>
    )
}