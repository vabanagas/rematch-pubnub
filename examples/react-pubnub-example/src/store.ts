import { Models, RematchRootState, init } from '@rematch/core'
import createPubnubPlugin, { PubnubState } from '@vincit/rematch-pubnub'

const pubnubPlugin = createPubnubPlugin({
  publishKey: 'pub-c-b8c8ab1e-2cd7-4db5-9a59-fdfdaebb2d29',
  subscribeKey: 'sub-c-9fbab1fc-4d4a-11ea-814d-0ecb550e9de2',
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
