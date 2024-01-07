import { Box, SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: SxProps<Theme>; // Add this line to include styles as a prop
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  const styles = {
    p: 3,
    ...sx
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={(sx as any) || { p: 3 }}> {/* Use the provided styles if available */}
          {children}
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
