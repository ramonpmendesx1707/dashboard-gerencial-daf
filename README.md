# Dashboard Gerencial

Portal independente de acompanhamento comercial, com indicadores expansíveis, clientes, visitas, mapas municipais e relatórios. Dados comerciais inteiramente fictícios.

[Abrir demonstração](https://dashboard-gerencial.grupotodos.chatgpt.site)

Desenvolvido por **[Thomas A. Monteiro](mailto:thomasmonteiro@thomasmonteiro.com.br)**.

![Tela de entrada do Dashboard Gerencial](docs/assets/dashboard-login.png)

*Visão de entrada da plataforma: análise e inteligência comercial, autenticação e autoria de Thomas A. Monteiro.*

## Dois perfis demonstrativos

No canto superior direito, clique no avatar e escolha **Gestão Comercial** ou **Diretoria**.

| Recurso | Gestão Comercial | Diretoria |
| --- | --- | --- |
| Painéis, filtros, clientes e visitas | Sim | Sim |
| Listas e Excel | Sim | Sim |
| Mapa municipal | Sim | Sim |
| Leituras executivas ao final das páginas | Não | Sim |
| Leituras executivas no relatório unificado | Não | Sim |

O seletor simula permissões para apresentação. Não cria usuários reais, não altera a senha e não implementa isolamento de segurança entre contas. A aplicação continua usando uma conta demonstrativa autenticada no servidor. Para produção, atribua perfis no backend e aplique autorização nas consultas e exportações. A simulação inicia em Gestão Comercial e permanece durante a navegação; recarregar retorna ao perfil inicial.

Não foram reintroduzidos Tendências, Pensando fora da caixa ou previsões. As leituras da Diretoria são descritivas, respeitam os filtros e explicitam os limites da base fictícia.

## Funcionalidades

- 11 páginas: Funil de Vendas, Visão Geral, Filiais, Vendedores, Trações, Qualidade do CRM, Ações Gerenciais, Mercado, Clientes de mercado, Carteira de clientes e Território.
- Navegação horizontal no desktop. No celular, botão abre os menus; selecionar fecha o menu e carrega a página.
- Visão Geral, Filiais e Vendedores: indicadores abrem os clientes na própria página, com busca, exportação e detalhe. Filial ou vendedor pode ser selecionado para conferir seu universo.
- Funil com espaçamento compacto e valores à direita; sem gráfico de desfecho ou tempo em aberto.
- Trações mantém os dois gráficos aprovados: composição e participação por configuração.
- Qualidade CRM: um gráfico de completude e listas de telefone, e-mail e contato ausentes.
- Ações Gerenciais: número → lista → Excel. O gestor pode compartilhar o arquivo manualmente; não há envio automático por WhatsApp.
- Carteira: cliente abre cadastro e histórico com descrições de visitas, em painel lateral ou tela completa no celular. Não há página isolada de Visitas.
- Concentração de compras nos dez maiores clientes.
- Território: 694 municípios de PR + SC, com emplacamentos, visitas, carteira e ativos sem visita; tabela acessível e exportável.
- Filtros independentes de período, intervalos personalizados, filial, vendedor, segmento, tração, status e consolidação por matriz.
- Ajustes de mercado afetam somente emplacamentos, mantendo outras bases.
- Listas XLSX e relatório unificado em PDF, XLSX, PPTX e HTML.
- Login, perfil com e-mail opcional, alteração de senha, logoff no perfil e rodapé, tela cheia e ícones para atalhos PWA.

## Identidade e dados

A identidade visual é independente, sem logos DAF/Barigui ou fotografia institucional. DAF permanece apenas como fabricante nos dados comerciais.

A base é determinística: 864 estabelecimentos fictícios, com atividades de janeiro/2025 a setembro/2026. Não há integração com CRM ou emplacamentos reais. As descrições de visitas também são fictícias.

A carteira e a completude são a fotografia cadastral atual. Períodos filtram atividades. Na consolidação por matriz, um campo está disponível quando algum estabelecimento selecionado do grupo o possui. Clientes distintos não devem ser somados entre vendedores ou filiais, pois grupos podem ter vários responsáveis.

O mapa conta estabelecimentos, para localizar cada município. Dados fictícios estão distribuídos em 24 municípios; os demais aparecem sem registros. Isso não indica ausência real de mercado. Os demais painéis continuam respeitando a consolidação selecionada.

As alterações recentes do CRM original citadas pelo dono do processo não foram fornecidas. Esta entrega simplifica a tela conhecida; não alega reproduzir alterações externas ainda não recebidas.

## Instalação

Requisitos: **Node.js >=22.13**, **pnpm 11.25.0**, Cloudflare Workers e banco **D1** com binding **DB**.

```bash
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
node scripts/configure-demo-auth.mjs
pnpm dev
```

O assistente pede usuário e senha e cria `.env.local` e `.dev.vars`. Não publique esses arquivos. O endereço local aparece no terminal. Inicialize o D1 local conforme DEPLOY_MANUAL.md.

```bash
pnpm exec tsc --noEmit
node scripts/test-operational.mjs
pnpm build
```

`pnpm start` executa o build com Wrangler local. O projeto não é estático: uma hospedagem apenas HTML/PHP/Apache não executa este login sem adaptação.

## Hospedagem e GitHub

- **[DEPLOY_MANUAL.md](DEPLOY_MANUAL.md)**: banco, migrações, segredos e publicação na sua conta Cloudflare.
- **[DEPENDENCIAS.md](DEPENDENCIAS.md)**: todas as bibliotecas e versões declaradas.
- **[PROMPT_PUBLICAR_GITHUB.md](PROMPT_PUBLICAR_GITHUB.md)**: instrução pronta para outra IA publicar o repositório.
- **[IMPLEMENTACAO_AJUSTES.md](IMPLEMENTACAO_AJUSTES.md)**: mudanças e limites desta revisão.

O ZIP inclui código, `dist/`, scripts, migrações, assets e documentação. Não inclui senhas, banco exportado, dados reais, `node_modules` ou vínculo com o projeto hospedado. Defina credenciais próprias na nova hospedagem. Não envie arquivos de ambiente, `.wrangler`, caches ou cookies ao GitHub.

## Autenticação e limitações

O perfil é inicializado por DEMO_USERNAME, DEMO_SALT e DEMO_PASSWORD_HASH; SESSION_SECRET assina sessões. O bootstrap usa hash SHA-256 com salt. Senhas alteradas usam PBKDF2-SHA256 com 100 mil iterações. Sessões de oito horas, cookie HttpOnly, SameSite Strict e Secure em HTTPS. Trocar senha invalida sessões anteriores. Perfil e senha persistem em D1.

Não há recuperação de senha por e-mail, notificações periódicas ou gestão real de múltiplos usuários. “Esqueci minha senha” informa indisponibilidade. O limite de tentativas é por instância. Antes de produção com dados reais, implementar autorização real por perfil e revisar autenticação e operação.

PWA: manifesto e ícones permitem adicionar à tela inicial, sem modo offline. Atalhos antigos podem precisar de reinstalação para atualizar o ícone.

## Exportações

Excel rápido inclui todas as linhas da busca local, sem limitação pela paginação. Relatório unificado usa filtros globais e o perfil demonstrativo selecionado, incluindo gráficos aprovados, pendências, histórico de visitas e indicadores municipais. A busca de uma tabela não restringe o relatório completo. O mapa é representado por tabela. PPTX tem gráficos editáveis; XLSX inclui barras de dados.

## Arquivos principais

| Arquivo | Responsabilidade |
| --- | --- |
| `app/dashboard.tsx` | Navegação, filtros, gráficos e tabelas |
| `app/operational.tsx` | Indicadores expansíveis e histórico do cliente |
| `app/territory.tsx` | Mapa Leaflet |
| `app/profile-menu.tsx` | Perfil, senha e seletor demonstrativo |
| `lib/director-data.ts` | Leituras descritivas da Diretoria |
| `lib/mock-data.ts` | Base fictícia e agregações |
| `lib/operational-data.ts` | Universo dos indicadores e listas |
| `lib/territory-data.ts` | Agregação municipal |
| `lib/export-grid.ts` | Excel rápido |
| `lib/report-data.ts`, `lib/export-report.ts` | Relatórios conforme perfil |
| `lib/demo-auth.ts`, `lib/account-store.ts` | Sessões e D1 |
| `drizzle/` | Migrações |
| `tests/operational.test.mjs` | Conciliação de dados e perfis |

## Fontes e geografia

Malhas municipais IBGE, API v3, qualidade mínima para visualização web, baixadas em 24/09/2026. São 399 municípios PR e 295 SC. Não usar para delimitação legal ou medição de precisão.

- Documentação: https://servicodados.ibge.gov.br/api/docs/malhas?versao=3
- Malhas: `/api/v3/malhas/estados/{UF}?formato=application/vnd.geo+json&qualidade=minima&intrarregiao=municipio` (UF 41 e 42).
- Nomes: `/api/v1/localidades/estados/{UF}/municipios`.

Geometria oficial; dados comerciais fictícios. Ícone do portal: vetor geométrico original. Fontes Manrope e IBM Plex Sans carregadas por Google Fonts com fallback do sistema. Nenhuma chave de mapas, IA, e-mail ou R2 é necessária.

Nenhuma licença de código aberto foi definida pelo titular. Não invente uma licença ao publicar. Bibliotecas e geografia mantêm suas próprias condições de uso.

## Verificação

Checagem TypeScript, build, conciliação de indicadores/listas, filtros, perfis e geografia. Exportações testadas nos quatro formatos. A validação visual em Safari/iPhone permanece manual; esses testes de dados não substituem essa validação.
