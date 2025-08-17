
import BannerSlider from "@modules/home/templates/banner";
import Category from "@modules/home/templates/category";
import Collection from "@modules/home/templates/collection";
import GalleryWall from "@modules/home/templates/gallery-wall";
import OnSale from "@modules/home/templates/col-on-sale";
import NewArrival from "@modules/home/templates/col-new-arrival";
import TrendingNow from "@modules/home/templates/col-trending-now";
import { getRegion } from "libs/actions/region";
import Testimonals from "@modules/home/templates/testimonials";
import Blog from "@modules/home/templates/blog";
import IconWithText from "@modules/home/components/icon-with-text";
import { podData, uspData } from "@modules/home/icon-with-text";
import { cookies } from "next/headers";

// remove countrycode and async if not needed
export default async function Page() {
  const countryCode = (await cookies()).get("__country_code")?.value || process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

  const region = await getRegion(countryCode)

  if (!region) return null

  return (
    <>
      <BannerSlider />
      <IconWithText data={uspData} />
      <Category />
      <TrendingNow region_id={region.id} />
      <Collection />
      <NewArrival region_id={region.id} />
      <GalleryWall />
      <Testimonals />
      <OnSale region_id={region.id} />
      <Blog />
      <IconWithText data={podData} />
    </>
  );
}