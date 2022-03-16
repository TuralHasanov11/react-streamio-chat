import { useState, useEffect, useContext } from 'react';

import { ResultsDropdown } from './'
import { SearchIcon } from '../assets';
import ChannelContext from '../store/channel-context';
import { useChatContext } from 'stream-chat-react';


function ChannelSearch(){

    const { client, setActiveChannel } = useChatContext();
    const channelCtx = useContext(ChannelContext)
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!query) {
            channelCtx.setTeamChannels([])
            channelCtx.setDirectChannels([])
        }
    }, [query])


    async function getChannels(text){
        try {
            // channelCtx.getChannels(text)                
            const channelResponse = client.queryChannels({
                    type: 'team', 
                    name: { $autocomplete: text }, 
                    members: { $in: [client.userID]}
                });
                const userResponse = client.queryUsers({
                    id: { $ne: client.userID },
                    name: { $autocomplete: text }
                })

                const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

                if(channels.length)  channelCtx.setTeamChannels(channels);
                if(users.length)  channelCtx.setDirectChannels(users);
        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (event)=>{
        event.preventDefault()

        setLoading(true)
        setQuery(event.target.value)
        getChannels(event.target.value)
    }

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
    }


    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input type="text" 
                    className='channel-search__input__text' 
                    placeholder='Search' 
                    value={query} onChange={onSearch} 
                />
            </div>
            { query && (
                <ResultsDropdown 
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                />
            )}
        </div>
    )
}

export default ChannelSearch