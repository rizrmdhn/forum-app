function postedAt({ date, locale = 'id' }) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (locale === 'id') {
    if (diffDays > 0) {
      return `${diffDays} hari lalu`;
    } if (diffHours > 0) {
      return `${diffHours} jam lalu`;
    } if (diffMinutes > 0) {
      return `${diffMinutes} menit lalu`;
    } if (diffSeconds > 0) {
      return `${diffSeconds} detik lalu`;
    }
    return 'just now';
  }


  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`;
  }
  return 'just now';
}

export default postedAt;
