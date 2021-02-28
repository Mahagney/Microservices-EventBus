const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log("dasda", posts);
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    console.log(posts);
    const post = posts[postId];
    post.comments.push({ id, content });
    console.log(posts, id);
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    console.log(posts, postId);

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
    console.log(comment);
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("App listen on 4002");
});
