/**
 * Google Apps Script — API pública de leitura para o site Deeper (Angular).
 *
 * Como usar:
 * 1. Abra a planilha no Google Sheets > Extensões > Apps Script.
 * 2. Cole este arquivo (ou o conteúdo) no editor e salve.
 * 3. Implante: Implantar > Nova implantação > Tipo: App da Web
 *    - Executar como: eu
 *    - Quem tem acesso: qualquer pessoa
 * 4. Copie a URL gerada e coloque em `src/environments/environment.prod.ts` em `eventsApiUrl`.
 *
 * Abas obrigatórias:
 * - `events` — primeira linha = cabeçalho (id, title, date, location, image, description, formUrl, active)
 * - `config` — duas colunas: key | value (siteTitle, instagram, churchName, mainSiteUrl, aboutImageUrl, ...)
 *
 * Regras:
 * - `date` sempre em ISO (ex.: 2026-05-10T18:00:00-03:00)
 * - `id` único e estável (ex.: evt_001)
 * - `active` = TRUE/FALSE (ou checkbox)
 * - `image` e `formUrl` com URLs https válidas
 */

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const eventsSheet = ss.getSheetByName('events');
  const configSheet = ss.getSheetByName('config');

  const config = readConfig_(configSheet);
  const events = readEvents_(eventsSheet);

  const payload = { config: config, events: events };
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function readConfig_(sheet) {
  const defaults = {
    siteTitle: 'Deeper',
    instagram: 'https://www.instagram.com/deeper.aguasclaras/',
    churchName: 'Igreja Oceano da Graça',
    mainSiteUrl: 'https://www.oceanodagraca.com/',
    aboutImageUrl: '',
  };
  if (!sheet) {
    return defaults;
  }
  const values = sheet.getDataRange().getValues();
  const out = Object.assign({}, defaults);
  for (var i = 1; i < values.length; i++) {
    var key = String(values[i][0] || '').trim();
    if (!key) continue;
    out[key] = values[i][1];
  }
  return out;
}

function readEvents_(sheet) {
  if (!sheet) {
    return [];
  }
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return [];
  }
  const headers = values[0].map(function (h) {
    return String(h || '').trim();
  });
  const rows = [];
  for (var r = 1; r < values.length; r++) {
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c];
      if (!key) continue;
      obj[key] = values[r][c];
    }
    rows.push(normalizeEvent_(obj));
  }
  var active = rows.filter(function (e) {
    return e.active;
  });
  active.sort(function (a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return active.slice(0, 6);
}

function normalizeEvent_(row) {
  var a = row.active;
  var active = a === true || String(a).toUpperCase() === 'TRUE' || String(a) === '1';
  return {
    id: String(row.id || ''),
    title: String(row.title || ''),
    date: String(row.date || ''),
    location: String(row.location || ''),
    image: String(row.image || ''),
    description: String(row.description || ''),
    formUrl: String(row.formUrl || ''),
    active: active,
  };
}
