export async function selectBackgroundMood() {
  console.log("Selecting background mood...");

  const moods = [
    "Soft daylight across a clean desk surface",
    "Neutral home workspace with natural window light",
    "Simple wooden table in indirect morning light",
    "Organized planner on a light, uncluttered surface",
    "Minimal kitchen counter with soft ambient light",
    "Quiet home office corner with neutral tones",
    "Sunlight diffused through sheer curtains",
    "Calm interior wall with slow-moving natural shadows",
    "Open notebook on a tidy table in daylight",
    "Still workspace with a mug and soft background blur",
    "Neutral shelf with a few neatly arranged objects",
    "Soft light across a blank journal page",
    "Minimal tabletop with gentle shadow movement",
    "Clean surface with natural light fading slowly",
    "Simple chair near a window with indirect light",
    "Neutral room corner with balanced light and shadow",
    "Uncluttered countertop with soft daylight",
    "Light-colored wall with subtle shadow drift",
    "Quiet morning light across a wooden floor",
    "Organized desktop with calm, even lighting",
    "Neutral background with slow ambient light change",
    "Simple indoor plant beside a window in daylight",
    "Tidy workspace viewed slightly out of focus",
    "Clean tabletop with a notebook and pen",
    "Soft afternoon light filling a quiet room",
    "Minimal interior with warm, natural tones",
    "Blank page on a desk with diffused light",
    "Still room with gentle daylight and no motion",
    "Balanced interior scene with neutral colors",
    "Simple home workspace prepared for the day"
  ];

  // Logic: Randomly select one item from the array
  const randomIndex = Math.floor(Math.random() * moods.length);
  const selectedMood = moods[randomIndex];

  console.log(`Mood Selected: "${selectedMood}"`);

  return selectedMood;
}
