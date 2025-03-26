import {StyleSheet, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {CardContainer} from './CardContainer';
import {getUserImageRequest} from '../../services/user';
import {User} from '../../infrastructure/interfaces/user';

interface Props {
  title: string;
  profesional: Partial<User>;
}

export const ProfesionalComponent = ({title, profesional}: Props) => {
  return (
    <CardContainer title={title}>
      <View style={styles.container}>
        <Text variant="headlineMedium">
          {profesional?.firstName} {profesional?.lastName}
        </Text>
        {profesional.hasImage ? (
          <Avatar.Image
            size={70}
            source={{
              uri: getUserImageRequest(profesional.id!, new Date()),
            }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon
            size={70}
            icon="accessibility-outline"
            style={styles.avatar}
          />
        )}
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
