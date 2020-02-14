import Pubnub, { PubnubConfig } from 'pubnub'
import {
  createMembersReducer,
  createMembershipReducer,
  createMessageReducer,
  createNetworkStatusReducer,
  createPresenceReducer,
  createSpaceReducer,
  createUserReducer,
} from 'pubnub-redux'

import { Plugin } from '@rematch/core'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

let pubnub: Pubnub
// pubnub is used for PubNubProvider
export const getPubnub = () => pubnub

export const pubnubReducer = combineReducers({
  networkStatus: createNetworkStatusReducer(false),
  messages: createMessageReducer(),
  presence: createPresenceReducer(),
  users: createUserReducer(),
  spaces: createSpaceReducer(),
  memberships: createMembershipReducer(),
  members: createMembersReducer(),
})

export interface PubnubState {
  pubnub: Readonly<ReturnType<typeof pubnubReducer>>
}

// rematch plugin
const pubnubPlugin = (pubnubConfig: PubnubConfig): Plugin => {
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

export default pubnubPlugin
