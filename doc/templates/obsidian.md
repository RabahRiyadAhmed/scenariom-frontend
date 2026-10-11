# Scenariom — Text Editor Design

## Purpose

This design describes the **Scenariom text editing workspace**.

The interface takes inspiration from tools such as **Obsidian**, VS Code and modern knowledge editors.

Obsidian is a **layout and interaction reference**, not a color reference.

Scenariom colors and design tokens always have priority.

---

# Main Principle

The editor must feel like a workspace.

The document being edited is the most important element.

Navigation and tools must remain visible without taking too much space.

The interface should support:

* writing
* Markdown
* rich text
* document properties
* document relations
* folders
* tabs
* search
* graph / relations
* optional secondary panels

---

# Global Layout

Desktop layout:

```text
┌────┬──────────────┬─────────────────────────────────┬──────────────────┐
│Rail│ File Browser │        Main Editor              │ Secondary Panel  │
│    │              │                                 │                  │
│    │              │                                 │                  │
│    │              │                                 │                  │
└────┴──────────────┴─────────────────────────────────┴──────────────────┘
```

Approximate dimensions:

```text
App rail:          48–56px
File sidebar:      220–300px
Main editor:       flexible / remaining space
Secondary panel:   280–400px
```

The main editor always receives the largest available area.

---

# 1. Application Rail

A narrow vertical toolbar placed on the far left.

Contains global actions such as:

* Files
* Search
* Relations / Graph
* Templates
* History
* Plugins / Tools
* Settings

Icons only by default.

Tooltips appear on hover.

Active tool receives a subtle highlighted background.

Do not use large buttons here.

---

# 2. File Sidebar

Displays the current project / universe files.

Example:

```text
SCENARIOM

World
  Characters
  Locations
  Factions

Story
  Chapter 01
  Chapter 02

Notes
  Ideas
  Research
```

Header can contain:

```text
Project name

[New document]
[New folder]
[Sort]
[More]
```

Rows should be compact.

Recommended height:

```text
28–34px
```

Supported states:

* normal
* hover
* selected
* focused
* dragging
* renamed

Folders can collapse.

The sidebar itself can also collapse.

---

# 3. Tabs

Documents open inside tabs.

Example:

```text
Character — Emma      Chapter 03      World Notes
```

A tab contains:

* optional icon
* document name
* dirty / modified state
* close button

Tabs should look lightweight.

Avoid browser-style oversized tabs.

Tabs may represent different views:

```text
Emma.md

Editor
Preview
Relations
History
```

---

# 4. Main Editor

The editor is the visual priority.

The writing column should not always occupy the complete screen width.

Recommended readable text width:

```text
680–900px
```

The editor canvas can remain larger while the actual document content stays centered.

Example:

```text
                 Character — Emma

                 ## Background

                 Emma grew up...

                 ## Personality

                 ...
```

The editor should support:

* headings
* paragraphs
* bold
* italic
* links
* quotes
* code
* lists
* checklists
* tables
* callouts
* images
* references to Scenariom entities

---

# 5. Editor Toolbar

The editor should not look like Microsoft Word.

Keep the toolbar minimal.

Possible actions:

```text
Text
Heading
Bold
Italic
Link
List
Quote
Code
Insert
```

Advanced actions may appear through `/` commands.

Example:

```text
/
```

opens:

```text
Heading
Character
Location
Image
Timeline event
Scene
Callout
Table
Relation
```

---

# 6. Document Header

Above the document content:

```text
Character

Emma Silverwind

Status: Active
Type: Character
Universe: Example World
```

The header may contain structured Scenariom information without mixing it directly with the document body.

Possible controls:

```text
Properties
Relations
History
More
```

---

# 7. Properties

Properties behave similarly to metadata/frontmatter.

Example:

```text
Type          Character
Status        Alive
Age           24
Location      North City
Faction       Silver Guard
```

Properties can appear:

* above the document
* inside a collapsible panel
* in the right sidebar

Do not permanently occupy editor space when unused.

---

# 8. Secondary Panel

The right panel is contextual.

It may display:

```text
Properties
Outline
Relations
Backlinks
Comments
History
Graph
AI tools
```

Only one or a few tools should normally be visible at once.

The panel must be collapsible.

The editor must continue working perfectly when this panel is hidden.

---

# 9. Graph View

Inspired by knowledge graph tools such as Obsidian.

Nodes represent entities or documents.

Example:

```text
Emma
 ├── North City
 ├── Silver Guard
 └── Chapter 04
```

Relations should use Scenariom semantic data when available.

The graph is a secondary visualization.

It must never become necessary to write a document.

---

# 10. Split View

Users may open two views side by side.

Example:

```text
┌───────────────────────┬───────────────────────┐
│ Chapter Editor        │ Emma Character Sheet  │
│                       │                       │
│ Emma enters...        │ Age: 24               │
│                       │ Location: North City   │
└───────────────────────┴───────────────────────┘
```

Possible combinations:

* editor + editor
* editor + preview
* editor + character
* editor + graph
* editor + timeline
* editor + references

---

# Visual Direction

The interface should feel:

* calm
* dense but readable
* professional
* modular
* focused on creation

Reference families:

* Obsidian → workspace organization
* VS Code → panels and tabs
* Notion → content editing simplicity
* Figma → contextual panels

Do not reproduce their branding.

---

# Scenariom Colors

External references must **never override Scenariom colors**.

Preferred identity direction:

```text
Dark navy / dark blue
Graphite gray
Metallic / silver gray
White / soft white
Blue accent
Optional violet-blue secondary accent
```

Dark mode should use several surface levels instead of pure black everywhere.

Example hierarchy:

```text
Background
Surface 1
Surface 2
Surface 3
Border
Muted text
Primary text
Accent
```

Exact values must come from the global Scenariom design tokens.

---

# Tailwind Semantic Tokens

Components should use semantic tokens.

Avoid writing arbitrary colors directly inside components.

Prefer:

```text
bg-background
bg-sidebar
bg-panel
bg-surface
bg-surface-hover

text-foreground
text-muted-foreground

border-border

bg-primary
text-primary
```

Instead of:

```text
bg-[#202020]
text-[#aaaaaa]
```

The design theme must therefore be replaceable without rewriting components.

---

# Component References

Recommended primitives:

```text
AppShell
AppRail
Sidebar
SidebarHeader
FileTree
FileTreeItem
Tabs
Tab
EditorHeader
Editor
EditorToolbar
PropertiesPanel
RightPanel
PanelTabs
ResizablePanel
CommandMenu
ContextMenu
Tooltip
Popover
Dialog
DropdownMenu
ScrollArea
Separator
```

When using shadcn/ui, prefer existing primitives before creating custom equivalents.

---

# Important Rule

This design describes an **editing application**, not a presentation page.

Do not reuse the layout of:

* Scenariom homepage
* marketing pages
* universe presentation pages
* store pages

The text editor belongs to the **creator workspace**.

Its layout and interaction rules are independent from public-facing pages.

Only shared global design tokens such as colors, typography and basic UI primitives should be reused.
