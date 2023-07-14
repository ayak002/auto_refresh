import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import Slider from "@mui/material/Slider";

export const Autorefresh = (props) => {
  const [link, setLink] = useState('');
  const [delay, setDelay] = useState(15);


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const request = {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link,
        delay,
      })
    };
    console.log(link, delay);
    try {
      const response = await fetch('/', request);
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Container>
        <Box>
          <Box sx={{ mt: 9, mb: 2 }} component="form" onSubmit={handleSubmit}>
            <Typography sx={{ mb: 2 }} color="primary" component="h1" variant="h3">
              AutoRefresh
            </Typography>
            <label htmlFor="link">Link</label><p></p>
            <TextField size="small" value={link} onChange={(e) => setLink(e.target.value)} type="text" placeholder="Link" /><p></p>
            <Slider
              aria-label="Delay"
              defaultValue={15}
              getAriaValue={delay}
              valueLabelDisplay="auto"
              min={5}
              max={60}
              onChange={(e) => setDelay(e.target.value)}
            />
            <Button sx={{ mr: 3 }} variant="contained" type="submit">Submit</Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
