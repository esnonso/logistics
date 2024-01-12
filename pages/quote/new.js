import Head from "next/head";
import RequestAQuote from "@/Components/Quote";

export default function QuoteForm() {
  return (
    <>
      <Head>
        <title>Quote</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RequestAQuote />
    </>
  );
}
