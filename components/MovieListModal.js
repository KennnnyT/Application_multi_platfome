import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, PixelRatio } from 'react-native';
import MovieModal from './MovieModal';


const MovieListModal = ({ movies, onClose }) => {
  const [search, setSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredMovies(
      movies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()))
    );
  };

  function handleEdit(item) {
    setSelectedMovie(item);
    setIsMovieModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un film..."
        onChangeText={handleSearch}
        value={search}
      />
      <Text style={styles.header}>Liste des films</Text>
      <FlatList
        contentContainerStyle={{ paddingTop: 30 }}
        data={filteredMovies}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => handleEdit(item)}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieYear}>{item.year}</Text>
            <Text style={styles.movieDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>

      {isMovieModalVisible && selectedMovie && (
        <MovieModal movie={selectedMovie} isVisible={isMovieModalVisible} onClose={() => setIsMovieModalVisible(false)} movies={movies} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#282c34',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  searchBar: {
    marginTop: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%'
  },
  header: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10
  },
  itemContainer: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100
  },
  movieTitle: {
    color: 'white',
    fontSize: 18
  },
  movieYear: {
    color: 'white',
    fontSize: 14
  },
  movieDescription: {
    color: 'white',
    fontSize: 12
  },
  backButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end'
  },
  backButtonText: {
    color: 'black',
    fontSize: 12


  }
});

export default MovieListModal;
