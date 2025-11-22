import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Wallet, TrendingUp } from "lucide-react";
import { api } from "@/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    depositoTypes: 0,
    accounts: 0,
    totalBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [customers, types, accounts] = await Promise.all([
        api.getCustomers(),
        api.getDepositoTypes(),
        api.getAccounts(),
      ]);

      const totalBalance = accounts.reduce(
        (sum, acc) => sum + Number(acc.balance),
        0
      );

      setStats({
        customers: customers.length,
        depositoTypes: types.length,
        accounts: accounts.length,
        totalBalance,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Customers",
      value: stats.customers,
      icon: Users,
      description: "Active customers",
      color: "text-blue-600",
    },
    {
      title: "Deposito Types",
      value: stats.depositoTypes,
      icon: Briefcase,
      description: "Available plans",
      color: "text-green-600",
    },
    {
      title: "Active Accounts",
      value: stats.accounts,
      icon: Wallet,
      description: "Total accounts",
      color: "text-purple-600",
    },
    {
      title: "Total Balance",
      value: `Rp ${stats.totalBalance.toLocaleString('id-ID')}`,
      icon: TrendingUp,
      description: "Across all accounts",
      color: "text-orange-600",
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your bank saving system
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Bank Saving System</CardTitle>
          <CardDescription>
            Manage your customers, deposito types, accounts, and transactions efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Navigate using the sidebar to manage different sections</p>
            <p>• View and manage customers and their information</p>
            <p>• Create and configure different deposito type packages</p>
            <p>• Open accounts and link them to customers</p>
            <p>• Process deposits and calculate withdrawals with interest</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
