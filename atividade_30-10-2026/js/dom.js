/**
 * Exibe ou oculta a mensagem de status/carregamento/erro.
 * @param {string} message 
 * @param {'loading'|'error'|'clear'} type 
 */
export function renderStatus(message = '', type = 'clear') {
  const statusEl = document.getElementById('status-message');
  
  if (type === 'clear') {
    statusEl.classList.add('hidden');
    statusEl.className = 'status-message hidden';
    statusEl.textContent = '';
    return;
  }

  statusEl.textContent = message;
  statusEl.className = `status-message ${type}`;
  statusEl.classList.remove('hidden');
}

/**
 * Renderiza a lista de cards de produtos no contêiner.
 * @param {Array} products 
 * @param {HTMLElement} containerEl 
 * @param {Function} onFavoriteToggle 
 * @param {Function} onShowDetails 
 * @param {boolean} isFavoritesGrid 
 */
export function renderProducts(products, containerEl, onFavoriteToggle, onShowDetails, isFavoritesGrid = false) {
  containerEl.innerHTML = '';

  if (!products || products.length === 0) {
    containerEl.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('article');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$ ${product.price.toFixed(2)}</p>
      <div class="card-actions">
        <button class="btn btn-secondary btn-details">Detalhes</button>
        <button class="btn btn-fav ${isFavoritesGrid ? 'remove' : ''}">
          ${isFavoritesGrid ? 'Remover' : 'Favoritar'}
        </button>
      </div>
    `;

    // Eventos
    card.querySelector('.btn-details').addEventListener('click', () => onShowDetails(product.id));
    card.querySelector('.btn-fav').addEventListener('click', () => onFavoriteToggle(product));

    containerEl.appendChild(card);
  });
}

/**
 * Abre o modal preenchido com os detalhes do produto.
 * @param {Object} product 
 */
export function renderModalContent(product) {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%; height: 200px; object-fit: contain;">
    <h2>${product.title}</h2>
    <p><strong>Marca:</strong> ${product.brand || 'N/A'}</p>
    <p><strong>Categoria:</strong> ${product.category}</p>
    <p><strong>Avaliação:</strong> ⭐ ${product.rating}</p>
    <p><strong>Preço:</strong> $ ${product.price.toFixed(2)}</p>
    <p style="margin-top: 1rem;">${product.description}</p>
  `;

  document.getElementById('product-modal').classList.remove('hidden');
}

export function closeModal() {
  document.getElementById('product-modal').classList.add('hidden');
}