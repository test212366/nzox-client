import * as UserActionsCreators from './user'
import * as UtilsActionsCreators from './utils'
import * as MessagesAllActionsCreators from './messagesAll'
import * as ChatUserActionsCreators from './chatUser'

export  default {
    ...UserActionsCreators,
    ...UtilsActionsCreators,
    ...MessagesAllActionsCreators,
    ...ChatUserActionsCreators
}