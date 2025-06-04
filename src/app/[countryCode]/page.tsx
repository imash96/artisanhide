
import BannerSlider from "@modules/home/templates/banner";
import Category from "@modules/home/templates/category";
import Collection from "@modules/home/templates/collection";
import GalleryWall from "@modules/home/templates/gallery-wall";
import POD from "@modules/home/templates/pod";
import USP from "@modules/home/templates/ups";

export default function Home() {
  return (
    <>
      <BannerSlider />
      <USP />
      <Category />
      <Collection />
      <div className="h-[300px] md:h-[400px] lg:h-[600px] w-full py-6 md:py-10">
        <video muted={true} loop={true} autoPlay={true} className="h-full w-full object-cover" src="https://www.thejacketmaker.com/cdn/shop/videos/c/vp/b6b8ed414b754c10baf95cf8466c9d89/b6b8ed414b754c10baf95cf8466c9d89.HD-720p-4.5Mbps-48307499.mp4?v=0" />
      </div>
      <GalleryWall />
      <POD />
    </>
  );
}