import bcrypt from 'bcrypt';

const saltRounds = 10; // Typically a value between 10 and 12

export async function hashPassword(plainText: string) {
    const genSalt = await bcrypt.genSalt(saltRounds)
    console.log(plainText)
    console.log(genSalt)
    const passwordHash = await bcrypt.hash(plainText, genSalt);

    return passwordHash;
}

export async function comparePassword(plainText: string, hashPwd: string) {
    const isMatching = await bcrypt.compare(plainText, hashPwd);

    return isMatching;
}

