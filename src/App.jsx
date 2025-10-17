import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Strudel from './components/Strudel'
import './css/App.css'

function App() {

  return (
    <>
        <ControlPanel />
        <main className='main-content'>
            <div className='d-flex'>
                <div className='col-md-6 ms-3'>
                    <Preprocess />
                </div>
                <div className='col-md-6 ms-3'>
                    <Strudel />
                </div>
            </div>
        </main>

    </>
  )
}

export default App