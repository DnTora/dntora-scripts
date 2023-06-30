import express from "express";
import { schema } from '../schema/test';
import { createHandler } from "graphql-http";

const router = express.Router();
router.all('/graphql', createHandler({ schema }))
export default router;