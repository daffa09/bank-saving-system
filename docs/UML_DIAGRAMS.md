# UML Diagrams - Bank Saving System

## Class Diagram

```mermaid
classDiagram
    class Customer {
        -int id
        -string name
        +getAllCustomers() List~Customer~
        +getCustomerById(id) Customer
        +createCustomer(name) Customer
        +updateCustomer(id, name) Customer
        +deleteCustomer(id) boolean
    }

    class DepositoType {
        -int id
        -string name
        -decimal yearlyReturn
        +getAllDepositoTypes() List~DepositoType~
        +getDepositoTypeById(id) DepositoType
        +createDepositoType(name, yearlyReturn) DepositoType
        +updateDepositoType(id, name, yearlyReturn) DepositoType
        +deleteDepositoType(id) boolean
        +calculateMonthlyReturn() decimal
    }

    class Account {
        -int id
        -string packet
        -int customerId
        -int depositoTypeId
        -decimal balance
        -date openedAt
        +getAllAccounts() List~Account~
        +getAccountById(id) Account
        +createAccount(data) Account
        +updateAccount(id, data) Account
        +deleteAccount(id) boolean
        +updateBalance(id, newBalance) Account
    }

    class Transaction {
        -int id
        -int accountId
        -string type
        -decimal amount
        -datetime createdAt
        +depositToAccount(accountId, amount, date) TransactionResult
        +withdrawFromAccount(accountId, date) WithdrawResult
        +calculateInterest(balance, yearlyReturn, months) decimal
    }

    class CustomerService {
        +getAllCustomers() List~Customer~
        +createCustomer(name) Customer
        +updateCustomer (id, name) Customer
        +deleteCustomer(id) boolean
    }

    class DepositoTypeService {
        +getAllDepositoTypes() List~DepositoType~
        +createDepositoType(name, yearlyReturn) DepositoType
        +updateDepositoType(id, name, yearlyReturn) DepositoType
        +deleteDepositoType(id) boolean
    }

    class AccountService {
        +getAllAccounts() List~Account~
        +createAccount(data) Account
        +updateAccount(id, data) Account
        +deleteAccount(id) boolean
    }

    class TransactionService {
        +depositToAccount(accountId, amount, date) Result
        +withdrawFromAccount(accountId, date) WithdrawResult
        -calculateInterest(balance, rate, months) decimal
        -diffMonths(startDate, endDate) int
    }

    class CustomerController {
        +getAllCustomers(req, res)
        +getCustomerById(req, res)
        +createCustomer(req, res)
        +updateCustomer(req, res)
        +deleteCustomer(req, res)
    }

    class DepositoTypeController {
        +getAllDepositoTypes(req, res)
        +createDepositoType(req, res)
        +updateDepositoType(req, res)
        +deleteDepositoType(req, res)
    }

    class AccountController {
        +getAllAccounts(req, res)
        +createAccount(req, res)
        +updateAccount(req, res)
        +deleteAccount(req, res)
    }

    class TransactionController {
        +deposit(req, res)
        +withdraw(req, res)
    }

    %% Relationships
    Customer "1" --> "*" Account : owns
    DepositoType "1" --> "*" Account : configures
    Account "1" --> "*" Transaction : records

    %% Service Layer
    CustomerService ..> Customer : manages
    DepositoTypeService ..> DepositoType : manages
    AccountService ..> Account : manages
    TransactionService ..> Transaction : manages
    TransactionService ..> Account : updates

    %% Controller Layer
    CustomerController ..> CustomerService : uses
    DepositoTypeController ..> DepositoTypeService : uses
    AccountController ..> AccountService : uses
    TransactionController ..> TransactionService : uses
```

---

## Use Case Diagram

```mermaid
graph TB
    subgraph "Bank Saving System"
        UC1[Manage Customers]
        UC2[Manage Deposito Types]
        UC3[Manage Accounts]
        UC4[Make Deposit]
        UC5[Make Withdrawal]
        UC6[View Dashboard]
        UC7[View Account Details]
        UC8[Calculate Interest]
    end

    Actor[Bank Employee/Admin]

    Actor --> UC1
    Actor --> UC2
    Actor --> UC3
    Actor --> UC4
    Actor --> UC5
    Actor --> UC6
    Actor --> UC7

    UC5 ..> UC8 : includes
    UC7 ..> UC8 : includes

    UC1 -.-> |Create| UC1A[Add Customer]
    UC1 -.-> |Read| UC1B[View Customers]
    UC1 -.-> |Update| UC1C[Edit Customer]
    UC1 -.-> |Delete| UC1D[Delete Customer]

    UC2 -.-> |Create| UC2A[Add Deposito Type]
    UC2 -.-> |Read| UC2B[View Types]
    UC2 -.-> |Update| UC2C[Edit Type]
    UC2 -.-> |Delete| UC2D[Delete Type]

    UC3 -.-> |Create| UC3A[Open Account]
    UC3 -.-> |Read| UC3B[View Accounts]
    UC3 -.-> |Update| UC3C[Edit Account]
    UC3 -.-> |Delete| UC3D[Close Account]
```

