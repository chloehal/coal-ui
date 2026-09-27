"use client";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { Command } from "@/components/ui/command";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Chip } from "@/components/ui/chip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Steps } from "@/components/ui/steps";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { CopyableValue } from "@/components/ui/copyable-value";
import { TimePicker } from "@/components/ui/time-picker";
import { ColorPicker } from "@/components/ui/color-picker";
import { Attachment } from "@/components/ui/attachment";
import { ActionBar } from "@/components/ui/action-bar";
import Link from "next/link";
import {
  ArrowUpRight,
  Plus,
  ArrowRight,
  Check,
  Bell,
  Copy,
  Bold,
  Italic,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch, SwitchThumb } from "@/components/ui/switch";
import { Checkbox, CheckboxIndicator } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import {
  Slider,
  SliderControl,
  SliderTrack,
  SliderIndicator,
  SliderThumb,
  SliderValue,
} from "@/components/ui/slider";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from "@/components/ui/number-field";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
} from "@/components/ui/field";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";
import { Empty } from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/ui/kbd";
import { ButtonGroup } from "@/components/ui/button-group";
import { Breadcrumb } from "@/components/ui/breadcrumb";

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Pagination } from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/date-picker";
import { NativeSelect } from "@/components/ui/native-select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
} from "@/components/ui/alert-dialog";
function ToastDemo() {
  const toast = useToast();
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Changes saved.",
          description: "Everything is right where you left it.",
        })
      }
    >
      Show notification
    </Button>
  );
}

