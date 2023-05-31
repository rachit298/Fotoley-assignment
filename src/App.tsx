import Grid from "@mui/material/Grid";
import "./App.css";
import data from "./Data/Data";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Card, CardMedia } from "@mui/material";

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (autoplay) {
      timer = setTimeout(() => {
        handleNext();
      }, 3000);
      timer;
    }

    return () => {
      if (autoplay) {
        clearTimeout(timer);
      }
    };
  }, [autoplay,activeIndex]);

  function changeActive(index: number) {
    setActiveIndex(index);
  }

  function handlePrev() {
    setActiveIndex((oldIndex) =>
      oldIndex === 0 ? data.length - 1 : oldIndex - 1
    );
  }

  function handleNext() {
    setActiveIndex((oldIndex) =>
      oldIndex === data.length - 1 ? 0 : oldIndex + 1
    );
  }

  function handleAutoplay() {
    setAutoplay(!autoplay);
  }

  return (
    <>
      <Grid p={5} pt={4}>
        <Grid
          item
          container
          rowSpacing={{ xs: 2, lg: 5 }}
          columnSpacing={{ xs: 2, lg: 4 }}
        >
          <Grid
            item
            xs={12}
            lg={7}
          >
            <Box maxWidth={1126} maxHeight={768}>
              <Box width="100%" height={0} paddingTop="60%" position="relative">
                <img
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "50px",
                  }}
                  src={data[activeIndex].imageSrc}
                  alt="image"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <div style={{ fontSize: "50px", color: "#707070" }}>
              Random Text {activeIndex + 1}
            </div>
            <p style={{ fontSize: "16px", color: "#B4B3B3" }}>
              {data[activeIndex].text}
            </p>
          </Grid>
          <Grid
            item
            xs={12}
            lg={7}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              container
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <span onClick={handlePrev} className="prev-arrow"></span>
              {data.map((_, index) => (
                <Grid
                  item
                  maxHeight="171px"
                  maxWidth="205px"
                  xs={2}
                  key={index}
                >
                  <Card
                    elevation={0}
                    onClick={() => changeActive(index)}
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      objectFit: "cover",
                      filter:
                        activeIndex === index
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                      WebkitFilter:
                        activeIndex === index
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      width="100%"
                      image={data[index].imageSrc}
                      alt="image"
                    />
                  </Card>
                </Grid>
              ))}
              <span onClick={handleNext} className="next-arrow"></span>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            xs={12}
            lg={5}
          >
            <div onClick={handleAutoplay} className="play-pause-btn">
              {autoplay ? (
                <div>
                  <span
                    style={{
                      left: "40%",
                    }}
                    className="pause1-button"
                  ></span>
                  <span
                    style={{
                      left: "60%",
                    }}
                    className="pause2-button"
                  ></span>
                </div>
              ) : (
                <span className="play-button"></span>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
