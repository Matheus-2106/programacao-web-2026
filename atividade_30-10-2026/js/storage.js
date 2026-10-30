const FAVORITES_KEY = '@catalogo:favoritos';

/**
 * Recupera a lista de favoritos do localStorage.
 * @returns {Array}
 */
export function getFavorites() {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Adiciona um produto aos favoritos caso não esteja salvo.
 * @param {Object} product 
 */
export function addFavorite(product) {
  const favorites = getFavorites();
  const exists = favorites.some(fav => fav.id === product.id);

  if (!exists) {
    favorites.push(product);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

/**
 * Remove um produto dos favoritos pelo ID.
 * @param {number|string} id 
 */
export function removeFavorite(id) {
  const favorites = getFavorites();
  const updated = favorites.filter(fav => fav.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

/**
 * Verifica se o produto é favorito.
 * @param {number|string} id 
 * @returns {boolean}
 */
export function isFavorite(id) {
  const favorites = getFavorites();
  return favorites.some(fav => fav.id === id);
}