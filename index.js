import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const indexPath = path.join(__dirname,'views/index.ejs');

let posts = [];
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", (req,res) => {
    res.render(indexPath);
});
app.get("/post", (req,res) => {
    res.render(path.join(__dirname,"views/blogList.ejs"),{ posts: posts });
});
app.get("/contact", (req,res) => {
    res.render(path.join(__dirname,"views/contact.ejs"));
});
app.get("/about", (req,res) => {
    res.render(path.join(__dirname,"views/about.ejs"), { photo : __dirname });
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
  res.render(path.join(__dirname,"views/blogList.ejs"), {posts : posts});
});
function generateID() {
  return Math.floor(Math.random() * 10000);
}

app.get("/blogDetails/:id", (req,res) => {
  const postId = req.params.id;
  const postDetails = posts.find((post) => post.id === parseInt(postId));
  res.render(path.join(__dirname,"views/Details.ejs"), {
    blogDetails : postDetails,
  });
});
app.get("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const postDetails = posts.find((post) => post.id === parseInt(postId));
  res.render(path.join(__dirname,"views/index.ejs"), {
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

  res.render(path.join(__dirname,"views/blogList.ejs"), {
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