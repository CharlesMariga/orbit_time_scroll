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
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
