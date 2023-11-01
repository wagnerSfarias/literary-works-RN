import { View, Text, TouchableOpacity, Image, Modal } from "react-native"
import { useState } from "react"

import { ModalDetail } from './ModalDetail'


export function ListWork({ data }) {
    const urlTeste = `https://hips.hearstapps.com/hmg-prod/images/pile-of-books-with-pages-open-by-wind-royalty-free-image-1600785994.jpg?crop=0.79555xw:1xh;center,top&resize=2048:*`
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <TouchableOpacity className="border mb-5" activeOpacity={0.7} onPress={() => setModalVisible(true)}>
            <Image className='object-cover w-full h-[200px] '
                source={{ uri: urlTeste }} />
            <View>
                <Text>{data.title}</Text>
                <Text>{new Date(data.date_publication).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                </Text>
            </View>
            <Modal visible={modalVisible}
                transparent={true}>
                <ModalDetail
                    closeModal={() => setModalVisible(false)} />
            </Modal>
        </TouchableOpacity>
    )
}