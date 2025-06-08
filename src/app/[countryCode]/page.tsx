
import BannerSlider from "@modules/home/templates/banner";
import Category from "@modules/home/templates/category";
import Collection from "@modules/home/templates/collection";
import GalleryWall from "@modules/home/templates/gallery-wall";
import POD from "@modules/home/templates/pod";
import USP from "@modules/home/templates/ups";
import TempCart from "./temp-cart-button";
import VideoBanner from "@modules/home/templates/video";
import OnSale from "@modules/home/templates/col-on-sale";
import NewArrival from "@modules/home/templates/col-new-arrival";
import TrendingNow from "@modules/home/templates/col-trending-now";
import { getRegion } from "libs/actions/region";
import Testimonals from "@modules/home/templates/testimonials";

// remove countrycode and async if not needed
export default async function Home({ params }: { params: Promise<{ countryCode: string }> }) {
  const countryCode = (await params).countryCode

  const region = await getRegion(countryCode)

  if (!region) return null

  return (
    <>
      <BannerSlider />
      <TempCart countryCode={countryCode} />
      <USP />
      <Category />
      <Collection />
      <TrendingNow region_id={region.id} />
      <VideoBanner />
      <NewArrival region_id={region.id} />
      <GalleryWall />
      <Testimonals />
      <OnSale region_id={region.id} />
      <POD />
    </>
  );
}