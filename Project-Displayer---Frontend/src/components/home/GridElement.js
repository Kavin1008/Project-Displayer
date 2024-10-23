import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Eye } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StateContext from "../../provider/StateProvider";
import { BACKEND_URI } from "../../config/constants";

const GridElement = () => {
  const navigate = useNavigate();
  const { state } = useContext(StateContext);
  const handleClick = (card) => {
    navigate(`/website/${card.title}`, { state: { card } });
  };

  const [cards, setCards] = useState([]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URI}/api/v1/media/all`);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const filteredCards =
    state === "All"
      ? cards
      : cards.filter((card) => (card.type[0].split(',').includes(state) ? state : ""));
      
     console.log(filteredCards);

  return (
    <Stack width={"100vw"} overflow="hidden">
      <Grid
        container
        maxWidth={"100vw"}
        spacing={1.5}
        alignItems={"center"}
        ml={1}
      >
        {filteredCards.map((card, index) => (
          <Grid item key={index}>
            <Stack
              height={"30vh"}
              width={"360px"}
              bgcolor={"lightgrey"}
              sx={{
                position: "relative",
                "&:hover .hoverBox": {
                  display: "flex",
                  cursor: "pointer",
                },
                "&:hover .videoHover": {
                  filter: "brightness(70%) blur(1px)",
                  transition: "filter 0.3s ease",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box
                height={"100%"}
                width={"100%"}
                position="relative"
                className="videoHover"
                onClick={() => handleClick(card)}
              >
                {card.videos.map((video) => {
                  {console.log(video);
                  }
                  return (
                    <video
                      preload="auto"
                      height={"100%"}
                      width={"100%"}
                      style={{ objectFit: "cover" }}
                      autoPlay
                      loop
                      muted
                    >
                      <source src={`${BACKEND_URI}${video}`} />
                      Your browser Does Not support the video tag.
                    </video>
                  );
                })}
              </Box>
              <Stack
                direction={"row"}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 10,
                  background: "transparent",
                  transition: "display 0.5s ease",
                }}
                width={"90%"}
                height={"20%"}
                alignItems="center"
                pl={2}
                display={"none"}
                className="hoverBox"
                justifyContent={"space-between"}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(52, 52, 50, 0.5)",
                    color: "white",
                    backdropFilter: "blur(3px)",
                  }}
                  px={1.5}
                  py={0.2}
                  borderRadius="13px"
                >
                  <Typography>{card.title}</Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(52, 52, 50, 0.5)",
                    color: "white",
                    backdropFilter: "blur(3px)",
                  }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  width={"30px"}
                  height={"30px"}
                  borderRadius="50px"
                >
                  <Eye size={20} />
                </Box>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default GridElement;
