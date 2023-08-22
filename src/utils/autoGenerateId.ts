import { userModel } from '../users/users_model';

export const autoGenerateId = async () => {
  const lastUser = await userModel.findOne({}).sort({ createdAt: -1 });

  const newUserId = String(Number(lastUser?.id) + 1).padStart(5, '0');
  return newUserId;
};
