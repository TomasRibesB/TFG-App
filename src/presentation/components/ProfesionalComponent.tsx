import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {CardContainer} from './CardContainer';

interface Props {
  title: string;
  name: string;
  lastName: string;
}

export const ProfesionalComponent = ({title, name, lastName}: Props) => {
  return (
    <CardContainer title={title}>
      <View style={styles.container}>
        <Text variant="headlineMedium">
          {name} {lastName}
        </Text>
        <Avatar.Icon
          size={70}
          icon="accessibility-outline"
          style={styles.avatar}
        />
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
