import { request} from '@playwright/test';

export class CommonAPIUtils {
  private accessToken;
  private baseURL;
  private endpoint;

  constructor(baseURL, apiAccessToken, endpoint) 
  {
    this.accessToken    = apiAccessToken;
    this.baseURL        = baseURL;
    this.endpoint       = endpoint;
  }

  /*
   @Author      : Anita Walzade
   @Created     : 22-Aug-2025
   @Modified    : 22-Aug-2025
   @Purpose     : This is a common method for creating POST requests
   @Description : This method will create a request and return response to validate
   @Parameters  : requestBody<Object> - Request body for creating the resource
   @Return      : APIResponse - Response of the request
   */
  async ExecutePostRequest(requestBody)
    {
      const context = await request.newContext({
        baseURL: this.baseURL,
        extraHTTPHeaders: {
          'Authorization':`Bearer ${this.accessToken}`,
          'content-type':'application/json',
        }
      });
      const response = await context.post(this.endpoint, 
        { data: requestBody}
      );
      return response;
  }
  
  /*
   @Author      : Anita Walzade
   @Created     : 22-Aug-2025
   @Modified    : 22-Aug-2025
   @Purpose     : This is a common method for creating GET requests
   @Description : This method will create a request and return response to validate
   @Parameters  : None
   @Return      : APIResponse - Response of the request
   */
  async ExecuteGetRequest() {
    // Step 1: Prepare request context
        const GetapiContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Step 2: Send the request to get order by ID
        const response = await GetapiContext.get(this.endpoint);
        return response;
  }
  /*
   @Author      : Anita Walzade
   @Created     : 22-Aug-2025
   @Modified    : 22-Aug-2025
   @Purpose     : This is a common method for creating PUT requests
   @Description : This method will create a request and return response to validate
   @Parameters  : requestBody<Object> - Request body for updating the resource
   @Return      : APIResponse - Response of the request
   */
  async ExecutePutRequest(requestBody)
    {
      const context = await request.newContext({
        baseURL: this.baseURL,
        extraHTTPHeaders: {
          'Authorization':`Bearer ${this.accessToken}`,
          'Content-Type':'application/json',
        }
      });
      const response = await context.put(this.endpoint, 
        { data: requestBody}
      );
      return response;
  }
}