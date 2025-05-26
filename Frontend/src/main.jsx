import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
// import store, { persistor } from './Store.js'; // now using the correct one
import store,{persistor} from './Store/Store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate  persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)
