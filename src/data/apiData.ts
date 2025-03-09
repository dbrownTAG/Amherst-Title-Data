export interface ApiEndpoint {
  title: string;
  method: string;
  path: string;
  description: string[];
  requestHeaders?: string;
  pathParams?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  queryParams?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  requestBody?: string;
  validationRules?: string[];
  responseExample: string;
}

export interface ApiSection {
  id: string;
  title: string;
  description?: string;
  responseObject?: string;
  endpoints: ApiEndpoint[];
}

export const apiData: ApiSection[] = [
  {
    id: 'cash-acquisitions',
    title: 'Cash Acquisitions',
    responseObject: `{
  "Id": "a13VH00000HjjopYAB",
  "AlternatePropertyId": "10003399",
  "Property": {
    "Street": "123 Main Street",
    "City": "Austin",
    "State": "TX",
    "Zip": "78746",
    "County": "Travis"
  },
  "BuyerAddress": {
    "Street": "456 Corporate Ave",
    "City": "Austin",
    "State": "TX",
    "Zip": "78701",
    "County": "Travis"
  },
  "BuyerAgent": "Main Street Renewal",
  "BuyerName": "ARMM Asset Company 2 LLC",
  "ClosingDate": "2024-12-30",
  "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
  "ReadyToClose": false,  
  "ReadyToFund": false,    
  "SalesPrice": 179900,
  "SellerAddress": {
    "Street": "789 Seller Blvd",
    "City": "Austin",
    "State": "TX",
    "Zip": "78704",
    "County": "Travis"
  },
  "SellerAgent": {
    "FirstName": "Jane",
    "MiddleName": null,
    "LastName": "Doe"
  },
  "SellerNames": [
    {
      "FirstName": "John",
      "MiddleName": null,
      "LastName": "Smith"
    },
    {
      "FirstName": "Mary",
      "MiddleName": "Ann",
      "LastName": "Smith"
    }
  ],
  "Status": "Open",
  "TentativeDate": "2024-12-30"
}`,
    endpoints: [
      {
        title: 'List Cash Acquisitions',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions',
        description: [
          'Retrieves all cash acquisition transactions for authorized client',
          'Returns Open and On-Hold transactions',
          'Includes Closed/Cancelled transactions from last 24 hours',
          'Recommended polling frequency: 1 hour',
          'Results paginated (100 items per page)'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        queryParams: [
          {
            name: 'page',
            type: 'integer',
            required: false,
            description: 'Page number (default: 1)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "a13VH00000HjjopYAB",
      "AlternatePropertyId": "10003399",
      "Property": {
        "Street": "123 Main Street",
        "City": "Austin",
        "State": "TX",
        "Zip": "78746",
        "County": "Travis"
      },
      "BuyerAddress": {
        "Street": "456 Corporate Ave",
        "City": "Austin",
        "State": "TX",
        "Zip": "78701",
        "County": "Travis"
      },
      "BuyerAgent": "Main Street Renewal",
      "BuyerName": "ARMM Asset Company 2 LLC",
      "ClosingDate": "2024-12-30",
      "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
      "ReadyToClose": false,  
      "ReadyToFund": false,    
      "SalesPrice": 179900,
      "SellerAddress": {
        "Street": "789 Seller Blvd",
        "City": "Austin",
        "State": "TX",
        "Zip": "78704",
        "County": "Travis"
      },
      "SellerAgent": {
        "FirstName": "Jane",
        "MiddleName": null,
        "LastName": "Doe"
      },
      "SellerNames": [
        {
          "FirstName": "John",
          "MiddleName": null,
          "LastName": "Smith"
        },
        {
          "FirstName": "Mary",
          "MiddleName": "Ann",
          "LastName": "Smith"
        }
      ],
      "Status": "Open",
      "TentativeDate": "2024-12-30"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 487,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "links": {
      "self": "/v1/title-data/cash-acquisitions?page=1",
      "first": "/v1/title-data/cash-acquisitions?page=1",
      "last": "/v1/title-data/cash-acquisitions?page=5",
      "next": "/v1/title-data/cash-acquisitions?page=2",
      "prev": null
    }
  }
}`
      },
      {
        title: 'Get Cash Acquisition by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions/:id',
        description: [
          'Retrieves a single cash acquisition transaction by ID',
          'Returns full transaction details regardless of status',
          'No pagination (single record response)'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID'
          }
        ],
        responseExample: `{
  "data": {
    "Id": "a13VH00000HjjopYAB",
    "AlternatePropertyId": "10003399",
    "Property": {
      "Street": "123 Main Street",
      "City": "Austin",
      "State": "TX",
      "Zip": "78746",
      "County": "Travis"
    },
    "BuyerAddress": {
      "Street": "456 Corporate Ave",
      "City": "Austin",
      "State": "TX",
      "Zip": "78701",
      "County": "Travis"
    },
    "BuyerAgent": "Main Street Renewal",
    "BuyerName": "ARMM Asset Company 2 LLC",
    "ClosingDate": "2024-12-30",
    "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
    "ReadyToClose": false,  
    "ReadyToFund": false,    
    "SalesPrice": 179900,
    "SellerAddress": {
      "Street": "789 Seller Blvd",
      "City": "Austin",
      "State": "TX",
      "Zip": "78704",
      "County": "Travis"
    },
    "SellerAgent": {
      "FirstName": "Jane",
      "MiddleName": null,
      "LastName": "Doe"
    },
    "SellerNames": [
      {
        "FirstName": "John",
        "MiddleName": null,
        "LastName": "Smith"
      },
      {
        "FirstName": "Mary",
        "MiddleName": "Ann",
        "LastName": "Smith"
      }
    ],
    "Status": "Open",
    "TentativeDate": "2024-12-30"
  }
}`
      },
      {
        title: 'Update Cash Acquisition',
        method: 'PATCH',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions/:id',
        description: [
          'Updates ready status flags for a cash acquisition transaction',
          'At least one status flag must be included in request',
          'Returns updated transaction details'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID'
          }
        ],
        requestBody: `{
  "ReadyToClose": true,  // Optional
  "ReadyToFund": true    // Optional
}`,
        validationRules: [
          'At least one of ReadyToClose or ReadyToFund must be provided',
          'Both fields must be boolean values when provided'
        ],
        responseExample: `{
  "data": {
    "Id": "a13VH00000HjjopYAB",
    "AlternatePropertyId": "10003399",
    "Property": {
      "Street": "123 Main Street",
      "City": "Austin",
      "State": "TX",
      "Zip": "78746",
      "County": "Travis"
    },
    "BuyerAddress": {
      "Street": "456 Corporate Ave",
      "City": "Austin",
      "State": "TX",
      "Zip": "78701",
      "County": "Travis"
    },
    "BuyerAgent": "Main Street Renewal",
    "BuyerName": "ARMM Asset Company 2 LLC",
    "ClosingDate": "2024-12-30",
    "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
    "ReadyToClose": true,  
    "ReadyToFund": true,    
    "SalesPrice": 179900,
    "SellerAddress": {
      "Street": "789 Seller Blvd",
      "City": "Austin",
      "State": "TX",
      "Zip": "78704",
      "County": "Travis"
    },
    "SellerAgent": {
      "FirstName": "Jane",
      "MiddleName": null,
      "LastName": "Doe"
    },
    "SellerNames": [
      {
        "FirstName": "John",
        "MiddleName": null,
        "LastName": "Smith"
      },
      {
        "FirstName": "Mary",
        "MiddleName": "Ann",
        "LastName": "Smith"
      }
    ],
    "Status": "Open",
    "TentativeDate": "2024-12-30"
  }
}`
      }
    ]
  },
  {
    id: 'retail-sales',
    title: 'Retail Sales',
    responseObject: `{
  "Id": "a204u000003NnmcAAC",
  "AlternatePropertyId": "p2061794",
  "Property": {
    "Street": "456 Oak Avenue",
    "City": "Houston",
    "State": "TX",
    "Zip": "77002",
    "County": "Harris"
  },
  "BuyerAddress": {
    "Street": "789 Buyer Lane",
    "City": "Houston",
    "State": "TX",
    "Zip": "77005",
    "County": "Harris"
  },
  "BuyerAgent": {
    "FirstName": "Eddie",
    "MiddleName": null,
    "LastName": "Tomlinson"
  },
  "BuyerName": {
    "FirstName": "Sarah",
    "MiddleName": "Jane",
    "LastName": "Johnson"
  },
  "ClosingDate": "2018-11-28",
  "EarnestMoney": 3000,
  "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
  "Lender": "First National Bank",
  "LoanAmount": 240000,
  "ReadyToClose": false,  
  "ReadyToFund": false,    
  "SalesPrice": 300000,
  "SellerAddress": {
    "Street": "101 Corporate Drive",
    "City": "Austin",
    "State": "TX",
    "Zip": "78701",
    "County": "Travis"
  },
  "SellerAgent": "Hunter Fendley (TX)",
  "SellerName": "Mesa Verde Assets, LLC",
  "Status": "Open",
  "TentativeDate": ""
}`,
    endpoints: [
      {
        title: 'List Retail Sales',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/retail-sales',
        description: [
          'Retrieves all retail sales transactions for authorized client',
          'Returns Open transactions',
          'Includes Cancelled transactions from last 24 hours',
          'Recommended polling frequency: 1 hour',
          'Results paginated (100 items per page)'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        queryParams: [
          {
            name: 'page',
            type: 'integer',
            required: false,
            description: 'Page number (default: 1)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "a204u000003NnmcAAC",
      "AlternatePropertyId": "p2061794",
      "Property": {
        "Street": "456 Oak Avenue",
        "City": "Houston",
        "State": "TX",
        "Zip": "77002",
        "County": "Harris"
      },
      "BuyerAddress": {
        "Street": "789 Buyer Lane",
        "City": "Houston",
        "State": "TX",
        "Zip": "77005",
        "County": "Harris"
      },
      "BuyerAgent": {
        "FirstName": "Eddie",
        "MiddleName": null,
        "LastName": "Tomlinson"
      },
      "BuyerName": {
        "FirstName": "Sarah",
        "MiddleName": "Jane",
        "LastName": "Johnson"
      },
      "ClosingDate": "2018-11-28",
      "EarnestMoney": 3000,
      "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
      "Lender": "First National Bank",
      "LoanAmount": 240000,
      "ReadyToClose": false,  
      "ReadyToFund": false,    
      "SalesPrice": 300000,
      "SellerAddress": {
        "Street": "101 Corporate Drive",
        "City": "Austin",
        "State": "TX",
        "Zip": "78701",
        "County": "Travis"
      },
      "SellerAgent": "Hunter Fendley (TX)",
      "SellerName": "Mesa Verde Assets, LLC",
      "Status": "Open",
      "TentativeDate": ""
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 487,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "links": {
      "self": "/v1/title-data/retail-sales?page=1",
      "first": "/v1/title-data/retail-sales?page=1",
      "last": "/v1/title-data/retail-sales?page=5",
      "next": "/v1/title-data/retail-sales?page=2",
      "prev": null
    }
  }
}`
      },
      {
        title: 'Get Retail Sale by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/retail-sales/:id',
        description: [
          'Retrieves a single retail sale transaction by ID',
          'Returns full transaction details regardless of status',
          'No pagination (single record response)'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID'
          }
        ],
        responseExample: `{
  "data": {
    "Id": "a204u000003NnmcAAC",
    "AlternatePropertyId": "p2061794",
    "Property": {
      "Street": "456 Oak Avenue",
      "City": "Houston",
      "State": "TX",
      "Zip": "77002",
      "County": "Harris"
    },
    "BuyerAddress": {
      "Street": "789 Buyer Lane",
      "City": "Houston",
      "State": "TX",
      "Zip": "77005",
      "County": "Harris"
    },
    "BuyerAgent": {
      "FirstName": "Eddie",
      "MiddleName": null,
      "LastName": "Tomlinson"
    },
    "BuyerName": {
      "FirstName": "Sarah",
      "MiddleName": "Jane",
      "LastName": "Johnson"
    },
    "ClosingDate": "2018-11-28",
    "EarnestMoney": 3000,
    "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
    "Lender": "First National Bank",
    "LoanAmount": 240000,
    "ReadyToClose": false,  
    "ReadyToFund": false,    
    "SalesPrice": 300000,
    "SellerAddress": {
      "Street": "101 Corporate Drive",
      "City": "Austin",
      "State": "TX",
      "Zip": "78701",
      "County": "Travis"
    },
    "SellerAgent": "Hunter Fendley (TX)",
    "SellerName": "Mesa Verde Assets, LLC",
    "Status": "Open",
    "TentativeDate": ""
  }
}`
      },
      {
        title: 'Update Retail Sale',
        method: 'PATCH',
        path: '{amherst-api-base}/v1/title-data/retail-sales/:id',
        description: [
          'Updates ready status flags for a retail sale transaction',
          'At least one status flag must be included in request',
          'Returns updated transaction details'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID'
          }
        ],
        requestBody: `{
  "ReadyToClose": true,  // Optional
  "ReadyToFund": true    // Optional
}`,
        validationRules: [
          'At least one of ReadyToClose or ReadyToFund must be provided',
          'Both fields must be boolean values when provided'
        ],
        responseExample: `{
  "data": {
    "Id": "a204u000003NnmcAAC",
    "AlternatePropertyId": "p2061794",
    "Property": {
      "Street": "456 Oak Avenue",
      "City": "Houston",
      "State": "TX",
      "Zip": "77002",
      "County": "Harris"
    },
    "BuyerAddress": {
      "Street": "789 Buyer Lane",
      "City": "Houston",
      "State": "TX",
      "Zip": "77005",
      "County": "Harris"
    },
    "BuyerAgent": {
      "FirstName": "Eddie",
      "MiddleName": null,
      "LastName": "Tomlinson"
    },
    "BuyerName": {
      "FirstName": "Sarah",
      "MiddleName": "Jane",
      "LastName": "Johnson"
    },
    "ClosingDate": "2018-11-28",
    "EarnestMoney": 3000,
    "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
    "Lender": "First National Bank",
    "LoanAmount": 240000,
    "ReadyToClose": true,  
    "ReadyToFund": true,    
    "SalesPrice": 300000,
    "SellerAddress": {
      "Street": "101 Corporate Drive",
      "City": "Austin",
      "State": "TX",
      "Zip": "78701",
      "County": "Travis"
    },
    "SellerAgent": "Hunter Fendley (TX)",
    "SellerName": "Mesa Verde Assets, LLC",
    "Status": "Open",
    "TentativeDate": ""
  }
}`
      }
    ]
  },
  {
    id: 'bulk-portfolio',
    title: 'Bulk Portfolio',
    endpoints: [
      {
        title: 'List Portfolio Properties',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/bulk-portfolio',
        description: [
          'Retrieves all open portfolio property details for authorized client',
          'Retrieves portfolio property details with HOA information',
          'Includes property details and associated HOA information',
          'Recommended polling frequency: 1 hour',
          'Results paginated (100 items per page)'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        queryParams: [
          {
            name: 'page',
            type: 'integer',
            required: false,
            description: 'Page number (default: 1)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "ActualCloseDate": "2024-03-29",
      "AlternatePropertyId": "Amherst ID",
      "CloseDate": "2024-03-31",
      "HOA": {
        "Contact": "John Smith", 
        "Email": "info@woodlandhillshoa.com",
        "MailingAddress": "PO Box 12345, Austin, TX 78701",
        "ManagementCompany": "Premier Community Management",
        "Name": "Woodland Hills HOA",
        "PhoneNumber": "512-555-1234",
        "Website": "www.woodlandhillshoa.com"
      },
      "Id": "a13VH00000HjjopYAC",
      "LastModifiedDateTime": "2024-03-15T14:30:00.000+0000",
      "NewAssetCoName": "ARMM Asset Company 3 LLC",
      "NewFundName": "SFR Fund 2024",
      "Property": {
        "Street": "123 Main Street",
        "City": "Austin",
        "State": "TX",
        "Zip": "78746",
        "County": "Travis"
      },
      "SellerName": "Amherst Entity, LLC",
      "TitleCompany": "First American Title",
      "TransactionName": "Portfolio Sale 2024-Q1",
      "Type": "Bulk Sale"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 487,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "links": {
      "self": "/v1/title-data/bulk-portfolio?page=1",
      "first": "/v1/title-data/bulk-portfolio?page=1",
      "last": "/v1/title-data/bulk-portfolio?page=5",
      "next": "/v1/title-data/bulk-portfolio?page=2",
      "prev": null
    }
  }
}`
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'The API uses OAuth 2.0 client credentials flow for authentication. You must obtain an access token before accessing any endpoints.',
    endpoints: [
      {
        title: 'Obtaining an Access Token',
        method: 'POST',
        path: '{amherst-api-base}/auth/token',
        description: [
          'Obtain an access token using client credentials'
        ],
        requestHeaders: `Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}`,
        requestBody: `grant_type=client_credentials`,
        responseExample: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2024-03-15T14:30:00.000Z",
  "token_type": "Bearer"
}`
      }
    ]
  }
];

