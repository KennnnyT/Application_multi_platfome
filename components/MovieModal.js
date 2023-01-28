import React from 'react';
import { ImageBackground, Modal, StyleSheet, View } from 'react-native';
import AddMovieForm from './AddMovieForm';

export default function MovieModal({ isVisible, onClose, movies, movie }) {

    const handleSubmit = movie => {
        // Envoyer les données du film vers l'API ou l'enregistrer dans l'état de l'application
        onClose();
    }

    return (
        <Modal visible={isVisible}>
            <ImageBackground source={require('../assets/ynn.jpeg')} style={styles.container}>

                <View style={styles.formContainer}>
                    <AddMovieForm movie={movie} onClose={onClose} onSubmit={handleSubmit} movies={movies} />

                </View>
            </ImageBackground>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    text: {
        color: 'white',
    },
});
