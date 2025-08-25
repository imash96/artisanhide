export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div className="min-h-screen flex items-center justify-center">order confirm you order id: {id}</div>
    )
}