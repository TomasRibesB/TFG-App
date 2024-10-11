import {View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {CardContainer} from './CardContainer';

export const TicketComponent = () => {
  return (
    <CardContainer title="Tickets" icon="chatbox-outline">
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <IconButton icon="arrow-forward-outline" size={20} mode="contained" />
      </View>
    </CardContainer>
  );
};
