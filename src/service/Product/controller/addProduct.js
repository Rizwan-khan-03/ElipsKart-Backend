const {ProductModal} = require("../models/index");
const logger = require("../../../utils/logger");
module.exports = async (req, res) => {
	try {
		const {title, desc, img,categories,size,color,price,product_code} =req.body;

		let product = {
			title,
			desc,
			img,
			categories,
			size,
			color,
			price,
			product_code
		};
		const sameUserExist = await ProductModal.exists({title,product_code});
		if (sameUserExist) throw Error(`Product with title(${title}) and product_code(${product_code}) already exist.`);

		const newProduct = await new ProductModal(product).save();

		// newProduct.password = undefined;
		logger.info(`newProduct on ${newProduct}...`);
		res.status(200).send({
			success: true,
			newProduct: newProduct,
			message: "Registered successfully",
		});
	} catch (error) {
		res.status(400).send({
			success: false,
			error: error.toString(),
		});
	}
};
