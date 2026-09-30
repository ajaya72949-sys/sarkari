const STORAGE_KEY = 'naukriSuchnaContent';
const DEFAULT_USEFUL_LINKS = [
  { text: 'Apply Online', label: 'Click Here', url: '#' },
  { text: 'How to Fill Form (Hindi Video)', label: 'Click Here', url: '#' },
  { text: 'How to SSC OTR Registration (Video Hindi)', label: 'Click Here', url: '#' },
  { text: 'Download Tier I & II Syllabus', label: 'Click Here', url: '#' },
  { text: 'Download Notification', label: 'Click Here', url: '#' },
  { text: 'Signature Resizer, PDF Compress, Age Calculator and More Tools', label: 'Sarkari Result Tools', url: '#' },
  { text: 'Join Sarkari Result Channel', label: 'Telegram | WhatsApp', url: '#' },
  { text: 'Official Website', label: 'SSC Official Website', url: '#' }
];

const sections = [
  { id: 'result', title: 'रिजल्ट', items: [
    ['परीक्षा परिणाम और मेरिट लिस्ट', '#result', true], ['भर्ती परीक्षा स्कोर कार्ड', '#result'], ['चयन सूची और कट-ऑफ अपडेट', '#result'], ['पुराने परिणाम देखें', '#result']
  ] },
  { id: 'admit-card', title: 'एडमिट कार्ड', items: [
    ['आगामी परीक्षा प्रवेश पत्र', '#admit-card', true], ['भर्ती परीक्षा हॉल टिकट', '#admit-card'], ['परीक्षा शहर की जानकारी', '#admit-card'], ['पुराने एडमिट कार्ड', '#admit-card']
  ] },
  { id: 'latest-jobs', title: 'नवीनतम नौकरियां', items: [
    ['केंद्र और राज्य सरकार की भर्ती', '#latest-jobs', true], ['10वीं / 12वीं पास नौकरियां', '#latest-jobs'], ['ग्रेजुएट और डिप्लोमा भर्ती', '#latest-jobs'], ['आवेदन की अंतिम तिथि देखें', '#latest-jobs']
  ] },
  { id: 'answer-key', title: 'आंसर की', items: [
    ['लिखित परीक्षा की उत्तर कुंजी', '#answer-key'], ['आपत्ति दर्ज करने की जानकारी', '#answer-key'], ['प्रोविजनल और फाइनल आंसर की', '#answer-key']
  ] },
  { id: 'syllabus', title: 'सिलेबस', items: [
    ['परीक्षा पैटर्न और सिलेबस', '#syllabus'], ['विषयवार पाठ्यक्रम डाउनलोड', '#syllabus'], ['पिछले वर्षों के प्रश्नपत्र', '#syllabus']
  ] },
  { id: 'admission', title: 'प्रवेश', items: [
    ['प्रवेश परीक्षा आवेदन', '#admission'], ['कॉलेज और संस्थान प्रवेश', '#admission'], ['प्रवेश परीक्षा परिणाम', '#admission']
  ] },
  { id: 'certificate', title: 'प्रमाणपत्र सत्यापन', items: [
    ['दस्तावेज़ सत्यापन सूचना', '#certificate'], ['काउंसलिंग और चयन प्रक्रिया', '#certificate'], ['जरूरी प्रमाणपत्रों की सूची', '#certificate']
  ] },
  { id: 'documents', title: 'जरूरी दस्तावेज़', items: [
    ['आवेदन के लिए आवश्यक दस्तावेज़', '#documents'], ['फोटो और हस्ताक्षर दिशानिर्देश', '#documents'], ['फॉर्म भरने में मदद', '#documents']
  ] },
  { id: 'services-work', title: 'सरकारी काम', service: true, items: [
    ['आधार कार्ड सेवाएं और अपडेट', '#sarkari-seva'], ['पैन कार्ड आवेदन और सुधार', '#sarkari-seva'], ['जाति, आय और निवास प्रमाणपत्र', '#sarkari-seva'], ['राशन कार्ड आवेदन और स्थिति', '#sarkari-seva'], ['वोटर आईडी और मतदाता सूची', '#sarkari-seva']
  ] },
  { id: 'services-plans', title: 'सरकारी योजनाएं', service: true, items: [
    ['प्रधानमंत्री किसान सम्मान निधि', '#sarkari-seva'], ['आयुष्मान भारत स्वास्थ्य कार्ड', '#sarkari-seva'], ['प्रधानमंत्री आवास योजना', '#sarkari-seva'], ['ई-श्रम कार्ड और श्रमिक सेवाएं', '#sarkari-seva'], ['छात्रवृत्ति योजनाएं और आवेदन', '#sarkari-seva']
  ] }
];

