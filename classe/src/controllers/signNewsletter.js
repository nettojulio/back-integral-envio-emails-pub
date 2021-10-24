const knex = require('../connections/connections');
const nodemailer = require('../utils/utils');

async function sign(req, res) {
    const { name, email } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) return res.status(400).json("Name is required!");
    if (!email || typeof email !== "string" || !email.trim()) return res.status(400).json("Email is required!");
    if (!email.includes('@') || !email.includes('.') || email.length < 8) return res.status(400).json("Please insert a valid Email!");

    try {
        const newName = name.trim();
        const newEmail = email.trim();

        const validEmail = await knex('subscribers').where({ email: newEmail }).debug();

        if (validEmail.length !== 0) return res.status(400).json(`Please insert another Email. ${newEmail} already registered.`);

        const newSubscribe = await knex('subscribers').insert({ name: newName, email: newEmail });

        if (!newSubscribe) return res.status(503).json(`Sorry, the email ${newEmail} still unregistered. Please try again!`);

        nodemailer.sendMail({
            from: 'Cubos Academy Newsletter <no-reply@cubos.academy>',
            to: newEmail,
            subject: "Thanks for Subscribe",
            template: 'subscribe',
            context: {
                nome: newName,
                email: newEmail
            }
        });

        return res.status(201).json(`Thanks ${newName} for subscribe. Check your mailbox (${newEmail}) and read the best newsletter about technology.`);
    } catch (error) {
        return res.status(500).json(`Not Signed - ${error.message}`);
    }
}

module.exports = { sign };