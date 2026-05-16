import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { Mppx, tempo } from "mppx/express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);

const recipient = process.env.TEMPO_RECIPIENT_ADDRESS;
const currency =
  process.env.TEMPO_CURRENCY_ADDRESS ||
  "0x20C000000000000000000000b9537d11c60E8b50";
const secretKey =
  process.env.MPP_SECRET_KEY || crypto.randomBytes(32).toString("base64");

if (!recipient) {
  console.error("Set TEMPO_RECIPIENT_ADDRESS to your Tempo recipient wallet.");
  process.exit(1);
}

if (!process.env.MPP_SECRET_KEY) {
  console.warn("MPP_SECRET_KEY is not set. Using an ephemeral local secret.");
}

const mppx = Mppx.create({
  secretKey,
  methods: [
    tempo.charge({
      currency,
      recipient,
    }),
  ],
});

app.use(express.static(__dirname));

app.get(
  "/api/test",
  mppx.charge({
    amount: "0.01",
    description: "PetPilot MPP test request",
  }),
  (req, res) => {
    res.json({
      ok: true,
      message: "Paid MPP request accepted.",
      route: "/api/test",
      amount: "0.01",
      currency: "USDC.e",
    });
  },
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`MPP test route: http://localhost:${port}/api/test`);
});
