const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

//-----------------------------------------------------------------------

const port = 3000;
const app = express();

//-----------------------------------------------------------------------

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true}, (err) => {
    if(!err)
    {
        console.log("Successfully connected to mongodb server...");
    }
    else
    {
        console.log("Error in connecting mongodb",err);
    }
});

//-----------------------------------------------------------------------

const homeStartingContent = "Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Quam quisque id diam vel quam elementum. Quis vel eros donec ac odio tempor orci dapibus ultrices. Urna neque viverra justo nec ultrices dui sapien eget mi. Eget felis eget nunc lobortis mattis aliquam faucibus purus in. Consequat semper viverra nam libero justo laoreet sit.";
const aboutContent = "Non sodales neque sodales ut etiam sit. Consequat semper viverra nam libero justo laoreet sit. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Blandit aliquam etiam erat velit.";
const contactContent = "Massa massa ultricies mi quis hendrerit dolor magna. Diam maecenas sed enim ut sem viverra. Proin gravida hendrerit lectus a. Nullam eget felis eget nunc lobortis mattis aliquam. Augue mauris augue neque gravida in fermentum. Velit egestas dui id ornare arcu odio ut sem nulla";
//-----------------------------------------------------------------------

const postSchema = {
    title: String,
    body: String
};

const Post = mongoose.model("Post", postSchema);

//-----------------------------------------------------------------------

app.get("/", (req, res) => {
    
    Post.find({}, (err,posts) => {
        if(!err)
        {
            console.log("Successfully found all the posts...");
            res.render("home", {
                homeStartingContent: homeStartingContent,
                posts: posts
            });
        }
        else
        {
            console.log("Error in finding all documents...");
        }
    });

});

app.get("/about", (req, res) => {
    res.render("about", {
        aboutContent: aboutContent
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        contactContent: contactContent
    });
});

app.get("/compose", (req, res) => {
    res.render("compose", {});
});

app.post("/compose", (req, res) => {
   
    const post = new Post({
        title: _.lowerCase(req.body.postTitle),
        body: req.body.postContent
    });

    post.save((err) => {
        if(!err)
        {
            console.log("Successfully saved a post...Now redirecting!");
            res.redirect("/");
        }
        else
        {
            console.log("Error in saving post...");
        }
    });
    
});

app.get("/posts/:postId", (req, res) => {

    const recivedId = req.params.postId;

    Post.findOne({ _id: recivedId}, (err, foundPost) => {

        if(!err)
        {
            console.log("Found what it was looking for! " + foundPost._id)
            res.render("post", {
                post: foundPost
            });
        }
        else
        {
            console.log("Error in finding post for read more...Not found post with given name!");
        }

    });
});

//-----------------------------------------------------------------------

app.listen(port, () => {
    console.log("Server Started on port: " + port);
})