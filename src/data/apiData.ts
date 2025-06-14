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
  endpoints?: ApiEndpoint[];
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
  EarnestMoney: string
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
  Closed = 'Closed',
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
  Street: string | null
  City: string | null
  County: string | null
  State: string | null
  Zip: string | null
}

export interface ContactName {
  FirstName: string | null
  MiddleName: string | null
  LastName: string | null
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

// Document interfaces
const documentInterfaces = `export interface Document {
  Id: string
  Name: string
  DocType: AcquisitionsDocumentType | DispositionsDocumentType
  OrderedDate: string | null
  UploadedDate: string | null
  Status: string | null
  Notes: string | null
  Approved: boolean
  Rejected: boolean
}

export enum AcquisitionsDocumentType {
  BUYER_SIGNING_DOCS = 'Buyer_Signing_Docs',
  CCR = 'CCR',
  EMD_RECEIPT = 'EMD_Receipt',
  EXECUTED_DEED = 'Executed_Deed',
  FINAL_CONTRACT_AND_AMENDMENTS = 'Final_Contract_and_Amendments',
  FINAL_HUD = 'Final_HUD',
  FIRPTA = 'FIRPTA',
  HOA_CERT = 'HOA_Cert',
  HOA_CONFIRMATION = 'HOA_Confirmation',
  CONFIRMATION_OF_NO_HOA = 'Confirmation_of_no_HOA',
  MLC = 'MLC',
  NON_FOREIGN_CERT = 'Non_Foreign_Cert',
  OTHER = 'Other',
  PLAT_MAP = 'Plat_Map',
  RECORDED_DEED = 'Recorded_Deed',
  SCHEDULE_B = 'Schedule_B',
  TAX_CERT = 'Tax_Cert',
  TITLE_COMMITMENT = 'Title_Commitment',
  TITLE_POLICY = 'Title_Policy',
  UNEXECUTED_DEED = 'Unexecuted_Deed',
}

export enum DispositionsDocumentType {
  COMPILED_RELEASES = 'Compiled_Releases',
  COMPILED_MORTGAGES = 'Compiled_Mortgages',
  EMD_RECEIPT = 'EMD_Receipt',
  FINAL_HUD = 'Final_HUD',
  HOA_CERT = 'HOA_Cert',
  MLC = 'MLC',
  OTHER = 'Other',
  PAYOFF = 'Payoff',
  SELLER_EDOCS = 'Seller_Edocs',
  SELLER_HUD = 'Seller_HUD',
  SELLER_WET_DOCS = 'Seller_Wet_Docs',
  TITLE_COMMITMENT = 'Title_Commitment',
  WIRE_CONFIRMATION = 'Wire_Confirmation',
}

export enum AmherstDocumentType {
  AMENDMENTS_TO_CONTRACT = 'Amendments_to_Contract',
  ASSIGNMENT_OF_LEASE = 'Assignment_of_Lease',
  COMMISSION_INSTRUCTIONS = 'Commission_Instructions',
  EXECUTED_CLOSING_PACKAGE = 'Executed_Closing_Package',
  FIRPTA = 'FIRPTA',
  INVOICE = 'Invoice',
  LEASE = 'Lease',
  LEASE_BACK = 'Leaseback',
  PURCHASE_CONTRACT = 'Purchase_Contract',
}`;

export const apiData: ApiSection[] = [
  {
    id: 'cash-acquisitions',
    title: 'Cash Acquisitions',
    description: 'Note: As of v1.4.3, the State field in Property objects returns standardized two-letter state codes (e.g., "TX", "FL") instead of full state names.',
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
            type: 'number',
            required: false,
            description: 'Page number (default: 1)'
          },
          {
            name: 'pageSize',
            type: 'number',
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
          'ClosedAndFunded can only be set to true once - already closed transactions cannot be updated',
          'Only transactions with status "Open" can be updated',
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
          'ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true',
          'ClosedAndFunded can only be set to true once - transactions that are already closed and funded cannot be updated',
          'Only transactions with status "Open" can be updated'
        ],
        responseExample: `{
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
}`,
        interfaceDefinition: `${cashAcquisitionsInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'retail-sales',
    title: 'Retail Sales',
    description: 'Note: As of v1.4.4, document types are separated into AcquisitionsDocumentType and DispositionsDocumentType.',
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
  "EarnestMoney": "3000", // string
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
  "Status": "Open", // DispositionTitleDataStatus enum: 'Open' | 'Cancelled' | 'Closed'
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
  EarnestMoney: string
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
  Closed = 'Closed',
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
            type: 'number',
            required: false,
            description: 'Page number (default: 1)'
          },
          {
            name: 'pageSize',
            type: 'number',
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
      "EarnestMoney": "3000",
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
  "EarnestMoney": "3000",
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
          'ClosedAndFunded can only be set to true once - already closed transactions cannot be updated',
          'Only transactions with status "Open" can be updated',
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
          'ReadyToClose and ReadyToFund must be true before ClosedAndFunded can be set to true',
          'ClosedAndFunded can only be set to true once - transactions that are already closed and funded cannot be updated',
          'Only transactions with status "Open" can be updated'
        ],
        responseExample: `{
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
  "EarnestMoney": "3000",
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
}`,
        interfaceDefinition: `${retailSalesInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'document-management',
    title: 'Document Management',
    description: 'The following endpoints allow for document management associated with both cash acquisition and retail sale transactions. Document operations are restricted to title companies specified in the allowedCompanies list in the token metadata. As of v1.4.4, document types are separated into AcquisitionsDocumentType for cash acquisitions and DispositionsDocumentType for retail sales.',
    endpoints: [
      {
        title: 'Create Document',
        method: 'POST',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/documents',
        description: [
          'Creates a new document metadata entry for a transaction',
          'Document upload must be completed separately using the upload URL endpoint',
          'Returns the complete document metadata',
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        requestBody: `{
  "DocType": "Title_Commitment",
  "Name": "Title_Commitment.pdf",
  "OrderedDate": "2024-05-15T14:30:00.000Z",
}`,
        validationRules: [
          'DocType must be a valid DocumentType value (Pascal case with underscores, e.g., "Title_Commitment"). For Acquisitions, use AcquisitionsDocumentType. For Dispositions, use DispositionsDocumentType.',
          'Name must be a valid filename with appropriate extension',
          'OrderedDate, if provided, must be a valid ISO 8601 timestamp',
          'Notes is required when DocType is "Other"',
          'Notes, if provided, must be a string',
          'Title company must be authorized for the specified transaction'
        ],
        responseExample: `{
  "Id": "d15VH00000AbcdefGHI",
  "Name": "Title_Commitment.pdf",
  "DocType": "Title_Commitment",
  "OrderedDate": "2024-05-15T14:30:00.000Z",
  "UploadedDate": null,
  "Status": null,
  "Notes": null,
  "Approved": false,
  "Rejected": false
}`,
        interfaceDefinition: `${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Upload URL',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/documents/:documentId/upload-url',
        description: [
          'Generates a signed URL for uploading a document to cloud storage',
          'URL will expire after 15 minutes',          
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          },
          {
            name: 'documentId',
            type: 'string',
            required: true,
            description: 'Document ID to generate upload URL for (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "SignedURL": "https://amherst-storage.s3.amazonaws.com/documents/a13VH00000HjjopYAB/Title_Commitment.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240515T123456Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=123456789abcdef"
}`,
        interfaceDefinition: `export interface UploadUrlResponse {
  SignedURL: string
}`
      },
      {
        title: 'Update Document',
        method: 'PATCH',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/documents/:documentId',
        description: [
          'Updates metadata for an existing document associated with a transaction',
          'Can be used to update notes, confirm upload, or modify ordered date',
          'Returns the updated document metadata',
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          },
          {
            name: 'documentId',
            type: 'string',
            required: true,
            description: 'Document ID to update (must be exactly 18 characters in length)'
          }
        ],
        requestBody: `{
  "Notes": "Updated document notes",
  "Name": "Updated_Title_Commitment.pdf",
  "OrderedDate": "2024-05-15T14:30:00.000Z"
}`,
        validationRules: [
          'At least one of Notes, Name, or OrderedDate must be provided',
          'Name, if provided, must be a valid filename with appropriate extension',
          'OrderedDate, if provided, must be a valid ISO 8601 timestamp',
          'Notes, if provided, must be a string',
          'Title company must be authorized for the specified transaction'
        ],
        responseExample: `{
  "Id": "d15VH00000AbcdefGHI",
  "Name": "Title_Commitment_2.pdf",
  "DocType": "Title_Commitment",
  "OrderedDate": "2024-05-15T14:30:00.000Z",
  "UploadedDate": null,
  "Status": "Approved",
  "Notes": "Revision on 5/2/2025",
  "Approved": true,
  "Rejected": false
}`,
        interfaceDefinition: `${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'List Documents',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/documents',
        description: [
          'Retrieves all documents associated with a transaction',
          'Returns an array of document metadata objects',
          'No pagination (returns all documents for the transaction)',
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Id": "d15VH00000AbcdefGHI",
      "Name": "Title_Commitment.pdf",
      "DocType": "Title_Commitment",
      "OrderedDate": "2024-05-15T14:30:00.000Z",
      "UploadedDate": null,
      "Status": "Rejected: Required signature missing",
      "Notes": null,
      "Approved": false,
      "Rejected": true
    },
    {
      "Id": "d15VH00000JklmnoOPQ",
      "Name": "Deed.pdf",
      "DocType": "Executed_Deed",
      "OrderedDate": "2024-05-15T14:30:00.000Z",
      "UploadedDate": "2024-05-16T10:15:30.000Z",
      "Status": "Approved",
      "Notes": null,
      "Approved": true,
      "Rejected": false
    }
  ]
}`,
        interfaceDefinition: `${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Document by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/documents/:documentId',
        description: [
          'Retrieves metadata for a specific document associated with a transaction',
          'Returns a single document metadata object',
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          },
          {
            name: 'documentId',
            type: 'string',
            required: true,
            description: 'Document ID to retrieve (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "Id": "d15VH00000AbcdefGHI",
  "Name": "Title_Commitment.pdf",
  "DocType": "Title_Commitment",
  "OrderedDate": "2024-05-15T14:30:00.000Z",
  "UploadedDate": null,
  "Status": null,
  "Notes": null,
  "Approved": false,
  "Rejected": false
}`,
        interfaceDefinition: `${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Amherst Documents',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/{transaction-type}/:id/amherst-documents',
        description: [
          'Retrieves all Amherst-uploaded documents associated with a transaction',
          'Returns documents with signed URLs for direct download',
          'Only returns documents of AmherstDocumentType that have been uploaded',
          'Signed URLs expire after 15 minutes',
          'Note: Replace {transaction-type} with either "cash-acquisitions" or "retail-sales"'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
        pathParams: [
          {
            name: 'transaction-type',
            type: 'string',
            required: true,
            description: 'The type of transaction ("cash-acquisitions" or "retail-sales")'
          },
          {
            name: 'id',
            type: 'string',
            required: true,
            description: 'Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "data": [
    {
      "Approved": true,
      "DocType": "Assignment_of_Lease",
      "Id": "a3fVG00000DJtR8YAL",
      "Name": "10829850-206_SANDY_HILL_RD-Assignment_of_Lease.pdf",
      "Notes": null,
      "Rejected": false,
      "Status": "Approved",
      "UploadedDate": "2025-05-27T18:14:30.000+0000",
      "SignedURL": "https://cfsigned-dev.amhev.com/sfid/500VG00000IH1a7YAD/10829850-206_SANDY_HILL_RD-Assignment_of_Lease.pdf?Expires=1748373911&Key-Pair-Id=APKAJP3C5KCRFH3YRQQQ&Signature=DaE~RanseEuz-e3783I2CzQV1nwcH2khvy-TzIngaYAdy86ejHvsZ6GryAxYwAyQBiMOl5oxT8miAj~99Cb10f8k5WfB5ekdu4EEiQFSNXXDClF3VIWqqfJCeAn92IqxgvQNv8VU88UEkg7gLqYziYyKn~UuZA0ats5Z7lWyAYLoe4usyNd4aR-a3bcT1cEGbewzp-l2mSlFQXQC~zMAReMU2ZDBC-YOTPscARqwlR1lHzA7eeTq7Bi2AiCosTNMICu-11omSRsmAQg2eSzGH4h1SiQGoTjZkXV0FVskmJjh9FvxG7EF52-XaK4AaB4WhXo2e0CdRIBYYCtGXBSAzg__"
    },
    {
      "Approved": null,
      "DocType": "Amendments_to_Contract",
      "Id": "a3fVG00000DJqwHYAT",
      "Name": "10829850-206_SANDY_HILL_RD-Amendments_to_Contract.pdf",
      "Notes": null,
      "Rejected": null,
      "Status": "Under Review",
      "UploadedDate": "2025-05-27T15:54:32.000+0000",
      "SignedURL": "https://cfsigned-dev.amhev.com/sfid/500VG00000IH1a7YAD/10829850-206_SANDY_HILL_RD-Amendments_to_Contract.pdf?Expires=1748373911&Key-Pair-Id=APKAJP3C5KCRFH3YRQQQ&Signature=Vc0KWyoZ6pSdE0E93~ibDt6iofEqYEi~ObVab2HaOQ7WxMtkSeqPMQrpsL4WTF~l9wZXPwVKoXV2~MCqRJCJBK3cw3DOc6quW5ekn0Uw086~2nO7jKWx4e5L3NDSM5Y8jr77Ban6oX9eUtKgZ4w8VCXjaA-5F0GRuy2NG4~jZ6aCcihCPPoWWPeprVkV5U9JesvlT9FHNWx4TMHhKELN6OBC355QjLHeJUHXGNV-lMsVJBg5LRTh1xNPSDM9lUZtFL8OtiiHkOuF9bbsddY-hvc8LyOhBtjJEtue2kmwTReLjjxRazaH8swVzKp4F9C9cGpvCNSIRoNe9xr0P9WUGA__"
    }
  ]
}`,
        interfaceDefinition: `export interface AmherstDocumentDto {
  Approved: boolean | null
  DocType: string
  Id: string
  Name: string
  Notes: string | null
  Rejected: boolean | null
  Status: string | null
  UploadedDate: string | null
  SignedURL: string
}

export interface AmherstDocumentListResponseDto {
  data: AmherstDocumentDto[]
}

${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`
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
  Street: string | null
  City: string | null
  County: string | null
  State: string | null
  Zip: string | null
}

export interface ContactName {
  FirstName: string | null
  MiddleName: string | null
  LastName: string | null
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
            type: 'number',
            required: false,
            description: 'Page number (default: 1)'
          },
          {
            name: 'pageSize',
            type: 'number',
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
  'The ClosedAndFunded field can only be set to true if ReadyToClose and ReadyToFund are already true',
  'ClosedAndFunded can only be set to true once - transactions that are already closed and funded cannot be updated again',
  'Only transactions with status "Open" can be updated',
  'Document uploads must be performed using the signed URL provided by the upload-url endpoint',
  'Uploaded documents are only accessible to authorized title companies specified in the token',
  'Signed URLs for document uploads expire after 15 minutes',
  'For document operations, use AcquisitionsDocumentType values for cash-acquisitions and DispositionsDocumentType values for retail-sales',
  'When creating a document with DocType "Other", the Notes field is required to specify what type of document it is',
];

export const versionHistory = [
  {
    version: 'v1.4.5',
    date: '2025-05-21',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: false
    },
    changes: [
      'Document Management:',
      '- Updated BUYER_CLOSING_DOCS to BUYER_SIGNING_DOCS in AcquisitionsDocumentType enum',
      '- Added HOA_CERT document type to AcquisitionsDocumentType enum',
      '- Added COMPILED_RELEASES and COMPILED_MORTGAGES document types back to DispositionsDocumentType enum',
      '- Added HOA_CERT document type to DispositionsDocumentType enum',
      '- Added INVOICE document type to AmherstDocumentType enum',
      '- Added CONFIRMATION_OF_NO_HOA document type to AcquisitionsDocumentType enum',
      '- Updated document type enums to match backend interface definitions'
    ]
  },
  {
    version: 'v1.4.4',
    date: '2025-05-20',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: false
    },
    changes: [
      'Document Management:',
      '- Split DocumentType enum into separate AcquisitionsDocumentType and DispositionsDocumentType enums',
      '- Added CCR and OTHER document types to AcquisitionsDocumentType',
      '- Added OTHER document type to DispositionsDocumentType',
      '- Removed COMPILED_MORTGAGES and COMPILED_RELEASES from DispositionsDocumentType',
      '- Added AmherstDocumentType enum for Amherst-uploaded documents',
      '- Added new GET /:id/amherst-documents endpoint to retrieve Amherst-uploaded documents with signed URLs',
      'Retail Sales:',
      '- Updated EarnestMoney field type from number to string',
      '- Added Closed status to DispositionTitleDataStatus enum',
      '- Updated validation rules to reference the appropriate document type enum based on transaction type'
    ]
  },
  {
    version: 'v1.4.3',
    date: '2025-05-15',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: false
    },
    changes: [
      'Document Management:',
      '- Updated DocumentType enum with new values',
      '- Removed "List Amherst Documents" endpoint',
      'Cash Acquisitions:',
      '- State field in Property object now returns standardized two-letter state codes (e.g., "TX", "FL") instead of full state names'
    ]
  },
  {
    version: 'v1.4.2',
    date: '2025-05-02',
    author: 'David Brown',
    environments: {
      qa: false,
      prod: false
    },
    changes: [
      'Document Management:',
      '- Added new fields to Document interface: Notes, Approved, Rejected',
      '- Removed Status field from document Create and PATCH requests',
      '- Added Notes field to document Create and PATCH requests',
      '- Updated all document-related endpoint responses to include new fields'
    ]
  },
  {
    version: 'v1.4.1',
    date: '2025-04-27',
    author: 'David Brown',
    environments: {
      qa: false,
      prod: false
    },
    changes: [
      'Document Management:',
      '- Updated Document interface to replace DocumentId with Name field (the actual filename)',
      '- Added Name field to document Create and Update request bodies',
      'Shared Interfaces:',
      '- Updated Address and ContactName interfaces to make all properties nullable'
    ]
  },
  {
    version: 'v1.4.0',
    date: '2025-04-15',
    author: 'David Brown',
    environments: {
      qa: false,
      prod: false
    },
    changes: [
      'Cash Acquisitions and Retail Sales:',
      '- Added document management endpoints to both resources:',
      '- - New POST /:id/documents endpoint to create document metadata',
      '- - New GET /:id/documents/:documentId/upload-url endpoint to get signed upload URL',
      '- - New PATCH /:id/documents/:documentId endpoint to update document metadata',
      '- - New GET /:id/documents endpoint to list all documents for a transaction',
      '- - New GET /:id/documents/:documentId endpoint to get specific document metadata',
      '- - New GET /:id/amherst-documents endpoint to get Amherst-uploaded documents',
    ]
  },
  {
    version: 'v1.3.0',
    date: '2025-04-05',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
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
      prod: true
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
      '- - Parsed address fields into Address Object and Name fields into Name fields',
      '- New GET endpoint Get Cash Acquisition by ID to retrieve transaction by Id',
      '- New PATCH endpoint Update Cash Acquisition to update ReadyToClose and ReadyToFund',
      'Retail Sales:',
      '- Updated data response for List Retail Sales',
      '- - Renamed LossAmount to LoanAmount',
      '- - Added Lender field',
      '- - Added ReadyToClose and ReadyToFund fields',
      '- - Parsed address fields into Address Object and Name fields into Name fields',
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