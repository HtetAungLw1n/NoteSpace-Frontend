export const dateFormatter = (dateRef) => {
  const date = new Date(dateRef);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

// Format a date to a relative time string
export const timeAgo = (dateRef) => {
  if (!dateRef) return "";

  const now = new Date();
  const date = new Date(dateRef);
  const secondsDiff = Math.floor((now - date) / 1000);

  if (secondsDiff < 60) {
    return `${secondsDiff}s ago`;
  }

  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) {
    return `${minutesDiff}m ago`;
  }

  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) {
    return `${hoursDiff}h ago`;
  }

  const daysDiff = Math.floor(hoursDiff / 24);
  if (daysDiff < 30) {
    return `${daysDiff}d ago`;
  }

  const monthsDiff = Math.floor(daysDiff / 30);
  if (monthsDiff < 12) {
    return `${monthsDiff}mo ago`;
  }

  const yearsDiff = Math.floor(monthsDiff / 12);
  return `${yearsDiff}y ago`;
};
