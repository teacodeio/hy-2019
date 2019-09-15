import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import {
  H1,
  Container,
  Content,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Left, Body, Title, Right, Header,
  Subtitle
} from 'native-base'
import client from '../client'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CleanScreen = (props) => {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    const position = props.navigation.getParam('position')

    const getPlaces = async () => {
      try {
        const res = await client.service('places').find({
          query: {
            latitude: position.latitude,
            longitude: position.longitude
          }
        })
        console.log('res', res)

        setPlaces(res.results)
      } catch (e) {
        console.log('e', e)
      }
    }

    getPlaces()
  }, [])

  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack()
            }}
          >
            <Icon
              type='MaterialIcons'
              name='keyboard-arrow-left'
              style={{color: '#ff9800'}}
            />
          </Button>
        </Left>
        <Body>
          <Title>Select place</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {places.map((place, index) =>
            <ListItem
              key={place.id}
              onPress={() => {
                Alert.alert(
                  'Vote',
                  `Are you sure you want to vote for ${place.name}?`,
                  [
                    {
                      text: 'No',
                      style: 'cancel'
                    },
                    {
                      text: 'Yes',
                      onPress: async () => {
                        props.navigation.goBack()
                        Alert.alert('👌\nThank you for your vote.')
                      }
                    }
                  ],
                  {
                    cancelable: true
                  }
                )
              }}
              // icon
            >
              <Body>
                <Text>{place.name}</Text>
              </Body>
              <Right>
                <Text
                  style={{color: '#a86900'}}
                >{((getRandomInt(0, 1) + 1) * (places.length - index)).toFixed(0)} votes</Text>
              </Right>
            </ListItem>
          )}
        </List>
      </Content>
    </Container>
  )
}

export default CleanScreen
