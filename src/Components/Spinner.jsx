import { RotatingSquare } from 'react-loader-spinner';
import './styles/Spinner.css';

const Spinner = () => (
  <div className="spinner-container">
    <RotatingSquare color="#187024" height={50} width={50} />
    <p className="spinner-message">El backend se está iniciando, por favor espera :3</p>
  </div>
);

export default Spinner;
