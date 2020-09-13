import React, { useEffect, useState } from 'react';
import './cart.css'
import Form from 'react-bootstrap/Form'
import http from '../../http-common';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumericInput from 'react-numeric-input';
import {useGlobalState} from '../../context/global-context';
import Cookies from 'universal-cookie';


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState(0.0);
    const {cartCount, fetchCartCount} = useGlobalState();
    const [error, setError] = useState('');
 

    const fetchCart = async () => {
        await http.get('/cart')
            .then(function (response) {
                let cart = JSON.parse(response.data.data);
                //setCartItems(response.data.data.cartitems);
                setCartItems(cart.cartitems);
               
                setPrice(cart.price);
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
    function handleNoteChange(id, e){
        let note = e.target.value;
        console.log(e.target.value);
        console.log(id);
        let index = cartItems.findIndex(x => x._id === id);
        console.log(index);
        setCartItems([...cartItems].map(item => {
            if(item._id === id){
                return {
                    ...item,
                    note: note,
                  } 
            }else{
                return item;
            }
        }))
    }
// 0: {_id: "5f3a9a22565f8134320ba59d", categoryID: "5f3aa56b565f8134320ba5b4", name: "Spargelcremesuppe", description: "mit Schnittlauchsahne und Croutons", image: "https://images.lecker.de/,id=2305507c,b=lecker,w=610,cg=c.jpg", …}
//1: {_id: "5f3a9ee8565f8134320ba59e", categoryID: "5f3aa56b565f8134320ba5b4", name: "BBQ- Rippchen mit Knoblauchdip", description: "an kleiner Salatgarnitur und Baguette", image: "https://rezept.sz-magazin.de/wp-content/uploads/2018/08/spareribs-rippchen-grillen-rezept.jpeg", …}
        function order(){
            const cookies = new Cookies();
            let table = cookies.get('table');
            let secret = cookies.get('s');
            if(table == null || secret == null){
                setError('Bitte scannen sie den QR-Code auf ihrem Tisch ab');
            }
            console.log(table);
            console.log(secret);
        }
   
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
                                                        <br></br>
                                                        <span>Anmerkung</span>
                                                    </div>
                                                    <p className="mb-0">
                                                        <span>
                                                            <strong>{item.menuitemprice} €</strong>
                                                        </span>
                                                    </p>
                                                </div>
                                               
                                                <textarea data-id={item._id} style={{width: '50%'}} onChange={(e)=> handleNoteChange(item._id,e)}>
                                                </textarea>
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
                                {error ? <div class="alert alert-danger" role="alert">
                                        {error}
                                </div> :''}
                                
                                <button
                                style={{ backgroundColor: '#13AA52', borderColor: '#13AA52'}}
                                
                                    type="button"
                                    className="btn btn-primary btn-block waves-effect waves-light"
                                    onClick={() => order()}
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
