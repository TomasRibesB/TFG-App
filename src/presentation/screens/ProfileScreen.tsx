import React, {useEffect, useState, Fragment} from 'react';
import {ScrollView, View, Image, StyleSheet, Alert} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Divider,
  IconButton,
  useTheme,
  Avatar,
} from 'react-native-paper';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {
  updateEmailRequest,
  updatePasswordRequest,
  uploadImageRequest,
  getUserImageRequest,
} from '../../services/user';
import {StorageAdapter} from '../../config/adapters/storage-adapter';
import {MainLayout} from '../layouts/MainLayout';
import {User} from '../../infrastructure/interfaces/user';
import {useAuth} from '../hooks/useAuth';

export const ProfileScreen = () => {
  const theme = useTheme();
  const [image, setImage] = useState<any>(null);
  const [user, setUser] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [flagUpdateImage, setFlagUpdateImage] = useState<Date | null>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const {deleteUser} = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const storedUser = await StorageAdapter.getItem('user');
    setUser(storedUser || {});
    setFirstName(storedUser?.firstName || '');
    setLastName(storedUser?.lastName || '');
    setEmail(storedUser?.email || '');
    setLoading(false);
  };

  const handleSaveChanges = async () => {
    if (!email) {
      setErrorEmail('El correo electrónico es obligatorio');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail('El correo electrónico no es válido');
      return;
    }
    if (email.length > 50) {
      setErrorEmail(
        'El correo electrónico no puede tener más de 50 caracteres',
      );
      return;
    }
    setLoading(true);
    const response = await updateEmailRequest(email);
    if (response) {
      await StorageAdapter.setItem('user', {...user, email});
      setErrorEmail('');
      fetchUser();
    } else {
      setErrorEmail('El correo electrónico ya está en uso');
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== repeatPassword) {
      setErrorPassword('Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6 || newPassword.length > 50) {
      setErrorPassword('La contraseña debe tener entre 6 y 50 caracteres');
      return;
    }
    setLoading(true);
    const response = await updatePasswordRequest(password, newPassword);
    if (response) {
      await StorageAdapter.setItem('user', {...user, password: newPassword});
      setPassword('');
      setNewPassword('');
      setRepeatPassword('');
      setErrorPassword('');
      fetchUser();
    } else {
      setErrorPassword('La contraseña actual es incorrecta');
    }
    setLoading(false);
  };

  const handleSelectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        setErrorImage(response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
        setErrorImage('');
      }
    });
  };

  const handleUploadImage = async () => {
    if (!image) {
      setErrorImage('Debe seleccionar una imagen');
      return;
    }
    setLoading(true);
    const response = await uploadImageRequest(image);
    if (response) {
      await StorageAdapter.setItem('user', {...user, hasImage: true});
      const flag = new Date();
      setFlagUpdateImage(flag);
      setUser({...user, hasImage: true});
      setImage(null);
      setErrorImage('');
      fetchUser();
    } else {
      setErrorImage('No se pudo subir la imagen');
    }
    setLoading(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    Alert.alert(
      'Eliminar cuenta',
      '¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            setLoading(false);
          },
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            await deleteUser();
            setLoading(false);
          },
        },
      ],
    );
  };

  return (
    <MainLayout title="Mi Perfil" blockProfile back>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Sección de imagen y nombre */}
        <View style={styles.profileHeader}>
          {user.hasImage ? (
            <Avatar.Image
              size={120}
              source={{
                uri: getUserImageRequest(
                  user.id!,
                  flagUpdateImage || new Date(),
                ),
              }}
            />
          ) : (
            <Avatar.Text size={120} label={firstName.charAt(0).toUpperCase()} />
          )}
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {firstName} {lastName}
            </Text>
            <IconButton
              mode="outlined"
              onPress={handleSelectImage}
              icon="camera"
              style={styles.button}
            />
          </View>
        </View>

        <View style={styles.imageUploadContainer}>
          {image && image.uri ? (
            <Fragment>
              <Image source={{uri: image.uri}} style={styles.previewImage} />
              <Button
                mode="contained"
                onPress={handleUploadImage}
                style={[styles.button, {marginTop: 8}]}
                loading={loading}>
                Confirmar
              </Button>
            </Fragment>
          ) : null}
          {errorImage ? (
            <Text style={[styles.errorText, {color: theme.colors.error}]}>
              {errorImage}
            </Text>
          ) : null}
        </View>

        {/* Formulario de datos personales */}
        <Divider style={styles.divider} />
        <TextInput
          label="Nombre"
          value={firstName}
          mode="outlined"
          style={styles.input}
          disabled
        />
        <TextInput
          label="Apellido"
          value={lastName}
          mode="outlined"
          style={styles.input}
          disabled
        />
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          error={!!errorEmail}
        />
        {errorEmail ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errorEmail}
          </Text>
        ) : null}
        <Button
          mode="contained"
          onPress={handleSaveChanges}
          style={styles.button}
          loading={loading}>
          Guardar Cambios
        </Button>

        {/* Formulario de cambio de contraseña */}
        <Divider style={styles.divider} />
        <TextInput
          label="Contraseña Actual"
          value={password}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showCurrent}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon
              icon={showCurrent ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowCurrent(!showCurrent)}
            />
          }
        />
        <TextInput
          label="Nueva Contraseña"
          value={newPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showNew}
          onChangeText={text => setNewPassword(text)}
          right={
            <TextInput.Icon
              icon={showNew ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowNew(!showNew)}
            />
          }
        />
        <TextInput
          label="Repetir Contraseña"
          value={repeatPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry={!showRepeat}
          onChangeText={text => setRepeatPassword(text)}
          right={
            <TextInput.Icon
              icon={showRepeat ? 'eye-off-outline' : 'eye-outline'}
              onPress={() => setShowRepeat(!showRepeat)}
            />
          }
        />
        {errorPassword ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errorPassword}
          </Text>
        ) : null}
        <Button
          mode="contained"
          onPress={handleChangePassword}
          style={styles.button}
          loading={loading}>
          Cambiar Contraseña
        </Button>

        {/* Botón para eliminar cuenta */}
        <Divider style={styles.divider} />
        <Button
          mode="text"
          onPress={handleDeleteUser}
          style={[styles.button]}
          textColor={theme.colors.error}
          loading={loading}
          icon="trash">
          Eliminar Cuenta
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nameContainer: {
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  divider: {
    marginVertical: 16,
  },
  errorText: {
    marginBottom: 8,
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 8,
  },
});
