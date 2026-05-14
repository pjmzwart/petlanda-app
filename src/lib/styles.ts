export const PET_STYLES = [
  {
    id: 'royal',
    name: 'Royal Pet',
    prompt: 'Maak van dit huisdier een koninklijk portret met luxe kleding, warme studioverlichting, rijke details, premium digitale kunst. Behoud herkenbare kenmerken van het huisdier.'
  },
  {
    id: 'astronaut',
    name: 'Astronaut',
    prompt: 'Maak van dit huisdier een schattige astronaut in een ruimtepak, filmische ruimte-achtergrond, hoogwaardige digitale kunst. Behoud herkenbare kenmerken van het huisdier.'
  },
  {
    id: 'superhero',
    name: 'Superheld',
    prompt: 'Maak van dit huisdier een stoere superheld met cape, dramatische belichting, vrolijke premium posterstijl. Behoud herkenbare kenmerken van het huisdier.'
  },
  {
    id: 'oilpainting',
    name: 'Klassiek schilderij',
    prompt: 'Maak van dit huisdier een klassiek olieverfschilderij in museumstijl, verfijnde penseelstreken, chique achtergrond. Behoud herkenbare kenmerken van het huisdier.'
  },
  {
    id: 'christmas',
    name: 'Kerstkaart',
    prompt: 'Maak van dit huisdier een gezellige kerstkaart met warme lichtjes, sneeuw, zachte feestelijke sfeer, premium illustratie. Behoud herkenbare kenmerken van het huisdier.'
  }
];

export function getStylePrompt(styleId: string) {
  return PET_STYLES.find((style) => style.id === styleId)?.prompt ?? PET_STYLES[0].prompt;
}
