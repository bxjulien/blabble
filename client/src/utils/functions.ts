import Room from '../interfaces/Room.interface';

export const sortRooms = (
  rooms: Room[],
  key: keyof Room,
  order: 'asc' | 'desc'
) => {
  return [...rooms].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    const direction = order === 'asc' ? 1 : -1;

    if (aVal < bVal) return -1 * direction;
    if (aVal > bVal) return 1 * direction;
    return 0;
  });
};
