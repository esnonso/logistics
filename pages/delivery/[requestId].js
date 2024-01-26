import Head from "next/head";
import Checkout from "@/Components/Delivery/checkout";
import { connectDatabase } from "@/Mongodb";
import Courier from "@/Mongodb/Models/courier";

export default function DeliveryCheckout(props) {
  return (
    <>
      <Head>
        <title>CountryMovers Courier Service </title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="google-adsense-account" content="ca-pub-5633953924102583" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633953924102583"
          crossorigin="anonymous"
        ></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Checkout id={props.id} />
    </>
  );
}

export async function getStaticPaths() {
  await connectDatabase();
  const shipments = await Courier.find({}, { _id: 1 });

  return {
    fallback: "blocking",
    paths: shipments.map((s) => ({
      params: { requestId: s._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const shipmentId = context.params.requestId;
  return {
    props: {
      id: shipmentId || "",
      revalidate: 1,
    },
  };
}
