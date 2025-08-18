import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <label>
        Username:
        <input
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Confirm Password:
        <input
          type="password"
          name="passwordConf"
          value={passwordConf}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" disabled={isFormInvalid()}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;