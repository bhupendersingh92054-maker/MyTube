export const API_KEY = "AIzaSyDnGS5yEJ53CClaYfV8yY0VJ-gmZxyiy9M";

export const value_converter = (value) => {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
