import { Plugin } from '@rematch/core';
export declare const getPubnub: () => any;
declare const pubnubPlugin: (pubnubConfig: any) => Plugin<import("@rematch/core").Models, import("@rematch/core").Action<any, any>>;
export default pubnubPlugin;
