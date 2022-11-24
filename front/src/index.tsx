import React           from 'react';
import ReactDOM        from 'react-dom/client';
import {
  unstable_HistoryRouter as HistoryRouter 
}                      from "react-router-dom";
import { Provider }    from 'react-redux';

import store           from './store';
import reportWebVitals from './reportWebVitals';
import history         from "./routes/history";
 
import App             from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={ store }>  
    <React.StrictMode>   
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
    </React.StrictMode>    
  </Provider>  
);

reportWebVitals();
