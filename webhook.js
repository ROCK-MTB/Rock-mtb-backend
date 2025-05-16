export default function (req, res) {
  console.log('Webhook recibido:', req.body);

  // Simulación: activar usuario premium si el pago fue aprobado
  if (req.body.action === 'payment.created' || req.body.action === 'payment.updated') {
    const payment = req.body.data;
    console.log('Procesar pago ID:', payment.id);
    // Aquí iría tu lógica para marcar al usuario como Premium en tu base de datos
  }

  res.sendStatus(200);
}
