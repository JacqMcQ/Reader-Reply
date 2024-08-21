// Export helper functions
module.exports = {
  // Format time as a string
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // Format date as MM/DD/YYYY
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
};
