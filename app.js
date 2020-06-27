//required 
express = require('express')
app = express()
morgan = require('morgan')
cors = require('cors')
nodemailer = require("nodemailer")
    //middleware call
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(function(req, res, next) {
    console.log('middleware from above')
    next()
})


app.post('/api/mail', function(req, res, next) {
    console.log(req.body)
    let transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: 'haria1824@gmail.com', // generated ethereal user
            pass: 'never123@' // generated ethereal password
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.from, // sender address
        to: 'dhakallaxman23@gmail.com', // list of receivers
        subject: `from blog and email ${req.body.email}`, // Subject line
        text: req.body.message // plaintext body

    };


    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("error")
            return next(error)
        }
        console.log('successful')
        res.status(200).json(info)
    });
})
app.use(function(err, req, res, next) {
    res.status(404).json(err)

})
app.listen(9000, function(err, done) {
    if (err) {
        console.log(err)
    } else {
        console.log('listening at port 9000')
    }
})