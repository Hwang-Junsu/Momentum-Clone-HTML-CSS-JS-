const dday = document.querySelector("h2#dday");

function d_day() {
  const now = new Date();
  const christmas = new Date("2021-12-25 00:00:00");

  const interval = new Date(christmas - now);

  const day = Math.floor(interval / 1000 / 60 / 60 / 24);
  const hour = Math.floor((interval / 1000 / 60 / 60 / 24 - day) * 24);
  const minute = Math.floor(
    ((interval / 1000 / 60 / 60 / 24 - day) * 24 - hour) * 60
  );
  const second = Math.floor(
    (((interval / 1000 / 60 / 60 / 24 - day) * 24 - hour) * 60 - minute) * 60
  );

  const r_day = String(day).padStart(3, "0");
  const r_hour = String(hour).padStart(2, "0");
  const r_minute = String(minute).padStart(2, "0");
  const r_second = String(second).padStart(2, "0");
  dday.innerText = `${r_day}d ${r_hour}h ${r_minute}m ${r_second}s`;
}

d_day();
setInterval(d_day, 1000);
