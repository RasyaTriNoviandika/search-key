import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KeyData } from "@/data/keysData";
import { Key, MapPin, Building2, Hash } from "lucide-react";

interface KeyCardProps {
  keyData: KeyData;
}

export const KeyCard = ({ keyData }: KeyCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card hover:border-primary/20">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Key className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono text-xs">
                <Hash className="h-3 w-3 mr-1" />
                {keyData.no}
              </Badge>
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-base leading-tight">
              {keyData.namaKunci}
            </h3>
            
            <div className="space-y-1.5 text-sm">
              {keyData.customer && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{keyData.customer}</span>
                </div>
              )}
              {keyData.lokasi && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{keyData.lokasi}</span>
                </div>
              )}
              {keyData.keterangan && (
                <div className="text-muted-foreground mt-2 pt-2 border-t border-border/50">
                  <p className="text-xs">{keyData.keterangan}</p>
                </div>
              )}
              {keyData.jumlah && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  Jumlah: {keyData.jumlah}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
