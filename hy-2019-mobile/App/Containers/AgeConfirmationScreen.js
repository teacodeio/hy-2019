import React from 'react'
import { View, StyleSheet } from 'react-native'
import { H1, Container, Content, Button, Icon, Text } from 'native-base'
import RNExitApp from 'react-native-exit-app'

const AgeConfirmationScreen = (props) => {
  const ageConfirmationAgree = () => props.navigation.navigate('LaunchScreen')
  return (
    <Container>
      <Content
        contentContainerStyle={styles.contentContainer}
      >
        <H1 style={{alignSelf: 'center'}}>Are you over 18?</H1>
        <Text style={{alignSelf: 'center', lineHeight: 30, paddingVertical: 30}}>
          This app requires you to be 18 or older to enter.
        </Text>
        <View style={styles.buttonsContainer}>
          <Button
            style={{
              borderColor: '#ff9800',
              marginHorizontal: 10
            }}
            rounded
            bordered
            iconLeft
            light>
            <Icon style={{ color: '#ff9800' }} name='md-close' />
            <Text style={{ color: '#ff9800' }} onPress={() => RNExitApp.exitApp()}>No</Text>
          </Button>

          <Button
            style={{
              backgroundColor: '#ff9800',
              marginHorizontal: 10
            }}
            rounded
            iconLeft
            light>
            <Icon style={{color: '#ffffff'}} name='md-checkmark' />
            <Text style={{color: '#ffffff'}} onPress={ageConfirmationAgree}>Yes, I am</Text>
          </Button>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: 50
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50
  }
})

export default AgeConfirmationScreen
