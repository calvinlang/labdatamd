import React from 'react';
import { StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Expo from 'expo';

const WEBVIEW_REF = "WEBVIEW_REF";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
  }
  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render() {
    let goBack = this.state.canGoBack ? 'Back' : '';
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.topbar}>
            <TouchableOpacity
              disabled={!this.state.canGoBack}
              onPress={this.onBack.bind(this)}
              >
              <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>{goBack}</Text>
            </TouchableOpacity>
          </View>
          <WebView
            ref={WEBVIEW_REF}
            style={{flex: 1}}
            bounces={false}
            onNavigationStateChange=
              {this.onNavigationStateChange.bind(this)}
            source={{uri: 'https://www.labdatamd.com'}}
            /> 
        </View>
      </SafeAreaView>
    )
  }
}

function changeScreenOrientation() {
  Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE_RIGHT);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, /* Padding to push below the navigation bar */
    backgroundColor: '#2767C3',
    marginBottom: -5,
  },
  topbar: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbarTextDisabled: {
    color: 'gray'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#2767C3'
  }
});