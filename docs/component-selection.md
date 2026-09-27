# Tri de l’inventaire proposé

Le nombre de previews n’est pas un critère de priorité. Un ajout doit servir plusieurs types de projets, avoir un rôle distinct, rester cohérent avec Coal et pouvoir être testé comme composant indépendant. Aucun composant n’est importé d’une autre bibliothèque.

## Implémentés : 12 ajouts, 55 composants au total

| Ajout | Pourquoi | Périmètre |
|---|---|---|
| Data Table | Écrans de gestion omniprésents | Tri numérique/texte, filtre, sélection, pagination locale |
| Command | Accès rapide aux actions | Recherche, clavier, choix désactivés ; composable avec Dialog |
| Input Group | Préfixes et unités sans bricoler chaque formulaire | Conteneur, addons, focus commun |
| Chip | Tags pouvant être retirés | Libellé et suppression accessible |
| Toggle Group | Petites sélections finies | Choix unique/multiple et déplacement clavier |
| Steps | Progression de formulaires | Liste ordonnée et étape actuelle |
| Timeline | Historique d’activité | Liste chronologique et dates sémantiques |
| Copyable Value | Identifiants et valeurs techniques | Copie, annonce, repli manuel |
| Time Picker | Rendez-vous et horaires | Contrôle natif, bornes, précision, formulaires |
| Attachment | Joindre un fichier | Sélection, limites taille/type, suppression ; sans transport réseau |
| Color Picker | Personnalisation simple | Couleur opaque native, sans éditeur de palette |
| Action Bar | Actions sur une sélection | Compteur, actions, remise à zéro |

## Déjà couverts

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Checkbox, Collapsible, Combobox, Date Picker, Dialog, Dropdown Menu, Empty, Field, Hover Card, Input, Kbd, Label, Native Select, Pagination, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Skeleton, Slider, Spinner, Switch, Table, Tabs, Textarea, Toggle, Tooltip. Coal comprend aussi Number Field et Toast.

## Fusionnés ou composés

- Divider = Separator ; Drawer = Sheet ; Sonner = Toast.
- Loading = Spinner/Skeleton ; Shimmer = Skeleton ; Segment = Toggle Group/Tabs.
- Mini Calendar = Calendar ; Dot = Badge ; Tile Button = Button.
- File = Attachment pour la sélection ; Filter et View Toolbar = Input Group/Data Table/Action Bar pour les cas simples.
- Count, Counting Number et Time : formatage de nombres/dates dans l’application, sans animation imposée.
- Item, List, Page, Panel, Document Shell, Record Shell : HTML sémantique et Card ; pas de wrappers sans comportement utile.
- UI Fields, Form Inputs et Controls : catégories de catalogue, pas des composants.
- App et Fun : regroupements, pas des primitives.

## Réservés à un prochain périmètre précis

Actionnable mais non implémenté : App Shell, Sidebar, Navigation Menu, Menubar, Context Menu, Tree, Input OTP, Input Mask, Mention, Resizable/ResizeHandle/GripBar, Drag and Drop/Reorder/Sortable, Carousel, Tour, DateTimePicker. Les doublons de déplacement et redimensionnement seront une seule famille. Ces interactions méritent des tests propres (clavier, tactile, focus, validation).

## Modules spécialisés, hors socle

- IA/messagerie : AI, Assistant, Chain of Thought, Conversation, Prompt Input, Bubble, Message, Message Scroller, Comments, Reacji, Feed, Mail.
- Édition et documents : Annotation, Document Editor, Tiptap Editor, Document Preview, PDF Embed, Signature, Questionnaire, Hero Composer.
- Données et outils : Chart, Map, Marker, QR Code, Compare Slider, Event Calendar, Folder, Record, Inspector, Layers, Sharing.
- Médias et composition : Surface Media, Thumbnail, Preview Rail, Scroll Fade.
- Métier et workflows : Automation Editor, CadenceEditor, Board, Flow, Schema Visualizer, Workflow action bar, Workflow asides, Workflow authoring data, Workflow history, Workflow node, Workflow visualizer, Workspace Playground.

Ces éléments ne sont pas présentés comme terminés. Certains deviendront des exemples d’application, d’autres des packages optionnels. Une bibliothèque n’a pas besoin d’exposer chaque nom d’un catalogue tiers pour être utilisable.
