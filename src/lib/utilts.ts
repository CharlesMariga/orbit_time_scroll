export function formatShortDateString(dateString: string) {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Normalize today's date to remove time component
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Check if the input date is today
  if (inputDate.getTime() === today.getTime()) {
    return 'Today';
  }

  // Array of month and day names
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get formatted date
  const dayName = days[inputDate.getDay()];
  const monthName = months[inputDate.getMonth()];
  const day = inputDate.getDate();

  return `${dayName} ${monthName} ${day}`;
}

export function formatLongDateString(dateString: string) {
  // Parse the input date string
  const date = new Date(dateString);

  // Define options for the date part
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Define options for the time part
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short'
  };

  // Format the date part
  const formattedDate = date.toLocaleDateString('en-US', dateOptions);

  // Format the time part
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  // Combine the formatted date and time
  const formattedDateString = `${formattedDate} at ${formattedTime}`;

  return formattedDateString;
}

export function timeAgo(dateString: string) {
  const now: Date = new Date();
  const date: Date = new Date(dateString);

  // Calculate the difference in milliseconds
  const diff: number = now.getTime() - date.getTime();

  // Convert milliseconds to days, hours, minutes, and seconds
  const seconds: number = Math.floor(diff / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}
