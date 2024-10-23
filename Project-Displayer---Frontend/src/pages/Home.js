import React from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "../components/home/Navbar";
import GridElement from "../components/home/GridElement";
import TagsElement from "../components/home/TagsElement";
import { StateProvider } from "../provider/StateProvider";
import Head from "../components/home/Head";

const Home = () => {
  return (
    <>
      <Box position={"relative"} maxWidth={"100vw"} overflow={"hidden"}>
        <Stack
          height={"54vh"}
          width={"100vw"}
          borderBottom={"1px solid lightgrey"}
        >
          <Head />
        </Stack>
        <StateProvider>
          <TagsElement />
          <GridElement />
        </StateProvider>
        <Navbar />
      </Box>
    </>
  );
};

export default Home;
