import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import FormDangKy from './Components/BaiTapQuanLyNguoiDung/FormDangKy';
import ProductList from './Components/BaiTapQuanLyNguoiDung/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<ProductList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