export function Demo({ name }: { name: string }) {
  const [page, setPage] = React.useState(1);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 8, 12),
  );
  const id = React.useId();
  const [message, setMessage] = React.useState("");
  const [saved, setSaved] = React.useState(false);
  const [files, setFiles] = React.useState<string[]>([]);
  const notice = message ? (
    <p
      role="status"
      className="w-full text-center text-xs text-muted-foreground"
    >
      {message}
    </p>
  ) : null;
  switch (name) {
    case "data-table":
      return (
        <DataTable
          caption="Projects"
          rows={[
            { id: "1", name: "Coal", members: 4 },
            { id: "2", name: "Atlas", members: 12 },
            { id: "3", name: "Studio", members: 2 },
            { id: "4", name: "Paper", members: 7 },
          ]}
          columns={[
            { id: "name", header: "Name", value: (row) => row.name },
            { id: "members", header: "Members", value: (row) => row.members },
          ]}
          getRowId={(row) => row.id}
          pageSize={3}
          selectable
        />
      );
    case "command":
      return (
        <div className="demo-stack">
          <Command
            items={[
              { id: "create", label: "Create project", keywords: "new" },
              { id: "invite", label: "Invite teammate" },
              { id: "archive", label: "Archive workspace", disabled: true },
            ]}
            onSelect={(action) => setMessage(action + " selected")}
          />
          {notice}
        </div>
      );
    case "input-group":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>Website</Label>
          <InputGroup>
            <InputGroupAddon aria-hidden="true">https://</InputGroupAddon>
            <Input id={id} placeholder="your.studio" />
            <InputGroupAddon aria-hidden="true">↗</InputGroupAddon>
          </InputGroup>
        </div>
      );
    case "chip":
      return (
        <div className="demo-stack">
          {!saved ? (
            <Chip
              removeLabel="Remove Design tag"
              onRemove={() => setSaved(true)}
            >
              Design
            </Chip>
          ) : (
            <Button variant="ghost" onClick={() => setSaved(false)}>
              Restore tag
            </Button>
          )}
        </div>
      );
    case "toggle-group":
      return (
        <ToggleGroup
          type="multiple"
          defaultValue={["bold"]}
          aria-label="Text formatting"
        >
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      );
    case "steps":
      return (
        <div className="demo-stack">
          <Steps
            steps={[
              { id: "details", label: "Details" },
              { id: "team", label: "Team" },
              { id: "review", label: "Review" },
            ]}
            current={page - 1}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page === 3 ? 1 : page + 1)}
          >
            {page === 3 ? "Start again" : "Next step"}
          </Button>
        </div>
      );
    case "timeline":
      return (
        <Timeline>
          <TimelineItem
            dateTime="2026-09-12T09:00:00"
            timeLabel="09:00"
            title="Project created"
          >
            A quiet beginning.
          </TimelineItem>
          <TimelineItem
            dateTime="2026-09-12T10:30:00"
            timeLabel="10:30"
            title="Team invited"
          >
            Ready to build together.
          </TimelineItem>
        </Timeline>
      );
    case "copyable-value":
      return <CopyableValue value="coal-project-001" label="Copy project ID" />;
    case "time-picker":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>Meeting time</Label>
          <TimePicker id={id} defaultValue="09:30" min="08:00" max="18:00" />
        </div>
      );
    case "color-picker":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>Accent color</Label>
          <ColorPicker id={id} defaultValue="#c46b38" />
        </div>
      );
    case "attachment":
      return (
        <Attachment
          label="Project attachments"
          accept=".txt,.pdf,image/*"
          multiple
          maxSize={5 * 1024 * 1024}
        />
      );
    case "action-bar":
      return (
        <div className="demo-stack">
          {saved ? (
            <Button variant="outline" onClick={() => setSaved(false)}>
              Select 3 items
            </Button>
          ) : (
            <ActionBar selectedCount={3} onClear={() => setSaved(true)}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setMessage("3 items archived.");
                  setSaved(true);
                }}
              >
                Archive
              </Button>
            </ActionBar>
          )}
          {notice}
        </div>
      );

    case "button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => setMessage("Your changes are saved.")}>
            Save changes <ArrowUpRight />
          </Button>
          <Button
            variant="outline"
            onClick={() => setMessage("Changes discarded.")}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Add item"
            onClick={() => setMessage("Item added.")}
          >
            <Plus />
          </Button>
          {notice}
        </div>
      );
    case "input":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>Email address</Label>
          <Input id={id} type="email" placeholder="you@studio.design" />
          <p className="text-xs text-muted-foreground">
            Your next idea starts here.
          </p>
        </div>
      );
    case "textarea":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>A note to your future self</Label>
          <Textarea id={id} placeholder="Make something that feels like you." />
        </div>
      );
    case "label":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>
            Project name{" "}
            <span className="text-muted-foreground">(required)</span>
          </Label>
          <Input id={id} required placeholder="Untitled, for now" />
        </div>
      );
    case "field":
      return (
        <Field className="w-full max-w-64">
          <FieldLabel>Studio name</FieldLabel>
          <FieldControl
            render={<Input />}
            placeholder="Your independent studio"
          />
          <FieldDescription>This appears on your workspace.</FieldDescription>
        </Field>
      );
    case "badge":
      return (
        <div className="flex flex-wrap justify-center gap-2">
          <Badge>Published</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="success">Available</Badge>
          <Badge variant="outline">v0.2</Badge>
          <Badge variant="warning">In review</Badge>
        </div>
      );
    case "switch":
      return (
        <div className="demo-stack">
          <label className="flex items-center justify-between gap-8 text-sm">
            Quiet mode
            <Switch defaultChecked>
              <SwitchThumb />
            </Switch>
          </label>
          <label className="flex items-center justify-between gap-8 text-sm text-muted-foreground">
            Email updates
            <Switch>
              <SwitchThumb />
            </Switch>
          </label>
        </div>
      );
    case "checkbox":
      return (
        <div className="demo-stack">
          {[
            "A little more intention",
            "A little less noise",
            "Make it yours",
          ].map((s, i) => (
            <label className="flex items-center gap-3 text-sm" key={s}>
              <Checkbox defaultChecked={i === 0}>
                <CheckboxIndicator>
                  <Check size={12} />
                </CheckboxIndicator>
              </Checkbox>
              {s}
            </label>
          ))}
        </div>
      );
    case "radio-group":
      return (
        <RadioGroup
          defaultValue="personal"
          aria-label="Workspace plan"
          className="demo-stack"
        >
          {["personal", "studio", "team"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-3 text-sm capitalize"
            >
              <RadioGroupItem value={s} />
              {s}
            </label>
          ))}
        </RadioGroup>
      );
    case "select":
      return (
        <div className="demo-stack">
          <Label id={id}>Your workspace</Label>
          <Select
            defaultValue="studio"
            items={{ personal: "Personal", studio: "Studio", team: "Team" }}
          >
            <SelectTrigger aria-labelledby={id}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["personal", "studio", "team"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    case "card":
      return (
        <Card className="w-full max-w-72">
          <CardHeader>
            <div className="mb-4 flex justify-between">
              <span className="ember-mark" />
              <Badge variant="outline">Workspace</Badge>
            </div>
            <CardTitle>Room for your next idea.</CardTitle>
            <CardDescription>
              A space to make something your own.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSaved(!saved)}
            >
              {saved ? "Added to your workspace" : "Add to workspace"}
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      );
    case "avatar":
      return (
        <div className="flex items-center -space-x-2">
          {["CH", "AM", "JL", "+3"].map((s, i) => (
            <Avatar
              key={s}
              className={
                i === 0
                  ? "size-11 bg-primary text-primary-foreground ring-2 ring-background"
                  : "size-11 ring-2 ring-background"
              }
            >
              <AvatarFallback>{s}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      );
    case "tabs":
      return (
        <Tabs defaultValue="overview" className="w-full max-w-72">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="pt-5 text-sm text-muted-foreground"
          >
            A little space for the bigger picture.
          </TabsContent>
          <TabsContent
            value="activity"
            className="pt-5 text-sm text-muted-foreground"
          >
            Your workspace was created today.
          </TabsContent>
          <TabsContent value="settings" className="pt-5">
            <label className="flex items-center justify-between text-sm">
              Notifications
              <Switch defaultChecked>
                <SwitchThumb />
              </Switch>
            </label>
          </TabsContent>
        </Tabs>
      );
    case "accordion":
      return (
        <Accordion className="max-w-80">
          {[
            [
              "What makes coal different?",
              "Warm neutrals, precise details and components you own.",
            ],
            [
              "Can I make it my own?",
              "Absolutely. Every component comes with its source code.",
            ],
            [
              "Does it support dark mode?",
              "Yes. Every color is backed by a light and dark theme token.",
            ],
          ].map(([q, a]) => (
            <AccordionItem key={q}>
              <AccordionHeader>
                <AccordionTrigger>
                  {q}
                  <Plus size={14} />
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Create a project <Plus />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>A fresh start.</DialogTitle>
            <DialogDescription className="mt-2">
              Give your next idea a place to grow.
            </DialogDescription>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setMessage("Project created.");
              }}
              className="mt-6"
            >
              <Label htmlFor={id}>Project name</Label>
              <Input
                id={id}
                required
                placeholder="Something good"
                className="mt-2"
              />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <Button type="submit">Create project</Button>
              </DialogFooter>
              {notice}
            </form>
          </DialogContent>
        </Dialog>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            <SlidersHorizontal />
            Workspace settings
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="text-xl font-medium">
              Make yourself at home.
            </SheetTitle>
            <SheetDescription className="mt-2 text-sm text-muted-foreground">
              Your workspace, your preferences.
            </SheetDescription>
            <div className="my-8">
              <Demo name="switch" />
            </div>
            <SheetClose render={<Button />}>Done</SheetClose>
          </SheetContent>
        </Sheet>
      );
    case "tooltip":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  size="icon"
                  variant="outline"
                  aria-label="Notifications"
                />
              }
            >
              <Bell size={16} />
            </TooltipTrigger>
            <TooltipContent>Your notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            <Bell size={14} />
            What&apos;s new
          </PopoverTrigger>
          <PopoverContent className="max-w-64 p-4">
            <PopoverTitle className="font-medium">
              A quieter workspace.
            </PopoverTitle>
            <PopoverDescription className="mt-2 text-muted-foreground">
              Your components now share the same warm palette.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      );
    case "dropdown-menu":
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              Actions <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Edit project", "Duplicate", "Archive"].map((s) => (
                <DropdownMenuItem
                  key={s}
                  onClick={() => setMessage(s + " selected.")}
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {notice}
        </div>
      );
    case "hover-card":
      return (
        <HoverCard>
          <HoverCardTrigger
            href="https://github.com/chlohal/coal-ui"
            className="underline underline-offset-4"
          >
            Made by Chlohal <ArrowUpRight size={14} />
          </HoverCardTrigger>
          <HoverCardContent className="max-w-60 p-4">
            <strong>Chlohal</strong>
            <p className="mt-2 text-muted-foreground">
              Independent design. Thoughtful components.
            </p>
          </HoverCardContent>
        </HoverCard>
      );
    case "slider":
      return (
        <Slider defaultValue={64} className="max-w-64">
          <div className="mb-4 flex justify-between text-sm">
            <span>Just enough</span>
            <SliderValue />
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Intensity" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      );
    case "number-field":
      return (
        <NumberField defaultValue={3} min={1} max={12}>
          <Label htmlFor={id}>Team members</Label>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Remove member">
              −
            </NumberFieldDecrement>
            <NumberFieldInput id={id} />
            <NumberFieldIncrement aria-label="Add member">
              +
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberField>
      );
    case "toggle":
      return (
        <div className="flex gap-1">
          <Toggle aria-label="Bold">
            <Bold size={16} />
          </Toggle>
          <Toggle aria-label="Italic">
            <Italic size={16} />
          </Toggle>
        </div>
      );
    case "button-group":
      return (
        <div className="text-center">
          <ButtonGroup aria-label="Project actions">
            <Button
              size="sm"
              variant="ghost"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setMessage("Link copied.");
                } catch {
                  setMessage("Copy the address from your browser.");
                }
              }}
            >
              Share
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("Project duplicated.")}
            >
              <Copy />
              Duplicate
            </Button>
          </ButtonGroup>
          {notice}
        </div>
      );
    case "collapsible":
      return (
        <Collapsible className="max-w-64">
          <CollapsibleTrigger className="flex items-center gap-3 text-sm font-medium">
            A few more details <ChevronDown size={14} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            Built with React and Base UI. Styled with Tailwind. Yours to change.
          </CollapsibleContent>
        </Collapsible>
      );
    case "scroll-area":
      return (
        <ScrollArea className="h-36 w-60 rounded-none border">
          <ScrollAreaViewport>
            <ScrollAreaContent className="p-4">
              {[
                "Make it simple.",
                "Make it useful.",
                "Make it personal.",
                "Leave some space.",
                "Mind the details.",
                "Less, but considered.",
                "Make it yours.",
              ].map((s) => (
                <p key={s} className="border-b py-2 text-sm">
                  {s}
                </p>
              ))}
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar>
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollArea>
      );
    case "table":
      return (
        <Table>
          <TableCaption>Recent projects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Studio website", "Published", "Today"],
              ["Brand guidelines", "Draft", "Yesterday"],
              ["Component library", "In review", "Sep 10"],
            ].map(([n, s, d]) => (
              <TableRow key={n}>
                <TableCell>{n}</TableCell>
                <TableCell>
                  <Badge variant={s === "Published" ? "success" : "secondary"}>
                    {s}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {d}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    case "alert":
      return (
        <Alert className="max-w-80">
          <div className="flex gap-3">
            <Check size={16} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">You&apos;re all set.</p>
              <p className="mt-1 text-muted-foreground">
                Your changes have found their place.
              </p>
            </div>
          </div>
        </Alert>
      );
    case "progress":
      return (
        <div className="demo-stack">
          <div className="flex justify-between text-xs">
            <span>Bringing it together</span>
            <span className="font-mono">68%</span>
          </div>
          <Progress value={68} aria-label="Project completion" />
        </div>
      );
    case "spinner":
      return (
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Spinner />
          Taking a moment
        </div>
      );
    case "skeleton":
      return (
        <div className="flex w-64 gap-3">
          <Skeleton className="size-10 shrink-0 rounded-none" />
          <div className="w-full space-y-2 py-1">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      );
    case "empty":
      return files.length ? (
        <div role="status" className="text-sm">
          {files.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </div>
      ) : (
        <Empty className="w-full max-w-72">
          <span className="ember-mark" />
          <p className="font-medium text-foreground">Good things start here.</p>
          <p>Add your first project to get going.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setFiles(["Untitled project"])}
          >
            <Plus />
            New project
          </Button>
        </Empty>
      );
    case "separator":
      return (
        <div className="demo-stack text-sm">
          <p>A little breathing room.</p>
          <Separator />
          <p className="text-muted-foreground">For what comes next.</p>
        </div>
      );
    case "kbd":
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Find your way <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </div>
      );
    case "breadcrumb":
      return (
        <Breadcrumb>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/docs/installation" className="hover:text-foreground">
            Docs
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            Components
          </span>
        </Breadcrumb>
      );
    case "combobox":
      return (
        <div className="demo-stack">
          <Combobox
            items={["Figma", "React", "TypeScript", "Tailwind CSS", "Base UI"]}
          >
            <ComboboxInput
              aria-label="Find a tool"
              placeholder="Find your tool…"
            />
            <ComboboxContent>
              <ComboboxEmpty>No tools found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      );
    case "toast":
      return (
        <ToastProvider>
          <ToastDemo />
        </ToastProvider>
      );
    case "pagination":
      return (
        <div className="text-center">
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
          <p aria-live="polite" className="mt-4 text-xs text-muted-foreground">
            Page {page} of 12
          </p>
        </div>
      );
    case "calendar":
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 8, 1)}
        />
      );
    case "date-picker":
      return (
        <DatePicker
          value={date}
          onValueChange={setDate}
          label="Project deadline"
        />
      );
    case "native-select":
      return (
        <div className="demo-stack">
          <Label htmlFor={id}>Choose a format</Label>
          <NativeSelect id={id} defaultValue="svg">
            <option value="svg">SVG vector</option>
            <option value="png">PNG image</option>
            <option value="pdf">PDF document</option>
          </NativeSelect>
        </div>
      );
    case "aspect-ratio":
      return (
        <AspectRatio
          className="flex w-full max-w-64 items-center justify-center rounded-none bg-secondary"
          ratio={16 / 9}
        >
          <span className="font-mono text-xs text-muted-foreground">
            16 : 9
          </span>
        </AspectRatio>
      );
    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Archive project
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle className="text-lg font-medium">
              Time to put this away?
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-muted-foreground">
              This demo archives nothing. In your app, connect confirmation to
              your archive action.
            </AlertDialogDescription>
            <div className="mt-6 flex justify-end gap-2">
              <AlertDialogClose render={<Button variant="outline" />}>
                Keep it
              </AlertDialogClose>
              <AlertDialogClose render={<Button />}>Archive</AlertDialogClose>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
    default:
      return null;
  }
}
