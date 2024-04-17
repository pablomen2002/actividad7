import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { sendPhoneCall, sendText, email } from 'react-native-communications';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';

const CommunicationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handlePhoneCall = () => {
    sendPhoneCall(phoneNumber, true);
  };

  const handleSendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync([phoneNumber], message);
    } else {
      alert('El envío de mensajes de texto no está disponible en este dispositivo');
    }
  };

  const handleSendEmail = () => {
    MailComposer.composeAsync({
      recipients: [recipientEmail],
      subject: emailSubject,
      body: emailBody
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunicaciones</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Número de teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el número de teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity style={styles.button} onPress={handlePhoneCall}>
          <Text style={styles.buttonText}>Llamar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mensaje de texto:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el mensaje de texto"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSendSMS}>
          <Text style={styles.buttonText}>Enviar SMS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo electrónico del destinatario:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el correo electrónico del destinatario"
          value={recipientEmail}
          onChangeText={setRecipientEmail}
        />
        <Text style={styles.label}>Asunto del correo electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el asunto del correo electrónico"
          value={emailSubject}
          onChangeText={setEmailSubject}
        />
        <Text style={styles.label}>Cuerpo del correo electrónico:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Ingrese el cuerpo del correo electrónico"
          value={emailBody}
          onChangeText={setEmailBody}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar Correo Electrónico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommunicationScreen;
