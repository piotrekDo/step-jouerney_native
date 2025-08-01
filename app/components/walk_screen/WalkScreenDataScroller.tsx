import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View , Text} from 'react-native';
import { Region } from 'react-native-maps';
import useWeatherForecast from '../../hooks/useWeatherForecast';
import { WeatherForecast } from './WeatherForecast';
import colors from '../../config/colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
  displayRegion: Region | undefined;
}

export const WalkScreenDataScroller = ({ displayRegion }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { data: forecast, isFetching } = useWeatherForecast(displayRegion?.latitude, displayRegion?.longitude);
  const { data: forecast, isFetching } = useWeatherForecast(displayRegion?.latitude, undefined);

  const windowWidth = Dimensions.get('window').width;

  const onScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / windowWidth);
    setCurrentIndex(index);
  };

  return (
    <>
      <View style={styles.dotsContainer}>
        {[0, 1 /*, więcej jeśli masz więcej ekranów*/].map(i => (
          <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
        ))}
      </View>

      <ScrollView
        onScroll={onScroll}
        style={styles.container}
        horizontal
        alwaysBounceHorizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.scrollerElement]}>
          {(forecast && <WeatherForecast weather={forecast} />) || (
            <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={'large'} animating={true} />
            </View>
          )}
        </View>
        <View style={[styles.scrollerElement]}>
            <View style={{width: '100%', flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{color: colors.textPimary}}>Zacznij marsza aby zobaczyć dane</Text>
            </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    margin: 20,
  },
  scrollerElement: {
    width: windowWidth,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue', // kolor aktywnej kropki
  },
});
