// Importing necessary dependencies from Material-UI and Next.js
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Defining the Header component
const Header = ({ onClickHandle } : any) => {
  return (
    <div>
      <Toolbar>
        {/* Left side text */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontSize: "22px" }}>
          Departments
        </Typography>

        {/* Right side button */}
        <Button  
          color="primary"
          variant="contained"
          onClick={onClickHandle}
        >Create New Departments</Button>
      </Toolbar>
    </div>
  );
};

export default Header;
