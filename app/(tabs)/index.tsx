import { useState } from 'react';
import { View, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import ListaRicette from '../../components/ListaRicette';
import Mappamondo from 'components/Mappamondo';

export default function WelcomePage() {
  const [country, setCountry] = useState<string>('');
  console.log(country);
  return (
    <View className="flex-1">
      <View className="basis-3/5">
        <Mappamondo setCountryID={setCountry} />
      </View>
      {/* Se è stato selezionato un paese, mostra la lista delle ricette per quel paese. Flex-1 = 50% pagina */}
      <View className="flex-1">{country !== '' && <ListaRicette country={country} />}</View>
    </View>
  );
}
