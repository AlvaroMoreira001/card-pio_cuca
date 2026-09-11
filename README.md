# Cardápio Cuca

Protótipo de cardápio digital da **Cuca Espetinhos & Lanches**: o cliente monta o pedido e envia pelo WhatsApp. Site estático (HTML, CSS e JS puro, sem framework), otimizado para uso no celular.

## Rodando localmente

Não precisa de servidor nem de instalar dependências para visualizar:

1. Copie `config.example.js` para `config.js`.
2. Abra `index.html` no navegador (ou sirva a pasta com qualquer servidor estático).

## Configurando o número do WhatsApp

O número da loja **não fica hardcoded no código** — ele vem da variável de ambiente `WHATSAPP_NUMBER`:

- **Local:** copie `.env.example` para `.env`, ajuste o número e rode `npm run build` (gera `config.js`).
- **Vercel:** em Project Settings → Environment Variables, adicione `WHATSAPP_NUMBER` com o número real (formato `55DDDNUMERO`, ex: `5511987654321`). O build da Vercel gera `config.js` automaticamente a cada deploy.

`config.js` é gerado pelo build e está no `.gitignore` — o número real nunca é commitado no repositório.

## Deploy na Vercel

1. Suba este repositório para o GitHub.
2. Importe o projeto na Vercel (framework: "Other" — já detectado via `vercel.json`).
3. Configure a variável de ambiente `WHATSAPP_NUMBER`.
4. Deploy.

## Estrutura

```
index.html          página única do cardápio
styles.css           estilos (mobile-first)
script.js             lógica do cardápio, carrinho e link do WhatsApp
config.example.js  modelo do arquivo de config (config.js é gerado no build)
build.js               gera config.js a partir da env var WHATSAPP_NUMBER
vercel.json          comando de build para a Vercel
```

## Observação

Dados como endereço, horário e itens do cardápio estão em `script.js`/`index.html` como texto de exemplo — ajuste antes de usar em produção.
