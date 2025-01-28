import * as bcrypt from 'bcryptjs';

export async function _hashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function _comparePassword(password: string, userPassword: string) {
  return await bcrypt.compare(password, userPassword);
}
