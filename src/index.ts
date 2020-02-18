import {
  Message,
  Presence,
  Space,
  User,
  createMembersReducer,
  createMembershipReducer,
  createMessageReducer,
  createNetworkStatusReducer,
  createPresenceReducer,
  createSpaceReducer,
  createUserReducer,
} from 'pubnub-redux'
import Pubnub, { PubnubConfig } from 'pubnub'

import { Members } from 'pubnub-redux/dist/features/members/MembersActions'
import { Membership } from 'pubnub-redux/dist/features/membership/MembershipActions'
import { Plugin } from '@rematch/core'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

// pubnub is used for PubNubProvider
let pubnub: Pubnub

const pubnubReducer = combineReducers({
  networkStatus: createNetworkStatusReducer(false),
  messages: createMessageReducer<Message>(),
  presence: createPresenceReducer<Presence>(),
  users: createUserReducer<User>(),
  spaces: createSpaceReducer<Space>(),
  memberships: createMembershipReducer<Membership>(),
  members: createMembersReducer<Members>(),
})

export interface PubnubState {
  pubnub: Readonly<ReturnType<typeof pubnubReducer>>
}

// rematch plugin
const createPubnubPlugin = (pubnubConfig: PubnubConfig): Plugin => {
  pubnub = new Pubnub(pubnubConfig)

  return {
    config: {
      redux: {
        reducers: {
          pubnub: pubnubReducer,
        },
        middlewares: [
          thunk.withExtraArgument({
            pubnub: {
              api: pubnub,
            },
          }),
        ],
      },
    },
  }
}

export const getPubnub = () => pubnub

export default createPubnubPlugin
