export function formatDateString(dateString: string) {
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
