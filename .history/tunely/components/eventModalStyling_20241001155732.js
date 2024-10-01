import { StyleSheet } from "react-native";

// Styles for the modal components
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Transparent dark background
        // set modal shadow for both iOS and Android
    // Android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContent: {
    width: '100%',
    height: '80%', // Modal takes up 80% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: "40%",


    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    // Position the image settings
    resizeMode: 'cover', 

  },
  textContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  directionsButton: {
    marginTop: 10,
    // backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: '#E37383',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});


export default styles;