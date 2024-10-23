import { Box, Stack } from "@mui/material";
import React from "react";
import './head.css'

const Head = () => {
  const items = Array.from({ length: 1596 }, (_, index) => index + 1); // Array of 100 numbers [1, 2, 3, ..., 100]

  return (
    <Stack height="100%" width="100%" p={0} m={0}>
      <Stack
        display="flex"
        flexDirection={"row"}
        flexWrap={"wrap"}
        width="100%"
        p={0}
        m={0}
        className="hoverContainer"
      >
        {items.map((item) => (
          <Box
            item
            width={20}
            height={20}
            key={item}
            bgcolor={"beige"}
            className="hoverBox"
          ></Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default Head;