function readSavedContent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function makeCell(value = '', placeholder = 'Cell value') {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'table-cell';
  input.value = value;
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  return input;
}

function makeTableEditor(table = {}) {
  const editor = document.createElement('div');
  editor.className = 'table-editor';
  const headers = Array.isArray(table.headers) && table.headers.length ? table.headers : ['Column 1', 'Column 2'];
  const rows = Array.isArray(table.rows) && table.rows.length ? table.rows : [headers.map(() => '')];
  const grid = document.createElement('div');
  grid.className = 'table-grid';
  grid.dataset.columns = headers.length;
  grid.style.setProperty('--column-count', headers.length);

  const headerRow = document.createElement('div');
  headerRow.className = 'table-line table-header-row';
  headers.forEach((header, index) => headerRow.append(makeCell(header, `Header ${index + 1}`)));
  grid.append(headerRow);
  rows.forEach((row) => {
    const line = document.createElement('div');
    line.className = 'table-line';
    headers.forEach((_, index) => line.append(makeCell(row[index] || '', `Row ${index + 1}, column ${index + 1}`)));
    grid.append(line);
  });
  editor.append(grid);

  const controls = document.createElement('div');
  controls.className = 'table-controls';
  [['add-column', '+ Column'], ['remove-column', '− Column'], ['add-row', '+ Row'], ['remove-row', '− Row']].forEach(([action, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-table';
    button.dataset.action = action;
    button.textContent = label;
    controls.append(button);
  });
  editor.append(controls);
  return editor;
}

function makeRow(item = {}, isService = false) {
  const row = document.createElement('div');
  row.className = 'item-row';

  const title = document.createElement('input');
  title.type = 'text';
  title.className = 'item-title';
  title.placeholder = 'अपडेट का नाम';
  title.setAttribute('aria-label', 'अपडेट का नाम');
  title.value = item.text || '';

  const link = document.createElement('input');
  link.type = 'text';
  link.className = 'item-url';
  link.placeholder = 'Detail page के अंदर optional official link';
  link.setAttribute('aria-label', 'आधिकारिक लिंक');
  link.value = item.url && item.url.startsWith('#') ? '' : (item.url || '');

  row.append(title, link);
  if (!isService) {
    const newLabel = document.createElement('label');
    newLabel.className = 'new-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-new';
    checkbox.checked = Boolean(item.isNew);
    newLabel.append(checkbox, document.createTextNode(' नया'));
    row.append(newLabel);
  }

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'button button-remove';
  remove.dataset.action = 'remove';
  remove.textContent = 'हटाएं';
  row.append(remove);

  const details = document.createElement('details');
  details.className = 'detail-editor';
  const summary = document.createElement('summary');
  summary.textContent = 'इस लिंक का पेज विवरण और table संपादित करें';
  const description = document.createElement('textarea');
  description.className = 'item-details';
  description.placeholder = 'इस अपडेट की पूरी जानकारी यहां लिखें...';
  description.value = item.details || '';
  description.setAttribute('aria-label', 'पेज की पूरी जानकारी');
  details.append(summary, description, makeTableEditor(item.table || {}));
  row.append(details);
  return row;
}

function makeUsefulLinkRow(item = {}) {
  const row = document.createElement('div');
  row.className = 'useful-link-row';
  [['text', 'लिंक का शीर्षक'], ['label', 'दिखने वाला लिंक टेक्स्ट'], ['url', 'पूरा URL (https://...)']].forEach(([field, placeholder]) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = `useful-link-${field}`;
    input.placeholder = placeholder;
    input.setAttribute('aria-label', placeholder);
    input.value = item[field] || '';
    row.append(input);
  });
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'button button-remove';
  remove.dataset.action = 'remove-useful-link';
  remove.textContent = 'हटाएं';
  row.append(remove);
  return row;
}

function renderUsefulLinkEditor(links) {
  const host = document.getElementById('usefulLinkRows');
  host.replaceChildren();
  links.forEach((item) => host.append(makeUsefulLinkRow(item)));
}

