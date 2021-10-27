import { StatusBar } from 'expo-status-bar';
import React ,{ useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from 'react-native';

export default function App() {

    const [estado, setarEstado] = useState('leitura');
    const [anotacao, setarAnotacao]= useState('');

    useEffect(()=>{
      (async()=>{
        try{
          const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
            setarAnotacao(anotacaoLeitura);
        }catch(error){}
      });
    },[])

    setData = async()=>{
      try{
        await AsyncStorage.setItem('anotacao',anotacao);
      }catch(error){

      }
      alert('Salva');
    }

    function atualizarTexto(){
      setarEstado('leitura')
      setData();
    }

    if (estado == 'leitura'){
    return (


      <View style={{flex:1}}>
        <StatusBar style='light' />
        <View style={styles.header}><Text style={{marginTop:10, textAlign:'center',color:'white',fontSize:22}}>Aplicativo de Anotação</Text></View>
        {
          (anotacao != '')?
        <View style= {{padding:20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
        :
        <View style= {{padding:20}}><Text style={{opacity:0.3, textAlign:'center', marginTop:250,}}>💔💔Nenhuma anotação encontrada 💔💔</Text></View>
        }
        <TouchableOpacity onPress={() => setarEstado('atualizar')} 
          style={styles.btnAnotacao}>
            {
            (anotacao=='')?
          <Text style={styles.btnAnotacaotext}>+</Text>
          :
          <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:16}}>Editar</Text>
            }
          </TouchableOpacity>
            
          </View>
    )
  }else if (estado== 'atualizar'){  
    
    return (
      <View style={{flex:1}}>
        <StatusBar hidden />
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:22}}>Aplicativo  Anotação</Text></View>
          
          <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:8, height:300,textAlignVertical:'top'}} multiline={true} numberOfLines ={6} value = {anotacao}></TextInput>

        <TouchableOpacity onPress={() =>atualizarTexto()} style={styles.btnSalvar}><Text style={{textAlign:'center',color:'white',fontSize:16}} >Salvar</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    width:'100%',
    padding:17,
    backgroundColor: '#069'
  },
  anotacao:{
    fontSize:13,
  },
  btnAnotacao:{
    position:'absolute',
    right:20,
    bottom:50,
    width:50,
    height:50,
    backgroundColor:'#069',
    borderRadius:25,
  },
  btnAnotacaotext:{
    color: 'white',
    position:'relative',
    textAlign:'center',
    top:3,
    fontSize:30,
  },
  btnSalvar:{
    position:'absolute',
    right:20,
    bottom:50,
    width:100,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#069',
  },

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});