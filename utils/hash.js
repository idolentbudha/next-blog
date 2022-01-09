const bcrypt = require("bcrypt");
const saltRounds = 10;
export const MakeHash = async (text) => {
  try {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  } catch (error) {
    return error;
  }
};

export const CheckHash = async (text, hash) => {
  try {
    const result = await bcrypt.compare(text, hash);
    return result;
  } catch (error) {
    return error;
  }
};
