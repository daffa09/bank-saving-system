# API Documentation - Bank Saving System

## Base URL
```
http://localhost:5000
```

## Response Format

All API responses follow this standard format:

**Success Response:**
```json
{
  "data": { ... },
  "success": true
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## API Endpoints

### Health Check

#### GET /health

Check if the API server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Bank Saving System API is running"
}
```

---

## Customers

### GET /customers

Get all customers.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe"
  },
  {
    "id": 2,
    "name": "Jane Smith"
  }
]
```

---

### POST /customers

Create a new customer.

**Request Body:**
```json
{
  "name": "John Doe"
}
```

**Validation:**
- `name` (required): String, must not be empty

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "John Doe"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Missing required fields: name"
}
```

---

### PUT /customers/:id

Update an existing customer.

**URL Parameters:**
- `id`: Customer ID (integer)

**Request Body:**
```json
{
  "name": "John Updated"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Updated"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Customer not found"
}
```

---

### DELETE /customers/:id

Delete a customer.

**URL Parameters:**
- `id`: Customer ID (integer)

**Response:** `200 OK`
```json
{
  "message": "Customer deleted"
}
```

**Error Response:** `404 Not Found`
```json
{
  "message": "Customer not found"
}
```

---

## Deposito Types

### GET /deposito-types

Get all deposito types.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Bronze",
    "yearly_return": "3.00"
  },
  {
    "id": 2,
    "name": "Silver",
    "yearly_return": "5.00"
  }
]
```

---

### POST /deposito-types

Create a new deposito type.

**Request Body:**
```json
{
  "name": "Gold",
  "yearly_return": 7.5
}
```

**Validation:**
- `name` (required): String
- `yearly_return` (required): Number, must be positive

**Response:** `201 Created`
```json
{
  "id": 3,
  "name": "Gold",
  "yearly_return": "7.50"
}
```

---

### PUT /deposito-types/:id

Update a deposito type.

**URL Parameters:**
- `id`: Deposito type ID (integer)

**Request Body:**
```json
{
  "name": "Gold Premium",
  "yearly_return": 8.0
}
```

**Response:** `200 OK`
```json
{
  "id": 3,
  "name": "Gold Premium",
  "yearly_return": "8.00"
}
```

---

### DELETE /deposito-types/:id

Delete a deposito type.

**URL Parameters:**
- `id`: Deposito type ID (integer)

**Response:** `200 OK`
```json
{
  "message": "Deposito type deleted"
}
```

---

## Accounts

### GET /accounts

Get all accounts with joined customer and deposito type information.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "packet": "Regular",
    "customer_id": 1,
    "customer_name": "John Doe",
    "deposito_type_id": 1,
    "deposito_name": "Bronze",
    "yearly_return": "3.00",
    "balance": "10000000.00",
    "opened_at": "2024-01-01"
  }
]
```

---

### POST /accounts

Create a new account.

**Request Body:**
```json
{
  "packet": "Premium",
  "customer_id": 1,
  "deposito_type_id": 2,
  "balance": 5000000,
  "opened_at": "2024-01-15"
}
```

**Validation:**
- `packet` (required): String
- `customer_id` (required): Integer, must exist in customers table
- `deposito_type_id` (required): Integer, must exist in deposito_types table
- `balance` (optional): Number, defaults to 0
- `opened_at` (optional): Date string (YYYY-MM-DD), defaults to current date

**Response:** `201 Created`
```json
{
  "id": 1,
  "packet": "Premium",
  "customer_id": 1,
  "deposito_type_id": 2,
  "balance": "5000000.00",
  "opened_at": "2024-01-15"
}
```

---

### PUT /accounts/:id

Update an account.

**URL Parameters:**
- `id`: Account ID (integer)

**Request Body:**
```json
{
  "packet": "Premium Plus",
  "customer_id": 1,
  "deposito_type_id": 3,
  "opened_at": "2024-01-15"
}
```

**Note:** Balance cannot be updated via this endpoint. Use deposit/withdraw endpoints.

**Response:** `200 OK`
```json
{
  "id": 1,
  "packet": "Premium Plus",
  "customer_id": 1,
  "deposito_type_id": 3,
  "balance": "5000000.00",
  "opened_at": "2024-01-15"
}
```

---

### DELETE /accounts/:id

Delete an account.

**URL Parameters:**
- `id`: Account ID (integer)

