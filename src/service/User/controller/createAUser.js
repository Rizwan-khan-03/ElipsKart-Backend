const {UserModal} = require("../models/index");
const CryptoJS = require("crypto-js");
const logger = require("../../../utils/logger");
module.exports = async (req, res) => {
	try {
		const {email, username, password,isAdmin} =req.body;

		let user = {
			email,
			username,
			password,
			isAdmin
		};
		user.password =CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString();
		const sameUserExist = await UserModal.exists({email,username});
		if (sameUserExist) throw Error(`User with email (${email,username}) already exist.`);

		const newUser = await new UserModal(user).save();

		// newUser.password = undefined;
		logger.info(`newUser on ${newUser}...`);
		res.status(200).send({
			success: true,
			user: newUser,
			message: "Registered successfully",
		});
	} catch (error) {
		res.status(400).send({
			success: false,
			error: error.toString(),
		});
	}
};
