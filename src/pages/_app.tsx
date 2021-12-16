import "../styles/style.scss";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "redux/ConfigureStore";
import { Fragment, useEffect } from "react";
import ReactGA from "react-ga";
import { HeaderBar } from "components/HeaderBar";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { NODE_ENV } from "configuration/constants";
import {
  CONVERSION_TRACKING_ID,
  GA_TRACKING_ID,
} from "constants/app-constants";
import { useRouter } from "next/router";
import Script from "next/script";
import { FooterBar } from "components/FooterBar";

export function reportWebVitals(metric) {
  metric.label === "web-vital" && console.log(metric);
}

export const initGoogleAnalytics = (options = {}) => {
  // @ts-ignore
  const isGAEnabled = true || NODE_ENV === "production";
  if (isGAEnabled) {
    console.log(`Init google analytics`);
    ReactGA.initialize(GA_TRACKING_ID);
  }

  return isGAEnabled;
};

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // REACTGA
      // Send pageview with a custom path
      ReactGA.send({ hitType: "pageview", page: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONVERSION_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9mxZ7IdcEup9vC5on0sXx-PpMnSo9Gwc&libraries=places"></script>
      <script type="text/javascript" src="./tawk.js"></script>
      {process.browser ? (
        <PersistGate loading={<div>loading...</div>} persistor={persistor}>
          <HeaderBar />
          <Header />
          <Component {...pageProps} />
          <Footer />
          <FooterBar />
        </PersistGate>
      ) : (
        <Fragment>
          <HeaderBar />
          <Header />
          <Component {...pageProps} />
          <Footer />
          <FooterBar />{" "}
        </Fragment>
      )}
    </Provider>
  );
}
