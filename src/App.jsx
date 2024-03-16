import { Route, Routes } from "react-router-dom"
import Upload from "./pages/Upload"
import Home from "./pages/Home"
import SwiperPage from "./pages/Swiper"

function App() {

  return (
    <div className="bg-[#cac1d8] min-h-screen text-black w-full max-w-[1500px] mx-auto px-2 md:px-5">
      <Routes>
        <Route path="/" element={<SwiperPage ></SwiperPage>} />
        <Route path="/home" element={<Home ></Home>} />
        <Route path="/upload" element={<Upload></Upload>} />
      </Routes >
    </div>
  )
}

export default App
