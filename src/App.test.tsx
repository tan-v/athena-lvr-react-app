import AppComponent from './App';
import ReactDOM from 'react-dom';

test('renders app without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});