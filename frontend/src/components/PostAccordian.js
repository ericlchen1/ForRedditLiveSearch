import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import ReactTimeAgo from "react-time-ago";
import MuiMarkdown from "mui-markdown";

function PostAccordian({ postDetail }) {
  const [expand, setExpand] = React.useState(false);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  return (
    <Accordion expanded={expand} style={{ marginBottom: "0.5em" }}>
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
              <Grid container>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {postDetail.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} style={{ textAlign: "left" }}>
                      <Typography>
                        <ReactTimeAgo
                          date={new Date(postDetail.created_utc * 1000)}
                          locale="en-US"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Chip
                        label={postDetail.country}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item>
                      <Chip
                        label={postDetail.state}
                        color="secondary"
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ display: "flex" }}>
              <IconButton
                aria-label="share"
                onClick={() => window.open(postDetail.url)}
                style={{ margin: "auto" }}
              >
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%", textAlign: "left" }}>
          <Typography>
            <strong>Author: </strong>
            {postDetail.author}
          </Typography>
          <Typography>
            <MuiMarkdown>{postDetail.selftext}</MuiMarkdown>
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default PostAccordian;
