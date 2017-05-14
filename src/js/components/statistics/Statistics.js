/**
 * Created by railchamidullin on 27/04/2017.
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableOpacity, Navigator } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Footer, FooterTab, Content, ListItem, List } from 'native-base';
import Swiper from 'react-native-swiper';

import {trainingPlanService} from '../../services/TrainingPlanService';
import {recordOfTrainingPlanService} from '../../services/RecordOfTrainingPlanService';
import {settingsService} from '../../services/SettingsService';
import {currentStateService} from '../../services/ActualStateService';

export default class Statistics extends Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        let records = recordOfTrainingPlanService.getRecordsOfTrainingPlans().sorted('startOfTraining');

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Stats</Title>
                    </Body>
                    <Right/>
                </Header>

                <Container>
                    {this._renderCalendar()}

                    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>No data to display</Text>
                        <Text>Start by finishing your first training</Text>
                    </View>

                    <List dataArray={recordOfTrainingPlanService.getRecordsOfTrainingPlans()} renderRow={(item) =>
                        <ListItem style={{height: 100}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text>{item.id}</Text>
                                <Text>{item.trainingPlanName}</Text>
                                <Text>{item.startOfTraining == null ? 'none' : item.startOfTraining.toString()}</Text>
                                <Text>{item.endOfTraining == null ? 'none' : item.endOfTraining.toString()}</Text>
                                <Text>{item.exercises.length}</Text>
                            </View>
                        </ListItem>
                    }/>
                </Container>

            </Container>
        );
    }

    _renderCalendar() {
        let records = recordOfTrainingPlanService.getRecordsOfTrainingPlans().sorted('startOfTraining');
        //let firstMonth = records[0].startOfTraining.getMonth(), lastMonth = records[records.length-1].startOfTraining.getMonth();

        let months = [];
        for(let i = 0; i <= 3; ++i) months.push(this._renderMonth(2017, i));

        return (
            <Swiper loop={false} showsPagination={false} index={0} height={240}>
                {months}
            </Swiper>
        );
    }

    convertToMonSunWeek(day) {
        if(day == 0) return 7; // sunday becomes 7
        return day;
    }

    getMonthName(month) {
        switch (month) {
            case 0:
                return 'January';
            case 1:
                return 'February';
            case 2:
                return 'March';
            case 3:
                return 'April';
            case 4:
                return 'May';
            case 5:
                return 'June';
            case 6:
                return 'July';
            case 7:
                return 'August';
            case 8:
                return 'September';
            case 9:
                return 'October';
            case 10:
                return 'November';
            case 11:
                return 'December';
            default:
                return '';
        }
    }

    getDateOfMonday(date, numberOfWeek) {
        let startDayInWeek = this.convertToMonSunWeek(date.getDay());

        return new Date(date.getFullYear(), date.getMonth(), (7* (numberOfWeek-1) + (7-startDayInWeek+2)));
    }

    _renderMonth(year, month) {
        let calendarRows = [];
        let date = new Date(year, month, 1);

        for(let i = 0; i < 5; ++i) {
            date = new Date(year, month, 1);
            if(i != 0) date = this.getDateOfMonday(date, i);

            calendarRows.push(this._renderCalendarRow(date));
        }

        return (
            <View style={styles.weekList}>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}><Text style={{fontWeight: 'bold', fontSize: 17}}>{this.getMonthName(date.getMonth() + 1)} {date.getFullYear()}</Text></View>
                <View style={styles.nameOfDays}>
                    <Text>Mon</Text>
                    <Text>Tue</Text>
                    <Text>Wed</Text>
                    <Text>Thu</Text>
                    <Text>Fri</Text>
                    <Text style={styles.weekendTextColor}>Sat</Text>
                    <Text style={styles.weekendTextColor}>Sun</Text>
                </View>
                {calendarRows}
            </View>
        );
    }

    _renderCalendarRow(fromDate) {
        let calendarRow = [];
        let startDayInWeek = this.convertToMonSunWeek(fromDate.getDay());
        let startDate = fromDate.getDate();

        for(let i = 0; i < startDayInWeek-1; ++i) calendarRow.push(<View style={styles.nonActiveDate}/>);
        for(let i = 0; i < 8-startDayInWeek; ++i) {
            let lastDayInMonth = new Date(fromDate.getYear(), fromDate.getMonth(), 31).getMonth() == fromDate.getMonth() ? 31 : 30;

            if(startDate+i <= lastDayInMonth) calendarRow.push(this._renderCalendarItem(startDate + i, i == 8-startDayInWeek-1 | i == 8-startDayInWeek-2));
            else calendarRow.push(<View style={styles.nonActiveDate}/>);
        }


        return (
            <View style={styles.dates}>
                {calendarRow}
            </View>
        );
    }

    _renderCalendarItem(date, weekend) {
        return (
            <TouchableOpacity key={date} onPress={() => this} disabled={true} title="">
                <View style={ date == 3 ? styles.activeDate : styles.nonActiveDate}><Text style={date == 3 ? styles.activeDateText : (weekend ? styles.weekendTextColor : null ) }>{date}</Text></View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    weekList: {
        flex: 1,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#A7A6AB',
        backgroundColor: '#F7F7F7',
    },
    nameOfDays: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    dates: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    nonActiveDate: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 25,
        height: 25,
    },
    activeDate: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 1,
        width: 25,
        height: 25,
        borderColor: '#FB3D38',
        backgroundColor: '#FB3D38',
    },
    activeDateText: {
        color: 'white',
        fontWeight: 'bold',
    },
    weekendTextColor: {
        color: '#A7A7A7',
    },

});
