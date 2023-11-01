import { useContext } from 'react'
import { router } from 'expo-router';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input } from '../app/components/Input'
import { ScrollView } from 'react-native-gesture-handler';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup"
import { AuthContext } from '../src/contexts/AuthContext';


type PropsData = {
    name: string;
    email: string;
    date: Date;
    gender: string;
    document: string;
    university: string;
    password: string;
}
export default function Register() {

    const { signUp, loadingAuth } = useContext(AuthContext);

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório.'),
        email: Yup.string()
            .email('Digite um e-mail válido.')
            .required('O e-mail é obrigatório.'),
        date: Yup.date().required('Data de nascimento obrigatória.'),
        gender: Yup.string().required('Informe seu gênero'),
        document: Yup.string().required('Numero do documento é obrigatório.'),
        university: Yup.string().required('Infome a sua universidade.'),
        password: Yup.string()
            .required('A senha é obrigatória.')
            .min(6, 'A senha deve ter pelo menos 6 digítos.')
    })

    const
        { control,
            handleSubmit,
            formState: { errors } } = useForm<PropsData>({ resolver: yupResolver<any>(schema) })

    async function handleRegister(data: PropsData) {
        console.log(data)
        await signUp(data)
    }

    return (
        <ScrollView className='flex-1 bg-[#C6D7FF] '>
            <View className='pt-16 mb-11 pl-4'>
                <Text className='text-2xl font-bold text-[#263238]'>Registre-se</Text>
            </View>

            <View className='bg-white flex-1 px-5 rounded-t-3xl'>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'Infome seu nome' }}
                    render={({ field: { onChange } }) => (
                        <Input label='Nome' placeholder="Jose" error={errors.name?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange } }) => (
                        <Input label='Email' placeholder='Ex:email@email.com' error={errors.email?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="date"
                    render={({ field: { onChange } }) => (
                        <Input label='Data de Nascimento' placeholder='YYYY-MM-DD' error={errors.date?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange } }) => (
                        <Input label='Sexo' error={errors.gender?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="document"
                    render={({ field: { onChange } }) => (
                        <Input label='Documento' error={errors.document?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="university"
                    render={({ field: { onChange } }) => (
                        <Input label='Universitade' error={errors.university?.message} onChangeText={onChange} />
                    )} />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange } }) => (
                        <Input label='Senha' placeholder='*******' error={errors.password?.message} secureTextEntry={true} onChangeText={onChange} />
                    )} />

                <TouchableOpacity
                    onPress={handleSubmit(handleRegister)}
                    className='bg-[#263238] mt-5 w-6/12 mx-auto rounded'>

                    {loadingAuth ?
                        (<ActivityIndicator size={30} color='#FFF' />) : (
                            <Text className=' text-white text-xl font-bold text-center py-2'>
                                Registrar
                            </Text>
                        )
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { router.replace('/sign-in'); }}
                    className='my-7 mx-auto'>
                    <Text className='text-base'>Já possui uma conta? Faça Login.</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}