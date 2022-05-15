import React, {useState, useEffect} from 'react';
import './LoginForm.css';
import {Button, OutlinedInput, Container, FormLabel} from '@mui/material';
import {validate} from 'react-email-validator';

const LoginForm = ({addUser}) => {
    const defaultErrors = {
        username : ["", false],
        firstname :  ["", false],
        lastname :  ["", false],
        email :  ["", false],
        password :  ["", false],
        confirmPassword :  ["", false]
    }
    const defaultFormValues = {
        username : "",
        firstname : "",
        lastname : "",
        email : "",
        password : "",
        confirmPassword : ""
    };
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [submited, setSubmited] = useState(false);

    const isValid = (errors) => {
        let isValid = true;
        Object.values(errors).forEach(value => {
            if(value[1]){
                isValid = false;
            }
        });
        return isValid;
    }

    useEffect(() => {
        if(submited && isValid(errors)){
            addUser({
                username: formValues.username,
                firstname: formValues.firstname,
                lastname: formValues.lastname,
                email: formValues.email,
                password: formValues.password,
            });
            setFormValues(defaultFormValues);
        }
        setSubmited(false);
    }, [errors])

    // useEffect(() => {
    //     console.log(formValues)
    // }, [formValues])

    const handleChange = (e) => {
        const newValue = e.target.value;
        const name = e.target.name;
        setFormValues({...formValues, [name] : newValue});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmited(true);
        getErrors(formValues);
    }
    
    const getErrors = (values) => {
        const newErrors = defaultErrors;
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(values.username.length<6 || values.username.length>12){
            newErrors.username =  ["Username must be between 6 and 12 characters.", true];
        }
        if(!values.firstname) {
            newErrors.firstname = ["First name is required.", true];
        }
        if(!values.lastname) {
            newErrors.lastname = ["Last name is required.", true];
        }
        if(!validate(values.email)){
            newErrors.email = ["Email is not valid.", true];
        }
        if(!passwordValidation.test(values.password)){
            newErrors.password = [`Password must be more than 8 characters long and must contain 
            lower and upper case letters, a number and a special character [%,@,*...].`, true];
        }
        if(values.confirmPassword !== values.password){
            newErrors.confirmPassword = ["Passwords do not match.", true];
        }

        setErrors(newErrors);
    }
    return (
        <div>
            <Container maxWidth="sm" className="sss">
                <h2>Register</h2>
            <form className="container">
                <FormLabel>Username: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name= "username"
                    value = {formValues.username}
                    error={errors.username[1]}
                    onChange = {handleChange} />
                    <p>{ errors.username[0] }</p>
                <hr/>

                <FormLabel>First name: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name = "firstname"
                    value ={formValues.firstname}
                    error={errors.firstname[1]}
                    onChange = {handleChange} />
                    <p>{ errors.firstname[0] }</p>
                <hr/>

                <FormLabel>Last name: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name= "lastname"
                    value ={formValues.lastname}
                    error={errors.lastname[1]}
                    onChange = {handleChange}/>
                    <p>{ errors.lastname[0] }</p>
                <hr/>

                <FormLabel>Email: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name= "email"
                    value ={formValues.email}
                    error={errors.email[1]}
                    onChange = {handleChange}/>
                    <p>{ errors.email[0] }</p>
                <hr/>

                <FormLabel>Password: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name= "password"
                    value ={formValues.password}
                    error={errors.password[1]}
                    onChange = {handleChange}/>
                    <p>{ errors.password[0] }</p>
                <hr/>

                <FormLabel>Confirm password: </FormLabel>
                <OutlinedInput
                    type="text"
                    size = "small"
                    name= "confirmPassword"
                    value ={formValues.confirmPassword}
                    error={errors.confirmPassword[1]}
                    onChange = {handleChange}/>
                    <p>{ errors.confirmPassword[0] }</p>
                <hr/>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </form>
            </Container>
            
        </div>
    )
}

export default LoginForm;