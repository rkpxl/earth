import { Box, Button, Card, CardContent, Grid, Typography, Divider } from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import NextLink from 'next/link'

interface IProps {
  count: number | string
  title: string
  icon: string
  nextPageRoute: string
}

const HomePageCard = ({ count, title, icon, nextPageRoute }: IProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Box
              sx={{
                background: 'transparent',
                height: 68,
                width: 68,
              }}
            >
              <img
                alt={title}
                src={icon}
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider
          sx={{
            borderColor: 'textSecondary',
            py: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <NextLink style={{ width: '100%' }} href={nextPageRoute}>
            <Button
              color="primary"
              endIcon={<ArrowRightIcon fontSize="small" />}
              size="small"
              variant="text"
              sx={{ mt: 1 }}
            >
              View all
            </Button>
          </NextLink>
        </Box>
      </CardContent>
    </Card>
  )
}
export default HomePageCard
