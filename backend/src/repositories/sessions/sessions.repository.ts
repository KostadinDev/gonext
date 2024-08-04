import mongoose from 'mongoose';
import Session from './sessions.mongo';
import { IMessage, ISession } from '../../types/sessions.types';

class SessionRepository {
  async getAllSessions() {
    try {
      return await Session.find({}).exec();
    } catch (error) {
      throw new Error(`Error fetching sessions: ${error}`);
    }
  }

  async getSessionById(id: string) {
    try {
      return await Session.findById(id).exec();
    } catch (error) {
      throw new Error(`Error fetching session by ID: ${error}`);
    }
  }

  async createSession(name: string) {
    try {
      const creationTimestamp = new Date();
      return await Session.create({
        name: name,
        createdAt: creationTimestamp,
        modifiedAt: creationTimestamp,
        messages: []
      });
    } catch (error) {
      throw new Error(`Error creating session: ${error}`);
    }
  }

  async updateSession(id: string, name: string) {
    try {
      return await Session.findByIdAndUpdate(
        id,
        { name: name, modifiedAt: new Date() },
        { new: true } // Return the updated document
      ).exec();
    } catch (error) {
      throw new Error(`Error updating session: ${error}`);
    }
  }

  async deleteSession(id: string) {
    try {
      return await Session.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting session: ${error}`);
    }
  }

  async addMessage(sessionId: string, message: IMessage) {
    try {
      const session = await Session.findById(sessionId);
      if (!session) {
        throw new Error(`Session not found with ID: ${sessionId}`);
      }
      session.messages.push(message);
      session.modifiedAt = new Date();
      return await session.save();
    } catch (error) {
      throw new Error(`Error adding message: ${error}`);
    }
  }

  async updateMessage(sessionId: string, messageId: string, updatedContent: string): Promise<ISession | null> {
    try {
      const session = await Session.findById(sessionId);
      if (!session) {
        throw new Error(`Session not found with ID: ${sessionId}`);
      }

      const message = session.messages.find(msg => msg._id.toString() === messageId);
      if (!message) {
        throw new Error(`Message not found with ID: ${messageId}`);
      }

      message.content = updatedContent;
      session.modifiedAt = new Date();
      return await session.save();
    } catch (error) {
      throw new Error(`Error updating message: ${error}`);
    }
  }
}

export default new SessionRepository();
