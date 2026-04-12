import { useMemo } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import countriesData from '../assets/data/countries.json';
import { globeStyles } from '../assets/webview/globeStyles';
import { globeScript } from '../assets/webview/globeScript';

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
  // Tramite WebViewMessageEvent salva nome paese selezionato
  const handleMessage = (event: WebViewMessageEvent) => {
    const countryName = event.nativeEvent.data;
    setCountryID(countryName);
  };

  const htmlContent = useMemo(() => {
    // Trasformiamo il JSON in una stringa
    const geoJsonString = JSON.stringify(countriesData);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${globeStyles}</style>
    <style>
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
        const CONFIG = ${JSON.stringify({
            countryColor,
            countryColorActive,
            borderColor,
            borderColorActive,
            sideColorActive,
            geoData: countriesData,
        })};
    </script>
    <script>${globeScript}</script>
</body>

</html>
  `;
}, [countryColor, countryColorActive, borderColor, borderColorActive, sideColorActive]);

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
