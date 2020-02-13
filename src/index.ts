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
import ReduxThunk from 'redux-thunk'

let pubnub: Pubnub
// pubnub is used for PubNubProvider
export const getPubnub = () => pubnub

// rematch plugin
const pubnubPlugin = (pubnubConfig: PubnubConfig): Plugin => {
  pubnub = new Pubnub(pubnubConfig)

  return {
    config: {
      redux: {
        reducers: {
          ...createNetworkStatusReducer(false),
          ...createMessageReducer(),
          ...createPresenceReducer(),
          ...createUserReducer(),
          ...createSpaceReducer(),
          ...createMembershipReducer(),
          ...createMembersReducer(),
        },
        middlewares: [
          ReduxThunk.withExtraArgument({
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
