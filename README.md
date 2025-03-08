## Amherst Title Data API v2.0.0

### Table of Contents
- [Version History](#version-history)
- [Common Response Structures](#common-response-structures)
  - [Address Object](#address-object)
  - [Name Object](#name-object)
  - [Pagination Structure](#pagination-structure)
- [Authentication](#authentication)
  - [Base URLs](#base-urls)
  - [Obtaining an Access Token](#obtaining-an-access-token)
  - [Using the Token](#using-the-token)
- [Cash Acquisitions](#cash-acquisitions)
  - [Response Object](#response-object)
  - [List Cash Acquisitions](#list-cash-acquisitions)
  - [Get Cash Acquisition by ID](#get-cash-acquisition-by-id)
  - [Update Cash Acquisition](#update-cash-acquisition)
- [Retail Sales](#retail-sales)
  - [Response Object](#response-object-1)
  - [List Retail Sales](#list-retail-sales)
  - [Get Retail Sale by ID](#get-retail-sale-by-id)
  - [Update Retail Sale](#update-retail-sale)
- [Bulk Portfolio](#bulk-portfolio)
  - [List Portfolio Properties](#list-portfolio-properties)
- [Notes](#notes)
- [Response Codes](#response-codes)

---

### Version History

#### v2.0.0 (2025-02-27): David Brown

- Added base URLs for QA and prod
- Cash Acquisitions:
  - Updated data response for [List Cash Acquisitions](#list-cash-acquisitions)
    - Removed Realtor field
    - Added BuyerAgent field
    - Added SellerAgent field
    - Added ReadyToClose and ReadyToFund fields
    - Parsed address fields into [Address Object](#address-object) and Name fields into [Name Object](#name-object)
  - New GET endpoint [Get Cash Acquisition by ID](#get-cash-acquisition-by-id) to retrieve transaction by Id
  - New PATCH endpoint [Update Cash Acquisition](#update-cash-acquisition) to update ReadyToClose and ReadyToFund
- Retail Sales:
  - Updated data response for [List Retail Sales](#list-retail-sales)
    - Renamed LossAmount to LoanAmount
    - Added Lender field
    - Added ReadyToClose and ReadyToFund fields
    - Parsed address fields into [Address Object](#address-object) and Name fields into [Name Object](#name-object)
  - New GET endpoint [Get Retail Sale by ID](#get-retail-sale-by-id) to retrieve transaction by Id
  - New PATCH endpoint [Update Retail Sale](#update-retail-sale) to update ReadyToClose and ReadyToFund
- Portfolio:
  - Added endpoint [List Portfolio Properties](#list-portfolio-properties) to retrieve portfolio transactions

#### v1.0.2 (2025-01-30): David Brown

- [Pagination](#pagination-structure) implementation

#### v1.0.1 (2025-01-29): David Brown

- Updates to [List Retail Sales](#list-retail-sales) [List Cash Acquisitions](#list-cash-acquisitions) endpoint descriptions

#### v1.0.0 (2025-01-23): David Brown

- Initial spec with [List Cash Acquisitions](#list-cash-acquisitions) and [List Retail Sales](#list-retail-sales) endpoints

---

### Common Response Structures

#### Address Object
```json
{
  "Street": "123 Main Street",
  "City": "Austin",
  "State": "TX",
  "Zip": "78746",
  "County": "Travis"  
}
```

#### Name Object
```json
{
  "FirstName": "John",
  "MiddleName": null,  // Optional
  "LastName": "Smith"
}
```

#### Pagination Structure
```json
{
  "currentPage": 1,
  "totalPages": 5,
  "totalItems": 487,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "links": {
    "self": "/v1/title-data/{endpoint}?page=1",
    "first": "/v1/title-data/{endpoint}?page=1",
    "last": "/v1/title-data/{endpoint}?page=5",
    "next": "/v1/title-data/{endpoint}?page=2",
    "prev": null
  }
}
```
---
### Authentication

#### Base URLs
- QA: https://qa.amhev.com/api
- PROD: https://prod.amherstapi.com/api

#### Obtaining an Access Token

The API uses OAuth 2.0 client credentials flow for authentication. You must obtain an access token before accessing any endpoints.

**Token Endpoint:** `POST {amherst-api-base}/auth/token`

**Request Headers:**
```json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic {base64(client_id:client_secret)}
```

**Request Body:**
```
grant_type=client_credentials
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_at": "2024-03-15T14:30:00.000Z",
  "token_type": "Bearer"
}
```

#### Using the Token

Include the token in all API requests:
```
Authorization: Bearer {access_token}
```

---
**Important Notes:**
- Tokens expire after the duration specified in `expires_at` (unix time)
- Your application should implement token refresh before expiration
- Client credentials will be provided separately

---
### Cash Acquisitions

#### Response Object
```json
{
  "Id": "a13VH00000HjjopYAB",
  "AlternatePropertyId": "10003399",
  "Property": {
    // Address object
  },
  "BuyerAddress": {
    // Address object
  },
  "BuyerAgent": "Main Street Renewal",
  "BuyerName": "ARMM Asset Company 2 LLC",
  "ClosingDate": "2024-12-30",
  "LastModifiedDateTime": "2024-12-10T21:21:45.000+0000",
  "ReadyToClose": false,  
  "ReadyToFund": false,    
  "SalesPrice": 179900,
  "SellerAddress": {
    // Address object
  },
  "SellerAgent": {
    // Name object
  },
  "SellerNames": [
    // Name object array
  ],
  "Status": "Open",
  "TentativeDate": "2024-12-30"
}
```
---
#### List Cash Acquisitions
**GET** `{amherst-api-base}/v1/title-data/cash-acquisitions`

**Description:**
- Retrieves all cash acquisition transactions for authorized client
- Returns Open and On-Hold transactions
- Includes Closed/Cancelled transactions from last 24 hours
- Recommended polling frequency: 1 hour
- Results paginated (100 items per page)

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Query Parameters:**
| Parameter | Type    | Required | Description              |
| --------- | ------- | -------- | ------------------------ |
| page      | integer | No       | Page number (default: 1) |

**Response:**
```json
{
  "data": [
    // Cash Acquisitions Response Object
  ],
  "pagination": {
    // Pagination Structure
  }
}
```

---
#### Get Cash Acquisition by ID
**GET** `{amherst-api-base}/v1/title-data/cash-acquisitions/:id`

**Description:**
- Retrieves a single cash acquisition transaction by ID
- Returns full transaction details regardless of status
- No pagination (single record response)

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | string | Yes      | Transaction ID     |

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Response:**
```json
{
  "data": {
    // Cash Acquisitions Response Object
  }
}
```

---

#### Update Cash Acquisition
**PATCH** `{amherst-api-base}/v1/title-data/cash-acquisitions/:id`

**Description:**
- Updates ready status flags for a cash acquisition transaction
- At least one status flag must be included in request
- Returns updated transaction details

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | string | Yes      | Transaction ID     |

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "ReadyToClose": true,  // Optional
  "ReadyToFund": true    // Optional
}
```

**Validation Rules:**
- At least one of ReadyToClose or ReadyToFund must be provided
- Both fields must be boolean values when provided

**Example Response:**
```json
{
  "data": {
    //Cash Acquisitions Response Object
  }
}
```

---
### Retail Sales

#### Response Object
```json
{
  "Id": "a204u000003NnmcAAC",
  "AlternatePropertyId": "p2061794",
  "Property": {
    // Address object
  },
  "BuyerAddress": {
    // Address object
  },
  "BuyerAgent": {
    "FirstName": "Eddie",
    "MiddleName": null,
    "LastName": "Tomlinson"
  },
  "BuyerName": {
    // Name object
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
    // Address object
  },
  "SellerAgent": "Hunter Fendley (TX)",
  "SellerName": "Mesa Verde Assets, LLC",
  "Status": "Open",
  "TentativeDate": ""
}
```
---
#### List Retail Sales
**GET** `{amherst-api-base}/v1/title-data/retail-sales`

**Description:**
- Retrieves all retail sales transactions for authorized client
- Returns Open transactions
- Includes Cancelled transactions from last 24 hours
- Recommended polling frequency: 1 hour
- Results paginated (100 items per page)

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Query Parameters:**

| Parameter | Type    | Required | Description              |
|-----------|---------|----------|--------------------------|
| page      | integer | No       | Page number (default: 1) |

**Response:**
```json
{
  "data": [
    // Retail Sales Response Object
  ],
  "pagination": {
    // Pagination Structure
  }
}
```

---
#### Get Retail Sale by ID
**GET** `{amherst-api-base}/v1/title-data/retail-sales/:id`

**Description:**
- Retrieves a single retail sale transaction by ID
- Returns full transaction details regardless of status
- No pagination (single record response)

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | string | Yes      | Transaction ID     |

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Response:**
```json
{
  "data": {
    // Retail Sales Response Object
  }
}
```

---
#### Update Retail Sale
**PATCH** `{amherst-api-base}/v1/title-data/retail-sales/:id`

**Description:**
- Updates ready status flags for a retail sale transaction
- At least one status flag must be included in request
- Returns updated transaction details

**Path Parameters:**
| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| id        | string | Yes      | Transaction ID     |

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "ReadyToClose": true,  // Optional
  "ReadyToFund": true    // Optional
}
```

**Validation Rules:**
- At least one of ReadyToClose or ReadyToFund must be provided
- Both fields must be boolean values when provided

**Response:**
```json
{
  "data": {
    // Retail Sales Response Object
  }
}
```

---

### Bulk Portfolio

#### List Portfolio Properties
**GET** `{amherst-api-base}/v1/title-data/bulk-portfolio`

**Description:**
- Retrieves all open portfolio property details for authorized client
- Retrieves portfolio property details with HOA information
- Includes property details and associated HOA information
- Recommended polling frequency: 1 hour
- Results paginated (100 items per page)

**Request Headers:**
```json
Authorization: Bearer {access_token}
Content-Type: application/json
Accept: application/json
```

**Query Parameters:**
| Parameter | Type    | Required | Description              |
|-----------|---------|----------|--------------------------|
| page      | integer | No       | Page number (default: 1) |

---
**Response:**
```json
{
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
        // Address object
      },
      "SellerName": "Amherst Entity, LLC",
      "TitleCompany": "First American Title",
      "TransactionName": "Portfolio Sale 2024-Q1",
      "Type": "Bulk Sale"
    }
  ],
  "pagination": {
    // Pagination Structure
  }
}
```

---

#### Notes

- All dates / datetimes should be returned in ISO 8601 format
- Monetary values should be returned as numbers with 2 decimal places
- Id serves as a unique identifier for updating records (PATCH routes)
- Results are paginated with 100 items per page
- Use the pagination links provided in the response to navigate through the results


#### Response Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Token lacks required permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |
