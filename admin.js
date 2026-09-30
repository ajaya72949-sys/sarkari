// Recruitment admin editor. Changes are saved only in this browser.
(() => {
  const page = document.querySelector('[data-recruitment-admin]');
  if (!page) return;

  const storageKey = 'new-sarkari-updates-railway-defence-notice';
  const template = {
    title: 'Railway and Defence Recruitment Updates',
    organization: 'Railway & Defence Recruitment',
    postDate: 'Not provided',
    updatedAt: 'Not provided',
    shortInfo: 'Recruitment details have not been published yet. Add verified information from the official notification using the Admin page.',
    vacancies: 'Recruitment details to be added | — | Add verified vacancy and eligibility information in Admin.',
    importantDates: 'Application start date | Verify official notification\nLast date to apply | Verify official notification\nExam date | To be announced by the recruiting authority',
    applicationFee: 'Check the official notification for category-wise application fees.',
    ageLimit: 'Check the official notification for age limits and relaxation rules.',
    eligibility: 'Post-wise education and other eligibility criteria must be confirmed from the official notification.',
    selectionProcess: 'Refer to the official notification for the complete selection process.',
    howToApply: 'Read the official notification carefully.\nUse the recruiting authority’s official website to apply.\nConfirm eligibility, dates and documents before submitting the application.',
    noticeDetails: 'No specific vacancy is being claimed on this template page. Add and verify notice details in Admin before sharing an active recruitment update.',
    applyUrl: '',
    officialUrl: ''
  };
  const form = page.querySelector('#recruitment-admin-form');
  const status = page.querySelector('#admin-status');
  const readNotice = () => {
    try {
      return { ...template, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
    } catch (error) {
      return { ...template };
    }
  };
  const fillForm = (notice) => {
    Object.entries(notice).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field) field.value = value;
    });
  };

  fillForm(readNotice());
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const notice = Object.fromEntries(Array.from(form.elements)
      .filter((field) => field.name)
      .map((field) => [field.name, field.value.trim()]));
    try {
      localStorage.setItem(storageKey, JSON.stringify(notice));
      status.textContent = 'Notice saved in this browser. Open the detail page to preview your changes.';
    } catch (error) {
      status.textContent = 'Could not save in this browser. Check local storage availability.';
    }
  });

  page.querySelector('#admin-reset').addEventListener('click', () => {
    try {
      localStorage.removeItem(storageKey);
      fillForm(template);
      status.textContent = 'Template restored. Save notice to keep this version in this browser.';
    } catch (error) {
      status.textContent = 'Could not restore the template.';
    }
  });
})();
