import nodemailer from 'nodemailer';

export default function sendEmail(nome: string, email: string, identity: string) {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'george.soares509@gmail.com',
      pass: 'maluco12'
    }
  });

  transporter.sendMail({
    from:'MrClean <george.soares509@gmail.com>',
    to: email,
    subject:`Confirmar Email - MrClean`,
    html:`<div><h1>Olá, vimos que você completou o cadastro no nosso Site</h1>
          <a href=http://10.0.0.112:3000/login?token=${identity}>Clique Aqui</a></div>`
  });
};
