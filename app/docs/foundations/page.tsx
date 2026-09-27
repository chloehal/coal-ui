import { FoundationsPreview } from "@/components/catalog/foundations-preview";
export default function Foundations() {
  return (
    <article className="docs-page">
      <div className="eyebrow">FOUNDATIONS / COAL RULES</div>
      <h1>
        Précise. Calme.
        <br />
        Reconnaissable<span className="text-brand">.</span>
      </h1>
      <p className="docs-lead">
        Coal prend les décisions récurrentes : des angles droits, du papier et
        du charbon, un repère cuivre, une typographie Plex et cinq intentions
        communes.
      </p>
      <h2>La typographie</h2>
      <p>
        IBM Plex Sans pour les textes et les contrôles. IBM Plex Mono pour le
        code, les identifiants et les raccourcis. Les polices sont locales et
        optionnelles ; aucun appel à Google Fonts.
      </p>
      <div className="border p-6">
        <p style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 600 }}>
          Le détail fait la différence.
        </p>
        <p className="mt-3 text-base">
          Un projet, une équipe, une prochaine étape.
        </p>
        <p className="mt-3 font-mono text-sm">COAL-0042 · ⌘ K · 0123456789</p>
      </div>
      <pre>
        <code>
          {
            'import "@chlohal/coal-ui/styles.css";\nimport "@chlohal/coal-ui/fonts.css"; // optionnel\n\n// Pour les textes de votre application :\n// body { font-family: var(--coal-font-sans); }'
          }
        </code>
      </pre>
      <p>
        Texte courant 16 px ; contrôles et tableaux 14 px ; métadonnées 12 px
        minimum. Graisses 400, 500 et 600. Titres 20, 24 et 32 px. Les valeurs
        numériques utilisent des chiffres tabulaires.
      </p>
      <h2>La couleur porte un rôle</h2>
      <p>
        Papier pour le fond, cendre pour les surfaces secondaires, charbon pour
        le texte et l’action principale. Le cuivre signale une sélection ou un
        repère de marque. Il ne signifie ni succès ni avertissement.
      </p>
      <p>
        Chaque intention dispose de tokens texte, fond, bordure, couleur pleine
        et texte sur couleur pleine : par exemple --coal-warning-text,
        --coal-warning-bg, --coal-warning-border, --coal-warning-solid et
        --coal-warning-on-solid. Les valeurs claires et sombres sont distinctes
        et leurs contrastes de texte sont testés.
      </p>
      <p>
        Un libellé reste obligatoire pour expliquer un statut. « En attente »
        est neutre ; l’ambre apparaît lorsqu’une intervention est nécessaire.
        Les symboles complètent la couleur.
      </p>
      <pre>
        <code>
          {
            '<Badge intent="success">Enregistré</Badge>\n<Alert intent="warning">Votre espace est presque plein.</Alert>\ntoast.add({ intent: "danger", title: "Enregistrement impossible" });'
          }
        </code>
      </pre>
      <FoundationsPreview />
      <h2>Les règles de mouvement</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Interaction</th>
            <th className="text-left">Règle</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Survol", "Couleur uniquement · 120 ms"],
            ["Pression et focus", "Réponse immédiate"],
            ["Menu / popover / tooltip", "4 px + opacité · 160 ms"],
            ["Dialog", "8 px + opacité · 200 ms"],
            ["Sheet", "Depuis le bord · 240 ms"],
            ["Fermeture des overlays", "140 ms"],
            [
              "Mouvement réduit",
              "Transitions supprimées, indicateur de chargement statique",
            ],
          ].map(([a, b]) => (
            <tr key={a}>
              <td className="py-2">{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Une courbe de décélération commune, aucun rebond, aucune carte qui
        grossit au survol. La réouverture interrompt une fermeture en cours. Le
        chargement ne bloque pas la mise à jour de l’état. Les notifications se
        ferment immédiatement à la demande.
      </p>
      <h2>Les règles d’usage</h2>
      <ul>
        <li>
          Une action principale par zone. Employer un verbe précis :
          Enregistrer, Inviter, Supprimer.
        </li>
        <li>
          Label visible pour chaque champ. Valider à la sortie ou à l’envoi ;
          conserver la saisie en cas d’échec.
        </li>
        <li>
          Erreur de champ sous le champ ; problème local dans une alerte ;
          confirmation brève dans un toast.
        </li>
        <li>
          Les toasts warning et danger persistent par défaut. timeout: 0 rend
          toute notification persistante ; une durée explicite remplace le
          défaut.
        </li>
        <li>
          Prévoir les états chargement, vide, erreur, désactivé, sélectionné et
          focus. Ne pas afficher un toast pour chaque interaction.
        </li>
        <li>
          Grille d’espacement de 4 px. Contrôles confortables de 40 px, compacts
          de 32 px ; 44 px pour les principaux contrôles tactiles.
        </li>
        <li>
          Mettre <code>data-coal-density=&quot;compact&quot;</code> sur html
          pour inclure aussi les overlays portalisés. La classe coal-theme
          permet de limiter la densité à une section.
        </li>
        <li>
          Le mode sombre change les valeurs des tokens, jamais leur
          signification.
        </li>
      </ul>
      <p className="doc-note">
        Les composants appliquent les états visuels et comportements partagés.
        Le choix des libellés, les règles de validation métier et la
        conservation des données restent sous le contrôle de votre application.
      </p>
    </article>
  );
}
