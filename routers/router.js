const express = require("express")
const router = express.Router()
const post = require("../modals/post")

router.get("/posts",async(req,res)=>{
    const posts = await post.find()
    res.send(posts)
    
});
router.post("/posts", async(req,res)=>{
    const posts = new post({
		title: req.body.title,
		content: req.body.content,
	})
	await posts.save()
	res.send(posts)
})

router.put("/posts/:id", async (req, res) => {

    console.log(req.body);
    const article = await post.findOne({ _id: req.params.id })
    if (req.body.title) {
        article.title = req.body.title
    }
    
    if (req.body.content) {
        	article.content = req.body.content
		}
        console.log(article);

		await article.save()
		res.send(article)
	
		// res.status(404)
		// res.send({ error: "Post doesn't exist!" })
	
})
module.exports = router