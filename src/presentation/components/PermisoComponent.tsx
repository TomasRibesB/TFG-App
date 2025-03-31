import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Menu} from 'react-native-paper';
import {CardContainer} from './CardContainer';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {PermisoDocumento} from '../../infrastructure/interfaces/permiso-documento';
import {
  deletePermisoDocumentoRequest,
  setPermisoDocumentoRequest,
} from '../../services/salud';

export const PermisoComponent = () => {
  const [permiso, setPermiso] = useState<Partial<PermisoDocumento> | null>(
    null,
  );
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchPermiso();
  }, []);

  const fetchPermiso = async () => {
    const permisos = await StorageAdapter.getItem('permisos');
    if (permisos && permisos.id) {
      setPermiso(permisos);
    } else {
      setPermiso(null);
    }
  };

  const handleCopyLink = () => {
    if (permiso?.code) {
      const link = `http://localhost:5173/auth/upload/${permiso.code}`;
      Clipboard.setString(link);
    }
  };

  const handleCopyCode = () => {
    if (permiso?.code) {
      Clipboard.setString(permiso.code);
    }
  };

  const handleDelete = async () => {
    await deletePermisoDocumentoRequest();
    setPermiso(null);
  };

  const handleCreate = async () => {
    const data: Partial<PermisoDocumento> = await setPermisoDocumentoRequest();
    await StorageAdapter.setItem('permisos', data);
    setPermiso(data);
  };

  return (
    <CardContainer
      title="Permiso para Profesionales Externos"
      icon="document-lock-outline">
      {permiso ? (
        <>
          <TextInput
            label="Código para subir documento"
            value={permiso.code || ''}
            mode="outlined"
            editable={false}
            selectTextOnFocus={false}
            style={{marginBottom: 10}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button
                  mode="contained"
                  onPress={() => setMenuVisible(true)}
                  icon="copy-outline">
                  Copiar
                </Button>
              }>
              <Menu.Item
                onPress={() => {
                  handleCopyLink();
                  setMenuVisible(false);
                }}
                leadingIcon="link-outline"
                title="Link"
              />
              <Menu.Item
                onPress={() => {
                  handleCopyCode();
                  setMenuVisible(false);
                }}
                leadingIcon="code-outline"
                title="Código"
              />
            </Menu>
            <Button mode="outlined" onPress={handleDelete} icon="trash-outline">
              Eliminar
            </Button>
          </View>
        </>
      ) : (
        <Button
          mode="contained"
          icon="document-attach-outline"
          onPress={handleCreate}>
          Crear codigo de subida de documentos
        </Button>
      )}
    </CardContainer>
  );
};
