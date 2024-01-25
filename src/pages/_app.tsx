import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../Theme'
import { Provider } from 'react-redux'
import Store from '../Store'
import Snackbar from '../Components/Common/Snackbar'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import '../../styles/globals.css'
import HomeLayout from '../Scenes/Home/HomeLayout'
import axiosInstance from '../Utils/axiosUtil'
import GlobalLoading from '../Components/Common/GlobalLoading'

const queryClient = new QueryClient()

function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Knowledge Link</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={Store}>
          <QueryClientProvider client={queryClient}>
            <HomeLayout>
              <Component {...pageProps} />
            </HomeLayout>
            <Snackbar />
            <GlobalLoading />
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </AppCacheProvider>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context)
    if (response.status === 200) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  } catch (err) {
    console.error('error', err)
  }

  return {
    props: {
      isAuthenticated: false,
    },
  }
}

export default MyApp
