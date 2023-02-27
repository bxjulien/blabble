import Room from "../types/Room.interface";

export const sortRooms = (
  rooms: Room[],
  key: keyof Room | "messages.length",
  order: "asc" | "desc"
) => {
  return [...rooms].sort((a, b) => {
    let aVal, bVal;

    if (key === "messages.length") {
      aVal = a.messages.length;
      bVal = b.messages.length;
    } else {
      aVal = a[key];
      bVal = b[key];
    }

    const direction = order === "asc" ? 1 : -1;

    if (aVal < bVal) return -1 * direction;
    if (aVal > bVal) return 1 * direction;
    return 0;
  });
};

export const howLongAgo = (createdAt: number) => {
  const MS_PER_MINUTE = 60000;

  const now = new Date();
  const createdDate = new Date(createdAt);

  const durationInMinutes = Math.floor(
    (now.getTime() - createdDate.getTime()) / MS_PER_MINUTE
  );
  const durationInHours = Math.floor(durationInMinutes / 60);
  const durationInDays = Math.floor(durationInHours / 24);

  if (durationInMinutes < 1) {
    return "Just now";
  } else if (durationInMinutes < 60) {
    return `${durationInMinutes} minute${durationInMinutes > 1 ? "s" : ""}`;
  } else if (durationInHours < 24) {
    return `${durationInHours} hour${durationInHours > 1 ? "s" : ""}`;
  } else {
    return `${durationInDays} day${durationInDays > 1 ? "s" : ""}`;
  }
};
