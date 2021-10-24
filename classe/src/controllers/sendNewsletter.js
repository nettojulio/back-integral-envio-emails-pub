const knex = require('../connections/connections');
const nodemailer = require('../utils/utils');

async function send(req, res) {
    const { text } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) return res.status(404).json("Please insert a valid text for submit and send.");

    try {
        const subscriptions = await knex('subscribers');

        for (const unit of subscriptions) {
            await nodemailer.sendMail({
                from: 'Cubos Academy Newsletter <newsletter@cubos.academy>',
                to: unit.email,
                subject: "Newsletter from Cubos Academy",
                template: 'newsletter',
                context: {
                    nome: unit.name,
                    text
                }
            });
        }

        return res.status(203).json("Send for your subscribers!");
    } catch (error) {
        return res.status(500).json(`Not Sended - ${error.message}`);
    }
}

module.exports = { send };