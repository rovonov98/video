/**
 *
 * @param timestamp - time in ms
 * @returns time in MM:SS:sss
 */

export const formatDate = (timestamp: number) => {
  const date = new Date(Date.UTC(0, 0, 0, 0, 0, 0, timestamp));
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  return `${formatItem(minutes, 2)}:${formatItem(seconds, 2)}:${formatItem(milliseconds, 3)}`;
};

const formatItem = (num: number | string, length: number) => {
  let res = `${num}`;

  for (let i = res.length; i < length; i++) res = "0" + res;

  return res;
};
