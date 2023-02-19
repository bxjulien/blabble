import Message from './Message.interface';
import User from './User.interface';

interface Room {
  id: number;
  name: string;
  users: User[];
  messages: Message[];
  createdAt: string;
}

export default Room;
