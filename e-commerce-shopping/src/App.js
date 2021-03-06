import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/signin-and-signup/signin-and-signup.component';
import { auth, createUserProfileDocument } from './components/firebase/firebase.utils';


class App extends React.Component {
  constructor(){
    super();

    this.state={
      currentUser :null
    }
  }

  unSubscribeAuth = null;

  componentDidMount (){
    this.unSubscribeAuth = auth.onAuthStateChanged( async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
          this.setState({
            currentUser: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      this.setState({currentUser:userAuth})
    });
  }

  componentWillUnmount(){
    this.unSubscribeAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
