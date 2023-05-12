const db = require("../models");

User = db.user;
Door = db.door

// Get All Datas
exports.findAllUsers = (req, res) => {
  User.findAll({
  }).then(result => {
    res.status(200).send(result);
  });
};

//Get User Onebyone
exports.findOneUser = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.status(200).send(result)
  })
}

// Create New User
exports.createUser = (req, res) => {
  // Save User to Userbase
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    companyname: req.body.companyname,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    // state: 'To Do',
    state: req.body.state,
    doorway_model: req.body.doorway_model,
    doorHandleType:req.body.doorHandleType,
    glassType:req.body.glassType,
    height: req.body.height,
    width: req.body.width
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
};

// Update User
exports.updateUser = (req, res) => {
  User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      companyname: req.body.companyname,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      doorway_model: req.body.doorway_model,
      doorHandleType:req.body.doorHandleType,
      glassType:req.body.glassType,
      height: req.body.height,
      width: req.body.width
    }, {
    where: {
      id: req.params.id
    },
  }).then(result => {
    res.status(200).send(result);
  });
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const postDelete = await User.destroy({ where: { id: req.params.id } });
    res.json(postDelete)
  } catch (error) {
    console.log(error)
  }
};
