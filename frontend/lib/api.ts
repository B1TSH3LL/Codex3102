import API from "./axios-client";

type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type VerifyEmailType = {
  code: string;
};

type ForgotPasswordType = {
  email: string;
};

type ResetPasswordType = {
  password: string;
  verificationCode: string;
};

export type mfaType = {
  message: string;
  secretKey: string;
  qrImageUrl: string;
};

type verifyMFAType = {
  code: string;
  secretKey: string;
};

type mfaLoginType = { code: string; email: string };

type SessionType = {
  _id: string;
  userId: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
};

type SessionResponseType = {
  message: string;
  sessions: SessionType[];
};

export const logoutMutationFn = async () => await API.post(`/auth/logout`);

export const loginMutationFn = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutationFn = async (data: RegisterType) =>
  await API.post("/auth/register", data);

export const verifyEmailMutationFn = async (data: VerifyEmailType) =>
  await API.post("/auth/verify/email", data);

export const forgotPasswordMutationFn = async (data: ForgotPasswordType) =>
  await API.post("/auth/password/forgot", data);

export const resetPasswordMutationFn = async (data: ResetPasswordType) =>
  await API.post("/auth/password/reset", data);

export const mfaSetupQueryFn = async () => {
  const response = await API.get<mfaType>("/mfa/setup");
  return response.data;
};

export const verifyMFAMuatationFn = async (data: verifyMFAType) => {
  await API.post("/mfa/verify", data);
};

export const verifyMFALoginMutationFn = async (data: mfaLoginType) =>
  await API.post(`/mfa/verify-login`, data);

export const revokeMFAMutationFn = async () => await API.put(`/mfa/revoke`, {});

export const getUserSessionQueryFn = async () =>
  await API.get(`/session/current`);

export const sessionsQueryFn = async () => {
  const response = await API.get<SessionResponseType>(`/session/all`);
  return response.data;
};

export const sessionDelMutationFn = async (id: string) =>
  await API.delete(`/session/${id}`);

// /auth/login ..
// /auth/register ..
// /auth/verify/email ..
// /auth/password/forgot ..
// /auth/password/reset ..

// /mfa/setup ..
// /mfa/verify ..
// /mfa/revoke ..

// /session/all ..
// /session/current ..
// /session/:id ..

// 8 31 27
