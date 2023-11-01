import { router } from 'expo-router';
import { useContext } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Keyboard, ActivityIndicator, Alert } from 'react-native';
import { Input } from '../app/components/Input'
import { AuthContext } from '../src/contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"

type PropsData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signIn, loadingAuth } = useContext(AuthContext);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter pelo menos 6 digítos.')
  })


  const
    { control,
      handleSubmit,
      formState: { errors } } = useForm<PropsData>({ resolver: yupResolver<any>(schema) })

  async function handleLogin(data: PropsData) {

    await signIn(data)
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView className='flex-1 bg-[#C6D7FF] '>

      <View className='pt-12 mb-11 pl-4'>
        <Text className='text-2xl font-bold text-[#263238]'>Bem Vindo(a)</Text>
      </View>

      <View className='bg-white flex-1 px-5 rounded-t-3xl'>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input label='Email' placeholder="Ex:email@email.com" error={errors.email?.message} onChangeText={onChange} />
          )} />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input label='Senha' placeholder="*******" secureTextEntry={true} error={errors.password?.message} onChangeText={onChange} />
          )} />


        <TouchableOpacity onPress={handleSubmit(handleLogin)}
          className='bg-[#263238] mt-5 w-6/12 mx-auto rounded py-2'>
          {loadingAuth ? (
            <ActivityIndicator size={30} color='#FFF' />
          ) : (
            <Text className=' text-white text-xl font-bold text-center py-1'>
              Acessar
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          router.replace('/register');
        }} className='mt-7 mx-auto'>
          <Text className='text-base'>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}