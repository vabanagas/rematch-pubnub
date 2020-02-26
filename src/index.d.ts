import { Models, Plugin, Action } from '@rematch/core'
import Pubnub, { PubnubConfig } from 'pubnub'
import { pubnubReducer } from '.'

export declare interface PubnubState {
  pubnub: Readonly<ReturnType<typeof pubnubReducer>>
}

export declare const getPubnubInstance: () => Pubnub

export declare const setPubnubInstance: (instance: Pubnub) => void

declare const createPubnubPlugin: (
  pubnubConfig: PubnubConfig
) => Plugin<Models, Action<any, any>>

export default createPubnubPlugin
