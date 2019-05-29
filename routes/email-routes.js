var nodeMailer = require("nodeMailer");

module.exports = function (app) {

    app.post('/send-email', function (req, res) {
        console.log(req.body);
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ibetya.team@gmail.com',  
                pass: 'iBetyaProject2'
            }
        });
        let mailOptions = {
            from: '"iBetya" <ibetya.team@gmail.com>', // sender address
            to: req.body.to, // list of receivers
            subject: req.body.subject, // Subject line
            text: req.body.body, // plain text body
            html: `<p>${req.body.challenger} bets you ${req.body.amount} coins that:</p><p> ${req.body.terms}.</p>
            <p>${req.body.challenger}'s message: ${req.body.message}</p><p>Go to your iBetya page to respond. 
            Offer ends: ${req.body.expiration}</p>` // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('index');
        });
    });

}