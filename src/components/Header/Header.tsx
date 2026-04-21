import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        px: 2,
      }}
    >
      <Typography variant="h6">Incident Monitoring</Typography>
    </Box>
  );
};

export default Header;