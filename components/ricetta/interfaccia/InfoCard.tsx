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
  value: number | string | undefined;
  identifier?: string;
}

export default function ({ icon, value = 0, identifier = '' }: Props) {
  const Sizes = {
    icon: 30,
    containerH: 120,
    containerW: 60,
    text: 13,
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
      className=" flex-col items-center gap-3  rounded-full border-2 bg-[#f2994a]/85 px-2  pb-6 pt-2"
      style={{
        height: Sizes.containerH,
        width: Sizes.containerW,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      }}>
      <View className="h-12 w-12 items-center justify-center rounded-full border border-black bg-[#eceff1]/40 ">
        {renderIcon()}
      </View>

      <View className="w-full flex-1 flex-col items-center justify-center ">
        <Text className=" font-bold capitalize" style={{ fontSize: Sizes.text }}>
          {value}
        </Text>
        {/* NUMBER  */}
        {identifier !== '' && <Text className="text-sm uppercase">{identifier}</Text>}
        {/* "min"|"ore"  */}
      </View>
    </View>
  );
}
