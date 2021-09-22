import { devices } from '../constants/devices.js'
import discountModel from '../model/discount.js'

//in the first level, we're gonna be checking if there's a discount code available for a specific product
export const checkDiscountOnProduct = async (req, res, next) => {

    // Get the Passed Queries From req Object
    const { productid, discountcode, price, userid } = req.query

    // Retrieving the result From Database based on the Product's id(name)
    const result = await discountModel.find({ productName: productid })

    // check if the result is not empty
    if (result.length !== 0) {
        // check if the provided discount code is equal to the actual discount code in database
        if (discountcode == result[0]?.discountCode) {
            return res.send(`congrats! you just got a ${result[0].discountPercentage}% discount on ${productid}`)
        } else {
            next()
        }
    } else {
        next()
    }
}

//in the second level, we're gonna be checking if there's a discount code available for a specific category
export const checkDiscountOnCategory = async (req, res, next) => {
    const { productid, discountcode, price, userid } = req.query
    try {
        // Retrieving the category of thew provided product
        const productCategory = devices.filter(device => device.model === productid)[0]?.category.toString()
        // Retrieving the result From Database based on the Product's Category 
        const result = await discountModel.find({ categoryName: productCategory })
        // check if the result is not empty
        if (result.length !== 0) {
            // check if the provided discount code is equal to the actual discount code in database
            if (discountcode == result[0]?.discountCode) {
                return res.send(`congrats! you just got a ${result[0].discountPercentage}% discount on ${productid}`)
            } else {
                next()
            }
        } else {
            next()
        }
    } catch (error) {
        console.error(error)
    }

}

//in the third level, we're gonna be checking if there's a discount code available for all of our products
export const checkForFullDiscount = async (req, res) => {
    const { productid, discountcode, price, userid } = req.query
    // check if the provided product is real and valid
    const product = devices.filter(device => device?.model === productid)[0]?.model.toString()
    if (!product) return res.send('sorry! either there is not a valid discount on this product or you are providing a wrong one!')
    // Retrieving the result From Database 
    const result = await discountModel.find({ fullDiscount: true })
    // check if the database's result is not empty
    if (result.length !== 0) {
        // Check if the the provided discount code is equal to the discount code in database
        if (discountcode == result[0]?.discountCode) {

            return res.send(`congrats! you just got a ${result[0].discountPercentage}% discount on ${productid}`)
        } else {
            return res.send('sorry! either there is not a valid discount on this product or you are providing a wrong one!')
        }
    } else {
        return res.send('sorry! either there is not a valid discount on this product or you are providing a wrong one!')
    }
}

