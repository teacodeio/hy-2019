import React, { useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import {
  H1,
  Container,
  Content,
  Button,
  Icon,
  Text,
  DeckSwiper,
  Card,
  Left, Body, Title, Right, Header,
  Subtitle,
  CardItem
} from 'native-base'
import client from '../client'
import colors from '../Config/colors'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height

const ImageRating = (props) => {
  const [images, setImages] = useState([])
  const [answer, setAnswer] = useState(null)
  const [answered, setAnswered] = useState(0)
  const [helped, setHelped] = useState(0)
  const [points, setPoints] = useState(2)

  useEffect(() => {
    if (answer) {
      setTimeout(() => {
        setAnswer(null)
      }, 1000)
    }
  }, [answer])

  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await client.service('images').find()

        setImages(res.data)
      } catch (e) {
        console.log('e', e)
      }
    }

    getImages()
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
          <Title>Butt or not?</Title>
          <Subtitle style={{ width: 250 }}>No - left, Yes - right</Subtitle>
        </Body>
        <Right />
      </Header>
      <Content>
        {images.length
          ? <View>
            <DeckSwiper
            // looping={false}
              dataSource={images}
          //   renderEmpty={() => (
          //     <View
          //       style={{
          //         width: width,
          //         height: 200,
          //         alignItems: 'center',
          //         justifyContent: 'center'
          //       }}
          //   >
          //       <Text>You are done</Text>
          //     </View>
          // )}
              onSwipeRight={() => {
                setAnswered(answered + 1)
                setPoints(points + 1)
              }}
              onSwipeLeft={() => {
                setHelped(helped + 1)
                setAnswered(answered + 1)
                setPoints(points + 1)
              }}
              renderItem={item =>
                <Card
                  style={{ elevation: 3 }}
            >
                  <CardItem cardBody>
                    <Image
                      style={{ height: SCREEN_HEIGHT, flex: 1 }}
                      source={{ uri: item.cloudinary }} />
                  </CardItem>
                </Card>
          }
        />
          </View> : null}
        {answer ? <View
          style={{
            flexDirection: 'row',
            flex: 1,
            fontSize: 50,
            justifyContent: 'center',
            alignItems: 'center',
            height: 300
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: answer === 'YES' ? 'green' : 'red',
              backgroundColor: 'rgba(255,255,255,0.4)'
            }}
          >
            {answer}
          </Text>
        </View> : null}
        <View style={{...styles.boxesWrapper, marginTop: 500}}>
          <View style={styles.box}>
            <Title style={{color: '#ca570c', ...styles.title}}>Helped</Title>
            <Text style={{color: '#ca570c', ...styles.value}}>{helped}</Text>
          </View>
          <View style={styles.box}>
            <Title style={{color: '#dfac1c', ...styles.title}}>Answered</Title>
            <Text style={{color: '#dfac1c', ...styles.value}}>{answered}</Text>
          </View>
        </View>
        <View style={styles.boxesWrapper}>
          <View style={styles.box}>
            <Title style={{color: colors.primaryColor, ...styles.title}}>Points</Title>
            <Text style={{color: colors.primaryColor, ...styles.value}}>{points}</Text>
          </View>
        </View>
      </Content>
    </Container>
  )
}

const styles = {
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5
  },
  value: {
    marginTop: 5,
    marginBottom: 10
  },
  boxesWrapper: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default ImageRating
