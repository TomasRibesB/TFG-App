import React from 'react';
import {MainLayout} from '../../layouts/MainLayout';
import {Avatar, Text} from 'react-native-paper';
import {CardContainer} from '../../components/CardContainer';
import {View, StyleSheet} from 'react-native';
import { TicketComponent } from '../../components/TicketComponent';

export const GimnasioScreen = () => {
  return (
    <MainLayout>
      <CardContainer title="Entrenador">
        <View style={styles.container}>
          <Text>Tomás Ribes</Text>
          <Avatar.Icon size={70} icon="accessibility-outline" style={styles.avatar} />
        </View>
      </CardContainer>
      <TicketComponent />
    </MainLayout>
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