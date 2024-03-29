import { css } from 'styled-components';

const DarkLightStyle = css`

  /**
    * Dark button
    */

      .dark-button {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -3px;
        background-color: rgb(255, 255, 255);

        &:before,
        &:after {
          box-sizing: border-box;
        }

        label {
          position: relative;
          display: block;
          width: 45px;
          height: 25px;
          border-radius: 100px;
          background-color: rgb(37, 37, 37);
          overflow: hidden;
          cursor: pointer;

          &:before,
          &:after {
            display: block;
            position: absolute;
            content: "";
            width: 19px;
            height: 19px;
            border-radius: 50%;
            top: 3px;
            left: 3px;
            transition: 0.4s ease;
          }

          &:before {
            background-color: rgb(255, 255, 255);
          }

          &:after {
            background-color: rgb(37, 37, 37);
            left: -58px;
            transform: scale(0.00001);
          }
        }

        input[type="checkbox"] {
          display: none;

          &:checked + label {
            &:before {
              background-color: rgb(1, 219, 198);
              transform: translateX(20px);
            }

            &:after {
              transform: translateX(75px) scale(1);
            }
          }
        }


  /**
    * Light mode styles
    */

`;

export default DarkLightStyle;
