import React from 'react';
import _ from "lodash";

import Navigator from './Navigator';

const TextInput = () => (
  <div className="card mb-3" style={{ maxWidth: "auto" }}>
    <div className="row no-gutters">
      <div className="col-md-3 p-3">
        {/* <img src="../logo192.png" className="rounded w-h" alt="applet-image" /> */}
      </div>
      <div className="col-md-9">
        <div className="card-body">
          <h5 className="card-title">Donec euismod eros non rutrum ornare. Nunc vulputate purus eget ante tristique, in mollis tortor placerat.</h5>
          <textarea className="form-control" aria-label="With textarea"></textarea>
        </div>
      </div>
    </div>
    <Navigator />
  </div>
)

export default TextInput;