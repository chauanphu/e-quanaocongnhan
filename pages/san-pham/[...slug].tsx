
import { GetServerSideProps } from 'next';
import Head from 'next/head';
// import { ShopData } from '../types/shop';

// type ShopProps = {
//   shopData: ShopData;
// };

export default function Shop() {
  return (
    <>
      <Head>
        <title>Shop | E-Commerce Site</title>
        <meta name="description" content="Shop for the latest products on our e-commerce site." />
        <link rel="canonical" href="https://example.com/shop" />
      </Head>
      <h1>Shop</h1>
      {/* Render the e-commerce shop page with the fetched data */}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps<ShopProps> = async () => {
//   // Fetch the necessary data for the shop page from the server
//   const shopData = await fetch('https://example.com/api/shop').then((res) => res.json());

//   return {
//     props: {
//       shopData,
//     },
//   };
// };
