export default class WordView {
  constructor() {
    this.errorBox = null;
  }

  // загальні
  showError(msg) {
    if (!this.errorBox) {
      this.errorBox = document.createElement('div');
      this.errorBox.className = 'alert alert-danger text-center';
      document.querySelector('main').prepend(this.errorBox);
    }
    this.errorBox.textContent = msg;
    setTimeout(() => this.errorBox.remove(), 3000);
  }

  // ====== Register/Login ======
  bindFormSubmit(formId, handler) {
    const form = document.querySelector(formId);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      handler(new FormData(form));
    });
  }

  // ====== Profile ======
  renderProfile(user) {
    const table = document.querySelector('#profile-table');
    if (!table) return;
    table.innerHTML = `
      <tr><th>Name</th>       <td>${user.name}</td></tr>
      <tr><th>Email</th>      <td>${user.email}</td></tr>
      <tr><th>Gender</th>     <td>${user.gender}</td></tr>
      <tr><th>Date of Birth</th><td>${user.dob}</td></tr>
    `;
  }

  // ====== Memorisation ======
  showTerm(term) {
    document.querySelector('#term-label').textContent = term;
    document.querySelector('#answer-input').value = '';
    document.querySelector('#feedback').textContent = '';
  }
  showFeedback(correct, definition) {
    const fb = document.querySelector('#feedback');
    if (correct) fb.textContent = '✅ Correct!';
    else        fb.textContent = `❌ Wrong. Answer: ${definition}`;
  }

  // ====== Repetition ======
  showRepetition(word) {
    document.querySelector('#rep-term').textContent = word.term;
    document.querySelector('#rep-def').textContent  = word.definition;
  }

  // ====== Test ======
  showTestResults(percent, correctList, wrongList) {
    document.querySelector('#test-progress').style.width = percent + '%';
    document.querySelector('#test-progress').textContent = percent + '% correct';
    const okEl = document.querySelector('#test-ok-list');
    const erEl = document.querySelector('#test-err-list');
    okEl.innerHTML = correctList.map((t,i) => `<li>${i+1}. ${t}</li>`).join('');
    erEl.innerHTML = wrongList.map((s,i) => `<li>${i+1}. ${s}</li>`).join('');
  }
}