---

## Sequence Diagram: Deposit Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Frontend
    participant API as TransactionController
    participant Service as TransactionService
    participant DB as Database

    User->>UI: Select account & enter deposit amount
    UI->>User: Show deposit dialog
    User->>UI: Click "Deposit" button
    
    UI->>API: POST /accounts/:id/deposit<br/>{amount, deposit_date}
    
    API->>Service: depositToAccount(accountId, amount, date)
    
    Service->>DB: BEGIN TRANSACTION
    Service->>DB: SELECT * FROM accounts WHERE id = ? FOR UPDATE
    DB-->>Service: Account data
    
    Service->>Service: Calculate new balance<br/>newBalance = currentBalance + amount
    
    Service->>DB: UPDATE accounts SET balance = ?
    Service->>DB: INSERT INTO transactions (type='DEPOSIT')
    Service->>DB: COMMIT
    
    DB-->>Service: Success
    Service-->>API: {success: true, balance: newBalance}
    API-->>UI: 200 OK {balance}
    
    UI->>User: Show success toast
    UI->>UI: Refresh account list
```

---

## Sequence Diagram: Withdrawal with Interest Calculation

```mermaid
sequenceDiagram
    actor User
    participant UI as Frontend
    participant API as TransactionController
    participant Service as TransactionService
    participant Helper as Helpers
    participant DB as Database

    User->>UI: Select account & enter withdrawal date
    UI->>User: Show withdrawal dialog
    User->>UI: Click "Withdraw" button
    
    UI->>API: POST /accounts/:id/withdraw<br/>{withdrawal_date}
    
    API->>Service: withdrawFromAccount(accountId, date)
    
    Service->>DB: BEGIN TRANSACTION
    Service->>DB: SELECT a.*, d.yearly_return<br/>FROM accounts a<br/>JOIN deposito_types d<br/>WHERE a.id = ? FOR UPDATE
    DB-->>Service: Account + Deposito Type data
    
    Service->>Service: Validate balance > 0
    
    Service->>Helper: diffMonths(openedAt, withdrawalDate)
    Helper-->>Service: months
    
    Service->>Helper: calculateInterest(balance, yearlyReturn, months)
    Helper-->>Service: {monthlyReturn, interest, endingBalance}
    
    Service->>DB: UPDATE accounts SET balance = 0
    Service->>DB: INSERT INTO transactions<br/>(type='WITHDRAW', amount=endingBalance)
    Service->>DB: COMMIT
    
    DB-->>Service: Success
    Service-->>API: {success, startingBalance, months,<br/>monthlyReturn, interest, endingBalance}
    API-->>UI: 200 OK {withdrawal result}
    
    UI->>User: Show withdrawal result card<br/>with interest breakdown
    UI->>UI: Refresh account list
```

---

## Activity Diagram: Account Creation Flow

```mermaid
flowchart TD
    Start([User clicks 'Create Account']) --> OpenDialog[Open Account Dialog]
    OpenDialog --> EnterData[User enters:<br/>- Packet name<br/>- Select customer<br/>- Select deposito type<br/>- Initial balance]
    
    EnterData --> ClickSubmit[Click 'Create' button]
    
    ClickSubmit --> Validate{Validate<br/>Form}
    
    Validate -->|Invalid| ShowError[Show validation error]
    ShowError --> EnterData
    
    Validate -->|Valid| SendAPI[Send POST /accounts]
    
    SendAPI --> APIProcess{API<br/>Success?}
    
    APIProcess -->|Error| ShowAPIError[Show error toast:<br/>'Failed to create account']
    ShowAPIError --> End1([End])
    
    APIProcess -->|Success| CreateAccount[Create account in database]
    CreateAccount --> ShowSuccess[Show success toast:<br/>'Account created successfully']
    ShowSuccess --> CloseDialog[Close dialog]
    CloseDialog --> RefreshList[Refresh account list]
    RefreshList --> End2([End])
