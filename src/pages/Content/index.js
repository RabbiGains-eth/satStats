import React from 'react';
import { render } from 'react-dom';

import Newtab from '../Newtab/Newtab';
// import './index.css';
// import '../../assets/styles/tailwind.css';

if (document.body) {
  var div = document.createElement('div');
  div.id = 'satStats';
  document.body.appendChild(div);
  render(<Newtab />, window.document.querySelector('#satStats'));
}