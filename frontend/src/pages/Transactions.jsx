import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { api } from "@/api";
import { toast } from "sonner";

export default function Transactions() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [depositDialog, setDepositDialog] = useState(false);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [withdrawResult, setWithdrawResult] = useState(null);
  const [depositData, setDepositData] = useState({ amount: "0", deposit_date: "" });
  const [withdrawData, setWithdrawData] = useState({ withdrawal_date: "" });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await api.getAccounts();
      setAccounts(data);
    } catch (error) {
      toast.error("Failed to load accounts");
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!selectedAccount) {
      toast.error("Please select an account");
      return;
    }
    try {
      await api.deposit(selectedAccount, {
        amount: Number(depositData.amount),
        deposit_date: depositData.deposit_date || undefined,
      });
      toast.success("Deposit successful");
      setDepositDialog(false);
      setDepositData({ amount: "0", deposit_date: "" });
      loadAccounts();
    } catch (error) {
      toast.error("Deposit failed");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!selectedAccount || !withdrawData.withdrawal_date) {
      toast.error("Please select account and withdrawal date");
      return;
    }
    try {
      const result = await api.withdraw(selectedAccount, withdrawData);
      setWithdrawResult(result);
      toast.success("Withdrawal successful");
      loadAccounts();
    } catch (error) {
      toast.error("Withdrawal failed");
    }
  };

  const selectedAccountData = accounts.find(a => a.id === Number(selectedAccount));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Process deposits and withdrawals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Account</CardTitle>
          <CardDescription>Choose an account to perform transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <select
            className="flex h-10 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={selectedAccount}
            onChange={(e) => {
              setSelectedAccount(e.target.value);
              setWithdrawResult(null);
            }}
          >
            <option value="">Select an account...</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                #{account.id} - {account.customer_name} ({account.packet}) - Rp {Number(account.balance).toLocaleString('id-ID')}
              </option>
            ))}
          </select>

          {selectedAccountData && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Account Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Customer:</div>
                <div className="font-medium">{selectedAccountData.customer_name}</div>
                <div>Packet:</div>
                <div className="font-medium">{selectedAccountData.packet}</div>
                <div>Deposito Type:</div>
                <div className="font-medium">{selectedAccountData.deposito_name}</div>
                <div>Yearly Return:</div>
                <div className="font-medium">{selectedAccountData.yearly_return}%</div>
                <div>Current Balance:</div>
                <div className="font-semibold text-lg text-primary">
                  Rp {Number(selectedAccountData.balance).toLocaleString('id-ID')}
                </div>
                <div>Opened At:</div>
                <div className="font-medium">
                  {new Date(selectedAccountData.opened_at).toLocaleDateString('id-ID')}
                 </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDown className="h-5 w-5 text-green-600" />
              Deposit
            </CardTitle>
            <CardDescription>Add money to the selected account</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setDepositDialog(true)}
              disabled={!selectedAccount}
              className="w-full"
            >
              Make Deposit
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-red-600" />
              Withdraw
            </CardTitle>
            <CardDescription>Withdraw all balance + interest</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setWithdrawDialog(true)}
              disabled={!selectedAccount}
              variant="destructive"
              className="w-full"
            >
              Make Withdrawal
            </Button>
          </CardContent>
        </Card>
      </div>

      {withdrawResult && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Withdrawal Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span>Starting Balance:</span>
                <span className="font-semibold">
                  Rp {withdrawResult.startingBalance?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Duration:</span>
                <span className="font-semibold">{withdrawResult.months} months</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Monthly Return Rate:</span>
                <span className="font-semibold">
                  {(withdrawResult.monthlyReturn * 100).toFixed(3)}%
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Interest Earned:</span>
                <span className="font-semibold text-green-600">
                  Rp {withdrawResult.interest?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between py-3 text-lg">
                <span className="font-bold">Total Paid Out:</span>
                <span className="font-bold text-primary">
                  Rp {withdrawResult.endingBalance?.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={depositDialog} onOpenChange={setDepositDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Deposit</DialogTitle>
            <DialogDescription>Add money to the account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDeposit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={depositData.amount}
                  onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                  placeholder="Enter deposit amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit_date">Deposit Date (optional)</Label>
                <Input
                  id="deposit_date"
                  type="date"
                  value={depositData.deposit_date}
                  onChange={(e) => setDepositData({ ...depositData, deposit_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDepositDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Deposit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={withdrawDialog} onOpenChange={setWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Withdrawal</DialogTitle>
            <DialogDescription>
              Withdraw all balance plus interest (balance will become 0)
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWithdraw}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawal_date">Withdrawal Date</Label>
                <Input
                  id="withdrawal_date"
                  type="date"
                  value={withdrawData.withdrawal_date}
                  onChange={(e) => setWithdrawData({ withdrawal_date: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setWithdrawDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">Withdraw</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
