
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var globals = {};

// stash globals
if ("d3" in global) globals.d3 = global.d3;
if ("Canvas" in global) globals.Canvas = global.Canvas;
global.d3 = require("d3");
global.Canvas = require("canvas");

require("./d3.layout.cloud");
module.exports = d3.layout.cloud;

// restore globals
if ("d3" in globals) global.d3 = globals.d3;
else delete global.d3;
if ("Canvas" in globals) global.Canvas = globals.Canvas;
else delete global.Canvas;

 var React = require('react-native');
 var Firebase = require('firebase');
 var d3 = require('d3');
 var canvas = require('canvas');

 var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TouchableHighlight,
  Component,
  AlertIOS
} = React;

var REQUEST_URL = 'https://incandescent-inferno-4780.firebaseio.com/pond.json';
var userID;
var Katfish = React.createClass({

  getInitialState: function() {
    //this will be replaced with a function that gets the facebook id of the user who logs in
    userID = '714387395';
    return {
      selectedTab: 'Alert',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData[userID]),
        loaded: true,
      });
    })
    .done();
  },

  _renderAlert: function () {
    return (
      <View>
      <Text> </Text>
      <TouchableHighlight style={styles.button}
        onPress={this.showAlert}>
        <Text style={styles.buttonText}>Go</Text>
      </TouchableHighlight>
      <Text style={styles.container}></Text>
      </View>
    )
  },

  _renderMovie: function () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}/>
      )
  },

  render: function() {
   if (!this.state.loaded) {
     return this.renderLoadingView();
   }
   return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Alert!"
          systemIcon="contacts"
          selected={this.state.selectedTab === 'Alert'}
          onPress={() => {
            this.setState({
              selectedTab: 'Alert'
            })
          }}>
        {this._renderAlert()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Movies"
          systemIcon="history"
          selected={this.state.selectedTab === 'Movies'}
          onPress={() => {
            this.setState({
              selectedTab: 'Movies'
            })
          }}>
          {this._renderMovie()}
        </TabBarIOS.Item>
      </TabBarIOS>
     );
  },

 renderLoadingView: function() {
   return (
     <View style={styles.container}>
     <Text>
     Loading traits...
     </Text>
     </View>
     );
 },

 renderMovie: function(data, element, trait, callback) {
   var votes = data.length
   return (
     <View style={styles.container}>
     <View style={styles.rightContainer}>
     <Text style={styles.title}>{trait}</Text>
     <Text style={styles.year}>{votes}</Text>
     </View>
     </View>
     );
 },

 showAlert: function(){}
});

AppRegistry.registerComponent('Katfish', () => Katfish);