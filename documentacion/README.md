# Documentacion del proceso

## Objetivo

Construir una landing page para validar productos de mascotas y agregar un flujo de compra por request usando Machine Payments Protocol con `mppx`, Tempo y USDC.e.

## Fuentes de contenido

- `articulos.md`: base de productos, precios, ratings y picks recomendados.
- `landing-ppxl.html`: referencia de estructura comercial, ficha tecnica, contenido incluido, API de compra y disclaimer.
- `requerimientos.md`: archivo revisado; estaba vacio, asi que el requerimiento efectivo fue el prompt del usuario.
- Referencia MPP: `https://mpp.dev/quickstart/server.md`.

## Proceso realizado

1. Se creo una landing estatica con `index.html`, `styles.css` y `app.js`.
2. Se incorporaron secciones comerciales relevantes:
   - Hero con CTA.
   - Metricas de inversion, ROI y ciclo.
   - Ficha tecnica de compra.
   - Catalogo de SKUs.
   - Lote piloto recomendado.
   - Contenido incluido en la receta.
   - FAQ y disclaimer.
3. Se agrego un servidor Express en `server.mjs`.
4. Se integro `mppx/express` con el metodo `tempo.charge`.
5. Se creo la ruta protegida `GET /api/test`.
6. Se configuro el cobro de `$0.01` por request usando USDC.e en Tempo.
7. Se agrego en la landing un enlace visible `Comprar con MPP` que apunta a `/api/test`.
8. Se agregaron scripts npm para arrancar el servidor y probar el endpoint.

## Flujo MPP implementado

El usuario o agente solicita:

```bash
GET /api/test
```

Si no incluye pago, el servidor responde:

```http
402 Payment Required
WWW-Authenticate: Payment ...
```

Un cliente compatible con MPP procesa el reto, adjunta el pago y reintenta la request:

```bash
npx mppx http://localhost:3000/api/test --insecure --include
```

Con pago valido, el servidor devuelve JSON:

```json
{
  "ok": true,
  "message": "Paid MPP request accepted.",
  "route": "/api/test",
  "amount": "0.01",
  "currency": "USDC.e"
}
```

## Variables de entorno

Crear un archivo `.env` o configurar estas variables en el host:

```bash
PORT=3000
MPP_SECRET_KEY=replace-with-a-long-random-secret
TEMPO_RECIPIENT_ADDRESS=0xYourTempoRecipientWallet
TEMPO_CURRENCY_ADDRESS=0x20C000000000000000000000b9537d11c60E8b50
```

`TEMPO_RECIPIENT_ADDRESS` es obligatorio. Sin esa wallet el servidor no arranca.

## Verificacion realizada

- `npm install` completo correctamente.
- El servidor arranco con `node server.mjs`.
- `GET /api/test` sin pago respondio `402 Payment Required`, que es el comportamiento esperado.

El test pagado completo con `mppx` no pudo finalizar en Windows porque el CLI reporto `Unsupported platform: win32`. El proyecto queda listo para probar ese comando en WSL, Linux o macOS.
