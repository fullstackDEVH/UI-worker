

export const countdown = (minutes, seconds, element) => {

    let totalSeconds = minutes * 60 + seconds;

    const countdownTimer = setInterval(() => {

      const minutesRemaining = Math.floor(totalSeconds / 60);
      const secondsRemaining = totalSeconds % 60;
      element.textContent = `Remaining Times : ${minutesRemaining < 10 ? '0' : ''}${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
      if (totalSeconds === 0) {
        clearInterval(countdownTimer);
        alert(`end time`)
      } else {
        totalSeconds--;
      }
    }, 1000);
  }