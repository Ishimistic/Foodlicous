import styled from "styled-components";
import { Rating } from "@mui/material";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  width: 100%;
  padding: 12px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justigy-content: center;
`;
const Image = styled.img`
  height: 600px;
  border-radius: 12px;
  @media (max-width: 750px) {
    height: 400px;
  }
`;
const Details = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
  flex: 1;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};

`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({theme}) => theme.text_second};
`;
const Percent = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   font-size: 22px;
   font-weight: 500;
  color: ${({ theme }) => theme.text_primary};

`;

function ProductDetails() {
  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image src="https://img.freepik.com/premium-photo/huge-selection-peeroni-pizza-with-tomato-sauce-sausage-dark-table_124507-61025.jpg" />
        </ImageWrapper>
        <Details>
          <div>
            <Title>Title</Title>
            <Name>Name</Name>
          </div>
          <Rating value={3.5} />
          <Price>
            $12 <Span>$20</Span>
            <Percent>40% off</Percent>
          </Price>
          <Desc>Product Description: </Desc>
        </Details>
      </Wrapper>
    </Container>
  );
}

export default ProductDetails;
