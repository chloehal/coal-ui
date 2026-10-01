import { build } from "esbuild";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
const dir = mkdtempSync(path.resolve(".consumer-"));
try {
  const target = dir + "/node_modules/@chlohal/coal-ui";
  mkdirSync(target, { recursive: true });
  execFileSync("tar", [
    "-xzf",
    "public/downloads/chlohal-coal-ui-0.5.0.tgz",
    "--strip-components=1",
    "-C",
    target,
  ]);
  writeFileSync(
    dir + "/app.tsx",
    `import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Button,Input,Checkbox,Switch,TimePicker,ColorPicker,NativeSelect,Calendar,Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@chlohal/coal-ui';
import '@chlohal/coal-ui/styles.css';
import '@chlohal/coal-ui/fonts.css';
function App(){const [date,setDate]=React.useState(new Date(2028,1,29));return <main style={{fontFamily:'sans-serif',padding:24,maxWidth:600}}><h1>Coal — plain React consumer</h1><p>Installed archive. No Next.js, Tailwind or UI dependency.</p><Button>Soft button</Button><label>Email<Input type="email" /></label><form><label><Checkbox defaultChecked/>Accept</label><label><Switch defaultChecked/>Notifications</label><label htmlFor="smoke-meeting">Meeting</label><TimePicker id="smoke-meeting" name="meeting" defaultValue="09:30"/><label htmlFor="smoke-accent">Accent</label><ColorPicker id="smoke-accent" name="accent" defaultValue="#756887"/><label htmlFor="smoke-format">Format</label><NativeSelect id="smoke-format" name="format" defaultValue="svg"><option value="svg">SVG</option><option value="png">PNG</option></NativeSelect><button type="reset">Reset form</button></form><Calendar selected={date} onSelect={setDate} disabled={d=>d.getDay()===0}/><output>{date?.toLocaleDateString('en-GB')}</output><Dialog><DialogTrigger>Open settings</DialogTrigger><DialogContent><DialogTitle>Settings</DialogTitle><DialogDescription>Native dialog with nested selection.</DialogDescription><Select defaultValue="solo" items={{solo:'Solo',team:'Team'}}><SelectTrigger aria-label="Plan"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="solo">Solo</SelectItem><SelectItem value="team">Team</SelectItem></SelectContent></Select><Button>Last action</Button></DialogContent></Dialog></main>};createRoot(document.getElementById('root')).render(<App/>);`,
  );
  await build({
    entryPoints: [dir + "/app.tsx"],
    outdir: "public/package-smoke",
    bundle: true,
    minify: true,
    format: "esm",
    define: { "process.env.NODE_ENV": '"production"' },
    jsx: "automatic",
    loader: { ".woff2": "file" },
  });
  writeFileSync(
    "public/package-smoke/index.html",
    '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Coal package consumer</title><link rel="stylesheet" href="./app.css"><body><div id="root"></div><script type="module" src="./app.js"></script></body></html>',
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}
