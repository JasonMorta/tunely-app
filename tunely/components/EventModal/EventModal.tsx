// src/components/EventModal.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import { ThemedView } from '../ThemedView';
import EventSection from './EventSection';
import { EventData } from '../../types/EventTypes';
import { ThemedText } from '../ThemedText';
import PerformerSection from './PerformerSection';
import VenueSection from './VenueSection';

interface EventModalProps { 
  visible: boolean;
  event: EventData; // Ensure the event is of type EventData
  onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const EventModal: React.FC<EventModalProps> = ({ visible, event, onClose }) => {
  const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // Start off-screen
  const [isVisible, setIsVisible] = useState(visible);

  // Reference to prevent multiple animations
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Handle opening and closing animations
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      // Slide up animation
      animationRef.current = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false, // Changed to false for consistency
      });
      animationRef.current.start();
    } else if (isVisible) {
      // Slide down animation
      animationRef.current = Animated.timing(panY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false, // Changed to false for consistency
      });
      animationRef.current.start(() => {
        setIsVisible(false);
        onClose(); // Notify parent after animation completes
      });
    }
    // Cleanup on unmount
    return () => {
      animationRef.current?.stop();
    };
  }, [visible]);

  // PanResponder for swipe-down to close
  const panResponder = useRef(
    PanResponder.create({
      // Allow gesture only when swiping down
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only set responder if the gesture is a swipe down
        return (
          gestureState.dy > 0 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        );
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: panY },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          // Slide down and close
          Animated.timing(panY, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: false, // Changed to false for consistency
          }).start(() => {
            setIsVisible(false);
            onClose(); // Notify parent after animation completes
          });
        } else {
          // Return to original position
          Animated.timing(panY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false, // Changed to false for consistency
          }).start();
        }
      },
    })
  ).current;

  // Venue structure
  // 

  // Prevent rendering when not visible or when event is null
  if (!isVisible || !event) return null;

  return (
    <ThemedView style={styles.overlay}>
      <Animated.View
        style={[
          styles.modalContent,
          { transform: [{ translateY: panY }] },
        ]}
      >
        {/* Header with Drag Handle */}
        <ThemedView
          style={styles.header}
          {...panResponder.panHandlers} // Attach PanResponder to the header
        >
          <ThemedView style={styles.dragHandle} />
        </ThemedView>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} // Allow nested scrolling
        >
          {/* Performer Section */}
          <PerformerSection eventDetails={event} />

          {/* Event Sections */}
          <EventSection eventDetails={event} />

          {/* Venue Section (Uncomment if needed) */}
          <VenueSection venueDetails={event.VENUE} />

          {/* Spacer to ensure "BACK" button is reachable */}
          <ThemedView style={{ height: 20 }} />

          {/* Back Button */}
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {
              // Trigger closing animation
              Animated.timing(panY, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: false,
              }).start(() => {
                setIsVisible(false);
                onClose();
              });
            }} style={styles.backButton}>
              <ThemedText style={styles.buttonText}>BACK</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </Animated.View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Semi-transparent background
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    // Box shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    width: "100%",
    maxHeight: SCREEN_HEIGHT * 0.75,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#ff6347', // Example color, adjust as needed
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EventModal;
