import {ChannelList, useChatContext} from 'stream-chat-react'

import {ChannelSearch, TeamChannelList, TeamChannelPreview} from './'
import AppIcon from '../assets/app-icon.png'
import LogoutIcon from '../assets/logout.png'
import { useContext } from 'react'
import AuthContext from '../store/auth-context'
import ChannelContext from '../store/channel-context'

const Sidebar = ({logout})=>(
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={AppIcon} alt="App" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" title='Sign out' onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">React-Streamio</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

function ChannelListContent (){
    
    const { client } = useChatContext();
    const authCtx = useContext(AuthContext)

    function  logout(){
        authCtx.logout()
        window.location.reload()
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <Sidebar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch  />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter} 
                    List={(listProps)=>(
                        <TeamChannelList 
                            {...listProps}
                            type='team'
                        />
                    )}
                    Preview={(previewProps)=>(
                        <TeamChannelPreview 
                            {...previewProps}
                            type='team'
                        />
                    )}
                />
                <ChannelList 
                    filters={{}} 
                    channelRenderFilterFn={customChannelMessagingFilter} 
                    List={(listProps)=>(
                        <TeamChannelList 
                            {...listProps}
                            type='messaging'
                        />
                    )}
                    Preview={(previewProps)=>(
                        <TeamChannelPreview 
                            {...previewProps}
                            type='messaging'    
                        />
                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = () => {
    const channelCtx = useContext(ChannelContext)

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: channelCtx.toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() =>channelCtx.setToggleContainer((prevToggleContainer) => !prevToggleContainer)}></div>
                <ChannelListContent />
            </div>
        </>
    )

}

export default ChannelListContainer;