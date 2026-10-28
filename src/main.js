import './styles.css';

const STORAGE = {
  games: 'jogoteca-games-v1',
  library: 'jogoteca-library-v1'
};

const removedMvpGameIds = new Set([
  'fracoes-em-jogo', 'palavra-secreta', 'moleculas-lab', 'linha-do-tempo',
  'circuito-certo', 'mapa-das-formas', 'ingles-em-cena', 'bioma-brasil'
]);

const demoGames = [
  { id: 'crise-segundo-reinado', title: 'A Crise do Segundo Reinado', subject: 'História', grade: 'Ensino médio', description: 'A Questão Militar, a Abolição da Escravidão, o movimento republicano e a influência do Positivismo.', link: 'https://gemini.google.com/share/d/1NvBc_5_8uaAREaziRMUBAktksOH4r50M?usp=sharing', cover: 'cover-yellow', coverImage: '/covers/crise-segundo-reinado.webp', symbol: '19', author: 'Cauã Teixeira' },
  { id: 'agencia-veritas', title: 'Agência de checagem Veritas', subject: 'Conteúdos gerais', grade: 'Ano não informado', description: 'Investigue para saber se uma informação é real ou fake.', link: 'https://gemini.google.com/share/d/19CFOPtUI4xD2B8P8fLAgzCk9Xqnsowxa?usp=sharing', cover: 'cover-blue', coverImage: '/covers/agencia-veritas.webp', symbol: '✓', author: 'Diego Moura de Assis' },
  { id: 'desafio-trigonometrico-bizarro', title: 'Desafio Trigonométrico: Bizarro', subject: 'Matemática', grade: '2º ano EM', description: 'Quiz de trigonometria com 10 perguntas, tempo de resposta, XP, dicas e o personagem Bizarro como tutor.', link: 'https://gemini.google.com/share/d/1Soo8_1hofD3bt_jTzNVh59J0KF95cf8l?usp=sharing', cover: 'cover-violet', coverImage: '/covers/desafio-trigonometrico-bizarro.webp', symbol: 'θ', author: 'Emilly Gonçalves Guimarães' },
  { id: 'frente-oriental-1942', title: 'Frente Oriental: Inverno de 1942', subject: 'História', grade: 'Ano não informado', description: 'Jogo de ação e sobrevivência ambientado na Segunda Guerra Mundial, com fatos históricos desbloqueados durante a partida.', link: 'https://gemini.google.com/share/d/11f-Rr9-lK055TsxhDZhdBmZMj0hbD7uE?usp=sharing', cover: 'cover-blue', coverImage: '/covers/frente-oriental-1942.webp', symbol: '42', author: 'Gabriel Costa Moreira' },
  { id: 'fuga-eca-queiros', title: 'A fuga do Eça de Queirós', subject: 'Literatura', grade: 'Ano não informado', description: 'Colete evidências do crime do Padre Amaro sem ser pego pela Igreja.', link: 'https://gemini.google.com/share/d/1hbDYpwClur3qx4KZlaJZvdZGl2c5kjt4?usp=sharing', cover: 'cover-coral', coverImage: '/covers/fuga-eca-queiros.webp', symbol: 'Eça', author: 'Gabriel Kal-El Machado' },
  { id: 'polygeom-quest', title: 'PolyGeom Quest', subject: 'Matemática', grade: 'Ano não informado', description: 'Explore poliedros em 3D e resolva desafios de vértices, arestas, faces, áreas e volumes.', link: 'https://gemini.google.com/share/d/1fRk1nekt7sHazjjjGiPBKZIA7jXxQj30?usp=sharing', cover: 'cover-mint', coverImage: '/covers/polygeom-quest.webp', symbol: '△', author: 'Gabriel Oliveira Silva' },
  { id: 'quiz-revisional-optica', title: 'Quiz revisional de óptica', subject: 'Física', grade: 'Ano não informado', description: 'Quiz com três vidas, perguntas de múltipla escolha e revisão de óptica, espelhos planos e esféricos.', link: 'https://gemini.google.com/share/d/11g79FhbsllsXM6nsexurySfZCnBVjzUH?usp=sharing', cover: 'cover-yellow', coverImage: '/covers/quiz-revisional-optica.webp', symbol: '◉', author: 'Gabriela Teixeira Rezende Costa' },
  { id: 'literatura-afro-brasileira', title: 'Literatura Afro-Brasileira', subject: 'Literatura', grade: '1º ano EM', description: 'Quiz dinâmico sobre literatura afro-brasileira destinado aos alunos do primeiro ano do Ensino Médio.', link: 'https://gemini.google.com/share/d/1d3jdc-8GHfQiUJ5nm64sUslfooyDl8Tg?usp=sharing', cover: 'cover-rose', coverImage: '/covers/literatura-afro-brasileira.webp', symbol: 'Aa', author: 'Laura Silva Golfeto Dias e Ana Elisa Gesualdo Gato' },
  { id: 'fuga-do-sanatorio', title: 'Fuga do sanatório', subject: 'Química, Física e Matemática', grade: 'Ano não informado', description: 'Explore um complexo de laboratórios abandonados e resolva mecanismos usando estequiometria, calorimetria e geometria.', link: 'https://gemini.google.com/app/0cfab8ce7c816355?hl=pt-BR', cover: 'cover-mint', coverImage: '/covers/fuga-do-sanatorio.webp', symbol: '∑', author: 'Lorenna Paola Lazzarini Araya' },
  { id: 'geocomander', title: 'GeoComander', subject: 'Geografia', grade: 'Ano não informado', description: 'Viaje pelo mundo respondendo perguntas sobre geopolítica, relevo, climatologia e matriz energética.', link: 'https://gemini.google.com/share/d/1hdx5iK8_AudxMTfkHkbBN1o-Ua4s3z_E?usp=sharing', cover: 'cover-blue', coverImage: '/covers/geocomander.webp', symbol: '⌖', author: 'Lorenzo Corrêa Jacomett' },
  { id: 'napoleao-ascensao', title: 'Napoleão: Ascensão ao Trono — Modo Hardcore', subject: 'História', grade: 'Ano não informado', description: 'Faça as escolhas certas para instaurar o Golpe de 18 de Brumário e chegar ao poder.', link: 'https://gemini.google.com/share/d/19T1Vu1hN94p1ApwfUx8h_P7Vd_7EhRro?usp=sharing', cover: 'cover-yellow', coverImage: '/covers/napoleao-ascensao.webp', symbol: 'N', author: 'Maria Eduarda Serrano Venturelli' },
  { id: 'mente-afiada', title: 'Mente Afiada', subject: 'Matemática', grade: 'Ano não informado', description: 'Aprenda estratégias de raciocínio rápido para resolver contas diretamente de cabeça.', link: 'https://gemini.google.com/app/289d5062d8bad456?hl=pt-BR', cover: 'cover-violet', coverImage: '/covers/mente-afiada.webp', symbol: '＋', author: 'Nicoly Alves Malta' },
  { id: 'quiz-dinamico-portugues', title: 'Quiz dinâmico de português', subject: 'Português', grade: 'Ano não informado', description: 'Avance por fases de dificuldade, ganhe pontos, use dicas e transforme cada erro em aprendizado.', link: 'https://gemini.google.com/share/d/11z07rAIBMQjk8Sx5c6-zX4Go32OwJgX9?usp=sharing', cover: 'cover-coral', coverImage: '/covers/quiz-dinamico-portugues.webp', symbol: 'ç', author: 'Rafaela Teixeira Rezende Costa' },
  { id: 'missao-sistema-solar', title: 'Missão Sistema Solar', subject: 'Ciências', grade: 'Ano não informado', description: 'Explore o Sistema Solar, responda perguntas, acumule pontos, use dicas e avance por diferentes fases.', link: 'https://gemini.google.com/share/d/1tcIByuwuSe7baPPR13gD4ynuNqHYvd1m?usp=sharing', cover: 'cover-blue', coverImage: '/covers/missao-sistema-solar.webp', symbol: '☼', author: 'Sara Xavier de Oliveira' }
];

