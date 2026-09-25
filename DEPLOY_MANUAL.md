# Instalação e publicação manual

Node.js >=22.13, pnpm 11.25.0. Runtime Cloudflare Workers com banco D1. Não é apenas HTML estático.

```bash
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
node scripts/configure-demo-auth.mjs
pnpm exec tsc --noEmit
node scripts/test-operational.mjs
pnpm build
```

O assistente gera credenciais locais. Não publique `.env.local` nem `.dev.vars`.

## Banco e publicação na sua conta

Crie D1 uma única vez:

```bash
pnpm exec wrangler login
pnpm exec wrangler d1 create dashboard-gerencial
```

Substitua SEU_DATABASE_ID pelo ID retornado. Após cada build:

```bash
node scripts/configure-cloudflare-d1.mjs SEU_DATABASE_ID dashboard-gerencial
pnpm exec wrangler d1 migrations apply dashboard-gerencial --remote --config dist/server/wrangler.json
pnpm exec wrangler deploy --config dist/server/wrangler.json --name dashboard-gerencial
pnpm exec wrangler secret bulk .dev.vars --config dist/server/wrangler.json --name dashboard-gerencial
```

Até os segredos serem configurados, o login permanece indisponível. Segredos: DEMO_USERNAME, DEMO_SALT, DEMO_PASSWORD_HASH, SESSION_SECRET. Preserve binding DB. Não recrie o banco nem edite migrações já aplicadas.

## Build local com banco

```bash
pnpm exec wrangler d1 migrations apply DB --local --config dist/server/wrangler.json --persist-to .wrangler/state
pnpm start
```

Caso o Wrangler exija o nome, use dashboard-gerencial após a configuração acima. `pnpm dev` possui banco local próprio; confira as mensagens e a configuração de desenvolvimento.

## Pacote e outros provedores

O ZIP inclui código e `dist/`, mas não banco de produção, credenciais ou dependências instaladas. GitHub Pages sozinho não executa o login. Outros runtimes exigem adaptação do servidor e persistência D1.

O seletor Gestão Comercial/Diretoria apenas simula permissões. Antes de usar dados reais, implemente perfis no servidor, sem permitir ao usuário promover seu próprio acesso.
