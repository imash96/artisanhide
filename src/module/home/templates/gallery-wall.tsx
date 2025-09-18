import ImageMarquee from "../components/marquee";

export default function GalleryWall() {
  const tImages = [
    { src: "/marquee/t1.jpg", alt: "Image 1" },
    { src: "/marquee/t2.jpg", alt: "Image 2" },
    { src: "/marquee/t3.jpg", alt: "Image 3" },
    { src: "/marquee/t4.jpg", alt: "Image 4" },
    { src: "/marquee/t5.jpg", alt: "Image 5" },
    { src: "/marquee/t6.jpg", alt: "Image 6" },
    { src: "/marquee/t7.jpg", alt: "Image 7" },
    { src: "/marquee/t8.jpg", alt: "Image 8" },
  ]

  const bImages = [
    { src: "/marquee/b1.jpg", alt: "Image 1" },
    { src: "/marquee/b2.jpg", alt: "Image 2" },
    { src: "/marquee/b3.jpg", alt: "Image 3" },
    { src: "/marquee/b4.jpg", alt: "Image 4" },
    { src: "/marquee/b5.jpg", alt: "Image 5" },
    { src: "/marquee/b6.jpg", alt: "Image 6" },
    { src: "/marquee/b7.jpg", alt: "Image 7" },
    { src: "/marquee/b8.jpg", alt: "Image 8" },
  ]

  return (
    <div className="mx-auto my-0 max-w-full py-6 md:py-10 lg:py-14 space-y-6">
      <ImageMarquee
        images={tImages}
        duration={35}
      />
      <ImageMarquee
        images={bImages}
        duration={30}
        direction="backward"
      />
    </div>
  )
}
