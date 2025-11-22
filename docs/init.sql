-- Bank Saving System Database Schema
-- This file will be executed automatically when PostgreSQL container starts for the first time

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create deposito_types table
CREATE TABLE IF NOT EXISTS deposito_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    yearly_return DECIMAL(5,2) NOT NULL CHECK (yearly_return > 0)
);

-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    packet VARCHAR(100) NOT NULL,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    deposito_type_id INTEGER NOT NULL REFERENCES deposito_types(id) ON DELETE RESTRICT,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0 CHECK (balance >= 0),
    opened_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('DEPOSIT', 'WITHDRAW')),
    amount DECIMAL(15,2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accounts_customer ON accounts(customer_id);
CREATE INDEX IF NOT EXISTS idx_accounts_type ON accounts(deposito_type_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at);

-- Insert sample deposito types (optional)
INSERT INTO deposito_types (name, yearly_return) VALUES 
    ('Bronze', 3.00),
    ('Silver', 5.00),
    ('Gold', 7.50)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database schema created successfully!' AS status;
