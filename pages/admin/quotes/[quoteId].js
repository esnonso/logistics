import Head from "next/head";
import SingleQuote from "@/Components/Admin/Quotes/singleQuote";
import { connectDatabase } from "@/Mongodb";
import Quote from "@/Mongodb/Models/quote";

export default function DeliveryCheckout(props) {
  return (
    <>
      <Head>
        <title>CountryMovers Moving Service </title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <SingleQuote id={props.id} />
    </>
  );
}

export async function getStaticPaths() {
  await connectDatabase();
  const quotes = await Quote.find({}, { _id: 1 });

  return {
    fallback: "blocking",
    paths: quotes.map((s) => ({
      params: { quoteId: s._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const quoteId = context.params.qouteId;
  return {
    props: {
      id: quoteId || "",
      revalidate: 1,
    },
  };
}
