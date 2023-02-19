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

import { ROOMS } from '../../../graphql/queries';
import Room from '../../../types/Room.interface';
import { sortRooms } from '../../../utils/functions';
import { useAppContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

interface RoomsResult {
  rooms: Room[];
}

export const Rooms = () => {
  const { rooms, setRooms } = useAppContext();

  const navigate = useNavigate();

  const [sortOrderName, setSortOrderName] = useState<'asc' | 'desc'>('asc');
  const [sortOrderMessages, setSortOrderMessages] = useState<'asc' | 'desc'>(
    'asc'
  );
  const [sortOrderCreatedAt, setSortOrderCreatedAt] = useState<'asc' | 'desc'>(
    'asc'
  );

  const { loading, error, data } = useQuery(ROOMS, {
    onCompleted: (data: RoomsResult) => {
      setRooms(data.rooms);
    },
    onError: (error) => {
      console.error('ROOMS onError', error);
    },
  });

  const sortRoomsByKey = (
    rooms: Room[],
    key: keyof Room,
    order: 'asc' | 'desc',
    setRooms: (rooms: Room[]) => void,
    setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>
  ) => {
    const sortedRooms = sortRooms(rooms, key, order);
    setRooms(sortedRooms);
    setSortOrder(order === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <div>Loading...</div>;
  else if (error) return <p>Error :(</p>;
  else if (!data || !data.rooms) return <p>No rooms</p>;
  else
    return (
      <div className='rooms'>
        <Window
          style={{
            height: '100%',
            width: '100%',
            minHeight: '400px',
          }}
        >
          <WindowHeader>Rooms</WindowHeader>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell
                  onClick={() =>
                    sortRoomsByKey(
                      rooms || [],
                      'name',
                      sortOrderName,
                      setRooms,
                      setSortOrderName
                    )
                  }
                >
                  Name
                </TableHeadCell>
                <TableHeadCell
                  onClick={() =>
                    sortRoomsByKey(
                      rooms || [],
                      'messages.length' as keyof Room,
                      sortOrderMessages,
                      setRooms,
                      setSortOrderMessages
                    )
                  }
                >
                  Messages
                </TableHeadCell>
                <TableHeadCell
                  onClick={() =>
                    sortRoomsByKey(
                      rooms || [],
                      'createdAt',
                      sortOrderCreatedAt,
                      setRooms,
                      setSortOrderCreatedAt
                    )
                  }
                >
                  Creation
                </TableHeadCell>
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
                  onClick={() => navigate(`/room/${room.id}`)}
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
                    {new Date(+room.createdAt).toLocaleString()}
                  </TableDataCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Window>
      </div>
    );
};
