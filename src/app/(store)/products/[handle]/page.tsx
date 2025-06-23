
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params
    return (
        <div className="">Product Page: {handle} </div>
    )
}