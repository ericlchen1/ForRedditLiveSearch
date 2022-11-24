import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";

function PostAccordian({ postDetail }) {
  const [expand, setExpand] = React.useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            style={{ cursor: "pointer" }}
            onClick={() => toggleAcordion()}
          />
        }
      >
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {postDetail.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "left" }}>
                      <Typography>{postDetail.created_utc}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography>{postDetail.country}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{postDetail.state}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ display: "flex" }}>
              <IconButton
                aria-label="share"
                onClick={() => window.open(postDetail.url)}
              >
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%", textAlign: "left" }}>
          <Typography>{postDetail.author}</Typography>
          <Typography>{postDetail.selftext}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default PostAccordian;
