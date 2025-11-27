import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Key } from "lucide-react";
import { keysData } from "@/data/keysData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKeys = keysData.filter((key) => {
    const query = searchQuery.toLowerCase();
    return (
      key.namaKunci.toLowerCase().includes(query) ||
      key.keterangan?.toLowerCase().includes(query) ||
      key.customer?.toLowerCase().includes(query) ||
      key.lokasi?.toLowerCase().includes(query) ||
      key.no.toString().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Key className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Search Key</h1>
          </div>
          <p className="text-muted-foreground">
            Sistem Pencarian dan Pengelolaan Data Kunci
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari nama kunci, lokasi, customer, atau nomor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Ditemukan {filteredKeys.length} dari {keysData.length} kunci
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Nama Kunci
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Lokasi
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredKeys.length > 0 ? (
                  filteredKeys.map((key) => (
                    <tr
                      key={key.no}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <td className="px-4 py-3 text-sm text-foreground">
                        {key.no}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        {key.namaKunci}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {key.lokasi || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {key.customer || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {key.keterangan || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-muted-foreground"
                    >
                      Tidak ada data kunci yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
