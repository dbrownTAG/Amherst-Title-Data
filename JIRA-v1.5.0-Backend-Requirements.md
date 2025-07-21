# JIRA Ticket: API v1.5.0 Backend Implementation Requirements

## **Ticket Summary**
Implement Backend API Endpoints for Financing Transactions and Properties (v1.5.0)

## **Ticket Type**
Epic / Story

## **Priority**
High

## **Components**
- API Development
- Database Schema
- Authentication/Authorization
- Documentation

## **Description**

The frontend documentation for API v1.5.0 has been updated to include new Financing Transactions and Financing Transaction Properties modules. The backend implementation is required to support these new endpoints and data structures.

## **Business Context**

Financing transactions represent complex real estate financing deals that contain multiple properties. These transactions require both transaction-level and property-level data management, including document handling. Transaction types include:
- JV Transactions
- Securitizations  
- OCRs (Operational Cost Reimbursements)
- Internal Transactions

## **Technical Requirements**

### **1. Financing Transactions Module**

#### **1.1 List Financing Transactions Endpoint**
- **Method**: GET
- **Path**: `/v1/title-data/financing`
- **Description**: Retrieves all financing transactions for authorized client
- **Authentication**: Bearer token required
- **Authorization**: Client must have access to financing transaction data
- **Pagination**: 
  - Default: 100 items per page
  - Max: 2000 items per page
  - Query params: `page` (default: 1), `pageSize` (default: 100)
- **Response Format**: Standard paginated response with `data` array and `pagination` object

#### **1.2 Get Financing Transaction by ID Endpoint**
- **Method**: GET
- **Path**: `/v1/title-data/financing/:id`
- **Description**: Retrieves a single financing transaction by ID
- **Authentication**: Bearer token required
- **Authorization**: Client must have access to specific financing transaction
- **Path Parameters**: 
  - `id` (string, required): Financing Transaction ID (exactly 18 characters)
- **Response Format**: Single FinancingTitleData object

#### **1.3 FinancingTitleData Interface Requirements**
```typescript
interface FinancingTitleData {
  Id: string                            // Primary key, 18 character Salesforce ID
  ActualCloseDate: string | null        // ISO 8601 date format
  CloseDate: string | null              // ISO 8601 date format
  Comments: string | null               // Free text comments
  CurrentPartnership: string | null     // Current partnership name
  FundingAndDisbursementDate: string | null // ISO 8601 date format
  LastModifiedDate: string              // ISO 8601 datetime format
  Name: string | null                   // Transaction name
  NewPartnership: string | null         // New partnership name
  OpenDate: string | null               // ISO 8601 date format
  Properties: string[]                  // Array of Property record IDs
  PropertiesWithDocs: string[]          // Property IDs that have title documents
  PropertiesWithRecentDocs: string[]    // Property IDs with documents created in last 12 hours
  ReadyForClosingDate: string | null    // ISO 8601 date format
  ReadyForFundingDate: string | null    // ISO 8601 date format
  RecentlyAddedProperties: string[]     // Property IDs added in last 12 hours
  RecentlyRemovedProperties: string[]   // Property IDs removed in last 12 hours
  Status: string                        // "Open", "In Progress", or "Funded"
  Type: string | null                   // "JV Transaction", "Securitization", "OCRs", "Internal Transaction"
}
```

### **2. Financing Transaction Properties Module**

#### **2.1 Get Financing Transaction Property by ID Endpoint**
- **Method**: GET
- **Path**: `/v1/title-data/financing/:financingId/property/:propertyId`
- **Description**: Retrieves detailed information for a specific property within a financing transaction
- **Authentication**: Bearer token required
- **Authorization**: Client must have access to financing transaction and property
- **Path Parameters**:
  - `financingId` (string, required): Financing Transaction ID (exactly 18 characters)
  - `propertyId` (string, required): Property ID within the financing transaction
- **Validation**: Property must be associated with the specified financing transaction
- **Response Format**: Single FinancingPropertyData object

#### **2.2 FinancingPropertyData Interface Requirements**
```typescript
interface FinancingPropertyData {
  Id: string                            // Primary key, Property ID
  AccountingCost: number | null         // Cost for accounting purposes
  AcquisitionDate: string | null        // ISO 8601 date format
  Action: string | null                 // Current action status
  AlternatePropertyId: string | null    // Alternative property identifier
  Baths: number | null                  // Number of bathrooms
  Beds: number | null                   // Number of bedrooms
  FairValue: number | null              // Current fair market value
  FinancingTransactionId: string | null // Parent financing transaction ID
  LastModifiedDate: string              // ISO 8601 datetime format
  MasterStatus: string | null           // Master status of the property
  ParcelNumber: string | null           // Tax parcel number
  Property: Address                     // Property location (Address interface)
  PropertyOwnerName: string | null      // Current property owner
  PurchasePrice: number | null          // Original purchase price
  SquareFt: number | null               // Square footage
}
```

### **3. Document Management Extensions**

#### **3.1 Financing Transaction Document Endpoints**
The following document management endpoints must be implemented for financing transactions:

- **POST** `/v1/title-data/financing/:entityId/documents` - Create document metadata
- **GET** `/v1/title-data/financing/:entityId/documents/:documentId/upload-url` - Get signed upload URL
- **PATCH** `/v1/title-data/financing/:entityId/documents/:documentId` - Update document metadata
- **GET** `/v1/title-data/financing/:entityId/documents` - List all documents for transaction
- **GET** `/v1/title-data/financing/:entityId/documents/:documentId` - Get document by ID
- **GET** `/v1/title-data/financing/:entityId/amherst-documents` - Get Amherst-uploaded documents

