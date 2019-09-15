import React, { Component, useEffect, useState } from 'react'
import { Badge, ListItem, Container, Header, Content, Button, Left, Right, Body, Icon, Text } from 'native-base'
import { View, Image, Linking } from 'react-native'
import colors from '../Config/colors'

const Sidebar = (props) => {
  return (
    <Container>
      <Header style={{
        display: 'flex',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Image
          style={{
            alignSelf: 'center',
            width: 100,
            height: 60
          }}
          source={require('../Images/philipMorrisLogotype.png')}
          />
      </Header>
      <Content>
        <ListItem
          icon
          onPress={() => props.navigation.navigate('Leaderboard', {
            meState: props.meState
          })}
        >
          <Left>
            <Icon name='body' style={{color: '#ff9800'}} />
          </Left>
          <Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Text>You have {props.meState.totalPoints} points</Text>
          </Body>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            props.onCleanScreen()
            props.navigation.navigate('CleanScreen')
          }}
        >
          <Left>
            <Icon
              type='MaterialIcons'
              name='delete'
              style={{color: '#ff9800'}}
            />
          </Left>
          <Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Text>Where to clean</Text>
          </Body>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            props.navigation.navigate('ImageRating')
          }}
        >
          <Left>
            <Icon name='images' style={{color: '#ff9800'}} />
          </Left>
          <Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Text>Image rating</Text>
          </Body>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            props.navigation.navigate('LevelsScreen', {
              meState: props.meState
            })
          }}
        >
          <Left>
            <Icon name='star' style={{color: '#ff9800'}} />
          </Left>
          <Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Text>Your level</Text>
          </Body>
          <Right>
            <Badge style={{backgroundColor: colors.levels[props.meState.rank]}}>
              <Text>{props.meState.rank}</Text>
            </Badge>
          </Right>
        </ListItem>
        <ListItem
          icon
          onPress={() => {
            Linking.openURL('http://localhost:3000')
          }}
        >
          <Left>
            <Icon
              type='MaterialIcons'
              name='map'
              style={{color: '#ff9800'}}
            />
          </Left>
          <Body
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Text>Heat map</Text>
          </Body>
        </ListItem>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            paddingTop: 350
          }}
        >
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20
          }}>Butts</Text>
          <Image
            style={{
              width: 60,
              height: 60,
              alignSelf: 'center',
              marginBottom: 5
            }}
            source={require('../Images/logo.png')}
          />
          <Text style={{
            fontWeight: 'bold',
            fontSize: 20
          }}>Buster</Text>
        </View>
      </Content>
    </Container>
  )
}

export default Sidebar
