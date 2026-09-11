// Gera config.js a partir de variáveis de ambiente antes do deploy.
// Rodado automaticamente pelo Vercel (ver vercel.json) via `npm run build`.
const fs = require("fs");
const path = require("path");

const whatsappNumber = process.env.WHATSAPP_NUMBER || "5511999999999";

const content = `// Arquivo gerado automaticamente por build.js — não edite à mão.
// Para alterar, defina a variável de ambiente WHATSAPP_NUMBER e rode "npm run build".
window.APP_CONFIG = {
  whatsappNumber: "${whatsappNumber}"
};
`;

fs.writeFileSync(path.join(__dirname, "config.js"), content);
console.log("config.js gerado (WHATSAPP_NUMBER=" + whatsappNumber + ")");
