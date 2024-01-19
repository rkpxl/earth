import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Box, Button } from "@mui/material"

export const SidebarItemButton = (props : any) : JSX.Element => {
    const {handleClick, active, isAdmin, icon, title, open} = props
    return (
    <Button
      key={title}
      onClick={handleClick}
      startIcon={icon}
      disableRipple
      sx={{
        backgroundColor: active ? 'rgba(255,255,255, 0.08)' : undefined,
        borderRadius: 1,
        color: active ? 'primary.light' : 'neutral.300',
        fontWeight: active ? 'fontWeightBold' : undefined,
        justifyContent: 'flex-start',
        px: 3,
        textAlign: 'left',
        textTransform: 'none',
        width: '100%',
        '& .MuiButton-startIcon': {
          color: active ? 'primary.light' : 'neutral.400'
        },
        '&:hover': {
          backgroundColor: 'rgba(255,255,255, 0.08)' 
        }
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
        {title} {isAdmin && (open ? <ExpandMore /> : <ExpandLess />)}
      </Box>
  </Button>)
}