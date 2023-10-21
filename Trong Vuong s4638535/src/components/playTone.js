import {
  guitar,
  piano,
  horn,
  drum,
} from "../music/playNotes";

export const PlayTone = ({ instrument, note, tO}) => {
  const now = tO.now();
  console.log(`Playing ${instrument} note ${note}`);
  switch (instrument) {
    case "guitar":
      guitar.triggerAttackRelease(`${note}3`, "8n");
      break;
    case "piano":
      piano.triggerAttackRelease(`${note}3`, "8n", now);
      break;
    case "french horn":
      horn.triggerAttackRelease(`${note}3`, "8n", now);
      break;
    case "drums":
      drum.triggerAttackRelease(`${note}3`, "8n", now);
      break;
    default:
      piano.triggerAttackRelease(`${note}3`, "8n", now);
  }
};
