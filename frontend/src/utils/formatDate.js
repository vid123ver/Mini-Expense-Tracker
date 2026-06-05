// This file handles all date transformations across the app, converting raw MongoDB 
// timestamps into clean formats for UI tables, HTML date inputs, and dashboard filters.

export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const toInputDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

export const getFirstDayOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split('T')[0];
};

export const getToday = () => {
  return new Date().toISOString().split('T')[0];
};