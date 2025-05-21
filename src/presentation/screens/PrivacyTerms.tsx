import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {MainLayout} from '../layouts/MainLayout';
import {CardContainer} from '../components/CardContainer';

export const PrivacyTerms = () => {

  return (
    <MainLayout title="Términos y Condiciones" menu={false} back>
      <ScrollView contentContainerStyle={{padding: 16}}>
        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            1. Aceptación de los Términos
          </Text>
          <Text variant="bodyMedium">
            Al registrarse y utilizar nuestra aplicación, usted acepta cumplir
            con estos términos y condiciones en su totalidad. Si no está de
            acuerdo con alguno de los términos, no debe utilizar la aplicación.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            2. Registro y Cuenta de Usuario
          </Text>
          <Text variant="bodyMedium">
            Para acceder a las funcionalidades de la aplicación, es necesario
            registrarse proporcionando información veraz, completa y
            actualizada. Usted es responsable de mantener la confidencialidad de
            su cuenta y contraseña, y de notificar cualquier uso no autorizado.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            3. Uso de la Aplicación
          </Text>
          <Text variant="bodyMedium">
            La aplicación le permite acceder a rutinas de entrenamiento, planes
            nutricionales y documentos médicos relacionados con su salud
            deportiva. Estos servicios son proporcionados para su uso personal y
            no comercial.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            4. Consentimiento Informado y Autorización
          </Text>
          <Text variant="bodyMedium" style={{marginBottom: 8}}>
            Con plena información, usted autoriza el tratamiento de sus datos de
            salud, incluyendo la recolección, almacenamiento, acceso y uso por
            parte de profesionales autorizados. Ha sido informado sobre la
            finalidad y alcance de este procesamiento y comprende que puede
            revocar este consentimiento en cualquier momento sin afectar la
            licitud del uso previo.
          </Text>
          <Text variant="bodyMedium">
            Asimismo, usted puede autorizar explícitamente la compartición de
            sus documentos médicos con otros profesionales de la salud o
            terceros de su confianza. Dicha autorización será voluntaria,
            expresa y podrá ser revocada en cualquier momento.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            5. Protección de Datos Personales
          </Text>
          <Text variant="bodyMedium" style={{marginBottom: 8}}>
            Nos comprometemos a proteger su privacidad y datos personales en
            conformidad con la Ley de Protección de Datos Personales N° 25.326.
            Los datos recopilados serán utilizados únicamente para los fines
            específicos de la aplicación y serán almacenados de forma segura y
            encriptada.
          </Text>
          <Text variant="bodyMedium">
            Recopilamos información personal básica, datos de salud
            proporcionados por usted o por profesionales autorizados, y
            registros de uso de la aplicación. Utilizamos protocolos de
            seguridad estándar de la industria para proteger su información.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            6. Responsabilidad sobre Contenido y Servicios de Terceros
          </Text>
          <Text variant="bodyMedium">
            La aplicación facilita la interacción con profesionales de la salud
            y entrenadores. No nos hacemos responsables por actos de mala
            praxis, negligencia o incumplimiento de obligaciones profesionales
            por parte de estos terceros. Cualquier asesoramiento, diagnóstico o
            tratamiento proporcionado es responsabilidad exclusiva del
            profesional correspondiente.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            7. Limitación de Responsabilidad
          </Text>
          <Text variant="bodyMedium">
            La aplicación se proporciona "tal cual" y "según disponibilidad". No
            garantizamos que el servicio sea ininterrumpido o libre de errores.
            En la máxima medida permitida por la ley, no seremos responsables
            por daños directos, indirectos, incidentales o consecuentes que
            puedan surgir del uso o incapacidad de uso de la aplicación.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            8. Seguridad de la Información
          </Text>
          <Text variant="bodyMedium">
            Implementamos medidas de seguridad razonables para proteger su
            información personal y de salud. Los datos sensibles son almacenados
            en forma encriptada y se accede a ellos únicamente a través de
            conexiones seguras.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            9. Derechos del Usuario
          </Text>
          <Text variant="bodyMedium">
            Usted tiene derecho a acceder, rectificar y eliminar sus datos
            personales almacenados en la aplicación. Para ejercer estos
            derechos, puede contactarnos a través de los medios proporcionados
            en la sección de contacto.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            10. Modificaciones de los Términos
          </Text>
          <Text variant="bodyMedium">
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las modificaciones serán efectivas una vez publicadas en la
            aplicación. Es su responsabilidad revisar periódicamente los
            términos actualizados. El uso continuo de la aplicación después de
            la publicación de cambios constituye su aceptación de los mismos.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            11. Ley Aplicable y Jurisdicción
          </Text>
          <Text variant="bodyMedium">
            Estos términos se rigen por las leyes de la República Argentina.
            Cualquier disputa relacionada con estos términos y condiciones será
            resuelta por los tribunales competentes en la ciudad de Córdoba,
            renunciando a cualquier otro fuero que pudiera corresponder.
          </Text>
        </CardContainer>

        <CardContainer>
          <Text variant="headlineSmall" style={{marginBottom: 8}}>
            12. Contacto
          </Text>
          <Text variant="bodyMedium">
            Si tiene preguntas o inquietudes sobre estos términos, puede
            contactarnos a través de tomasribesb@gmail.com.
          </Text>
        </CardContainer>
      </ScrollView>
    </MainLayout>
  );
};
