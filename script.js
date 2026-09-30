const CONTENT_STORAGE_KEY = 'naukriSuchnaContent';
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

function safeLink(value, fallback) {
	const link = (value || '').trim();
	if (/^(https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(link)) return link;
	if (link && !/^[a-z][a-z0-9+.-]*:/i.test(link) && !/\s/.test(link)) return link;
	return fallback;
}

function applySavedContent() {
	let content;
	try {
		content = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || 'null');
	} catch {
		return;
	}
	if (!content) return;

	Object.entries(content).forEach(([sectionId, items]) => {
		if (!Array.isArray(items)) return;
		const card = document.getElementById(sectionId);
		const isService = sectionId.startsWith('services-');
		const list = isService
			? document.querySelectorAll('.service-list')[sectionId === 'services-work' ? 0 : 1]
			: card?.querySelector('.update-list');
		if (!list) return;

		list.replaceChildren();
		items.forEach((item) => {
			if (!item || !item.text) return;
			const li = document.createElement('li');
			const link = document.createElement('a');
			link.textContent = item.text;
			link.href = safeLink(item.url, isService ? '#sarkari-seva' : `#${sectionId}`);
			li.append(link);

			if (!isService && item.isNew) {
				const tag = document.createElement('span');
				tag.className = 'tag tag-new';
				tag.textContent = 'नया';
				li.append(tag);
			} else if (isService) {
				const arrow = document.createElement('span');
				arrow.setAttribute('aria-hidden', 'true');
				arrow.textContent = '→';
				li.append(arrow);
			}
			list.append(li);
		});
	});
}

function renderUsefulLinks() {
	const body = document.getElementById('usefulLinksBody');
	if (!body) return;

	let savedLinks = [];
	try {
		const content = JSON.parse(localStorage.getItem(CONTENT_STORAGE_KEY) || '{}');
		savedLinks = Array.isArray(content.usefulLinks) ? content.usefulLinks : DEFAULT_USEFUL_LINKS;
	} catch {
		savedLinks = DEFAULT_USEFUL_LINKS;
	}

	body.replaceChildren();
	savedLinks.forEach((item) => {
		if (!item?.text || !item?.label) return;
		const row = document.createElement('tr');
		const title = document.createElement('td');
		const linkCell = document.createElement('td');
		const link = document.createElement('a');
		title.textContent = item.text;
		link.textContent = item.label;
		link.href = safeLink(item.url, '#');
		if (/^https?:\/\//i.test(link.href)) {
			link.target = '_blank';
			link.rel = 'noopener noreferrer';
		}
		linkCell.append(link);
		row.append(title, linkCell);
		body.append(row);
	});
}

function showTime() {
	const now = new Date();
	const timeElement = document.getElementById('currentTime');
	if (timeElement) {
		timeElement.textContent = now.toLocaleString('hi-IN');
	}

	const yearElement = document.getElementById('year');
	if (yearElement) {
		yearElement.textContent = now.getFullYear();
	}
}

function wireDetailLinks() {
	const lists = document.querySelectorAll('.update-card .update-list');
	lists.forEach((list) => {
		const sectionId = list.closest('.update-card').id;
		list.querySelectorAll('li').forEach((item, index) => {
			const link = item.querySelector('a');
			if (!link) return;
			const params = new URLSearchParams({ section: sectionId, item: String(index), title: link.textContent.trim() });
			link.href = `detail.html?${params.toString()}`;
		});
	});

	['services-work', 'services-plans'].forEach((sectionId, listIndex) => {
		const list = document.querySelectorAll('.service-list')[listIndex];
		list?.querySelectorAll('li').forEach((item, index) => {
			const link = item.querySelector('a');
			if (!link) return;
			const params = new URLSearchParams({ section: sectionId, item: String(index), title: link.textContent.trim() });
			link.href = `detail.html?${params.toString()}`;
		});
	});
}

applySavedContent();
wireDetailLinks();
renderUsefulLinks();
showTime();
setInterval(showTime, 1000);
