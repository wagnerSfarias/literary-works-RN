import { Redirect, Stack } from 'expo-router';
import{ useContext} from 'react'
import { Text } from 'react-native';
import { BtnLogout } from '../components/BtnLogout';
import { AuthContext } from '../../src/contexts/AuthContext';


export default function AppLayout() {
  const { user, loading, signOut } = useContext(AuthContext);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {

    return <Redirect href="/home" />;
  }

  return <Stack screenOptions={{
    headerTitle:'',
    headerStyle:{
      backgroundColor:'#C6D7FF',
    },
    statusBarColor:'#C6D7FF',
    statusBarStyle:'dark',
    headerRight:()=> <BtnLogout />
  }}
  >
    {/* <Stack.Screen name='index'
    // options={{presentation:'modal'}}    
    />
    <Stack.Screen name='modal'
    // options={{presentation:'modal'}}    
    /> */}
  </Stack>
    ;
}
