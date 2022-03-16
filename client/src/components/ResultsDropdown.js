import { useContext } from 'react';
import { Avatar } from 'stream-chat-react';
import ChannelContext from '../store/channel-context';

const ChannelByUser = async ({ channel, setChannel }) => {
  
  const channelCtx = useContext(ChannelContext)

  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [channelCtx.client.user.id, channelCtx.client.userID] },
  };

  const [existingChannel] = await channelCtx.client.queryChannels(filters);

  if (existingChannel) return channelCtx.setActiveChannel(existingChannel);

  const newChannel = channelCtx.client.channel('messaging', { members: [channel.id, channelCtx.client.userID] });
  
  setChannel(newChannel)

  return channelCtx.setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel }) => {
  
  const channelCtx = useContext(ChannelContext)

  if (type === 'channel') {
    return (
      <div
        onClick={() => {
          setChannel(channel)
          if(channelCtx.setToggleContainer) {
            channelCtx.setToggleContainer((prevState) => !prevState)   
          }
        }}
        className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container' }
      >
        <div className='result-hashtag'>#</div>
        <p className='channel-search__result-text'>{channel.data.name}</p>
      </div>
    );
  }

  return (
    <div
      onClick={async () => {
        ChannelByUser({ channel, setChannel })
        if(channelCtx.setToggleContainer) {
          channelCtx.setToggleContainer((prevState) => !prevState)   
        }
      }}
      className={focusedId === channel.id ? 'channel-search__result-container__focused' : 'channel-search__result-container' }
    >
      <div className='channel-search__result-user'>
        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
        <p className='channel-search__result-text'>{channel.name}</p>
      </div>
    </div>
  );
};

const ResultsDropdown = ({ focusedId, loading, setChannel }) => {

  const channelCtx = useContext(ChannelContext)

  return (
    <div className='channel-search__results'>
      <p className='channel-search__results-header'>Channels</p>
      {loading && !channelCtx.teamChannels.length && (
        <p className='channel-search__results-header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !channelCtx.teamChannels.length ? (
        <p className='channel-search__results-header'>
          <i>No channels found</i>
        </p>
      ) : (
        channelCtx.teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
          />
        ))
      )}
      <p className='channel-search__results-header'>Users</p>
      {loading && !channelCtx.directChannels.length && (
        <p className='channel-search__results-header'>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !channelCtx.directChannels.length ? (
        <p className='channel-search__res ults-header'>
          <i>No direct messages found</i>
        </p>
      ) : (
        channelCtx.directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;