import { useState } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface MappaProps {
  countryColor?: string;
  countryColorActive?: string;
  borderColor?: string;
  borderColorActive?: string;
  sideColorActive?: string;
  setCountryID: (text: string) => void;
}

// Incorporare un file direttamente come stringa invece di caricarlo da un percorso
const svgDataUrl =
  'data:image/svg+xml,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 300 150">
  <path
      transform="matrix(0.75, 0, 0, 0.75, 41.601914, 3.863941)"
      fill="#cbcbcb"
      opacity="0.9"
      stroke="#303030"
      stroke-width="8"
      d="M 164.114124 -0.000880252 C 167.285999 -0.000880252 170.473499 -0.000880252 173.640166 -0.000880252 C 198.864126 3.165787 214.629752 13.712662 221.812044 30.97308 C 263.869338 28.670996 294.447465 61.301207 275.812047 93.322042 C 282.009964 100.051209 287.181839 107.582459 289.046423 117.681418 C 289.046423 120.577252 289.046423 123.462669 289.046423 126.358502 C 283.483922 152.072045 259.541213 169.447046 220.233919 164.769963 C 210.119335 177.973088 192.124542 191.191839 164.119332 189.546006 C 149.645373 188.681422 139.577664 183.660589 130.759955 177.56163 C 121.473496 182.629339 111.416204 186.608506 96.884953 186.655381 C 63.270368 186.728297 40.780783 167.197046 40.233908 140.405378 C 18.624532 134.134544 3.983906 122.436627 -0.000469298 102.415792 C -0.000469298 99.525167 -0.000469298 96.624125 -0.000469298 93.743917 C 4.400573 73.905374 18.239115 61.441832 41.285991 56.160581 C 39.900575 22.697038 85.999536 1.785578 123.874538 16.525162 C 132.890163 9.238704 145.650581 1.285578 164.114124 -0.000880252 Z M 164.114124 -0.000880252"
  />