function renderEditor() {
  const saved = readSavedContent();
  const host = document.getElementById('editorSections');
  sections.forEach((section) => {
    const group = document.createElement('section');
    group.className = 'editor-group';
    group.dataset.section = section.id;

    const heading = document.createElement('div');
    heading.className = 'group-heading';
    const title = document.createElement('h2');
    title.textContent = section.title;
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'button button-add';
    add.dataset.action = 'add';
    add.textContent = '+ नया आइटम';
    heading.append(title, add);

    const rows = document.createElement('div');
    rows.className = 'item-rows';
    const items = Array.isArray(saved[section.id]) ? saved[section.id] : section.items.map(([text, url, isNew]) => ({ text, url, isNew }));
    items.forEach((item) => rows.append(makeRow(item, section.service)));
    group.append(heading, rows);
    host.append(group);
  });
}

function updateTableGrid(grid) {
  const count = grid.querySelector('.table-header-row').children.length;
  grid.dataset.columns = count;
  grid.style.setProperty('--column-count', count);
  grid.querySelectorAll('.table-line:not(.table-header-row)').forEach((line) => {
    while (line.children.length < count) line.append(makeCell('', 'Table cell'));
    while (line.children.length > count) line.lastElementChild.remove();
  });
}

document.getElementById('editorSections').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const group = button.closest('.editor-group');

  if (action === 'add') {
    group.querySelector('.item-rows').append(makeRow({}, group.dataset.section.startsWith('services-')));
    return;
  }
  if (action === 'remove') {
    button.closest('.item-row').remove();
    return;
  }

  const grid = button.closest('.table-editor').querySelector('.table-grid');
  const header = grid.querySelector('.table-header-row');
  const bodyRows = [...grid.querySelectorAll('.table-line:not(.table-header-row)')];
  if (action === 'add-column') {
    header.append(makeCell(`Column ${header.children.length + 1}`, 'New column'));
    bodyRows.forEach((line) => line.append(makeCell('', 'Table cell')));
    updateTableGrid(grid);
  } else if (action === 'remove-column' && header.children.length > 1) {
    header.lastElementChild.remove();
    bodyRows.forEach((line) => line.lastElementChild.remove());
    updateTableGrid(grid);
  } else if (action === 'add-row') {
    const line = document.createElement('div');
    line.className = 'table-line';
    for (let i = 0; i < header.children.length; i += 1) line.append(makeCell('', 'Table cell'));
    grid.append(line);
  } else if (action === 'remove-row' && bodyRows.length > 1) {
    bodyRows.at(-1).remove();
  }
});

const initialContent = readSavedContent();
renderUsefulLinkEditor(Array.isArray(initialContent.usefulLinks) ? initialContent.usefulLinks : DEFAULT_USEFUL_LINKS);

document.getElementById('addUsefulLink').addEventListener('click', () => {
  document.getElementById('usefulLinkRows').append(makeUsefulLinkRow());
});

document.getElementById('usefulLinkRows').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="remove-useful-link"]');
  if (button) button.closest('.useful-link-row').remove();
});

document.getElementById('contentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const content = {};
  sections.forEach((section) => {
    const group = document.querySelector(`[data-section="${section.id}"]`);
    content[section.id] = Array.from(group.querySelectorAll('.item-row')).map((row) => {
      const grid = row.querySelector('.table-grid');
      const lines = [...grid.querySelectorAll('.table-line')];
      return {
        text: row.querySelector('.item-title').value.trim(),
        url: row.querySelector('.item-url').value.trim(),
        isNew: row.querySelector('.item-new')?.checked || false,
        details: row.querySelector('.item-details').value.trim(),
        table: {
          headers: [...lines[0].querySelectorAll('.table-cell')].map((cell) => cell.value.trim()),
          rows: lines.slice(1).map((line) => [...line.querySelectorAll('.table-cell')].map((cell) => cell.value.trim()))
        }
      };
    }).filter((item) => item.text);
  });
  content.usefulLinks = Array.from(document.querySelectorAll('.useful-link-row')).map((row) => ({
    text: row.querySelector('.useful-link-text').value.trim(),
    label: row.querySelector('.useful-link-label').value.trim(),
    url: row.querySelector('.useful-link-url').value.trim()
  })).filter((item) => item.text && item.label);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    const status = document.getElementById('saveStatus');
    status.textContent = 'बदलाव सेव हो गए। Homepage खोलें या refresh करें।';
    window.setTimeout(() => { status.textContent = ''; }, 5000);
  } catch {
    document.getElementById('saveStatus').textContent = 'सेव नहीं हो सका। Browser storage उपलब्ध नहीं है।';
  }
});

document.getElementById('resetButton').addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  document.getElementById('editorSections').replaceChildren();
  renderEditor();
  renderUsefulLinkEditor(DEFAULT_USEFUL_LINKS);
  document.getElementById('saveStatus').textContent = 'डिफॉल्ट सूची बहाल हो गई।';
});

renderEditor();
