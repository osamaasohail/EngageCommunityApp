import {StyleSheet, Text, View,FlatList} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import AppContext from '../components/AppContext';
import axios from 'axios';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const HeaderView = () => {
  return (
    <View style={styles.HeaderView}>
      <Text style={styles.HeaderText}>Discount Offers</Text>
      <Text style={styles.subHeadertext}>find perfect discount</Text>
    </View>
  );
};

const Coloumn1 = () => {
  return (
    <View style={styles.Coloumn1}>
      <View style={styles.Row1C1}>
        <Text style={styles.RestaurantNameText}>Restaurant Name</Text>
      </View>
      <View style={styles.Row2C1}>
        <Text style={{color: 'white'}}>Raining Strategy</Text>
      </View>
    </View>
  );
};
const Coloumn2 = () => {
  return (
    <View style={styles.Coloumn}>
      <View style={styles.Row}>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont1}>Start Date & Time</Text>
          <Text style={styles.numberFont}> 13/12/2023</Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>End Date & Time</Text>
          <Text style={styles.numberFont}> 13/12/2024</Text>
        </View>
      </View>

      <View style={styles.Row}>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>Discount on Food</Text>
          <Text style={styles.numberFont}> 10%</Text>
        </View>
        <View
          style={{
            height: '100%',
            width: '50%',
            // backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.ColorFont}>Discount on Beverages</Text>
          <Text style={styles.numberFont}> 15%</Text>
        </View>
      </View>
    </View>
  );
};

const DiscountCardView = () => {
  return (
    <View style={styles.DiscountCardView}>
      <Coloumn1 />
      <Coloumn2 />
    </View>
  );
};








export default function DiscountOfferScreen() {

const {userToken}=useContext(AppContext)
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setloading] = useState(true);

const getDiscountOffer=async()=>{
  try{
    setloading(true);
    const token = userToken;
    const urlToHit = 'https://api.kachaak.com.sg/api/strategies/discountOffers';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(urlToHit, config);
    console.log('response', response.data)
    const responseData = response.data;
    const newData = responseData.data;
    setData(prevData => [...prevData, ...newData]);
    setHasNextPage(responseData.pagination?.hasNextPage);
    setloading(false);


  }catch(error){
    console.log('error', error)
  }
}



const handleEndReached = () => {
  if (hasNextPage) {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getJobs(nextPage);
  }
};



useEffect(() => {
  getDiscountOffer()

}, [])



  return (
    <View style={{alignItems: 'center', backgroundColor: '#00BBB4', flex: 1}}>
      <HeaderView />
      <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{paddingBottom: windowHeight * 0.2}}
            renderItem={({item}) => {
              return <DiscountCardView item={item} />;
            }}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.7}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    height: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderText: {
    fontSize: 35,
    color: 'white',
  },
  subHeadertext: {
    fontSize: 20,
    color: 'white',
  },
  DiscountCardView: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.95,
    borderRadius: 10,
    backgroundColor: '#2B2D3A',

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: windowHeight*0.005,
  },

  Coloumn1: {
    height: windowHeight * 0.2,
    width: '36%',
    borderRadius: 10,
  },
  Coloumn: {
    height: windowHeight * 0.2,
    // backgroundColor: 'orange',
    width: '64%',
    borderRadius: 10,
  },
  Row1C1: {
    height: '65%',
    width: '100%',
    // backgroundColor: 'red',
    borderTopStartRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Row2C1: {
    height: '35%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  RestaurantNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  Row: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'red',
    borderRadius: 10,
    flexDirection: 'row',
  },
  ColorFont: {
    color: '#00BBB4',
    fontSize: 11,
    width: '100%',
    textAlign: 'center',
  },
  ColorFont1: {
    color: '#00BBB4',
    fontSize: 11,
    borderRightWidth: 1,
    borderRightColor: '#00BBB4',
    width: '100%',
    textAlign: 'center',
  },
  numberFont: {
    color: 'white',
    fontSize: 10,
  },
});
