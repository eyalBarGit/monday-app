import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCardDetails, toggleCardWatch, setDueDate, changeCardTitle } from '../../store/actions/cardActions'
import { useHistory, useParams } from 'react-router-dom'
import { BlackScreen } from '../CardDetails/BlackScreen/BlackScreen'
import { CardCover } from './CardCover/CardCover'
import { RightSideMenu } from './RightSideMenu/RightSideMenu'
import { CardCheckList } from './CardCheckList/CardCheckList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTicketAlt, faClipboardList, faEye } from '@fortawesome/free-solid-svg-icons'
import { Description } from './Description/Description';
import { CardLabel } from './CardLabel/CardLabel';

export function CardDetails() {
    const state = useSelector(state => state.boardReducer)
    const cardsState = useSelector(state => state.cardReducer.cards)
    const { boardid, cardid, listid } = useParams();
    const currBoard = state.boards[boardid]

    const [currCard, setCurrCard] = useState()
    const [isCoverOn, setCoverOn] = useState(false)
    const [istCoverVisibile, setCoverVisibility] = useState(false)
    const [isDescVisible, setDescVisibility] = useState(false)
    const [newCardTitle, setCardTitle] = useState({ title: '' })
    const dispatch = useDispatch()
    const history = useHistory()
    const [isCardTitleChange, onSetCardTitle] = useState(false)
    const currCheckList = currCard ? Object.values(currCard.checklist) : ''
    const [isMouseOver, setMouseOver] = useState(false)
    const [cardKeys, setCardKeys] = useState()

    const ticket = <FontAwesomeIcon icon={faTicketAlt} />
    const clipBoard = <FontAwesomeIcon icon={faClipboardList} />
    const eye = <FontAwesomeIcon icon={faEye} />
    const pencil = <FontAwesomeIcon icon={faPencilAlt} />



    const loadCurrCard = useCallback(() => {
        const currCard = cardsState[cardid]
        setCurrCard(currCard)
    }, [cardsState, cardid])

    useEffect(() => {
        loadCurrCard()

    }, [currCard, loadCurrCard])


    const onToggleCardDetails = () => {
        dispatch(toggleCardDetails(false))
        history.goBack()
    }


    const onToggleCover = () => {
        setCoverOn(!isCoverOn)
    }

    const toggleCardVisibility = () => {
        setCoverVisibility(!istCoverVisibile)
    }

    const onToggleCardDesc = () => {
        setDescVisibility(!isDescVisible)
    }


    const onToggleCardWatch = () => {
        const isWatched = currCard.isWatched
        dispatch(toggleCardWatch(currBoard, currCard, !isWatched))
    }

    const onRemoveDate = () => {
        dispatch(setDueDate(currBoard, currCard, ''))
    }



    const onHandleChange = ({ target }) => {
        const key = target.name
        const value = target.value
        newCardTitle[key] = value
        setCardTitle((prevState) => ({
            ...prevState,
            title: value
        }))
    };

    const onChangeTitle = (ev) => {
        const cardTitle = newCardTitle.title
        ev.preventDefault()
        dispatch(changeCardTitle(currCard, cardTitle, currBoard))
        onSetCardTitle(false)
    }





    if (!currCard) return ''
    return (
        <div className="card-details" >
            <span onClick={onToggleCardDetails} >
                <BlackScreen />
            </span>

            <div className="card-details-board ">
                {!isCardTitleChange &&
                    <div className="flex">
                        <h3 >{currCard.title} </h3>
                        {isMouseOver &&
                            <div className="edit-title-pencil">
                                {pencil}
                            </div>
                        }
                    </div>
                }
                {/* {currCard.cardCover &&
                    <CardCover currCard={currCard} onToggleCover={onToggleCover} />
                } */}

                {currCard && Object.keys(currCard).map((key, idx) => {
                    console.log(key, ":", currCard[key])
                    return <div key={idx}>
                        {key}
                    </div>
                })}







                <div className="main flex space-between">
                    <div className="left-side">
                        <div className="title-section ">
                            <div style={{ height: 'fit-content' }} className="align-center flex">
                                <div className="icon">
                                    {ticket}
                                </div>
                                <div onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} onClick={() => onSetCardTitle(true)} className="title">

                                </div>

                                {isCardTitleChange &&
                                    <div className="flex">
                                        <form onSubmit={onChangeTitle}>
                                            <input autoComplete="off" onChange={onHandleChange} name="title" placeholder={currCard.title} type="text" />
                                        </form>
                                        <button onClick={() => onSetCardTitle(false)}>Cancel</button>
                                    </div>
                                }
                                {currCard.isWatched &&
                                    <div className="watched-section">
                                        {eye}
                                    </div>
                                }
                            </div>
                            {currCard.dueDate &&
                                <div className="due-date-section margin-bottom flex space-between">
                                    <p>{currCard.dueDate}</p>
                                    <p className="remove-date" onClick={onRemoveDate}>Remove Date</p>
                                </div>
                            }
                        </div>
                        <section className="labels">
                            {currCard.labels.length > 0 &&
                                <div>
                                    <p>Labels</p>
                                    <div className="flex">
                                        {currCard.labels.map(label => {
                                            return <CardLabel key={label} label={label} />
                                        })}
                                    </div>
                                </div>
                            }

                        </section>
                        <section className="description-section">
                            <Description clipBoard={clipBoard} isDescVisible={isDescVisible} currBoard={currBoard} currCard={currCard}
                                onToggleCardDesc={onToggleCardDesc} />
                        </section>
                        <section className="checkList-section">
                            {currCheckList.length > 0 &&
                                currCheckList.map(checklist => <div key={checklist.id} >
                                    <CardCheckList currCheckList={checklist} currBoard={currBoard} currCard={currCard} />
                                </div>)
                            }
                        </section>
                    </div>
                    {/* <div className="right-side">
                        <RightSideMenu
                            className="right-side"
                            listid={listid}
                            currBoard={currBoard}
                            currCard={currCard}
                            toggleCardVisibility={toggleCardVisibility}
                            istCoverVisibile={istCoverVisibile}
                            onToggleCardDetails={onToggleCardDetails}
                            onToggleCardWatch={onToggleCardWatch}
                            onToggleCover={onToggleCover}
                            isCoverOn={isCoverOn}
                        />
                    </div> */}
                </div>
            </div>

        </div>
        
    )
}

