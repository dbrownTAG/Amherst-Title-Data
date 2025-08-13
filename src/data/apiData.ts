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
  contexts?: DocumentContext[];
}

export interface DocumentContext {
  id: string;
  title: string;
  description: string;
  basePath: string;
  documentTypes: string;
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const financingInterface = `import { Address } from './shared.interface'

export interface FinancingTitleData {
  ActualCloseDate: string | null
  CloseDate: string | null
  Comments: string | null
  CurrentPartnership: string | null
  FundingAndDisbursementDate: string | null
  Id: string
  LastModifiedDate: string
  Name: string | null
  NewPartnership: string | null
  OpenDate: string | null
  Properties: string[]
  PropertiesWithDocs: string[]
  PropertiesWithRecentDocs: string[]
  ReadyForClosingDate: string | null
  ReadyForFundingDate: string | null
  RecentlyAddedProperties: string[]
  RecentlyRemovedProperties: string[]
  Status: string | null
  Type: string | null
}`;

const financingPropertyInterface = `import { Address } from './shared.interface'

export interface FinancingPropertyData {
  Id: string
  AccountingCost: number | null
  AcquisitionDate: string | null
  Action: string | null
  AlternatePropertyId: string | null
  Baths: number | null
  Beds: number | null
  FairValue: number | null
  FinancingTransactionId: string | null
  LastModifiedDate: string
  MasterStatus: string | null
  ParcelNumber: string | null
  Property: Address
  PropertyOwnerName: string | null
  PurchasePrice: number | null
  SquareFt: number | null
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const documentInterfaces = `export enum AcquisitionsDocumentType {
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
}

export enum FinancingDocumentType {
  BUYER_SIGNING_DOCS = 'Buyer_Signing_Docs',
  CCR = 'CCR',
  COMPILED_MORTGAGES = 'Compiled_Mortgages',
  COMPILED_RELEASES = 'Compiled_Releases',
  CONFIRMATION_OF_NO_HOA = 'Confirmation_of_no_HOA',
  EMD_RECEIPT = 'EMD_Receipt',
  EXECUTED_DEED = 'Executed_Deed',
  FINAL_CONTRACT_AND_AMENDMENTS = 'Final_Contract_and_Amendments',
  FINAL_HUD = 'Final_HUD',
  FIRPTA = 'FIRPTA',
  HOA_CERT = 'HOA_Cert',
  HOA_CONFIRMATION = 'HOA_Confirmation',
  MLC = 'MLC',
  NON_FOREIGN_CERT = 'Non_Foreign_Cert',
  OTHER = 'Other',
  PAYOFF = 'Payoff',
  PLAT_MAP = 'Plat_Map',
  PURCHASE_CONTRACT = 'Purchase_Contract',
  RECORDED_DEED = 'Recorded_Deed',
  SCHEDULE_B = 'Schedule_B',
  SELLER_EDOCS = 'Seller_Edocs',
  SELLER_HUD = 'Seller_HUD',
  SELLER_WET_DOCS = 'Seller_Wet_Docs',
  TAX_CERT = 'Tax_Cert',
  TITLE_COMMITMENT = 'Title_Commitment',
  TITLE_POLICY = 'Title_Policy',
  UNEXECUTED_DEED = 'Unexecuted_Deed',
  WIRE_CONFIRMATION = 'Wire_Confirmation',
}

export type DocumentType = AcquisitionsDocumentType | DispositionsDocumentType | FinancingDocumentType

export interface CreateDocumentDto {
  DocType: DocumentType
  Name?: string
  OrderedDate?: string // ISO 8601 date format
  Notes?: string // Required when DocType is 'Other'
}

export interface DealDocumentDto extends CreateDocumentDto {
  DocType: AcquisitionsDocumentType
}

export interface TransactionDocumentDto extends CreateDocumentDto {
  DocType: DispositionsDocumentType
}

export interface FinancingDocumentDto extends CreateDocumentDto {
  DocType: FinancingDocumentType
}

export interface UpdateDocumentDto {
  Name?: string
  Notes?: string
  ConfirmUpload?: boolean
  OrderedDate?: string // ISO 8601 date format
}

export interface DocumentResponseDto {
  Approved: boolean | null
  DocType: DocumentType
  Id: string
  Name: string
  Notes: string | null
  OrderedDate: string | null
  Rejected: boolean | null
  Status: string | null
  UploadedDate: string | null
}

export interface DocumentListResponseDto {
  data: DocumentResponseDto[]
}

export interface UploadUrlResponseDto {
  SignedURL: string
}

export interface AmherstDocumentDto {
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
    description: 'The following endpoints allow for document management across all transaction types. Document operations are restricted to title companies specified in the allowedCompanies list in the token metadata. As of v1.5.0, the system supports four different document contexts. Use the tabs below to switch between different document contexts and their respective endpoint patterns and available document types.',
    endpoints: [],
    contexts: [
      {
        id: 'cash-acquisitions',
        title: 'Cash Acquisitions',
        description: 'Document management for cash acquisition transactions',
        basePath: '/v1/title-data/cash-acquisitions/:id/documents',
        documentTypes: 'AcquisitionsDocumentType (20 types): BUYER_SIGNING_DOCS, CCR, EMD_RECEIPT, EXECUTED_DEED, FINAL_CONTRACT_AND_AMENDMENTS, FINAL_HUD, FIRPTA, HOA_CERT, HOA_CONFIRMATION, CONFIRMATION_OF_NO_HOA, MLC, NON_FOREIGN_CERT, OTHER, PLAT_MAP, RECORDED_DEED, SCHEDULE_B, TAX_CERT, TITLE_COMMITMENT, TITLE_POLICY, UNEXECUTED_DEED',
        endpoints: []
      },
      {
        id: 'retail-sales',
        title: 'Retail Sales',
        description: 'Document management for retail sales transactions',
        basePath: '/v1/title-data/retail-sales/:id/documents',
        documentTypes: 'DispositionsDocumentType (13 types): COMPILED_RELEASES, COMPILED_MORTGAGES, EMD_RECEIPT, FINAL_HUD, HOA_CERT, MLC, OTHER, PAYOFF, SELLER_EDOCS, SELLER_HUD, SELLER_WET_DOCS, TITLE_COMMITMENT, WIRE_CONFIRMATION',
        endpoints: []
      },
      {
        id: 'financing',
        title: 'Financing Transactions',
        description: 'Document management for financing transactions',
        basePath: '/v1/title-data/financing/:entityId/documents',
        documentTypes: 'FinancingDocumentType (24 types): BUYER_SIGNING_DOCS, CCR, COMPILED_MORTGAGES, COMPILED_RELEASES, CONFIRMATION_OF_NO_HOA, EMD_RECEIPT, EXECUTED_DEED, FINAL_CONTRACT_AND_AMENDMENTS, FINAL_HUD, FIRPTA, HOA_CERT, HOA_CONFIRMATION, MLC, NON_FOREIGN_CERT, OTHER, PAYOFF, PLAT_MAP, RECORDED_DEED, SCHEDULE_B, SELLER_EDOCS, SELLER_HUD, SELLER_WET_DOCS, TAX_CERT, TITLE_COMMITMENT, TITLE_POLICY, UNEXECUTED_DEED, WIRE_CONFIRMATION',
        endpoints: []
      },
      {
        id: 'financing-property',
        title: 'Financing Transaction Properties',
        description: 'Document management for individual properties within financing transactions',
        basePath: '/v1/title-data/financing/:financingId/property/:propertyId/documents',
        documentTypes: 'FinancingDocumentType (24 types): BUYER_SIGNING_DOCS, CCR, COMPILED_MORTGAGES, COMPILED_RELEASES, CONFIRMATION_OF_NO_HOA, EMD_RECEIPT, EXECUTED_DEED, FINAL_CONTRACT_AND_AMENDMENTS, FINAL_HUD, FIRPTA, HOA_CERT, HOA_CONFIRMATION, MLC, NON_FOREIGN_CERT, OTHER, PAYOFF, PLAT_MAP, RECORDED_DEED, SCHEDULE_B, SELLER_EDOCS, SELLER_HUD, SELLER_WET_DOCS, TAX_CERT, TITLE_COMMITMENT, TITLE_POLICY, UNEXECUTED_DEED, WIRE_CONFIRMATION',
        endpoints: []
      }
    ]
  },
  {
    id: 'financing-transactions',
    title: 'Financing Transactions',
    description: 'Financing transactions represent complex real estate financing deals that contain multiple properties. Each financing transaction can have transaction-level documents and individual properties with property-specific documents. Transaction types include JV Transactions, Securitizations, OCRs, and Internal Transactions.',
    responseObject: `{
  "Id": "a12VH00000K9mX7AAB", // string - 18 character ID
  "ActualCloseDate": null, // string | null - ISO 8601 date format
  "CloseDate": "2025-06-30", // string | null - ISO 8601 date format
  "Comments": "Multi-property refinancing transaction", // string | null
  "CurrentPartnership": "Amherst Capital Partners", // string | null - Partnership name
  "FundingAndDisbursementDate": null, // string | null - ISO 8601 date format
  "LastModifiedDate": "2025-05-27T18:14:30.000+0000", // string - ISO 8601 datetime format
  "Name": "Texas Portfolio Refinance 2025", // string | null
  "NewPartnership": "Amherst Capital Partners II", // string | null - Partnership name
  "OpenDate": "2025-01-15", // string | null - ISO 8601 date format
  "Properties": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD", "a13VH00000D2kP8AAE"], // string[] - Property IDs
  "PropertiesWithDocs": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD"], // string[] - Properties with title documents
  "PropertiesWithRecentDocs": ["a13VH00000B7xQ2AAC"], // string[] - Properties with documents in last 12 hours
  "ReadyForClosingDate": null, // string | null - ISO 8601 date format
  "ReadyForFundingDate": null, // string | null - ISO 8601 date format
  "RecentlyAddedProperties": ["a13VH00000D2kP8AAE"], // string[] - Properties added in last 12 hours
  "RecentlyRemovedProperties": [], // string[] - Properties removed in last 12 hours
  "Status": "In Progress", // string | null - Transaction status
  "Type": "Securitizations" // string | null - Transaction type
}

Interface definition:
\`\`\`typescript
export interface FinancingTitleData {
  ActualCloseDate: string | null
  CloseDate: string | null
  Comments: string | null
  CurrentPartnership: string | null
  FundingAndDisbursementDate: string | null
  Id: string
  LastModifiedDate: string
  Name: string | null
  NewPartnership: string | null
  OpenDate: string | null
  Properties: string[]
  PropertiesWithDocs: string[]
  PropertiesWithRecentDocs: string[]
  ReadyForClosingDate: string | null
  ReadyForFundingDate: string | null
  RecentlyAddedProperties: string[]
  RecentlyRemovedProperties: string[]
  Status: string | null
  Type: string | null
}
\`\`\`
`,
    endpoints: [
      {
        title: 'List Financing Transactions',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/financing',
        description: [
          'Retrieves all financing transactions for authorized client',
          'Each transaction contains multiple properties and associated metadata',
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
      "Id": "a12VH00000K9mX7AAB",
      "ActualCloseDate": null,
      "CloseDate": "2025-06-30",
      "Comments": "Multi-property refinancing transaction",
      "CurrentPartnership": "Amherst Capital Partners",
      "FundingAndDisbursementDate": null,
      "LastModifiedDate": "2025-05-27T18:14:30.000+0000",
      "Name": "Texas Portfolio Refinance 2025",
      "NewPartnership": "Amherst Capital Partners II",
      "OpenDate": "2025-01-15",
      "Properties": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD", "a13VH00000D2kP8AAE"],
      "PropertiesWithDocs": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD"],
      "PropertiesWithRecentDocs": ["a13VH00000B7xQ2AAC"],
      "ReadyForClosingDate": null,
      "ReadyForFundingDate": null,
      "RecentlyAddedProperties": ["a13VH00000D2kP8AAE"],
      "RecentlyRemovedProperties": [],
      "Status": "In Progress",
      "Type": "Securitizations"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 250,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "links": {
      "self": "/v1/title-data/financing?page=1",
      "first": "/v1/title-data/financing?page=1",
      "last": "/v1/title-data/financing?page=3",
      "next": "/v1/title-data/financing?page=2",
      "prev": null
    }
  }
}`,
        interfaceDefinition: `${financingInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      },
      {
        title: 'Get Financing Transaction by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/financing/:id',
        description: [
          'Retrieves a single financing transaction by ID',
          'Returns full transaction details including all property IDs',
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
            description: 'Financing Transaction ID (must be exactly 18 characters in length)'
          }
        ],
        responseExample: `{
  "Id": "a12VH00000K9mX7AAB",
  "ActualCloseDate": null,
  "CloseDate": "2025-06-30",
  "Comments": "Multi-property refinancing transaction",
  "CurrentPartnership": "Amherst Capital Partners",
  "FundingAndDisbursementDate": null,
  "LastModifiedDate": "2025-05-27T18:14:30.000+0000",
  "Name": "Texas Portfolio Refinance 2025",
  "NewPartnership": "Amherst Capital Partners II",
  "OpenDate": "2025-01-15",
  "Properties": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD", "a13VH00000D2kP8AAE"],
  "PropertiesWithDocs": ["a13VH00000B7xQ2AAC", "a13VH00000C9mN5AAD"],
  "PropertiesWithRecentDocs": ["a13VH00000B7xQ2AAC"],
  "ReadyForClosingDate": null,
  "ReadyForFundingDate": null,
  "RecentlyAddedProperties": ["a13VH00000D2kP8AAE"],
  "RecentlyRemovedProperties": [],
  "Status": "In Progress",
  "Type": "Securitizations"
}`,
        interfaceDefinition: `${financingInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
      }
    ]
  },
  {
    id: 'financing-property',
    title: 'Financing Transaction Properties',
    description: 'Individual properties within financing transactions. Each property can have its own documents and detailed property information including valuation, acquisition details, and physical characteristics.',
    responseObject: `{
  "Id": "a13VH00000B7xQ2AAC", // string - Property ID
  "AccountingCost": 245000, // number | null - Cost for accounting purposes
  "AcquisitionDate": "2023-06-15", // string | null - ISO 8601 date format
  "Action": "Hold", // string | null - Current action status
  "AlternatePropertyId": "AMH-TX-001", // string | null - Alternative property identifier
  "Baths": 2.5, // number | null - Number of bathrooms
  "Beds": 3, // number | null - Number of bedrooms
  "FairValue": 275000, // number | null - Current fair market value
  "FinancingTransactionId": "a12VH00000K9mX7AAB", // string | null - Parent financing transaction ID
  "LastModifiedDate": "2025-05-27T18:14:30.000+0000", // string - ISO 8601 datetime format
  "MasterStatus": "Active", // string | null - Master status of the property
  "ParcelNumber": "12345-67890", // string | null - Tax parcel number
  "Property": { // Address - Property location
    "City": "Austin", // string | null
    "County": "Travis", // string | null
    "State": "TX", // string | null
    "Street": "123 Main Street", // string | null
    "Zip": "78746" // string | null
  },
  "PropertyOwnerName": "Amherst Residential LLC", // string | null - Current property owner
  "PurchasePrice": 230000, // number | null - Original purchase price
  "SquareFt": 1800 // number | null - Square footage
}

Interface definition:
\`\`\`typescript
import { Address } from './shared.interface'

export interface FinancingPropertyData {
  Id: string
  AccountingCost: number | null
  AcquisitionDate: string | null
  Action: string | null
  AlternatePropertyId: string | null
  Baths: number | null
  Beds: number | null
  FairValue: number | null
  FinancingTransactionId: string | null
  LastModifiedDate: string
  MasterStatus: string | null
  ParcelNumber: string | null
  Property: Address
  PropertyOwnerName: string | null
  PurchasePrice: number | null
  SquareFt: number | null
}
\`\`\`
`,
    endpoints: [
      {
        title: 'Get Financing Transaction Property by ID',
        method: 'GET',
        path: '{amherst-api-base}/v1/title-data/financing/:financingId/property/:propertyId',
        description: [
          'Retrieves detailed information for a specific property within a financing transaction',
          'Returns property details including valuation, physical characteristics, and ownership',
          'Property must be associated with the specified financing transaction'
        ],
        requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
        pathParams: [
          {
            name: 'financingId',
            type: 'string',
            required: true,
            description: 'Financing Transaction ID (must be exactly 18 characters in length)'
          },
          {
            name: 'propertyId',
            type: 'string',
            required: true,
            description: 'Property ID within the financing transaction'
          }
        ],
        responseExample: `{
  "Id": "a13VH00000B7xQ2AAC",
  "AccountingCost": 245000,
  "AcquisitionDate": "2023-06-15",
  "Action": "Hold",
  "AlternatePropertyId": "AMH-TX-001",
  "Baths": 2.5,
  "Beds": 3,
  "FairValue": 275000,
  "FinancingTransactionId": "a12VH00000K9mX7AAB",
  "LastModifiedDate": "2025-05-27T18:14:30.000+0000",
  "MasterStatus": "Active",
  "ParcelNumber": "12345-67890",
  "Property": {
    "City": "Austin",
    "County": "Travis",
    "State": "TX",
    "Street": "123 Main Street",
    "Zip": "78746"
  },
  "PropertyOwnerName": "Amherst Residential LLC",
  "PurchasePrice": 230000,
  "SquareFt": 1800
}`,
        interfaceDefinition: `${financingPropertyInterface}\n\n// Shared interfaces\n${sharedInterfaces}`
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
  'For document operations, use AcquisitionsDocumentType for cash-acquisitions, DispositionsDocumentType for retail-sales, and FinancingDocumentType for financing transactions and properties',
  'When creating a document with DocType "Other", the Notes field is required to specify what type of document it is',
  'Financing transactions support both transaction-level and property-level document management',
  'Properties within financing transactions can have individual documents separate from the transaction-level documents',
];

export const versionHistory = [
  {
    version: 'v1.5.1',
    date: '2025-07-21',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      '- Updated FinancingDocumentType to include PURCHASE_CONTRACT',
    ]
  },
  {
    version: 'v1.5.0',
    date: '2025-07-02',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
    },
    changes: [
      'New Features:',
      '- Added complete Financing Transactions module with transaction-level API endpoints',
      '- Added Financing Property module for property-level data within financing transactions',
      '- Added comprehensive financing document management for both transaction and property levels',
      'Document Management:',
      '- Updated Document Management section to support four contexts with tab interface',
      '- Added FinancingDocumentType enum with 24 document types for financing operations',
      '- Enhanced document type validation per transaction context',
      '- Added property-level document management for financing transactions',
      'API Enhancements:',
      '- New endpoint: GET /v1/title-data/financing - List financing transactions',
      '- New endpoint: GET /v1/title-data/financing/:id - Get financing transaction by ID',
      '- New endpoint: GET /v1/title-data/financing/:financingId/property/:propertyId - Get financing property',
      '- New endpoints: Complete document CRUD operations for financing transactions',
      '- New endpoints: Complete document CRUD operations for financing properties',
      'Interface Updates:',
      '- Added FinancingTitleData interface with transaction metadata and property arrays',
      '- Added FinancingPropertyData interface with detailed property information',
      '- Updated validation rules to include Notes requirement for DocType "Other"'
    ]
  },
  {
    version: 'v1.4.5',
    date: '2025-05-21',
    author: 'David Brown',
    environments: {
      qa: true,
      prod: true
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
      prod: true
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
      prod: true
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
      qa: true,
      prod: true
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
      qa: true,
      prod: true
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
      qa: true,
      prod: true
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