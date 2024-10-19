import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const theme = useTheme();

export const globalVariables = {
    margin: 16,
    padding: 16,
    containerBorderRadius: 8,
    innerBorderRadius: 4,
};

export const globalTheme = StyleSheet.create({
    containerBorder: {
        borderWidth: 1,
        shadowColor: 'transparent',
    },
    modalContainer: {
        justifyContent: 'center',
        padding: globalVariables.padding,
        shadowColor: 'transparent', // Sin sombra
      },
      modalContent: {
        padding: globalVariables.padding * 1.5,
        borderRadius: globalVariables.containerBorderRadius * 1.5, // Bordes más redondeados
        backgroundColor: theme.colors.surface, // Fondo claro
      },
      modalTitle: {
        fontSize: 24, // Título más grande y destacable
        fontWeight: 'bold',
        marginBottom: globalVariables.margin,
        textAlign: 'center', // Centrar el título
      },
      modalRow: {
        flexDirection: 'row', // Estilo en fila para etiquetas y valores
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: globalVariables.margin / 2,
      },
      modalLabel: {
        fontSize: 18,
        fontWeight: '600', // Etiquetas más prominentes
      },
      modalText: {
        fontSize: 18,
      },
      modalDescription: {
        fontSize: 16,
        fontStyle: 'italic', // Dar estilo cursivo a la descripción
        marginBottom: globalVariables.margin,
      },
      modalCloseButton: {
        marginTop: globalVariables.margin,
        alignSelf: 'center', // Botón centrado
        width: '50%', // Botón más ancho
      },
});

