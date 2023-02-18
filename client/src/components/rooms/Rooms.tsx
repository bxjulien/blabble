import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Window,
  WindowHeader,
} from 'react95';

import { Button } from 'react95';
import { ROOMS } from '../../graphql/queries';
import Room from '../../interfaces/Room.interface';
import { useAppContext } from '../../context';
import { useQuery } from '@apollo/react-hooks';

interface RoomsResult {
  rooms: Room[];
}

export const Rooms = () => {
  const { rooms, setRooms } = useAppContext();

  const { loading, error, data } = useQuery(ROOMS, {
    onCompleted: (data: RoomsResult) => {
      console.log('ROOMS onCompleted', data);
      setRooms(data.rooms);
    },
    onError: (error) => {
      console.error('ROOMS onError', error);
    },
  });

  if (loading) return <div>Loading...</div>;
  else if (error) return <p>Error :(</p>;
  else if (!data || !data.rooms) return <p>No rooms</p>;
  else
    return (
      <div className='rooms'>
        <Window
          style={{
            width: '100%',
            minHeight: '400px',
          }}
        >
          <WindowHeader>Rooms</WindowHeader>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Messages</TableHeadCell>
                <TableHeadCell>Created At</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms?.map((room) => (
                <TableRow
                  key={room.id}
                  style={{
                    borderBottom: '1px solid rgb(223, 223, 223)',
                    cursor: 'pointer',
                  }}
                >
                  <TableDataCell
                    style={{
                      borderRight: '1px solid rgb(223, 223, 223)',
                    }}
                  >
                    {room.name}
                  </TableDataCell>
                  <TableDataCell
                    style={{
                      borderRight: '1px solid rgb(223, 223, 223)',
                      textAlign: 'center',
                    }}
                  >
                    {room.messages?.length || 0}
                  </TableDataCell>
                  <TableDataCell
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {new Date(+room.createdAt).toLocaleString().split(' ')[0]}
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Window>
      </div>
    );
};
