precision mediump float;
        uniform sampler2D map;
        uniform sampler2D alphaMap;
        uniform vec3 tipColor;
        uniform vec3 bottomColor;
        varying vec2 vUv;
        varying float frc;

        void main() {
          float alpha = texture2D(alphaMap, vUv).r; // Default to 1.0 if no alphaMap
          if (alpha < 0.15) discard;
          vec4 col = texture2D(map, vUv); // Default to white if no map
          col = mix(vec4(tipColor, 1.0), col, frc);
          col = mix(vec4(bottomColor, 1.0), col, frc); // Fixed typo
          gl_FragColor = col;
        }