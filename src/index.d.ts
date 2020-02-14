import { Models, Plugin, Action } from '@rematch/core'
import Pubnub, { PubnubConfig } from 'pubnub'
import { pubnubReducer } from '.'

export declare interface PubnubState {
  pubnub: Readonly<ReturnType<typeof pubnubReducer>>
}

export declare const getPubnub: () => Pubnub

declare const pubnubPlugin: (
  pubnubConfig: PubnubConfig
) => Plugin<Models, Action<any, any>>

export default pubnubPlugin
