const getNChars = (str, limit) => (str.length > limit ? `${str.substring(0, limit - 1)}...` : str);

export default getNChars;
