import dotenvConfig from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())
app.use(
    cors({
        origin: '*',
    })
)
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER,
    },
})

app.post('/', async (req, res) => {
    const { name, email, phone } = req.body
    console.log('проверка', req.body)
    const mail = {
        from: 'zdorovye.turizm@bk.ru',
        to: 'malostalomne1@mail.ru',
        subject: 'Запись на консультацию с сайта zdorovyeiturizm.ru',
        text: `Имя: ${name} \nEmail: ${email} \nТелефон: ${phone}`,
    }
    try {
        const info = transporter.sendMail(mail)
        return res.status(200).json('Письмо успешно отправлено!')
    } catch (error) {
        return res.status(500).json({
            message: 'Ошибка при отправке письма',
            error: error.message,
        })
    }
})

app.listen(PORT, () => {
    console.log('Запущен сервер 3030')
})
