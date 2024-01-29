import Head from "next/head";
import RequestAQuote from "@/Components/Quote";

export default function QuoteForm() {
  return (
    <>
      <Head>
        <title>CountryMovers Home</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5633953924102583"
          crossorigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content="ca-pub-5633953924102583" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <RequestAQuote />
    </>
  );
}