#### **3.2 Financing Property Document Endpoints**
The following document management endpoints must be implemented for financing properties:

- **POST** `/v1/title-data/financing/:financingId/property/:propertyId/documents` - Create document metadata
- **GET** `/v1/title-data/financing/:financingId/property/:propertyId/documents/:documentId/upload-url` - Get signed upload URL
- **PATCH** `/v1/title-data/financing/:financingId/property/:propertyId/documents/:documentId` - Update document metadata
- **GET** `/v1/title-data/financing/:financingId/property/:propertyId/documents` - List all documents for property
- **GET** `/v1/title-data/financing/:financingId/property/:propertyId/documents/:documentId` - Get document by ID
- **GET** `/v1/title-data/financing/:financingId/property/:propertyId/amherst-documents` - Get Amherst-uploaded documents

#### **3.3 FinancingDocumentType Enum**
Must support 24 document types:
- BUYER_SIGNING_DOCS, CCR, COMPILED_MORTGAGES, COMPILED_RELEASES, CONFIRMATION_OF_NO_HOA
- EMD_RECEIPT, EXECUTED_DEED, FINAL_CONTRACT_AND_AMENDMENTS, FINAL_HUD, FIRPTA
- HOA_CERT, HOA_CONFIRMATION, MLC, NON_FOREIGN_CERT, OTHER
- PAYOFF, PLAT_MAP, RECORDED_DEED, SCHEDULE_B, SELLER_EDOCS
- SELLER_HUD, SELLER_WET_DOCS, TAX_CERT, TITLE_COMMITMENT, TITLE_POLICY
- UNEXECUTED_DEED, WIRE_CONFIRMATION

### **4. Database Schema Requirements**

#### **4.1 Financing Transaction Table**
- Primary key: Id (18 character string)
- All fields from FinancingTitleData interface
- Proper indexing on Id, Status, Type, LastModifiedDate
- Foreign key relationships to Property records

#### **4.2 Property Table Extensions**
- Add fields from FinancingPropertyData interface
- Relationship to financing transactions
- Proper indexing on FinancingTransactionId

#### **4.3 Document Management Tables**
- Extend existing document tables to support financing contexts
- Add FinancingDocumentType enum values
- Support both transaction-level and property-level document association

### **5. Security and Authorization**

#### **5.1 Token-Based Access Control**
- Access controlled by claims in Bearer token
- Clients only see data for entities they are authorized to view
- Document operations restricted to authorized title companies
- Must validate 18-character ID format for all ID parameters

#### **5.2 Business Rules**
- Property must belong to specified financing transaction for property endpoints
- Document Notes field required when DocType is "Other"
- Signed URLs for document uploads expire after 15 minutes
- Document uploads must use signed URL from upload-url endpoint

### **6. Response Format Standards**

#### **6.1 Success Responses**
- **200 OK**: Standard success response
- All dates/datetimes in ISO 8601 format
- Monetary values as numbers with 2 decimal places
- Arrays properly formatted (not comma-separated strings)

#### **6.2 Error Responses**
- **400 Bad Request**: Invalid parameters
- **401 Unauthorized**: Invalid or missing token
- **403 Forbidden**: Token lacks required permissions
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side issues

#### **6.3 Pagination Format**
```json
{
  "data": [...],
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
}
```

## **Acceptance Criteria**

### **Must Have**
- [ ] All 3 financing transaction endpoints implemented and functional
- [ ] All 12 financing document management endpoints implemented
- [ ] FinancingTitleData and FinancingPropertyData interfaces fully supported
- [ ] Token-based authorization working correctly
- [ ] Pagination implemented for list endpoints
- [ ] All error responses properly formatted
- [ ] Database schema updated with proper indexing

### **Should Have**
- [ ] Performance optimized for large datasets
- [ ] Comprehensive error handling and logging
- [ ] API documentation updated
- [ ] Integration tests implemented

### **Could Have**
- [ ] Caching implemented for frequently accessed data
- [ ] Rate limiting implemented
- [ ] Monitoring and alerting configured

## **Technical Dependencies**

- Database schema changes must be deployed first
- Authentication/authorization service updates
- Document storage service integration
- Signed URL generation service

## **Testing Requirements**

- Unit tests for all new endpoints
- Integration tests for document management workflows
- Performance tests for large property datasets
- Security tests for authorization scenarios

## **Documentation Updates**

- API documentation must be updated to match frontend specification
- Database schema documentation
- Deployment and configuration documentation

## **Deployment Considerations**

- Database migrations must be backwards compatible
- Feature flags for gradual rollout
- Monitoring for performance impact
- Rollback plan in case of issues

## **Definition of Done**

- All endpoints implemented and tested
- Documentation updated
- Security review completed
- Performance benchmarks met
- Deployed to QA environment
- Frontend integration testing completed
- Stakeholder approval received

## **Estimated Effort**

- **Development**: 3-4 weeks
- **Testing**: 1-2 weeks  
- **Documentation**: 1 week
- **Deployment**: 1 week

**Total Estimated Duration**: 6-8 weeks

## **Contact Information**

- **Product Owner**: [Insert Name]
- **Tech Lead**: [Insert Name]
- **Frontend Developer**: David Brown
- **QA Lead**: [Insert Name]