import express from 'express';
import sessionsController from './sessions.controller';

const sessionRouter = express.Router();

// Route to get all sessions
sessionRouter.get('/api/sessions', sessionsController.getAllSessions);

// Route to get a session by ID
sessionRouter.get('/api/sessions/:id', sessionsController.getSessionById);

// Route to create a new session
sessionRouter.post('/api/sessions', sessionsController.createSession);

// Route to update a session by ID
sessionRouter.put('/api/sessions/:id', sessionsController.updateSession);

// Route to delete a session by ID
sessionRouter.delete('/api/sessions/:id', sessionsController.deleteSession);

// Route to add a message to a session
sessionRouter.post('/api/sessions/:sessionId/messages', sessionsController.addMessage);

// Route to update a message in a session
sessionRouter.put('/api/sessions/:sessionId/messages/:messageId', sessionsController.updateMessage)

export default sessionRouter;
