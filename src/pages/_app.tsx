import { Fragment } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../Utils/create-emotion-cache';
import { theme } from '../Theme';
import { Provider } from 'react-redux';
import Store from '../Store';
import Snackbar from '../Components/Common/Snackbar';

const clientSideEmotionCache = createEmotionCache();

const App = (props : any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page : any) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Knowledge Link
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={Store}>
            {getLayout(<Component {...pageProps} />)}
            <Snackbar />
          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
