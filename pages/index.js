import Head from "next/head";
import HomeScreen from "@/features/home/screen";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <HomeScreen />
    </Layout>
  );
}
