import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {CardContainer} from './CardContainer';
import {useNavigation} from '@react-navigation/native';
import {MainStackParams} from '../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
export const TicketComponent = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();
  return (
    <CardContainer title="Tickets" icon="chatbox-outline">
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <IconButton
          icon="arrow-forward-outline"
          size={20}
          mode="contained"
          onPress={() => navigation.navigate('TicketListScreen')}
        />
      </View>
    </CardContainer>
  );
};
