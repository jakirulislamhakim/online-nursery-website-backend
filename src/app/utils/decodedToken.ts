import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const decodedAccessToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(
      accessToken,
      config.jwt_access_secret_key as string,
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized !');
  }
};

// for decoded refresh token
export const decodedRefreshToken = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwt_refresh_secret_key as string,
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You need to provide valid authentication credentials to access this resource.',
    );
  }
};
