import { validate } from "express-validation";
import { createNonProfit, fetchEmailsSentToNonProfits, fetchNonProfits, sendBulkEmailsToNonProfits } from "../../controllers/nonProfits";
import { createNonProfitValidation, querySchema } from "./validations";

var express = require('express');
var nonProfitsRouter = express.Router();

nonProfitsRouter.get('/', fetchNonProfits);

nonProfitsRouter.post('/', validate(createNonProfitValidation), createNonProfit);

nonProfitsRouter.get('/mail', fetchEmailsSentToNonProfits);

nonProfitsRouter.post('/mail', validate({query: querySchema}), sendBulkEmailsToNonProfits);

export default nonProfitsRouter;
