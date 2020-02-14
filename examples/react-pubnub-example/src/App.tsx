import React, { useEffect } from 'react'
import {
  createPubNubListener,
  fetchMessageHistory,
  fetchSpaces,
  fetchUsers,
} from 'pubnub-redux'
import store, { ExampleDispatch, ExampleRootState } from './store'
import { useDispatch, useSelector } from 'react-redux'

import { usePubNub } from 'pubnub-react'

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}

const App = () => {
  const pubnub = usePubNub()
  const dispatch = useDispatch<ExampleDispatch>()
  const state = useSelector((state: ExampleRootState) => state)
  const formattedState = JSON.stringify(state, null, '\t')

  useEffect(() => {
    pubnub.addListener(createPubNubListener(store.dispatch))

    dispatch(fetchSpaces())

    return pubnub.unsubscribeAll()
  }, [])

  return (
    <div style={styles.container}>
      <div>
        <h3>State</h3>
        <pre>
          <code>{formattedState}</code>
        </pre>
      </div>
    </div>
  )
}

export default App
