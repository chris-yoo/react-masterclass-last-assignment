import { useQuery } from "react-query";
import {
  IAPIResponse,
  getComingSoon,
  getPopular,
  makeBgPath,
  makeImagePath,
} from "../api";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import MovieDetail from "../MovieDetail";
import { AiFillCloseCircle } from "react-icons/ai";

interface MovieImgProps {
  bgPhoto: string;
}

const Loading = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  justify-items: center;
`;

const Item = styled(motion.div)`
  width: 200px;
  height: 350px;
`;

const MovieImg = styled(motion.div)<MovieImgProps>`
  width: 100%;
  height: 300px;
  border-radius: 15px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  font-weight: bolder;
`;

const BigMovie = styled(motion.div)`
  width: 500px;
  height: 700px;
  background-color: ${(props) => props.theme.cardColor};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 1;
`;

const CloseIcon = styled.div`
  padding: 5px;
  color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: absolute;
  right: 0;
  font-size: 30px;
`;

const Overay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const movieImageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

function Coming() {
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IAPIResponse>(
    ["movie", "coming"],
    getComingSoon
  );
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/coming-soon/${movieId}`);
  };
  const bigMovieClick = () => {
    navigate("/coming-soon");
  };
  const movieMatch = useMatch("/coming-soon/:movieId");

  return (
    <>
      <Wrapper>
        <AnimatePresence>
          {!isLoading &&
            data?.results.map((movie, index) => (
              <Item
                key={movie.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieImg
                  layoutId={movie.id + ""}
                  onClick={() => onBoxClicked(movie.id)}
                  variants={movieImageVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  bgPhoto={makeBgPath(movie.poster_path || "")}
                />
                <Title>{movie.title}</Title>
              </Item>
            ))}
        </AnimatePresence>
      </Wrapper>
      <AnimatePresence>
        {movieMatch ? (
          <>
            <Overay animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={movieMatch.params.movieId}
              transition={{ type: "tween" }}
            >
              <CloseIcon onClick={bigMovieClick}>
                <AiFillCloseCircle />
              </CloseIcon>
              <MovieDetail id={movieMatch.params.movieId + ""}></MovieDetail>
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Coming;
