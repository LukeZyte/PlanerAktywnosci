export function getFormattedDate(date) {
  let day = new Date(date).getDate();
  let month = "";
  switch (new Date(date).getMonth()) {
    case 0:
      month = "styczeń";
      break;
    case 1:
      month = "luty";
      break;
    case 2:
      month = "marzec";
      break;
    case 3:
      month = "kwiecień";
      break;
    case 4:
      month = "maj";
      break;
    case 5:
      month = "czerwiec";
      break;
    case 6:
      month = "lipiec";
      break;
    case 7:
      month = "sierpień";
      break;
    case 8:
      month = "wrzesień";
      break;
    case 9:
      month = "październik";
      break;
    case 10:
      month = "listopad";
      break;
    case 11:
      month = "grudzień";
      break;
  }
  let year = new Date(date).getFullYear();
  return (dateText = `${day} ${month} ${year}`);
}

export function getSimpleDate(date) {
  let day = ("0" + new Date(date).getDate()).slice(-2);
  let month = ("0" + (new Date(date).getMonth() + 1)).slice(-2);
  let year = new Date(date).getFullYear().toString().slice(-2);
  return (dateText = `${day}.${month}.${year}`);
}
