import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Key, 
  Hash,
  LayoutGrid,
  List,
  Filter,
  X,
  Users,
  Wrench
} from "lucide-react";
import { keysData } from "@/data/keysData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [filterType, setFilterType] = useState<"all" | "utility" | "customer">("all");

  const filteredKeys = useMemo(() => {
    return keysData.filter((key) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        key.namaKunci.toLowerCase().includes(query) ||
        key.keterangan?.toLowerCase().includes(query) ||
        key.customer?.toLowerCase().includes(query) ||
        key.lokasi?.toLowerCase().includes(query) ||
        key.no.toString().includes(query);
      
      const matchesType = filterType === "all" || key.tipe === filterType;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const stats = useMemo(() => ({
    total: keysData.length,
    utility: keysData.filter(k => k.tipe === "utility").length,
    customer: keysData.filter(k => k.tipe === "customer").length,
    filtered: filteredKeys.length
  }), [filteredKeys]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3">
              <Key className="h-8 w-8 text-primary md:h-10 md:w-10" />
            </div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Search Key
            </h1>
          </div>
          <p className="text-sm text-muted-foreground md:text-base">
            Sistem Pencarian dan Pengelolaan Data Kunci
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Utility Keys</p>
                  <p className="text-2xl font-bold text-foreground">{stats.utility}</p>
                </div>
                <Wrench className="h-8 w-8 text-primary/70" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Keys</p>
                  <p className="text-2xl font-bold text-foreground">{stats.customer}</p>
                </div>
                <Users className="h-8 w-8 text-primary/70" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hasil Filter</p>
                  <p className="text-2xl font-bold text-primary">{stats.filtered}</p>
                </div>
                <Filter className="h-8 w-8 text-primary/70" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter Bar */}
        <Card className="mb-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Semua ({stats.total})
                </Button>
                <Button
                  variant={filterType === "utility" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("utility")}
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Utility ({stats.utility})
                </Button>
                <Button
                  variant={filterType === "customer" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("customer")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Customer ({stats.customer})
                </Button>
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari nama kunci, lokasi, customer, atau nomor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 rounded-lg border border-border p-1">
                    <Button
                      variant={viewMode === "table" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("table")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {viewMode === "table" ? (
          // Table View
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      Tipe
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      Nama Kunci
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      Lokasi
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground md:text-sm">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredKeys.length > 0 ? (
                    filteredKeys.map((key) => (
                      <tr
                        key={key.no}
                        className="transition-colors hover:bg-muted/30"
                      >
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            #{key.no}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant={key.tipe === "utility" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {key.tipe === "utility" ? (
                              <>
                                <Wrench className="mr-1 h-3 w-3" />
                                Utility
                              </>
                            ) : (
                              <>
                                <Users className="mr-1 h-3 w-3" />
                                Customer
                              </>
                            )}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-foreground">
                            {key.namaKunci}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {key.customer || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {key.lokasi || "-"}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {key.keterangan || "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Search className="h-12 w-12 text-muted-foreground/50" />
                          <p className="text-muted-foreground">
                            Tidak ada data kunci yang ditemukan
                          </p>
                          {searchQuery && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSearchQuery("")}
                            >
                              Reset Pencarian
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          // Grid View
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredKeys.length > 0 ? (
              filteredKeys.map((key) => (
                <Card 
                  key={key.no} 
                  className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                        {key.tipe === "utility" ? (
                          <Wrench className="h-5 w-5" />
                        ) : (
                          <Users className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            <Hash className="mr-1 h-3 w-3" />
                            {key.no}
                          </Badge>
                          <Badge 
                            variant={key.tipe === "utility" ? "secondary" : "outline"}
                            className="text-xs"
                          >
                            {key.tipe === "utility" ? "Utility" : "Customer"}
                          </Badge>
                        </div>
                        <h3 className="mb-2 text-base font-semibold leading-tight text-foreground">
                          {key.namaKunci}
                        </h3>
                        
                        <div className="space-y-1.5 text-sm">
                          {key.customer && (
                            <div className="flex items-start gap-1">
                              <Users className="mt-0.5 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {key.customer}
                              </span>
                            </div>
                          )}
                          {key.lokasi && (
                            <div className="text-xs text-muted-foreground">
                              📍 {key.lokasi}
                            </div>
                          )}
                          {key.keterangan && (
                            <div className="mt-2 border-t border-border/50 pt-2">
                              <p className="text-xs text-muted-foreground">
                                {key.keterangan}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex min-h-[400px] flex-col items-center justify-center gap-4">
                <Search className="h-16 w-16 text-muted-foreground/50" />
                <div className="text-center">
                  <p className="mb-2 text-lg font-medium text-foreground">
                    Tidak ada data kunci yang ditemukan
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Coba ubah kata kunci pencarian atau filter Anda
                  </p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Reset Pencarian
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Info */}
        {filteredKeys.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Menampilkan {filteredKeys.length} dari {keysData.length} kunci
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;