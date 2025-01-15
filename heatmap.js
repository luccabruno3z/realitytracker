// heatmap.js
// Asegúrate de incluir las bibliotecas necesarias en tu HTML
// <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
// <script src="https://unpkg.com/leaflet.heat/dist/leaflet-heat.js"></script>

function createHeatmap(killsData) {
    // Inicializar el mapa centrado en coordenadas (0, 0) con un nivel de zoom 2
    var map = L.map('map').setView([0, 0], 2);

    // Agregar una capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Convertir los datos de kills en un formato compatible con Leaflet.heat
    var heatData = killsData.map(kill => [kill.victimPosition.y, kill.victimPosition.x, 1]);

    // Crear el mapa de calor
    var heat = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
}

// Función para cargar los datos de kills desde un archivo JSON
function loadKillsData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            createHeatmap(data);
        })
        .catch(error => console.error('Error loading kills data:', error));
}

// Llama a la función loadKillsData con la URL del archivo JSON que contiene los datos de kills
loadKillsData('killPositions.json');
