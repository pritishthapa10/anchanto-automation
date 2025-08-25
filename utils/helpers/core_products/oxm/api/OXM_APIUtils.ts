import { request } from '@playwright/test';
import config from '../../../../../playwright.config';

// Prefer baseURL from Playwright config; fallback to default if missing
const baseURL = process.env.OXM_API_BASE_URL;
export class OXM_APIUtils {
    private CustomerName: any;
    private Username: any;
    private Password: any;
    private BearerToken: any;
    private APIaccessToken: any;

    constructor(CustomerName: any, Username: any, Password: any, BearerToken: any) {
        this.CustomerName   = CustomerName;
        this.Username       = Username;
        this.Password       = Password;
        this.BearerToken    = BearerToken;
    }

    /* @Author      : Anita Walzade
    * @Created     : 18-Aug-2025
    * @Modified    : 18-Aug-2025
    * @Purpose     : Generate Access Token.
    * @Description : This methos will execute authorization API and will return generated token required to execte further APIs
    * @Parameters  : NA
    * @Return      : Token<String> - Generated Access Token
    */
    async OXM_GenerateToken() {
        const SetClientapiContext = await request.newContext({
            baseURL: baseURL,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.BearerToken}`
            }
        });

        const SetclientResponse = await SetClientapiContext.post('/external-api/v1/oauth/set_client', {
            data: {
                customer_name: this.CustomerName,
                redirectUris: 'https://abc.com',
                grants: ['password', 'refresh']
            }
        });

        const SetClientresponseBody = await SetclientResponse.json();
        const APIClientID           = await SetClientresponseBody.clientId;
        const APIClientSecret       = await SetClientresponseBody.clientSecret;

        //Generate Auth API
        // Create basic auth string from ClientID and clientSecret
        const basicAuth         = Buffer.from(`${APIClientID}:${APIClientSecret}`).toString('base64');
        const AuthapiContext    = await request.newContext({
            baseURL: baseURL,
            extraHTTPHeaders: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const formData = new URLSearchParams({
            grant_type: 'password',
            username: this.Username,
            password: this.Password
        });

        const Authresponse = await AuthapiContext.post('/external-api/v1/oauth/token', {
            data: formData.toString()
        });

        //expect(Authresponse.status(), 'Status code should be 200').toBe(200);
        const responseBody  = await Authresponse.json();
        this.APIaccessToken = responseBody.access_token;
        return this.APIaccessToken;
    }

    

    /*@Author      : Anita Walzade
    * @Created     : 21-Aug-2025
    * @Modified    : 21-Aug-2025
    * @Purpose     : Get B2C order by ID via API.
    * @Description : This method retrieves a B2C order using its ID by sending a GET request to the API.
    * @Parameters  :
    *   OXM_OrderID (string) - The ID of the order to be retrieved
    * @Return      :
    *   Promise<Response> - Response object containing the status code and JSON body
    **/
    async OXM_GetOrderByID(OXM_OrderID) {
        if (!OXM_OrderID) {
            throw new Error('Order ID is not available. Please create an order first.');
        }

        // Step 2: Prepare request context
        const GetOrderapiContext = await request.newContext({
            baseURL: process.env.OXM_API_BASE_URL,
            extraHTTPHeaders: {
                'Authorization': `Bearer ${this.APIaccessToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Step 3: Send the request to get order by ID
        const response = await GetOrderapiContext.get(`/external-api/v1/orders/b2c/${OXM_OrderID}`);
        return response;
    }
        
    /*@Author      : Anita Walzade
    * @Created     : 21-Aug-2025
    * @Modified    : 21-Aug-2025
    * @Purpose     : Get today's date in 'YYYY-MM-DD' format.
    * @Description : This method retrieves the current date and formats it as 'YYYY-MM-DD'.
    * @Parameters  : NA
    * @Return      :
    *   string - The current date formatted as 'YYYY-MM-DD'
    **/
    static getTodaysDate() {
        const today = new Date();
        //Separate date part and time part
        const formattedDate = today.toISOString().split('T')[0];
        return formattedDate;
    }

    /*
    * @Author      : Anita Walzade
    * @Created     : 21-Aug-2025
    * @Modified    : 21-Aug-2025
    * @Purpose     : Extract Order ID from Create order API response.
    * @Description : This method extracts the order ID from the API response after creating a order.  
    * @Parameters  :
    *    response (Response) - The Create Order API response object containing order details 
    * @Return      :
    *    string - The extracted order ID from the response data
    * */
    static getOrderIDFromResponse(response) 
    {
        if (response && response.data) {
            return response.data.order_id;
        }
    }
}

