import React from "react";
import { Formik,Form,Field,FieldArray,ErrorMessage } from 'formik';
import * as yup from "yup";
import KErrorMessage from "./components/KErrorMessage"

const validationSchema = yup.object({
  name:yup.string().required("Name is Required!"),
  phone:yup.number().min(1000000000,"Not Valid Phone Number!").max(9999999999,"Not Valid Phone Number!") .required("phone is Required"),
  password:yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  "Must Contain 8 Characters,One Uppercase,One LowerCase,One Number and One special case character"

  )
   .required("Password is Required"),
  gender:yup.string().required("Gender is Required!"),
  date:yup.date().required("Date of Birth is Required!"),
  income:yup.string().required("Income is Required!"),
  about:yup .string().min(5,"too short") .max(500,"too long") .required(" is Required!"),
  social:yup.array().of(yup.string("string is Required!") .min(4,"Too short").max(20,"Too long").required("Required"))
  .min(1, "Atleast One social Media is Required").required("Required")
  ,
  hobbies:yup.array().of(yup.string("string is Required!") .min(4,"Too short").max(20,"Too long").required("Required"))
  .min(1, "Atleast  one hobby is Required").required("Required")
  ,
})

const App=()=>{
  return(
    <div>
      <Formik 
      validationSchema={validationSchema}
      initialValues={{
        name:"",
        phone:"",
        password:"",
        gender:"",
        date:"",
        income:"",
        about:"",
        social:[],
        hobbies:[],
      }}
      onSubmit={(values)=>{
        console.log(values)
      }}
      >

     {({values})=>(
      <Form className="flex flex-col relative left-1/4  w-1/6 ">
      <label>Name:</label>
      <Field name="name" type="text" className="border"/>
      <KErrorMessage name="name"/>

      <label>phone:</label>
      <Field name="phone" type="number" className="border"/>
      <KErrorMessage name="phone"/>

      <label>password:</label>
      <Field name="password" type="password" className="border"/>
      <KErrorMessage name="password"/>

      
      <label >Gender:</label>
      <div className="flex gap-3">
      <label >Male:</label>
      <Field name="gender" value="male" type="radio" className="border flex flex-row"/>
      <label>Female:</label>
      <Field name="gender" value="female" type="radio"  />
      <KErrorMessage name="gender"/>

      </div>
      <label>Date:</label>
      <Field name="date" type="date" className="border"/>
      <KErrorMessage name="date"/>

      <label>Income:</label>
      <Field name="income" as="select" className="border">
        <option value="0">rs 0</option>
        <option value="1000">1000</option>
        <option value="10000">10000</option>
      </Field>
      <KErrorMessage name="income"/>

      <label>About:</label>
      <Field name="about" as="textarea" className="border"/>
      <KErrorMessage name="about"/>

      <label>Social:</label>
      <KErrorMessage name="social"/>
      <label>Facebook:</label>
      <Field name="social[0]" type="text" className="border"/>
      <KErrorMessage name="social.0"/>
      <label>Twitter:</label>
      <Field name="social[1]" type="text" className="border"/>
      <KErrorMessage name="social.1"/>
      <FieldArray 
         name="hobbies"
         render={arrayHelpers => (
           <div>
             {values.hobbies && values.hobbies.length > 0 ? (
               values.hobbies.map((hobby, index) => (
                 <div key={index}>
                   <Field name={`hobbies.${index}`} className="border mt-2"/>

                   <button className="border w-5 "
                     type="button"
                     onClick={() => arrayHelpers.remove(index)} // remove a hobbies from the list
                   >
                     -
                   </button>
                   <button className="border w-5"
                     type="button"
                     onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                   >
                     +
                   </button>
                 </div>
               ))
             ) : (
               <button className="border mt-3 p-1" type="button" onClick={() => arrayHelpers.push('')}>
                 {/* show this when user has removed all hobbies from the list */}
                 Add a hobbies
               </button>
             )}
             
           </div>
         )}
       />

<KErrorMessage name={`hobbies`}/>
      
      


      <button type="submit" className="border w-36 relative left-14 mt-3">Submit</button>

    </Form>

     )}

       </Formik>
    </div>
  )
}
export default App;
