# Deeper — landing (Angular)

Landing da juventude **Deeper**: visual escuro, glass (estilo Apple) e eventos vindos de JSON (planilha + Apps Script em produção, mock local em desenvolvimento).

## Desenvolvimento

```bash
npm install
ng serve
```

Abra `http://localhost:4200/`. Com `eventsApiUrl` vazio em `src/environments/environment.ts`, o app carrega [`public/mock-api.json`](public/mock-api.json).

## Build de produção

```bash
ng build
```

A configuração de produção troca o ambiente por `src/environments/environment.prod.ts` (veja `fileReplacements` em `angular.json`). Substitua `eventsApiUrl` pela URL do Web App do Apps Script após publicar.

## Google Sheets — estrutura

| Aba          | Uso                                                                 |
| ------------ | ------------------------------------------------------------------- |
| `events`     | Uma linha por evento; controle de exibição com `active`             |
| `config`     | Pares `key` / `value` (siteTitle, instagram, churchName, …)         |
| `registrations` | **Fase 2** — inscrições pelo site + `doPost` (não usado no MVP)  |

### Colunas da aba `events`

| Campo       | Tipo   | Observação                          |
| ----------- | ------ | ----------------------------------- |
| id          | texto  | Único, ex.: `evt_001`               |
| title       | texto  | Nome do evento                      |
| date        | texto  | **Sempre ISO**                      |
| location    | texto  | Local                               |
| image       | texto  | URL **https** da imagem             |
| description | texto  | Resumo                              |
| formUrl     | texto  | Link do formulário (Caminho A)      |
| active      | bool   | `TRUE`/`FALSE` ou checkbox          |

### Aba `config` (duas colunas)

Primeira linha: `key` | `value`. Exemplos de chaves: `siteTitle`, `instagram`, `churchName`, `mainSiteUrl`, `aboutImageUrl`.

## Apps Script

O código de leitura (`doGet`) está em [`docs/google-apps-script.js`](docs/google-apps-script.js). Siga os comentários no topo do arquivo para implantar e copiar a URL para `environment.prod.ts`.

## Inscrição (MVP)

**Caminho A:** cada evento tem `formUrl`; o botão **Participar** abre o link em nova aba.

**Caminho B (futuro):** formulário no Angular + `doPost` gravando na aba `registrations` — documente o endpoint no mesmo projeto do script quando for implementar.

---

Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) 21. Documentação: [Angular](https://angular.dev/).