```

---

## Component Diagram: System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React UI Components]
        Router[React Router]
        State[State Management]
        API_Client[API Client]
    end

    subgraph "Backend Layer"
        subgraph "Presentation"
            Routes[Express Routes]
            Controllers[Controllers]
            Middleware[Middleware<br/>Validation & Error Handling]
        end
        
        subgraph "Business Logic"
            Services[Services]
            Utils[Utils & Helpers]
        end
        
        subgraph "Data Access"
            Config[Database Config]
            Pool[Connection Pool]
        end
    end

    subgraph "Database"
        PostgreSQL[(PostgreSQL)]
    end

    UI --> Router
    Router --> State
    State --> API_Client
    API_Client -->|HTTP/JSON| Routes

    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Services
    Services --> Utils
    Services --> Pool
    Pool --> Config
    Config --> PostgreSQL
```

---

## State Diagram: Account Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created: Open Account
    
    Created --> Active: First Deposit
    Active --> Active: Subsequent Deposits
    Active --> Withdrawn: Full Withdrawal<br/>(Balance = 0)
    Withdrawn --> Active: New Deposit
    
    Created --> Deleted: Delete Account<br/>(No transactions)
    Active --> Deleted: Delete Account<br/>(Admin action)
    Withdrawn --> Deleted: Delete Account
    
    Deleted --> [*]

    note right of Active
        Balance > 0
        Can deposit
        Can withdraw
    end note

    note right of Withdrawn
        Balance = 0
        After full withdrawal
        Can accept new deposits
    end note
```

---

## Deployment Diagram

```mermaid
graph TB
    subgraph "Client Device"
        Browser[Web Browser<br/>React App]
    end

    subgraph "Application Server"
        Node[Node.js Server<br/>Express API<br/>Port: 5000]
    end

    subgraph "Database Server"
        DB[(PostgreSQL<br/>Database<br/>Port: 5432)]
    end

    Browser -->|HTTP/HTTPS<br/>REST API| Node
    Node -->|SQL Queries<br/>via pg Pool| DB
```

---

## Package Diagram: Backend Structure

```mermaid
graph LR
    subgraph "src"
        Config[config/]
        Utils[utils/]
        Middleware[middleware/]
        Services[services/]
        Controllers[controllers/]
        Routes[routes/]
        Index[index.js]
    end

    Config -->|used by| Services
    Utils -->|used by| Services
    Services -->|used by| Controllers
    Middleware -->|used by| Routes
    Controllers -->|used by| Routes
    Routes -->|imported by| Index
```

---

## Use Case Descriptions

### UC1: Manage Customers
**Actor:** Bank Employee/Admin
**Description:** Create, view, update, and delete customer records
**Precondition:** User has access to the system
**Postcondition:** Customer data is updated in the system

**Main Flow:**
1. User navigates to Customers page
2. System displays list of all customers
3. User can:
   - Create new customer with name
   - Edit existing customer name
   - Delete customer (if no associated accounts)

---

### UC3: Manage Accounts
**Actor:** Bank Employee/Admin
**Description:** Open, view, and close customer deposito accounts
**Precondition:** At least one customer and deposito type exist
**Postcondition:** Account is created/updated/deleted

**Main Flow:**
1. User navigates to Accounts page
2. System displays all accounts with customer and type info
3. User clicks "Create Account"
4. System shows form with:
   - Packet name field
   - Customer dropdown (from existing customers)
   - Deposito type dropdown (from existing types)
   - Optional initial balance
5. User fills form and submits
6. System validates and creates account
7. Account appears in the list

---

### UC5: Make Withdrawal
**Actor:** Bank Employee/Admin
**Description:** Withdraw all balance plus accumulated interest
**Precondition:** Account has balance > 0
**Postcondition:** Account balance becomes 0, customer receives ending balance

**Main Flow:**
1. User navigates to Transactions page
2. User selects account from dropdown
3. System shows account details (balance, opened date, rate)
4. User clicks "Make Withdrawal"
5. System shows withdrawal dialog
6. User enters withdrawal date
7. User clicks "Withdraw"
8. System calculates:
   - Duration in months
   - Monthly return rate
   - Interest earned
   - Total payout (balance + interest)
9. System sets account balance to 0
10. System records withdrawal transaction
11. System shows detailed result with breakdown

**Alternative Flow:**
- If balance is 0: Show error "Account balance is zero"
- If withdrawal date is before opened date: Show error

---

### UC8: Calculate Interest
**Actor:** System
**Description:** Calculate interest for withdrawal operations
**Precondition:** Account has balance and opened date
**Postcondition:** Interest amount is calculated

**Formula:**
```
months = number of months between opened_at and withdrawal_date
monthly_return = yearly_return / 12 / 100
interest = balance × months × monthly_return
ending_balance = balance + interest
```
