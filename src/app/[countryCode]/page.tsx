
import BannerSlider from "@modules/home/templates/banner";
import Category from "@modules/home/templates/category";
import Collection from "@modules/home/templates/collection";
import GalleryWall from "@modules/home/templates/gallery-wall";
import POD from "@modules/home/templates/pod";
import USP from "@modules/home/templates/ups";
import TempCart from "./temp-cart-button";
import VideoBanner from "@modules/home/templates/video";

// remove countrycode and async if not needed
export default async function Home({ params }: { params: Promise<{ countryCode: string }> }) {
  const countryCode = (await params).countryCode
  return (
    <>
      <BannerSlider />
      <TempCart countryCode={countryCode} />
      <USP />
      <Category />
      <Collection />
      <VideoBanner />
      <GalleryWall />
      <POD />
    </>
  );
}