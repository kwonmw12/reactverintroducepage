import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import Navi from './Navi';


function Header(props){
  
  const targetRef = useRef(null); 
  const [isMobile, setisMobile ] = useState(false);
  const [naviOpen, setnaviOpen ] = useState(false);
  
  const resizeHandler =() =>{
    if( window.innerWidth <= 767 ){
      setisMobile(true);
    }else{
      setisMobile(false);
    }
    setnaviOpen(false); // 메뉴 오픈상태에서 스크롤일때 감추기
  }
  
  
  const handleScroll = () => {
    if (window.scrollY > 100) {
      targetRef.current.classList.add('scroll');          
    }else{
      targetRef.current.classList.remove('scroll')
    }
    setnaviOpen(false);
  };
  useEffect(() => {   
    resizeHandler(); // 모바일인지 아닌지 
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener('resize', resizeHandler )
    }, 100);    
    return () => {
      clearInterval(timer); 
      window.removeEventListener("scroll", handleScroll); 
      window.removeEventListener('resize', resizeHandler )
    };
  }, []); 

    return(
        <header ref={targetRef} id="hd" 
        className="App-header d-flex justify-content-between 
                  align-items-center px-lg-5 py-2 border-bottom  
                  fixed-top ">
          <h1 className="mb-0">
            <a href="#top" className="d-block">
              <Logo></Logo>
              {/* <img src="./img/logo.svg" className="img-fluid w-100" alt="logo" /> */}
            </a>
          </h1>
          <button className='btn d-md-none' id="allMenu" onClick={ e => {               
            setnaviOpen(!naviOpen)
            
          }} >햄버거</button>          
          
         <Navi cls={ isMobile ? 'mobileNavi' :  '' } toggle={ naviOpen ? 'on' : '' }  />
        </header>
    )
  }
export default Header;
  