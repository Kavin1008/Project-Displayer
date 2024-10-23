import React, { useContext, useEffect, useState } from "react";
import { Box, Icon, Stack, Typography } from "@mui/material";
import { allowedtags } from "../../data/Data";
import { Airplane } from "phosphor-react";
import StateContext from "../../provider/StateProvider";

const TagsElement = () => {
  const [tags, setTags] = useState([]);
  const { setState } = useContext(StateContext);

  useEffect(() => {
    setTags(allowedtags);
  }, []);

  const handleClick = (props) => {
    setState(props);
  };

  return (
    <div style={{backgroundColor:"white"}}>
      <Stack
        direction={"row"}
        height={"6vh"}
        width={"100vw"}
        bgcolor={"white"}
        spacing={1}
        p={1}
        alignItems={"center"}
        overflow={"scroll"}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        justifyContent={"space-evenly"}
      >
        <Box
          width={"auto"}
          height={"5vh"}
          display={"flex"}
          borderRadius={"3px"}
          px={2}
          sx={{
            backgroundColor: "gray",
            color: "white",
            "&:hover": {
              color: "black",
              cursor: "pointer",
              backgroundColor: "lightgray",
            },
            transition: "all 0.2s ease",
          }}
          onClick={() => handleClick("All")}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            spacing={1}
            
          >
            <Icon sx={{ height: "30px" }}>
              <Airplane />
            </Icon>
            <Typography variant="body2" noWrap>
              All
            </Typography>
          </Stack>
        </Box>

        <Stack
          direction={"row"}
          height={"5vh"}
          width={"90.5vw"}
          bgcolor={"white"}
          borderLeft={"1px solid lightgrey"}
          spacing={1}
          p={1}
          alignItems={"center"}
          overflow={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {tags.map((tag, index) => (
            <Box
              key={index}
              width={"auto"}
              height={"4vh"}
              display={"flex"}
              borderRadius={"14px"}
              px={2}
              sx={{
                backgroundColor: "whitesmoke",
                color: "gray",
                "&:hover": {
                  color: "black",
                  cursor: "pointer",
                  backgroundColor: "lightgray",
                },
                transition: "all 0.2s ease",
              }}
              onClick={() => handleClick(tag.name)}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                spacing={1}
              >
                <Icon sx={{ height: "30px" }}>{tag.icon}</Icon>
                <Typography variant="body2" noWrap>
                  {tag.name}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default TagsElement;
