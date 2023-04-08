import React, { useEffect, useState } from 'react'
import './cart.css';

interface prodType {
  id: number;
  category: string;
  prod: string;
  desc: string;
  price: number;
  productImage: string;
  quantity: number;
}
const Cart = (props: { RefreshMyCartDis: boolean, setRefreshMyCartDis: (newValue: boolean) => void,
                        Mycart: prodType[], setMycart: (newValue: prodType[]) => void }) => {
  // Assuming that the setRefreshCentralCart prop should be a function to update the RefreshCentralCart state value, 
  // the correct type for this prop in TypeScript is (newValue: boolean) => void.
  // Mycart: prodType[] - means mycart is an array of items that are of prodType type.
  // setMycart: (newValue: prodType[]) => void }) - means setMycart is a usestate function that is used to update mycart



  //const [CentralCart, SetCentralCart] = useState<prodType[]>([]) //to explicitly specify the type of CentralCart as an array of prodType
  useEffect(() => {
    let tempCart = localStorage.getItem('My Cart') // this will return null if there is still no 'My Cart' in storage
    if (tempCart) {
      props.setMycart(JSON.parse(tempCart));
    }
  }, [props.RefreshMyCartDis]);


  const [TOTALP, setTOTALP] = useState(0)
  useEffect(() => {
    let temp = 0
    props.Mycart.forEach(element => {
      temp = temp + (element.quantity * element.price)
    });
    setTOTALP(temp)
  }, [props.Mycart])

  const [TOTALQ, setTOTALQ] = useState(0)
  useEffect(() => {
    let temp = 0
    props.Mycart.forEach(element => {
      temp += element.quantity
    });
    setTOTALQ(temp)
  }, [props.Mycart])


  const AddRemoveBTTN = (i: prodType, q: number) => {
    i.quantity += q
    if (i.quantity === 0) {

      props.setMycart(props.Mycart.filter(item => item.id !== i.id))
      localStorage.setItem('My Cart', JSON.stringify(props.Mycart.filter(item => item.id !== i.id)))
      props.setRefreshMyCartDis(!props.RefreshMyCartDis)
    }
    else {
      localStorage.setItem('My Cart', JSON.stringify(props.Mycart))
      props.setRefreshMyCartDis(!props.RefreshMyCartDis)
    }

  }



  return (
    <div className='CartBar'>
      {/* The toLocaleString() method converts a number to a string with a language-sensitive representation of the number */}
      <p style={{ textAlign: 'center' }}><b>My Cart &#128722;</b></p>
      <p style={{ textAlign: 'center' }}><b>Quantity: {TOTALQ.toLocaleString()}</b></p>
      <p style={{ textAlign: 'center' }}><b>Subtotal: &#8362; {TOTALP.toLocaleString()}</b></p>
      {props.Mycart.map((i: prodType) => {
        return (
          <div className='CartItem' key={i.id}>
            <div>
              <div className='card border-dark mb-3' style={{ maxWidth: '14rem' }}>
                <div className='card-header'><b>{i.prod}</b></div>

                <p className='card-text'>{i.desc} - &#8362;{i.price}</p>

                <div>
                  <p className='AddRemove'>
                    <button className='AddRemoveBTTN' onClick={() => AddRemoveBTTN(i, -1)}>-</button>  {/*in Cart.jsx CreateUpdateCentralCart(mycart) is activated  */}
                    <span className='quan'>{i.quantity}</span>
                    <button className='AddRemoveBTTN' onClick={() => AddRemoveBTTN(i, 1)}>+</button>       {/*in Cart.jsx CreateUpdateCentralCart(mycart) is activated  */}
                  </p>
                  <div>Total Price: &#8362; {(i.quantity * i.price).toLocaleString()}</div>
                </div>



              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Cart