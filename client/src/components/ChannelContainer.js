import {Channel, useChatContext, MessageTeam } from 'stream-chat-react'
import {ChannelInner, CreateChannel, EditChannel} from './'
import { useContext } from 'react'
import ChannelContext from '../store/channel-context'

function ChannelContainer(){

    const {channel} = useChatContext()
    const channelCtx = useContext(ChannelContext)

    if(channelCtx.isCreating){
        return (
            <div className="channel__container">
                <CreateChannel />
            </div>
        )
    }

    
    if(channelCtx.isEditing){
        return (
            <div className="channel__container">
                <EditChannel />
            </div>
        )
    }

    const EmptyState = ()=>(
        <div className="channel-empty__container">
            <div className="channel-emtpy__first">Chat History Beginning</div>
            <div className="channel-empty__second">Send messages</div>
        </div>
    )

    return (
        <div className='channel__container'>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps}/>}
            >
                <ChannelInner/>
            </Channel>
        </div>
    )
}

export default ChannelContainer