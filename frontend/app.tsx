import './styles.css';
import { Button } from '~/frontend/components/ui/button';

const App = () => {
  return (
    <div>
      <h1 className='text-5xl'>Hello, world!</h1>
      <p>This is a simple React app.</p>
      <Button>Click me!</Button>
    </div>
  );
};

export default App;
