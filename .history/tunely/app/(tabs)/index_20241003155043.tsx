import { ActivityIndicator } from 'react-native';

const EventItem: React.FC<EventItemProps> = ({ item, onPress }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const [imageError, setImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);

  // Log the image URL for debugging
  console.log(`Event ID: ${item.id}, Image URL: ${item.image}`);

  return (
    <Pressable style={styles.eventItem} onPress={() => onPress(item)}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item.image && !imageError && item.image.trim() !== ''
              ? { uri: item.image }
              : placeholderImage
          }
          style={styles.eventImage}
          resizeMode="cover"
          onError={(e) => {
            console.log(`Failed to load image for Event ID: ${item.id}`, e.nativeEvent.error);
            setImageError(true);
          }}
          onLoadEnd={() => setLoadingImage(false)}
        />
        {loadingImage && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="small"
            color="#0000ff"
          />
        )}
      </View>
      <View style={styles.eventDetails}>
        <ThemedText style={styles.eventTitle}>{item.artist_name}</ThemedText>
        <ThemedText>{item.date} - {item.time}</ThemedText>
        <ThemedText>Venue: {item.venue}</ThemedText>
      </View>
    </Pressable>
  );
};

const getStyles = (colorScheme: any) => StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colorScheme === 'dark' ? tintColorLight : tintColorDark,
    paddingVertical: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  eventDetails: {
    marginLeft: 10,
    flex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
