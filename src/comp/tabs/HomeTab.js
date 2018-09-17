
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Modal, TouchableOpacity,TouchableHighlight,StatusBar } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Title, Thumbnail, Left, Button, Right } from 'native-base'
import {
  SkypeIndicator
} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageViewer from 'react-native-image-zoom-viewer';


export default class HomeTab extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      modalVisible: false,
      images: [{
        url: '',
      }],
    }
    this.setModalVisible = this.setModalVisible.bind(this)
  }





  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    fetch('http://18.221.82.1/app/api/card/card_all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'session_token': 'bavmr9BzE9lBRoqZaPrd',
      },
      body: JSON.stringify({
        user_id: 228
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        isLoading = false;
        this.setState({
          data: responseJson.cards,
          isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setModalVisible(visible, imagePath) {
    this.state.images = [{
      url: imagePath,
    }]
    if (visible) {
      StatusBar.setHidden(true);
    }
    if (!visible) {
      StatusBar.setHidden(false);
    }
    this.setState({ modalVisible: visible });
  }



  render() {
    if (this.state.isLoading) {
      return (
        <SkypeIndicator color='#000000' size={80} />
      )
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Title style={styles.headerTitle}>Api Demo</Title>
        </Header>
        <Content>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: item.image }} />
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>GeekyAnts</Text>
                    </Body>
                  </Left>
                  </CardItem>
                  <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.modalVisible, item.image);
                  }}>
                    <CardItem cardBody >
                      <Image source={{ uri: item.image }} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                  </TouchableOpacity>
                  <CardItem>
                    <Left>
                      <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>12 Likes</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Icon active name="comment" />
                      <Text>4 Comments</Text>
                    </Body>
                    <Right>
                      <Text>11h ago</Text>
                    </Right>
                  </CardItem>
              </Card>
                }
            keyExtractor={(item, index) => index}
                />
        </Content>

<Modal style={styles.modalImage}
animationType="slide"
transparent={false}
visible={this.state.modalVisible}>
<TouchableHighlight style={{ backgroundColor: 'black' }}
  onPress={() => {
    this.setModalVisible(!this.state.modalVisible);
  }}>
  <Icon active name="close" size={30} style={{ textAlign: 'right', marginRight: 20, marginTop: 10, color: 'white' }} />
</TouchableHighlight>
<ImageViewer imageUrls={this.state.images} />
</Modal>



      </Container>
        );
    }
  }  
    
const styles = StyleSheet.create({
            container: {
            backgroundColor: '#000000',
        },
  header: {
            backgroundColor: '#000000',
          color: '#ffffff',
          textAlign: 'center'
        },
  headerTitle: {
            marginTop: 15,
          color: '#ffffff'
  }, modalImage: {
            bottom: 0,
          marginBottom: 0,
          paddingBottom: 0,
          backgroundColor: '#000000',
        },
       
      });
