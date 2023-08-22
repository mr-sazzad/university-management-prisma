import apiError from '../errors/api_error';
import { autoGenerateId } from '../utils/autoGenerateId';
import { IUser } from './users_Interface';
import { userModel } from './users_model';

const createUser = async (payload: IUser): Promise<IUser | undefined> => {
  const user = payload;
  const id = await autoGenerateId();

  user.id = id;
  const createdUser = await userModel.create(payload);

  if (!createUser) {
    throw new apiError(500, 'Failed to create user ! ');
  }

  return createdUser;
};

export const userServices = {
  createUser,
};
