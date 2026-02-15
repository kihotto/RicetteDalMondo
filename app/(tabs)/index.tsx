import { useState } from 'react';
import { View, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export default function WelcomePage() {
  const [country, setCountry] = useState(''); // Gestisce salvataggio nome paese selezionato

  // Tramite WebViewMessageEvent salva nome paese selezionato
  const handleMessage = (event: WebViewMessageEvent) => {
    const countryName = event.nativeEvent.data;
    setCountry(countryName);
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
            background-color: transparent;
            overflow: hidden;

            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        #globeViz {
            width: 100vw;
            height: 100vh;
        }
    </style>
    <script src="https://unpkg.com/globe.gl"></script>
</head>

<body>
    <div id="globeViz"></div>

    <script>
        let selectedCountry = null;

        const world = Globe()
            (document.getElementById('globeViz'))
            .backgroundColor('rgba(0, 0, 0, 0)')

            .globeImageUrl((() => {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');

                const gradient = ctx.createLinearGradient(0, 0, 0, 256); // Crea un gradiente verticale
                gradient.addColorStop(0, '#92400e'); // Posizione 0% = marrone scuro
                gradient.addColorStop(1, '#f59e0b'); // Posizione 100% = arancione

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 256, 256);
                return canvas.toDataURL(); // Converte il contenuto del canvas in una stringa **data URL**
            })())

            // Cambio colore paese selezionato
            .polygonCapColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return 'rgb(245, 158, 11)';
                }
                return 'rgb(189, 129, 58)';
            })
            
            // Cambio colore bordo paese selezionato
            .polygonStrokeColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return '#ac5b12';
                }
                return '#fde68a';
            })
            
            // Cambio colore lati paese selezionato
            .polygonSideColor((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return 'rgb(217, 119, 87)';
                }
                return 'rgba(0, 0, 0, 0)';
            })
            
            // Il paese selezionato si solleva dalla superficie
            .polygonAltitude((polygon) => {
                if (selectedCountry && polygon.properties.ADMIN === selectedCountry) {
                    return 0.02;
                }
                return 0.01;
            })

            // Imposta lo zoom iniziale, viene impostata anche la durata delle transizione 0 = istantaneo
            .pointOfView({ altitude: 2 }, 0)

            .onPolygonClick((polygon) => {
                const countryName = polygon.properties.ADMIN;
                selectedCountry = countryName;

                // Trucco per forzare il re-rendering del globo e visualizzare i cambiamenti al click
                world.polygonsData(world.polygonsData());

                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage(countryName);
                } else {
                    console.log("Cliccato su:", countryName);
                }
            });

        // Dati coordinate geografiche dei confini (contiene nome del paese ADMIN, codice ISO, ecc)
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                // Passando i dati a .polygonsData(), il globo sa quali poligoni disegnare sulla sfera
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
    <View className="flex-1">
      <View className="basis-3/5">
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
      </View>
      <View className="basis-2/5">
        <Text className='text-center text-2xl font-bold'>{country}</Text>
      </View>
    </View>
  );
}