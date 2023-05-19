// const mailer = require('nodemailer');

// let transporter = mailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'prettywebdev0105@gmail.com',
//     pass: 'i@m@prettywebdeveloper'
//   }
// });

// let mailOptions = {
//   from: 'prettywebdev0105@gmail.com',
//   to: 'ssguardheaker@gmail.com',
//   subject: 'Sending PDF file using Node.js',
//   text: 'Please find attached the PDF file.',
//   // attachments: [
//   //     {
//   //         filename: 'example.pdf',
//   //         path: '/path/to/example.pdf'
//   //     }
//   // ]
// };

// exports.sendEmail = (req, res) => {
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'ssguardheaker@gmail.com',
  from: 'prettywebdev0105@gmail.com',
  subject: 'Sending PDF file using Node.js',
  text: 'Please find attached the PDF file.',
  // attachments: [
  //     {
  //         filename: 'example.pdf',
  //         path: '/path/to/example.pdf'
  //     }
  // ]
};

exports.sendEmail = (req, res) => {
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).send('Email sent');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
};