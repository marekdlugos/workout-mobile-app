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
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let records = recordOfTrainingPlanService.getRecordsOfTrainingPlans().sorted('startOfTraining');

        this.state = {
            records: records,
            recordsInList: ds.cloneWithRows([]),
            activeDate: null,
        };

    }

    timeToString(date) {
        if(date == null) return;

        return `${date.getHours()}:${date.getMinutes()}`;
    }

    render() {
        let listOfRecords;
        if(this.state.records.length === 0) listOfRecords = (
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>No data to display</Text>
                <Text>Start by finishing your first training</Text>
            </View>);
        else listOfRecords = (
            <ListView dataSource={this.state.recordsInList} enableEmptySections={true} renderRow={(item) =>
                        <View style={styles.listItem}>
                            <Text style={{fontWeight: 'bold'}}>Training: {item.trainingPlanName}</Text>
                            <Text>{item.startOfTraining != null ? item.startOfTraining.toString() : ''}</Text>
                            <Text>Start: {this.timeToString(item.startOfTraining)}</Text>
                            <Text>End: {this.timeToString(item.endOfTraining)}</Text>
                            <Text>Exercises: {item.exercises.length}</Text>
                            {this._renderExercises(item.exercises)}
                        </View>
                    }/>
        );

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

                    {listOfRecords}
                </Container>
            </Container>
        );
    }

    getExerciseStateStyle(exercise) {
        if(exercise.completed === null) return {color: '#4e92DF'};

        if(exercise.completed === true) return {color: 'green'};
        else return {color: '#FB3D38'};
    }

    _renderExercises(exercises) {
        let exercisesList = [];
        console.log(exercises[0]);
        for(let i = 0; i < exercises.length; ++i) exercisesList.push(
            <View key={i}>
                <Text style={this.getExerciseStateStyle(exercises[i])}>Name: {exercises[i].exerciseName}</Text>
            </View>
        );

            return exercisesList;
    }

    _renderCalendar() {
        let records = this.state.records;

        let firstMonth = 0, lastMonth = 0;

        if(records.length > 0) {
            firstMonth = records[0].startOfTraining.getMonth();
            lastMonth = records[records.length-1].startOfTraining.getMonth();
        }

        let months = [];
        for(let i = firstMonth; i <= lastMonth; ++i) months.push(this._renderMonth(2017, i));

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

            calendarRows.push(this._renderCalendarRow(i, date));
        }

        return (
            <View style={styles.weekList} key={month}>
                <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}><Text style={{fontWeight: 'bold', fontSize: 17}}>{this.getMonthName(date.getMonth())} {date.getFullYear()}</Text></View>
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

    _renderCalendarRow(key, fromDate) {
        let calendarRow = [];
        let startDayInWeek = this.convertToMonSunWeek(fromDate.getDay());
        let startDate = fromDate.getDate();

        for(let i = 0; i < startDayInWeek-1; ++i) calendarRow.push(<View key={`empty_0${i}`} style={styles.nonActiveDate}/>);
        for(let i = 0; i < 8-startDayInWeek; ++i) {
            let lastDayInMonth = new Date(fromDate.getYear(), fromDate.getMonth(), 31).getMonth() == fromDate.getMonth() ? 31 : 30;

            if(startDate+i <= lastDayInMonth) {
                let date = new Date(fromDate.getFullYear(), fromDate.getMonth(), startDate+i);
                calendarRow.push(this._renderCalendarItem(date, (i == 8 - startDayInWeek - 1 | i == 8 - startDayInWeek - 2)));
            } else calendarRow.push(<View key={`empty_${i}0`} style={styles.nonActiveDate}/>);
        }


        return (
            <View style={styles.dates} key={key}>
                {calendarRow}
            </View>
        );
    }

    recordsInDate(date) {
        let nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1, 0, 0, 0);
        return this.state.records.filtered('startOfTraining >= $0 && startOfTraining < $1', date, nextDay);
    }

    listRecords(date) {
        this.setState({recordsInList: this.state.recordsInList.cloneWithRows(this.recordsInDate(date))});
        this.setState({activeDate: date});
    }

    dateIsActive(date) {
        if(this.state.activeDate === null) return false;
        return this.state.activeDate.getTime() === date.getTime();
    }

    _renderCalendarItem(date, isWeekend) {
        const dateHasARecord = this.recordsInDate(date).length !== 0;

        return (
            <TouchableOpacity key={date.getDate()} onPress={() => this.listRecords(date)} disabled={!dateHasARecord} title="">
                <View style={[styles.nonActiveDate, dateHasARecord ? styles.existingRecord : null, this.dateIsActive(date) ? styles.activeDate : null]}><Text style={dateHasARecord ? styles.existingRecordText : (isWeekend ? styles.weekendTextColor : null)}>{date.getDate()}</Text></View>
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
    existingRecord: {
        borderColor: '#000000',
        backgroundColor: '#000000',
    },
    existingRecordText: {
        color: 'white',
        fontWeight: 'bold',
    },
    activeDate: {
        borderColor: '#FB3D38',
        backgroundColor: '#FB3D38',
    },
    weekendTextColor: {
        color: '#A7A7A7',
    },

    listItem: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: '#BCBEC0',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});
