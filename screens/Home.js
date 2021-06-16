import React, {Component} from "react";
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native";
import axios from "axios";
import {Header,AirbnbRating,Icon} from "react-native-elements";
import {RFValue} from "react-native-responsive-fontsize";

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            movieDetails: {}
        };
    }

    componentDidMount() {
        this.getMovie()
    }

    timeConvert(num) {
        var hours = Math.floor(num/60);
        var minutes = num%60;
        return '${hours} hrs ${minutes} mins';
    }

    getMovie = () => {
        const url = "http://localhost:5000/get-movie";
        axios
          .get(url)
          .then(response =>{
              let details = response.data.data;
              details["duration"] = this.timeConvert(details.duration);
              this.setState({movieDetails: details});
          })
          .catch(error =>{
              console.log(error.message);
          });
    }

    likedMovie = () => {
        const url = "http://localhost:5000/liked-movie";
        axios
          .post(url)
          .then(response =>{
              this.getMovie();
    })
    .catch(error =>{
        console.log(error.message);
    });
};
    unlikedMovie = () => {
    const url = "http://localhost:5000/unliked-movie";
    axios
      .post(url)
      .then(response =>{
          this.getMovie();
    })
    .catch(error =>{
    console.log(error.message);
    });
}
    notWatched = () => {
    const url = "http://localhost:5000/did-not-watch";
    axios
      .post(url)
      .then(response =>{
          this.getMovie();
    })
    .catch(error =>{
    console.log(error.message);
    });
};

    render() {
        const {movieDetails} = this.state;
        if (movieDetails.poster_link) {
            const {
                poster_link,
                title,
                release_date,
                duration,
                overview,
                rating

            } = movieDetails
        return (
            <View>
                <View>
                    <Header
                        centerComponent={{
                            text: "Movie-Recommended"

                        }}
                        rightComponent={{
                            icon: "search",
                            color: "black"

                        }}
                        backgroundColor={"green"}
                        containerStyle={{ flex:1 }}
                        />
                </View>
                <View>
                    <View>
                        <Image source={{uri:poster_link}}/>
                    </View>
                    <View>
                        <View>
                            <Text>{title}</Text>
                            <Text style={styles.subtitle}>{`${ release_date.split("-")[0] } | ${duration}`}</Text>
                        </View>
                        <View>
                            <View>
                                <AirbnbRating
                                    count={10}
                                    reviews={["","","","",""]}
                                    defaultRating={rating}
                                    isDisabled={true}
                                    size={RFValue(25)}
                                    starContainerStyle={{marginTop: -30}}
                                    />
                            </View>
                            <View style={{flex:0.7,padding:15}}>
                            <Text>{overview}</Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity onPress={this.likedMovie}>
                                    <Icon
                                       reverse
                                       name={"check"}
                                       type={"entypo"}
                                       size={RFValue(30)}
                                       color={"red"}
                                       />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.unlikedMovie}>
                                    <Icon
                                       reverse
                                       name={"cross"}
                                       type={"entypo"}
                                       size={RFValue(30)}
                                       color={"blue"}
                                       />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this.notWatched}>
                                    <Text>Did not Watch</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
        }
        return null;
    }

}