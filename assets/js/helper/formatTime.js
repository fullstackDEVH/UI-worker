export const formatTime = (minutes, seconds) => {
  let newMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let newSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${newMinutes}:${newSeconds}`;
};
