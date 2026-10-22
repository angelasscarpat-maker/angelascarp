# Ateliê — Angela Scarpati Fotografia

Base de gestão com Next.js App Router, TypeScript, Tailwind CSS 4 e integração inicial de autenticação Supabase. Visual responsivo em tons neutros e verde suave.

## Executar

Requisitos: Node.js 22 LTS e npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abra **http://localhost:3000**. Sem variáveis Supabase, o dashboard abre diretamente em modo demonstrativo. A página `/login` também permite explorar a demonstração. Nenhuma conta ou chave é necessária. Com Supabase configurado, o acesso requer sessão ou entrada explícita em demonstração.

```sh
npm run typecheck
npm run build
npm start
```

`npm start` inicia a compilação de produção, após `npm run build`.

## O que está pronto

- Login com validação de formulário, exibição de senha, mensagens de erro e autenticação por senha Supabase quando configurado.
- Entrada explícita em modo demonstrativo, separada do login real.
- Dashboard com faturamento anual/mensal, seleção de mês, gráfico interativo, meta, serviços contratados, leads, próximos eventos, tarefas e produção.
- Tarefas e cadastro simples de clientes demonstrativos persistidos no localStorage do navegador. Esses dados são compartilhados entre sessões no mesmo navegador; não cadastrar dados reais na demonstração.
- Navegação para os demais módulos com indicação de implementação futura. Produção tem tabela demonstrativa.

Todos os indicadores são fictícios, inclusive após login Supabase. Meses futuros têm faturamento zero. A comparação percentual usa o mês anterior; as contagens de serviços são exemplos ilustrativos. Agenda e produção usam datas fixas em outubro de 2026. Não há sincronização de dados de negócio com Supabase nesta etapa.

## Supabase

1. Crie um projeto no Supabase.
2. Em `.env.local`, preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com a URL e chave pública do projeto. Reinicie o servidor.
3. Execute `supabase/migrations/202610220001_initial.sql` no SQL Editor. A tabela de clientes já possui RLS e acesso restrito ao proprietário autenticado.
4. Crie manualmente sua usuária em Authentication > Users. Desative cadastros públicos em Authentication para manter o uso administrativo.
5. Acesse `/login` com esse e-mail e senha.

Nunca coloque a chave `service_role` no frontend. A proteção atual controla a navegação no cliente; a proteção de dados reais deve ser feita com RLS. Para evoluir com páginas privadas renderizadas no servidor, adicione `@supabase/ssr`, cookies e validação de sessão no servidor. Não há recuperação de senha ou cadastro público nesta versão.

## Organização

```text
src/app/                     Rotas, layout e estilo global
src/app/login/               Página de autenticação
src/components/studio.tsx    Shell da aplicação e dashboard demonstrativo
src/features/production/     Componentes do módulo de produção
src/lib/demo.ts              Dados demonstrativos e formatação monetária
src/lib/supabase.ts          Cliente Supabase opcional
src/types/domain.ts          Contratos iniciais para os módulos
supabase/migrations/         Evolução versionada do banco
```

Adicione novos módulos em `src/features/<modulo>`, extraia consultas para serviços próprios e mantenha os dados demonstrativos separados. O cadastro completo de clientes, funil de vendas, calendário, financeiro com parcelas e fluxo de produção serão etapas posteriores.

## Publicar na Vercel sem instalar nada no Mac

1. Acesse https://vercel.com/new e entre com sua conta GitHub.
2. Autorize o acesso ao repositório `angelasscarpat-maker/angelascarp` e clique em **Import**.
3. Selecione a branch **Principal**, com estes arquivos já presentes no GitHub.
4. Mantenha **Framework Preset: Next.js** e **Root Directory: .** (raiz). Use Node.js 22.x ou 24.x.
5. Mantenha **Build Command: npm run build**, **Install Command: npm ci** e o diretório de saída padrão do Next.js. O `package-lock.json` está versionado.
6. Deixe as variáveis de ambiente vazias. Supabase não é necessário.
7. Clique em **Deploy**. Ao concluir, clique em **Visit** para abrir a URL HTTPS fornecida pela Vercel no Safari.
8. Faça alterações futuras na branch de produção para gerar novos deploys automaticamente. A branch de produção pode ser conferida nas configurações Git do projeto Vercel.

O endereço `localhost:3000` só funciona na máquina onde o servidor está executando. O ambiente remoto do Codex precisa de encaminhamento de portas para oferecer uma prévia ao seu Mac; nesta sessão não há uma ferramenta de encaminhamento disponível. A Vercel fornece uma URL acessível sem instalações locais.

A demonstração usa dados fictícios. Cadastros e tarefas são salvos apenas no navegador. O login Supabase continua opcional e não deve ser configurado para este teste.

## Verificação no ambiente Codex

O erro inicial de conexão com `proxy:8080` foi resolvido executando a instalação com a permissão de rede do ambiente. Um segundo erro de cache foi resolvido direcionando o npm para uma pasta gravável:

```sh
npm ci --cache /workspace/work/npm-cache
```

O comando também precisa do acesso à rede habilitado no executor Codex. Não é necessário alterar o proxy, desativar TLS ou mudar configurações no Mac.

### Resultado das verificações

- Instalação concluída com permissão de rede e cache gravável.
- `npm run typecheck` e `npm run build`: passaram (Next.js 15.5.28).
- `npm audit`: 0 vulnerabilidades após atualização de PostCSS via override.
- Servidor de produção iniciado na porta 3000 com permissão de rede.
- HTTP: `/` e `/login` retornaram 200; rota inexistente retornou 404.
- Não houve teste visual/interativo no navegador. HTTP não comprova interações após hidratação.

O envio à branch `Principal` depende de aprovação: a revisão automática do ambiente bloqueou o push à branch padrão. Antes de importar na Vercel, confirme que os arquivos de aplicação estão nessa branch; o repositório remoto ainda pode conter apenas o README inicial.
