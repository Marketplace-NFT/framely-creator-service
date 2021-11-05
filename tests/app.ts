import 'dotenv/config';
import App from '../src/bootstrap/App';

const app = new App();
const express = app.express();

export default express;
