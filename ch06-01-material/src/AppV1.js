import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Button, DialogActions, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import gallery from "./gallery.json";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

function MyDialogBox({ open,onClose,title, children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>

        <Button variant='outlined' startIcon={<CloseIcon></CloseIcon>} onClick={onClose}>
        CloseIcon
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function App() {
  const useStyle = makeStyles((theme) => ({
    galleryGrid: {
      paddingTop: theme.spacing(4),
    },
    galleryItemDescription: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    galleryImage: {
      paddingTop: "54%",
    },
    galleryItem: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  }));
  const [selectImage, setSelectedImage] = useState();
  const [isShowDetail, setShowDetail] = useState(false);
  const styleClass = useStyle();
  return (
    <div className="App">
      <CssBaseline></CssBaseline>
      <AppBar position="relative">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            这个一个文字Title
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={styleClass.galleryGrid}>
          <Grid container spacing="4">
            {gallery.map((item, index) => {
              return (
                <Grid item key={`photo-${index}`} xs={12} sm={3} lg={2}>
                  <Card className={styleClass.galleryItem}>
                    <CardMedia image={item.image} title="A photo" className={styleClass.galleryImage}></CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h2">
                        Image
                      </Typography>
                      <Typography>{item.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => {
                          console.log("click");
                          setSelectedImage(item);
                          setShowDetail(true)
                        }}
                      >
                        <ImageSearchIcon></ImageSearchIcon>
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      <MyDialogBox open={isShowDetail} title="detail" onClose={()=>{setShowDetail(false)}}> 
        <img src={selectImage && selectImage.image}></img>
      </MyDialogBox>
    </div>
  );
}

export default App;
