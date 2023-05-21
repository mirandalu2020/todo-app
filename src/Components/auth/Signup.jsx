import { useContext } from 'react';
import { LoginContext } from '../../Context/Auth';

function SignUp(){

  const { signup } = useContext(LoginContext);

}

export default SignUp;