/* ═══════════════════════════════════════════════════════════
    OLD CUSTOM LIGHT BUTTON
══════════════════════════════════════════════════════════════ */

// const { css } = require('styled-components');

// const Light = css`
//   /**
//     * Light button
//     */

//   .light-button i {
//     box-sizing: border-box;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-top: -3px;
//     background-color: rgb(255, 255, 255);

//     &:before,
//     &:after {
//       box-sizing: border-box;
//     }

//     label {
//       position: relative;
//       display: block;
//       width: 45px;
//       height: 25px;
//       border-radius: 100px;
//       background-color: rgb(220, 220, 220); /* Fond gris clair pour le mode light */
//       overflow: hidden;
//       cursor: pointer;

//       &:before,
//       &:after {
//         display: block;
//         position: absolute;
//         content: '';
//         width: 19px;
//         height: 19px;
//         border-radius: 50%;
//         top: 3px;
//         left: 3px;
//         transition: 0.4s ease;
//       }

//       &:before {
//         background-color: rgb(255, 255, 255); /* Cercle blanc */
//       }

//       &:after {
//         background-color: rgb(220, 220, 220); /* Fond gris clair */
//         left: -58px;
//         transform: scale(0.00001);
//       }
//     }

//     input[type='checkbox'] {
//       display: none;

//       &:checked + label {
//         background-color: rgb(220, 220, 220); /* Fond gris clair quand activé */

//         &:before {
//           background-color: rgb(1, 219, 198); /* Cercle vert/bleu quand activé */
//           transform: translateX(20px);
//         }

//         &:after {
//           transform: translateX(75px) scale(1);
//         }
//       }
//     }
//   }
// `;

// module.exports = Light;
