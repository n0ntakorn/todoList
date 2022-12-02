const express = require('express');
let router = express.Router();
//todomodel
 
let todoModel = require('../model/todoModel');

 //get the todolist
router.get('/',async (req,res) => {
    
    console.log('Get Request received');
    const posts = await todoModel.find()
	res.send(posts)    
});
router.post("/posts", async (req, res) => {
	const post = new todoModel({
		time: req.body.time,
		date: req.body.date,
        todo: req.body.todo,
	})
	await post.save()
	res.send(post)
})
//delete the todolist
router.delete("/posts/:id", async (req, res) => {
	try {
		await todoModel.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
//update the todolist
router.patch("/update/:id", async (req, res) => {
	try {
		const post = await todoModel.findOne({ _id: req.params.id })

		if (req.body.date) {
			post.date= req.body.date
		}

		if (req.body.time) {
			post.content = req.body.time
		}
		if (req.body.todo) {
			post.todo = req.body.todo
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
 
module.exports = router;