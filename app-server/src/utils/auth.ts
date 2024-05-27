import bcrypt from "bcrypt";

const saltRounds = 10; // Typically a value between 10 and 12

export async function hashPassword(plainText: string) {
  try {
    const genSalt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(plainText, genSalt);

    return passwordHash;
  } catch(err) {
    throw err;
  }
}

export async function comparePassword(plainText: string, hashPwd: string) {
  try {
    const isMatching = await bcrypt.compare(plainText, hashPwd);

    return isMatching;
  } catch(err) {
    throw err;
  }
}
