"use client";
import * as React from "react";
import {
  Badge,
  Alert,
  Button,
  Input,
  Label,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  ToastProvider,
  useToast,
  type Intent,
} from "@chlohal/coal-ui";
const statuses: [Intent, string][] = [
  ["neutral", "En attente"],
  ["info", "Synchronisation en cours"],
  ["success", "Enregistré"],
  ["warning", "Limite bientôt atteinte"],
  ["danger", "Échec de l’enregistrement"],
];
function Notifications() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({ title: "Modifications enregistrées", intent: "success" })
        }
      >
        Confirmer une sauvegarde
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Enregistrement impossible",
            description: "Votre saisie est conservée. Réessayez.",
            intent: "danger",
          })
        }
      >
        Afficher une erreur persistante
      </Button>
    </div>
  );
}
export function FoundationsPreview() {
  const [compact, setCompact] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <>
      <h2>Une intention, un traitement</h2>
      <div className="grid gap-3">
        {statuses.map(([intent, label]) => (
          <div className="grid gap-2" key={intent}>
            <Badge intent={intent}>{label}</Badge>
            <Alert intent={intent}>{label}</Alert>
          </div>
        ))}
      </div>
      <h2>Un mouvement court et utile</h2>
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button />}>Tester la fenêtre</DialogTrigger>
          <DialogContent>
            <DialogTitle>Une décision à la fois</DialogTitle>
            <DialogDescription>
              200 ms à l’ouverture, 140 ms à la fermeture. Le focus revient au
              déclencheur.
            </DialogDescription>
            <Input aria-label="Nom du projet" placeholder="Mon projet" />
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Tester le popover
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Un détail proche de l’action</PopoverTitle>
            <PopoverDescription>
              4 px de déplacement, 160 ms.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
        <Button
          loading={busy}
          onClick={() => {
            setBusy(true);
            timer.current = setTimeout(() => setBusy(false), 1800);
          }}
        >
          Enregistrer
        </Button>
      </div>
      <h2>Confortable, puis compact si nécessaire</h2>
      <Button
        variant="outline"
        aria-pressed={compact}
        onClick={() => setCompact(!compact)}
      >
        Densité compacte
      </Button>
      <div
        className="coal-theme mt-4 flex items-end gap-3"
        data-density={compact ? "compact" : "comfortable"}
      >
        <div>
          <Label htmlFor="foundation-name">Nom du projet</Label>
          <Input id="foundation-name" placeholder="Coal" />
        </div>
        <Button>Créer</Button>
      </div>
      <h2>Des notifications qui respectent l’attention</h2>
      <ToastProvider>
        <Notifications />
      </ToastProvider>
    </>
  );
}
