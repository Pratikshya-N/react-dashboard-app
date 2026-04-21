import { Box, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#1e293b",
        color: "#fff",
        p: 2,
      }}
    >
      <Typography variant="h6">Dashboard</Typography>
    </Box>
  );
};

export default Sidebar;