**Response:** `200 OK`
```json
{
  "message": "Account deleted"
}
```

---

## Transactions

### POST /accounts/:id/deposit

Deposit money to an account.

**URL Parameters:**
- `id`: Account ID (integer)

**Request Body:**
```json
{
  "amount": 1000000,
  "deposit_date": "2024-02-01"
}
```

**Validation:**
- `amount` (required): Number, must be positive
- `deposit_date` (optional): Date string, defaults to current timestamp

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Deposit successful",
  "balance": 11000000.00
}
```

**Business Logic:**
1. Lock the account record (FOR UPDATE)
2. Calculate new balance: `current_balance + deposit_amount`
3. Update account balance
4. Record transaction with type 'DEPOSIT'
5. Commit transaction

---

### POST /accounts/:id/withdraw

Withdraw all balance plus interest from an account.

**URL Parameters:**
- `id`: Account ID (integer)

**Request Body:**
```json
{
  "withdrawal_date": "2024-12-31"
}
```

**Validation:**
- `withdrawal_date` (required): Date string (YYYY-MM-DD)

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Withdrawal successful",
  "startingBalance": 10000000.00,
  "months": 12,
  "monthlyReturn": 0.0025,
  "interest": 300000.00,
  "endingBalance": 10300000.00
}
```

**Business Logic:**
1. Lock the account record with deposito type info (FOR UPDATE)
2. Validate balance > 0
3. Calculate months between `opened_at` and `withdrawal_date`
4. Calculate interest:
   - `monthly_return = yearly_return / 12 / 100`
   - `interest = balance × months × monthly_return`
   - `ending_balance = balance + interest`
5. Set account balance to 0
6. Record transaction with type 'WITHDRAW' and amount = `ending_balance`
7. Commit transaction

**Error Responses:**

`400 Bad Request` - Balance is zero or negative:
```json
{
  "message": "Account balance is zero or negative"
}
```

`404 Not Found` - Account not found:
```json
{
  "message": "Account not found"
}
```

---

## API Calls Per Screen

### Dashboard Page

**On Load:**
1. `GET /customers` - Get total customer count
2. `GET /deposito-types` - Get total types count
3. `GET /accounts` - Get accounts count and calculate total balance

---

### Customers Page

**On Load:**
1. `GET /customers` - Display customer list

**Create Customer:**
1. `POST /customers` - Create new customer
2. `GET /customers` - Refresh list

**Edit Customer:**
1. `PUT /customers/:id` - Update customer
2. `GET /customers` - Refresh list

**Delete Customer:**
1. `DELETE /customers/:id` - Delete customer
2. `GET /customers` - Refresh list

---

### Deposito Types Page

**On Load:**
1. `GET /deposito-types` - Display type list

**Create Type:**
1. `POST /deposito-types` - Create new type
2. `GET /deposito-types` - Refresh list

**Edit Type:**
1. `PUT /deposito-types/:id` - Update type
2. `GET /deposito-types` - Refresh list

**Delete Type:**
1. `DELETE /deposito-types/:id` - Delete type
2. `GET /deposito-types` - Refresh list

---

### Accounts Page

**On Load:**
1. `GET /accounts` - Display account list
2. `GET /customers` - Populate customer dropdown
3. `GET /deposito-types` - Populate type dropdown

**Create Account:**
1. `POST /accounts` - Create new account
2. `GET /accounts` - Refresh list

**Delete Account:**
1. `DELETE /accounts/:id` - Delete account
2. `GET /accounts` - Refresh list

---

### Transactions Page

**On Load:**
1. `GET /accounts` - Populate account dropdown

**Make Deposit:**
1. `POST /accounts/:id/deposit` - Process deposit
2. `GET /accounts` - Refresh account list

**Make Withdrawal:**
1. `POST /accounts/:id/withdraw` - Process withdrawal with interest calculation
2. `GET /accounts` - RefreshAccount list

---

## Error Handling

All endpoints may return the following error responses:

### 400 Bad Request
Validation error or business rule violation.

### 404 Not Found
Resource not found.

### 500 Internal Server Error
Server error or database error.

```json
{
  "success": false,
  "message": "Internal server error",
  "stack": "..." // Only in development mode
}
```

---

## Authentication

Currently, the API does not implement authentication. All endpoints are publicly accessible.

**Future Consideration:**
- Implement JWT-based authentication
- Add role-based access control (RBAC)
- Secure sensitive operations (delete, withdraw)
