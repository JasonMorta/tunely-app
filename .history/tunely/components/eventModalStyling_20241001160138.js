// eventModalStyling.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    // Add other styles as needed
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Space between buttons
    alignItems: 'center', // Vertically align buttons
    marginTop: 20,
  },
  directionsButton: {
    flexDirection: 'row', // To place icon and text side by side
    alignItems: 'center',
    backgroundColor: '#007BFF', // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up equal space
    marginRight: 10, // Space between buttons
  },
  directionsImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
  closeButton: {
    backgroundColor: '#6c757d', // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up equal space
    marginLeft: 10, // Space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
