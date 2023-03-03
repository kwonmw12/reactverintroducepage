////import interviewDBlink from '../json/preinterview.json';
import { useState, useEffect } from 'react';
import axios from 'axios';



const Preinterview = (props) => {

  const [faqlist, setfaqlist] = useState(null); // 비동기통신 useState의 null인 이유

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    
   //// const interviewjson = interviewDBlink[props.objnm]; 

    const fetchFaq = async () => {
      try {
         // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setfaqlist(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get(
        '//node14.cafe24app.com/notice?type=list'
      );
      setfaqlist( response.data );
      

      } catch (e) {
        setError(e);
      }
      setLoading(false); //응답받고 랜더링
      
    }


    useEffect(() => {
      fetchFaq(); //마우팅끝나고 바로 한번만 요청실행
    }, []);
    
   
   
    return(
      
      <section className="section py-5 text-center" id={props.contentid}>
          {   loading && <div>로딩중..</div> }
          { error &&  <div>에러가 발생했습니다</div>}
          {
            loading === false && <div>
                                  <h3>{props.title}</h3>
                                    <div className="py-5 container-md text-start">
                                      <ul>
                                        {
                                        //console.log(faqlist, Array.isArray(faqlist))
                                           faqlist && faqlist.map(function(value, index){
                                         
                                              return(
                                               
                                                <li  key={'interview'+index}>
                                                   <strong className='d-block border-bottom py-2 ' role="button" onClick={ e => { console.log( e.target.nextSibling.classList.toggle('d-none') ) }}>{value.subject}</strong>
                                                   <p className='py-5 d-none'>{value.content}</p>
                                                 </li>
                                              )
                                          }
                                          )
                                         }
                                      </ul>
                                    </div>
                                  </div>
          }
          
      </section>
    )
  }

  export default Preinterview;