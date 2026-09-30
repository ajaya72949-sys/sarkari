const CONTENT_KEY = 'naukriSuchnaContent';
const params = new URLSearchParams(window.location.search);
const sectionId = params.get('section') || '';
const itemIndex = Number.parseInt(params.get('item') || '', 10);
const fallbackTitle = params.get('title') || 'अपडेट विवरण';
const titleElement = document.getElementById('detailTitle');
const bodyElement = document.getElementById('detailBody');

function safeExternalUrl(value) {
  const url = (value || '').trim();
  if (/^https?:\/\//i.test(url)) return url;
  return '';
}

function renderTable(table) {
  if (!table || !Array.isArray(table.headers)) return;
  const customHeader = table.headers.some((value) => value.trim() && !/^column \d+$/i.test(value.trim()));
  const hasCellContent = Array.isArray(table.rows) && table.rows.some((row) => row.some((value) => value.trim()));
  if (!customHeader && !hasCellContent) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'detail-table-wrap';
  const element = document.createElement('table');
  element.className = 'detail-table';
  const head = document.createElement('thead');
  const headerRow = document.createElement('tr');
  table.headers.forEach((label) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = label;
    headerRow.append(th);
  });
  head.append(headerRow);
  element.append(head);

  const body = document.createElement('tbody');
  (Array.isArray(table.rows) ? table.rows : []).forEach((cells) => {
    const row = document.createElement('tr');
    table.headers.forEach((_, index) => {
      const cell = document.createElement('td');
      cell.textContent = cells[index] || '';
      row.append(cell);
    });
    body.append(row);
  });
  element.append(body);
  wrapper.append(element);
  bodyElement.append(wrapper);
}

let item = null;
try {
  const content = JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}');
  if (Number.isInteger(itemIndex) && itemIndex >= 0 && Array.isArray(content[sectionId])) {
    item = content[sectionId][itemIndex] || null;
  }
} catch {
  item = null;
}

const title = item?.text || fallbackTitle;
titleElement.textContent = title;
document.title = `${title} — नौकरी सूचना`;
if (item?.details) {
  bodyElement.textContent = item.details;
} else {
  const note = document.createElement('p');
  note.className = 'empty-note';
  note.textContent = 'इस अपडेट की पूरी जानकारी अभी admin panel में नहीं जोड़ी गई है। जानकारी जोड़ने के लिए homepage के footer से Admin Panel खोलें।';
  bodyElement.append(note);
}
renderTable(item?.table);

const officialUrl = safeExternalUrl(item?.url);
if (officialUrl) {
  const link = document.createElement('a');
  link.href = officialUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'आधिकारिक लिंक खोलें ↗';
  document.getElementById('quickLink').append(link);
}
document.getElementById('year').textContent = new Date().getFullYear();
