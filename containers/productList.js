import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import ProductListItem from "../components/ProductListItem";
let URI = "http://10.100.100.65:4000";

class ProductList extends Component {
    componentDidMount() {
        this.props.actions.getProducts();
    }

    _keyExtractor(p, i){
        return `${p.id}`;
    }

    _renderItem = ({item}) => (
    <ProductListItem
        {...this.props}
        id={item.id}
        title={item.title}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
    />
    );

    render() {
        const { products, isLoading} = this.props;
        // products.map(p => {console.log(p.price)});
        products.sort(function(a, b){
            return b.price - a.price;
        }) 
        return (
            <View style={{flex:1,backgroundColor:'#dfdfdf'}}>
                {isLoading ? (
                    <View style={{flex:1, justifyContent: "center"}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>
                ) :(
                    <FlatList
                    data={products}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                    />
                )
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productState.products,
        isLoading: state.productState.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActionCreators, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);