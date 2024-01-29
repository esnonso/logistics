import Head from "next/head";
import UserProfile from "@/Components/Profile";

export default function User() {
  return (
    <>
      <Head>
        <title>CountryMovers Profile</title>
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
        <link rel="icon" href="/logo.ico" />
      </Head>
      <UserProfile />
    </>
  );
}
