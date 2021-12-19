import "../../styles/globals.scss";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="mainContainer">
        {/* h-screen */}
        <Header />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
