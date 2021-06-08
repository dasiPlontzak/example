import React from 'react';
import { Field, reduxForm } from 'redux-form'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Img from '../../../assets/homeImageList.png'
import './ChannelsListOld.css'
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const imgList=[{name:"Channel name"}]
//icn trash-alt
export default function ChannelsList(props) {
    const { handleSubmit } = props.handleSubmit;
    return (
        <form onSubmit={handleSubmit} className="BackgroundChannel">
            <nav className="navbar navbar-light d-flex justify-content-between NavAddChannel">
              <SearchSharpIcon className="IconChannel"/>
             <h3>My channels</h3>
              <div>
                 <FontAwesomeIcon className="FontIconNav"  icon={['far', 'copy']}/>
                <FontAwesomeIcon className="FontIconNav" icon={['far', 'trash-alt']}/>
                <FontAwesomeIcon className="FontIconNav" icon={['far', 'eye']}/>
                <FontAwesomeIcon className="FontIconNav" icon={['far', 'edit']}/>
              </div>
</nav>

  <Grid container >

    <Grid item xs={12}>
      <Grid container  className="GridAddChannel">
        {imgList.map((value) => (
          <Grid key={value} item className="GridNew" >
            <Paper className="paperNew" 
           style={{ backgroundImage: `url(${Img})` }}
          // style={{  backgroundImage: `url("https://via.placeholder.com/500")`  }}
            />
            <label>{value.name}</label>
          </Grid>
        ))}
        <Grid className="GridNew">
            <Paper className="paperNew" style={{backgroundColor:'#4B0083'}} >
            <div className="d-flex flex-column">
                <div className="p-2"> <AddRoundedIcon className="addRounded"/></div>
                <div className="p-2 addNewPaper"><label>Add new</label></div>
            </div>
              </Paper>
          </Grid>
      </Grid>
    </Grid>
  </Grid>
        </form>
    );
}
