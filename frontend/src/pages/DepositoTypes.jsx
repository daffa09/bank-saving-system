import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { api } from "@/api";
import { toast } from "sonner";

export default function DepositoTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({ name: "", yearly_return: "3" });

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const data = await api.getDepositoTypes();
      setTypes(data);
    } catch (error) {
      toast.error("Failed to load deposito types");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData({ name: type.name, yearly_return: String(type.yearly_return) });
    } else {
      setEditingType(null);
      setFormData({ name: "", yearly_return: "3" });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name: formData.name, yearly_return: Number(formData.yearly_return) };
      if (editingType) {
        await api.updateDepositoType(editingType.id, data);
        toast.success("Deposito type updated");
      } else {
        await api.createDepositoType(data);
        toast.success("Deposito type created");
      }
      setDialogOpen(false);
      loadTypes();
    } catch (error) {
      toast.error("Failed to save deposito type");
    }
  };


  const handleDelete = async (id) => {
    if (!confirm("Delete this deposito type?")) return;
    try {
      await api.deleteDepositoType(id);
      toast.success("Deposito type deleted");
      loadTypes();
    } catch (error) {
      toast.error("Failed to delete deposito type");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deposito Types</h1>
          <p className="text-muted-foreground">Manage deposito packages and interest rates</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Type
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((type) => (
          <Card key={type.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {type.name}
                    <Badge variant="secondary">{type.yearly_return}% /year</Badge>
                  </CardTitle>
                  <CardDescription>ID: #{type.id}</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Monthly Rate: {(type.yearly_return / 12).toFixed(3)}%
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleOpenDialog(type)} className="flex-1">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(type.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {types.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No deposito types found. Add your first type.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingType ? "Edit" : "Add New"} Deposito Type</DialogTitle>
            <DialogDescription>Configure deposito package details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Package Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Bronze, Silver, Gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearly_return">Yearly Return (%)</Label>
                <Input
                  id="yearly_return"
                  type="number"
                  step="0.01"
                  value={formData.yearly_return}
                  onChange={(e) => setFormData({ ...formData, yearly_return: e.target.value })}
                  placeholder="e.g., 3, 5, 7"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editingType ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
