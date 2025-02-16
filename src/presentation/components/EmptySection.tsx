import { View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
    label: string;
    icon: string;
}

export const EmptySection = ({label, icon}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon name={icon} size={70} style={{opacity: 0.5}} />
      <Text variant="labelLarge" style={{opacity: 0.5}}>
        {label}
      </Text>
    </View>
  );
};
