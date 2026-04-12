export const globeScript = `
const {
  countryColor,
  countryColorActive,
  borderColor,
  borderColorActive,
  sideColorActive,
  geoData,
} = CONFIG; // CONFIG esiste già perché iniettato prima da React

const speechBubbleDiv = document.getElementById('speechBubble');
const speechBubbleParagraph = document.getElementById('myParagraph');
const controlsBtn = document.getElementById('controlsBtn');

// Caricamento dati variabile geoJsonString
const countries = geoData;

let selectedCountry = null; // Variabile per nome paese

// Funzione gestisce il click su un paese
const handlePolygonClick = (polygon) => {
  // Salva il nome del paese cliccato
  const countryName = polygon.properties.ADMIN;

  // Evita di rieseguire la logica se clicchi lo stesso paese già selezionato
  if (selectedCountry === countryName) return;

  selectedCountry = countryName;

  // Disattiva i controlli (zoom e movimento)
  world.controls().enabled = false;

  // Disattiva la possibilità di cliccare su un altro paese
  world.onPolygonClick(null);

  // Aggiorna gli stili del paese selezionato
  world.polygonCapColor(world.polygonCapColor());
  world.polygonAltitude(world.polygonAltitude());
  world.polygonStrokeColor(world.polygonStrokeColor());
  world.polygonSideColor(world.polygonSideColor());

  // Usa polygon.bbox per centrare e gestire zoom
  const lat = (polygon.bbox[1] + polygon.bbox[3]) / 2;
  const lng = (polygon.bbox[0] + polygon.bbox[2]) / 2 + 10; // Aggiungo 10 in modo che si veda meglio il sollevamento (altitude)

  // Calcola l'estensione del paese tramite bbox
  const lngSpan = polygon.bbox[2] - polygon.bbox[0];
  const latSpan = polygon.bbox[3] - polygon.bbox[1];
  const maxSpan = Math.max(lngSpan, latSpan);

  // Determina l'altitude in base alla dimensione del paese
  let altitude = maxSpan > 80 ? 1.4 : maxSpan > 20 ? 1 : 0.8;

  // Fa partire zoom e spostamento in 1200ms
  world.pointOfView({ lat, lng, altitude }, 1200);

  // Aggiungo il nome paese al <p> e assegno display: "flex" al div padre
  speechBubbleParagraph.textContent = selectedCountry;
  setTimeout(() => {
    Object.assign(speechBubbleDiv.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });

    // Attiva la possibilità di cliccare sul bottone e reimposta l'opacità
    controlsBtn.disabled = false;
    controlsBtn.style.opacity = '1';
  }, 1200); // stesso tempo della transizione zoom

  // Rendering
  render();

  // Passa il nome paese a ReactNative o stampa in console
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(countryName);
  } else {
    console.log('Cliccato su:', countryName);
  }
};

// Funzione riabilita il click su un paese e i controlli (zoom e spostamento)
window.enablePolygonClick = () => {
  speechBubbleDiv.style.display = 'none';
  selectedCountry = null;

  world.controls().enabled = true;

  controlsBtn.disabled = true;
  controlsBtn.style.opacity = '0.5';

  world.onPolygonClick(handlePolygonClick);

  //Infine forza il refresh dello stile
  world.polygonCapColor(world.polygonCapColor());
  world.polygonAltitude(world.polygonAltitude());
  world.polygonStrokeColor(world.polygonStrokeColor());
  world.polygonSideColor(world.polygonSideColor());

  // Rendering
  render();

  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage('');
  }
};

const world = Globe()(document.getElementById('globeViz'))
  .backgroundColor('rgba(0, 0, 0, 0)')

  // Invece di usare un immagine uso un linear gradient
  .globeImageUrl(
    (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 256); // Crea un gradiente verticale
      gradient.addColorStop(0, '#193a67'); // Posizione 0% = blu scuro
      gradient.addColorStop(1, '#296376'); // Posizione 100% = blu chiaro

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      return canvas.toDataURL(); // Converte il contenuto del canvas in una stringa **data URL**
    })()
  )

  // Cambio colore paese selezionato
  .polygonCapColor((polygon) => {
    if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
      return countryColorActive;
    }
    return countryColor;
  })

  // Cambio colore bordo paese selezionato
  .polygonStrokeColor((polygon) => {
    if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
      return borderColorActive;
    }
    return borderColor;
  })

  // Cambio colore lati paese selezionato
  .polygonSideColor((polygon) => {
    if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
      return sideColorActive;
    }
    return 'rgba(0, 0, 0, 0)';
  })

  // Il paese selezionato si solleva dalla superficie
  .polygonAltitude((polygon) => {
    if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
      return 0.04;
    }
    return 0.015;
  })

  // Imposta lo zoom iniziale, viene impostata anche la durata della transizione 0 = istantaneo
  .pointOfView({ altitude: 2 }, 0)

  .onPolygonClick(handlePolygonClick);

// CONFIGURAZIONE CAMERA E "RENDER ON DEMAND"
const camera = world.camera();
const renderer = world.renderer();
const controls = world.controls();

camera.near = 10;
camera.far = 1000;
camera.updateProjectionMatrix();

// Riduzione della risoluzione (non è necessario che Pixel ratio sia superiore a 1, questo consente guadagno di fluidità)
renderer.setPixelRatio(1);

let renderRequested = false; // Flag per la funzione

// Funzione di rendering manuale (evita il loop continuo di rendering quando con ci sono cambiamenti)
function render() {
  if (!renderRequested) {
    renderRequested = true;
    requestAnimationFrame(() => {
      renderRequested = false;
      renderer.render(world.scene(), world.camera());
    });
  }
}

// Renderizza solo quando l'utente muove la camera
controls.addEventListener('change', render);

/* 
I controlli Three.js vengono inizializzati in modo asincrono, 
delay di 100ms garantisce che il globo sia completamente inizializzato prima di modificare i limiti di zoom
*/
setTimeout(() => {
  controls.minDistance = 150;
  controls.maxDistance = 350;
}, 100);

// Inizializzazione poligoni
world.polygonsData(countries.features);
render();

window.addEventListener('resize', () => {
  world.width(window.innerWidth);
  world.height(window.innerHeight);
  render();
});
`;