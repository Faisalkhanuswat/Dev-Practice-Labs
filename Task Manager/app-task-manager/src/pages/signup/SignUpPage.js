import React, { Component } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

import './SignUpPage.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject('userStore', 'routerStore')
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      errorMessage: null,
    };
  }

  submit = async () => {
    const {name, username, password } = this.state;

    try {
      await this.props.userStore.signup(name, username, password);
      window.location.hash = '/signin';
    } catch (error) {
      let errorMessage;
      if(error?.response?.data.code === 'VALIDATION_ERROR'){
        errorMessage = Object.values(error.response.data.validationErrors)
      }else {
       errorMessage = error.message;
      }
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Start managing tasks easily.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Name"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <FormField
              id="outlined-username"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-password"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <p>
            Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special charracter.
          </p>
          <hr/>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
