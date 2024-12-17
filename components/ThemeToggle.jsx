import React, { useState } from 'react';
import { StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Pastikan menggunakan cara impor yang tepat

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            {isDarkMode ? (
                <Feather name="moon" size={24} color="black" />
            ) : (
                <Feather name="sun" size={24} color="orange" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
});