import {Router} from 'express';
import rdvController from './controllers/rdvController';
import * as path from "path";

const createRoutes = () => {
    const routes = Router();
    routes.get('/getRdv', rdvController.getRdv);
    routes.post('/addRdv', rdvController.addRdv);
    routes.post('/removeRdv', rdvController.removeOne);
    routes.post('/updateRdv', rdvController.updateRdv);
    return routes;
}

export default createRoutes;