# Meridian OS design system

## Direction

Meridian OS is a precise operational instrument: true-white working canvas, cool-gray navigation rails, near-black typography, and a single cobalt action spine connecting agent intent to business effect. The interface is open and list-led rather than card-led.

## Tokens

| Role | Value |
|---|---|
| Canvas | `#ffffff` |
| Rail | `#f7f8fa` |
| Subtle surface | `#f3f5f8` |
| Ink | `#15171a` |
| Muted ink | `#667085` |
| Border | `#d9dee7` |
| Cobalt | `#155eef` |
| Cobalt soft | `#eaf1ff` |
| Success | `#079455` |
| Warning | `#b54708` |

UI chrome uses Inter with system fallbacks at 12–14px. Conversation text uses the same family at 14–16px with more line height. Corners are 8px for controls and 10px for action surfaces. Shadows are reserved for the sticky composer only.

## Layout

Desktop uses a 208px product rail, 248px conversation rail, flexible conversation canvas, and 300px context inspector. The central content column is capped at 680px inside its canvas. Under 1100px the inspector disappears; under 760px both rails collapse into a compact header.

## Signature

The cobalt action spine is a 2px vertical rule with circular nodes connecting model responses, tool reads, approval gates, and downstream work. It appears in chat and automation workflows, making agent causality visible without decorative diagrams.

## Components

Product navigation, conversation rows, message blocks, tool call rows, approval surface, prompt composer, context sections, workflow step rows, inspector fields, and activity rows share one border, type, radius, and focus treatment. Icons are simple 1.75px outline SVGs with round joins.
