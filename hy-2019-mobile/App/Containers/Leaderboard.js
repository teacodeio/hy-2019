import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Left, Body, Title, Right, Header
} from 'native-base'

const users = [
  {
    name: 'Marta',
    points: 2122
  },
  {
    name: 'Martin',
    points: 1820
  },
  {
    name: 'Paul',
    points: 1789
  },
  {
    name: 'Mike',
    points: 1722
  },
  {
    name: 'Robert',
    points: 1670
  },
  {
    name: 'Scooby',
    points: 1501
  },
  {
    name: 'Gabi',
    points: 801
  },
  {
    name: 'Jacob',
    points: 309
  }
]

const LeaderBoard = (props) => {
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
          <Title>Leaderboard</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {users.map((user, index) =>
            <ListItem
              key={user.name}
              icon
            >
              <Left>
                <Text>{index + 1}. </Text>
              </Left>
              <Body>
                <Text>{user.name}</Text>
              </Body>
              <Right>
                <Text style={{ fontStyle: 'italic' }}>({user.points} points) </Text>
              </Right>
            </ListItem>
          )}
          <ListItem itemDivider style={{ textAlign: 'center' }}>
            <Text style={{ alignSelf: 'center' }}>Your position</Text>
          </ListItem>
          <ListItem
            icon
          >
            <Left>
              <Text>312. </Text>
            </Left>
            <Body>
              <Text>You</Text>
            </Body>
            <Right>
              <Text style={{ fontStyle: 'italic' }}>({props.navigation.getParam('meState').totalPoints} points)</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  )
}

export default LeaderBoard
