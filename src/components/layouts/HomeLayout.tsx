import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function HomeLayout() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}
