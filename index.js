// Import dependencies
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const methodOverride = require("method-override");

// App and Server setup
const app = express();
const port = 8080;


// Serve static files
app.use(express.static(path.join(__dirname, "public")));
// Data store (in-memory array)
let posts = [
  {
    id: uuidv4(),
    username: "Sudharshan",
    context: "Captured the timeless beauty of the Taj Mahal — a true masterpiece of love and architecture.",
    url: "/images/image1.png"
  },
  {
    id: uuidv4(),
    username: "Rahul",
    context: "I got selected in skillcraft tech.",
    url: "/images/image2.png"
  },
  {
    id: uuidv4(),
    username: "Dasharath",
    context: "I love solving problems in leetcode.",
    url: "/images/image3.png"
  },
  {
    id: uuidv4(),
    username: "Vikram",
    context: "I love solving problems in leetcode.",
    url: "/images/image4.png"
  },
  {
    id: uuidv4(),
    username: "Venky",
    context: "I love solving problems in leetcode.",
    url: "/images/image5.png"
  },
  {
    id: uuidv4(),
    username: "Harsha",
    context: "I love solving problems in leetcode.",
    url: "/images/image4.png"
  }
];

// Multer setup for file uploads
const upload = multer({ dest: "public/uploads/" });

// ------------ MIDDLEWARE ---------------

// Parse application/x-www-form-urlencoded and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Method override for PATCH/DELETE forms
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("_method"));


// EJS templat engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ------------ ROUTES -------------------

// Root route: server check
app.get("/", (req, res) => {
  res.send("server working well!");
  res.render("index")
});

// LIST ALL posts page
app.get("/posts", (req, res) => {
  res.render("index", { posts: posts });
});

// New post form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// CREATE post (file upload or URL supported)
app.post("/posts", upload.single("imageFile"), (req, res) => {
  let { username, context, imageUrl } = req.body;
  let finalImageUrl = req.file
    ? "/uploads/" + req.file.filename
    : (imageUrl && imageUrl.trim() !== "" ? imageUrl.trim() : "/images/default.jpg");
  let newPost = {
    id: uuidv4(),
    username,
    context,
    url: finalImageUrl
  };
  posts.push(newPost);
  res.redirect("/posts");
});

// SHOW post by id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(p => p.id === id);
  if (foundPost) {
    res.render("view", { post: foundPost });
  } else {
    res.status(404).send("Post not found");
  }
});

// EDIT form for post
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let foundPost = posts.find(p => p.id === id);
  if (foundPost) {
    res.render("edit", { post: foundPost });
  } else {
    res.status(404).send("Post not found");
  }
});

// UPDATE a post: context, image URL or image file (leave image alone if neither provided)
app.patch("/posts/:id", upload.single("imageFile"), (req, res) => {
  let { id } = req.params;
  let { context, imageUrl } = req.body;
  let foundPost = posts.find(p => p.id === id);
  if (foundPost) {
    foundPost.context = context;
    if (req.file) {
      foundPost.url = "/uploads/" + req.file.filename;
    } else if (imageUrl && imageUrl.trim() !== "") {
      foundPost.url = imageUrl.trim();
    }
    res.redirect(`/posts/${id}`);
  } else {
    res.status(404).send("Post not found");
  }
});

// DELETE a post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1)[0];
    res.redirect("/posts");
  } else {
    res.status(404).send("Post not found");
  }
});

// ------------ SERVER STARTUP -----------
app.listen(port, () => {
  console.log(port + " listening..");
});
