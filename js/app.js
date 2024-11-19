// URL base de la API de TVMaze
const baseURL = 'https://api.tvmaze.com';

// Función para obtener las series populares
const getPopularSeries = async () =>
{
  try 
  {
    const response = await axios.get(`${baseURL}/shows`);
    const seriesData = response.data;
    
    // Llamar a la función para renderizar las series
    renderSeries(seriesData);
  } 
  catch (error) 
  {
    console.error('Error al obtener las series:', error);
  }
}

// Función para renderizar las series en la página
const renderSeries = series => 
{
  const seriesGrid = document.getElementById('series-grid');
  seriesGrid.innerHTML = ''; // Limpiar el contenedor antes de agregar los elementos

  series.forEach(serie => 
  {
    const seriesItem = document.createElement('div');
    seriesItem.classList.add('series-item');

    seriesItem.innerHTML = `
      <a href="series.html?id=${serie.id}" class="series-item__link">
        <img src="${serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295'}" alt="${serie.name}" class="series-item__image">
        <h3 class="series-item__title">${serie.name}</h3>
      </a>
    `;

    seriesGrid.appendChild(seriesItem);
  });
}

// Llamar a la función para cargar las series cuando cargue la página
window.onload = getPopularSeries;

// Función para obtener detalles de una serie específica
const getSerieDetails = async id =>
{
  try 
  {
    const response = await axios.get(`${baseURL}/shows/${id}`);
    const serieDetails = response.data;
    
    // Llamar a la función para renderizar los detalles
    renderSerieDetails(serieDetails);
  } 
  catch (error) 
  {
    console.error('Error al obtener los detalles de la serie:', error);
  }
}

// Función para renderizar los detalles de la serie
const renderSerieDetails = serie =>
{
  const seriesDetail = document.getElementById('series-detail');
  
  seriesDetail.innerHTML = `
    <h2 class="series-detail__title">${serie.name}</h2>
    <img src="${serie.image ? serie.image.original : 'https://via.placeholder.com/400x600'}" alt="${serie.name}" class="series-detail__image">
    <p class="series-detail__summary">${serie.summary}</p>
    <p class="series-detail__status">Estado: ${serie.status}</p>
    <p class="series-detail__genres">Géneros: ${serie.genres.join(', ')}</p>
  `;
}

// Obtener el ID de la serie desde la URL
const urlParams = new URLSearchParams(window.location.search);
const serieId = urlParams.get('id');

// Llamar a la función para cargar los detalles de la serie
if (serieId) 
{
  getSerieDetails(serieId);
}