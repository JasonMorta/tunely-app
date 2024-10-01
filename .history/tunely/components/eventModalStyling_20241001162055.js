// eventModalStyling.js
import { StyleSheet } from "react-native";

// Styles for the modal components
const styles = StyleSheet.create({
  // Modal positioning and backdrop
  modal: {
    justifyContent: 'flex-end', // Position the modal at the bottom
    margin: 0, // Remove default margins
  },
  
  // Modal content container
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
    maxHeight: '80%', // Prevent modal from taking full screen height
  },
  
  // Drag handle to indicate swipe-down gesture
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  
  // Event image styling
  modalImage: {
    width: '100%',
    height: 200, // Fixed height for consistency
    borderRadius: 10, // Rounded corners for the image
    marginBottom: 15,
    resizeMode: 'cover', // Ensure the image covers the entire area
    // Shadow for the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android shadow
  },
  
  // Title text styling
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center the title text
  },
  
  // Subtitle text styling
  modalSubtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center', // Center the subtitle text
  },
  
  // Description text styling
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center', // Center the description text
  },
  
  // Container for the buttons
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space between buttons
    alignItems: 'center', // Vertically align buttons
    marginTop: 0,
  },
  
  // Close button styling
  closeButton: {
    backgroundColor: '#E37383', // Example color (light red/pink)
    padding: 15,
    borderRadius: 8,
    width: '48%', // Adjust width to fit two buttons side by side
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    // Shadow for the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3, // Elevation for Android shadow
  },
  
  // Directions button styling
  directionsButton: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center', // Vertically center the content
    backgroundColor: '#007BFF', // Example color (blue)
    padding: 15,
    borderRadius: 8,
    width: '48%', // Adjust width to fit two buttons side by side
    justifyContent: 'center', // Center content horizontally
    // Shadow for the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3, // Elevation for Android shadow
  },
  
  // Directions button image (icon) styling
  directionsImage: {
    width: 24,
    height: 24,
    marginRight: 8, // Space between icon and text
    resizeMode: 'contain',
  },
  
  // Button text styling
  buttonText: {
    color: 'white', // White text for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
