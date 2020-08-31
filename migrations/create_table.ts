import { TableFriendGraphicsGenders } from './tables/friend_graphics__genders'
import { TableFriendGraphicsAges } from './tables/friend_graphics__ages'
import { TableFriendGraphicsApptypes } from './tables/friend_graphics__apptypes'
import { TableFriendGraphicsSubscriptions } from './tables/friend_graphics__subscriptions'
import { TableMessagesStatistic } from './tables/messages_statistic'
import { TableFriendGraphicsAreaJP } from './tables/friend_graphics__areas_jp'
import { TableFriendGraphicsAreaTW } from './tables/friend_graphics__areas_tw'
import { TableFriendGraphicsAreaTH } from './tables/friend_graphics__areas_th'
import { TableFriendGraphicsAreaID } from './tables/friend_graphics__areas_id'
import { TableChannelAccount } from './tables/channel__account'
import { TableChannelGroup } from './tables/channel__groups'
import { TableChannelGroupAccount } from './tables/channel__groups_accounts'
import { TableMessagesBroadcast } from './tables/messages_broadcast'

TableFriendGraphicsGenders.up()
TableFriendGraphicsAges.up()
TableFriendGraphicsApptypes.up()
TableFriendGraphicsSubscriptions.up()
TableFriendGraphicsAreaJP.up() // japan
TableFriendGraphicsAreaTW.up() // taiwan
TableFriendGraphicsAreaTH.up() // thailan
TableFriendGraphicsAreaID.up() // indonesia

TableMessagesStatistic.up()
TableMessagesBroadcast.up()

// TableChannelAccount.up()
// TableChannelGroup.up()
// TableChannelGroupAccount.up()