
import * as React from 'react';
import Comservices from 'clients/lib/com/Comservices';
import Types from 'clients/shop/data/types'
import Actions from 'clients/shop/data/actions'
import {connect} from 'react-redux';
import Input from 'clients/lib/component/input';

class Login extends React.Component <any, any > {

  static defaultProps = {
    locale:'en_us',
    lang:{
      en_us:{
        login: 'Login',
        password: 'Password',
        loading: 'Getting results',
      }
    },
  }

  private baseStatus = {
    current: false,
    success: false,
    messages: [],
  }

  constructor(props:any){
    super(props);
    this.state = {
      active:{
        login: false,
        word: false,
      },
      loading: false,
      login: '',
      word: '',
      status:{
        current: false,
        success: false,
        messages: [],
      }
    }
  }

  componentWillReceiveProps (data:any) {
    console.log('Login: receives props');
    console.log(data);
    if(data.status){
      this.setState({
        status: data.status,
        loading: false
      });
    }

  }

  toggle = (e:any) => {
    e.preventDefault();
    this.setState({
      open: this.state.open === false,
      status: this.baseStatus
    });
  }

  submit = (e:any) => {
    e.preventDefault();

    Comservices.action({
      type: 'POST',
      action: Actions.login,
      uri: 'authenticate',
      data: {
        login: this.state.login,
        pw: this.state.word,
      },
    });

    this.setState({
      loading: true,
      status: this.baseStatus
    });

  }

  setValue = (value: fieldValue) => {
    this.setState({
      status: this.baseStatus,
      [value.name]: value.value
    });
  }

  messages = () =>{
    if(this.state.status.current){

      let success = this.state.status.success;

      return  this.state.status.messages.map((message:string, key: number) => {
        return (
          <li className={success ? 'success' : 'error'} key={key}>{message}</li>
        )

      });
    }

    return null;
  }

  render() {

    let tabClass    = ['login-tab', this.state.open  ? 'open' : 'close'];

    let loginState = ['login col-md-12', this.state.open ? 'open' : null];

    let loadingState = ['loading', this.state.loading ? 'on' : null];

    let activeMessages = ['messages', this.state.status.current ? 'active' : null];

    return(

      <div className= {loginState.join(' ')}>

        <div className={loadingState.join(' ')}>
            <p>{this.props.lang[this.props.locale].loading}</p>
        </div>

        <ul className={activeMessages.join(' ')}>
          {this.messages()}
        </ul>

        <form>

          <Input
            label={this.props.lang[this.props.locale].login}
            handler={this.setValue}
            type="text"
            name="login" />

          <Input
            label={this.props.lang[this.props.locale].password}
            handler={this.setValue}
            type="password"
            name="login" />

          <input type="submit" value="login" onClick={e => this.submit(e)}/>
        </form>

        <div className={tabClass.join(' ')}>
          <button onClick= {e=>this.toggle(e)}>
            {this.props.lang[this.props.locale].login}
          </button>
        </div>

      </div>

    );
  }
}

let mapper = (data:any) => {

  let parse = data.shopping ? data.shopping : null;
  console.log('LOGIN mapper ');
  console.log(parse);
  if(parse){
    let keys = Object.keys(parse);

    console.log(keys);
    console.log(/(response_error|login)/.test(keys.join( )) );

    if(/(response_error|login)/.test(keys.join( )) ){
      let type    = keys[0];
      let data    = parse[type];
      let message = data.message ? [data.message] : [];
      let d_type  = data.type ? data.type : 'no_response_type';
      let status = {
        status: {
          current: true,
          success: d_type === 'error' ? false : true,
          messages: message
        }
      }
      console.log(status);
      return  status;
    }
  }
  return {}

}

export default connect(mapper,{})(Login);