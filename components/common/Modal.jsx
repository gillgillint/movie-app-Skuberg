import styled from '@emotion/styled';

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: transform 0.6s ease, opacity 0.6s ease;

  padding: 2rem;
  background-color:#0f0f0f;
  width: 50%;
  border-radius: 12px;

  @media screen and(max-width: 900px) {
    width: 80%;
  }

  &:hover {
    color: #000;
  }
`;

export default ModalContent;
