import { TouchableOpacity} from "react-native"
import{ useContext} from 'react'
import { AuthContext } from '../../src/contexts/AuthContext';
import Icon from '@expo/vector-icons/MaterialIcons'

export function BtnLogout() {
    const { signOut} = useContext(AuthContext);
    return (
        <TouchableOpacity onPress={signOut}>
            <Icon name='logout' size={28}/>
        </TouchableOpacity>
    )
}