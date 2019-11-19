import React from 'react';
import TopAppBar from './AppBarComponent';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import firebase from "firebase";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { koiSushiRestaurant } from '../Firebase/firebase';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  foot: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: '100%',
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
  },
  hoho: {
    margin: `${theme.spacing(0)}px auto`,
    padding: theme.spacing(0),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  goot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  woyaoheng: {
    direction: 'column',
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffbb93',
      main: '#ff8a65',
      dark: '#c75b39',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d3b8ae',
      main: '#a1887f',
      dark: '#725b53',
      contrastText: '#fff',
    },
  },
});


var testcart;
var bccc;
const Cart = (props) => {
  var tablenumber = props.table;

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPricer, setTotalPricer] = React.useState(0);
  const [finishFilter, setFinishFilter] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  // const [testcart, setCart] = React.useState();


  var overallPrice = 0;
  // const cart = snapshot.docs.map(doc => doc.data());

  koiSushiRestaurant.collection("tables").doc(props.table).collection("cart")
    .onSnapshot(snapshot => {
      testcart = snapshot.docs.map(doc => doc.data());
      // setCart(snapshot.docs.map(doc => doc.data()));
    });
  var oldnumber;
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpen1 = () => {
    console.log("tablenumber");
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };



  const updatepc = () => {
    const prin = koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          overallPrice = parseInt(doc.data().dishRef.price) * parseInt(doc.data().number) + overallPrice;
        });
        setTotalPrice(overallPrice);
        setTotalPricer(overallPrice * 1.05);
        bccc = String(overallPrice);
      })
  }


  koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart")
    .get()
    .then(function (querySnapshot) {
      var qiangbimingdan = new Set();
      var dic = new Map();
      querySnapshot.forEach(function (doc) {
        var nn = doc.id;
        koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(doc.id).update({ ID: nn });
        console.log(doc.data().dishRef);
        if (dic.has(doc.data().dishRef.ID)) {
          qiangbimingdan.add(doc.data().ID);
          // var right = dic.get(doc.data().dishRef.ID);
          // if (right != null) {
          //   koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(right).get().then(function (dddoc) {
          //     oldnumber = dddoc.data().number;
          //     console.log("dddd!" + oldnumber);
          //     handleAdd(parseInt(oldnumber), right);
          //   })
          // }
        } else {
          dic.set(doc.data().dishRef.ID, doc.data().ID);
          // console.log("put!");
        }
        // qiangbimingdan.forEach(function (kkk) {
        //   if (kkk != null) {
        //     koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(kkk).delete();
        //   }
        // })
      });
      setFinishFilter(true);
    })
  updatepc();

  const handleAdd = (newnum, idid) => {
    koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(idid).update({ number: newnum + 1 });
    updatepc();
  }

  const handleMin = (newnum, idid) => {
    if (newnum > 1) {
      koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(idid).update({ number: newnum - 1 });
    } else {
      idid = String(idid);
      var sk;
      koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").get().then(snap => {
        // sk = snap.size // will return the collection size
        console.log(parseInt(snap.size));
        if(snap.size === 1){
          handleClear(testcart);
        }else{
          koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(idid).delete();
        }
      });
      // console.log(parseInt(sk));


      updatepc();

    }
    updatepc();

  }




  const handleOrder = (vv) => {
    const fa = String(Math.random());
    handleClose();
    console.log(tablenumber);
    koiSushiRestaurant.collection("tables").doc(tablenumber).collection("orders").doc(fa).set({});
    vv.forEach(function (doc) {
      var dishnum = doc.ID;
      koiSushiRestaurant.collection("tables").doc(tablenumber).collection("orders").doc(fa).update({
        dishes: firebase.firestore.FieldValue.arrayUnion({
          name: doc.dishRef.name,
          price: doc.dishRef.price,
          quantity: doc.number,
        }),
        subtotal: totalPrice,
        taxrate: 0.05,
        ordertime: firebase.firestore.FieldValue.serverTimestamp(),
        finished: false,
      });
    });
    handleClear(vv);
  };


  const handleClear = (vv) => {
    handleClose1();
    vv.forEach(function (doc) {
      console.log(tablenumber);
      console.log(doc.ID);
      koiSushiRestaurant.collection("tables").doc(tablenumber).collection("cart").doc(doc.ID).delete();
    });
  };

  if (!finishFilter) {
    return (
      <div>
        Loading
    </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <TopAppBar restaurant={props.restaurant} table={props.table} />
        {Array.from(testcart).map(dish => (
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item className={classes.woyaoheng}>
                <img
                  width={120}
                  height={120}
                  src={dish.dishRef.image}
                  alt={dish.dishRef.name}
                />
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography noWrap>{dish.dishRef.name}</Typography>
                <Grid container   >
                  <div className={classes.container} >
                    <ListItem className={classes.hoho}>
                      <ListItemText primary={"Number:" + "   " + parseInt(dish.number)} />
                    </ListItem>
                    <ListItem className={classes.hoho}>
                      <ListItemText primary={"Price:" + "   $" + dish.dishRef.price} />
                    </ListItem>

                    <div>
                      <ButtonGroup color="primary" size="medium" aria-label="small outlined button group">
                        <IconButton
                          onClick={() => handleAdd(parseInt(dish.number), dish.ID)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleMin(parseInt(dish.number), dish.ID)}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </ButtonGroup>
                    </div>
                  </div>

                </Grid>
              </Grid>

            </Grid>
          </Paper>



        ))}



        <div>
          <List className={classes.root}>
            <ListItem >
              <ListItemText primary="Before tax" secondary={"$" + totalPrice} />
            </ListItem>
            <ListItem>
              <ListItemText primary="After tax" secondary={"$" + totalPricer} />
            </ListItem>
          </List>
        </div>
        <div>

          <div>
            <ButtonGroup color="primary" size="large" aria-label="small outlined button group">
              <Button
                // onClick={() => handleOrder(testcart)}
                onClick={handleClickOpen}
              > Confirm</Button>
              <Button
                onClick={handleClickOpen1}
              >Clear</Button>
            </ButtonGroup>
          </div>
        </div>



        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm this order?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleOrder(testcart)} color="primary" autoFocus>
                Confirm
          </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                No
          </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            open={open1}
            onClose1={handleClose1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm clear?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClear(testcart)} color="primary" autoFocus>
                Confirm
          </Button>
              <Button onClick={handleClose1} color="primary" autoFocus>
                No
          </Button>
            </DialogActions>
          </Dialog>
        </div>


      </div>
    </ThemeProvider>

  );
}

export default Cart;