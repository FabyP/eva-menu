import React, { useEffect, useState } from 'react';
import './cart.css'
import Form from 'react-bootstrap/Form'
import http from '../../http-common';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumericInput from 'react-numeric-input';
import {useGlobalState} from '../../context/global-context';


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(0.0);
    const {cartCount, fetchCartCount} = useGlobalState();

    const fetchCart = async () => {
        await http.get('/cart')
            .then(function (response) {
                let cart = JSON.parse(response.data.data);
                //setCartItems(response.data.data.cartitems);
                setCartItems(cart.cartitems);
                setPrice(parseFloat(cart.price.toFixed(2)));
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    const updateBasket = async( menuItemId, qty ) => {
        await http.patch('/cart', {
          menuItemId: menuItemId,
          qty: qty
        })
        .then(function (response) {
            fetchCart();
            fetchCartCount();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    console.log(price);
    useEffect(() => {
         fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const listItems = cartItems.map((item) =>
    <div className="row mb-4">
    
                                        <div className="col-md-5 col-lg-3 col-xl-3">
                                            <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                                <img
                                                    className="img-fluid w-100"
                                                    src={item.image}
                                                    alt="Sample"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-lg-9 col-xl-9">
                                            <div>
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <p className="mb-3 text-muted text-uppercase small">
                                                        {item.description}
                                                        </p>
                                                        <p className="mb-3 text-muted text-uppercase small">
                                                        {item.ingredients}
                                                        </p>
                                                        
                                                    </div>
                                                    <Form>
                                                    <Form.Label>Anzahl</Form.Label>
                                                    <NumericInput  value={item.qty} min='0' onChange={(e) => (updateBasket(item._id,e))}></NumericInput>
                                                    </Form>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <a
                                                            href="#!"
                                                            type="button"
                                                            className="card-link-secondary small text-uppercase mr-3"
                                                        >
                                                            <i className="fas fa-trash-alt mr-1" /> Entferne Gericht{" "}
                                                        </a>
                                                    </div>
                                                    <p className="mb-0">
                                                        <span>
                                                            <strong>{item.menuitemprice} €</strong>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 
                                    
        );

    return (

        <div style={{ height: '1000px', overflowY: 'scroll' }}>
            <h1 className="title">Bestellung</h1>
            {
                /*Section: Block Content*/
            }
            <section>
                {/*Grid row*/}
                <div className="row">
                    {/*Grid column*/}
                    <div className="col-lg-8">
                        {/* Card */}
                        <div className="card wish-list mb-3">
                            <div className="card-body">
                            {listItems}

                                


                            </div>
                        </div>
                        {/* Card */}
                        {/* Card */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="mb-4">Informationen</h5>
                                <p className="mb-0"> .....</p>
                            </div>
                        </div>
                        {/* Card */}
                        {/* Card */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="mb-4">Zahlungsmittel</h5>
                                <img
                                    style={{ width: '50px', float: 'left' }}
                                    className="mr-2"
                                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa"
                                />
                                <img
                                    style={{ width: '50px', float: 'left' }}
                                    width="45px"
                                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express"
                                />
                                <img
                                    style={{ width: '50px', float: 'left' }}
                                    width="45px"
                                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard"
                                />

                            </div>
                        </div>
                        {/* Card */}
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-lg-4">
                        {/* Card */}
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="mb-3">Warenkorb</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Zwischensumme
                    <span>{price} €</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Gesamt</strong>
                                            
                                        </div>
                                        <span>
                                            <strong>{price} €</strong>
                                        </span>
                                    </li>
                                </ul>
                                <button
                                style={{ backgroundColor: '#13AA52', borderColor: '#13AA52'}}
                                
                                    type="button"
                                    className="btn btn-primary btn-block waves-effect waves-light"
                                >
                                    Bestellen
                            </button>
                            </div>
                        </div>
                        {/* Card */}
                        
                    </div>
                    {/*Grid column*/}
                </div>
                {/*Grid row*/}
            </section>;
            {
                /*Section: Block Content*/
            }
        </div>
    );
}
export default Cart;
