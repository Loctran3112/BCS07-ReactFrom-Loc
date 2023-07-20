import React, { Component } from 'react'

export default class FromProduct extends Component {
    state = {
        value: {
            id: '',
            phoneNumber: '',
            name: '',
            email: '',
        },
        error: {
            id: '',
            phoneNumber: '',
            name: '',
            email: '',
        },
        activeButton: true,
    };
    getValueInput = (event) => {
        let { value, id } = event.target;
        // this.setState({
        //     [id]: value,
        // })

        // this.setState({
        //     value: {
        //         ...this.state.value,
        //         [id]: value,
        //     },
        // })

        let newValue = this.state.value;
        newValue[id] = value;

        // validation : check rỗng,check ký tự,check số
        let newError = this.state.error;
        // lấy data attribute được tạo ra ta dùng cú pháp event.target.getAttribute
        let type = event.target.getAttribute('data-type');
        // console.log(type)

        // check rỗng
        if (newValue[id] == '') {
            newError[id] = `${id} không được để trống`;
        } else {
            newError[id] = '';
            // check ký tự số
            // let regexNumber = /[0-9]/g;
            // if (type == 'number') {
            //     let result = regexNumber.test(newValue[id]);
            //     console.log(result)
            //     if (!result) {
            //         newError[id] = `${id} phải là số`;
            //     }
            // }
            switch (type) {
                case 'number':
                    {
                        let regexNumber = /^[0-9]*$/;
                        let result = regexNumber.test(newValue[id]);
                        // if (!result) {
                        //     newError[id] = `${id} phải là số`;
                        // }
                        newError[id] = result ? '' : id + ' phải là số';
                    }
                    break;
                case 'letter':
                    {
                        let regexLetter = /^[\p{L} ]+$/u;
                        let result = regexLetter.test(newValue[id]);
                        // if (!result) {
                        //     newError[id] = `${id} phải là kí tự`;
                        // }
                        newError[id] = result ? '' : id + ' phải là kí tự';
                    }
                    break;
            }
        }
        // check người dùng đã fill hết dữ liệu vào các input
        // check validation : check  người dùng không bị lỗi,cụ thể các thuộc tính trong error của state sẽ là chuỗi rỗng
        let valid = false;
        // dùng vòng lặp
        for (let item in this.state.error) {
            // check nếu thuộc tính trong error mà có chuỗi hoặc các input chưa có dữ liệu thì sẽ set valid = true
            if (this.state.error[item] !== '' || this.state.value[item] == '') {
                valid = true;
            }
        }
        console.log(valid)

        this.setState({
            value: newValue,
            error: newError,
            activeButton: valid,
        })
    }
    handleSubmit = (event) => {
        // chạy 1 phương thức giúp chặn browser reload lại trang
        event.preventDefault();
        console.log(this.state);
        // ở đây dùng phương thức themSanPham được truyền từ props để giúp arrProduct trên component productlist có thể lấy được sản phẩm
        // let st={...this.state.value}
        // this.props.themSanPham(st);
        this.props.themSanPham({...this.state.value});
    }
    render() {
        // console.log(this.state)
        const { id, phoneNumber, name, email } = this.state.error;
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="card text-white bg-success bg-opacity-50 mt-5">
                    <h1 className='bg-dark text-danger text-center'>Create Product</h1>
                    <div class="card-body">
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="">Id</label>
                                <input className="form-control" type="text" id="id"
                                    onChange={this.getValueInput}
                                    value={this.state.value.id} />
                                <p className='text-danger'>{id}</p>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Phone Number</label>
                                <input className="form-control" type="text" id="phoneNumber" onChange={this.getValueInput} value={this.state.value.phoneNumber}/>
                                <p className='text-danger'>{phoneNumber}</p>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <label htmlFor="">Name</label>
                                <input className="form-control" type="text" id="name" onChange={this.getValueInput} data-type='letter' value={this.state.value.name}/>
                                <p className='text-danger'>{name}</p>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Email</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    onChange={this.getValueInput} value={this.state.value.email}/>
                                <p className='text-danger'>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <button type='submit' className='btn btn-primary me-3' disabled={this.state.activeButton}>Tạo sản phẩm</button>
                        <button type='button' className='btn btn-warning' onClick={()=>{
                            let sanPham = {...this.state.value};
                            this.props.capNhatSanPham(sanPham);
                        }}>Cập nhật</button>
                    </div>
                </form>
            </div>
        )
    }
}
