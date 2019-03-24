import React, { useState, useRef } from 'react';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import { 
    Box,
    Flyout,
    IconButton,
    Heading,
    TextField,
    Label,
    Text,
    Button
} from 'gestalt';

const LoginForm = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const validateEmail = () => {
        if (email === '') {
            setEmailError('Oh noes, you forgot your email!');
            return false;
        } else {
            setEmailError('');
        }

        return true;
    }

    const validatePassword = () => {
        if (password === '') {
            setPasswordError('You didn\'t say the magic word.');
            return false;
        } else {
            setPasswordError('');
        }

        return true;
    }

    const validateForm = () => {
        let isValid = true;

        if (!validateEmail()) isValid = false;
        if (!validatePassword()) isValid = false;

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        props.onSubmit({ email, password })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" direction="column">
                <Box marginBottom={4}>
                    <Heading size="sm">Login</Heading>
                </Box>
                {
                    error &&
                    <Box marginBottom={4}>
                        <Text color="red">{ error }</Text>
                    </Box>
                }
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Label htmlFor="email">
                            <Text>Email</Text>
                        </Label>
                    </Box>
                    <TextField id="email"
                        type="email"
                        value={email}
                        placeholder="Email address"
                        errorMessage={emailError}
                        onChange={({ value }) => setEmail(value)}
                        onBlur={validateEmail}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Label htmlFor="password">
                            <Text>Password</Text>
                        </Label>
                    </Box>
                    <TextField id="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        errorMessage={passwordError}
                        onChange={({ value }) => setPassword(value)}
                        onBlur={validatePassword}
                    />
                </Box>
                <Box display="flex" justifyContent="between">
                    <Button inline
                        text="Signup"
                        color="red"
                        onClick={props.toggleForm}
                    />
                    <Button inline
                        text="Submit"
                        color="blue"
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
}

const SignupForm = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ emailError, setEmailError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');

    const validateEmail = () => {
        if (email === '') {
            setEmailError('How will we know you?');
            return false;
        } else {
            setEmailError('');
        }

        return true;
    }

    const validatePassword = () => {
        if (password === '') {
            setPasswordError('You\'ll need to set a password.');
            return false;
        } else {
            setPasswordError('');
        }

        return true;
    }

    const validateForm = () => {
        let isValid = true;

        if (!validateEmail()) isValid = false;
        if (!validatePassword()) isValid = false;

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        props.onSubmit({
            email,
            password,
        })
        .catch((error) => {
            setError(error.message);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" direction="column">
                <Box marginBottom={4}>
                    <Heading size="sm">Signup</Heading>
                </Box>
                { // Displays errors from firebase
                    error &&
                    <Box marginBottom={4}>
                        <Text color="red">{ error }</Text>
                    </Box>
                }
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Label htmlFor="email">
                            <Text>Email</Text>
                        </Label>
                    </Box>
                    <TextField id="email"
                        type="email"
                        value={email}
                        placeholder="Email address"
                        errorMessage={emailError}
                        onChange={({ value }) => setEmail(value)}
                        onBlur={validateEmail}
                    />
                </Box>
                <Box marginBottom={4}>
                    <Box marginBottom={2}>
                        <Label htmlFor="password">
                            <Text>Password</Text>
                        </Label>
                    </Box>
                    <TextField id="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        errorMessage={passwordError}
                        onChange={({ value }) => setPassword(value)}
                        onBlur={validatePassword}
                    />
                </Box>
                <Box display="flex" justifyContent="between">
                    <Button inline
                        text="Login"
                        color="red"
                        onClick={props.toggleForm}
                    />
                    <Button inline
                        text="Submit"
                        color="blue"
                        type="submit"
                    />
                </Box>
            </Box>
        </form>
    );
}

const LoginMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ isSignup, setIsSignup ] = useState(false);
  const anchorRef = useRef(null);

  const handleLogin = (payload) => {
      return props.firebase.login(payload);
  }

  const handleSignup = ({ email, password, ...profile}) => {
      return props.firebase.createUser({
          email,
          password,
      }, profile);
  }

  return (
    <React.Fragment>
      <Box paddingX={1} ref={anchorRef}>
        <IconButton
          icon="ellipsis"
          accessibilityHaspopup
          accessibilityLabel="board menu"
          accessibilityExpanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Box>
      {
        isOpen &&
        <Flyout
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => setIsOpen(false)}
          size="lg"
        >
          <Box display="flex" direction="column" flex="grow" padding={3}>
            {
                isSignup
                    ? <SignupForm 
                        onSubmit={handleSignup}
                        toggleForm={() => setIsSignup(!isSignup)}
                    />
                    : <LoginForm
                        onSubmit={handleLogin}
                        toggleForm={() => setIsSignup(!isSignup)}
                    />
            }
          </Box>
        </Flyout>
      }
    </React.Fragment>
  );
}

export default compose(withFirebase)(LoginMenu);