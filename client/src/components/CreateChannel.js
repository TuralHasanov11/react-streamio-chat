import {UserList} from './'
import {CloseCreateChannel} from '../assets'
import { useContext, useState } from 'react'

import ChannelContext from '../store/channel-context'
import { useChatContext } from 'stream-chat-react';


const ChannelNameInput = ({channelName='', setChannelName})=>{

    const channelNameChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return <div className="channel-name-input__wrapper">
        <p>Name</p>
        <input value={channelName} onChange={channelNameChange} placeholder='Channel-name'/>
        <p>Add Members</p>
    </div>
}

function CreateChannel(){

    const channelCtx = useContext(ChannelContext)
    const { client, setActiveChannel } = useChatContext();

    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel = async (e) => {
        e.preventDefault();

        // channelCtx.createChannel({channelName, selectedUsers})

        try {
            const newChannel = await client.channel(channelCtx.createType, channelName, {
                name: channelName, members: selectedUsers
            });

            await newChannel.watch();

            
            channelCtx.setIsCreating(false);
            setActiveChannel(newChannel);
            setChannelName('');
            setSelectedUsers([client.userID]);
        } catch (error) {
            console.log(error);
        }

        
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{channelCtx.createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel />
            </div>
            {channelCtx.createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{channelCtx.createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel