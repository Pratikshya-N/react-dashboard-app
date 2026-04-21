import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;