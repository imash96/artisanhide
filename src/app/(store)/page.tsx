import BannerSlider from "@module/home/templates/banner";
import Category from "@module/home/templates/category";
import Collection from "@module/home/templates/collection";
import GalleryWall from "@module/home/templates/gallery-wall";
import OnSale from "@module/home/templates/col-on-sale";
import NewArrival from "@module/home/templates/col-new-arrival";
import TrendingNow from "@module/home/templates/col-trending-now";
import { getRegion } from "@lib/action/region";
import Testimonals from "@module/home/templates/testimonials";
import Blog from "@module/home/templates/blog";
import IconWithText from "@module/home/templates/icon-with-text";
import { podData, uspData } from "@module/home/components/icon-with-text";
import { cookies } from "next/headers";

import "@/style/home.css"

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
      <TrendingNow region_id={region.id}  />
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