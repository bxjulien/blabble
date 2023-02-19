import Room from './Room.interface';
import User from './User.interface';

interface Message {
  id: number;
  text: string;
  user: User;
  room: Room;
  createdAt: string;
}

export default Message;
