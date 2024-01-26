import Head from "next/head";
import Register from "@/Components/Auth/register";

export default function RegisterForm() {
  return (
    <>
      <Head>
        <title>CountryMovers Register</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="google-adsense-account" content="ca-pub-5633953924102583" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register />
    </>
  );
}
