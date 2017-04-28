/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';

export default class Dashboard extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                    <Title>Home</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <Content>

                </Content>

            </Container>
        );
    }
}