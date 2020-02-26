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

let pubnubInstance: Pubnub | undefined

let extraArgument = {
  get pubnub() {
    return { api: pubnubInstance }
  },
}

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

export const getPubnubInstance = () => {
  return pubnubInstance
}

export const setPubnubInstance = (instance?: Pubnub) => {
  pubnubInstance = instance
}

// rematch plugin
const createPubnubPlugin = (pubnubConfig?: PubnubConfig): Plugin => {
  if (pubnubConfig) {
    setPubnubInstance(new Pubnub(pubnubConfig))
  }

  return {
    config: {
      redux: {
        reducers: {
          pubnub: pubnubReducer,
        },
        middlewares: [thunk.withExtraArgument(extraArgument)],
      },
    },
  }
}

export default createPubnubPlugin
