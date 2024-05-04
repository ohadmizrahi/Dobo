export const formatDate = (dateString, withoutDay=false) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return withoutDay ? `${month}/${year}` : `${day}/${month}/${year}`;
  };