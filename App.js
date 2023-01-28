import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import AddButton from './components/AddButton';
import MovieModal from './components/MovieModal';
import MovieListModal from './components/MovieListModal';
import Fire from './Fire';


export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieListModalVisible, setMovieListModalVisible] = useState(false);

  useEffect(() => {
    const firebase = new Fire();
    firebase.getMovies(movies => {
      setMovies(movies)
      setLoading(false)
    })
  }, [])

  return (
    <ImageBackground
      source={require('./assets/yn.jpeg')}
      style={styles.container}>

      <View style={styles.circle}>
        <Text style={styles.text}> Bienvenue sur <Text style={styles.color_mymovie}>My Movie</Text></Text>
        <AddButton title="Ajouter un film" handlePress={() => setIsModalVisible(true)} />
        {isModalVisible && (
          <MovieModal movies={movies} isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        )}

      </View>

      <View>
        <TouchableOpacity style={styles.movieButtonContainer} onPress={() => setMovieListModalVisible(true)}>
          <Text style={styles.movieButtonText}>Voir films</Text>
        </TouchableOpacity>


        {movieListModalVisible && movies.length > 0 && (
          <Modal visible={movieListModalVisible}>
           <MovieListModal movies={movies} onClose={() => setMovieListModalVisible(false)} />
          </Modal>
        )}


      </View>
    </ImageBackground>
  );
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 190,
    height: 190,
    borderRadius: 190,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  color_mymovie: {
    color: '#FF7600'
  },
  movieButtonContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5
  },
  movieButtonText: {
    color: 'orange',
    textAlign: 'center',

  }

});
