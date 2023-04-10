import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Shop.css';

const Admin = () => {

    const [prod, setprod] = useState("")
    const [category, setcat] = useState("")
    const [desc, setdesc] = useState("")
    const [price, setprice] = useState(0)
    const [productImage, setproductImage] = useState('placeholder.png')

    interface prodType {
        id: number;
        category: string;
        prod: string;
        desc: string;
        price: number;
        productImage: string;
    }
    const [superProds, setSuperProds] = useState<prodType[]>([]);  //to explicitly specify the type of CentralCart as an array of prodType
    const [refreshFlag, setrefreshFlag] = useState<boolean>(true)

    const MY_SERVER = 'http://localhost:5006/superProds'
    const GetProds = async () => {
        let res = await axios.get<prodType[]>(MY_SERVER);
        setSuperProds(res.data);
    }
    useEffect(() => { GetProds() }, [refreshFlag])

    const PostProd = () => {
        axios.post(MY_SERVER, { prod, category, desc, price, productImage })
    setrefreshFlag(!refreshFlag)
    }

    const DelProd = (itemid: number) => {
        axios.delete(MY_SERVER+'/'+itemid)
    setrefreshFlag(!refreshFlag)
    }

    const PutProd = async(itemid: number) => {
        let res = await axios.put(MY_SERVER+'/'+itemid, { prod, category, desc, price, productImage })
    setrefreshFlag(!refreshFlag)
    }


    return (
        <div>



            <div className='AdminProducts'>
                <br />
                <input type='text' placeholder='product' className="form-control" onChange={(e) => setprod(e.target.value)} />
                <select placeholder='category' className="form-control" onChange={(e) => setcat(e.target.value)}>

                    <option value="">Choose a category</option>
                    <option value="dairy">Dairy</option>
                    <option value="meats">Meat</option>
                    <option value="snacks">Snacks</option>
                </select>

                <input type='text' placeholder='description' className="form-control" onChange={(e) => setdesc(e.target.value)} />
                <input type='number' placeholder='price' className="form-control" onChange={(e) => setprice(+e.target.value)} />
                <input type='text' placeholder='image' className="form-control" onChange={(e) => setproductImage(e.target.value)} />
                <br/>
                <button type="button" className="btn btn-secondary" onClick={() => PostProd()}>Add Product</button>
                <br/><br/>
            </div>


            <div className='Menu'>
                {superProds.map((i) =>
                    <div key={i.id}>
                        <div className='card border-dark mb-3' style={{ width: '18rem' }}>
                            <div className='card-header'><b>{i.prod}</b></div>
                            <div className='card-body'></div>
                            <h5 className='card-title'>{i.desc}</h5>
                            <img src={require('../assets/' + i.productImage)} alt='placeholder.png' height={'200px'}></img>
                            <p className='card-text' style={{ fontSize: 'larger' }}>&#8362;{i.price}</p>
                            {/* <button className='btn btn-dark' onClick={() => AddToCart(i)}>Add To Cart</button> */}
                            <button type="button" className="btn btn-secondary" onClick={() => PutProd(i.id)}>Update Product</button>
                            <button type="button" className="btn btn-danger" onClick={() => DelProd(i.id)}>Delete Product</button>
                        </div>
                    </div>)}
            </div>



        </div>
    )
}


export default Admin