const icons = {
  store: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10.5h16v8.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 18.7v-8.2Z"/><path d="M3 10.5 5.1 4h13.8l2.1 6.5M8 10.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0M8 20v-4h8v4"/></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Z"/><path d="M5 17a2.5 2.5 0 0 0 2.5 2.5M9 8h5M9 11h5"/><path d="M9 15h2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.5L6 21V4.8Z"/></svg>',
  bookmarkFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.5L6 21V4.8A1.8 1.8 0 0 1 7.8 3Z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 5.3 10.5 6.7L8 18.7V5.3Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4.5 4.5L19 7"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 10.5v5M12 7.5h.01"/></svg>'
};

const app = document.querySelector('#app');
const savedGames = readStorage(STORAGE.games, []).filter((saved) => !removedMvpGameIds.has(saved.id));
let games = [...demoGames, ...savedGames.filter((saved) => !demoGames.some((demo) => demo.id === saved.id))];
let library = new Set(readStorage(STORAGE.library, []).filter((id) => games.some((game) => game.id === id)));
let currentView = 'store';
let selectedGameId = null;
let searchTerm = '';
let selectedSubject = 'Todas';
let selectedGrade = 'Todos';

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function writeStorage(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function icon(name, className = '') { return `<span class="icon ${className}">${icons[name] || ''}</span>`; }
function getGame(id) { return games.find((game) => game.id === id); }
function subjects() { return ['Todas', ...new Set(games.map((game) => game.subject))]; }
function grades() { return ['Todos', ...new Set(games.map((game) => game.grade))]; }
function filteredGames() {
  const base = currentView === 'library' ? games.filter((game) => library.has(game.id)) : games;
  return base.filter((game) => {
    const normalized = `${game.title} ${game.subject} ${game.grade} ${game.author} ${game.description}`.toLocaleLowerCase('pt-BR');
    const matchesSearch = !searchTerm || normalized.includes(searchTerm.toLocaleLowerCase('pt-BR'));
    const matchesSubject = selectedSubject === 'Todas' || game.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'Todos' || game.grade === selectedGrade;
    return matchesSearch && matchesSubject && matchesGrade;
  });
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar()}
        <div id="view-content">${currentView === 'add' ? renderAddView() : currentView === 'library' ? renderLibraryView() : renderStoreView()}</div>
      </main>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>
    <div id="modal-root"></div>
  `;
  bindEvents();
}

function renderSidebar() {
  return `<aside class="sidebar">
    <div class="brand"><div class="brand-mark"></div><div class="brand-name">jogoteca<span>escolar</span></div></div>
    <nav aria-label="Navegação principal">
      <div class="nav-label">Explorar</div>
      <div class="nav-list">
        <button class="nav-button ${currentView === 'store' ? 'active' : ''}" data-view="store">${icon('store')}<span>Loja</span></button>
        <button class="nav-button ${currentView === 'library' ? 'active' : ''}" data-view="library">${icon('library')}<span>Minha biblioteca</span><b class="nav-count">${library.size}</b></button>
        <button class="nav-button ${currentView === 'add' ? 'active' : ''}" data-view="add">${icon('plus')}<span>Adicionar jogo</span></button>
      </div>
    </nav>
    <div class="sidebar-foot"><span class="status-dot"></span>Catálogo local ativo<br /><span style="padding-left:13px">feito para aprender jogando</span></div>
  </aside>`;
}

function renderTopbar() {
  return `<header class="topbar">
    <div class="search-wrap">${icon('search')}<input id="search" class="search-input" value="${escapeAttr(searchTerm)}" placeholder="Buscar por título, matéria ou aluno..." aria-label="Buscar jogos" /></div>
    <div class="topbar-spacer"></div><div class="top-note">Olá, estudante</div><div class="avatar" aria-label="Perfil do estudante">A</div>
  </header>`;
}

function renderStoreView() {
  const featured = games.find((game) => game.featured) || games[0];
  const results = filteredGames();
  return `<section>
    <div class="page-head"><div><div class="eyebrow"><span class="eyebrow-line"></span>descobrir</div><h1>Aprender pode ser<br /><em style="font-style:normal;color:var(--violet)">uma grande jogada.</em></h1><p class="page-description">Jogos criados por estudantes, reunidos em um só lugar para você explorar, salvar e jogar no seu ritmo.</p></div><button class="btn btn-primary" data-view="add">${icon('plus')} Adicionar jogo</button></div>
    ${renderHero(featured)}
    ${renderStats()}
    ${renderFilters(results.length)}
    ${renderGameSection(results, 'Em destaque', 'Seleção da semana para começar uma nova fase')}
  </section>`;
}

function renderHero(game) {
  return `<div class="hero"><div class="hero-copy"><div class="hero-kicker">jogo em destaque · ${escapeHtml(game.subject)}</div><h2>${escapeHtml(game.title)}<br />está esperando por você.</h2><p>${escapeHtml(game.description)}</p><button class="btn" data-details="${game.id}">Ver detalhes ${icon('arrow')}</button></div><div class="hero-side"><div class="hero-orbit"><span class="hero-orbit-dot one"></span><span class="hero-orbit-dot two"></span><div class="hero-orbit-card"><div class="mini-icon">${icon('play')}</div><strong>${escapeHtml(game.title)}</strong><small>${escapeHtml(game.grade)}</small></div></div></div></div>`;
}

function renderStats() {
  return `<div class="stats"><div class="stat-card"><div class="stat-icon violet">${icon('store')}</div><div><div class="stat-label">jogos na loja</div><div class="stat-value">${games.length}</div></div></div><div class="stat-card"><div class="stat-icon coral">${icon('library')}</div><div><div class="stat-label">na sua biblioteca</div><div class="stat-value">${library.size}</div></div></div><div class="stat-card"><div class="stat-icon mint">${icon('spark')}</div><div><div class="stat-label">matérias para explorar</div><div class="stat-value">${new Set(games.map((g) => g.subject)).size}</div></div></div></div>`;
}

function renderFilters(resultCount) {
  return `<div class="filters-panel"><div class="filter-head"><strong>Encontre sua próxima fase</strong><button class="clear-filters" id="clear-filters">Limpar filtros</button></div><div class="filter-row"><select class="filter-select" id="subject-filter" aria-label="Filtrar por matéria">${subjects().map((subject) => `<option ${subject === selectedSubject ? 'selected' : ''}>${escapeHtml(subject)}</option>`).join('')}</select><select class="filter-select" id="grade-filter" aria-label="Filtrar por ano escolar">${grades().map((grade) => `<option ${grade === selectedGrade ? 'selected' : ''}>${escapeHtml(grade)}</option>`).join('')}</select><span class="result-count">${resultCount} ${resultCount === 1 ? 'jogo encontrado' : 'jogos encontrados'}</span></div></div>`;
}

function renderLibraryView() {
  const results = filteredGames();
  return `<section><div class="page-head"><div><div class="eyebrow"><span class="eyebrow-line"></span>seus jogos</div><h1>Minha biblioteca.</h1><p class="page-description">Tudo que você salvou para jogar depois, organizado em um cantinho só seu.</p></div><button class="btn btn-primary" data-view="store">Explorar loja ${icon('arrow')}</button></div>${renderFilters(results.length)}${results.length ? renderGameSection(results, 'Jogos salvos', 'Continue de onde parou') : renderEmptyLibrary()}</section>`;
}

function renderEmptyLibrary() {
  return `<div class="empty-state"> <div class="empty-state-icon">${icon('library')}</div><h3>Sua biblioteca está esperando a primeira jogada.</h3><p>Explore a loja, encontre um jogo que combine com você e salve-o aqui para acessar quando quiser.</p><button class="btn btn-primary" data-view="store">Ir para a loja ${icon('arrow')}</button></div>`;
}

function renderGameSection(results, title, subtitle) {
  if (!results.length) return `<div class="empty-state"><div class="empty-state-icon">${icon('search')}</div><h3>Nenhum jogo encontrado.</h3><p>Tente buscar outro termo ou limpar os filtros para descobrir novas opções.</p><button class="btn btn-soft" id="clear-filters">Limpar filtros</button></div>`;
  return `<div class="section-heading"><div><h2>${title}</h2><span>${subtitle}</span></div></div><div class="game-grid">${results.map(renderGameCard).join('')}</div>`;
}

function renderGameCard(game) {
  const saved = library.has(game.id);
  return `<article class="game-card"><div class="game-cover ${game.cover}">${game.coverImage ? `<img class="game-cover-image" src="${escapeAttr(game.coverImage)}" alt="" aria-hidden="true" />` : ''}<span class="cover-label">${escapeHtml(game.subject)}</span><span class="cover-symbol">${escapeHtml(game.symbol)}</span><button class="favorite-btn ${saved ? 'saved' : ''}" data-toggle-library="${game.id}" aria-label="${saved ? 'Remover da' : 'Adicionar à'} biblioteca">${icon(saved ? 'bookmarkFill' : 'bookmark')}</button></div><div class="game-body"><h3 class="game-title" title="${escapeAttr(game.title)}">${escapeHtml(game.title)}</h3><p class="game-description">${escapeHtml(game.description)}</p><div class="game-meta"><span class="pill subject">${escapeHtml(game.subject)}</span><span class="pill">${escapeHtml(game.grade)}</span></div><div class="game-actions"><button class="btn btn-primary" data-play="${game.id}">${icon('play')} Jogar</button><button class="btn btn-ghost icon-btn" data-details="${game.id}" aria-label="Ver detalhes">${icon('info')}</button></div></div></article>`;
}

function renderAddView() {
  return `<section><div class="page-head"><div><div class="eyebrow"><span class="eyebrow-line"></span>contribua</div><h1>Adicione um jogo<br /><em style="font-style:normal;color:var(--coral)">à jogoteca.</em></h1><p class="page-description">Você criou um jogo? Cadastre o link em menos de um minuto e compartilhe sua ideia com a escola.</p></div></div><div class="add-layout"><form id="game-form" class="form-card" novalidate><h2>Dados do jogo</h2><p class="form-intro">Preencha os campos abaixo. O jogo aparece na loja assim que você concluir.</p><div class="form-grid"><div class="field full"><label for="game-title">Nome do jogo <span class="required">*</span></label><input id="game-title" name="title" placeholder="Ex.: Desafio dos planetas" required /><div class="field-error" data-error="title"></div></div><div class="field full"><label for="game-link">Link para jogar <span class="required">*</span></label><input id="game-link" name="link" type="url" placeholder="https://..." required /><div class="field-error" data-error="link"></div></div><div class="field"><label for="game-subject">Matéria <span class="required">*</span></label><select id="game-subject" name="subject" required><option value="">Escolha uma matéria</option>${subjects().filter((s) => s !== 'Todas').map((s) => `<option>${escapeHtml(s)}</option>`).join('')}<option value="Outra">Outra</option></select><div class="field-error" data-error="subject"></div></div><div class="field"><label for="game-grade">Ano escolar <span class="required">*</span></label><select id="game-grade" name="grade" required><option value="">Escolha o ano</option><option>1º–3º ano</option><option>4º ano</option><option>5º ano</option><option>6º ano</option><option>7º ano</option><option>8º ano</option><option>9º ano</option><option>Ensino médio</option><option>Todos os anos</option></select><div class="field-error" data-error="grade"></div></div><div class="field"><label for="game-author">Seu nome e turma</label><input id="game-author" name="author" placeholder="Ex.: Alex, 7º B" /><div class="field-error" data-error="author"></div></div><div class="field"><label for="game-symbol">Símbolo da capa</label><input id="game-symbol" name="symbol" maxlength="5" placeholder="Ex.: ★" /><div class="field-error" data-error="symbol"></div></div><div class="field full"><label for="game-description">Sobre o jogo</label><textarea id="game-description" name="description" placeholder="Conte em uma frase o que o jogador vai aprender..."></textarea><div class="field-error" data-error="description"></div></div></div><div class="form-footer"><span class="form-hint"><span class="required">*</span> Campos obrigatórios</span><button class="btn btn-primary" type="submit">Publicar na loja ${icon('arrow')}</button></div></form><aside class="tip-card"><h2>Checklist rápido</h2><p class="tip-intro">Uma boa página de jogo ajuda todo mundo a começar sem dúvida.</p><div class="tip-list"><div class="tip-item"><div class="tip-check">${icon('check')}</div><div><strong>Link jogável</strong><span>Teste o endereço antes de enviar para garantir que abre no navegador.</span></div></div><div class="tip-item"><div class="tip-check">${icon('check')}</div><div><strong>Nome fácil de lembrar</strong><span>Um título curto ajuda seus colegas a encontrar seu jogo.</span></div></div><div class="tip-item"><div class="tip-check">${icon('check')}</div><div><strong>Uma pista do conteúdo</strong><span>Explique o que a pessoa vai aprender enquanto joga.</span></div></div></div></aside></div></section>`;
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
    currentView = button.dataset.view;
    if (currentView === 'store' || currentView === 'library') { searchTerm = ''; selectedSubject = 'Todas'; selectedGrade = 'Todos'; }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }));
  const search = document.querySelector('#search');
  if (search) search.addEventListener('input', (event) => { searchTerm = event.target.value; updateListingOnly(); });
  bindContentEvents();
}

function bindContentEvents() {
  document.querySelector('#subject-filter')?.addEventListener('change', (event) => { selectedSubject = event.target.value; updateListingOnly(); });
  document.querySelector('#grade-filter')?.addEventListener('change', (event) => { selectedGrade = event.target.value; updateListingOnly(); });
  document.querySelectorAll('#clear-filters').forEach((button) => button.addEventListener('click', () => { searchTerm = ''; selectedSubject = 'Todas'; selectedGrade = 'Todos'; render(); }));
  document.querySelectorAll('[data-toggle-library]').forEach((button) => button.addEventListener('click', () => toggleLibrary(button.dataset.toggleLibrary)));
  document.querySelectorAll('[data-play]').forEach((button) => button.addEventListener('click', () => playGame(button.dataset.play)));
  document.querySelectorAll('[data-details]').forEach((button) => button.addEventListener('click', () => openDetails(button.dataset.details)));
  document.querySelector('#game-form')?.addEventListener('submit', handleFormSubmit);
}

function updateListingOnly() {
  const listing = document.querySelector('#view-content');
  if (listing && currentView !== 'add') listing.innerHTML = currentView === 'library' ? renderLibraryView() : renderStoreView();
  bindContentEvents();
  const newSearch = document.querySelector('#search');
  if (newSearch) { newSearch.focus(); newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length); }
}

function toggleLibrary(id) {
  if (library.has(id)) { library.delete(id); showToast('Jogo removido da sua biblioteca.'); }
  else { library.add(id); showToast('Jogo salvo na sua biblioteca.'); }
  writeStorage(STORAGE.library, [...library]);
  render();
}

function playGame(id) {
  const game = getGame(id);
  if (!game) return;
  window.open(game.link, '_blank', 'noopener,noreferrer');
}

function openDetails(id) {
  const game = getGame(id);
  if (!game) return;
  const saved = library.has(id);
  document.querySelector('#modal-root').innerHTML = `<div class="modal-backdrop open" id="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-cover ${game.cover}">${game.coverImage ? `<img class="modal-cover-image" src="${escapeAttr(game.coverImage)}" alt="" aria-hidden="true" />` : ''}<span class="cover-label">${escapeHtml(game.subject)}</span><span class="cover-symbol">${escapeHtml(game.symbol)}</span><button class="modal-close" id="close-modal" aria-label="Fechar">${icon('close')}</button></div><div class="modal-body"><h2 id="modal-title">${escapeHtml(game.title)}</h2><p class="modal-description">${escapeHtml(game.description)}</p><div class="modal-meta"><span class="pill subject">${escapeHtml(game.subject)}</span><span class="pill">${escapeHtml(game.grade)}</span><span class="pill">por ${escapeHtml(game.author || 'estudante')}</span></div><div class="modal-actions"><button class="btn btn-primary" data-modal-play="${game.id}">${icon('play')} Abrir jogo</button><button class="btn btn-ghost" data-modal-save="${game.id}">${icon(saved ? 'bookmarkFill' : 'bookmark')} ${saved ? 'Salvo' : 'Salvar'}</button></div></div></div></div>`;
  document.querySelector('#close-modal').addEventListener('click', closeModal);
  document.querySelector('#modal-backdrop').addEventListener('click', (event) => { if (event.target.id === 'modal-backdrop') closeModal(); });
  document.querySelector('[data-modal-play]').addEventListener('click', () => playGame(id));
  document.querySelector('[data-modal-save]').addEventListener('click', () => { toggleLibrary(id); closeModal(); });
}
function closeModal() { document.querySelector('#modal-root').innerHTML = ''; }

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = {};
  if (!data.title.trim()) errors.title = 'Dê um nome para o jogo.';
  if (!data.link.trim()) errors.link = 'Cole o link do jogo.';
  else { try { const url = new URL(data.link); if (!['http:', 'https:'].includes(url.protocol)) throw new Error(); } catch { errors.link = 'Use um link válido começando com http:// ou https://'; } }
  if (!data.subject) errors.subject = 'Escolha uma matéria.';
  if (!data.grade) errors.grade = 'Escolha o ano escolar.';
  document.querySelectorAll('.field-error').forEach((element) => { element.textContent = ''; });
  Object.entries(errors).forEach(([key, message]) => { const element = document.querySelector(`[data-error="${key}"]`); if (element) element.textContent = message; });
  if (Object.keys(errors).length) { showToast('Confira os campos destacados.', 'error'); return; }
  const newGame = { id: `custom-${Date.now()}`, title: data.title.trim(), link: data.link.trim(), subject: data.subject, grade: data.grade, author: data.author.trim() || 'estudante', description: data.description.trim() || 'Um jogo criado por estudantes para aprender de um jeito diferente.', symbol: data.symbol.trim() || '★', cover: ['cover-violet', 'cover-coral', 'cover-mint', 'cover-yellow', 'cover-blue', 'cover-rose'][games.length % 6] };
  games = [...games, newGame];
  writeStorage(STORAGE.games, [...games.filter((game) => !demoGames.some((demo) => demo.id === game.id))]);
  showToast('Jogo publicado na loja!');
  form.reset();
  setTimeout(() => { currentView = 'store'; searchTerm = ''; selectedSubject = 'Todas'; selectedGrade = 'Todos'; render(); }, 650);
}

let toastTimer;
function showToast(message, type = 'success') {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.className = `toast visible ${type}`;
  toast.innerHTML = `${icon(type === 'success' ? 'check' : 'info')}<span>${escapeHtml(message)}</span>`;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}
function escapeHtml(value = '') { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[char])); }
function escapeAttr(value = '') { return escapeHtml(value).replace(/\n/g, ' '); }

render();
