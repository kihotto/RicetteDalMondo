import { View, Text, Pressable, Button, FlatList } from 'react-native';
import { useRouter, Link } from 'expo-router';
export default function WelcomePage() {
  const router = useRouter();
  return (
    <>
      <Link href={'/(tabs)'} asChild>
        <Pressable
          role="button"
          className="mx-auto my-2 flex h-[80] w-[40%] flex-row items-center justify-center border-4 border-black bg-cyan-300 active:bg-red-600">
          <View pointerEvents="none" className="flex h-full w-full items-center justify-center ">
            <Text accessible={false} className={` text-center  font-bold `}>
              cliccami
            </Text>
          </View>
        </Pressable>
      </Link>
    </>
  );
}
