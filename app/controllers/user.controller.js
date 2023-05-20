const db = require("../models");
const PDFDocument = require('pdfkit');
const fs = require('fs');

User = db.user;

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
    purchaseList: req.body.purchaseList
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
      purchaseList: req.body.purchaseList
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

exports.generatePDF = (req, res) => {
  const doc = new PDFDocument({ size: 'A4', margins: { top: 70, left: 50, bottom: 50, right: 50 } });

  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
  // doc.pipe(res);
  doc.pipe(fs.createWriteStream('./output/output.pdf'));
  User.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((result) => {
      return result.dataValues;
    })
    .then((result) => {
      let purchaseList = JSON.parse(result.purchaseList);
      let customer_info = " Full Name: " + result.firstname + " " + result.lastname + "\n" +
        " Company Name: " + result.companyname + "\n" +
        " Phone Number: " + result.phone + "\n" +
        " Email: " + result.email + "\n" +
        " Address: " + result.address + "\n" +
        " City: " + result.city + "\n" +
        " Status: " + result.state;
      doc.fontSize(20).font('Courier-Bold').text("CUSTOMER INFO");
      doc.fontSize(12).font('Courier-Oblique').moveDown()
        .text(customer_info, { align: 'justify', lineGap: 5 }).moveDown();

      doc.fontSize(20).font('Courier-Bold').text("ORDER INFO").fontSize(10).moveDown();

      purchaseList.map((item, key) => {
        doc.fontSize(12).font('Courier-BoldOblique')
          .text("Order " + (key + 1), { lineGap: 5 });
        doc.fontSize(12).font('Courier')
          .text("Doorway Model: " + item.doorway_model, { indent: 15 }).moveUp()
          .text("Glass Type: " + item.glassType, { indent: 230 })
          .text("Handle Type:  " + item.doorHandleType, { indent: 15 }).moveUp()
          .text("Mechanism: " + item.mechanism, { indent: 230 })
          .text("Width:  " + item.width, { indent: 15 }).moveUp()
          .text("Height: " + item.height, { indent: 230 })
          .text("Color:  " + item.color, { indent: 15 }).moveDown();
      });

      doc.end();
    })
    .then(() => {
      res.status(200).send('Successfully created Document!');
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}