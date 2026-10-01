"use client";
import * as React from "react";
import {
  PixelMark,
  Spinner,
  Switch,
  Slider,
  SliderThumb,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
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
  ["neutral", "Pending"],
  ["info", "Syncing"],
  ["success", "Saved"],
  ["warning", "Approaching the limit"],
  ["danger", "Could not save"],
];
function Notifications() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() => toast.add({ title: "Changes saved", intent: "success" })}
      >
        Confirm a save
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Could not save changes",
            description: "Your changes are preserved. Please try again.",
            intent: "danger",
          })
        }
      >
        Show a persistent error
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
      <h2 id="motion" style={{ scrollMarginTop: 100 }}>
        Motion at your fingertips
      </h2>
      <div className="motion-preview">
        <div className="motion-controls">
          <div className="motion-preview-label">01 / PRESS & SELECT</div>
          <div className="flex flex-wrap items-center gap-5">
            <Button>Press and hold</Button>
            <label className="flex items-center gap-3 text-sm">
              <Switch defaultChecked />
              Notifications
            </label>
          </div>
          <Slider defaultValue={55}>
            <SliderThumb aria-label="Intensity" />
          </Slider>
          <Tabs defaultValue="design">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="motion">Motion</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              Sharp edges. Soft movement.
            </TabsContent>
            <TabsContent value="motion">
              Immediate response. A gentle settle.
            </TabsContent>
            <TabsContent value="details">
              Zero radius. One mauve accent.
            </TabsContent>
          </Tabs>
        </div>
        <div className="motion-loading">
          <div className="motion-preview-label">02 / LOADING</div>
          <div className="flex items-center gap-6">
            <Spinner size={20} />
            <Spinner size={32} />
            <Spinner size={48} />
          </div>
          <p>Fixed squares. Light moving through them.</p>
          <a
            className="text-link"
            href="https://loading.dev/spinners/loading"
            target="_blank"
            rel="noreferrer"
          >
            Inspired by loading.dev ↗
          </a>
        </div>
      </div>
      <h2>Squares, put to work</h2>
      <div className="pixel-study">
        <PixelMark size={112} variant="seed" />
        <PixelMark size={160} />
        <div>
          <p>A precise grid. An organic silhouette.</p>
          <p>
            Cells form a check, move with a switch, and track progress. The same
            square becomes a working part of each component.
          </p>
        </div>
      </div>
      <h2>Meaning through shape and words</h2>
      <div className="grid gap-3">
        {statuses.map(([intent, label]) => (
          <div className="grid gap-2" key={intent}>
            <Badge intent={intent}>{label}</Badge>
            <Alert intent={intent}>{label}</Alert>
          </div>
        ))}
      </div>
      <h2>Soft, settled movement</h2>
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>One decision at a time</DialogTitle>
            <DialogDescription>
              Give your project a name. You can change it later.
            </DialogDescription>
            <div className="coal-field">
              <Label htmlFor="foundation-dialog-name">Project name</Label>
              <Input id="foundation-dialog-name" placeholder="My project" />
            </div>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open popover
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>A detail close to the action</PopoverTitle>
            <PopoverDescription>
              Useful context, right where you need it.
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
          Save
        </Button>
      </div>
      <h2>Comfortable, compact when needed</h2>
      <Button
        variant="outline"
        aria-pressed={compact}
        onClick={() => setCompact(!compact)}
      >
        Compact density
      </Button>
      <div
        className="coal-theme mt-4 flex items-end gap-3"
        data-density={compact ? "compact" : "comfortable"}
      >
        <div>
          <Label htmlFor="foundation-name">Project name</Label>
          <Input id="foundation-name" placeholder="Coal" />
        </div>
        <Button>Create</Button>
      </div>
      <h2>Notifications that respect your attention</h2>
      <ToastProvider>
        <Notifications />
      </ToastProvider>
    </>
  );
}
