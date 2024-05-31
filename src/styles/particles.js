import Particles from 'react-tsparticles';
import React, { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import { loadSlim } from "tsparticles-slim";

const Particle = () => {

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);


  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  
  return( 
   <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      width="100%"
      height="100%"
      options={{
          fps_limit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: false,
            },
            modes: {
              grab: {
                distance: 200,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 868.0624057955,
              },
            },
            color: {
              value: '#2c75ff',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: 'img/github.svg',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#03224c',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          retina_detect: true,
      }}
      style={{
        backgroundColor: 'transparent',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    />
  );
}

export default Particle;
