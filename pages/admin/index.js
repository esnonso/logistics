import Head from "next/head";
import Dashboard from "@/Components/Admin";

export default function AdministratorDashboard() {
  return (
    <>
      <Head>
        <title>CountryMovers Dashboard</title>
        <meta
          name="moving and delivery company in Lagos, Nigeria"
          content="moving services, delivery services"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
