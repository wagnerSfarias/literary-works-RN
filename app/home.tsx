import { router } from 'expo-router';
import { Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';

export default function Home() {
    return (
        <View className='flex flex-1 items-center bg-[#e4e1e1]'>
            <StatusBar />
            <Image source={require('../src/assets/home.png')} className='object-cover my-10 w-4/5 h-2/4 ' />
            <View className='flex items-center w-9/12'>
                <Text className='text-lg text-[#407BFF] font-black text-center'>Publique suas obra de maneira rápida e fácil. </Text>
            </View>
            <TouchableOpacity className="bg-[#407BFF] w-24 h-12 flex items-center justify-center my-10 rounded-lg " onPress={() => { router.replace('/sign-in'); }}>
                <Text className='text-white text-lg'
                    onPress={() => {
                        router.replace('/sign-in');
                    }}>
                    Iniciar
                </Text>
            </TouchableOpacity>

        </View>
    );
}