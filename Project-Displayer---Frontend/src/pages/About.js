import React, { useEffect, useState } from "react";
import { Stack, Box, Button, Typography, Divider } from "@mui/material";
import { Card, CardCover } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";

const About = () => {
  const [cards, setCards] = useState([]);
  const [videos, setVideos] = useState([]);
  const [ts, setTs] = useState(["", ""]);
  const [developer, setDeveloper] = useState(["", ""]);
  const location = useLocation();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setCardData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (cardData) {
      setCards(cardData.card);
      setTs(cardData.card.techStack || []);
      setDeveloper(cardData.card.developers || []);
      setVideos(cardData.card.videos);
    }
  }, [cardData]);
  if (!cardData) {
    return <div>loading...</div>;
  } else {
    return (
      <Stack direction={"row"}>
        <Stack m={4} spacing={2}>
          <Box
            height={"563px"}
            width={"1000px"}
            sx={{ display: "flex", flexWrap: "wrap", p: 0, m: 0 }}
          >
            <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
              <CardCover>
                {videos.map((video) => {
                  return (
                    <video
                      preload="auto"
                      width="320"
                      height="240"
                      autoPlay
                      loop
                      muted
                    >
                      <source src={`${BACKEND_URI}${video}`} />
                      Your browser Does Not support the video tag.
                    </video>
                  );
                })}
              </CardCover>
            </Card>
          </Box>
          <Stack
            direction={"row"}
            height={"90px"}
            width={"1000px"}
            sx={{ borderRadius: "20px" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={4}
          >
            <h1>{cards.title}</h1>
          </Stack>
        </Stack>

        <Stack mt={1}>
          <Box width={"400px"} p={3}>
            <Stack spacing={3}>
              <Stack>
                <Typography variant="subtitle1">Type</Typography>
                <Typography variant="body2">{cards.type}</Typography>
              </Stack>

              <Divider />

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack width={"40%"}>
                  <Typography variant="subtitle1">Tech Stack</Typography>
                  {ts.map((tech, index) => (
                    <Typography variant="body2" key={index}>
                      {tech}
                    </Typography>
                  ))}
                </Stack>
                <Divider />
                <Stack width={"60%"}>
                  <Typography variant="subtitle1">Developers</Typography>
                  {developer.map((tech, index) => (
                    <Typography key={index} variant="body2">
                      {tech}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
              <Divider />
              <Stack>
                <Stack>
                  <Typography>Description</Typography>
                  <Typography variant="body2">{cards.description}</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack alignItems={"center"} display={"flex"}>
                <Box height={"20px"}>
                  <Button
                    variant="contained"
                    color={"inherit"}
                    height={"30px"}
                    href={cards.projectURL}
                  >
                    <Stack
                      height={"30px"}
                      direction={"row"}
                      alignItems={"center"}
                      display={"flex"}
                    >
                      <Typography variant="subtitle1">View</Typography>
                    </Stack>
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    );
  }
};

export default About;
