/// InfoCard.tsx
import React from 'react';
import { View, Image, Text, ImageSourcePropType } from 'react-native';
interface Props {
  /**
   * Card informativa per ricette con icona, valore e descrittore.
   *
   * @example
   * // Con Ionicons
   * <InfoCard
   *   icon={<Ionicons name="time-outline" size={40} />}
   *   value={number}
   *   identifier="string"
   * />
   *
   * @example
   * // Con asset locale
   * <InfoCard
   *   icon={require('./assets/time.png')}
   *   value={number}
   *   identifier="string"
   * />
   *
   * @example
   * // Con URL remoto
   * <InfoCard
   *   icon="https://backend.com/icon.png"
   *   value={number}
   *   identifier="string"
   * />
   */
  icon: React.ReactNode | ImageSourcePropType | string;
  preText?: string;
  value?: number | string | undefined;
  identifier?: string;
  overrideW?: string;
}

export default function ({ icon, value, identifier = '', preText, overrideW }: Props) {
  const renderIcon = () => {
    switch (true) {
      case React.isValidElement(icon):
        return icon;
      case typeof icon === 'string':
        return (
          <Image
            source={{ uri: icon as string }}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        );
      case typeof icon === 'number':
        return (
          <Image
            source={icon as ImageSourcePropType}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
  };
  return (
    /* Container */
    <View
      className={`h-[30] min-w-[100] flex-1 flex-row items-center gap-1 overflow-hidden rounded-full border-2 ${overrideW ?? ''} bg-[#f4f4f4]/95`}
      style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      }}>
      {/* icona */}
      <View
        style={{ height: 30, width: 30 }}
        className=" mr-1 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)]">
        {renderIcon()}
      </View>

      <View className="w-full flex-1 flex-col">
        <View className="flex-row gap-1">
          <Text
            style={{ fontSize: 12, fontWeight: '700', color: 'black' }}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            numberOfLines={1}>
            {preText}
          </Text>
          <Text
            style={{ fontSize: 12, fontWeight: '700', color: 'black' }}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            numberOfLines={1}>
            {value}
          </Text>
          {identifier !== '' && (
            <Text
              style={{ fontSize: 12, fontWeight: '700', color: 'black' }}
              className="uppercase"
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              numberOfLines={1}>
              {identifier}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
