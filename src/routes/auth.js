const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	try {
		const savedUser = await user.save();
        console.log(savedUser, user);
        const token = await user.generateToken()
		res.status(201).json({user, token});
	} catch (e) {
		res.status(500).json(e);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) return res.status(404).send({ error: "cannot find user" });

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if(!isMatch) res.status(404).send({ error: "password invalid" });
		const token = await user.generateToken()
		res.send({user, token})
		
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
