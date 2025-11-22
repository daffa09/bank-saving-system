import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { api } from "@/api";
import { toast } from "sonner";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    packet: "",
    customer_id: "",
    deposito_type_id: "",
    balance: "0",
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [acc, cust, depo] = await Promise.all([
        api.getAccounts(),
        api.getCustomers(),
        api.getDepositoTypes(),
      ]);
      setAccounts(acc);
      setCustomers(cust);
      setTypes(depo);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormData({ packet: "", customer_id: "", deposito_type_id: "", balance: "0" });
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createAccount({
        ...formData,
        customer_id: Number(formData.customer_id),
        deposito_type_id: Number(formData.deposito_type_id),
        balance: Number(formData.balance),
      });
      toast.success("Account created successfully");
      setDialogOpen(false);
      loadAll();
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this account?")) return;
    try {
      await api.deleteAccount(id);
      toast.success("Account deleted");
      loadAll();
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage customer accounts and balances</p>
        </div>
        <Button onClick={handleOpenDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account List</CardTitle>
          <CardDescription>All active accounts in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Packet</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Deposito Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Opened At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">#{account.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{account.packet}</Badge>
                  </TableCell>
                  <TableCell>{account.customer_name}</TableCell>
                  <TableCell>
                    {account.deposito_name} ({account.yearly_return}%)
                  </TableCell>
                  <TableCell className="font-semibold">
                    Rp {Number(account.balance).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    {new Date(account.opened_at).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {accounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No accounts found. Create your first account.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>Open a new account for a customer</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="packet">Packet Name</Label>
                <Input
                  id="packet"
                  value={formData.packet}
                  onChange={(e) => setFormData({ ...formData, packet: e.target.value })}
                  placeholder="e.g., Regular, Premium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <select
                  id="customer"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={formData.customer_id}
                  onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                >
                  <option value="">Select customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.id} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Deposito Type</Label>
                <select
                  id="type"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  value={formData.deposito_type_id}
                  onChange={(e) => setFormData({ ...formData, deposito_type_id: e.target.value })}
                >
                  <option value="">Select deposito type</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.yearly_return}%)
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Initial Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Account</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
