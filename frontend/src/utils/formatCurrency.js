// I wrote this quick formatting hook to turn raw database numbers into readable cash amounts. 
// I used the 'en-IN' locale with 'INR' currency style so everything handles Indian numbering formats

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
};