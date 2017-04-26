/**
 * Created by railchamidullin on 24/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

export default class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.backButton()} title="">
                            <Text style={styles.blueText}>Cancel</Text>
                        </Button>
                    </Left>
                    <Body>
                    <Title>New TrainingPlan</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.saveButton()} title="">
                            <Text style={styles.blueText}>Save</Text>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label style={{fontWeight: 'bold'}}>Name</Label>
                            <Input placeholder="required" onChangeText={(value) => this.setState({name: value})} />
                        </Item>
                        <Item fixedLabel>
                            <Label style={{fontWeight: 'bold'}} >Repetition</Label>
                            <Input placeholder="optional" onChangeText={(value) => this.setState({repetition: value})} />
                        </Item>
                        <Item fixedLabel last>
                            <Label style={{fontWeight: 'bold'}} >Days of week</Label>
                            <Input placeholder="optional" onChangeText={(value) => this.setState({daysOfWeek: value})} />
                        </Item>
                    </Form>

                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({

});
