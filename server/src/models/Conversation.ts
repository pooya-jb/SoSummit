import db from './index';
import { IConversation } from '../types';

const ConversationSchema = new db.Schema<IConversation> ({
  id: {
    type: String,
    required: true
  },
  users: {
    type: [String],
    required: true
  },
  connectedUsers:{
    type: [String],
    required: true
  },
  messages: [{
    text:  {
      type: String,
      required: true
    },
    time:  {
      type: String,
      required: true
    },
    from:  {
      type: String,
      required: true
    }
  }]
  
})

const Conversation = db.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;