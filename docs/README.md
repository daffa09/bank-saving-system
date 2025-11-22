# System Documentation - Bank Saving System

This folder contains comprehensive documentation for the Bank Saving System project.

## Documents

### 1. [Database Design](DATABASE_DESIGN.md)
Complete database schema documentation including:
- Entity Relationship Diagram (ERD)
- Table specifications with all columns and constraints
- Relationships and foreign keys
- Database setup SQL scripts
- Sample queries

### 2. [API Documentation](API_DOCUMENTATION.md)
Full REST API specification:
- All endpoints with request/response examples
- Validation rules
- Error handling
- Business logic descriptions
- API calls per screen

### 3. [UML Diagrams](UML_DIAGRAMS.md)
Comprehensive UML diagrams:
- Class diagram (backend architecture)
- Use case diagram
- Sequence diagrams (deposit & withdrawal flows)
- Activity diagram (account creation)
- Component diagram (system architecture)
- State diagram (account lifecycle)
- Deployment diagram

### 4. [User Journey & Flow](USER_JOURNEY.md)
User experience documentation:
- User personas
- User journey maps
- Application flow diagrams
- Screen wireframes
- Key user interactions
- Pain points solved

### 5. [Postman Collection](Bank_Saving_System_API.postman_collection.json)
Ready-to-import Postman collection:
- All API endpoints
- Example requests with sample data
- Environment variables

## Quick Start

### Import Postman Collection

1. Open Postman
2. Click "Import"
3. Select `Bank_Saving_System_API.postman_collection.json`
4. Collection will be imported with all endpoints ready to test

### Environment Variables

The collection includes these variables (can be customized):
- `base_url`: `http://localhost:5000` (API server URL)
- `customer_id`: `1` (sample customer ID)
- `type_id`: `1` (sample deposito type ID)
- `account_id`: `1` (sample account ID)

## API Testing Workflow

### 1. Setup Data
```
1. POST /customers → Create a customer
2. POST /deposito-types → Create a deposito type (e.g., Bronze, 3%)
```

### 2. Create Account
```
3. POST /accounts → Open account with customer and type
```

### 3. Transactions
```
4. POST /accounts/:id/deposit → Add money
5. POST /accounts/:id/withdraw → Withdraw with interest
```

### 4. Verification
```
6. GET /accounts → Verify account balance
7. GET /customers → Check customer list
```

## Database Schema Summary

```
customers
├── id (PK)
└── name

deposito_types
├── id (PK)
├── name
└── yearly_return

accounts
├── id (PK)
├── packet
├── customer_id (FK → customers)
├── deposito_type_id (FK → deposito_types)
├── balance
└── opened_at

transactions
├── id (PK)
├── account_id (FK → accounts)
├── type (DEPOSIT/WITHDRAW)
├── amount
└── created_at
```

## Key Formulas

### Interest Calculation
```javascript
months = diffMonths(opened_at, withdrawal_date)
monthly_return = yearly_return / 12 / 100
interest = balance × months × monthly_return
ending_balance = balance + interest
```

### Example
- Balance: Rp 10,000,000
- Yearly Return: 6%
- Duration: 12 months
- **Interest**: Rp 600,000
- **Total Payout**: Rp 10,600,000

## Screen Mapping

| Screen | API Calls on Load | Actions |
|--------|------------------|---------|
| Dashboard | GET /customers<br/>GET /deposito-types<br/>GET /accounts | View statistics |
| Customers | GET /customers | Create, Edit, Delete customer |
| Deposito Types | GET /deposito-types | Create, Edit, Delete type |
| Accounts | GET /accounts<br/>GET /customers<br/>GET /deposito-types | Create, Delete account |
| Transactions | GET /accounts | Deposit, Withdraw |

## Architecture Overview

```
Frontend (React + shadcn/ui)
    ↓ HTTP/JSON REST API
Backend (Express.js)
    ├── Routes → Controllers → Services
    └── Database Connection Pool
         ↓
Database (PostgreSQL)
```

## Project Structure

```
bank-saving-system/
├── backend/
│   └── src/
│       ├── config/        # Database configuration
│       ├── utils/         # Helper functions
│       ├── middleware/    # Validation & error handling
│       ├── services/      # Business logic
│       ├── controllers/   # HTTP handlers
│       ├── routes/        # API endpoints
│       └── index.js       # Server entry point
├── frontend/
│   └── src/
│       ├── components/    # UI components
│       ├── pages/         # Page components
│       ├── lib/           # Utilities
│       ├── api.js         # API client
│       └── App.jsx        # Router setup
└── docs/                  # This folder
    ├── DATABASE_DESIGN.md
    ├── API_DOCUMENTATION.md
    ├── UML_DIAGRAMS.md
    ├── USER_JOURNEY.md
    └── Bank_Saving_System_API.postman_collection.json
```

## Contact & Support

For questions or issues regarding this documentation:
- Check the individual documentation files for detailed information
- Review the Postman collection for API testing examples
- Refer to UML diagrams for system design understanding
