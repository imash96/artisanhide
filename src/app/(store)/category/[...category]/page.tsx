import { SortOptions } from "@/types/common";


export default async function Page({ params, searchParams }: Props) {
    const categorySegments = (await params).category;
    const { sortBy, page } = await searchParams

    return (
        <div className="">Category : {categorySegments.join("/")}</div>
    )
}

type Props = {
    params: Promise<{ category: string[] }>
    searchParams: Promise<{
        sortBy?: SortOptions
        page?: string
    }>
}