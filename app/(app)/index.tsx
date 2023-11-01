import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import api from '../../src/services/api';

import {SafeAreaView, Text, View, FlatList } from 'react-native';
import { ListWork } from '../components/ListWork';

export default function Index() {
const [works, setWorks] = useState()

  useEffect(()=>{
    async function loadWork(){
      const response = await api.get('/publications');
      setWorks(response.data)
    }
    loadWork()
  },[])

const teste = [
  {id:'1',name:'teste', url: 'https://google'}, 
  {id:'2',name:'teste', url: 'https://google'},
  {id:'3',name:'teste', url: 'https://google'}]
  return (
    <SafeAreaView>
      <FlatList
        data={works}
        keyExtractor={(item) => item.id}
        renderItem={ ({item})=> <ListWork data={item}/>}
      />
    </SafeAreaView>
  );
}