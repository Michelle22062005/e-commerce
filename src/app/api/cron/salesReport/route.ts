import { NextRequest, NextResponse } from "next/server";
import { conectionDB } from "@/src/lib/database";
import { Sale } from "@/src/database/models/sales";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  if(process.env.NODE_ENV === "production"){
    const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  }
  try {
    await conectionDB();

    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const sales = await Sale.find({
      createdAt: { $gte: startMonth, $lte: endMonth },
    });

    const totalSales = sales.length;
    const totalAmount = sales.reduce((acc, sale) => acc + sale.total, 0);
    const month = now.toLocaleString("es-ES", {
      month: "long",
      year: "numeric",
    });

    const salesRows = sales
      .map(
        (sale) => `
         <tr>
        <td style="padding: 10px; border-bottom: 1px solid #f0d9cc; color: #6b4f3a; font-size: 13px;">
          ${new Date(sale.createdAt).toLocaleDateString("es-CO")}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #f0d9cc; color: #6b4f3a; font-size: 13px;">
          ${sale.items.length} producto(s)
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #f0d9cc; color: #b07850; font-size: 13px; font-weight: 600;">
          $${sale.total.toLocaleString("es-CO")}
        </td>
      </tr>
        `,
      )
      .join("");

    const htmlReporte = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="margin:0; padding:0; background:#fdf0e8; font-family:'Segoe UI',sans-serif;">
  <div style="max-width:600px; margin:40px auto; background:#fdf6f0; border-radius:20px; border:1px solid #f0d9cc; overflow:hidden;">
    
    <div style="background:#f7c5a0; padding:28px 30px; text-align:center; border-bottom:1px solid #f0d9cc;">
      <div style="font-size:20px; font-weight:900; color:#7a3e1e; letter-spacing:3px;">
        GLAM<span style="color:#c4a98a;">·</span>SHOP
      </div>
      <div style="font-size:11px; color:#b07850; letter-spacing:0.2em; margin-top:6px; text-transform:uppercase;">
        Reporte de ventas
      </div>
    </div>

    <div style="padding:36px;">
      <div style="display:inline-block; background:#f7c5a0; color:#7a3e1e; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:0.2em; padding:5px 14px; border-radius:20px; margin-bottom:16px;">
        📊 Reporte mensual
      </div>
      <h1 style="font-size:22px; font-weight:800; color:#6b4f3a; margin:0 0 8px;">
        Ventas de ${month}
      </h1>
      <p style="font-size:14px; color:#b07850; margin:0 0 24px;">
        Este es el resumen automático de ventas generado el ${now.toLocaleDateString("es-CO")}.
      </p>

      <!-- Resumen -->
      <div style="display:flex; gap:16px; margin-bottom:28px;">
        <div style="flex:1; background:#fff8f4; border-radius:12px; padding:16px; text-align:center; border:1px solid #f0d9cc;">
          <div style="font-size:28px; font-weight:800; color:#6b4f3a;">${totalSales}</div>
          <div style="font-size:12px; color:#c4a98a; margin-top:4px;">Ventas realizadas</div>
        </div>
        <div style="flex:1; background:#fff8f4; border-radius:12px; padding:16px; text-align:center; border:1px solid #f0d9cc;">
          <div style="font-size:28px; font-weight:800; color:#b07850;">$${totalAmount.toLocaleString("es-CO")}</div>
          <div style="font-size:12px; color:#c4a98a; margin-top:4px;">Monto total</div>
        </div>
      </div>

      <!-- Tabla -->
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:#f7c5a0;">
            <th style="padding:10px; text-align:left; font-size:12px; color:#7a3e1e;">Fecha</th>
            <th style="padding:10px; text-align:left; font-size:12px; color:#7a3e1e;">Productos</th>
            <th style="padding:10px; text-align:left; font-size:12px; color:#7a3e1e;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${
            salesRows.length > 0
              ? salesRows
              : `
            <tr>
              <td colspan="3" style="padding:20px; text-align:center; color:#c4a98a; font-size:13px;">
                No hay ventas registradas este mes.
              </td>
            </tr>
          `
          }
        </tbody>
      </table>
    </div>

    <div style="background:#fff8f4; padding:20px; text-align:center; font-size:11px; color:#c4a98a; border-top:1px solid #f0d9cc;">
      &copy; 2026 GlamShop — Reporte generado automáticamente.
    </div>
  </div>
</body>
</html>
    `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: '"GlamShop" <no-reply@glamshop.com>',
      to: process.env.MAIL_REPORT_TO, // ← correo destino del reporte
      subject: `📊 Reporte de ventas - ${month}`,
      html: htmlReporte,
    });
    return NextResponse.json({
      ok: true,
      message: `Reporte enviado. ${totalSales} ventas, total $${totalAmount.toLocaleString("es-CO")}`,
    });
  } catch (error) {
    console.error("[CRON reporte-ventas]", error);
    return NextResponse.json(
      { error: "Error generando reporte" },
      { status: 500 },
    );
  }
}
