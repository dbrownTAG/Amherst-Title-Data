import React, { useState } from 'react';
import { Typography, Paper, Box, Tabs, Tab } from '@mui/material';
import { DocumentContext, ApiEndpoint } from '../../data/apiData';
import EndpointDetails from './EndpointDetails';

interface DocumentManagementProps {
  contexts: DocumentContext[];
  sectionId: string;
  selectedEndpoint?: string;
}

// Base document endpoints that will be adapted for each context
const baseDocumentEndpoints: ApiEndpoint[] = [
  {
    title: 'Create Document',
    method: 'POST',
    path: '', // Will be set per context
    description: [
      'Creates a new document metadata entry for a transaction',
      'Document upload must be completed separately using the upload URL endpoint',
      'If a pending document of the same DocType already exists (not yet uploaded/confirmed), you must reuse that record; the API prevents creating duplicates',
      'Returns the complete document metadata'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
    pathParams: [], // Will be set per context
    requestBody: `{
  "DocType": "Title_Commitment",
  "Name": "Title_Commitment.pdf",
  "OrderedDate": "2024-05-15T14:30:00.000Z"
}`,
    validationRules: [
      'DocType must be a valid DocumentType value',
      'Name must be a valid filename with appropriate extension',
      'OrderedDate, if provided, must be a valid ISO 8601 timestamp',
      'Notes is required when DocType is "Other"',
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
    interfaceDefinition: ''
  },
  {
    title: 'Get Upload URL',
    method: 'GET',
    path: '', // Will be set per context
    description: [
      'Generates a signed URL for uploading a document to cloud storage',
      'URL will expire after 15 minutes',
      'Use the document Id returned from Create Document (or from List/Get) as :documentId'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
    pathParams: [], // Will be set per context
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
    path: '', // Will be set per context
    description: [
      'Updates metadata for an existing document associated with a transaction',
      'Use ConfirmUpload to finalize the upload after successfully PUTing the file to the signed URL; this step is required to complete the upload process',
      'Can also be used to update Notes, Name, or OrderedDate',
      'Returns the updated document metadata'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json`,
    pathParams: [], // Will be set per context
    requestBody: `{
  "ConfirmUpload": true,
  "Notes": "Updated document notes",
  "Name": "Updated_Title_Commitment.pdf",
  "OrderedDate": "2024-05-15T14:30:00.000Z"
}`,
    validationRules: [
      'At least one of ConfirmUpload, Notes, Name, or OrderedDate must be provided',
      'Name, if provided, must be a valid filename with appropriate extension',
      'OrderedDate, if provided, must be a valid ISO 8601 timestamp',
      'Notes, if provided, must be a string',
      'Set ConfirmUpload to true after the file upload succeeds to mark the document as uploaded; this is required to finalize the upload',
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
    interfaceDefinition: ''
  },
  {
    title: 'List Documents',
    method: 'GET',
    path: '', // Will be set per context
    description: [
      'Retrieves all documents associated with a transaction',
      'Returns an array of document metadata objects',
      'No pagination (returns all documents for the transaction)',
      'Use to locate an existing pending document (UploadedDate is null) of the same DocType to avoid creating duplicates'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
    pathParams: [], // Will be set per context
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
    interfaceDefinition: ''
  },
  {
    title: 'Get Document by ID',
    method: 'GET',
    path: '', // Will be set per context
    description: [
      'Retrieves metadata for a specific document associated with a transaction',
      'Returns a single document metadata object'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
    pathParams: [], // Will be set per context
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
    interfaceDefinition: ''
  },
  {
    title: 'Get Amherst Documents',
    method: 'GET',
    path: '', // Will be set per context
    description: [
      'Retrieves all Amherst-uploaded documents associated with a transaction',
      'Returns documents with signed URLs for direct download',
      'Only returns documents of AmherstDocumentType that have been uploaded',
      'Signed URLs expire after 15 minutes'
    ],
    requestHeaders: `Authorization: Bearer {access_token}
Accept: application/json`,
    pathParams: [], // Will be set per context
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
}`
  }
];

// Function to contextualize endpoints based on selected context
const getContextualizedEndpoints = (context: DocumentContext): ApiEndpoint[] => {
  return baseDocumentEndpoints.map(endpoint => {
    const contextualizedEndpoint = { ...endpoint };
    
    // Update path based on context
    switch (context.id) {
      case 'cash-acquisitions':
        if (endpoint.title === 'Get Amherst Documents') {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/cash-acquisitions/:id/amherst-documents`;
        } else {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/cash-acquisitions/:id/documents${getEndpointSuffix(endpoint)}`;
        }
        contextualizedEndpoint.pathParams = getCashAcquisitionsParams(endpoint);
        contextualizedEndpoint.validationRules = updateValidationRules(endpoint.validationRules || [], 'AcquisitionsDocumentType');
        break;
      case 'retail-sales':
        if (endpoint.title === 'Get Amherst Documents') {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/retail-sales/:id/amherst-documents`;
        } else {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/retail-sales/:id/documents${getEndpointSuffix(endpoint)}`;
        }
        contextualizedEndpoint.pathParams = getRetailSalesParams(endpoint);
        contextualizedEndpoint.validationRules = updateValidationRules(endpoint.validationRules || [], 'DispositionsDocumentType');
        break;
      case 'financing':
        if (endpoint.title === 'Get Amherst Documents') {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/financing/:entityId/amherst-documents`;
        } else {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/financing/:entityId/documents${getEndpointSuffix(endpoint)}`;
        }
        contextualizedEndpoint.pathParams = getFinancingParams(endpoint);
        contextualizedEndpoint.validationRules = updateValidationRules(endpoint.validationRules || [], 'FinancingDocumentType');
        break;
      case 'financing-property':
        if (endpoint.title === 'Get Amherst Documents') {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/financing/:financingId/property/:propertyId/amherst-documents`;
        } else {
          contextualizedEndpoint.path = `{amherst-api-base}/v1/title-data/financing/:financingId/property/:propertyId/documents${getEndpointSuffix(endpoint)}`;
        }
        contextualizedEndpoint.pathParams = getFinancingPropertyParams(endpoint);
        contextualizedEndpoint.validationRules = updateValidationRules(endpoint.validationRules || [], 'FinancingDocumentType');
        if (contextualizedEndpoint.validationRules) {
          contextualizedEndpoint.validationRules.push('Property must belong to the specified financing transaction');
        }
        break;
    }

    // Update interface definition
    contextualizedEndpoint.interfaceDefinition = getContextualizedInterface(context.id);
    
    return contextualizedEndpoint;
  });
};

// Helper functions
const getEndpointSuffix = (endpoint: ApiEndpoint): string => {
  if (endpoint.title === 'Get Upload URL') return '/:documentId/upload-url';
  if (endpoint.title === 'Update Document' || endpoint.title === 'Get Document by ID') return '/:documentId';
  if (endpoint.title === 'Get Amherst Documents') return '';
  if (endpoint.title === 'List Documents') return '';
  return '';
};

const getCashAcquisitionsParams = (endpoint: ApiEndpoint) => {
  const baseParams = [{ name: 'id', type: 'string', required: true, description: 'Cash Acquisition Transaction ID (must be exactly 18 characters in length)' }];
  if (endpoint.title === 'Get Upload URL' || endpoint.title === 'Update Document' || endpoint.title === 'Get Document by ID') {
    baseParams.push({ name: 'documentId', type: 'string', required: true, description: 'Document ID (must be exactly 18 characters in length)' });
  }
  return baseParams;
};

const getRetailSalesParams = (endpoint: ApiEndpoint) => {
  const baseParams = [{ name: 'id', type: 'string', required: true, description: 'Retail Sales Transaction ID (must be exactly 18 characters in length)' }];
  if (endpoint.title === 'Get Upload URL' || endpoint.title === 'Update Document' || endpoint.title === 'Get Document by ID') {
    baseParams.push({ name: 'documentId', type: 'string', required: true, description: 'Document ID (must be exactly 18 characters in length)' });
  }
  return baseParams;
};

const getFinancingParams = (endpoint: ApiEndpoint) => {
  const baseParams = [{ name: 'entityId', type: 'string', required: true, description: 'Financing Transaction ID (must be exactly 18 characters in length)' }];
  if (endpoint.title === 'Get Upload URL' || endpoint.title === 'Update Document' || endpoint.title === 'Get Document by ID') {
    baseParams.push({ name: 'documentId', type: 'string', required: true, description: 'Document ID (must be exactly 18 characters in length)' });
  }
  return baseParams;
};

const getFinancingPropertyParams = (endpoint: ApiEndpoint) => {
  const baseParams = [
    { name: 'financingId', type: 'string', required: true, description: 'Financing Transaction ID (must be exactly 18 characters in length)' },
    { name: 'propertyId', type: 'string', required: true, description: 'Property ID within the financing transaction' }
  ];
  if (endpoint.title === 'Get Upload URL' || endpoint.title === 'Update Document' || endpoint.title === 'Get Document by ID') {
    baseParams.push({ name: 'documentId', type: 'string', required: true, description: 'Document ID (must be exactly 18 characters in length)' });
  }
  return baseParams;
};

const updateValidationRules = (rules: string[], documentType: string): string[] => {
  return rules.map(rule => 
    rule.includes('DocType must be a valid DocumentType value') 
      ? `DocType must be a valid ${documentType} value`
      : rule
  );
};

const getContextualizedInterface = (contextId: string): string => {
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
  COMMISSION_INSTRUCTIONS = 'Commission_Instructions',
  COMPILED_MORTGAGES = 'Compiled_Mortgages',
  COMPILED_RELEASES = 'Compiled_Releases',
  EMD_RECEIPT = 'EMD_Receipt',
  FINAL_CONTRACT_AND_AMENDMENTS = 'Final_Contract_and_Amendments',
  FINAL_HUD = 'Final_HUD',
  HOA_CERT = 'HOA_Cert',
  MLC = 'MLC',
  OTHER = 'Other',
  PAYOFF = 'Payoff',
  SELLER_EDOCS = 'Seller_Edocs',
  SELLER_HUD = 'Seller_HUD',
  SELLER_WET_DOCS = 'Seller_Wet_Docs',
  TAX_CERT = 'Tax_Cert',
  TITLE_COMMITMENT = 'Title_Commitment',
  WIRE_CONFIRMATION = 'Wire_Confirmation',
}

export enum AmherstDocumentType {
  AMENDMENTS_TO_CONTRACT = 'Amendments_to_Contract',
  AMHERST_WIRING_INSTRUCTIONS = 'Amherst_Wiring_Instructions',
  ASSIGNMENT_OF_LEASE = 'Assignment_of_Lease',
  COMMISSION_INSTRUCTIONS = 'Commission_Instructions',
  EXECUTED_ADDTL_SIGNED_CLOSING_DOCS = 'Executed_Addtl_Signed_Closing_Docs',
  EXECUTED_CLOSING_PACKAGE = 'Executed_Closing_Package',
  EXECUTED_FIRPTA = 'Executed_FIRPTA',
  EXECUTED_WET_CLOSING_DOCS = 'Executed_Wet_Closing_Docs',
  FIRPTA = 'FIRPTA',
  INVOICE = 'Invoice',
  LEASE = 'Lease',
  LEASE_BACK = 'Leaseback',
  OPERATING_WIRING_INSTRUCTIONS = 'Operating_Wiring_Instructions',
  PURCHASE_CONTRACT = 'Purchase_Contract',
  TERMINATION_AGREEMENT = 'Termination_Agreement',
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

  return `${documentInterfaces}\n\n// Shared interfaces\n${sharedInterfaces}`;
};

const DocumentManagement: React.FC<DocumentManagementProps> = ({ contexts, sectionId, selectedEndpoint }) => {
  // Use localStorage to persist context selection across navigation
  const [selectedContext, setSelectedContext] = useState(() => {
    const saved = localStorage.getItem('documentManagementContext');
    return saved ? parseInt(saved, 10) : 0;
  });

  const handleContextChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedContext(newValue);
    localStorage.setItem('documentManagementContext', newValue.toString());
  };

  const currentContext = contexts[selectedContext];

  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#00487a' }}>
          Document Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          The following endpoints allow for document management across all transaction types. 
          Document operations are restricted to title companies specified in the allowedCompanies 
          list in the token metadata. Use the tabs below to switch between different document 
          contexts and their respective endpoint patterns.
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          How to upload a file
        </Typography>
        <Box component="ol" sx={{ pl: 3, mb: 3 }}>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Typography variant="body2">
              Create or reuse document metadata. First, list existing documents with <strong>GET /documents</strong> (or retrieve a specific one with <strong>GET /documents/:documentId</strong>) to check for a pending document of the same <code>DocType</code> (<code>UploadedDate</code> is null). If one exists, reuse its <code>Id</code>. Otherwise, call <strong>POST /documents</strong> with <code>DocType</code> (and optional <code>Name</code>, <code>OrderedDate</code>, <code>Notes</code>). The API prevents creating a duplicate pending document of the same <code>DocType</code>.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Typography variant="body2">
              Request a signed upload URL with <strong>GET /documents/:documentId/upload-url</strong> using the <code>Id</code> from step 1. The returned <code>SignedURL</code> expires in 15 minutes.
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Typography variant="body2">
              Upload the file bytes to the <code>SignedURL</code> via HTTP <strong>PUT</strong>. Include appropriate headers such as <code>Content-Type</code> and <code>Content-Length</code>. Do not send API authorization headers to the SignedURL host.
            </Typography>
          </Box>
          <Box component="li">
            <Typography variant="body2">
              Finalize the upload by calling <strong>PATCH /documents/:documentId</strong> with body <code>{'{"ConfirmUpload": true}'}</code>. This confirmation is required; without it, the document remains pending.
            </Typography>
          </Box>
        </Box>

        <Tabs
          value={selectedContext}
          onChange={handleContextChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#4a5568',
              '&.Mui-selected': {
                color: '#00487a',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#00487a',
            },
          }}
        >
          {contexts.map((context, index) => (
            <Tab key={context.id} label={context.title} />
          ))}
        </Tabs>
      </Paper>



      {/* Show the selected endpoint with context-specific adaptations */}
      {(() => {
        const allEndpoints = getContextualizedEndpoints(currentContext);
        
        // If we have a selected endpoint, find and show only that one
        if (selectedEndpoint) {
          const targetEndpoint = allEndpoints.find(ep => 
            ep.title.toLowerCase().replace(/\s+/g, '-') === selectedEndpoint
          );
          
          if (targetEndpoint) {
            return (
              <EndpointDetails 
                key={`${currentContext.id}-${targetEndpoint.title}`}
                endpoint={targetEndpoint} 
                sectionId={sectionId}
                contextId={currentContext.id}
              />
            );
          }
        }
        
        // Default to showing the first endpoint if no match found
        const firstEndpoint = allEndpoints[0];
        return firstEndpoint ? (
          <EndpointDetails 
            key={`${currentContext.id}-${firstEndpoint.title}`}
            endpoint={firstEndpoint} 
            sectionId={sectionId}
            contextId={currentContext.id}
          />
        ) : null;
      })()}
    </Box>
  );
};

export default DocumentManagement;