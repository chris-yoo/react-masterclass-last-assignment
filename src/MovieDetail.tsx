import { useQuery } from "react-query";
import { getMovie, makeBgPath } from "./api";
import styled from "styled-components";
import { motion } from "framer-motion";

const BigImage = styled(motion.div)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${(props) => props.theme.textColor};

  span {
    padding-left: 20px;
    padding-right: 20px;
  }

  span:first-child {
    font-size: 30px;
    font-weight: bolder;
    margin-bottom: 20px;
  }
  span:nth-child(2) {
    padding: 20px;
  }
`;

const Loading = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

function MovieDetail({ id }: { id: string }) {
  const { data, isLoading } = useQuery(["id", "movie"], () => getMovie(id));
  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <BigImage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, type: "tween" }}
            style={{
              backgroundImage: `linear-gradient(rgba(31, 65, 114, 0), rgba(31, 65, 114, 1)),url(${makeBgPath(
                data.backdrop_path
              )})`,
            }}
          ></BigImage>
          <Description>
            <span>{data.title}</span>
            <span>{data.overview}</span>
            <span>{`Budget: $${data.budget}`}</span>
            <span>{`Revenue: $${data.revenu}`}</span>
            <span>{`Runtime: ${data.runtime} minutes`}</span>
            <span>{`Rating: ${data.vote_average}`}</span>
            <span>{`Homepage: ${data.homepage}`}</span>
          </Description>
        </>
      )}
    </>
  );
}

export default MovieDetail;
