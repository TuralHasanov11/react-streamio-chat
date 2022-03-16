import {createContext, useState} from 'react'


const ChannelContext = createContext({
    createType:'',
    isCreating:false,
    isEditing:false,
    toggleContainer:false,
    teamChannels:[],
    directChannels:[],
    setCreateType:()=>{},
    setIsCreating:()=>{},
    setIsEditing:()=>{},
    setToggleContainer:()=>{},
    updateChannel:()=>{},
    setTeamChannels:()=>{},
    setDirectChannels:()=>{},

})

export function ChannelContextProvider(props){
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [toggleContainer, setToggleContainer] = useState(false)
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])


    // async function createChannel({channelName, selectedUsers}){
    //     try {
    //         const newChannel = await client.channel(createType, channelName, {
    //             name: channelName, members: selectedUsers
    //         });

    //         await newChannel.watch();

            
    //         setIsCreating(false);
    //         setActiveChannel(newChannel);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function updateChannel({channel, channelName, selectedUsers}){
        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }
    }

    // async function getChannels(text){
    //     const channelResponse = client.queryChannels({
    //         type: 'team', 
    //         name: { $autocomplete: text }, 
    //         members: { $in: [client.userID]}
    //     });
    //     const userResponse = client.queryUsers({
    //         id: { $ne: client.userID },
    //         name: { $autocomplete: text }
    //     })

    //     const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

    //     if(channels.length) setTeamChannels(channels);
    //     if(users.length) setDirectChannels(users);
    // }

    // function setChatActiveChannel(channel){
    //     setActiveChannel(channel)
    // }
    
    return <ChannelContext.Provider value={{
        createType,
        isCreating,
        isEditing,
        toggleContainer,
        teamChannels,
        directChannels,
        setCreateType,
        setIsCreating,
        setIsEditing,
        setToggleContainer,
        updateChannel,
        setTeamChannels,
        setDirectChannels,
    }}>
        {props.children}
    </ChannelContext.Provider>
}

export default ChannelContext