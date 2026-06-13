import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    const userMail = process.env.MAIL_USER;
    const passMail = process.env.MAIL_PASS;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Falta datos rqueridos para enviar notificacion" },
        { status: 400 },
      );
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: userMail,
        pass: passMail,
      },
    });
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro Exitoso</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #121212;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #e0e0e0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1e1e1e;
      border-radius: 16px;
      border: 1px solid rgba(255, 191, 0, 0.1);
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    .header {
      background-color: #1b1b1b;
      padding: 30px;
      text-align: center;
      border-bottom: 2px solid #ffbf00;
    }
    .content {
      padding: 40px 30px;
    }
    .welcome-text {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #ffbf00;
      font-weight: bold;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 20px 0;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #a0a0a0;
      margin: 0 0 20px 0;
    }
    .user-box {
      background-color: #161616;
      border-left: 4px solid #ffbf00;
      padding: 15px;
      margin-bottom: 30px;
      border-radius: 0 8px 8px 0;
    }
    .user-box div {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .user-box strong {
      color: #ffffff;
    }
    .link{
      text-decoration: none;
      color: #101010;
    }
    .btn-container {
      text-align: center;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      background-color: #e8c71f;
      color: #121212;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 13px;
      padding: 14px 30px;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #ffea00;
    }
    .footer {
      background-color: #161616;
      padding: 20px;
      text-align: center;
      font-size: 11px;
      color: #666666;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
  </style>
</head>
<body>

  <div class="email-container">
    <div class="header">
      <span style="font-weight: 900; color: #ffffff; font-size: 18px; letter-spacing: 2px;">
        PROD-DM<span style="color: #ffbf00;">·</span>SHOP
      </span>
    </div>

    <div class="content">
      <div class="welcome-text">Registro Confirmado</div>
      <h1>¡Te damos la bienvenida al Dashboard!</h1>
      
      <p>Hola <strong>${name}</strong>,</p>
      <p>Tu cuenta ha sido creada exitosamente dentro de la plataforma de control. A partir de este momento tienes acceso completo a todas las métricas de telemetría, manifiestos de carga y optimización de rutas en tiempo real.</p>
      
      <div class="user-box">
        <p class="text-white"><strong>Nombre de usuario:</strong> ${name}</p>
        <p class="text-white"><strong>Correo electrónico:</strong> ${email}</p>
        <div class="timestamp text-white text-sm mt-2">
          <p class="text-gray-500 text-xs mt-1">

            Fecha de registro: ${new Date().toLocaleString("es-ES", {
              timeZone: "America/Bogota",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
              </div>
              <button class="btn" style="margin: 20px auto; display: block;">
      <a class="link " href="https://user-manage-hu.vercel.app/">Ir al Dashboard</a>
    </button>
      </div>

      <p style="font-size: 13px; margin: 0;">Si no solicitaste este registro, puedes ignorar este correo de forma segura.</p>
    </div>

    <div class="footer">
      <p>
              &copy; 2026 <a href="https://www.dhb-tech.com/" target="_blank" rel="noopener noreferrer">DHB-TECH</a>.
              Solución digital para la gestión y registro de usuarios con acceso seguro al dashboard.
Todos los derechos reservados.
            </p>
    </div>
    
  </div>

</body>
</html>

             
        `;
    await transporter.sendMail({
      from: '"NuevaApp" <no-reply@nuevaapp.com>',
      to: email,
      subject: `Nuevo Usuario Registrado: ${email} `,
      html: htmlContent,
    });
    return NextResponse.json(
      { message: "Notificacion al admin enviada exitosamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error enviando notoficacion al admin", error);
    return NextResponse.json(
      { error: `Error al enviar notificacion ${error}` },
      { status: 500 },
    );
  }
}