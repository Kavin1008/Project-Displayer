import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { HouseSimple } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Login from "../../pages/Login";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/upload")
  };
  const handleInfoClick = () => {
    navigate("/info");
  };

  return (
    <div>
      <Stack
        height={"5vh"}
        bgcolor={"black"}
        position={"fixed"}
        zIndex={100}
        bottom={"3vh"}
        borderRadius={"50px"}
        left={"45vw"}
        sx={{
          backgroundColor: "rgba(152, 152, 150, 0.8)",
          color: "white",
          backdropFilter: "blur(3px)",
        }}
        direction={"row"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={1}
      >
        <Box width={"auto"} height={"auto"}>
          <IconButton
            onClick={handleLogoClick}
            disableRipple
            disableFocusRipple
          >
            <HouseSimple weight="bold" />
          </IconButton>
        </Box>
        <Box>
          <IconButton
            onClick={handleUploadClick}
            sx={{
              color: "rgba(100,100,100,1)",
              "&:hover": { color: "black", cursor: "pointer" },
              transition: "all 0.2s ease",
            }}
            disableRipple
            disableFocusRipple
          >
            <Typography>Upload</Typography>
          </IconButton>
        </Box>

        <Box>
          <IconButton
            onClick={handleInfoClick}
            sx={{
              color: "rgba(100,100,100,1)",
              "&:hover": { color: "black", cursor: "pointer" },
              transition: "all 0.2s ease",
            }}
            disableRipple
            disableFocusRipple
          >
            <Typography>Info</Typography>
          </IconButton>
        </Box>
        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      </Stack>
    </div>
  );
};

export default Navbar;
