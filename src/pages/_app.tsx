 import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>Knowledge Link</title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={Store}>
            <QueryClientProvider client={queryClient}>
              {/* For hydration */}
                {getLayout(<Component {...pageProps} />)}
                <Snackbar />
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}

export default MyApp;