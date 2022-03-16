import { useContext, useEffect } from 'react'
import { StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth } from './components'

import 'stream-chat-react/dist/css/index.css'
import AuthContext from './store/auth-context'

const cookies = new Cookies();

const apiKey=process.env.STREAM_API_KEY
const authToken = cookies.get("token");
const user = cookies.get('user')

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: user.userId,
        name: user.username,
        fullName: user.fullName,
        image: user.avatarURL,
        hashedPassword: user.hashedPassword,
        phoneNumber: user.phoneNumber,
    }, authToken)

}


function App() {

  const authCtx = useContext(AuthContext)

  if(!authCtx.isAuth){
    return <Auth />
  }

  return (
    <div className="App app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
