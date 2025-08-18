import { request, APIResponse, APIRequestContext } from '@playwright/test';

export async function getAccessToken(): Promise<string> {
  const requestContext: APIRequestContext = await request.newContext();

  const response: APIResponse = await requestContext.post(
    'https://parceltracking-uat.anchanto.com/api/1.0/login',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LOGIN_BEARER_TOKEN ?? ''}`, // fallback to empty string
      },
      form: {
        email: process.env.EMAIL ?? '',
        password: process.env.PASSWORD ?? '',
      },
    }
  );

  const status: number = response.status();
  const body: any = await response.json();

  console.log('Login status:', status);
  console.log('Login response:', body);

  const accessToken: string | undefined = body?.data?.access;

  if (!response.ok() || !accessToken) {
    throw new Error(`Login failed: ${JSON.stringify(body)}`);
  }

  await requestContext.dispose();
  return accessToken;
}
