# Ateliê — Angela Scarpati Fotografia

Base de gestão com Next.js App Router, TypeScript, Tailwind CSS 4 e integração inicial de autenticação Supabase. Visual responsivo em tons neutros e verde suave.

## Executar

Requisitos: Node.js 22 LTS e npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abra **http://localhost:3000/login** e clique em **Explorar demonstração**. Nenhuma conta ou chave é necessária para a demonstração. O dashboard redireciona para o login quando não há sessão.

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

## Publicar

Em hospedagem compatível com Next.js (por exemplo Vercel), importe o repositório, configure as mesmas variáveis públicas e utilize o comando de build `npm run build`. Nenhuma credencial Supabase é incluída no repositório.

## Verificação neste ambiente

A instalação foi tentada, mas o proxy de rede do ambiente não estava acessível (`Could not connect to proxy port 8080`). Por isso ainda não foi possível executar TypeScript, build ou teste no navegador. Execute os comandos de verificação acima assim que as dependências estiverem disponíveis.
