import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Shop.css';
import Cart from '../cart/cart';

const CategorySnacks = (props: { CategoryName: string }) => {

    const [Mycart, setMycart] = useState<prodType[]>([]);                    //Mycart is an array of elements that are of type prodType
    const [RefreshMyCartDis, setRefreshMyCartDis] = useState<boolean>(false);

    const [CATNAME, setCATNAME] = useState<string>('');
    useEffect(() => {
        setCATNAME(props.CategoryName)
    }, [props.CategoryName])


    interface prodType {
        id: number;
        category: string;
        prod: string;
        desc: string;
        price: number;
        productImage: string;
        quantity: number;
    }
    const [superProds, setSuperProds] = useState<prodType[]>([]); //superProds (GET) is an array of elements that are of type prodType, there is no quantity in superProds but apparently that's okay..

    const MY_SERVER = 'http://localhost:5006/superProds';
    const GetProds = async () => {
        let res = await axios.get<prodType[]>(MY_SERVER);
        setSuperProds(res.data.filter(i => i.category === CATNAME));
    }
    useEffect(() => { GetProds() }, [CATNAME]);

    

    const AddToCart = async (i: prodType) => {
        let iAR = Mycart.filter(item => item.id === i.id)[0];  // this will return null if there is no match (similar item was not in cart)
        if (iAR) {
            //if found (not null) then update quantity +1       
            iAR.quantity += 1;
            localStorage.setItem('My Cart', JSON.stringify(Mycart)); //array is byref !
            setRefreshMyCartDis(!RefreshMyCartDis); //to update the quantity number in the cart.tsx component          
        }
        else {
            //if new item to cart, add item to cart with default quantity 1
            const newItemInMyCart = { id: i.id, prod: i.prod, category: i.category, desc: i.desc, price: i.price, productImage: i.productImage, quantity: 1 }
            //let res = await setMycart([...Mycart, newItemInMyCart]); //no need for this line because my cart is updated in the useEffect below (if i want mycart to be updated and rendered immediatly then I should keep this line)
            localStorage.setItem('My Cart', JSON.stringify([...Mycart, newItemInMyCart]));
            setRefreshMyCartDis(!RefreshMyCartDis) //to update the quantity number in the cart.tsx component
        }
    }

    useEffect(() => {    // so when the component mounts, this useEffect automatically update mycart according to what is stored in local storage (only once when component mounts)
        let temp = localStorage.getItem('My Cart')
        if (temp) { //only of temp is not null
            setMycart(JSON.parse(temp))
        }
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <div className='Menu'>
                {superProds.map((i) =>
                    <div key={i.id}>
                        <div className='card border-dark mb-3' style={{ width: '18rem' }}>
                            <div className='card-header'><b>{i.prod}</b></div>
                            <div className='card-body'></div>
                            <h5 className='card-title'>{i.desc}</h5>
                            <img src={require('../assets/' + i.productImage)} alt='placeholder.png' height={'200px'}></img>
                            <p className='card-text' style={{ fontSize: 'larger' }}>&#8362;{i.price}</p>
                            <button className='btn btn-dark' onClick={() => AddToCart(i)}>Add To Cart</button>
                        </div>
                    </div>)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Cart RefreshMyCartDis={RefreshMyCartDis} setRefreshMyCartDis={setRefreshMyCartDis} Mycart={Mycart} setMycart={setMycart} />
            </div>
        </div>
    )
}


export default CategorySnacks