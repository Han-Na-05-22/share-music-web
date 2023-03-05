import styled from "styled-components";

export const PlayListContainer = styled.div`
  border: 2px solid red;
  width: 100%;
  height: 100%;

  .paly-list-container {
    width: 100%;
    height: 100%;

    strong {
      border: 3px solid red;
      color: #000;
    }

    .rhap_container {
      border: 3px solid red;

      .rhap_main.rhap_stacked {
        .rhap_controls-section {
          border: 2px solid blue;

          .rhap_additional-controls {
            border: 1px solid #000;
            color: #000;
            background: #000;
          }
          .rhap_main-controls {
            border: 1px solid #000;

            button {
              background: #000;
            }
          }
          .rhap_volume-controls {
            border: 1px solid #000;
            background: #000;
          }
        }
      }
    }
  }
`;
