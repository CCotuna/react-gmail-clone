export const formatEmailDate = (emailDate) => {
    const currentYear = new Date().getFullYear();
    const dateObj = new Date(emailDate);
    const emailYear = dateObj.getFullYear();

    if (emailYear === currentYear) {
      return dateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    } else {
      return dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };


export function formatEmailTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
  
    const daysOfWeek = ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă'];
    const months = ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sept.', 'oct.', 'noiem.', 'dec.'];
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const time = date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
  
    const diff = now - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
  
    let timeAgo = '';
    if (diffDays > 0) {
      timeAgo = `acum ${diffDays} ${diffDays === 1 ? 'zi' : 'zile'}`;
    } else if (diffHours > 0) {
      timeAgo = `acum ${diffHours} ${diffHours === 1 ? 'oră' : 'ore'}`;
    } else if (diffMinutes > 0) {
      timeAgo = `acum ${diffMinutes} ${diffMinutes === 1 ? 'minut' : 'minute'}`;
    } else {
      timeAgo = 'acum câteva secunde';
    }
  
    return `${dayOfWeek}, ${day} ${month}, ${time} (${timeAgo})`;
  }
  
  export function formatChatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      day: '2-digit',
      month: 'short',
    };
    return date.toLocaleDateString('ro-RO', options);
  }