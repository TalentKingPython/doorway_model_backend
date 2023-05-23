const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require("fs");

exports.sendEmail = (req, res) => {
  const pdf = fs.readFileSync("./output/output.pdf");
  let admin_email = 'prettywebdev0105@gmail.com';
  let email = admin_email;
  if(req.body.email) email=req.body.email;
  console.log(email);
  const msg_client = {
    from: 'jewelrystoremaster0105@protonmail.com',
    personalizations: [
      {
        to: [
          {
            email: (email.includes('@') && email.includes('.')) ? email : admin_email,
          },
        ],
        dynamic_template_data: {
          subject: 'Welcome to Vanharte!',
          title: 'Welcome\nto Vanharte!',
          content: 'Dear ' + req.body.firstname + '! Thanks to order our products!\n\n This is your order list.'
        }
      }
    ],
    template_id: 'd-0df1f6a9fa954d85974ec5dd622333ad',
    attachments: [
      {
        content: pdf.toString('base64'),
        filename: 'file.pdf',
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };

  const msg_admin = {
    from: 'jewelrystoremaster0105@protonmail.com',
    personalizations: [
      {
        to: [
          {
            email: admin_email,
          },
        ],
        dynamic_template_data: {
          subject: 'A New Order!',
          title: 'A New Order!',
          content: 'This is a new order from customer ' + req.body.lastname + '!'
        }
      }
    ],
    template_id: 'd-0df1f6a9fa954d85974ec5dd622333ad',
    attachments: [
      {
        content: pdf.toString('base64'),
        filename: 'file.pdf',
        type: 'application/pdf',
        disposition: 'attachment'
      }
    ]
  };

  sgMail.send(msg_client)
    .then((result) => {
      if (result[0].statusCode == 202) {
        sgMail.send(msg_admin)
          .then((result) => {
            console.log('Client Email sent', result);
            res.status(200).send({
              message1: "Emails are sent successfully",
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send({ error: error });
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: error });
    });
};
