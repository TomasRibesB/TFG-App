import io from 'socket.io-client';
import { StorageAdapter } from '../config/adapters/storage-adapter';

let socket: any;

const connect = async () => {
  const user = await StorageAdapter.getItem('user');
  const token = user?.token;
  socket = io('http://10.0.2.2:3000', {
    auth: {
      token: token,
    },
  });
};

const disconnect = () => {
  if (socket) socket.disconnect();
};

export { socket, connect, disconnect };