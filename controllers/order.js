const { Order, FoodCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
      .populate("foods.food")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "NO order found in DB"
          });
        }
        req.order = order;
        next();
      });
  };

  exports.createOrder = (req, res) => {
    const order = new Order(req.body.order);
    order.save((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save your order in DB"
        });
      }
      res.json(order);
    });
  };
  

exports.getAllOrdersForRestaurant = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

    Order.find({rest:req.profile._id})
    .populate("rest", "_id merchantName username email")
    .sort([[sortBy, "desc"]])
    .exec((err, order) => {
       if(err){ 
        return res.status(400).json({
            error: "No orders found in the Database"
        });
    }
    res.json(order);
    })
};

exports.getAllOrdersAcceptedForRestaurant = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt";

  Order.find({rest:req.profile._id,status: "Accepted"})
  .populate("rest", "_id merchantName username email")
  .sort([[sortBy, "desc"]])
  .exec((err, order) => {
     if(err){ 
      return res.status(400).json({
          error: "No orders found in the Database"
      });
  }
  res.json(order);
  })
};



exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
    
};


exports.updateStatus = (req, res) => {
  const order = req.order;
  order.status = req.body.status;
  order.updated = req.body.updated;
  
  order.save((err, updatedOrder) => {
      if(err){
        console.log(err)
          return res.status(400).json({
              error: "Cannot update the Order"
          });
      }
      return res.json(updatedOrder);
  });
};

exports.updatePayStatus = (req, res) => {
  const order = req.order;
  order.paymentStatus = req.body.paymentStatus;
  order.updated = req.body.updated;

  order.save((err, updatedOrder) => {
      if(err){
          return res.status(400).json({
              error: "Cannot update the Order"
          });
      }
      return res.json(updatedOrder);
  });
};