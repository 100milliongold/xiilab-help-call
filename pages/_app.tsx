import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme, createEmotionCache } from "global";
import { authService } from "firebaseConfig";
import Router from "next/router";
import reducer from "reducers";
import { useDispatch } from "react-redux";
import { updateUser } from "reducers";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [init, setInit] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          updateUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          })
        );
      } else {
        if (Router.pathname !== "/login") {
          Router.push("/login");
        }
      }
      setInit(true);
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {!init && <div>Initializing.......</div>}
        {init && <Component {...pageProps} />}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default reducer.withRedux(MyApp);
