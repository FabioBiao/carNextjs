import "../../styles/globals.scss";
import Header from "../components/header";
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { SessionProvider } from "next-auth/react";

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', (url) => {
    console.log('route change start at ' + url);
    NProgress.start();
});

Router.events.on('routeChangeComplete', (url) => {
    console.log('route change complete at ' + url);
    NProgress.done();
});

Router.events.on('routeChangeError', (err, url) => {
    console.log('route change error at ' + url + '. ' + err);
    NProgress.done();
});

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
