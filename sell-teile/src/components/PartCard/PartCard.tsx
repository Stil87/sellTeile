import { Card,   CardContent, GridList, GridListTile, GridListTileBar, IconButton, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Part, PartImage } from "../../utils/types";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}); 


export const PartCard = ({part, handleDelete} : {part:Part, handleDelete: Function}) => {


  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

 


  return (
     <Card className={classes.root} variant="outlined">
    <CardContent>
      <Typography variant="h5" component="h2">
       {part.title}
      </Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
       {part.model}
      </Typography>
      <Typography variant="body2" component="p">
       {part.description}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {part.preis === 0 ? null : part.preis}
      </Typography>
        <SingleLineGridList part={part} handleDelete={(partImg:PartImage, key:number)=>handleDelete(partImg,key) }/>
    </CardContent>
    
  </Card>  
  );




}



const useStylesGridList = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function SingleLineGridList({ part , handleDelete}: { part: Part , handleDelete: Function}) {

  const classes = useStylesGridList();


  
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {part.pictures.map((partImg, index) => (
          

          <GridListTile key={partImg.id}>
            <img src={partImg.url} alt='part' style={{minWidth:50}}/>
            <GridListTileBar
              title='foto'
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton onClick={()=> handleDelete(partImg,index )} aria-label={`star ${'Foto'}`}>
                  <DeleteForeverIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}