export const baseUrls = {
  qa: 'https://qa.amhev.com/api',
  prod: 'https://prod.amherstapi.com/api'
};

export const responseCodes = [
  { code: 200, description: 'Success' },
  { code: 400, description: 'Bad Request - Invalid parameters' },
  { code: 401, description: 'Unauthorized - Invalid or missing token' },
  { code: 403, description: 'Forbidden - Token lacks required permissions' },
  { code: 404, description: 'Not Found - Resource doesn\'t exist' },
  { code: 500, description: 'Internal Server Error' }
];

export const notes = [
  'All dates / datetimes should be returned in ISO 8601 format',
  'Monetary values should be returned as numbers with 2 decimal places',
  'Id serves as a unique identifier for updating records (PATCH routes)',
  'Results are paginated with 100 items per page',
  'Use the pagination links provided in the response to navigate through the results'
];

export const versionHistory = [
  {
    version: 'v1.1.0',
    date: '2025-02-27',
    author: 'David Brown',
    changes: [
      'Added base URLs for QA and prod',
      'Cash Acquisitions:',
      '- Updated data response for List Cash Acquisitions',
      '- Removed Realtor field',
      '- Added BuyerAgent field',
      '- Added SellerAgent field',
      '- Added ReadyToClose and ReadyToFund fields',
      '- Parsed address fields into Address Object and Name fields into Name Object',
      '- New GET endpoint Get Cash Acquisition by ID to retrieve transaction by Id',
      '- New PATCH endpoint Update Cash Acquisition to update ReadyToClose and ReadyToFund',
      'Retail Sales:',
      '- Updated data response for List Retail Sales',
      '- Renamed LossAmount to LoanAmount',
      '- Added Lender field',
      '- Added ReadyToClose and ReadyToFund fields',
      '- Parsed address fields into Address Object and Name fields into Name Object',
      '- New GET endpoint Get Retail Sale by ID to retrieve transaction by Id',
      '- New PATCH endpoint Update Retail Sale to update ReadyToClose and ReadyToFund',
      'Portfolio:',
      '- Added endpoint List Portfolio Properties to retrieve portfolio transactions'
    ]
  },
  {
    version: 'v1.0.2',
    date: '2025-01-30',
    author: 'David Brown',
    changes: [
      'Pagination implementation'
    ]
  },
  {
    version: 'v1.0.1',
    date: '2025-01-29',
    author: 'David Brown',
    changes: [
      'Updates to List Retail Sales List Cash Acquisitions endpoint descriptions'
    ]
  },
  {
    version: 'v1.0.0',
    date: '2025-01-23',
    author: 'David Brown',
    changes: [
      'Initial spec with List Cash Acquisitions and List Retail Sales endpoints'
    ]
  }
]; 