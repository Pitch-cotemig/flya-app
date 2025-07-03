import styled from "styled-components";

export const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("/images/4k-praia 1.png");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const HeroForm = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;

  width: 100%;
`;

export const HeroInput = styled.input`
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #666;
  }
`;

export const HeroButton = styled.button`
  background: #00bcd4;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #00acc1;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 188, 212, 0.3);
  }
`;
