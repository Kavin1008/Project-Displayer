import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
} from "@mui/material";
import { X } from "phosphor-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BACKEND_URI } from "../config/constants";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Full Stack",
  "Mern Stack",
  "Front-End",
  "Back-End",
  "Mobile-App",
  "Desktop-App",
  "Start-Up",
  "Artificial Intelligence",
  "Machine Learning",
  "Portfolio",
  "Saas",
  "Design",
  "Game Development",
  "IOT",
];

const UploadForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = React.useState([]);
  const [techStack, setTechStack] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");

  const { register } = useForm();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setType(typeof value === "string" ? value.split(",") : value);
    console.log(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("techStack", techStack);
    formdata.append("developers", developers);
    formdata.append("description", description);
    formdata.append("projectURL", projectURL);
    console.log(formdata);
    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
      .then((success) => {
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
    console.log(type);
    navigate(-1);
  };

  const handleClose = (e) => {
    e.preventDefault();
    window.location.reload();

    navigate(-1);
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();
            handleSubmit(e);
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
          },
        }}
      >
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle>Upload your project</DialogTitle>
          <IconButton>
            <X size={32} onClick={handleClose} />
          </IconButton>
        </Stack>

        <Stack
          height={"80vh"}
          width={"35vw"}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <Box
            height={"70vh"}
            width={"30vw"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            display={"flex"}
            flexDirection={"column"}
            gap={"15px"}
            borderRadius={"35px"}
            overflow={"scroll"}
            p={3}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              helperText="Example : Echo-Chat App"
              required
              sx={{ width: 450 }}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* type */}

            <FormControl sx={{ m: 1, width: 450 }} required>
              <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={type}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={type.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tech Stack"
              variant="outlined"
              helperText="Example : React JS,Node JS,Express JS,Mongo DB"
              required
              sx={{ width: 450 }}
              onChange={(e) => setTechStack(e.target.value.split(","))}
            />
            <TextField
              label="Developers Name"
              variant="outlined"
              helperText="Example : Raj S (73152113045), Raj Kumar E (73152113051)"
              required
              sx={{ width: 450 }}
              onChange={(e) => setDevelopers(e.target.value.split(","))}
            />

            <TextField
              label="Description"
              variant="outlined"
              helperText="Enter text up to 150 words"
              multiline
              required
              sx={{ width: 450 }}
              onChange={(e) => setDescription(e.target.value)}
              {...register("singleErrorInput", {
                required: "This is required.",
              })}
            />

            <TextField
              label="Project URL"
              variant="outlined"
              helperText="Reference URL"
              required
              sx={{ width: 450 }}
              onChange={(e) => setProjectURL(e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="videos">Upload Videos</label>
              <input
                type="file"
                name="videos"
                id="videos"
                multiple
                className="form-control"
                accept=".mp4, .mkv"
                onChange={(e) => {
                  setVideos(e.target.files);
                }}
              />
            </div>

            <DialogActions>
              <Button
                variant="contained"
                color={"inherit"}
                height={"30px"}
                type="submit"
              >
                <Typography variant="subtitle1">Upload</Typography>
              </Button>
            </DialogActions>
          </Box>
        </Stack>
      </Dialog>
    </React.Fragment>
  );
};

export default UploadForm;
