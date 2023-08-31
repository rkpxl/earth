import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import PasswordChange from '../../Components/Settings/PasswordChange';
import { GetStaticPaths, GetStaticProps } from 'next';

const Page = () => (
  <>
    <Head>
      <title>
        Settings
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Settings
        </Typography>
        <Box sx={{ pt: 3 }}>
          <PasswordChange />
        </Box>
      </Container>
    </Box>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params } : any) => {
  return {
    props: {},
  };
}

export default Page;
