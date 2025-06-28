export default class WordModel {
  constructor() {
    // зберігаємо користувача та список слів у localStorage
    this.usersKey   = 'wl_users';
    this.currentKey = 'wl_current';
    this.wordsKey   = 'wl_words';
    this.progressKey= 'wl_progress';

    // ініціалізуємо дані, якщо їх ще немає
    if (!localStorage.getItem(this.usersKey))    localStorage.setItem(this.usersKey, '[]');
    if (!localStorage.getItem(this.wordsKey))    {
      // початковий набір слів
      const starter = [
        { term: 'apple',   definition: 'яблуко' },
        { term: 'sun',     definition: 'сонце' },
        { term: 'tree',    definition: 'дерево' },
      ];
      localStorage.setItem(this.wordsKey, JSON.stringify(starter));
    }
    if (!localStorage.getItem(this.progressKey)) localStorage.setItem(this.progressKey, '{}');
  }

  // ====== User logic ======
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.usersKey));
  }
  saveAllUsers(arr) {
    localStorage.setItem(this.usersKey, JSON.stringify(arr));
  }
  registerUser(user) {
    let users = this.getAllUsers();
    if (users.find(u => u.email === user.email)) {
      throw new Error('User already exists');
    }
    users.push(user);
    this.saveAllUsers(users);
  }
  loginUser(email, password) {
    const users = this.getAllUsers();
    const u = users.find(u => u.email === email && u.password === password);
    if (!u) return false;
    localStorage.setItem(this.currentKey, JSON.stringify(u));
    return true;
  }
  logoutUser() {
    localStorage.removeItem(this.currentKey);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentKey));
  }

  // ====== Words logic ======
  getAllWords() {
    return JSON.parse(localStorage.getItem(this.wordsKey));
  }
  getProgress() {
    return JSON.parse(localStorage.getItem(this.progressKey));
  }
  updateProgress(term, correct) {
    const prog = this.getProgress();
    prog[term] = correct;
    localStorage.setItem(this.progressKey, JSON.stringify(prog));
  }
}
