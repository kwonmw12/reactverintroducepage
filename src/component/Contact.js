import * as React from 'react';
import { useState } from 'react';
import Select from "react-select";
import { useForm , Controller} from "react-hook-form";
import { Checkbox, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import axios from "axios";




function Contact(props) {

  const styleValue = ['html_css','jQuery','ECMA6','react','node','php'];
  const radioValue = ['파트타임','하루종일','딱 8시간'];

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      company: '',
      email: '',
      gender: '',
      age : '',
      ability: [],      
      worktime: radioValue[0],
      select :{ value: "chocolate", label: "Chocolate" }
    }
  })
//sql 쿼리문으로 서버(리액트가 아닌 노드가)에서 들어갈 수 있도록 처리해야한다.
// 리액트는 그저 이 정보를 서버에 전달만 하고 결과만 받으면 됨
//   INSERT INTO `bby_contact` (`id` , `company`, `email`, `gender`, `age`, `ability`, `worktime`, `select` )
//   VALUE (null, '회사이름','4thdraw@naver.com','f','50', '["html_css","php"]', '파트타임', '{"value":"strawberry","label":"Strawberry"}')
  
  const onSubmit = async (data) => {
    setLoading(true);
    alert(JSON.stringify(data));

    // try {
    //     const response = await axios.post("노드서버라우트", {
    //       email,
    //       name,
    //       userpwd,
    //       phone,
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     alert(error.response.data);
    // }

    setLoading(false);
  };



  return (
    <section className='container'>
        <div className="row">
            <div className='col-4'>
                여기에 사진넣을까????<br />
                아님 뭐넣을까?????<br />
                당신이 나한테 연락을 해야하는 이유를 넣는다...
            </div>
            <div className='col'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ul>
                        <li>
                            <span>회사명</span>
                            <input {...register("company" ,  {
                                    required: true,
                                    
                                    }) } />
                            {errors.company && <p role="alert">회사이름을 기입해주세요</p>}
                        </li>
                        <li>
                            <span>이메일</span><input {...register("email" ,  {
                            required: '이메일을 넣어주세요',
                            pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "이메일 형식에 맞지 않습니다.",
                            },
                        }) }  placeholder="test@email.com" />
                        {errors.email && <p role="alert">{errors.email.message}</p>}
                        </li>                            
                        <li>
                            <span>하나선택</span>
                            <select {...register("gender", {required: true, message: "꼭 하나선택하기" })}>
                                <option value="f">female</option>
                                <option value="m">male</option>
                                <option value="o">other</option>
                            </select>
                            {errors.gender && <p role="alert">{errors.gender.message}</p>}
                        </li>
                        <li>
                           <span>수치넣기</span> 
                           <input type="number" {...register("age", { min: 18, max: 99 })} />
                           {errors.age && (
          <p>You Must be older then 18 and younger then 99 years old</p>
        )}
                        </li>
                        <li>
                        <Controller
                            name="select"
                            control={control}
                            render={({ field }) => <Select 
                            {...field} 
                            options={[
                                { value: "chocolate", label: "Chocolate" },
                                { value: "strawberry", label: "Strawberry" },
                                { value: "vanilla", label: "Vanilla" }
                            ]} 
                            />}
                        />
                        </li>
                        <li>
                            {
                                styleValue.map(( item, idx ) =>{
                                    return(
                                        <FormControlLabel
                                            control={
                                                <Checkbox                                                    
                                                    {...register('ability') }
                                                    value={item}
                                                />
                                            }
                                            label={item}
                                            />
                                    )

                                })
                            }
                        
                        </li>
                        <li>
                        <RadioGroup                          
                          className='flex-md-row '
                        >
                           {
                                radioValue.map(( item, idx ) =>{
                                    return(                                        
                                     <FormControlLabel value={item} {...register('worktime') }  control={<Radio />} label={item} />
                                    )

                                })
                            }
                              </RadioGroup>
                        </li>
                    </ul>                    
                    <input type="submit" />
                </form>
            </div>
        </div>
    </section>    
  );
  
}

export default Contact;