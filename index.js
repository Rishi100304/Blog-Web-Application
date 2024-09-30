import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let posts = [];
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res) => {
    res.render('index.ejs');
});
app.get("/post", (req,res) => {
    res.render("blogList.ejs",{ posts: posts });
});
app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});
app.get("/about", (req,res) => {
    res.render("about.ejs");
});

app.post("/post", (req, res) => {
  const newPostTitle = req.body.postTitle;
  const newPostContent = req.body.postContent;
  posts.push({
    id : generateID(),
    title : newPostTitle,
    content : newPostContent
  });
  console.log(posts);
  res.render("blogList.ejs", {posts : posts});
});
function generateID() {
  return Math.floor(Math.random() * 10000);
}

app.get("/blogDetails/:id", (req,res) => {
  const postId = req.params.id;
  const postDetails = posts.find((post) => post.id === parseInt(postId));
  res.render("Details.ejs", {
    blogDetails : postDetails,
  });
});
app.get("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const postDetails = posts.find((post) => post.id === parseInt(postId));
  res.render("index.ejs", {
    isEdit: true,
    blogDetails: postDetails,
  });
});
app.post("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const editBlog = posts.findIndex((blog) => blog.id === parseInt(blogId));
  if (editBlog === -1) {
    res.send("<h1> Something went wrong </h1>");
  }
  const updatedTitle = req.body.postTitle;
  const updatedDescription = req.body.postContent;

  const blogTitle = (posts[editBlog].title = updatedTitle);
  const blogDescription = (posts[editBlog].content = updatedDescription);
  [...posts, { blogTitle: blogTitle, blogDescription: blogDescription }];

  res.render("blogList.ejs", {
    isEdit: true,
    posts: posts,
  });
});
app.post('/delete/:id', (req, res) =>{
  const blogId = req.params.id;
  posts = posts.filter((blog) => blog.id !== parseInt(blogId));
  res.send(
    '<script>alert("Blog deleted successfully"); window.location="/";</script>'
  );
  res.redirect("/");
});
app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});