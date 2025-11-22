const API_BASE = "http://localhost:5000";

export async function fetchJSON(url, options = {}) {
  const res = await fetch(API_BASE + url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}

// Customers
export const api = {
  getCustomers: () => fetchJSON("/customers"),
  createCustomer: (data) =>
    fetchJSON("/customers", { method: "POST", body: JSON.stringify(data) }),
  updateCustomer: (id, data) =>
    fetchJSON(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteCustomer: (id) =>
    fetchJSON(`/customers/${id}`, { method: "DELETE" }),

  // Deposito types
  getDepositoTypes: () => fetchJSON("/deposito-types"),
  createDepositoType: (data) =>
    fetchJSON("/deposito-types", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateDepositoType: (id, data) =>
    fetchJSON(`/deposito-types/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteDepositoType: (id) =>
    fetchJSON(`/deposito-types/${id}`, { method: "DELETE" }),

  // Accounts
  getAccounts: () => fetchJSON("/accounts"),
  createAccount: (data) =>
    fetchJSON("/accounts", { method: "POST", body: JSON.stringify(data) }),
  updateAccount: (id, data) =>
    fetchJSON(`/accounts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteAccount: (id) =>
    fetchJSON(`/accounts/${id}`, { method: "DELETE" }),

  // Deposit & Withdraw
  deposit: (id, data) =>
    fetchJSON(`/accounts/${id}/deposit`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  withdraw: (id, data) =>
    fetchJSON(`/accounts/${id}/withdraw`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
