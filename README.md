# PetPilot MPP Landing

Landing page para validar una oportunidad de arbitraje en productos para mascotas, con un endpoint protegido por Machine Payments Protocol usando `mppx`, Tempo y USDC.e.

## Que incluye

- Landing estatica en `index.html`.
- Estilos responsivos en `styles.css`.
- Formulario simple en `app.js`.
- Servidor Express en `server.mjs`.
- Ruta MPP protegida: `GET /api/test`.
- Cobro por request: `$0.01`.
- Metodo de pago: Tempo con USDC.e.
- Documentacion del proceso en `documentacion/README.md`.

## Instalacion

```bash
npm install
```

## Configuracion

Crear variables de entorno tomando como base `.env.example`:

```bash
PORT=3000
MPP_SECRET_KEY=replace-with-a-long-random-secret
TEMPO_RECIPIENT_ADDRESS=0xYourTempoRecipientWallet
TEMPO_CURRENCY_ADDRESS=0x20C000000000000000000000b9537d11c60E8b50
```

`TEMPO_RECIPIENT_ADDRESS` debe ser tu wallet receptora en Tempo.

## Ejecutar

```bash
npm start
```

La landing queda disponible en:

```text
http://localhost:3000/
```

El endpoint MPP queda disponible en:

```text
http://localhost:3000/api/test
```

## Comprar con MPP

Desde la landing, el boton `Comprar con MPP` apunta a `/api/test`.

Desde CLI:

```bash
npm run test:mpp
```

Equivale a:

```bash
npx mppx http://localhost:3000/api/test --insecure --include
```

Sin pago, el servidor responde `402 Payment Required`. Con pago valido, devuelve el JSON protegido.

## Estructura

```text
.
├── app.js
├── articulos.md
├── documentacion/
│   └── README.md
├── index.html
├── landing-ppxl.html
├── package.json
├── README.md
├── requerimientos.md
├── server.mjs
└── styles.css
```

## Nota de verificacion

El endpoint fue verificado hasta el reto `402 Payment Required`. El test pagado con `mppx` no se completo en Windows porque el CLI reporto `Unsupported platform: win32`. Para probar el pago completo, usar WSL, Linux o macOS.
