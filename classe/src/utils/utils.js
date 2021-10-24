const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1be1039a06ea5e",
        pass: "841d4ccdd06be9"
    },
});

transporter.use('compile', handlebars({
    viewEngine: {
        extname: '.handlebars',
        defaultLayout: false
    },
    viewPath: './views/'
}));

module.exports = transporter;