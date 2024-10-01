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
    width: '100%',
    height: '190%', // Modal takes up 80% of the screen height
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Padding can be adjusted as needed
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
    maxHeight: '90%', // Prevent modal from taking full screen height
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
    height: "30%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    contentFit: 'cover', 
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
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-evenly', // Evenly space buttons
    alignItems: 'center', // Vertically align buttons
    marginTop: 0,
    width: '100%', // Ensure buttons take full width
  },
  
  // Close button styling
  closeButton: {
    width: '48%', // Adjust width to fit two buttons side by side
    backgroundColor: '#E37383', // Example color (light red/pink)
    padding: 15,
    borderRadius: 8,
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
    backgroundColor: '#fff', // Example color (blue)
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 8,
    width: 'fit-content', // Adjust width to fit two buttons side by side
    justifyContent: 'center', // Center content horizontally
    // Shadow for the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 3.84,
    elevation: 3, // Elevation for Android shadow
  },
  
  // Directions button image (icon) styling
  directionsImage: {
    width: 45,
    height: 45,
    margin: 0, // Space between icon and text
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
