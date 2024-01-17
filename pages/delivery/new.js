import Head from "next/head";
import RequestPickup from "@/Components/Delivery";

export default function PickupForm() {
  return (
    <>
      <Head>
        <title>CountryMovers Courier Service</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RequestPickup />
    </>
  );
}
