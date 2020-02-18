import { Models, RematchRootState, init } from '@rematch/core'
import createPubnubPlugin, { PubnubState } from '@vincit/rematch-pubnub'

const pubnubPlugin = createPubnubPlugin({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY || '',
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY || '',
  uuid: process.env.REACT_APP_PUBNUB_UUID || '',
})

const models: Models = {}

const store = init({
  models,
  plugins: [pubnubPlugin],
})

export type ExampleStore = typeof store
export type ExampleDispatch = typeof store.dispatch
export type ExampleRootState = RematchRootState<typeof models> & PubnubState

export default store
