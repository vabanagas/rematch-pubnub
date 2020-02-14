import { Plugin, Action } from '@rematch/core'
import Pubnub, { PubnubConfig } from 'pubnub'
import { NetworkStatusState } from 'pubnub-redux/dist/features/networkStatus/NetworkStatusReducer'
import { pubnubReducer } from './src'

export declare interface PubnubState {
  pubnub: Readonly<ReturnType<typeof pubnubReducer>>
}

export declare const getPubnub: () => Pubnub

declare const pubnubPlugin: (
  pubnubConfig: PubnubConfig
) => Plugin<Models, Action<any, any>>

export default pubnubPlugin
