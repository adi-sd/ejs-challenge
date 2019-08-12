const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

//-----------------------------------------------------------------------

const port = 3000;
const app = express();

let posts = [];

//-----------------------------------------------------------------------

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//-----------------------------------------------------------------------

const homeStartingContent = "Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Quam quisque id diam vel quam elementum. Quis vel eros donec ac odio tempor orci dapibus ultrices. Urna neque viverra justo nec ultrices dui sapien eget mi. Eget felis eget nunc lobortis mattis aliquam faucibus purus in. Consequat semper viverra nam libero justo laoreet sit.";
const aboutContent = "Non sodales neque sodales ut etiam sit. Consequat semper viverra nam libero justo laoreet sit. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Blandit aliquam etiam erat velit.";
const contactContent = "Massa massa ultricies mi quis hendrerit dolor magna. Diam maecenas sed enim ut sem viverra. Proin gravida hendrerit lectus a. Nullam eget felis eget nunc lobortis mattis aliquam. Augue mauris augue neque gravida in fermentum. Velit egestas dui id ornare arcu odio ut sem nulla";

//-----------------------------------------------------------------------

app.get("/", (req, res) => {
    res.render("home", {
        homeStartingContent: homeStartingContent,
        posts: posts
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
    const post = {
        title: req.body.postTitle,
        body: req.body.postContent
    };
    posts.push(post);

    res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {

    const recivedName = _.lowerCase(req.params.postName);
    posts.forEach((post) => {
        const storedName = _.lowerCase(post.title);

        if (storedName === recivedName) {
            console.log("Match Found!");
            res.render("post",{
                post : post
            });
        }
    });
});

//-----------------------------------------------------------------------

app.listen(port, () => {
    console.log("Server Started on port: " + port);
})