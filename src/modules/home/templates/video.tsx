

export default function VideoBanner() {
    return (
        <div className="h-[300px] md:h-[400px] lg:h-[600px] w-full">
            <video muted loop autoPlay controls={false} className="h-full w-full object-cover" src="https://www.thejacketmaker.com/cdn/shop/videos/c/vp/b6b8ed414b754c10baf95cf8466c9d89/b6b8ed414b754c10baf95cf8466c9d89.HD-720p-4.5Mbps-48307499.mp4?v=0" />
        </div>
    )
}