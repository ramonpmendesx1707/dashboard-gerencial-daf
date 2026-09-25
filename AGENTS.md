# Instruções para agentes de IA

Este projeto é o Dashboard Gerencial, desenvolvido por **Thomas A. Monteiro**. Preserve a autoria, a identidade visual independente, o comportamento dos 11 painéis, a base fictícia e as limitações descritas no `README.md`.

Antes de alterar qualquer coisa, leia `README.md`, `DEPLOY_MANUAL.md`, `DEPENDENCIAS.md`, `IMPLEMENTACAO_AJUSTES.md`, `PROMPT_PUBLICAR_GITHUB.md`, `package.json`, `pnpm-workspace.yaml` e `.gitignore`.

Use Node.js >=22.13 e pnpm 11.25.0. Instale com `pnpm install --frozen-lockfile`; preserve o lockfile. Execute `pnpm exec tsc --noEmit`, `node scripts/test-operational.mjs` e `pnpm build` antes de declarar a entrega verificada.

Não troque o runtime Vinext/Vite por um fluxo Next.js genérico. Não remova D1, migrações, scripts, `build/`, `vendor/` ou os mapas municipais. `dist/`, `node_modules/`, `.wrangler/`, `.sites-runtime/`, `.env.local`, `.dev.vars`, cookies, tokens, bancos locais e dados reais não devem ser versionados.

O seletor Gestão Comercial/Diretoria é uma simulação de experiência. Não o trate como autorização real. Para produção, a autorização deve existir no backend e ser aplicada às consultas e exportações.

Não introduza logos DAF/Barigui, Tendências, Pensando fora da caixa ou previsões removidas nesta versão. Não invente licença para o projeto, a marca, imagens, mapas ou dependências.
