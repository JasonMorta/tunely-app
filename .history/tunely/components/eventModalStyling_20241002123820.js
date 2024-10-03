// eventModalStyling.js
import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const primaryColor = "#E37380";

const baseModalText = {
  fontSize: 16,
  marginBottom: 8,
  textAlign: 'center',
};

// Styles for the modal components
const getStyles = (colorScheme) => StyleSheet.create({
  // Modal positioning and backdrop
  modal: {
    justifyContent: 'flex-end', // Position the modal at the bottom
    margin: 0, // Remove default margins
  },
  
  // Modal content container
  modalContent: {
    width: '100%',
    height: 'fit-content', // Modal takes up 80% of the screen height
    backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Padding can be adjusted as needed
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'start',
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
    height: "40%",
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
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center the title text
  },
  modalDate: {
    textAlignVertical: 'left',
    ...baseModalText,
  },
  modalTime: {
    ...baseModalText,
  },
  modalVenue: {
    ...baseModalText,
  },
  modalLocation: {
    ...baseModalText,
  },
  modalDescription: {
    ...baseModalText,
    textAlign: 'left',
  },

  // Description text styling
  modalDescription: {
    fontSize: 14,
    color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    marginBottom: 20,
    textAlign: 'left', // Center the description text
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
    backgroundColor: primaryColor, // Example color (light red/pink)
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
    backgroundColor: colorScheme === 'dark' ? Colors.dark.primary : Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colorScheme === 'dark' ? Colors.dark.primary : Colors.light.primary,
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

export default getStyles;
