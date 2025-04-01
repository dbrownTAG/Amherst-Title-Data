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
  interfaceDefinition?: string;
}

export interface ApiSection {
  id: string;
  title: string;
  description?: string;
  responseObject?: string;
  endpoints: ApiEndpoint[];
}

// Extract interface definitions from response objects
const cashAcquisitionsInterface = `import { Address, ContactName } from './shared.interface'

export interface AcquisitionTitleData {
  AlternatePropertyId: string
  BuyerAddress: Address
  BuyerAgent: string
  BuyerName: string
  ClosingDate: string
  ClosedAndFunded: boolean
  Id: string
  LastModifiedDateTime: string
  Property: Address
  ReadyToClose: boolean
  ReadyToFund: boolean
  SalesPrice: number
  SellerAddress: Address | null
  SellerAgent: ContactName | null
  SellerNames: (ContactName | null)[]
  Status: AcquisitionTitleDataStatus
  TentativeDate: string
}

export enum AcquisitionTitleDataStatus {
  Open = 'Open',
  OnHold = 'On Hold',
  Closed = 'Closed',
  Cancelled = 'Cancelled',
}`;

const retailSalesInterface = `import { Address, ContactName } from './shared.interface'

export interface DispositionTitleData {
  AlternatePropertyId: string
  BuyerAgent: ContactName | null
  BuyerName: ContactName | null
  ClosingDate: string
  ClosedAndFunded: boolean
  EarnestMoney: number
  Id: string
  LastModifiedDateTime: string
  Lender: string
  LoanAmount: number
  Property: Address 
  ReadyToClose: boolean
  ReadyToFund: boolean
  SalesPrice: number
  SellerAddress: Address
  SellerAgent: string
  SellerName: string
  Status: DispositionTitleDataStatus
  TentativeDate: string
}

export enum DispositionTitleDataStatus {
  Open = 'Open',
  Cancelled = 'Cancelled',  
}`;

const portfolioInterface = `import { Address, HOA } from './shared.interface'

export interface PortfolioTitleData {
  Id: string
  AlternatePropertyId: string
  AnticipatedCloseDate: string
  HOA: HOA
  LastModifiedDateTime: string
  NewAssetCoName: string
  Property: Address
  ReadyToClose: boolean
  ReadyToFund: boolean
  SellerName: string
  TitleCompany: string
  TransactionName: string
  Type: PortfolioTransactionType
}

export enum PortfolioTransactionType {
  InternalTransfer = 'Internal Transfer',
  ManagementTransfer = 'Management Transfer',
  ServicingRetainedSubstitution = 'Substitution - Servicing Retained',
  ServicingRetainedBulkSale = 'Bulk Sale - Servicing Retained',
  ServicingRetainedSecuritization = 'Securitization - Services Retained'
}`;

const sharedInterfaces = `export interface Address {
  City: string
  County: string
  State: string
  Street: string
  Zip: string
}

export interface ContactName {
  FirstName: string
  MiddleName: string | null
  LastName: string
}

export interface HOA {
  Contact: string
  Email: string
  MailingAddress: string
  ManagementCompany: string
  Name: string
  PhoneNumber: string
  Website: string
}`;

