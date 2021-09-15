import { render } from 'react-dom'

import { Hello } from './components/Hello/index'

function App() {
    return <Hello name='world' />
}
render(<App />, document.getElementById('root'))