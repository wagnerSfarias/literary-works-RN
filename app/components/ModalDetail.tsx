import { Text, View, TouchableOpacity} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons'

interface ModalProps{
  closeModal: () => void;
}

export function ModalDetail({closeModal}:ModalProps) {

  return (
    <View className='flex-1 mt-3 bg-[#fff]'>
      <TouchableOpacity onPress={closeModal} className='w-14 h-14 ml-3 mt-2 flex items-center justify-center rounded-full bg-[#466ab7]'>
      <Text>
         <Icon name='close' size={28}/>
      </Text>
      </TouchableOpacity>

      <Text className='text-center text-base'>Detalhes Modal</Text>
    </View>
  );
}