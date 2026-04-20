// src/lib/sound.js
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let beepSound = null;

// Accept a callback so we know when loading is done
export const loadBeep = onLoaded => {
  beepSound = new Sound('beep.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Failed to load sound:', error);
      return;
    }
    console.log('Sound loaded successfully');
    if (onLoaded) onLoaded(); // ← call this when ready
  });
};

export const playBeep = () => {
  if (!beepSound) {
    console.log('Sound not loaded yet');
    return;
  }
  beepSound.stop(() => {
    beepSound.play(success => {
      if (!success) {
        console.log('Playback failed');
      }
    });
  });
};

export const releaseBeep = () => {
  if (beepSound) {
    beepSound.release();
    beepSound = null;
  }
};
