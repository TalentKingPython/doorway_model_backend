const { CourierClient } = require("@trycourier/courier");
// const sgMail = require('@sendgrid/mail');
const fs = require("fs");

const courier = CourierClient({ authorizationToken: "pk_test_R8G7HKCWPPMR89K6EVYYMBCJK67B" });
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = (req, res) => {
  const pdf = fs.readFileSync("./output/output.pdf");

  courier.send({
    message: {
      to: [
        {
          data: {
            title: "Thanks for loving our products!",
            content: "Dear, " + req.body.name + "! This is your order list!",
          },
          email: req.body.email,
          attachments: [
            {
              type: "application/pdf",
              name: "order.pdf",
              content: pdf.toString("base64"),
            },
          ],
        },
        {
          data: {
            title: "A New Order!",
            content: "Hi, Admin! This is Client " + req.body.name + "'s order list!"
          },
          email: "prettywebdev0105@gmail.com",
          attachments: [
            {
              type: "application/pdf",
              name: "order.pdf",
              content: pdf.toString("base64"),
            },
          ],
        },
      ],
      content: {
        title: "{{title}}",
        body: "{{content}}",
      },
      routing: {
        method: "all",
        channels: ["email"],
      },
    },
  })
    .then((result) => {
      console.log('Email sent', result);
      res.status(200).send({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: error });
    });
};
