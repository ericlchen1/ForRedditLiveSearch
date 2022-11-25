import "./App.css";
import { Typography } from "@mui/material";
import * as React from "react";
import PostAccordian from "./components/PostAccordian";
import { Container } from "@mui/system";
import axios from "axios";
import ndjsonStream from "can-ndjson-stream";

const samplePosts = [
  {
    author: "SpeedyPlatypus",
    country: "USA",
    created_utc: 1669169306.0,
    selftext:
      "Timestamp: [https://imgur.com/a/SETCk7m](https://imgur.com/a/SETCk7m)\n\nBrand New Pixel 7 (Unlocked, 128GB, Obsidian)\n\nAsking for **$400 shipped** or **$390 local** in NYC\n\nPlease pm, not chat requests",
    state: "NY",
    title:
      "[USA-NY] [H] Google Pixel 7 (New, Unlocked, 128GB, Obsidian) [W] Local cash, PayPal",
    url: "https://www.reddit.com/r/hardwareswap/comments/z2ccmi/usany_h_google_pixel_7_new_unlocked_128gb/",
  },
  {
    author: "SpeedyPlatypus",
    country: "USA",
    created_utc: 1669169306.0,
    selftext:
      "Timestamp: [https://imgur.com/a/SETCk7m](https://imgur.com/a/SETCk7m)\n\nBrand New Pixel 7 (Unlocked, 128GB, Obsidian)\n\nAsking for **$400 shipped** or **$390 local** in NYC\n\nPlease pm, not chat requests",
    state: "NY",
    title:
      "[USA-NY] [H] Google Pixel 7 (New, Unlocked, 128GB, Obsidian) [W] Local cash, PayPal",
    url: "https://www.reddit.com/r/hardwareswap/comments/z2ccmi/usany_h_google_pixel_7_new_unlocked_128gb/",
  },
];

const BACKEND_URL = "http://localhost:5000";

function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      var temp = [];
      const response = await fetch(`${BACKEND_URL}/all_posts_stream`);
      const exampleReader = ndjsonStream(response.body).getReader();

      let result;
      while (!result || !result.done) {
        result = await exampleReader.read();
        if (result.value !== undefined) {
          temp.push(result.value);
        }
      }
      setPosts(temp);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Typography variant="h2" gutterBottom style={{ color: "#FF5700" }}>
            r/hardwareswap
          </Typography>
          {posts.map((post) => (
            <PostAccordian postDetail={post} key={post.title}></PostAccordian>
          ))}
        </Container>
      </header>
    </div>
  );
}

export default App;
