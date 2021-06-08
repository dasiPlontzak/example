import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../redux/actions';
import { updateFavorite } from '../../../../services/User.service';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


export default function Favorite(props) {
    const [favorite, setFavorite] = useState('#4B0083')
    const [notFavorite, setNotFavorite] = useState('#CCCCCC')

    const dispatch = useDispatch()
    const favoriteState = useSelector(state => state.user.favorite)
    const audioFavoriteId = props.id
    useEffect(() => {
        // console.log("AFTER", favoriteState);
        // updateFavorite(currentUserId, favoriteState)
    }, [favoriteState])
    function updateFav(id, x) {
        // console.log("BEFORE", favoriteState);

        dispatch(actions.setFavorite(id))
    }
    return (
        <>
            <OverlayTrigger key="top"
                placement="top"
                overlay={
                    <Tooltip id="tooltip-top">
                        Favorite
                        </Tooltip>
                }>
                 {favoriteState.includes(audioFavoriteId) ? <FavoriteRoundedIcon className={props.className}
                    style={{ color: favorite }}
                    onClick={() => updateFav(audioFavoriteId, 1)} /> : <FavoriteRoundedIcon
                        className={props.className}
                        style={{ color: notFavorite }}
                        onClick={() => updateFav(audioFavoriteId, 0)}
                    />
                }
            </OverlayTrigger>

        </>
    );
}
