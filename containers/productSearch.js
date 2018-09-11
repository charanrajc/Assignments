import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/product";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from 'react-native-elements';
import ProductListItem from "../components/ProductListItem";
let URI = "http://10.100.100.65:4000";

class ProductSearch extends Component {
    componentDidMount() {
        this.props.actions.getProducts();
        this.props.actions.getSearchProduct(this.props.products, "");
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

    _onSearch = (searchProduct) => {
        console.log(searchProduct.length)
        let filterProduct = this.props.products.filter((fill) => fill.title.toLowerCase().indexOf(searchProduct.toLowerCase())> -1);
        this.props.actions.getSearchProduct(filterProduct, searchProduct);
    }

    render() {
        const { products, isLoading, filteredProducts} = this.props;
        console.log("--" + filteredProducts.length, this.props.products.length);
        // products.map(p => {console.log(p.price)});
        filteredProducts.sort(function(a, b){
            return a.rating - b.rating;
        }) 
        return (
            <View style={{flex:1,backgroundColor:'#dfdfdf'}}>
                <SearchBar
                lightTheme
                onChangeText={this._onSearch.bind(this)}
                onClearText={this._onSearch.bind(this)}
                placeholder='Search Products' />
                {isLoading ? (
                    <View style={{flex:1, justifyContent: "center"}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>
                ) :(
                    filteredProducts.length > 0 ?
                      <FlatList
                        data={filteredProducts}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                       
                      />
                      :
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>No Products found  </Text>
                        
                      </View>
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
        filteredProducts: state.productState.filteredProducts,
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
)(ProductSearch);