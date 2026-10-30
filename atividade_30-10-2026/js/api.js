const BASE_URL = 'https://dummyjson.com/products';

/**
 * Busca a lista de produtos ou faz pesquisa por termo.
 * @param {string} query - Termo opcional de busca.
 * @returns {Promise<Array>}
 */
export async function fetchProducts(query = '') {
  const url = query.trim() 
    ? `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    : BASE_URL;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Falha ao buscar produtos:', error);
    throw error;
  }
}

/**
 * Busca os detalhes de um produto específico por ID.
 * @param {number|string} id 
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar produto ${id}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Falha ao buscar detalhes do produto:', error);
    throw error;
  }
}