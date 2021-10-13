const stripe = require("stripe")(process.env.SECRET_KEY)
const uuid = require("uuid/v4")

exports.makepayment = (req,res) => {

  const {token, totalamount} = req.body
  const idempotencyKey = uuid();

  return stripe.customers.create({
    email: token.email,
    source: token.id
  })
  .then(customer => {
    stripe.charges.create({
      amount: totalamount*100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: "TouchSafe Solutions Inc.",
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip         
        }
      }
    }
    ,
    {
      idempotencyKey
    })
    .then(result => res.status(200).json(result))
    .catch(console.log(err))
  })
  .catch(
  console.log("DATABASE ACTION FAILED")
  );

};