export const apiData: ApiSection[] = [
  {
    id: 'cash-acquisitions',
    title: 'Cash Acquisitions',
    responseObject: `{
  "Id": "a13VH00000HjjopYAB", // string - 18 character ID
  "AlternatePropertyId": "10003399", // string
  "BuyerAddress": { // Address
    "City": "Austin", // string
    "County": "Travis", // string
    "State": "TX", // string
    "Street": "456 Corporate Ave", // string
    "Zip": "78701" // string
  },
  "BuyerAgent": "Main Street Renewal", // string
  "BuyerName": "ARMM Asset Company 2 LLC", // string
  "ClosingDate": "2024-12-30", // string - ISO 8601 date format
  "ClosedAndFunded": false, // boolean
  "Id": "a13VH00000HjjopYAB",
  "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000", // string - ISO 8601 datetime format
  "Property": { // Address
    "City": "Austin", // string
    "County": "Travis", // string
    "State": "TX", // string
    "Street": "123 Main Street", // string
    "Zip": "78746" // string
  },
  "ReadyToClose": false, // boolean
  "ReadyToFund": false, // boolean
  "SalesPrice": 179900, // number
  "SellerAddress": { // Address | null
    "City": "Austin", // string
    "County": "Travis", // string
    "State": "TX", // string
    "Street": "789 Seller Blvd", // string
    "Zip": "78704" // string
  },
  "SellerAgent": { // ContactName | null
    "FirstName": "Jane", // string
    "MiddleName": null, // string | null
    "LastName": "Doe" // string
  },
  "SellerNames": [ // (ContactName | null)[]
    {
      "FirstName": "John", // string
      "MiddleName": null, // string | null
      "LastName": "Smith" // string
    },
    {
      "FirstName": "Mary", // string
      "MiddleName": "Ann", // string | null
      "LastName": "Smith" // string
    }
  ],
  "Status": "Open", // AcquisitionTitleDataStatus enum: 'Open' | 'On Hold' | 'Closed' | 'Cancelled'
  "TentativeDate": "2024-12-30" // string - ISO 8601 date format
}

Interface definition:
\`\`\`typescript
import { Address, ContactName } from './shared.interface'

export interface AcquisitionTitleData {
  AlternatePropertyId: string
  BuyerAddress: Address
  BuyerAgent: string
  BuyerName: string
  ClosingDate: string
  ClosedAndFunded: boolean
  Id: string
  LastModifiedDateTime: string
  Property: Address
  ReadyToClose: boolean
  ReadyToFund: boolean
  SalesPrice: number
  SellerAddress: Address | null
  SellerAgent: ContactName | null
  SellerNames: (ContactName | null)[]
  Status: AcquisitionTitleDataStatus
  TentativeDate: string
}

export enum AcquisitionTitleDataStatus {
  Open = 'Open',
  OnHold = 'On Hold',
  Closed = 'Closed',
  Cancelled = 'Cancelled',
}
\`\`\`
`,
    endpoints: [
      {
        title: 'List Cash Acquisitions',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions',
        description: [
          'Retrieves all cash acquisition transactions for authorized client',
          'Results paginated (100 items per page by default)'
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
          },
          {
            name: 'pageSize',
            type: 'integer',
            required: false,
            description: 'Number of items per page (default: 100, max: 2000)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "a13VH00000HjjopYAB",
      "AlternatePropertyId": "10003399",
      "BuyerAddress": {
        "City": "Austin",
        "County": "Travis",
        "State": "TX",
        "Street": "456 Corporate Ave",
        "Zip": "78701"
      },
      "BuyerAgent": "Main Street Renewal",
      "BuyerName": "ARMM Asset Company 2 LLC",
      "ClosingDate": "2024-12-30",
      "ClosedAndFunded": false,
      "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
      "Property": {
        "City": "Austin",
        "County": "Travis",
        "State": "TX",
        "Street": "123 Main Street",
        "Zip": "78746"
      },
      "ReadyToClose": false,  
      "ReadyToFund": false,    
      "SalesPrice": 179900,
      "SellerAddress": {
        "City": "Austin",
        "County": "Travis",
        "State": "TX",
        "Street": "789 Seller Blvd",
        "Zip": "78704"
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
}`,
        interfaceDefinition: `${cashAcquisitionsInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Cash Acquisition by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions/:id',
        description: [
          'Retrieves a single cash acquisition transaction by ID',
          'Returns full transaction details regardless of status',
          'No pagination (single record response)',
          'Note: Only accepts IDs that are exactly 18 characters in length'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "data": {
    "Id": "a13VH00000HjjopYAB",
    "AlternatePropertyId": "10003399",
    "BuyerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "456 Corporate Ave",
      "Zip": "78701"
    },
    "BuyerAgent": "Main Street Renewal",
    "BuyerName": "ARMM Asset Company 2 LLC",
    "ClosingDate": "2024-12-30",
    "ClosedAndFunded": false,
    "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
    "Property": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "123 Main Street",
      "Zip": "78746"
    },
    "ReadyToClose": false,  
    "ReadyToFund": false,    
    "SalesPrice": 179900,
    "SellerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "789 Seller Blvd",
      "Zip": "78704"
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
}`,
        interfaceDefinition: `${cashAcquisitionsInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Update Cash Acquisition',
        method: 'PATCH',
        path: '{amherst-api-base}/v1/title-data/cash-acquisitions/:id',
        description: [
          'Updates ClosedAndFunded status for a cash acquisition transaction',
          'Note: ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true',
          'Returns updated transaction details',
          'Note: Only accepts IDs that are exactly 18 characters in length'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        requestBody: `{
  "ClosedAndFunded": true
}`,
        validationRules: [
          'ClosedAndFunded must be a boolean value',
          'ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true'
        ],
        responseExample: `{
  "data": {
    "Id": "a13VH00000HjjopYAB",
    "AlternatePropertyId": "10003399",
    "BuyerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "456 Corporate Ave",
      "Zip": "78701"
    },
    "BuyerAgent": "Main Street Renewal",
    "BuyerName": "ARMM Asset Company 2 LLC",
    "ClosingDate": "2024-12-30",
    "ClosedAndFunded": true,
    "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
    "Property": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "123 Main Street",
      "Zip": "78746"
    },
    "ReadyToClose": true,  
    "ReadyToFund": true,    
    "SalesPrice": 179900,
    "SellerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "789 Seller Blvd",
      "Zip": "78704"
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
}`,
        interfaceDefinition: `${cashAcquisitionsInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'retail-sales',
    title: 'Retail Sales',
    responseObject: `{
  "Id": "a204u000003NnmcAAC", // string - 18 character ID
  "AlternatePropertyId": "p2061794", // string
  "BuyerAgent": { // ContactName | null
    "FirstName": "Eddie", // string
    "MiddleName": null, // string | null
    "LastName": "Tomlinson" // string
  },
  "BuyerName": { // ContactName | null
    "FirstName": "Sarah", // string
    "MiddleName": "Jane", // string | null
    "LastName": "Johnson" // string
  },
  "ClosingDate": "2018-11-28", // string - ISO 8601 date format
  "ClosedAndFunded": false, // boolean
  "EarnestMoney": 3000, // number
  "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000", // string - ISO 8601 datetime format
  "Lender": "First National Bank", // string
  "LoanAmount": 240000, // number
  "Property": { // Address
    "City": "Houston", // string
    "County": "Harris", // string
    "State": "TX", // string
    "Street": "456 Oak Avenue", // string
    "Zip": "77002" // string
  },
  "ReadyToClose": false, // boolean
  "ReadyToFund": false, // boolean
  "SalesPrice": 300000, // number
  "SellerAddress": { // Address
    "City": "Austin", // string
    "County": "Travis", // string
    "State": "TX", // string
    "Street": "101 Corporate Drive", // string
    "Zip": "78701" // string
  },
  "SellerAgent": "Hunter Fendley (TX)", // string
  "SellerName": "Mesa Verde Assets, LLC", // string
  "Status": "Open", // DispositionTitleDataStatus enum: 'Open' | 'Cancelled'
  "TentativeDate": "" // string - ISO 8601 date format
}

Interface definition:
\`\`\`typescript
import { Address, ContactName } from './shared.interface'

export interface DispositionTitleData {
  AlternatePropertyId: string
  BuyerAgent: ContactName | null
  BuyerName: ContactName | null
  ClosingDate: string
  ClosedAndFunded: boolean
  EarnestMoney: number
  Id: string
  LastModifiedDateTime: string
  Lender: string
  LoanAmount: number
  Property: Address 
  ReadyToClose: boolean
  ReadyToFund: boolean
  SalesPrice: number
  SellerAddress: Address
  SellerAgent: string
  SellerName: string
  Status: DispositionTitleDataStatus
  TentativeDate: string
}

export enum DispositionTitleDataStatus {
  Open = 'Open',
  Cancelled = 'Cancelled',  
}
\`\`\`
`,
    endpoints: [
      {
        title: 'List Retail Sales',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/retail-sales',
        description: [
          'Retrieves all retail sales transactions for authorized client',
          'Results paginated (100 items per page by default)'
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
          },
          {
            name: 'pageSize',
            type: 'integer',
            required: false,
            description: 'Number of items per page (default: 100, max: 2000)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "a204u000003NnmcAAC",
      "AlternatePropertyId": "p2061794",
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
      "ClosedAndFunded": false,
      "EarnestMoney": 3000,
      "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
      "Lender": "First National Bank",
      "LoanAmount": 240000,
      "Property": {
        "City": "Houston",
        "County": "Harris",
        "State": "TX",
        "Street": "456 Oak Avenue",
        "Zip": "77002"
      },
      "ReadyToClose": false,  
      "ReadyToFund": false,    
      "SalesPrice": 300000,
      "SellerAddress": {
        "City": "Austin",
        "County": "Travis",
        "State": "TX",
        "Street": "101 Corporate Drive",
        "Zip": "78701"
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
}`,
        interfaceDefinition: `${retailSalesInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Retail Sale by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/retail-sales/:id',
        description: [
          'Retrieves a single retail sale transaction by ID',
          'Returns full transaction details regardless of status',
          'No pagination (single record response)',
          'Note: Only accepts IDs that are exactly 18 characters in length'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "data": {
    "Id": "a204u000003NnmcAAC",
    "AlternatePropertyId": "p2061794",
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
    "ClosedAndFunded": false,
    "EarnestMoney": 3000,
    "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
    "Lender": "First National Bank",
    "LoanAmount": 240000,
    "Property": {
      "City": "Houston",
      "County": "Harris",
      "State": "TX",
      "Street": "456 Oak Avenue",
      "Zip": "77002"
    },
    "ReadyToClose": false,  
    "ReadyToFund": false,    
    "SalesPrice": 300000,
    "SellerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "101 Corporate Drive",
      "Zip": "78701"
    },
    "SellerAgent": "Hunter Fendley (TX)",
    "SellerName": "Mesa Verde Assets, LLC",
    "Status": "Open",
    "TentativeDate": ""
  }
}`,
        interfaceDefinition: `${retailSalesInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Update Retail Sale',
        method: 'PATCH',
        path: '{amherst-api-base}/v1/title-data/retail-sales/:id',
        description: [
          'Updates ClosedAndFunded status for a retail sale transaction',
          'Note: ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true',
          'Returns updated transaction details',
          'Note: Only accepts IDs that are exactly 18 characters in length'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        requestBody: `{
  "ClosedAndFunded": true
}`,
        validationRules: [
          'ClosedAndFunded must be a boolean value',
          'ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true'
        ],
        responseExample: `{
  "data": {
    "Id": "a204u000003NnmcAAC",
    "AlternatePropertyId": "p2061794",
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
    "ClosedAndFunded": true,
    "EarnestMoney": 3000,
    "LastModifiedDateTime": "2024-12-20T21:49:00.000+0000",
    "Lender": "First National Bank",
    "LoanAmount": 240000,
    "Property": {
      "City": "Houston",
      "County": "Harris",
      "State": "TX",
      "Street": "456 Oak Avenue",
      "Zip": "77002"
    },
    "ReadyToClose": true,  
    "ReadyToFund": true,    
    "SalesPrice": 300000,
    "SellerAddress": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "101 Corporate Drive",
      "Zip": "78701"
    },
    "SellerAgent": "Hunter Fendley (TX)",
    "SellerName": "Mesa Verde Assets, LLC",
    "Status": "Open",
    "TentativeDate": ""
  }
}`,
        interfaceDefinition: `${retailSalesInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'bulk-portfolio',
    title: 'Bulk Portfolio',
    responseObject: `{
  "Id": "a13VH00000HjjopYAC", // string - 18 character ID
  "ActualCloseDate": "2024-03-29", // string - ISO 8601 date format
  "AlternatePropertyId": "Amherst ID", // string
  "CloseDate": "2024-03-31", // string - ISO 8601 date format
  "HOA": { // HOA
    "Contact": "John Smith", // string
    "Email": "info@woodlandhillshoa.com", // string
    "MailingAddress": "PO Box 12345, Austin, TX 78701", // string
    "ManagementCompany": "Premier Community Management", // string
    "Name": "Woodland Hills HOA", // string
    "PhoneNumber": "512-555-1234", // string
    "Website": "www.woodlandhillshoa.com" // string
  },
  "LastModifiedDateTime": "2024-03-15T14:30:00.000+0000", // string - ISO 8601 datetime format
  "NewAssetCoName": "ARMM Asset Company 3 LLC", // string
  "NewFundName": "SFR Fund 2024", // string
  "Property": { // Address
    "City": "Austin", // string
    "County": "Travis", // string
    "State": "TX", // string
    "Street": "123 Main Street", // string
    "Zip": "78746" // string
  },
  "SellerName": "Amherst Entity, LLC", // string
  "TitleCompany": "First American Title", // string
  "TransactionName": "Portfolio Sale 2024-Q1", // string
  "Type": "Bulk Sale" // string
}

Interface definition:
\`\`\`typescript
import { Address, HOA } from './shared.interface'

export interface PortfolioTitleData {
  ActualCloseDate: string
  AlternatePropertyId: string
  CloseDate: string
  HOA: HOA
  Id: string
  LastModifiedDateTime: string
  NewAssetCoName: string
  NewFundName: string
  Property: Address
  SellerName: string
  TitleCompany: string
  TransactionName: string
  Type: string
}
\`\`\`

Referenced shared interfaces:
\`\`\`typescript
export interface Address {
  City: string
  County: string
  State: string
  Street: string
  Zip: string
}

export interface ContactName {
  FirstName: string
  MiddleName: string | null
  LastName: string
}

export interface HOA {
  Contact: string
  Email: string
  MailingAddress: string
  ManagementCompany: string
  Name: string
  PhoneNumber: string
  Website: string
}
\`\`\``,
    endpoints: [
      {
        title: 'List Portfolio Properties',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/bulk-portfolio',
        description: [
          'Retrieves all portfolio property details for authorized client',
          'Includes property details and associated HOA information',
          'Results paginated (100 items per page by default)'
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
          },
          {
            name: 'pageSize',
            type: 'integer',
            required: false,
            description: 'Number of items per page (default: 100, max: 2000)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "a13VH00000HjjopYAC",
      "AlternatePropertyId": "Amherst ID",
      "AnticipatedCloseDate": "2024-03-31",
      "HOA": {
        "Contact": "John Smith", 
        "Email": "info@woodlandhillshoa.com",
        "MailingAddress": "PO Box 12345, Austin, TX 78701",
        "ManagementCompany": "Premier Community Management",
        "Name": "Woodland Hills HOA",
        "PhoneNumber": "512-555-1234",
        "Website": "www.woodlandhillshoa.com"
      },
      "LastModifiedDateTime": "2024-03-15T14:30:00.000+0000",
      "NewAssetCoName": "ARMM Asset Company 3 LLC",
      "Property": {
        "City": "Austin",
        "County": "Travis",
        "State": "TX",
        "Street": "123 Main Street",
        "Zip": "78746"
      },
      "ReadyToClose": false,
      "ReadyToFund": false,
      "SellerName": "Amherst Entity, LLC",
      "TitleCompany": "First American Title",
      "TransactionName": "Portfolio Sale 2024-Q1",
      "Type": "Bulk Sale - Servicing Retained"
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
}`,
        interfaceDefinition: `${portfolioInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Portfolio Property by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/bulk-portfolio/{id}',
        description: [
          'Retrieves a single portfolio property by ID',
          'Returns detailed information about the property and associated HOA',
          'Note: Only accepts IDs that are exactly 18 characters in length'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'The unique identifier of the portfolio property (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "data": {
    "Id": "a13VH00000HjjopYAC",
    "AlternatePropertyId": "Amherst ID",
    "AnticipatedCloseDate": "2024-03-31",
    "HOA": {
      "Contact": "John Smith", 
      "Email": "info@woodlandhillshoa.com",
      "MailingAddress": "PO Box 12345, Austin, TX 78701",
      "ManagementCompany": "Premier Community Management",
      "Name": "Woodland Hills HOA",
      "PhoneNumber": "512-555-1234",
      "Website": "www.woodlandhillshoa.com"
    },
    "LastModifiedDateTime": "2024-03-15T14:30:00.000+0000",
    "NewAssetCoName": "ARMM Asset Company 3 LLC",
    "Property": {
      "City": "Austin",
      "County": "Travis",
      "State": "TX",
      "Street": "123 Main Street",
      "Zip": "78746"
    },
    "ReadyToClose": false,
    "ReadyToFund": false,
    "SellerName": "Amherst Entity, LLC",
    "TitleCompany": "First American Title",
    "TransactionName": "Portfolio Sale 2024-Q1",
    "Type": "Bulk Sale - Servicing Retained"
  }
}`,
        interfaceDefinition: `${portfolioInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'The API uses OAuth 2.0 client credentials flow for authentication. You must obtain an access token before accessing any endpoints. The access token contains claims that determine which data you have permission to access - you will only receive data for entities you are authorized to view based on these token claims.',
    endpoints: [
      {
        title: 'Obtaining an Access Token',
        method: 'POST',
        path: '{amherst-api-base}/auth/token',
        description: [
          'Obtain an access token using client credentials',
          'The returned token contains claims that determine your access permissions',
          'Each token is valid for 1 hour from the time of issue'
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
  'Results are paginated with 100 items per page by default',
  'Use the pagination links provided in the response to navigate through the results',
  'All GET by ID endpoints only accept IDs that are exactly 18 characters in length',
  'Your access token determines which data you can access - you will only see data for entities you are authorized to view',
  'The ClosedAndFunded field can only be set to true if ReadyToClose and ReadyToFund are already true'
];

export const versionHistory = [
  {
    version: 'v1.3.0',
    date: '2025-04-15',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: false
    },
    changes: [
      'Cash Acquisitions and Retail Sales:',
      '- ReadyToClose and ReadyToFund are now read-only fields',
      '- Added ClosedAndFunded boolean field to all responses',
      '- Update endpoints now only accept ClosedAndFunded field',
      '- ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true',
      'Retail Sales:',
      '- Removed BuyerAddress from all responses'
    ]
  },
  {
    version: 'v1.2.1',
    date: '2025-03-20',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: false
    },
    changes: [
      'Bulk Portfolio:',
      '- Renamed CloseDate to AnticipatedCloseDate',
      '- Removed ActualCloseDate field',
      '- Removed NewFundName field',
      '- Added ReadyToClose and ReadyToFund boolean fields',
      '- Updated Type field to use enumerated values',
    ]
  },
  {
    version: 'v1.2.0',
    date: '2025-03-15',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'All Endpoints:',
      '- Added optional pageSize parameter to all List endpoints',
      '- Alphabetized County in Address components',
      '- Alphabetized Property fields in all responses',
      'Bulk Portfolio:',
      '- New GET endpoint Get Portfolio Property by ID to retrieve transaction by Id',
      '- Updated response format to move Id to top of the response to match other endpoints'
    ]
  },
  {
    version: 'v1.1.0',
    date: '2025-02-27',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'Added base URLs for QA and prod',
      'Cash Acquisitions:',
      '- Updated data response for List Cash Acquisitions',
      '- - Removed Realtor field',
      '- - Added BuyerAgent field',
      '- - Added SellerAgent field',
      '- - Added ReadyToClose and ReadyToFund fields',
      '- - Parsed address fields into Address Object and Name fields into Name Object',
      '- New GET endpoint Get Cash Acquisition by ID to retrieve transaction by Id',
      '- New PATCH endpoint Update Cash Acquisition to update ReadyToClose and ReadyToFund',
      'Retail Sales:',
      '- Updated data response for List Retail Sales',
      '- - Renamed LossAmount to LoanAmount',
      '- - Added Lender field',
      '- - Added ReadyToClose and ReadyToFund fields',
      '- - Parsed address fields into Address Object and Name fields into Name Object',
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
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'Pagination implementation'
    ]
  },
  {
    version: 'v1.0.1',
    date: '2025-01-29',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'Updates to List Retail Sales List Cash Acquisitions endpoint descriptions'
    ]
  },
  {
    version: 'v1.0.0',
    date: '2025-01-23',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'Initial spec with List Cash Acquisitions and List Retail Sales endpoints'
    ]
  }
]; 