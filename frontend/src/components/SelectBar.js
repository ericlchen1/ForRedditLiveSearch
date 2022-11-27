import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
} from "@mui/material";
import React from "react";

const COUNTRY_OPTIONS = ["None", "USA"];
const STATE_OPTIONS = [
  "None",
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function SelectBar() {
  const [livesearch, setLivesearch] = React.useState(false);
  const [country, setCountry] = React.useState("None");
  const [state, useState] = React.useState("None");

  return (
    <Grid
      container
      spacing={2}
      style={{
        marginBottom: "0.5em",
      }}
    >
      <Grid item xs={4}>
        <FormControl fullWidth style={{ textAlign: "left" }}>
          <InputLabel id="select-country-label">Country</InputLabel>
          <Select
            labelId="select-country-label"
            label="Country"
            value={country}
          >
            {COUNTRY_OPTIONS.map((country) => (
              <MenuItem value={country} key={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth style={{ textAlign: "left" }}>
          <InputLabel id="select-state-label">State</InputLabel>
          <Select labelId="select-state-label" label="State" value={state}>
            {STATE_OPTIONS.map((state) => (
              <MenuItem value={state} key={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <ToggleButton
          style={{ width: "100%", height: "100%" }}
          selected={livesearch}
          onChange={() => {
            setLivesearch(!livesearch);
          }}
          value="livesearch"
          color="secondary"
        >
                  Livesearch
                  {livesearch ? <></>:<></>}
        </ToggleButton>
      </Grid>
    </Grid>
  );
}

export default SelectBar;
