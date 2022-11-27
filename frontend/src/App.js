import "./App.css";
import { Typography } from "@mui/material";
import * as React from "react";
import PostAccordian from "./components/PostAccordian";
import { Container } from "@mui/system";
import ndjsonStream from "can-ndjson-stream";
import SelectBar from "./components/SelectBar";

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
      <header
        style={{
          backgroundColor: "#282c34",
          paddingTop: "2em",
          paddingBottom: "0.5em",
          marginBottom: "1em",
        }}
      >
        <Typography variant="h2" gutterBottom style={{ color: "#FF5700" }}>
          r/hardwareswap
        </Typography>
      </header>
      <Container>
        <SelectBar />
        {posts.map((post) => (
          <PostAccordian
            postDetail={post}
            key={`${post.title}${post.created_utc}`}
          ></PostAccordian>
        ))}
      </Container>
    </div>
  );
}

export default App;
