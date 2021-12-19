import Head from "next/head";
import CarSearch from "../components/search";

export interface HomeProps {
  makes: [];
  models: [];
}

export default function Home({ makes, models }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="container m-12 mx-auto px-6 py-6 rounded shadow-lg xl:w-2/6 lg:w-2/6 md:w-3/6 sm:w-3/6">
          <CarSearch makes={makes} models={models} />
        </div>
        <div>main body</div>
      </main>

      {/* <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer> */}
    </div>
  );
}
