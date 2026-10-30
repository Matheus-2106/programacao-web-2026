import { fetchProducts, fetchProductById } from './api.js';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from './storage.js';
import { renderProducts, renderStatus, renderModalContent, closeModal } from './dom.js';

// Elementos do DOM
const productsGrid = document.getElementById('products-grid');
const favoritesGrid = document.getElementById('favorites-grid');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const closeModalBtn = document.getElementById('close-modal');

// --- Inicialização da Aplicação ---
async function init() {
  setupEventListeners();
  updateFavoritesList();
  await loadProducts();
}

// --- Carregamento de Dados ---
async function loadProducts(query = '') {
  renderStatus('Carregando produtos...', 'loading');
  try {
    const products = await fetchProducts(query);
    renderStatus('', 'clear');
    renderProducts(
      products,
      productsGrid,
      handleFavoriteToggle,
      handleShowDetails
    );
  } catch (error) {
    renderStatus('Não foi possível carregar os produtos. Verifique sua conexão.', 'error');
  }
}

// --- Atualizar Lista de Favoritos ---
function updateFavoritesList() {
  const favorites = getFavorites();
  renderProducts(
    favorites,
    favoritesGrid,
    (product) => {
      removeFavorite(product.id);
      updateFavoritesList();
    },
    handleShowDetails,
    true // flag para indicar que é a grade de favoritos
  );
}

// --- Handlers de Eventos ---
function handleFavoriteToggle(product) {
  if (isFavorite(product.id)) {
    removeFavorite(product.id);
  } else {
    addFavorite(product);
  }
  updateFavoritesList();
}

async function handleShowDetails(productId) {
  try {
    const product = await fetchProductById(productId);
    renderModalContent(product);
  } catch (error) {
    alert('Erro ao carregar detalhes do produto.');
  }
}

function setupEventListeners() {
  // Evento do Formulário de Busca
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    loadProducts(searchInput.value);
  });

  // Fechar Modal
  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Inicializar após carregamento do DOM
document.addEventListener('DOMContentLoaded', init);