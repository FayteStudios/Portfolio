// Hand-written serializer for the fixed sprite manifest shape, matching the
// output of the desktop editor's append_yaml_entry() (PyYAML, block style).
(function () {
  "use strict";

  function serializeManifest(sprites) {
    if (!sprites.length) {
      return "sprites: []\n";
    }

    let out = "sprites:\n";
    for (const sprite of sprites) {
      out += `- name: ${sprite.name}\n`;
      out += `  pixels:\n`;
      out += `    width: ${sprite.width}\n`;
      out += `    height: ${sprite.height}\n`;
      out += `  anchor:\n`;
      out += `    x: ${sprite.anchorX}\n`;
      out += `    y: ${sprite.anchorY}\n`;
    }
    return out;
  }

  window.SpriteWarpYaml = { serializeManifest };
})();
