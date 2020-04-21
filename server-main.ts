'use strict';

import { Database } from './mongo-database';
import { MyServer } from './server-routing';

const theDatabase = new Database('KonradHerman'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
