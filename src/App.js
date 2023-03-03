import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Header from './component/Hd';
import Worksswiper from './component/Swiper';
import Preinterview from './component/Preinterview'
import Contact from './component/Contact';


function App() {
  return (
    <div className="App" id="top">
      <Header></Header>
      <Worksswiper></Worksswiper>      
      <Preinterview contentid="me" objnm="noticeObj"  title="공지사항" ></Preinterview>
      <Preinterview contentid="preInterview" objnm="preinterview"   title="사전인터뷰" ></Preinterview>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

const Footer = () =>{
  return(
    <footer className="py-5 border-top">
      <ul className="d-flex justify-content-center">
        <li><a href="">git</a></li>
        <li><a href="">instar</a></li>
        <li><a href="">notion</a></li>
      </ul>
    </footer>
  )
}

export default App;
