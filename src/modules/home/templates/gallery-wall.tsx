import ImageMarquee from "../components/marquee";

export default function GalleryWall() {
  const images = [
    { src: "/marquee/p1.jpg", alt: "Image 1" },
    { src: "/marquee/p2.jpg", alt: "Image 2" },
    { src: "/marquee/p3.jpg", alt: "Image 3" },
    { src: "/marquee/p4.jpg", alt: "Image 4" },
    { src: "/marquee/p5.jpg", alt: "Image 5" },
    { src: "/marquee/p6.jpg", alt: "Image 6" },
    { src: "/marquee/p7.jpg", alt: "Image 7" },
    { src: "/marquee/p8.jpg", alt: "Image 8" },
  ]

  return (
    <div className="mx-auto my-0 max-w-full py-6 md:py-10 lg:py-14 space-y-6">
      <ImageMarquee
        images={images}
        duration={40}
      />
      <ImageMarquee
        images={images}
        duration={30}
        direction="backward"
      />
    </div>
  )
}
