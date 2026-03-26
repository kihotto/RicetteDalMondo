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
  const Sizes = {
    icon: 30,
    containerH: 30,
    containerW: 100,
    text: 12,
  };
  const renderIcon = () => {
    switch (true) {
      case React.isValidElement(icon):
        return icon;
      case typeof icon === 'string':
        return (
          <Image
            source={{ uri: icon as string }}
            style={{ width: Sizes.icon, height: Sizes.icon }}
            resizeMode="contain"
          />
        );
      case typeof icon === 'number':
        return (
          <Image
            source={icon as ImageSourcePropType}
            style={{ width: Sizes.icon, height: Sizes.icon }}
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
  };
  return (
    <View
      className={`flex-row items-center rounded-full border-2 bg-[#f4f4f4]/75 px-0 ${overrideW} overflow-hidden`}
      style={{
        height: Sizes.containerH,
        width: Sizes.containerW,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      }}>
      {/* icona */}
      <View
        style={{ height: Sizes.icon, width: Sizes.icon }}
        className=" mr-1 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)]">
        {renderIcon()}
      </View>

      <View className="w-full flex-1 flex-col">
        <View className="flex-row items-center gap-1" style={{ flexWrap: 'wrap' }}>
          <Text style={{ fontSize: Sizes.text, fontWeight: '700', color: 'black' }}>{preText}</Text>
          <Text style={{ fontSize: Sizes.text, fontWeight: '700', color: 'black' }}>{value}</Text>
          {identifier !== '' && (
            <Text
              style={{ fontSize: Sizes.text, fontWeight: '700', color: 'black' }}
              className="text-sm uppercase">
              {identifier}
            </Text>
          )}

          {/* NUMBER  */}
          {/* "min"|"ore"  */}
        </View>
      </View>
    </View>
  );
}
