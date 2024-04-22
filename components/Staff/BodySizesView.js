import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const BodySizesView = ({ item }) => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={styles.container}>
            <List.Accordion
                style={{ backgroundColor: '#fff' }}
                onPress={handlePress}
                rippleColor="#fff"
                expanded={expanded}
                title={
                    <Text variant="titleMedium">
                        Số đo
                    </Text>
                }

            >
                <View style={styles.columnContainer}>
                    {item &&
                        item.map((bodySizeItem, index) => (
                            <View style={styles.columnItem} key={index}>
                                <Text style={styles.itemText}>
                                    - {bodySizeItem.bodySize.name}: {bodySizeItem.value}
                                </Text>
                            </View>
                        ))}
                </View>
            </List.Accordion>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
    },
    columnItem: {
        width: '50%',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    itemText: {
        fontSize: 16,
    },
});

export default BodySizesView;
