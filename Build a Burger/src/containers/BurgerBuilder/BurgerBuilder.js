import React, {Component} from 'react';
import axios from '../../axios-order';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                this.updatePurchaseState(response.data);

                const sum = Object.keys(response.data)
                    .map(igKey => {
                        return response.data[igKey] * INGREDIENT_PRICES[igKey];                        
                    })
                    .reduce((sum, el) => {
                        return sum+ el;
                    }, 0);

                const newPrice = this.addPrice(sum);

                this.setState({totalPrice: newPrice});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchasable: sum > 0});
    }

    addPrice(price) {
        const oldPrice = this.state.totalPrice;
        return oldPrice + price;
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.addPrice(INGREDIENT_PRICES[type]);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    deductPrice(price) {
        const oldPrice = this.state.totalPrice;
        return oldPrice - price;
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.deductPrice(INGREDIENT_PRICES[type]);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Test Customer',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '11111',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error? <p style={{textAlign:'center'}}>Ingredients can't be loaaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (<Auxiliary>
                            <Burger ingredients={this.state.ingredients} />
                            <BuildControls 
                                ingredientAdded={this.addIngredientHandler} 
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo}
                                purchasable={this.state.purchasable}
                                ordered={this.purchaseHandler}
                                price={this.state.totalPrice} />
                        </Auxiliary>);

            orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                continueHandler={this.purchaseContinueHandler}
                                cancelHandler={this.purchaseCancelHandler}
                                price={this.state.totalPrice} />;
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);