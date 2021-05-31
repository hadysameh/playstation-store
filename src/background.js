
import { protocol} from 'electron'

protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
  ])

import initializeApp from './mainprocess/appInitializerHandler'
import eventsHandler from './mainprocess/eventsHandler'
initializeApp();
eventsHandler();

