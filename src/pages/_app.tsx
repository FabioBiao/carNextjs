import "../../styles/globals.scss";
import Header from "../components/header";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <div className="mainContainer">
          {/* h-screen */}
          <Header />
          <div className="flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
