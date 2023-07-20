import React, { Component, createRef } from 'react'
import FromProduct from './FromProduct'

export default class ProductList extends Component {
    constructor(){
        super();
        this.ref = createRef();
    }

    state = {
        arrProduct: [],
    };
    addProduct = (sanPham) => {
        let newArrProduct = this.state.arrProduct;
        newArrProduct.push(sanPham);
        this.setState({
            arrProduct: newArrProduct,
        });
    };
    delProduct = (id) => {
        let index = this.state.arrProduct.findIndex((item) => item.id == id);
        if (index != -1) {
            let newArrProduct = [...this.state.arrProduct];
            newArrProduct.splice(index, 1);
            this.setState({
                arrProduct: newArrProduct,
            });
        }
    }
    layThongTinSanPham = (id) => {
        let sanPham = this.state.arrProduct.find((item) => item.id == id);
        this.ref.current.setState({
            ...this.ref.current.state,
            value: sanPham,
        });
    }
    capNhatSanPham = (sanPham)=>{
        let index = this.state.arrProduct.findIndex((item)=>item.id == sanPham.id);
        if (index !=-1){
            let newArr = [...this.state.arrProduct]
            newArr[index] = sanPham;
            this.setState({
                arrProduct: newArr,
            })
        }
    }
    render() {
        console.log(this.state.arrProduct)
        return (
            <div>
                <div className="container fs-3 ">
                    <FromProduct ref={this.ref} themSanPham={this.addProduct} capNhatSanPham={this.capNhatSanPham} />
                    <div>
                        <table className='table mt-5'>
                            <thead className='bg-black text-white rounded-bottom'>
                                <td>Id</td>
                                <td>Phone Number</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Action</td>
                            </thead>
                            <tbody>
                                {this.state.arrProduct.map((item, index) => {
                                    const { id, name,email, phoneNumber } = item;
                                    return <tr key={index}>
                                        <td>{id}</td>
                                        <td>{phoneNumber}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => {
                                                this.delProduct(id);
                                            }}>Delete</button>
                                            <button className='btn btn-warning' onClick={() => {
                                                this.layThongTinSanPham(id);
                                            }}>Edit</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
