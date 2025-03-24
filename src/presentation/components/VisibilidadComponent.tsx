import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Divider,
  IconButton,
  Menu,
  Portal,
  Checkbox,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface VisibilityProps {
  // El objeto debe tener una propiedad "visibilidad" de tipo User[]
  item: {visibilidad: any[]};
  // Lista de usuarios disponibles para agregar o quitar de la visibilidad.
  profesionales: any[];
  // Función callback para actualizar el objeto: documento, rutina o plan nutricional.
  onUpdate: (updatedItem: any) => void;
}

export const VisibilityComponent = ({
  item,
  profesionales,
  onUpdate,
}: VisibilityProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleIconButtonPress = (event: any) => {
    setAnchorPosition({x: event.nativeEvent.pageX, y: event.nativeEvent.pageY});
    openMenu();
  };

  const toggleProfesional = (profesional: any) => {
    const currentVisibility = item.visibilidad || [];
    const index = currentVisibility.findIndex(p => p.id === profesional.id);
    let updatedVisibility;
    if (index > -1) {
      updatedVisibility = [...currentVisibility];
      updatedVisibility.splice(index, 1);
    } else {
      updatedVisibility = [...currentVisibility, profesional];
    }
    onUpdate({...item, visibilidad: updatedVisibility});
  };

  return (
    <View>
      <Divider style={{marginVertical: 8}} />
      <View style={styles.visibilityHeader}>
        <Text variant="bodySmall" style={styles.visibilityTitle}>
          Visibilidad:
        </Text>
        <IconButton
          icon="menu-outline"
          size={24}
          onPress={handleIconButtonPress}
        />
      </View>
      <View style={styles.visibility}>
        {item.visibilidad &&
          item.visibilidad.map((profesional, idx) => (
            <View key={idx} style={styles.profesionalInfo}>
              <Icon
                name="person-circle-outline"
                size={24}
                style={{marginRight: 3}}
              />
              <Text>
                {profesional.firstName} {profesional.lastName}
              </Text>
            </View>
          ))}
      </View>
      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={{x: anchorPosition.x, y: anchorPosition.y}}>
          {profesionales.length > 0 &&
            profesionales.map(profesional => (
              <Menu.Item
                key={profesional.id}
                onPress={() => {
                  toggleProfesional(profesional);
                  closeMenu();
                }}
                title={`${profesional.firstName} ${profesional.lastName}`}
                trailingIcon={() => (
                  <Checkbox
                    status={
                      item.visibilidad &&
                      item.visibilidad.some((p: any) => p.id === profesional.id)
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                )}
              />
            ))}
        </Menu>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  visibilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visibilityTitle: {
    fontWeight: 'bold',
  },
  visibility: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    alignItems: 'center',
  },
  profesionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
});