</svg>
`);

export default function Mappamondo({
  countryColor = '#DDB892',
  countryColorActive = '#c0dfa1',
  borderColor = '#000000',
  borderColorActive = '#89023e',
  sideColorActive = '#602387',
  setCountryID,
}: MappaProps) {
  /* const [country, setCountry] = useState<string>(''); */ // Gestisce salvataggio nome paese selezionato

  // Tramite WebViewMessageEvent salva nome paese selezionato
  const handleMessage = (event: WebViewMessageEvent) => {
    const countryName = event.nativeEvent.data;
    setCountryID(countryName);
    /*  setCountry(countryName); */
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            background-color: rgb(30, 30, 30);
            overflow: hidden;

            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        #mainContainer {
            position: relative;
            width: 100vw;
            height: 100vh;
        }

        #globeViz {
            width: 100vw;
            height: 100vh;
        }

        #speechBubble {
            display: none;
            position: fixed;
            left: 30%;
            top: 30%;
            width: 180px;
            aspect-ratio: 300 / 150;
            background-image: url('${svgDataUrl}');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            box-sizing: border-box;
            padding: 25px 50px;
        }

        #myParagraph {
            margin: 0;
            text-align: center;
            font-weight: bold;
            font-size: 12px;
            color: black;
            word-wrap: break-word;
        }

        #controlsBtn {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 999;
            width: 100px;
            height: 50px;
            background-color: black;
            color: beige;
            font-size: 16px;
            letter-spacing: 0.5px;
            border: 1px solid beige;
            border-radius: 8px;
            opacity: 0.5;
        }
    </style>

    <!--Script che permette la creazione del mappamondo-->
    <script src="https://unpkg.com/globe.gl"></script>
</head>

<body>
    <div id="mainContainer">
        <div id="globeViz"></div>
        <div id="speechBubble"><p id="myParagraph"></p></div>
        <button 
            id="controlsBtn" 
            type="button" 
            aria-label="activate the controls" 
            onclick="enablePolygonClick()"
            disabled
        >
            Activate controls
        </button>
    </div>

    <script>
        const speechBubbleDiv = document.getElementById("speechBubble");
        const speechBubbleParagraph = document.getElementById("myParagraph");
        const controlsBtn = document.getElementById("controlsBtn");

        let selectedCountry = null; // Variabile per nome paese

        // Funzione gestisce il click su un paese
        const handlePolygonClick = (polygon) => {
            // Disattiva i controlli (zoom e movimento)
            const controls = world.controls();
            controls.enabled = false;

            // Disattiva la possibilità di cliccare su un altro paese
            world.onPolygonClick(null);

            // Salva il nome del paese cliccato
            const countryName = polygon.properties.ADMIN;
            selectedCountry = countryName;

            // Usa poligon.bbox per centrare e gestire zoom 
            const lat = (polygon.bbox[1] + polygon.bbox[3]) / 2;
            const lng = (polygon.bbox[0] + polygon.bbox[2]) / 2 + 10; // Aggiungo 10 per fare in modo che si veda meglio il sollevamento (altitude)

            // Calcola l'estensione del paese tramite bbox
            const lngSpan = polygon.bbox[2] - polygon.bbox[0];
            const latSpan = polygon.bbox[3] - polygon.bbox[1];
            const maxSpan = Math.max(lngSpan, latSpan);

            // Determina l'altitude in base alla dimensione del paese
            let altitude;
            if (maxSpan > 80) {
                altitude = 1.4; // paese grande
            } else if (maxSpan > 20) {
                altitude = 1; // paese medio
            } else {
                altitude = 0.8; // paese piccolo
            }

            // Fa partire zoom e spostamento in 1200ms
            world.pointOfView({ lat, lng, altitude }, 1200);

            // Trucco per forzare il re-rendering del globo e visualizzare i cambiamenti al click
            world.polygonsData(world.polygonsData());

            // Aggiungo il nome paese al <p> e assegno display: "flex" al div padre
            speechBubbleParagraph.textContent = selectedCountry; 
            setTimeout(() => {
                Object.assign(speechBubbleDiv.style, {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                });

                // Attiva la possibilità di cliccare sul bottone e reimposta l'opacità
                controlsBtn.disabled = false;
                controlsBtn.style.opacity = "1";
            }, 1200); // stesso tempo della transizione zoom

            // Passa il nome paese a ReactNative o stampa in console
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(countryName);
            } else {
                console.log("Cliccato su:", countryName);
            }
        };

        // Funzione per riabilitare il click su un paese e i controlli (zoom e spostamento)
        const enablePolygonClick = () => {
            speechBubbleDiv.style.display = "none";
            selectedCountry = null;

            const controls = world.controls();
            controls.enabled = true;

            controlsBtn.disabled = true;
            controlsBtn.style.opacity = "0.5";

            world.onPolygonClick(handlePolygonClick);
            world.polygonsData(world.polygonsData()); // forza re-render per togliere il colore selezionato
        };

        const world = Globe()
            (document.getElementById('globeViz'))
            .backgroundColor('rgba(0, 0, 0, 0)')

            // Invece di usare un immagine uso un linear gradient
            .globeImageUrl((() => {
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
            })())

            // Cambio colore paese selezionato
            .polygonCapColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return '${countryColorActive}';
                }
                return '${countryColor}';
            })

            // Cambio colore bordo paese selezionato
            .polygonStrokeColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return '${borderColorActive}';
                }
                return '${borderColor}';
            })

            // Cambio colore lati paese selezionato
            .polygonSideColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return '${sideColorActive}';
                }
                return 'rgba(0, 0, 0, 0)';
            })

            // Il paese selezionato si solleva dalla superficie
            .polygonAltitude((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return 0.022;
                }
                return 0.01;
            })

            // Imposta lo zoom iniziale, viene impostata anche la durata della transizione 0 = istantaneo
            .pointOfView({ altitude: 2 }, 0)

            .onPolygonClick(handlePolygonClick);

        // Dati coordinate geografiche dei confini (contiene nome del paese ADMIN, codice ISO, ecc)
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                // Passando i dati a .polygonsData() il globo sa quali poligoni disegnare sulla sfera
                world.polygonsData(countries.features);

                /* I controlli Three.js vengono inizializzati in modo asincrono, 
                delay di 100ms garantisce che il globo sia completamente inizializzato prima di modificare i limiti di zoom
                */
                setTimeout(() => {
                    const controls = world.controls();
                    controls.minDistance = 150;
                    controls.maxDistance = 350;
                }, 100);
            })
            .catch(err => console.error("Errore caricamento GeoJSON:", err));

        window.addEventListener('resize', () => {
            world.width(window.innerWidth);
            world.height(window.innerHeight);
        });
    </script>
</body>

</html>
  `;

  return (
    <WebView
      className="flex-1 bg-transparent"
      originWhitelist={['*']} // Specifica quali origini (domini) possono essere caricate nella WebView, in questo caso accetta qualsiasi origine
      source={{ html: htmlContent }}
      javaScriptEnabled={true} // Abilita l'esecuzione di JS dentro la WebView, default: true su iOS, false su Android
      domStorageEnabled={true} // Abilita il DOM Storage (localStorage e sessionStorage), permette al JS nella WebView di salvare dati localmente
      allowUniversalAccessFromFileURLs={true} // Evita il problema del CORS
      mixedContentMode="always" // Il "mixed content" si verifica quando una pagina HTTPS carica risorse HTTP (o viceversa)
      onMessage={handleMessage} // Ponte di comunicazione WebView -> React Native
      startInLoadingState={true} // Mostra automaticamente un indicatore di caricamento mentre la WebView si carica
      scalesPageToFit={true} // su alcuni device potrebbero esserci problemi di scala quindi scalePageToFit={true} aiuta per responsive
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }} // Callback chiamato quando si verifica un errore durante il caricamento
    />
  );
}
