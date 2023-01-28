import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import AddButton from './AddButton';
import { Picker } from '@react-native-picker/picker';
import Fire from '../Fire';
import { useNavigation } from '@react-navigation/native';

const AddMovieForm = (props) => {

  const [title, setTitle] = useState(props.movie ? props.movie.title : '');
  const [year, setYear] = useState(props.movie ? props.movie.year : '');
  
  
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [movieListModalVisible, setMovieListModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (title && year && description) {
      setLoading(true);
      const movie = {
        image,
        title,
        year,
        description,
        comments: []
      };
      const firebase = new Fire()
      firebase.addMovie(movie);
      setLoading(false);
      props.onSubmit(movie);
    }
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Image</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
        />
        <Text style={styles.label}>Titre:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Text style={styles.label}>Année:</Text>
        <Picker
          selectedValue={year}
          onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
          style={styles.input}
        >
          {[...Array(23).keys()].map(i => {
            return <Picker.Item label={`${2000 + i}`} value={`${2000 + i}`} key={i} />
          })}
        </Picker>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          style={styles.input}
        />
        {loading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <AddButton
            title="Ajouter"
            handlePress={handleSubmit}
            style={styles.button}
          />
        )}
      </View>

      <View style={styles.moviebutton}>
        <Button
          title="Retour"
          onPress={props.onClose}
        />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  form: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'orange',
    color: 'black',
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },

  moviebutton: {

    padding: 20,
    marginBottom: 20,
    borderRadius: 5
  },
  movieButtonText: {
    color: 'orange',
    textAlign: 'center',

  }
});

export default AddMovieForm;
